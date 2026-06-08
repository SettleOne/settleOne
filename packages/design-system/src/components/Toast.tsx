import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle size={18} color="#10B981" />,
  error: <AlertCircle size={18} color="#EF4444" />,
  warning: <AlertTriangle size={18} color="#F59E0B" />,
  info: <Info size={18} color="#3B82F6" />,
};

const bgColors: Record<ToastType, string> = {
  success: 'rgba(16, 185, 129, 0.08)',
  error: 'rgba(239, 68, 68, 0.08)',
  warning: 'rgba(245, 158, 11, 0.08)',
  info: 'rgba(59, 130, 246, 0.08)',
};

const borderColors: Record<ToastType, string> = {
  success: 'rgba(16, 185, 129, 0.2)',
  error: 'rgba(239, 68, 68, 0.2)',
  warning: 'rgba(245, 158, 11, 0.2)',
  info: 'rgba(59, 130, 246, 0.2)',
};

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  React.useEffect(() => {
    const timeout = setTimeout(() => onRemove(toast.id), toast.duration || 5000);
    return () => clearTimeout(timeout);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px',
        background: bgColors[toast.type],
        border: `1px solid ${borderColors[toast.type]}`,
        borderRadius: '12px',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        minWidth: '320px',
        maxWidth: '420px',
        animation: 'slideIn 0.3s ease',
      }}
    >
      <div style={{ flexShrink: 0, marginTop: '1px' }}>{icons[toast.type]}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '14px', fontWeight: 600, color: '#F1F5F9' }}>{toast.title}</div>
        {toast.message && (
          <div style={{ fontSize: '13px', color: '#94A3B8', marginTop: '4px' }}>{toast.message}</div>
        )}
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        style={{
          background: 'none',
          border: 'none',
          color: '#64748B',
          cursor: 'pointer',
          padding: '2px',
          flexShrink: 0,
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 2000,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
