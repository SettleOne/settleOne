import React from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  "children"
> {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, placeholder, style, ...props }, ref) => {
    const wrapperStyle: React.CSSProperties = {
      position: "relative",
      width: "100%",
    };

    const selectStyle: React.CSSProperties = {
      width: "100%",
      appearance: "none",
      background: "rgba(255, 255, 255, 0.03)",
      border: `1px solid ${error ? "#EF4444" : "rgba(255, 255, 255, 0.1)"}`,
      borderRadius: "8px",
      color: "#E2E8F0",
      fontSize: "14px",
      padding: "10px 36px 10px 14px",
      outline: "none",
      cursor: "pointer",
      transition: "all 0.2s ease",
      fontFamily: "inherit",
      boxSizing: "border-box" as const,
      ...style,
    };

    const iconStyle: React.CSSProperties = {
      position: "absolute",
      right: "12px",
      top: label ? "calc(50% + 10px)" : "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "#64748B",
    };

    return (
      <div style={{ width: "100%" }}>
        {label && (
          <label
            style={{
              display: "block",
              fontSize: "13px",
              fontWeight: 500,
              color: "#94A3B8",
              marginBottom: "6px",
            }}
          >
            {label}
          </label>
        )}
        <div style={wrapperStyle}>
          <select ref={ref} style={selectStyle} {...props}>
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown size={16} style={iconStyle} />
        </div>
        {error && (
          <div style={{ fontSize: "12px", color: "#EF4444", marginTop: "4px" }}>
            {error}
          </div>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
