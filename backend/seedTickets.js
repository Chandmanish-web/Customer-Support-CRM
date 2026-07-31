require("dotenv").config();
const mongoose = require("mongoose");
const Ticket = require("./models/Ticket");

const STATUS_OPTIONS = ["Open", "In Progress", "Closed"];
const ASSIGNEES = ["Alex", "Jordan", "Morgan", "Taylor", "Riley", "Jamie"];
const ORDER_NUMBERS = ["ORD-1001", "ORD-1002", "ORD-1003", "ORD-2004", "ORD-3005", "ORD-4006"];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function createSampleTickets() {
  const tickets = [];

  tickets.push({
    customer_name: "Ava Collins",
    customer_email: "ava.collins@example.com",
    subject: "Unable to view invoice",
    description: "I cannot view the invoice for my last order in the account dashboard.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Noah Bennett",
    customer_email: "noah.bennett@example.com",
    subject: "Order confirmation not received",
    description: "I placed an order yesterday but have not received any confirmation email.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: "Open",
  });

  tickets.push({
    customer_name: "Mia Patel",
    customer_email: "mia.patel@example.com",
    subject: "Shipping address needs update",
    description: "The shipping address on my confirmed order is incorrect. Please update it.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Liam Rivera",
    customer_email: "liam.rivera@example.com",
    subject: "Product arrived damaged",
    description: "My recent order arrived with a damaged item and I need a replacement.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Sophia Nguyen",
    customer_email: "sophia.nguyen@example.com",
    subject: "Request refund for incorrect item",
    description: "I received the wrong product and would like to request a refund.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Ethan Brooks",
    customer_email: "ethan.brooks@example.com",
    subject: "Discount code not applying",
    description: "When I enter my discount code during checkout, it does not apply.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Olivia Parker",
    customer_email: "olivia.parker@example.com",
    subject: "Account password reset issue",
    description: "I am unable to reset my password using the password recovery link.",
    order_number: "",
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Lucas Kim",
    customer_email: "lucas.kim@example.com",
    subject: "Request order cancellation",
    description: "I need to cancel my order before it ships. Please help.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: "In Progress",
  });

  tickets.push({
    customer_name: "Isabella Reed",
    customer_email: "isabella.reed@example.com",
    subject: "Billing address mismatch",
    description: "The billing address on my invoice does not match my account address.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Mason Cooper",
    customer_email: "mason.cooper@example.com",
    subject: "Delayed shipment update",
    description: "My package is delayed and I would like an estimated delivery date.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Emma Carter",
    customer_email: "emma.carter@example.com",
    subject: "Unable to apply gift card",
    description: "The gift card code does not validate during checkout.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: "Open",
  });

  tickets.push({
    customer_name: "Aiden Flores",
    customer_email: "aiden.flores@example.com",
    subject: "Request order update",
    description: "I want to change the delivery method on my order before it ships.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Amelia Torres",
    customer_email: "amelia.torres@example.com",
    subject: "Missing item from order",
    description: "One item from my package is missing. Please investigate.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "James Morgan",
    customer_email: "james.morgan@example.com",
    subject: "Subscription renewal question",
    description: "I have a question about my upcoming subscription renewal.",
    order_number: "",
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Harper Allen",
    customer_email: "harper.allen@example.com",
    subject: "Technical issue with checkout",
    description: "Checkout fails with an error when I try to complete payment.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Benjamin Reed",
    customer_email: "benjamin.reed@example.com",
    subject: "Question about return policy",
    description: "Can you clarify the return policy for international orders?",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Evelyn Hughes",
    customer_email: "evelyn.hughes@example.com",
    subject: "Account login lockout",
    description: "I am locked out of my account after too many sign-in attempts.",
    order_number: "",
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Logan Sanders",
    customer_email: "logan.sanders@example.com",
    subject: "Wrong shipping method applied",
    description: "The shipping method on my order is not the one I selected.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Grace Rivera",
    customer_email: "grace.rivera@example.com",
    subject: "Need invoice for corporate expense",
    description: "Please provide an itemized invoice for my recent purchase.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  tickets.push({
    customer_name: "Sebastian Wells",
    customer_email: "sebastian.wells@example.com",
    subject: "Request order tracking info",
    description: "I need the tracking information for my shipment.",
    order_number: randomItem(ORDER_NUMBERS),
    assigned_to: randomItem(ASSIGNEES),
    status: randomItem(STATUS_OPTIONS),
  });

  return tickets;
}

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

async function seedTickets() {
  if (!process.env.MONGO_URI) {
    console.error("Missing MONGO_URI environment variable.");
    process.exit(1);
  }

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected to MongoDB, seeding tickets...");

  const samples = createSampleTickets();
  for (const sample of samples) {
    const ticket_id = await generateTicketId();
    const ticketData = {
      ticket_id,
      customer_name: sample.customer_name,
      customer_email: sample.customer_email,
      subject: sample.subject,
      description: sample.description,
      order_number: sample.order_number,
      assigned_to: sample.assigned_to,
      status: sample.status,
    };

    await Ticket.create(ticketData);
    console.log(`Created ${ticketData.ticket_id} — ${ticketData.subject}`);
  }

  console.log(`Seed complete: ${samples.length} tickets created.`);
  await mongoose.disconnect();
}

seedTickets().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
