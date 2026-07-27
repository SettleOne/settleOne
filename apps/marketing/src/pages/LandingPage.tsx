import React, { useState } from "react";
import {
  ArrowRight,
  Lock,
  ShieldCheck,
  Coins,
  Shield,
  Scale,
  Zap,
  Globe,
  ChevronDown,
  TrendingUp,
  Layers,
  CheckCircle,
  BookOpen,
} from "lucide-react";

import { FloatingParticles } from "../components/FloatingParticles";
import { GradientOrbs } from "../components/GradientOrbs";
import { TrustBadge } from "../components/TrustBadge";
import { SectionHeading } from "../components/SectionHeading";
import { FeatureCard } from "../components/FeatureCard";
import { TokenPill } from "../components/TokenPill";
import { FaqItem } from "../components/FaqItem";
import { PricingTable } from "../components/PricingTable";
import { DealTimeline } from "../components/DealTimeline";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { AuthModal } from "../components/AuthModal";

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
