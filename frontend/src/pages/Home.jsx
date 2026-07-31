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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">All Tickets</h1>
        <span className="text-sm text-gray-500">{tickets.length} ticket(s)</span>
      </div>

      <SearchFilter
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
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
