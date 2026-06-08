import React from 'react';
import { AlertCircle } from 'lucide-react';

export type InputType = 'text' | 'number' | 'email' | 'password' | 'url' | 'date' | 'address' | 'textarea';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'type'> {
  type?: InputType;
  label?: string;
  error?: string;
  hint?: string;
  rows?: number;
}

const baseInputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '8px',
  color: '#E2E8F0',
  fontSize: '14px',
  padding: '10px 14px',
  outline: 'none',
  transition: 'all 0.2s ease',
  fontFamily: 'inherit',
  boxSizing: 'border-box' as const,
};

const errorInputStyle: React.CSSProperties = {
  borderColor: '#EF4444',
  boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.15)',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 500,
  color: '#94A3B8',
  marginBottom: '6px',
};

const errorStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  fontSize: '12px',
  color: '#EF4444',
  marginTop: '4px',
};

const hintStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#64748B',
  marginTop: '4px',
};

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ type = 'text', label, error, hint, rows = 4, style, ...props }, ref) => {
    const inputStyle: React.CSSProperties = {
      ...baseInputStyle,
      ...(error ? errorInputStyle : {}),
      ...(type === 'address' ? { fontFamily: 'monospace', fontSize: '13px' } : {}),
      ...style,
    };

    return (
      <div style={{ width: '100%' }}>
        {label && <label style={labelStyle}>{label}</label>}
        {type === 'textarea' ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            rows={rows}
            style={{ ...inputStyle, resize: 'vertical' }}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            type={type === 'address' ? 'text' : type}
            style={inputStyle}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
        {error && (
          <div style={errorStyle}>
            <AlertCircle size={12} />
            {error}
          </div>
        )}
        {hint && !error && <div style={hintStyle}>{hint}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';
