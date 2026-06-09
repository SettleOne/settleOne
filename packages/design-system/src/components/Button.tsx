import React from "react";
import { Loader2 } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
    color: "#FFFFFF",
    border: "none",
    boxShadow: "0 4px 14px rgba(99, 102, 241, 0.4)",
  },
  secondary: {
    background: "rgba(255, 255, 255, 0.05)",
    color: "#E2E8F0",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  },
  ghost: {
    background: "transparent",
    color: "#94A3B8",
    border: "1px solid transparent",
    boxShadow: "none",
  },
  danger: {
    background: "linear-gradient(135deg, #EF4444, #DC2626)",
    color: "#FFFFFF",
    border: "none",
    boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)",
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: {
    padding: "6px 12px",
    fontSize: "13px",
    borderRadius: "6px",
    gap: "4px",
  },
  md: {
    padding: "10px 20px",
    fontSize: "14px",
    borderRadius: "8px",
    gap: "6px",
  },
  lg: {
    padding: "14px 28px",
    fontSize: "16px",
    borderRadius: "10px",
    gap: "8px",
  },
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading,
      icon,
      children,
      disabled,
      style,
      ...props
    },
    ref,
  ) => {
    const baseStyle: React.CSSProperties = {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 600,
      cursor: disabled || loading ? "not-allowed" : "pointer",
      opacity: disabled || loading ? 0.5 : 1,
      transition: "all 0.2s ease",
      fontFamily: "inherit",
      lineHeight: 1.5,
      letterSpacing: "0.01em",
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...style,
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={baseStyle}
        {...props}
      >
        {loading ? (
          <Loader2
            size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
            style={{ animation: "spin 1s linear infinite" }}
          />
        ) : (
          icon
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
