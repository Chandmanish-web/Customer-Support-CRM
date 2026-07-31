import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function TicketList({ tickets, loading }) {
  if (loading) {
    return <p className="text-gray-500 text-sm py-8 text-center">Loading tickets...</p>;
  }

  if (tickets.length === 0) {
    return (
      <p className="text-gray-500 text-sm py-8 text-center">
        No tickets found. Try adjusting your search or filters.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border rounded-xl bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b bg-gray-50 text-gray-600">
            <th className="px-4 py-3">Ticket ID</th>
            <th className="px-4 py-3">Customer</th>
            <th className="px-4 py-3">Subject</th>
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Assigned</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t.ticket_id} className="border-b last:border-0 hover:bg-gray-50">
              <td className="px-4 py-3">
                <Link
                  to={`/tickets/${t.ticket_id}`}
                  className="font-medium text-brand-600 hover:underline"
                >
                  {t.ticket_id}
                </Link>
              </td>
              <td className="px-4 py-3">{t.customer_name}</td>
              <td className="px-4 py-3">{t.subject}</td>
              <td className="px-4 py-3">{t.order_number || "—"}</td>
              <td className="px-4 py-3">{t.assigned_to || "Unassigned"}</td>
              <td className="px-4 py-3">
                <StatusBadge status={t.status} />
              </td>
              <td className="px-4 py-3 text-gray-500">
                {new Date(t.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
