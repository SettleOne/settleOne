import React from "react";
import { Twitter, Linkedin, Github } from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════════════════════════════════ */
export function Footer({
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
