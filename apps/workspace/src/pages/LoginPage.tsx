import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Shield,
  Chrome,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

type Tab = "user" | "staff";

export function LoginPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("user");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFa, setTwoFa] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showTwoFa, setShowTwoFa] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      // Simulate login — replace with real API call
      await new Promise((r) => setTimeout(r, 1200));
      // Mock: always logs in as user, navigating to workspace
      navigate("/marketplace");
    } catch {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleOAuth = () => {
    // Redirect to Google OAuth — replace with real OAuth endpoint
    window.location.href = "/auth/google";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-[var(--bg-base)] relative"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Background image with very low opacity */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/hero-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.05,
        }}
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[480px] mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/">
            <img
              src="/whiteLogo.png"
              alt="SettleOne"
              className="h-10 object-contain hover:opacity-80 transition-opacity"
            />
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-modal)] shadow-[var(--shadow-modal)] overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="p-8 pb-0">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              Welcome back
            </h1>
            <p className="text-[var(--text-secondary)] text-sm mt-1">
              Sign in to your SettleOne account
            </p>

            {/* Tab Toggle */}
            <div className="flex mt-6 bg-[var(--bg-base)] rounded-[var(--radius-input)] p-1 border border-[var(--border)]">
              <button
                onClick={() => setTab("user")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  tab === "user"
                    ? "bg-[var(--accent-blue)] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                User Login
              </button>
              <button
                onClick={() => setTab("staff")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  tab === "staff"
                    ? "bg-[var(--accent-blue)] text-white shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                Staff Login
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-5">
            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-800/40 rounded-[var(--radius-input)] text-red-400 text-sm">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                {tab === "staff" ? "Staff Email Address" : "Email Address"}
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_var(--accent-blue-glow)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Forgot password link (user tab) */}
            {tab === "user" && (
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-xs text-[var(--accent-blue)] hover:text-[var(--accent-blue-bright)] transition-colors font-medium"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* 2FA (staff tab) */}
            {tab === "staff" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Two-Factor Code
                  </label>
                  <div className="relative">
                    <Shield
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                    />
                    <input
                      type="text"
                      value={twoFa}
                      onChange={(e) => setTwoFa(e.target.value)}
                      placeholder="6-digit code"
                      maxLength={6}
                      className="w-full pl-10 pr-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_var(--accent-blue-glow)] font-mono tracking-[0.3em]"
                    />
                  </div>
                </div>
                <div className="flex items-start gap-2 p-3 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-xs text-[var(--text-secondary)]">
                  <Shield
                    size={14}
                    className="mt-0.5 text-[var(--accent-blue)] shrink-0"
                  />
                  Staff accounts require 2FA. Contact your administrator if
                  you've lost access.
                </div>
              </>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-[var(--accent-blue)] text-white font-semibold text-sm rounded-[var(--radius-input)] hover:bg-[var(--accent-blue-hover)] transition-all shadow-[var(--shadow-glow)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Signing in…
                </>
              ) : tab === "staff" ? (
                "Staff Sign In"
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider — user tab only */}
            {tab === "user" && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[var(--border)]" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-3 bg-[var(--bg-card)] text-[var(--text-muted)]">
                      or
                    </span>
                  </div>
                </div>

                {/* Google OAuth */}
                <button
                  type="button"
                  onClick={handleGoogleOAuth}
                  className="w-full py-2.5 flex items-center justify-center gap-3 bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-primary)] font-medium text-sm rounded-[var(--radius-input)] hover:bg-[var(--bg-subtle)] hover:border-[var(--border-light)] transition-all"
                >
                  <Chrome size={18} className="text-[#4285F4]" />
                  Continue with Google
                </button>
              </>
            )}

            {/* Sign up link */}
            {tab === "user" && (
              <p className="text-center text-sm text-[var(--text-secondary)]">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[var(--accent-blue)] hover:text-[var(--accent-blue-bright)] font-medium transition-colors"
                >
                  Sign up
                </Link>
              </p>
            )}
          </form>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-[var(--text-muted)] mt-6">
          Protected by end-to-end encryption · SettleOne Protocol
        </p>
      </div>
    </div>
  );
}
