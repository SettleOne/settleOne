import React, { useState } from "react";

/* ══════════════════════════════════════════════════════════════════════════
   TOKEN / CHAIN LOGO PILL  (with real images)
   ══════════════════════════════════════════════════════════════════════════ */
export function TokenPill({
  name,
  logo,
  size = 24,
  hoverColor,
}: {
  name: string;
  logo: string;
  size?: number;
  hoverColor?: string;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "9px",
        padding: "8px 18px",
        borderRadius: "9999px",
        background: hovered
          ? "rgba(255,255,255,0.07)"
          : "rgba(255,255,255,0.04)",
        border: hovered
          ? `1px solid ${hoverColor || "rgba(59,130,246,0.5)"}`
          : "1px solid rgba(255,255,255,0.09)",
        transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
        cursor: "default",
        fontSize: "13px",
        fontWeight: 600,
        color: hovered ? "var(--text-primary)" : "var(--text-secondary)",
        transform: hovered
          ? "translateY(-2px) scale(1.03)"
          : "translateY(0) scale(1)",
        boxShadow: hovered
          ? `0 8px 24px rgba(0,0,0,0.3), 0 0 16px ${hoverColor || "rgba(59,130,246,0.2)"}`
          : "none",
      }}
    >
      {!imgError ? (
        <img
          src={logo}
          alt={name}
          onError={() => setImgError(true)}
          style={{
            width: `${size}px`,
            height: `${size}px`,
            objectFit: "contain",
            borderRadius: "50%",
            filter: hovered
              ? "brightness(1.1) drop-shadow(0 0 4px rgba(255,255,255,0.2))"
              : "brightness(0.9)",
            transition: "filter 0.3s",
          }}
        />
      ) : (
        <div
          style={{
            width: `${size}px`,
            height: `${size}px`,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px",
            fontWeight: 800,
            color: "#fff",
          }}
        >
          {name[0]}
        </div>
      )}
      {name}
    </div>
  );
}
