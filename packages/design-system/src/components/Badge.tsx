import React from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "purple";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  style?: React.CSSProperties;
}

const variantStyles: Record<
  BadgeVariant,
  { bg: string; color: string; border: string }
> = {
  default: {
    bg: "rgba(148, 163, 184, 0.12)",
    color: "#94A3B8",
    border: "rgba(148, 163, 184, 0.2)",
  },
  success: {
    bg: "rgba(16, 185, 129, 0.12)",
    color: "#10B981",
    border: "rgba(16, 185, 129, 0.2)",
  },
  warning: {
    bg: "rgba(245, 158, 11, 0.12)",
    color: "#F59E0B",
    border: "rgba(245, 158, 11, 0.2)",
  },
  error: {
    bg: "rgba(239, 68, 68, 0.12)",
    color: "#EF4444",
    border: "rgba(239, 68, 68, 0.2)",
  },
  info: {
    bg: "rgba(59, 130, 246, 0.12)",
    color: "#3B82F6",
    border: "rgba(59, 130, 246, 0.2)",
  },
  purple: {
    bg: "rgba(139, 92, 246, 0.12)",
    color: "#8B5CF6",
    border: "rgba(139, 92, 246, 0.2)",
  },
};

export function Badge({
  children,
  variant = "default",
  dot,
  style,
}: BadgeProps) {
  const colors = variantStyles[variant];

  const badgeStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    background: colors.bg,
    color: colors.color,
    border: `1px solid ${colors.border}`,
    letterSpacing: "0.02em",
    lineHeight: 1.4,
    ...style,
  };

  const dotStyle: React.CSSProperties = {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: colors.color,
  };

  return (
    <span style={badgeStyle}>
      {dot && <span style={dotStyle} />}
      {children}
    </span>
  );
}
