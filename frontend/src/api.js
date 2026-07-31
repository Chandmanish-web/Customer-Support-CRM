import axios from "axios";

// Set VITE_API_URL in a .env file for production builds.
// Example: VITE_API_URL=https://your-backend.onrender.com/api
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE,
});

export const createTicket = (data) => api.post("/tickets", data);

export const getTickets = (params) => api.get("/tickets", { params });

export const getTicketById = (ticket_id) => api.get(`/tickets/${ticket_id}`);

export const updateTicket = (ticket_id, data) =>
  api.put(`/tickets/${ticket_id}`, data);

export default api;
