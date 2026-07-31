const express = require("express");
const router = express.Router();
const {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  confirmTicket,
} = require("../controllers/ticketController");

router.post("/", createTicket);
router.get("/", getTickets);
router.get("/:ticket_id", getTicketById);
router.put("/:ticket_id", updateTicket);
router.post("/:ticket_id/confirm", confirmTicket);

module.exports = router;
