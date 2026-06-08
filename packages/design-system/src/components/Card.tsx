import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, header, footer, padding = '24px', style, onClick, hoverable }: CardProps) {
  const cardStyle: React.CSSProperties = {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.06)',
    borderRadius: '12px',
    overflow: 'hidden',
    transition: 'all 0.2s ease',
    cursor: onClick || hoverable ? 'pointer' : undefined,
    ...(hoverable ? { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)' } : {}),
    ...style,
  };

  const headerStyle: React.CSSProperties = {
    padding: '16px 24px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
    fontWeight: 600,
    fontSize: '15px',
    color: '#F1F5F9',
  };

  const bodyStyle: React.CSSProperties = {
    padding,
  };

  const footerStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
    background: 'rgba(255, 255, 255, 0.01)',
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      {header && <div style={headerStyle}>{header}</div>}
      <div style={bodyStyle}>{children}</div>
      {footer && <div style={footerStyle}>{footer}</div>}
    </div>
  );
}
