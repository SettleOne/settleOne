import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye, EyeOff, Mail, Lock, User, CheckCircle, ArrowRight, RefreshCw, Chrome
} from "lucide-react";

type Step = 1 | 2 | 3;

function PasswordStrengthBar({ password }: { password: string }) {
  const strength = password.length === 0
    ? 0
    : password.length < 6 ? 1
    : password.length < 8 ? 2
    : /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password) ? 4
    : 3;

  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "#ef4444", "#f59e0b", "#3b82f6", "#22c55e"];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              background: i <= strength ? colors[strength] : "var(--bg-subtle)",
            }}
          />
        ))}
      </div>
      <p className="text-xs mt-1" style={{ color: colors[strength] }}>
        {labels[strength]}
      </p>
    </div>
  );
}

function OtpInput({ onComplete }: { onComplete: (otp: string) => void }) {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (idx: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[idx] = value.slice(-1);
    setOtp(next);
    if (value && idx < 5) inputs.current[idx + 1]?.focus();
    if (next.every((v) => v !== "")) onComplete(next.join(""));
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-3 justify-center">
      {otp.map((v, i) => (
        <input
          key={i}
          ref={(el) => { inputs.current[i] = el; }}
          type="text"
          maxLength={1}
          value={v}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className="w-11 h-12 text-center text-xl font-bold bg-[var(--bg-base)] border-2 border-[var(--border)] rounded-[var(--radius-input)] text-[var(--text-primary)] focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_var(--accent-blue-glow)] transition-all font-mono"
        />
      ))}
    </div>
  );
}

export function SignupPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(59);

  const handleDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setStep(2);
      // Start countdown
      let c = 59;
      const timer = setInterval(() => {
        c--;
        setCountdown(c);
        if (c === 0) clearInterval(timer);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpComplete = async (_otp: string) => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setStep(3);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleOAuth = () => {
    window.location.href = "/auth/google";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[var(--bg-base)] relative py-8"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.05,
        }}
      />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[480px] mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img src="/whiteLogo.png" alt="SettleOne" className="h-10 object-contain hover:opacity-80 transition-opacity" />
          </Link>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step >= s
                    ? "bg-[var(--accent-blue)] text-white shadow-[var(--shadow-glow)]"
                    : "bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border)]"
                }`}
              >
                {step > s ? <CheckCircle size={14} /> : s}
              </div>
              {s < 3 && (
                <div
                  className="h-0.5 w-12 rounded-full transition-all duration-300"
                  style={{ background: step > s ? "var(--accent-blue)" : "var(--border)" }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Card */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-modal)] shadow-[var(--shadow-modal)] overflow-hidden animate-fade-in">
          {/* ── STEP 1: Details ── */}
          {step === 1 && (
            <div className="p-8">
              <h1 className="text-2xl font-bold">Create your account</h1>
              <p className="text-[var(--text-secondary)] text-sm mt-1">
                Start your first protected deal in minutes
              </p>

              {error && (
                <div className="mt-4 flex items-center gap-2 p-3 bg-red-900/20 border border-red-800/40 rounded-[var(--radius-input)] text-red-400 text-sm">
                  {error}
                </div>
              )}

              <form onSubmit={handleDetails} className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_var(--accent-blue-glow)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_var(--accent-blue-glow)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min 8 characters"
                      required
                      className="w-full pl-10 pr-10 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_var(--accent-blue-glow)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <PasswordStrengthBar password={password} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      required
                      className="w-full pl-10 pr-10 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_var(--accent-blue-glow)]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[var(--accent-blue)] text-white font-semibold text-sm rounded-[var(--radius-input)] hover:bg-[var(--accent-blue-hover)] transition-all shadow-[var(--shadow-glow)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  ) : (
                    <>Continue <ArrowRight size={16} /></>
                  )}
                </button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--border)]" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-[var(--bg-card)] text-[var(--text-muted)]">or</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGoogleOAuth}
                  className="w-full py-2.5 flex items-center justify-center gap-3 bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] font-medium text-sm rounded-[var(--radius-input)] hover:bg-[var(--bg-subtle)] hover:border-[var(--border-light)] transition-all"
                >
                  <Chrome size={18} className="text-[#4285F4]" />
                  Sign up with Google
                </button>

                <p className="text-center text-sm text-[var(--text-secondary)]">
                  Already have an account?{" "}
                  <Link to="/login" className="text-[var(--accent-blue)] hover:text-[var(--accent-blue-bright)] font-medium transition-colors">
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          )}

          {/* ── STEP 2: OTP Verify ── */}
          {step === 2 && (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-[var(--accent-blue)]/15 text-[var(--accent-blue)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={32} />
              </div>
              <h2 className="text-xl font-bold mb-1">Check your email</h2>
              <p className="text-[var(--text-secondary)] text-sm mb-6">
                We sent a 6-digit code to <strong className="text-[var(--text-primary)]">{email}</strong>
              </p>

              <OtpInput onComplete={handleOtpComplete} />

              {isLoading && (
                <div className="mt-4 flex items-center justify-center gap-2 text-[var(--text-secondary)] text-sm">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Verifying…
                </div>
              )}

              <div className="mt-6 text-sm text-[var(--text-secondary)]">
                {countdown > 0 ? (
                  <span>Resend in <span className="text-[var(--text-primary)] font-mono">{countdown}s</span></span>
                ) : (
                  <button
                    onClick={() => {
                      setCountdown(59);
                      let c = 59;
                      const timer = setInterval(() => {
                        c--;
                        setCountdown(c);
                        if (c === 0) clearInterval(timer);
                      }, 1000);
                    }}
                    className="flex items-center gap-1 mx-auto text-[var(--accent-blue)] hover:text-[var(--accent-blue-bright)] font-medium transition-colors"
                  >
                    <RefreshCw size={14} /> Resend Code
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── STEP 3: Success ── */}
          {step === 3 && (
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-[var(--accent-green)]/15 text-[var(--accent-green)] rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                <CheckCircle size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-2">Account Created!</h2>
              <p className="text-[var(--text-secondary)] text-sm mb-8">
                Welcome to SettleOne, <strong className="text-[var(--text-primary)]">{fullName}</strong>.
                Your account is ready to use.
              </p>
              <button
                onClick={() => navigate("/marketplace")}
                className="px-8 py-3 bg-[var(--accent-blue)] text-white font-semibold rounded-[var(--radius-input)] hover:bg-[var(--accent-blue-hover)] transition-all shadow-[var(--shadow-glow)] flex items-center gap-2 mx-auto"
              >
                Go to Workspace <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
