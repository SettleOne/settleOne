import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════
   NAVBAR
   ══════════════════════════════════════════════════════════════════════════ */
export function Navbar({
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
