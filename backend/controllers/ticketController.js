const Ticket = require("../models/Ticket");
const Note = require("../models/Note");

// Generates a sequential ticket ID like TKT-001, TKT-002, ...
async function generateTicketId() {
  let count = await Ticket.countDocuments();
  let nextNumber = count + 1;
  let ticket_id = `TKT-${String(nextNumber).padStart(3, "0")}`;

  while (await Ticket.exists({ ticket_id })) {
    nextNumber += 1;
    ticket_id = `TKT-${String(nextNumber).padStart(3, "0")}`;
  }

  return ticket_id;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// POST /api/tickets
exports.createTicket = async (req, res) => {
  try {
    const { customer_name, customer_email, subject, description, order_number, assigned_to } = req.body;

    if (!customer_name || !customer_email || !subject || !description) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (!isValidEmail(customer_email)) {
      return res.status(400).json({ error: "Please provide a valid email address." });
    }

    const ticket_id = await generateTicketId();

    const ticket = await Ticket.create({
      ticket_id,
      customer_name,
      customer_email,
      subject,
      description,
      order_number,
      assigned_to,
    });

    res.status(201).json({
      ticket_id: ticket.ticket_id,
      created_at: ticket.created_at,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create ticket." });
  }
};

// GET /api/tickets?status=Open&search=term
exports.getTickets = async (req, res) => {
  try {
    const { status, search } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { customer_name: regex },
        { customer_email: regex },
        { ticket_id: regex },
        { subject: regex },
        { description: regex },
        { order_number: regex },
        { assigned_to: regex },
      ];
    }

    const tickets = await Ticket.find(query).sort({ created_at: -1 });

    res.json(
      tickets.map((t) => ({
        ticket_id: t.ticket_id,
        customer_name: t.customer_name,
        subject: t.subject,
        status: t.status,
        assigned_to: t.assigned_to,
        created_at: t.created_at,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch tickets." });
  }
};

// GET /api/tickets/:ticket_id
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticket_id: req.params.ticket_id });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    const notes = await Note.find({ ticket_id: ticket.ticket_id }).sort({
      created_at: 1,
    });

    res.json({
      ticket_id: ticket.ticket_id,
      customer_name: ticket.customer_name,
      customer_email: ticket.customer_email,
      subject: ticket.subject,
      description: ticket.description,
      status: ticket.status,
      order_number: ticket.order_number,
      assigned_to: ticket.assigned_to,
      created_at: ticket.created_at,
      updated_at: ticket.updated_at,
      notes: notes.map((n) => ({
        note_text: n.note_text,
        created_at: n.created_at,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch ticket." });
  }
};

// PUT /api/tickets/:ticket_id
exports.updateTicket = async (req, res) => {
  try {
    const { status, notes, assigned_to, order_number } = req.body;
    const ticket = await Ticket.findOne({ ticket_id: req.params.ticket_id });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    if (!status && !notes && assigned_to === undefined && order_number === undefined) {
      return res.status(400).json({ error: "No updates were provided." });
    }

    let ticketChanged = false;

    if (status) {
      if (!["Open", "In Progress", "Closed"].includes(status)) {
        return res.status(400).json({ error: "Invalid status value." });
      }
      ticket.status = status;
      ticketChanged = true;
    }

    if (assigned_to !== undefined) {
      ticket.assigned_to = assigned_to;
      ticketChanged = true;
    }

    if (order_number !== undefined) {
      ticket.order_number = order_number;
      ticketChanged = true;
    }

    if (ticketChanged) {
      await ticket.save();
    }

    if (notes !== undefined) {
      if (!notes || !notes.trim()) {
        return res.status(400).json({ error: "Note text cannot be empty." });
      }
      await Note.create({
        ticket_id: ticket.ticket_id,
        note_text: notes,
      });
    }

    res.json({ success: true, updated_at: ticket.updated_at });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update ticket." });
  }
};

// POST /api/tickets/:ticket_id/confirm
exports.confirmTicket = async (req, res) => {
  try {
    const { assigned_to, notes } = req.body;
    const ticket = await Ticket.findOne({ ticket_id: req.params.ticket_id });

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found." });
    }

    if (ticket.status === "Closed") {
      return res.status(400).json({ error: "Closed tickets cannot be confirmed." });
    }

    ticket.status = "In Progress";
    if (assigned_to !== undefined) {
      ticket.assigned_to = assigned_to;
    }
    await ticket.save();

    if (notes !== undefined) {
      if (!notes || !notes.trim()) {
        return res.status(400).json({ error: "Note text cannot be empty." });
      }
      await Note.create({
        ticket_id: ticket.ticket_id,
        note_text: notes,
      });
    }

    res.json({ success: true, updated_at: ticket.updated_at });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to confirm ticket." });
  }
};
