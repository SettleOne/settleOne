import React from "react";

/* ══════════════════════════════════════════════════════════════════════════
   PRICING TABLE
   ══════════════════════════════════════════════════════════════════════════ */
export function PricingTable() {
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
