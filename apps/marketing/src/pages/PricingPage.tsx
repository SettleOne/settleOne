import React, { useState } from "react";
import { Check, ArrowLeft, ChevronDown } from "lucide-react";

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--border)" }}>
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
        }}
      >
        {q}
        <ChevronDown
          size={16}
          style={{
            color: "var(--text-secondary)",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.25s",
          }}
        />
      </button>
      {open && (
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "14px",
            lineHeight: 1.75,
            padding: "0 0 18px",
            margin: 0,
          }}
        >
          {a}
        </p>
      )}
    </div>
  );
}

export function PricingPage() {
  const tableRows = [
    {
      feature: "Fees on principal",
      settleOne: "0%",
      trad: "0.5–1%",
      freelance: "0%",
    },
    {
      feature: "Platform %",
      settleOne: "15% of yield only",
      trad: "—",
      freelance: "10–20% fee",
    },
    {
      feature: "On-chain record",
      settleOne: "✓ Yes",
      trad: "✗ No",
      freelance: "✗ No",
    },
    {
      feature: "Yield earned",
      settleOne: "✓ Yes",
      trad: "✗ No",
      freelance: "✗ No",
    },
    {
      feature: "Dispute resolver",
      settleOne: "Expert arbitrator",
      trad: "Platform",
      freelance: "Platform",
    },
    {
      feature: "Evidence record",
      settleOne: "✓ Immutable",
      trad: "✗ No",
      freelance: "✗ No",
    },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        fontFamily: "var(--font-sans)",
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
        style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 2rem" }}
      >
        {/* Heading */}
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
            Pricing
          </div>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Pricing that scales with your trust
          </h1>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "18px",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            We charge 15% of generated yield only. Zero fees on principal. Zero
            subscription fees.
          </p>
        </div>

        {/* Hero pricing card */}
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.08))",
            border: "1px solid var(--border-blue)",
            borderRadius: "20px",
            padding: "3rem",
            textAlign: "center",
            marginBottom: "3rem",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%)",
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
                marginBottom: "8px",
              }}
            >
              Yield-based model
            </p>
            <div
              style={{
                fontSize: "clamp(3rem, 8vw, 5rem)",
                fontWeight: 900,
                letterSpacing: "-0.05em",
                background: "linear-gradient(135deg, #3B82F6, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              15%
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "18px",
                marginBottom: "0",
              }}
            >
              of generated yield only
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: "28px auto 0",
                maxWidth: "360px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                textAlign: "left",
              }}
            >
              {[
                "Zero fees on principal amount",
                "Zero subscription or monthly fees",
                "No minimum deal size",
                "If yield = $0, platform fee = $0",
              ].map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "14px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <Check
                    size={16}
                    style={{ color: "var(--accent-green)", flexShrink: 0 }}
                  />{" "}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Example breakdown */}
        <div
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            padding: "2rem",
            marginBottom: "3rem",
          }}
        >
          <h3
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "16px",
            }}
          >
            Example Breakdown
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "16px",
            }}
          >
            {[
              {
                label: "Deal Amount",
                val: "$10,000",
                sub: "principal",
                color: "var(--text-primary)",
              },
              {
                label: "Yield Generated (3mo)",
                val: "$100",
                sub: "via Aave V3",
                color: "#F59E0B",
              },
              {
                label: "SettleOne Fee",
                val: "$15",
                sub: "15% of yield",
                color: "#EF4444",
              },
              {
                label: "You Keep",
                val: "$10,085",
                sub: "principal + 85% yield",
                color: "#10B981",
              },
            ].map((card) => (
              <div
                key={card.label}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderRadius: "10px",
                  padding: "16px",
                  border: "1px solid var(--border)",
                }}
              >
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  {card.label}
                </p>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: 800,
                    color: card.color,
                    margin: "0 0 4px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {card.val}
                </p>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "12px",
                    margin: 0,
                  }}
                >
                  {card.sub}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div
          style={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border)",
            borderRadius: "14px",
            overflow: "hidden",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              padding: "20px 24px 16px",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "var(--text-primary)",
                margin: 0,
              }}
            >
              How We Compare
            </h3>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "520px",
              }}
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
                        padding: "12px 20px",
                        textAlign: "left",
                        fontSize: "12px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color:
                          i === 1 ? "var(--accent-blue)" : "var(--text-muted)",
                        borderBottom: "1px solid var(--border)",
                        background:
                          i === 1 ? "rgba(59,130,246,0.05)" : "transparent",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, ri) => (
                  <tr
                    key={ri}
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <td
                      style={{
                        padding: "13px 20px",
                        fontSize: "14px",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {row.feature}
                    </td>
                    <td
                      style={{
                        padding: "13px 20px",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: "var(--accent-cyan)",
                        background: "rgba(59,130,246,0.03)",
                      }}
                    >
                      {row.settleOne}
                    </td>
                    <td
                      style={{
                        padding: "13px 20px",
                        fontSize: "13px",
                        color: "var(--text-muted)",
                      }}
                    >
                      {row.trad}
                    </td>
                    <td
                      style={{
                        padding: "13px 20px",
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
        </div>

        {/* FAQ */}
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--text-primary)",
            marginBottom: "8px",
          }}
        >
          FAQ
        </h2>
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
            q="How are disputes handled?"
            a="A qualified arbitrator reviews on-chain evidence and issues a binding verdict: Seller Wins, Buyer Wins, or a Split Settlement percentage."
          />
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
