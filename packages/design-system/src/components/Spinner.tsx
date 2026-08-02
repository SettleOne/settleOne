import React from "react";

export interface SpinnerProps {
  size?: number | string;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function Spinner({ size = 24, color = "#6366F1", style }: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={{ animation: "spin 1s linear infinite", ...style }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="60"
        strokeDashoffset="20"
        opacity="0.3"
      />
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="30"
        strokeDashoffset="0"
      />
    </svg>
  );
}
