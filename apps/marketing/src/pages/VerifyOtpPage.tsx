export default function VerifyOtpPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-semibold" style={{ color: 'var(--text-primary)' }}>
        Verify OTP
      </h1>
      <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
        Enter the verification code sent to your email to complete authentication.
      </p>
    </div>
  );
}
