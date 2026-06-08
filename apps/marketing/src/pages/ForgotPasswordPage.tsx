export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Forgot Password
      </h1>
      <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
        Reset your password. Enter your email to receive a recovery link.
      </p>
    </div>
  );
}
