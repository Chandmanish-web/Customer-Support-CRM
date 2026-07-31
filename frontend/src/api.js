import axios from "axios";

// Use Vite environment variable for API base. Do NOT hardcode localhost here.
// Example .env: VITE_API_URL=https://your-backend.onrender.com/api
const API_BASE = import.meta.env.VITE_API_URL ?? "";

if (!API_BASE) {
  // In development you can set VITE_API_URL in .env; empty base will use relative paths.
  console.warn("VITE_API_URL is not set — API requests will use relative paths (''), set VITE_API_URL in .env for full URL.");
}

const api = axios.create({
  baseURL: API_BASE,
});

export const createTicket = (data) => api.post("/tickets", data);

export const getTickets = (params) => api.get("/tickets", { params });

export const getTicketById = (ticket_id) => api.get(`/tickets/${ticket_id}`);

export const updateTicket = (ticket_id, data) =>
  api.put(`/tickets/${ticket_id}`, data);

export default api;
