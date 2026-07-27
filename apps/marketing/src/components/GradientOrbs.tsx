import React from "react";

/* ══════════════════════════════════════════════════════════════════════════
   GRADIENT ORBS
   ══════════════════════════════════════════════════════════════════════════ */
export function GradientOrbs({
  variant = "default",
}: {
  variant?: "default" | "purple" | "cyan";
}) {
  const configs = {
    default: [
      {
        top: "-20%",
        left: "-10%",
        w: "600px",
        h: "600px",
        color: "rgba(59,130,246,0.12)",
      },
      {
        top: "10%",
        right: "-5%",
        w: "400px",
        h: "400px",
        color: "rgba(139,92,246,0.1)",
      },
      {
        bottom: "5%",
        left: "30%",
        w: "500px",
        h: "300px",
        color: "rgba(6,182,212,0.08)",
      },
    ],
    purple: [
      {
        top: "0%",
        left: "20%",
        w: "500px",
        h: "500px",
        color: "rgba(139,92,246,0.15)",
      },
      {
        bottom: "0%",
        right: "10%",
        w: "400px",
        h: "400px",
        color: "rgba(59,130,246,0.1)",
      },
    ],
    cyan: [
      {
        top: "10%",
        right: "0%",
        w: "500px",
        h: "500px",
        color: "rgba(6,182,212,0.12)",
      },
      {
        bottom: "0%",
        left: "0%",
        w: "400px",
        h: "400px",
        color: "rgba(59,130,246,0.08)",
      },
    ],
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {configs[variant].map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...(c as any),
            width: c.w,
            height: c.h,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${c.color} 0%, transparent 70%)`,
            filter: "blur(50px)",
            animation: `float ${8 + i * 2}s ease-in-out ${i * 1.5}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
