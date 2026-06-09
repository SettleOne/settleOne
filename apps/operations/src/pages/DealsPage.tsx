export default function DealsPage() {
  return (
    <div className="min-h-screen p-8">
      <h1
        className="text-3xl font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        Deals
      </h1>
      <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
        View all protocol deals. Filter by status, value, and participants.
      </p>
    </div>
  );
}
