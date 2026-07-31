import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import CreateTicket from "./pages/CreateTicket";
import TicketDetail from "./pages/TicketDetail";

export default function App() {
  const location = useLocation();

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
        location.pathname === path
          ? "bg-brand-500 text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="min-h-screen">
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-brand-700">
            Support CRM
          </Link>
          <nav className="flex gap-2">
            {navLink("/", "Tickets")}
            {navLink("/new", "New Ticket")}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<CreateTicket />} />
          <Route path="/tickets/:ticket_id" element={<TicketDetail />} />
        </Routes>
      </main>
    </div>
  );
}
