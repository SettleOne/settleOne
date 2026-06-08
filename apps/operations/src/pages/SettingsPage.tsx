export default function SettingsPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Settings
      </h1>
      <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
        Operations settings. Configure admin access, notifications, and system preferences.
      </p>
    </div>
  );
}
