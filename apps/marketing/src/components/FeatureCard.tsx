import React, { useState } from "react";

/* ══════════════════════════════════════════════════════════════════════════
   FEATURE CARD (with enhanced hover)
   ══════════════════════════════════════════════════════════════════════════ */
export function FeatureCard({
  icon: Icon,

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
