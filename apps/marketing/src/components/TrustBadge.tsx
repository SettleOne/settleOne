import React from "react";
import { CheckCircle } from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════
   TRUST BADGE
   ══════════════════════════════════════════════════════════════════════════ */
export function TrustBadge({ label }: { label: string }) {
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
