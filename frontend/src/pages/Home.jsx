import { useEffect, useState } from "react";
import { getTickets } from "../api";
import SearchFilter from "../components/SearchFilter";
import TicketList from "../components/TicketList";

export default function Home() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const statusCounts = tickets.reduce(
    (acc, ticket) => {
      acc[ticket.status] = (acc[ticket.status] || 0) + 1;
      return acc;
    },
    { Open: 0, "In Progress": 0, Closed: 0 }
  );

  useEffect(() => {
    // Debounce so we don't fire a request on every keystroke
    const timeout = setTimeout(() => {
      fetchTickets();
    }, 300);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status]);

  async function fetchTickets() {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (search) params.search = search;
      if (status) params.status = status;

      const res = await getTickets(params);
      setTickets(res.data);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      setError("Unable to load tickets. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function resetFilters() {
    setSearch("");
    setStatus("");
  }

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold">All Tickets</h1>
          <p className="text-sm text-gray-500">{tickets.length} ticket(s) loaded</p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center sm:grid-cols-4">
          <div className="rounded-xl border bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-gray-500">Open</p>
            <p className="mt-1 text-lg font-semibold text-yellow-600">{statusCounts.Open}</p>
          </div>
          <div className="rounded-xl border bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-gray-500">In Progress</p>
            <p className="mt-1 text-lg font-semibold text-blue-600">{statusCounts["In Progress"]}</p>
          </div>
          <div className="rounded-xl border bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-gray-500">Closed</p>
            <p className="mt-1 text-lg font-semibold text-green-600">{statusCounts.Closed}</p>
          </div>
          <div className="rounded-xl border bg-white px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-gray-500">Total</p>
            <p className="mt-1 text-lg font-semibold text-gray-900">{tickets.length}</p>
          </div>
        </div>
      </div>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
        onReset={resetFilters}
      />

      {error && (
        <div className="bg-red-50 text-red-700 text-sm rounded-lg px-3 py-2 mb-4">
          {error}
        </div>
      )}

      <TicketList tickets={tickets} loading={loading} />
    </div>
  );
}
