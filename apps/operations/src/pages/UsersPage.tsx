export default function UsersPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Users
      </h1>
      <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
        Manage protocol users. View profiles, reputation scores, and activity history.
      </p>
    </div>
  );
}
