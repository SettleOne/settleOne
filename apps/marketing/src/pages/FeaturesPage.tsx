import React from "react";
import {
  ArrowLeft,
  TrendingUp,
  Layers,
  ShieldCheck,
  Scale,
  Zap,
  Globe,
} from "lucide-react";

/* Features deep-dive page — standalone route at /features */
export function FeaturesPage() {
  const features = [
    {
      icon: TrendingUp,
      color: "#10B981",
      title: "EscrowVault Yield Architecture",
      body: "Locked principal is routed to low-risk DeFi strategies via Aave V3. Buyers receive yield back at settlement. The longer the deal, the more you earn — passively.",
    },
    {
      icon: Layers,
      color: "#3B82F6",
      title: "60/40 Staged Funding",
      body: "Fund 60% upfront to secure the deal. Pay the remaining 40% only after delivery is verified — aligning incentives for both parties and reducing counterparty risk.",
    },
    {
      icon: ShieldCheck,
      color: "#8B5CF6",
      title: "Tamper-Proof Evidence Registry",
      body: "Every delivery document, invoice, and receipt is hashed and committed on-chain via IPFS CID. Evidence cannot be altered or deleted after submission.",
    },
    {
      icon: Scale,
      color: "#F59E0B",
      title: "Expert Human Arbitration",
      body: "When deals go wrong, a qualified arbitrator reviews on-chain evidence and issues a binding verdict: Seller Wins, Buyer Wins, or Split Settlement percentage.",
    },
    {
      icon: Zap,
      color: "#06B6D4",
      title: "Chainlink Automation",
      body: "Critical state transitions are automated by Chainlink Keepers — no manual intervention needed for timeouts, releases, or dispute escalation windows.",
    },
    {
      icon: Globe,
      color: "#0EA5E9",
      title: "Multi-chain & Multi-token",
      body: "Deploy on Ethereum, Polygon, Arbitrum, or Base. Support USDC, USDT, DAI, ETH, and SETL — admin whitelisted per deployment.",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        fontFamily: "var(--font-sans)",
        padding: "0",
      }}
    >
      {/* Back nav */}
      <div
        style={{
          padding: "1.5rem 2rem",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <a
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--text-secondary)",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={16} /> Back to Home
        </a>
      </div>
      <div
        style={{ maxWidth: "1100px", margin: "0 auto", padding: "4rem 2rem" }}
      >
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 14px",
              borderRadius: "9999px",
              background: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.25)",
              color: "var(--accent-blue)",
              fontSize: "12px",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            Features Deep-Dive
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
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
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "18px",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Every feature of SettleOne exists to eliminate counterparty risk
            while making your funds work harder.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          {features.map((f, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "14px",
                padding: "2rem",
                transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-blue)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: `${f.color}18`,
                  border: `1px solid ${f.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
                }}
              >
                <f.icon size={22} style={{ color: f.color }} />
              </div>
              <h3
                style={{
                  fontSize: "17px",
                  fontWeight: 600,
                  color: "var(--text-primary)",
                  marginBottom: "10px",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {f.body}
              </p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "4rem" }}>
          <a
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
              padding: "13px 32px",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 0 24px rgba(59,130,246,0.35)",
            }}
          >
            See Pricing →
          </a>
        </div>
      </div>
    </div>
  );
}

export default FeaturesPage;
