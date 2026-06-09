export default function LogsPage() {
  return (
    <div className="min-h-screen p-8">
      <h1
        className="text-3xl font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        Logs
      </h1>
      <p className="mt-2" style={{ color: "var(--text-secondary)" }}>
        View protocol event logs. Track on-chain transactions, state changes,
        and system events.
      </p>
    </div>
  );
}
