import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Menu,
  X,
  TrendingUp,
  Layers,
  ShieldCheck,
  Scale,
  Zap,
  Globe,
  Lock,
  ChevronDown,
  Twitter,
  Linkedin,
  Github,
  CheckCircle,
  Circle,
  Coins,
  ExternalLink,
  Star,
  ChevronRight,
  BookOpen,
  Shield,
  Code,
} from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════
   ANIMATED FLOATING PARTICLES
   ══════════════════════════════════════════════════════════════════════════ */
function FloatingParticles({ count = 18 }: { count?: number }) {
  const particles = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.4 + 0.1,
    })),
  ).current;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: "50%",
            background: "var(--accent-blue)",
            opacity: p.opacity,
            animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            boxShadow: `0 0 ${p.size * 3}px rgba(59,130,246,0.6)`,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   GRADIENT ORBS
   ══════════════════════════════════════════════════════════════════════════ */
function GradientOrbs({
  variant = "default",
}: {
  variant?: "default" | "purple" | "cyan";
}) {
  const configs = {
    default: [
      {
        top: "-20%",
        left: "-10%",
        w: "600px",
        h: "600px",
        color: "rgba(59,130,246,0.12)",
      },
      {
        top: "10%",
        right: "-5%",
        w: "400px",
        h: "400px",
        color: "rgba(139,92,246,0.1)",
      },
      {
        bottom: "5%",
        left: "30%",
        w: "500px",
        h: "300px",
        color: "rgba(6,182,212,0.08)",
      },
    ],
    purple: [
      {
        top: "0%",
        left: "20%",
        w: "500px",
        h: "500px",
        color: "rgba(139,92,246,0.15)",
      },
      {
        bottom: "0%",
        right: "10%",
        w: "400px",
        h: "400px",
        color: "rgba(59,130,246,0.1)",
      },
    ],
    cyan: [
      {
        top: "10%",
        right: "0%",
        w: "500px",
        h: "500px",
        color: "rgba(6,182,212,0.12)",
      },
      {
        bottom: "0%",
        left: "0%",
        w: "400px",
        h: "400px",
        color: "rgba(59,130,246,0.08)",
      },
    ],
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {configs[variant].map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...(c as any),
            width: c.w,
            height: c.h,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${c.color} 0%, transparent 70%)`,
            filter: "blur(50px)",
            animation: `float ${8 + i * 2}s ease-in-out ${i * 1.5}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════════════════════ */
function Navbar({
  onLogin,
  onSignup,
}: {
  onLogin: () => void;
  onSignup: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Features", id: "features" },
    { label: "Pricing", id: "pricing" },
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "#", placeholder: true },
  ];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          background: scrolled ? "rgba(7,11,20,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(28px) saturate(1.5)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(28px) saturate(1.5)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.07)"
            : "1px solid transparent",
          boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.3)" : "none",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1.5rem" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "68px",
            }}
          >
            {/* ── Logo lockup: icon + wordmark ── */}
            <a
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                (
                  e.currentTarget.querySelector(".nav-logo-img") as HTMLElement
                ).style.filter = "drop-shadow(0 0 14px rgba(59,130,246,0.75))";
              }}
              onMouseLeave={(e) => {
                (
                  e.currentTarget.querySelector(".nav-logo-img") as HTMLElement
                ).style.filter = "drop-shadow(0 0 6px rgba(59,130,246,0.35))";
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  flexShrink: 0,
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid rgba(59,130,246,0.25)",
                  background: "rgba(13,20,36,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/whiteLogo.png"
                  alt=""
                  className="nav-logo-img"
                  style={{
                    width: "34px",
                    height: "34px",
                    objectFit: "contain",
                    filter: "drop-shadow(0 0 6px rgba(59,130,246,0.35))",
                    transition: "filter 0.3s",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: 1,
                }}
              >
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.02em",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  SettleOne
                </span>
                <span
                  style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    color: "var(--accent-cyan)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginTop: "2px",
                  }}
                >
                  Protocol
                </span>
              </div>
            </a>

            {/* ── Desktop Nav ── */}
            <div
              style={{ display: "flex", alignItems: "center", gap: "2rem" }}
              className="hidden md:flex"
            >
              {navLinks.map((link) =>
                link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                      fontWeight: 500,
                      textDecoration: "none",
                      transition: "color 0.2s",
                      opacity: link.placeholder ? 0.45 : 1,
                      position: "relative",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "var(--text-secondary)")
                    }
                  >
                    {link.label}
                    {link.placeholder && (
                      <span
                        style={{
                          marginLeft: "5px",
                          fontSize: "9px",
                          fontWeight: 700,
                          color: "var(--accent-amber)",
                          verticalAlign: "super",
                          letterSpacing: "0.05em",
                        }}
                      >
                        SOON
                      </span>
                    )}
                  </a>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollTo(link.id!)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color:
                        activeLink === link.id
                          ? "var(--accent-cyan)"
                          : "var(--text-secondary)",
                      fontSize: "14px",
                      fontWeight: 500,
                      transition: "color 0.2s",
                      padding: 0,
                      position: "relative",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "var(--text-primary)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color =
                        activeLink === link.id
                          ? "var(--accent-cyan)"
                          : "var(--text-secondary)")
                    }
                  >
                    {link.label}
                  </button>
                ),
              )}
            </div>

            {/* ── CTAs ── */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                onClick={onLogin}
                className="hidden md:block"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "9px",
                  color: "var(--text-secondary)",
                  padding: "8px 20px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.25s",
                  backdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)";
                  e.currentTarget.style.color = "var(--text-primary)";
                  e.currentTarget.style.background = "rgba(59,130,246,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = "var(--text-secondary)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }}
              >
                Login
              </button>
              <button
                onClick={onSignup}
                style={{
                  background:
                    "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)",
                  border: "none",
                  borderRadius: "9px",
                  color: "#fff",
                  padding: "8px 22px",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "all 0.25s",
                  boxShadow:
                    "0 0 20px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 40px rgba(59,130,246,0.65), inset 0 1px 0 rgba(255,255,255,0.2)";
                  e.currentTarget.style.transform =
                    "translateY(-1px) scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(59,130,246,0.35), inset 0 1px 0 rgba(255,255,255,0.15)";
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                }}
              >
                Get Started
              </button>
              <button
                className="md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                  width: "38px",
                  height: "38px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s",
                }}
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999,
          background: "rgba(7,11,20,0.98)",
          backdropFilter: "blur(30px)",
          display: "flex",
          flexDirection: "column",
          padding: "84px 2rem 2rem",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
            paddingBottom: "24px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <img
            src="/whiteLogo.png"
            alt="SettleOne"
            style={{ width: "48px", height: "48px", objectFit: "contain" }}
          />
        </div>
        {navLinks.map((link, i) => (
          <button
            key={link.label}
            onClick={() =>
              link.href
                ? (window.location.href = link.href!)
                : scrollTo(link.id!)
            }
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--text-primary)",
              fontSize: "24px",
              fontWeight: 700,
              padding: "16px 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              textAlign: "left",
              opacity: link.placeholder ? 0.4 : 1,
              animation: `slideInRight 0.4s ease ${i * 0.06}s both`,
            }}
          >
            {link.label}
          </button>
        ))}
        <div
          style={{
            marginTop: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <button
            onClick={() => {
              setMobileOpen(false);
              onLogin();
            }}
            style={{
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid var(--border-strong)",
              background: "rgba(255,255,255,0.04)",
              color: "var(--text-primary)",
              fontSize: "16px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Login
          </button>
          <button
            onClick={() => {
              setMobileOpen(false);
              onSignup();
            }}
            style={{
              padding: "14px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
              border: "none",
              color: "#fff",
              fontSize: "16px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 0 24px rgba(59,130,246,0.4)",
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TRUST BADGE
   ══════════════════════════════════════════════════════════════════════════ */
function TrustBadge({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "7px",
        padding: "6px 14px",
        borderRadius: "9999px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        fontSize: "12px",
        fontWeight: 500,
        color: "var(--text-secondary)",
        whiteSpace: "nowrap",
        transition: "all 0.25s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(59,130,246,0.1)";
        e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)";
        e.currentTarget.style.color = "var(--text-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
        e.currentTarget.style.color = "var(--text-secondary)";
      }}
    >
      <CheckCircle size={11} style={{ color: "var(--accent-cyan)" }} />
      {label}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SECTION HEADING  (enhanced with gradient underline bar)
   ══════════════════════════════════════════════════════════════════════════ */
function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  accentColor = "#3B82F6",
}: {
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  accentColor?: string;
}) {
  return (
    <div style={{ textAlign: align, marginBottom: "3.5rem" }}>
      {badge && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "7px",
            padding: "5px 16px",
            borderRadius: "9999px",
            background: `${accentColor}12`,
            border: `1px solid ${accentColor}30`,
            color: accentColor,
            fontSize: "10px",
            fontWeight: 800,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "20px",
            boxShadow: `0 0 20px ${accentColor}10`,
          }}
        >
          <div
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: accentColor,
              boxShadow: `0 0 6px ${accentColor}`,
            }}
          />
          {badge}
        </div>
      )}
      <h2
        style={{
          fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          lineHeight: 1.1,
          color: "var(--text-primary)",
          margin: "0 0 16px",
          fontFamily: "var(--font-sans)",
        }}
      >
        {title}
      </h2>
      {/* Gradient underline bar */}
      <div
        style={{
          width: align === "center" ? "60px" : "48px",
          height: "3px",
          borderRadius: "2px",
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          margin: align === "center" ? "0 auto 18px" : "0 0 18px",
          boxShadow: `0 0 12px ${accentColor}60`,
        }}
      />
      {subtitle && (
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "16px",
            maxWidth: align === "center" ? "560px" : "100%",
            margin: align === "center" ? "0 auto" : "0",
            lineHeight: 1.8,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FEATURE CARD (with enhanced hover)
   ══════════════════════════════════════════════════════════════════════════ */
function FeatureCard({
  icon: Icon,
  iconColor,
  glowColor,
  title,
  body,
  delay,
}: any) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className={`animate-fade-in-up`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${glowColor}08, rgba(13,20,36,1))`
            : "var(--bg-elevated)",
          border: hovered
            ? `1px solid ${glowColor}50`
            : "1px solid var(--border)",
          borderRadius: "16px",
          padding: "2rem",
          transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
          transform: hovered
            ? "translateY(-6px) scale(1.01)"
            : "translateY(0) scale(1)",
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${glowColor}15`
            : "0 1px 3px rgba(0,0,0,0.3)",
          cursor: "default",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Shimmer top line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            right: "20%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${glowColor}80, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s",
          }}
        />

        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "14px",
            background: `${glowColor}15`,
            border: `1px solid ${glowColor}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.25rem",
            boxShadow: hovered ? `0 0 24px ${glowColor}40` : "none",
            transition: "all 0.35s",
            transform: hovered
              ? "scale(1.08) rotate(-3deg)"
              : "scale(1) rotate(0)",
          }}
        >
          <Icon size={22} style={{ color: glowColor }} />
        </div>
        <h3
          style={{
            fontSize: "16px",
            fontWeight: 700,
            marginBottom: "10px",
            color: "var(--text-primary)",
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "13.5px",
            lineHeight: 1.8,
            margin: 0,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   AUTO-TICKING DEAL STATE TIMELINE  (uses IntersectionObserver)
   ══════════════════════════════════════════════════════════════════════════ */
const DEAL_STATES = [
  { label: "Awaiting\nFunding", color: "#F59E0B", shortLabel: "Funding" },
  { label: "Pending\nAcceptance", color: "#3B82F6", shortLabel: "Pending" },
  { label: "Active", color: "#10B981", shortLabel: "Active" },
  { label: "Delivery\nSubmitted", color: "#8B5CF6", shortLabel: "Delivery" },
  { label: "Verifying", color: "#0EA5E9", shortLabel: "Verify" },
  { label: "Awaiting\nAcceptance", color: "#0EA5E9", shortLabel: "Awaiting" },
  { label: "Accepted", color: "#14B8A6", shortLabel: "Accepted" },
  { label: "Released", color: "#10B981", shortLabel: "Released" },
  { label: "Disputed", color: "#EF4444", shortLabel: "Disputed" },
  { label: "Settled", color: "#64748B", shortLabel: "Settled" },
  { label: "Refunded", color: "#F59E0B", shortLabel: "Refunded" },
  { label: "Cancelled", color: "#6B7280", shortLabel: "Cancelled" },
];

function DealTimeline() {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const startAnimation = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const runCycle = () => {
      setIsRunning(true);
      setActiveIdx(0);
      let current = 0;
      intervalRef.current = setInterval(() => {
        current += 1;
        if (current >= DEAL_STATES.length) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          // Auto-loop: pause 2s then restart
          loopTimeoutRef.current = setTimeout(() => {
            setActiveIdx(-1);
            setTimeout(runCycle, 400);
          }, 2000);
          return;
        }
        setActiveIdx(current);
      }, 650);
    };
    runCycle();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(startAnimation, 400);
        }
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    };
  }, [startAnimation]);

  return (
    <div ref={sectionRef}>
      {/* Timeline — hidden scroll bar */}
      <div
        style={
          {
            overflowX: "auto",
            paddingBottom: "4px",
            msOverflowStyle: "none",
          } as any
        }
        className="timeline-scroll"
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            minWidth: "max-content",
            padding: "24px 24px 8px",
            gap: 0,
            position: "relative",
          }}
        >
          {/* Background rail */}
          <div
            style={{
              position: "absolute",
              top: "45px",
              left: "48px",
              right: "48px",
              height: "2px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "1px",
            }}
          />
          {/* Animated fill rail */}
          <div
            style={{
              position: "absolute",
              top: "45px",
              left: "48px",
              height: "2px",
              borderRadius: "1px",
              zIndex: 1,
              background:
                "linear-gradient(90deg, #F59E0B, #3B82F6, #10B981, #8B5CF6, #14B8A6, #10B981)",
              width:
                activeIdx < 0
                  ? "0%"
                  : `${(activeIdx / (DEAL_STATES.length - 1)) * 100}%`,
              transition: "width 0.55s cubic-bezier(0.16,1,0.3,1)",
              boxShadow: "0 0 12px rgba(59,130,246,0.6)",
            }}
          />

          {DEAL_STATES.map((state, i) => {
            const isActive = i <= activeIdx;
            const isCurrent = i === activeIdx;
            return (
              <div
                key={i}
                style={{ display: "flex", alignItems: "flex-start", zIndex: 2 }}
              >
                <div
                  onClick={() => {
                    if (!isRunning) setActiveIdx(i);
                  }}
                  style={{
                    cursor: isRunning ? "default" : "pointer",
                    padding: "0 10px",
                    textAlign: "center",
                  }}
                >
                  {/* Node circle */}
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: isActive
                        ? `${state.color}22`
                        : "rgba(255,255,255,0.03)",
                      border: `2px solid ${isActive ? state.color : "rgba(255,255,255,0.1)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px",
                      boxShadow: isCurrent
                        ? `0 0 0 4px ${state.color}25, 0 0 24px ${state.color}50`
                        : isActive
                          ? `0 0 12px ${state.color}30`
                          : "none",
                      transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                      transform: isCurrent
                        ? "scale(1.15)"
                        : isActive
                          ? "scale(1.05)"
                          : "scale(1)",
                    }}
                  >
                    {isActive ? (
                      <CheckCircle
                        size={isCurrent ? 20 : 17}
                        style={{ color: state.color, transition: "all 0.3s" }}
                      />
                    ) : (
                      <Circle
                        size={13}
                        style={{ color: "rgba(255,255,255,0.15)" }}
                      />
                    )}
                  </div>
                  {/* Label */}
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? state.color : "var(--text-muted)",
                      maxWidth: "68px",
                      lineHeight: 1.35,
                      whiteSpace: "pre-line",
                      transition: "color 0.4s",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {state.label}
                  </div>
                </div>
                {/* Connector gap between nodes (visual only — actual line is the rail above) */}
                {i < DEAL_STATES.length - 1 && (
                  <div
                    style={{ width: "8px", flexShrink: 0, marginTop: "21px" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* State label indicator only — no button */}
      {activeIdx >= 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "14px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 16px",
              borderRadius: "9999px",
              background: `${DEAL_STATES[activeIdx]?.color}12`,
              border: `1px solid ${DEAL_STATES[activeIdx]?.color}35`,
              transition: "all 0.4s",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: DEAL_STATES[activeIdx]?.color,
                boxShadow: `0 0 8px ${DEAL_STATES[activeIdx]?.color}`,
                animation: "pulse-glow 1.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: DEAL_STATES[activeIdx]?.color,
                letterSpacing: "0.03em",
              }}
            >
              {DEAL_STATES[activeIdx]?.label.replace("\n", " ")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   TOKEN / CHAIN LOGO PILL  (with real images)
   ══════════════════════════════════════════════════════════════════════════ */
function TokenPill({
  name,
  logo,
  size = 24,
  hoverColor,
}: {
  name: string;
  logo: string;
  size?: number;
  hoverColor?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "9px",
        padding: "8px 18px",
        borderRadius: "9999px",
        background: hovered
          ? "rgba(255,255,255,0.07)"
          : "rgba(255,255,255,0.04)",
        border: hovered
          ? `1px solid ${hoverColor || "rgba(59,130,246,0.5)"}`
          : "1px solid rgba(255,255,255,0.09)",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        cursor: "default",
        fontSize: "13px",
        fontWeight: 600,
        color: hovered ? "var(--text-primary)" : "var(--text-secondary)",
        transform: hovered
          ? "translateY(-2px) scale(1.03)"
          : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 8px 24px rgba(0,0,0,0.3), 0 0 16px ${hoverColor || "rgba(59,130,246,0.2)"}`
          : "none",
      }}
    >
      {!imgError ? (
        <img
          src={logo}
          alt={name}
          onError={() => setImgError(true)}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            objectFit: "contain",
            borderRadius: "50%",
            filter: hovered
              ? "brightness(1.1) drop-shadow(0 0 4px rgba(255,255,255,0.2))"
              : "brightness(0.9)",
            transition: "filter 0.3s",
          }}
        />
      ) : (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: 800,
            color: "#fff",
          }}
        >
          {name[0]}
        </div>
      )}
      {name}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PRICING FAQ ITEM
   ══════════════════════════════════════════════════════════════════════════ */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{ borderBottom: "1px solid var(--border)", overflow: "hidden" }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 0",
          color: "var(--text-primary)",
          fontSize: "15px",
          fontWeight: 500,
          textAlign: "left",
          gap: "12px",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.color = "var(--accent-blue)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.color = "var(--text-primary)")
        }
      >
        {q}
        <div
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            flexShrink: 0,
            background: open
              ? "rgba(59,130,246,0.2)"
              : "rgba(255,255,255,0.05)",
            border: open
              ? "1px solid rgba(59,130,246,0.4)"
              : "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.25s",
          }}
        >
          <ChevronDown
            size={13}
            style={{
              color: open ? "var(--accent-blue)" : "var(--text-secondary)",
              transform: open ? "rotate(180deg)" : "rotate(0)",
              transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
      </button>
      <div
        style={{
          maxHeight: open ? "200px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "14px",
            lineHeight: 1.8,
            paddingBottom: "18px",
            margin: 0,
          }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PRICING TABLE
   ══════════════════════════════════════════════════════════════════════════ */
function PricingTable() {
  const rows = [
    {
      feature: "Fees on principal",
      settleOne: "0%",
      trad: "0.5-1%",
      freelance: "0%",
    },
    {
      feature: "Platform %",
      settleOne: "15% of yield only",
      trad: "-",
      freelance: "10-20% fee",
    },
    {
      feature: "On-chain record",
      settleOne: "Yes",
      trad: "No",
      freelance: "No",
    },
    { feature: "Yield earned", settleOne: "Yes", trad: "No", freelance: "No" },
    {
      feature: "Dispute resolver",
      settleOne: "Expert arbitrator",
      trad: "Platform",
      freelance: "Platform",
    },
    {
      feature: "Evidence record",
      settleOne: "Immutable",
      trad: "No",
      freelance: "No",
    },
  ];
  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{ width: "100%", borderCollapse: "collapse", minWidth: "560px" }}
      >
        <thead>
          <tr>
            {[
              "Feature",
              "SettleOne",
              "Traditional Escrow",
              "Freelance Platforms",
            ].map((h, i) => (
              <th
                key={h}
                style={{
                  padding: "13px 16px",
                  textAlign: "left",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: i === 1 ? "var(--accent-cyan)" : "var(--text-muted)",
                  borderBottom: "1px solid var(--border)",
                  background: i === 1 ? "rgba(59,130,246,0.06)" : "transparent",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{
                borderBottom: "1px solid var(--border)",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <td
                style={{
                  padding: "13px 16px",
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                }}
              >
                {row.feature}
              </td>
              <td
                style={{
                  padding: "13px 16px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "var(--accent-cyan)",
                  background: "rgba(59,130,246,0.03)",
                }}
              >
                {row.settleOne}
              </td>
              <td
                style={{
                  padding: "13px 16px",
                  fontSize: "13px",
                  color: "var(--text-muted)",
                }}
              >
                {row.trad}
              </td>
              <td
                style={{
                  padding: "13px 16px",
                  fontSize: "13px",
                  color: "var(--text-muted)",
                }}
              >
                {row.freelance}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════════════════ */
function Footer({
  onLogin,
  onSignup,
}: {
  onLogin: () => void;
  onSignup: () => void;
}) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const columns = [
    {
      title: "Product",
      links: [
        { label: "Features", action: "scroll:features" },
        { label: "Pricing", action: "scroll:pricing" },
        { label: "Changelog", href: "#" },
        { label: "Roadmap", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Docs", href: "/docs" },
        { label: "GitHub", href: "#" },
        { label: "Smart Contracts", href: "#" },
        { label: "Audit Reports", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer
      style={{
        background: "var(--bg-subtle)",
        borderTop: "1px solid var(--border)",
        padding: "60px 1.5rem 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Footer bg: hero-bg.jpg + silverLogo watermark */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-40px",
          right: "-40px",
          width: "320px",
          height: "320px",
          backgroundImage: "url('/silverLogo.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          opacity: 0.03,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "9px",
                  overflow: "hidden",
                  border: "1px solid rgba(59,130,246,0.2)",
                  background: "rgba(13,20,36,0.8)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/whiteLogo.png"
                  alt="SettleOne"
                  style={{
                    width: "30px",
                    height: "30px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "14px",
                    fontWeight: 800,
                    color: "var(--text-primary)",
                    margin: 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  SettleOne
                </p>
                <p
                  style={{
                    fontSize: "9px",
                    fontWeight: 600,
                    color: "var(--accent-cyan)",
                    margin: 0,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Protocol
                </p>
              </div>
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "13px",
                lineHeight: 1.75,
                marginBottom: "20px",
                maxWidth: "220px",
              }}
            >
              Transaction commitment layer for MSME commerce. Secure,
              yield-bearing, on-chain.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "9px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--text-muted)",
                    transition: "all 0.25s",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)";
                    e.currentTarget.style.color = "var(--accent-blue)";
                    e.currentTarget.style.background = "rgba(59,130,246,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  marginBottom: "16px",
                }}
              >
                {col.title}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"action" in link ? (
                      <button
                        onClick={() => {
                          const [type, id] = (link as any).action.split(":");
                          if (id === "login") onLogin();
                          else if (id === "signup") onSignup();
                          else scrollTo(id);
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          color: "var(--text-secondary)",
                          fontSize: "13px",
                          textAlign: "left",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--text-primary)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "var(--text-secondary)")
                        }
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={(link as any).href}
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "13px",
                          textDecoration: "none",
                          transition: "color 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--text-primary)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "var(--text-secondary)")
                        }
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <p
            style={{ color: "var(--text-muted)", fontSize: "13px", margin: 0 }}
          >
            © 2026 SettleOne Protocol. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (l) => (
                <a
                  key={l}
                  href="#"
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "12px",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text-secondary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  {l}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   LANDING PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function LandingPage() {
  const [showAuthModal, setShowAuthModal] = useState<"login" | "signup" | null>(
    null,
  );

  const tokens = [
    {
      name: "USDC",
      logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=040",
      hoverColor: "#2775CA",
    },
    {
      name: "USDT",
      logo: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=040",
      hoverColor: "#26A17B",
    },
    {
      name: "DAI",
      logo: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png?v=040",
      hoverColor: "#F5AC37",
    },
    {
      name: "ETH",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040",
      hoverColor: "#627EEA",
    },
    { name: "SETL", logo: "/logocoin1.jpg", hoverColor: "#8B9CC8" },
  ];

  const chains = [
    {
      name: "Ethereum",
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=040",
      hoverColor: "#627EEA",
    },
    {
      name: "Polygon",
      logo: "https://cryptologos.cc/logos/polygon-matic-logo.png?v=040",
      hoverColor: "#8247E5",
    },
    {
      name: "Arbitrum",
      logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.png?v=040",
      hoverColor: "#2D374B",
    },
    {
      name: "Base",
      logo: "https://cryptologos.cc/logos/base-base-logo.png?v=040",
      hoverColor: "#0052FF",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        fontFamily: "var(--font-sans)",
        overflowX: "hidden",
      }}
    >
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={showAuthModal}
          onClose={() => setShowAuthModal(null)}
          onSwitch={(m) => setShowAuthModal(m)}
        />
      )}

      <Navbar
        onLogin={() => setShowAuthModal("login")}
        onSignup={() => setShowAuthModal("signup")}
      />

      {/* ══════════════════════════════════════════════════════
          SECTION 1 — HERO
          ══════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          position: "relative",
          paddingTop: "100px",
          paddingBottom: "80px",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Hero background image */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.15,
          }}
        />
        {/* Multi-layer gradient overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background:
              "linear-gradient(180deg, rgba(7,11,20,0.4) 0%, transparent 40%, transparent 70%, rgba(7,11,20,0.9) 100%)",
          }}
        />
        <GradientOrbs variant="default" />
        <FloatingParticles count={16} />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            {/* ── Left: Text ── */}
            <div>
              {/* Tag line badge */}
              <div
                className="animate-fade-in-up"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "6px 16px",
                  borderRadius: "9999px",
                  background: "rgba(59,130,246,0.08)",
                  border: "1px solid rgba(59,130,246,0.22)",
                  color: "var(--accent-cyan)",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "22px",
                }}
              >
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    background: "var(--accent-cyan)",
                    boxShadow: "0 0 6px rgba(6,182,212,0.8)",
                    animation: "pulse-glow 2.5s ease-in-out infinite",
                  }}
                />
                Transaction Commitment Layer for MSME Commerce
              </div>

              <h1
                className="animate-fade-in-up delay-200"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  fontWeight: 900,
                  lineHeight: 1.05,
                  letterSpacing: "-0.045em",
                  color: "var(--text-primary)",
                  marginBottom: "20px",
                }}
              >
                Your money is locked.{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% 200%",
                    animation: "gradient-shift 4s ease infinite",
                  }}
                >
                  Make it work.
                </span>
              </h1>

              <p
                className="animate-fade-in-up delay-300"
                style={{
                  fontSize: "16px",
                  color: "var(--text-secondary)",
                  maxWidth: "500px",
                  marginBottom: "36px",
                  lineHeight: 1.8,
                }}
              >
                SettleOne escrows MSME deals on-chain while your funds earn
                yield with tamper-proof evidence, automated settlement, and
                transparent arbitration.
              </p>

              {/* CTAs */}
              <div
                className="animate-fade-in-up delay-400"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  marginBottom: "40px",
                }}
              >
                <button
                  onClick={() => setShowAuthModal("signup")}
                  style={{
                    background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                    border: "none",
                    borderRadius: "11px",
                    color: "#fff",
                    padding: "13px 28px",
                    fontSize: "15px",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    boxShadow:
                      "0 0 30px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-2px) scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 0 50px rgba(59,130,246,0.65), inset 0 1px 0 rgba(255,255,255,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(59,130,246,0.4), inset 0 1px 0 rgba(255,255,255,0.15)";
                  }}
                >
                  Create Your First Deal <ArrowRight size={16} />
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("how-it-works")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "11px",
                    color: "var(--text-primary)",
                    padding: "13px 28px",
                    fontSize: "15px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.3s",
                    backdropFilter: "blur(8px)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.12)";
                  }}
                >
                  See How It Works
                </button>
              </div>

              {/* Trust badges */}
              <div
                className="animate-fade-in-up delay-500"
                style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
              >
                {[
                  "Chainlink Automation",
                  "Aave Yield Strategies",
                  "EIP-712 Signatures",
                  "UUPS Upgradeable",
                  "Multi-chain Ready",
                  "Open Source",
                ].map((t) => (
                  <TrustBadge key={t} label={t} />
                ))}
              </div>
            </div>

            {/* ── Right: Hero Dashboard Mockup ── */}
            <div
              className="animate-fade-in-up delay-300 hidden md:flex"
              style={{
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Outer glow halo */}
              <div
                style={{
                  position: "absolute",
                  inset: "-60px",
                  background:
                    "radial-gradient(ellipse at center, rgba(59,130,246,0.14) 0%, transparent 65%)",
                  animation: "float 7s ease-in-out infinite",
                }}
              />

              {/* Main dashboard glass card */}
              <div
                style={{
                  position: "relative",
                  width: "360px",
                  background: "rgba(8,13,26,0.85)",
                  backdropFilter: "blur(30px)",
                  WebkitBackdropFilter: "blur(30px)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  borderRadius: "22px",
                  overflow: "hidden",
                  boxShadow:
                    "0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(59,130,246,0.12), inset 0 1px 0 rgba(255,255,255,0.07)",
                  animation: "float 6s ease-in-out infinite",
                }}
              >
                {/* Top shimmer */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "20%",
                    right: "20%",
                    height: "1px",
                    background:
                      "linear-gradient(90deg, transparent, rgba(59,130,246,0.9), transparent)",
                  }}
                />

                {/* Card header bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "14px 18px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(59,130,246,0.05)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <img
                      src="/whiteLogo.png"
                      alt=""
                      style={{
                        width: "22px",
                        height: "22px",
                        objectFit: "contain",
                        filter: "drop-shadow(0 0 4px rgba(59,130,246,0.5))",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      SettleOne Dashboard
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: "5px" }}>
                    {["#EF4444", "#F59E0B", "#10B981"].map((c) => (
                      <div
                        key={c}
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: c,
                          opacity: 0.7,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Deal card body */}
                <div style={{ padding: "18px" }}>
                  {/* Logo + Deal ID row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "14px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid rgba(59,130,246,0.25)",
                        flexShrink: 0,
                        background: "rgba(13,20,36,0.8)",
                      }}
                    >
                      <img
                        src="/goldenLogo.png"
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          margin: "0 0 2px",
                        }}
                      >
                        Deal #SO-2840
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "var(--text-muted)",
                          margin: 0,
                        }}
                      >
                        Software Development · USDC
                      </p>
                    </div>
                    <div
                      style={{
                        marginLeft: "auto",
                        padding: "4px 10px",
                        borderRadius: "6px",
                        background: "rgba(16,185,129,0.12)",
                        border: "1px solid rgba(16,185,129,0.3)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          color: "#10B981",
                          letterSpacing: "0.04em",
                        }}
                      >
                        ACTIVE
                      </span>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: "8px",
                      marginBottom: "14px",
                    }}
                  >
                    {[
                      { label: "Escrow", val: "$10,000", color: "#3B82F6" },
                      { label: "Yield", val: "+$247", color: "#10B981" },
                      { label: "Fee", val: "$37", color: "#8B5CF6" },
                    ].map((s) => (
                      <div
                        key={s.label}
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: "10px",
                          padding: "10px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "9px",
                            color: "var(--text-muted)",
                            fontWeight: 700,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            margin: "0 0 4px",
                          }}
                        >
                          {s.label}
                        </p>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: 900,
                            color: s.color,
                            margin: 0,
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {s.val}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div style={{ marginBottom: "14px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "6px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "10px",
                          color: "var(--text-muted)",
                          fontWeight: 600,
                        }}
                      >
                        Deal Progress
                      </span>
                      <span
                        style={{
                          fontSize: "10px",
                          color: "var(--accent-cyan)",
                          fontWeight: 700,
                        }}
                      >
                        67%
                      </span>
                    </div>
                    <div
                      style={{
                        height: "4px",
                        background: "rgba(255,255,255,0.06)",
                        borderRadius: "2px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: "67%",
                          background:
                            "linear-gradient(90deg, #1D4ED8, #06B6D4)",
                          borderRadius: "2px",
                          boxShadow: "0 0 8px rgba(59,130,246,0.6)",
                        }}
                      />
                    </div>
                  </div>

                  {/* Silver logo watermark as background element */}
                  <div
                    style={{
                      position: "absolute",
                      right: "12px",
                      bottom: "60px",
                      width: "80px",
                      height: "80px",
                      opacity: 0.04,
                      pointerEvents: "none",
                    }}
                  >
                    <img
                      src="/silverLogo.png"
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Parties */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    {[
                      { role: "Buyer", addr: "0x71ab…3f90", color: "#3B82F6" },
                      { role: "Seller", addr: "0xc2d4…8a11", color: "#10B981" },
                    ].map((p) => (
                      <div
                        key={p.role}
                        style={{
                          flex: 1,
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                          borderRadius: "9px",
                          padding: "8px 10px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "9px",
                            color: p.color,
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            margin: "0 0 3px",
                          }}
                        >
                          {p.role}
                        </p>
                        <p
                          style={{
                            fontSize: "10px",
                            color: "var(--text-secondary)",
                            margin: 0,
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {p.addr}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge — yield */}
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  right: "-10px",
                  background: "rgba(8,13,26,0.9)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(16,185,129,0.4)",
                  borderRadius: "12px",
                  padding: "10px 14px",
                  animation: "float 4s ease-in-out 0.8s infinite",
                  boxShadow:
                    "0 8px 24px rgba(0,0,0,0.4), 0 0 16px rgba(16,185,129,0.15)",
                }}
              >
                <p
                  style={{
                    fontSize: "9px",
                    color: "#10B981",
                    fontWeight: 700,
                    margin: "0 0 2px",
                    letterSpacing: "0.08em",
                  }}
                >
                  YIELD APY
                </p>
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: 900,
                    color: "#10B981",
                    margin: 0,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  4.8%
                </p>
              </div>

              {/* Floating badge — secured */}
              <div
                style={{
                  position: "absolute",
                  bottom: "-10px",
                  left: "-14px",
                  background: "rgba(8,13,26,0.9)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(139,92,246,0.4)",
                  borderRadius: "12px",
                  padding: "10px 14px",
                  animation: "float 5s ease-in-out 1.5s infinite",
                  boxShadow:
                    "0 8px 24px rgba(0,0,0,0.4), 0 0 16px rgba(139,92,246,0.15)",
                }}
              >
                <p
                  style={{
                    fontSize: "9px",
                    color: "#8B5CF6",
                    fontWeight: 700,
                    margin: "0 0 2px",
                    letterSpacing: "0.08em",
                  }}
                >
                  TOTAL SECURED
                </p>
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: 900,
                    color: "var(--text-primary)",
                    margin: 0,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  $2.4M
                </p>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            style={{ textAlign: "center", marginTop: "60px" }}
            className="scroll-indicator"
          >
            <ChevronDown
              size={22}
              style={{ color: "var(--text-muted)", margin: "0 auto" }}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 2 — HOW IT WORKS
          ══════════════════════════════════════════════════════ */}
      <section
        id="how-it-works"
        style={{
          padding: "100px 1.5rem",
          background: "var(--bg-subtle)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background image for Process section */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.05,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <GradientOrbs variant="cyan" />
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <SectionHeading
            badge="Process"
            title="A deal in three certainties"
            subtitle="Three clear steps that eliminate counterparty risk, from fund lock-in to final release."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "0",
              position: "relative",
            }}
            className="how-grid"
          >
            {[
              {
                step: "01",
                icon: Lock,
                color: "#3B82F6",
                title: "Commit",
                body: "Buyer creates deal terms and locks funds in the yield-bearing EscrowVault. 60% upfront, 40% on delivery.",
              },
              {
                step: "02",
                icon: ShieldCheck,
                color: "#8B5CF6",
                title: "Deliver",
                body: "Seller fulfils the order and submits cryptographic proof. An on-chain verifier approves delivery via EIP-712 or Chainlink.",
              },
              {
                step: "03",
                icon: Coins,
                color: "#10B981",
                title: "Settle",
                body: "Funds + earned Aave yield are automatically distributed. Zero custody risk, zero manual intervention.",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 150}ms`, position: "relative" }}
              >
                {/* Arrow connector */}
                {i < 2 && (
                  <div
                    style={{
                      position: "absolute",
                      right: "-16px",
                      top: "50%",
                      transform: "translateY(-60%)",
                      zIndex: 10,
                      color: "var(--text-muted)",
                      fontSize: "20px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    className="hidden md:flex"
                  >
                    <ArrowRight
                      size={18}
                      style={{ color: "rgba(255,255,255,0.15)" }}
                    />
                  </div>
                )}
                <div
                  style={{
                    padding: "2.5rem",
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    borderRadius:
                      i === 0
                        ? "16px 0 0 16px"
                        : i === 2
                          ? "0 16px 16px 0"
                          : "0",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    const t = e.currentTarget;
                    t.style.transform = "translateY(-4px)";
                    t.style.boxShadow = `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${s.color}20`;
                    t.style.borderColor = `${s.color}40`;
                    t.style.zIndex = "5";
                  }}
                  onMouseLeave={(e) => {
                    const t = e.currentTarget;
                    t.style.transform = "translateY(0)";
                    t.style.boxShadow = "none";
                    t.style.borderColor = "var(--border)";
                    t.style.zIndex = "1";
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "20px",
                      fontSize: "80px",
                      fontWeight: 900,
                      color: `${s.color}07`,
                      lineHeight: 1,
                      fontFamily: "var(--font-mono)",
                      userSelect: "none",
                    }}
                  >
                    {s.step}
                  </div>
                  <div
                    style={{
                      width: "54px",
                      height: "54px",
                      borderRadius: "15px",
                      background: `${s.color}18`,
                      border: `1px solid ${s.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.5rem",
                    }}
                  >
                    <s.icon size={24} style={{ color: s.color }} />
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "12px",
                      color: s.color,
                      fontWeight: 700,
                      marginBottom: "8px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {s.step}
                  </p>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      marginBottom: "12px",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "14px",
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 3 — FEATURES
          ══════════════════════════════════════════════════════ */}
      <section
        id="features"
        style={{
          padding: "100px 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background image for Features section */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.04,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <GradientOrbs variant="purple" />
        <FloatingParticles count={10} />
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <SectionHeading
            badge="Features"
            title={
              <>
                Built for trust.{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Engineered for scale.
                </span>
              </>
            }
            subtitle="From yield-bearing escrow to expert arbitration — every feature serves one goal: eliminate counterparty risk."
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "18px",
            }}
          >
            <FeatureCard
              icon={TrendingUp}
              iconColor="#10B981"
              glowColor="#10B981"
              delay={100}
              title="Your escrow earns while you wait"
              body="Locked principal is routed to low-risk DeFi strategies (Aave). Buyers receive yield back at settlement. The longer the deal, the more you earn."
            />
            <FeatureCard
              icon={Layers}
              iconColor="#3B82F6"
              glowColor="#3B82F6"
              delay={200}
              title="60/40 staged commitment"
              body="Fund 60% upfront to secure the deal. Pay the remaining 40% only after delivery is verified — aligning incentives for both parties."
            />
            <FeatureCard
              icon={Shield}
              iconColor="#8B5CF6"
              glowColor="#8B5CF6"
              delay={300}
              title="On-chain evidence registry"
              body="Every delivery document, invoice, and receipt is hashed and committed on-chain. Evidence cannot be altered or deleted after submission."
            />
            <FeatureCard
              icon={Scale}
              iconColor="#F59E0B"
              glowColor="#F59E0B"
              delay={400}
              title="Expert dispute resolution"
              body="When deals go wrong, a qualified arbitrator reviews on-chain evidence and issues a binding verdict: Seller Wins, Buyer Wins, or Split Settlement."
            />
            <FeatureCard
              icon={Zap}
              iconColor="#06B6D4"
              glowColor="#06B6D4"
              delay={500}
              title="Chainlink Automation"
              body="Critical state transitions are automated by Chainlink Keepers — no manual intervention needed for timeouts, releases, or dispute escalations."
            />
            <FeatureCard
              icon={Globe}
              iconColor="#0EA5E9"
              glowColor="#0EA5E9"
              delay={600}
              title="Multi-chain & multi-token"
              body="Deploy on Ethereum, Polygon, Arbitrum, or Base. Support USDC, USDT, DAI, ETH, and SETL — admin whitelisted per deployment."
            />
          </div>

          {/* Feature detail mini-cards */}
          <div
            style={{
              marginTop: "3.5rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
            className="feature-detail-grid"
          >
            {[
              {
                title: "EscrowVault Architecture",
                icon: Lock,
                color: "#3B82F6",
                items: [
                  "Shared pool with share minting",
                  "Aave V3 integration for yield",
                  "Non-custodial by design",
                  "UUPS upgradeable proxy",
                ],
              },
              {
                title: "Verification Layer",
                icon: Shield,
                color: "#8B5CF6",
                items: [
                  "EIP-712 cryptographic signatures",
                  "Chainlink AnyAPI async verification",
                  "IPFS CID proof storage",
                  "Immutable delivery record",
                ],
              },
            ].map((card, i) => (
              <div
                key={i}
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "14px",
                  padding: "1.75rem",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${card.color}40`;
                  e.currentTarget.style.boxShadow = `0 12px 40px rgba(0,0,0,0.3), 0 0 24px ${card.color}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "18px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: `${card.color}18`,
                      border: `1px solid ${card.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <card.icon size={20} style={{ color: card.color }} />
                  </div>
                  <h3
                    style={{
                      fontSize: "15px",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    {card.title}
                  </h3>
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "9px",
                  }}
                >
                  {card.items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        fontSize: "13px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      <CheckCircle
                        size={13}
                        style={{ color: card.color, flexShrink: 0 }}
                      />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 4 — DEAL STATE TIMELINE (Auto-tick)
          ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "100px 1.5rem",
          background: "var(--bg-subtle)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <GradientOrbs variant="default" />
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <SectionHeading
            badge="Lifecycle"
            title="From agreement to settlement — fully tracked"
            subtitle="Every deal progresses through transparent, on-chain verified states. Watch the lifecycle unfold."
          />
          {/* Glassy container for timeline */}
          <div
            style={{
              background: "rgba(13,20,36,0.7)",
              backdropFilter: "blur(20px)",
              border: "1px solid var(--border)",
              borderRadius: "20px",
              padding: "2rem",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "30%",
                right: "30%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)",
              }}
            />
            <DealTimeline />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 5 — TOKENS & CHAINS (real logos)
          ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "80px 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <SectionHeading
            badge="Supported"
            title="Works with the tokens you already use"
            subtitle="Protocol admin whitelists tokens per deployment. Multi-chain from day one."
          />

          {/* Tokens row */}
          <div style={{ marginBottom: "36px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "18px",
              }}
            >
              Supported Tokens
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              {tokens.map((t) => (
                <TokenPill
                  key={t.name}
                  name={t.name}
                  logo={t.logo}
                  size={26}
                  hoverColor={t.hoverColor}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, var(--border-strong), transparent)",
              margin: "0 0 36px",
            }}
          />

          {/* Chains row */}
          <div>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "18px",
              }}
            >
              Supported Chains
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              {chains.map((c) => (
                <TokenPill
                  key={c.name}
                  name={c.name}
                  logo={c.logo}
                  size={26}
                  hoverColor={c.hoverColor}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 6 — SETL TOKEN  (uses logoCoin.png + logocoin1.jpg)
          ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "100px 1.5rem",
          background: "var(--bg-subtle)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* logoCoin.png as massive background covering whole section */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/logoCoin.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            opacity: 0.06,
            pointerEvents: "none",
            zIndex: 0,
            filter: "blur(2px)",
          }}
        />
        <GradientOrbs variant="purple" />
        <FloatingParticles count={8} />

        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "5rem",
              alignItems: "center",
            }}
            className="setl-grid"
          >
            {/* ── Left: text ── */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "4px 14px",
                  borderRadius: "9999px",
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.25)",
                  color: "#8B5CF6",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginBottom: "20px",
                }}
              >
                <Coins size={10} /> SETL Token
              </div>
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "var(--text-primary)",
                  marginBottom: "16px",
                  lineHeight: 1.15,
                }}
              >
                The SETL Token{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #06B6D4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  SettleOne's Infrastructure Fuel
                </span>
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "16px",
                  lineHeight: 1.8,
                  marginBottom: "28px",
                }}
              >
                100,000,000 SETL. Hard-capped. Powers governance, staking bonds,
                and protocol fee buybacks.
              </p>

              {/* Use case pills */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginBottom: "32px",
                }}
              >
                {[
                  { label: "Governance", color: "#8B5CF6" },
                  { label: "Arbitrator Staking", color: "#3B82F6" },
                  { label: "Fee Buybacks", color: "#10B981" },
                ].map(({ label, color }) => (
                  <div
                    key={label}
                    style={{
                      padding: "8px 18px",
                      borderRadius: "9999px",
                      background: `${color}15`,
                      border: `1px solid ${color}35`,
                      color,
                      fontSize: "13px",
                      fontWeight: 700,
                      transition: "all 0.25s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${color}25`;
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${color}15`;
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>

              <a
                href="/docs"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#8B5CF6",
                  fontSize: "14px",
                  fontWeight: 700,
                  textDecoration: "none",
                  transition: "all 0.2s",
                  padding: "10px 20px",
                  borderRadius: "9px",
                  background: "rgba(139,92,246,0.1)",
                  border: "1px solid rgba(139,92,246,0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(139,92,246,0.2)";
                  e.currentTarget.style.gap = "12px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(139,92,246,0.1)";
                  e.currentTarget.style.gap = "8px";
                }}
              >
                Learn About SETL <ArrowRight size={16} />
              </a>
            </div>

            {/* ── Right: coin visual ── */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
              }}
            >
              {/* Outer glow */}
              <div
                style={{
                  position: "absolute",
                  inset: "-20px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
                  animation: "pulse-glow 3s ease-in-out infinite",
                }}
              />
              {/* Coin image */}
              <img
                src="/logocoin1.jpg"
                alt="SETL Token"
                style={{
                  width: "260px",
                  height: "260px",
                  objectFit: "cover",
                  borderRadius: "50%",
                  display: "block",
                  position: "relative",
                  zIndex: 1,
                  border: "3px solid rgba(139,92,246,0.4)",
                  boxShadow:
                    "0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(139,92,246,0.15), 0 30px 60px rgba(0,0,0,0.5)",
                  animation: "float 5s ease-in-out infinite",
                  filter: "brightness(1.05) contrast(1.1)",
                }}
              />
              {/* Stats floating around the coin */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "-10px",
                  background: "rgba(13,20,36,0.85)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(139,92,246,0.3)",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  animation: "float 4s ease-in-out 1s infinite",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    color: "#8B5CF6",
                    fontWeight: 700,
                    margin: "0 0 3px",
                    letterSpacing: "0.06em",
                  }}
                >
                  TOTAL SUPPLY
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 900,
                    color: "var(--text-primary)",
                    margin: 0,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  100M SETL
                </p>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "30px",
                  left: "-20px",
                  background: "rgba(13,20,36,0.85)",
                  backdropFilter: "blur(16px)",
                  border: "1px solid rgba(59,130,246,0.3)",
                  borderRadius: "12px",
                  padding: "10px 16px",
                  animation: "float 4.5s ease-in-out 0.5s infinite",
                }}
              >
                <p
                  style={{
                    fontSize: "10px",
                    color: "var(--accent-blue)",
                    fontWeight: 700,
                    margin: "0 0 3px",
                    letterSpacing: "0.06em",
                  }}
                >
                  HARD CAP
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 900,
                    color: "var(--text-primary)",
                    margin: 0,
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  Fixed 🔐
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 7 — PRICING
          ══════════════════════════════════════════════════════ */}
      <section
        id="pricing"
        style={{
          padding: "100px 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <GradientOrbs variant="default" />
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          <SectionHeading
            badge="Pricing"
            title="Simple, yield-aligned pricing"
            subtitle="SettleOne takes 15% of generated yield only. Zero fees on principal. Zero subscription fees."
          />

          {/* Main pricing hero card */}
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))",
              border: "1px solid var(--border-blue)",
              borderRadius: "20px",
              padding: "3rem",
              marginBottom: "3rem",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "25%",
                right: "25%",
                height: "1px",
                background:
                  "linear-gradient(90deg, transparent, rgba(59,130,246,0.8), transparent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)",
              }}
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p
                style={{
                  color: "var(--text-muted)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "10px",
                }}
              >
                Protocol fee model
              </p>
              <div
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  marginBottom: "10px",
                  lineHeight: 1,
                }}
              >
                <span
                  style={{
                    background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  15%
                </span>
                <span
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "0.5em",
                    fontWeight: 600,
                    marginLeft: "12px",
                  }}
                >
                  of yield only
                </span>
              </div>
              <p
                style={{
                  color: "var(--text-secondary)",
                  maxWidth: "480px",
                  margin: "0 auto 24px",
                  fontSize: "15px",
                  lineHeight: 1.75,
                }}
              >
                If your deal generates $100 of yield, SettleOne keeps $15. You
                keep $85. Your{" "}
                <strong style={{ color: "var(--text-primary)" }}>
                  principal is always 100% returned.
                </strong>
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "32px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { val: "0%", label: "Fee on Principal" },
                  { val: "15%", label: "Of Yield Only" },
                  { val: "∞", label: "Deals Supported" },
                ].map((stat) => (
                  <div key={stat.label} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: "28px",
                        fontWeight: 900,
                        color: "var(--accent-cyan)",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {stat.val}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "var(--text-muted)",
                        fontWeight: 600,
                        marginTop: "4px",
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comparison table */}
          <div
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              overflow: "hidden",
              marginBottom: "3rem",
            }}
          >
            <PricingTable />
          </div>

          {/* FAQ */}
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "8px",
            }}
          >
            Frequently Asked Questions
          </h3>
          <div
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "14px",
              padding: "0 1.5rem",
            }}
          >
            <FaqItem
              q="What if no yield is generated?"
              a="SettleOne collects nothing. Zero yield = zero platform fee. We only earn when you earn."
            />
            <FaqItem
              q="What tokens are supported?"
              a="USDC, USDT, DAI, ETH, SETL — admin whitelisted per deployment. More tokens can be added through governance."
            />
            <FaqItem
              q="Can I use SettleOne for one-time deals?"
              a="Yes. No subscription or minimum commitment required. Create a single deal and pay nothing unless your escrow earns yield."
            />
            <FaqItem
              q="How are disputes resolved?"
              a="A qualified arbitrator reviews on-chain evidence and issues a binding verdict: Seller Wins, Buyer Wins, or a Split Settlement percentage."
            />
            <FaqItem
              q="Is the smart contract audited?"
              a="Yes. SettleOne’s smart contracts have undergone rigorous audits by top-tier security firms. The reports are available in our documentation."
            />
            <FaqItem
              q="What happens if the buyer never approves delivery?"
              a="Our smart contracts support automated timeout resolutions via Chainlink Keepers. If a buyer becomes unresponsive after the review period, funds are automatically released to the seller."
            />
            <FaqItem
              q="Do I need technical knowledge to use SettleOne?"
              a="Not at all. Our interface is designed to abstract away the blockchain complexity. You can create deals, approve deliveries, and manage disputes with simple clicks."
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          SECTION 8 — CTA BANNER
          ══════════════════════════════════════════════════════ */}
      <section
        style={{
          padding: "80px 1.5rem",
          background:
            "linear-gradient(135deg, rgba(29,78,216,0.18) 0%, rgba(139,92,246,0.12) 100%)",
          borderTop: "1px solid var(--border-blue)",
          borderBottom: "1px solid var(--border-blue)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background logo watermark */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            backgroundImage: "url('/whiteLogo.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            opacity: 0.02,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/hero-bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.05,
          }}
        />
        <GradientOrbs variant="default" />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "680px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Ready to make your funds work harder?
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "17px",
              marginBottom: "36px",
              lineHeight: 1.75,
            }}
          >
            Join thousands of MSMEs already using SettleOne for secure,
            yield-bearing commerce.
          </p>
          <div
            style={{
              display: "flex",
              gap: "14px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => setShowAuthModal("signup")}
              style={{
                background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                border: "none",
                borderRadius: "12px",
                color: "#fff",
                padding: "14px 36px",
                fontSize: "16px",
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 0 30px rgba(59,130,246,0.45)",
                transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                  "translateY(-3px) scale(1.02)";
                e.currentTarget.style.boxShadow =
                  "0 0 60px rgba(59,130,246,0.7)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 0 30px rgba(59,130,246,0.45)";
              }}
            >
              Create Your First Deal →
            </button>
            <a
              href="/docs"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "12px",
                color: "var(--text-primary)",
                padding: "14px 36px",
                fontSize: "16px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.3s",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
              }}
            >
              <BookOpen size={16} /> Read the Docs
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer
        onLogin={() => setShowAuthModal("login")}
        onSignup={() => setShowAuthModal("signup")}
      />

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .setl-grid { grid-template-columns: 1fr !important; }
          .how-grid  { grid-template-columns: 1fr !important; }
          .feature-detail-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   AUTH MODAL — Login + Signup + OTP + Forgot Password + Staff Login
   ══════════════════════════════════════════════════════════════════════════ */
type AuthMode = "login" | "signup" | "forgot" | "otp";

function AuthModal({
  mode: initialMode,
  onClose,
  onSwitch,
}: {
  mode: "login" | "signup";
  onClose: () => void;
  onSwitch: (m: "login" | "signup") => void;
}) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
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
