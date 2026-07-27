import React from "react";

/* ══════════════════════════════════════════════════════════════════════════
   SECTION HEADING  (enhanced with gradient underline bar)
   ══════════════════════════════════════════════════════════════════════════ */
export function SectionHeading({
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
