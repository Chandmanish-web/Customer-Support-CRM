import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTicketById, updateTicket } from "../api";
import StatusBadge from "../components/StatusBadge";

export default function TicketDetail() {
  const { ticket_id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [noteText, setNoteText] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [noteError, setNoteError] = useState("");
  const [assignedToInput, setAssignedToInput] = useState("");
  const [orderNumberInput, setOrderNumberInput] = useState("");

  useEffect(() => {
    fetchTicket();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticket_id]);

  async function fetchTicket() {
    setLoading(true);
    setError("");
    try {
      const res = await getTicketById(ticket_id);
      setTicket(res.data);
      setAssignedToInput(res.data.assigned_to || "");
      setOrderNumberInput(res.data.order_number || "");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.status === 404
          ? "Ticket not found."
          : "Unable to load ticket. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusChange(newStatus) {
    setSaving(true);
    setError("");
    try {
      await updateTicket(ticket_id, { status: newStatus });
      await fetchTicket();
    } catch (err) {
      console.error(err);
      setError("Failed to update the ticket status. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleMetadataSave() {
    setSaving(true);
    setError("");

    try {
      await updateTicket(ticket_id, {
        assigned_to: assignedToInput,
        order_number: orderNumberInput,
      });
      await fetchTicket();
    } catch (err) {
      console.error(err);
      setError("Failed to update ticket details. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleAddNote(e) {
    e.preventDefault();
    setNoteError("");
    setError("");

    if (!noteText.trim()) {
      setNoteError("Please enter a note before adding.");
      return;
    }

    setSaving(true);
    try {
      await updateTicket(ticket_id, { notes: noteText });
      setNoteText("");
      await fetchTicket();
    } catch (err) {
      console.error(err);
      setError("Failed to add note. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-gray-500 text-sm">Loading...</p>;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (!ticket) return null;

  return (
    <div className="max-w-2xl mx-auto">
      <Link to="/" className="text-sm text-brand-600 hover:underline">
        &larr; Back to all tickets
      </Link>

      <div className="bg-white border rounded-xl p-6 mt-3">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-lg font-bold">{ticket.subject}</h1>
            <p className="text-sm text-gray-500">{ticket.ticket_id}</p>
          </div>
          <StatusBadge status={ticket.status} />
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Customer</p>
            <p className="font-medium">{ticket.customer_name}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{ticket.customer_email}</p>
          </div>
          <div>
            <p className="text-gray-500">Order Number</p>
            <p className="font-medium">{ticket.order_number || "—"}</p>
          </div>
          <div>
            <p className="text-gray-500">Assigned To</p>
            <p className="font-medium">{ticket.assigned_to || "Unassigned"}</p>
          </div>
          <div>
            <p className="text-gray-500">Created</p>
            <p className="font-medium">
              {new Date(ticket.created_at).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Last Updated</p>
            <p className="font-medium">
              {new Date(ticket.updated_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-500 text-sm mb-1">Description</p>
          <p className="text-sm whitespace-pre-wrap">{ticket.description}</p>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Update Status</label>
            <select
              value={ticket.status}
              disabled={saving}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Assigned To</label>
            <input
              type="text"
              value={assignedToInput}
              disabled={saving}
              onChange={(e) => setAssignedToInput(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Order Number</label>
            <input
              type="text"
              value={orderNumberInput}
              disabled={saving}
              onChange={(e) => setOrderNumberInput(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={handleMetadataSave}
              disabled={saving}
              className="w-full bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg px-4 py-2 transition disabled:opacity-50"
            >
              Save Details
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl p-6 mt-4">
        <h2 className="font-semibold mb-3">Notes</h2>

        {ticket.notes.length === 0 ? (
          <p className="text-sm text-gray-500 mb-4">No notes yet.</p>
        ) : (
          <ul className="space-y-3 mb-4">
            {ticket.notes.map((n, i) => (
              <li key={i} className="border-l-2 border-brand-500 pl-3 text-sm">
                <p>{n.note_text}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(n.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}

        {noteError && (
          <div className="bg-red-50 text-red-700 text-sm rounded-lg px-3 py-2 mb-3">
            {noteError}
          </div>
        )}

        <form onSubmit={handleAddNote} className="flex gap-2">
          <input
            type="text"
            placeholder="Add a note or comment..."
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <button
            type="submit"
            disabled={saving}
            className="bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg px-4 py-2 transition disabled:opacity-50"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}
