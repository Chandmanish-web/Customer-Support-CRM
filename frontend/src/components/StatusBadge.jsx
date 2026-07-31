const STATUS_STYLES = {
  Open: "bg-yellow-100 text-yellow-800",
  "In Progress": "bg-blue-100 text-blue-800",
  Closed: "bg-green-100 text-green-800",
};

const STATUS_ICON = {
  Open: "⚠️",
  "In Progress": "🔄",
  Closed: "✅",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
        STATUS_STYLES[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      <span>{STATUS_ICON[status] || "ℹ️"}</span>
      {status}
    </span>
  );
}
