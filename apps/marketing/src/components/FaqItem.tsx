import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════
   PRICING FAQ ITEM
   ══════════════════════════════════════════════════════════════════════════ */
export function FaqItem({ q, a }: { q: string; a: string }) {
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
