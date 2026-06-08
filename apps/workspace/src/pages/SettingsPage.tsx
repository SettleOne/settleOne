export default function SettingsPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Settings
      </h1>
      <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
        Configure your workspace preferences, notifications, and connected wallets.
      </p>
    </div>
  );
}
