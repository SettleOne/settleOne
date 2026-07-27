import React, { useState, useEffect, useRef } from "react";
import { X, Eye, EyeOff, CheckCircle } from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════
   AUTH MODAL — Login + Signup + OTP + Forgot Password + Staff Login
   ══════════════════════════════════════════════════════════════════════════ */
type AuthMode = "login" | "signup" | "forgot" | "otp";

export function AuthModal({
  mode: initialMode,
  onClose,
  onSwitch,
}: {
  mode: "login" | "signup";
  onClose: () => void;
  onSwitch: (m: "login" | "signup") => void;
}) {
  const [mode, setMode] = useState<AuthMode>(initialMode);

  // Sync prop changes to local state
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const [staffTab, setStaffTab] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [twoFACode, setTwoFACode] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (mode !== "otp") return;
    const iv = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(iv);
  }, [mode]);

  const getStrength = (p: string) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };
  const strengthColors = ["", "#EF4444", "#F59E0B", "#3B82F6", "#10B981"];
  const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
  const pwStrength = getStrength(password);

  const handleOtpInput = (i: number, val: string) => {
    if (val.length > 1) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };
  const handleOtpKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0)
      otpRefs.current[i - 1]?.focus();
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (!email || !password) setError("Please fill in all fields.");
      else setError("Backend not connected yet.");
    }, 1200);
  };

  const handleSignupStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirmPass) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPass) {
      setError("Passwords do not match.");
      return;
    }
    if (pwStrength < 2) {
      setError("Please use a stronger password.");
      return;
    }
    setMode("otp");
    setTimer(59);
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.join("").length < 6) {
      setError("Enter the full 6-digit code.");
      return;
    }
    setStep(3);
    setMode("signup");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "9px",
    color: "var(--text-primary)",
    padding: "10px 14px",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "var(--font-sans)",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "11px",
    fontWeight: 700,
    color: "var(--text-secondary)",
    marginBottom: "6px",
    letterSpacing: "0.04em",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(5,8,18,0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "rgba(8, 13, 26, 0.97)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "22px",
          overflow: "hidden",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.05)",
          position: "relative",
          animation: "modal-in 0.3s cubic-bezier(0.16,1,0.3,1) both",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top glow line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "30%",
            right: "30%",
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(59,130,246,0.9), transparent)",
          }}
        />

        {/* Background logo watermark inside modal */}
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            right: "-20px",
            width: "160px",
            height: "160px",
            backgroundImage: "url('/whiteLogo.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right bottom",
            opacity: 0.025,
            pointerEvents: "none",
          }}
        />

        {/* Header */}
        <div
          style={{
            padding: "28px 28px 20px",
            textAlign: "center",
            position: "relative",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--text-secondary)",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.15)";
              e.currentTarget.style.color = "#EF4444";
              e.currentTarget.style.borderColor = "rgba(239,68,68,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
            }}
          >
            <X size={15} />
          </button>

          {/* Use real logo in modal header */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "14px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(59,130,246,0.3)",
                boxShadow: "0 0 24px rgba(59,130,246,0.25)",
                background: "rgba(13,20,36,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/whiteLogo.png"
                alt="SettleOne"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>

          {mode === "login" && (
            <>
              <h2
                style={{
                  fontSize: "21px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  margin: "0 0 6px",
                  letterSpacing: "-0.02em",
                }}
              >
                Welcome back
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "13px",
                  margin: 0,
                }}
              >
                Sign in to your SettleOne account
              </p>
            </>
          )}
          {mode === "signup" && step < 3 && (
            <>
              <h2
                style={{
                  fontSize: "21px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  margin: "0 0 6px",
                  letterSpacing: "-0.02em",
                }}
              >
                Create your account
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "13px",
                  margin: 0,
                }}
              >
                Start your first protected deal in minutes
              </p>
            </>
          )}
          {mode === "otp" && (
            <>
              <h2
                style={{
                  fontSize: "21px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  margin: "0 0 6px",
                  letterSpacing: "-0.02em",
                }}
              >
                Verify your email
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "13px",
                  margin: 0,
                }}
              >
                We sent a 6-digit code to{" "}
                <span style={{ color: "var(--accent-cyan)", fontWeight: 600 }}>
                  {email}
                </span>
              </p>
            </>
          )}
          {mode === "forgot" && (
            <>
              <h2
                style={{
                  fontSize: "21px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  margin: "0 0 6px",
                  letterSpacing: "-0.02em",
                }}
              >
                Reset password
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "13px",
                  margin: 0,
                }}
              >
                Enter your email to receive a recovery link
              </p>
            </>
          )}
        </div>

        {/* ── SCROLLABLE BODY ── */}
        <div
          style={{
            padding: "0 28px 28px",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          {/* LOGIN */}
          {mode === "login" && (
            <>
              {/* Tab toggle */}
              <div
                style={{
                  display: "flex",
                  background: "rgba(255,255,255,0.04)",
                  borderRadius: "10px",
                  padding: "3px",
                  marginBottom: "22px",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {["User Login", "Staff Login"].map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setStaffTab(i === 1)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      borderRadius: "8px",
                      border: "none",
                      fontSize: "12px",
                      fontWeight: 700,
                      cursor: "pointer",
                      background:
                        staffTab === (i === 1)
                          ? "rgba(59,130,246,0.25)"
                          : "transparent",
                      color:
                        staffTab === (i === 1)
                          ? "var(--accent-blue)"
                          : "var(--text-secondary)",
                      transition: "all 0.25s",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <form
                onSubmit={handleLoginSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div>
                  <label style={labelStyle}>
                    {staffTab ? "Staff Email Address" : "Email Address"}
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={
                      staffTab ? "you@settleone.io" : "you@company.com"
                    }
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(59,130,246,0.6)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(59,130,246,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="login-password"
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      style={{ ...inputStyle, paddingRight: "54px" }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(59,130,246,0.6)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(59,130,246,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.1)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--text-muted)",
                        fontSize: "11px",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {showPass ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                  <div style={{ textAlign: "right", marginTop: "6px" }}>
                    <button
                      type="button"
                      onClick={() => setMode("forgot")}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--accent-blue)",
                        fontSize: "12px",
                        fontWeight: 600,
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>
                </div>

                {staffTab && (
                  <div>
                    <label style={labelStyle}>2FA Code</label>
                    <input
                      id="login-2fa"
                      type="text"
                      value={twoFACode}
                      onChange={(e) => setTwoFACode(e.target.value)}
                      placeholder="6-digit authenticator code"
                      maxLength={6}
                      style={{
                        ...inputStyle,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.2em",
                        textAlign: "center",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(59,130,246,0.6)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(59,130,246,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.1)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <p
                      style={{
                        fontSize: "11px",
                        color: "var(--text-muted)",
                        marginTop: "6px",
                        lineHeight: 1.5,
                      }}
                    >
                      Staff accounts require 2FA. Contact your administrator if
                      you've lost access.
                    </p>
                  </div>
                )}

                {error && (
                  <div
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: "9px",
                      padding: "10px 14px",
                      fontSize: "13px",
                      color: "#F87171",
                      display: "flex",
                      gap: "8px",
                      alignItems: "flex-start",
                    }}
                  >
                    <X size={14} style={{ flexShrink: 0, marginTop: "1px" }} />{" "}
                    {error}
                  </div>
                )}

                <button
                  id="login-submit"
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 800,
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow:
                      "0 0 24px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                    transition: "all 0.25s",
                    opacity: loading ? 0.7 : 1,
                    letterSpacing: "0.01em",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.boxShadow =
                        "0 0 40px rgba(59,130,246,0.6), inset 0 1px 0 rgba(255,255,255,0.2)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 24px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.15)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {loading
                    ? "Signing In..."
                    : staffTab
                      ? "Staff Sign In"
                      : "Sign In"}
                </button>
              </form>

              {!staffTab && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      margin: "18px 0",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        background: "rgba(255,255,255,0.08)",
                      }}
                    />
                    <span
                      style={{ color: "var(--text-muted)", fontSize: "12px" }}
                    >
                      or
                    </span>
                    <div
                      style={{
                        flex: 1,
                        height: "1px",
                        background: "rgba(255,255,255,0.08)",
                      }}
                    />
                  </div>
                  <button
                    id="login-google"
                    style={{
                      width: "100%",
                      padding: "11px",
                      borderRadius: "10px",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "var(--text-primary)",
                      fontSize: "13px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "10px",
                      transition: "all 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.09)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </button>
                </>
              )}
              <p
                style={{
                  textAlign: "center",
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  marginTop: "18px",
                }}
              >
                Don't have an account?{" "}
                <button
                  onClick={() => onSwitch("signup")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--accent-blue)",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  Sign up
                </button>
              </p>
            </>
          )}

          {/* SIGNUP */}
          {mode === "signup" && step < 3 && (
            <>
              <form
                onSubmit={handleSignupStep1}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    id="signup-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(59,130,246,0.6)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(59,130,246,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    id="signup-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(59,130,246,0.6)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(59,130,246,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      id="signup-password"
                      type={showPass ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a strong password"
                      required
                      style={{ ...inputStyle, paddingRight: "54px" }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "rgba(59,130,246,0.6)";
                        e.target.style.boxShadow =
                          "0 0 0 3px rgba(59,130,246,0.12)";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "rgba(255,255,255,0.1)";
                        e.target.style.boxShadow = "none";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((v) => !v)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--text-muted)",
                        fontSize: "11px",
                        fontWeight: 700,
                      }}
                    >
                      {showPass ? "HIDE" : "SHOW"}
                    </button>
                  </div>
                  {password && (
                    <div style={{ marginTop: "8px" }}>
                      <div style={{ display: "flex", gap: "4px" }}>
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            style={{
                              flex: 1,
                              height: "3px",
                              borderRadius: "2px",
                              background:
                                i <= pwStrength
                                  ? strengthColors[pwStrength]
                                  : "rgba(255,255,255,0.08)",
                              transition: "background 0.3s",
                              boxShadow:
                                i <= pwStrength
                                  ? `0 0 6px ${strengthColors[pwStrength]}60`
                                  : "none",
                            }}
                          />
                        ))}
                      </div>
                      <p
                        style={{
                          fontSize: "11px",
                          color: strengthColors[pwStrength],
                          marginTop: "5px",
                          fontWeight: 600,
                        }}
                      >
                        {strengthLabels[pwStrength]}
                      </p>
                    </div>
                  )}
                </div>
                <div>
                  <label style={labelStyle}>Confirm Password</label>
                  <input
                    id="signup-confirm"
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    placeholder="Repeat your password"
                    required
                    style={{
                      ...inputStyle,
                      borderColor:
                        confirmPass && confirmPass !== password
                          ? "rgba(239,68,68,0.5)"
                          : "rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(59,130,246,0.6)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(59,130,246,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>

                {error && (
                  <div
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "1px solid rgba(239,68,68,0.25)",
                      borderRadius: "9px",
                      padding: "10px 14px",
                      fontSize: "13px",
                      color: "#F87171",
                    }}
                  >
                    {error}
                  </div>
                )}

                <button
                  id="signup-continue"
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow:
                      "0 0 24px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                    transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow =
                      "0 0 40px rgba(59,130,246,0.6)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 0 24px rgba(59,130,246,0.35)";
                  }}
                >
                  Continue →
                </button>
              </form>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  margin: "16px 0",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
                <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>
                  or
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background: "rgba(255,255,255,0.08)",
                  }}
                />
              </div>
              <button
                id="signup-google"
                style={{
                  width: "100%",
                  padding: "11px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "var(--text-primary)",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
              <p
                style={{
                  textAlign: "center",
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  marginTop: "18px",
                }}
              >
                Already have an account?{" "}
                <button
                  onClick={() => onSwitch("login")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--accent-blue)",
                    fontWeight: 700,
                    fontSize: "12px",
                  }}
                >
                  Sign in
                </button>
              </p>
            </>
          )}

          {/* SIGNUP SUCCESS */}
          {mode === "signup" && step === 3 && (
            <div style={{ textAlign: "center", padding: "12px 0" }}>
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "rgba(16,185,129,0.12)",
                  border: "2px solid rgba(16,185,129,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 0 40px rgba(16,185,129,0.3)",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              >
                <CheckCircle size={40} style={{ color: "#10B981" }} />
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                }}
              >
                Your account is ready.
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                  marginBottom: "28px",
                  lineHeight: 1.7,
                }}
              >
                Welcome to SettleOne. Your first protected deal awaits.
              </p>
              <button
                id="signup-go-workspace"
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #059669, #10B981)",
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 0 24px rgba(16,185,129,0.35)",
                  transition: "all 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 0 40px rgba(16,185,129,0.55)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 0 24px rgba(16,185,129,0.35)";
                }}
              >
                Go to Workspace →
              </button>
            </div>
          )}

          {/* OTP */}
          {mode === "otp" && (
            <form
              onSubmit={handleVerifyOTP}
              style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  justifyContent: "center",
                }}
              >
                {otp.map((v, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    ref={(el) => {
                      otpRefs.current[i] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={v}
                    onChange={(e) => handleOtpInput(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKey(i, e)}
                    style={{
                      width: "46px",
                      height: "54px",
                      borderRadius: "11px",
                      background: v
                        ? "rgba(59,130,246,0.12)"
                        : "rgba(0,0,0,0.35)",
                      border: v
                        ? "1px solid rgba(59,130,246,0.6)"
                        : "1px solid rgba(255,255,255,0.1)",
                      color: "var(--text-primary)",
                      fontSize: "22px",
                      fontWeight: 800,
                      textAlign: "center",
                      outline: "none",
                      transition: "all 0.2s",
                      boxShadow: v ? "0 0 16px rgba(59,130,246,0.25)" : "none",
                      fontFamily: "var(--font-mono)",
                    }}
                  />
                ))}
              </div>
              <div style={{ textAlign: "center" }}>
                {timer > 0 ? (
                  <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
                    Resend in{" "}
                    <span
                      style={{
                        color: "var(--accent-blue)",
                        fontWeight: 700,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      0:{String(timer).padStart(2, "0")}
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => setTimer(59)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--accent-blue)",
                      fontSize: "13px",
                      fontWeight: 700,
                    }}
                  >
                    Resend Code
                  </button>
                )}
              </div>
              {error && (
                <div
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.25)",
                    borderRadius: "9px",
                    padding: "10px 14px",
                    fontSize: "13px",
                    color: "#F87171",
                  }}
                >
                  {error}
                </div>
              )}
              <button
                id="otp-verify"
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 800,
                  cursor: "pointer",
                  boxShadow: "0 0 24px rgba(59,130,246,0.35)",
                }}
              >
                Verify &amp; Create Account
              </button>
            </form>
          )}

          {/* FORGOT */}
          {mode === "forgot" && (
            <>
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
                onSubmit={(e) => {
                  e.preventDefault();
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    setError("Recovery link sent if account exists.");
                  }, 1200);
                }}
              >
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.target.style.borderColor = "rgba(59,130,246,0.6)";
                      e.target.style.boxShadow =
                        "0 0 0 3px rgba(59,130,246,0.12)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "rgba(255,255,255,0.1)";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </div>
                {error && (
                  <div
                    style={{
                      background: "rgba(59,130,246,0.1)",
                      border: "1px solid rgba(59,130,246,0.25)",
                      borderRadius: "9px",
                      padding: "10px 14px",
                      fontSize: "13px",
                      color: "var(--accent-cyan)",
                    }}
                  >
                    {error}
                  </div>
                )}
                <button
                  id="forgot-submit"
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "10px",
                    border: "none",
                    background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 800,
                    cursor: "pointer",
                    opacity: loading ? 0.7 : 1,
                    boxShadow: "0 0 24px rgba(59,130,246,0.35)",
                  }}
                >
                  {loading ? "Sending..." : "Send Recovery Link"}
                </button>
              </form>
              <p style={{ textAlign: "center", marginTop: "16px" }}>
                <button
                  onClick={() => setMode("login")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--accent-blue)",
                    fontSize: "13px",
                    fontWeight: 600,
                  }}
                >
                  ← Back to login
                </button>
              </p>
            </>
          )}

          {/* Legal */}
          {(mode === "login" || (mode === "signup" && step < 3)) && (
            <p
              style={{
                textAlign: "center",
                color: "var(--text-muted)",
                fontSize: "11px",
                marginTop: "18px",
                lineHeight: 1.6,
              }}
            >
              By continuing you agree to our{" "}
              <a
                href="#"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "underline",
                }}
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                href="#"
                style={{
                  color: "var(--text-secondary)",
                  textDecoration: "underline",
                }}
              >
                Privacy Policy
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
