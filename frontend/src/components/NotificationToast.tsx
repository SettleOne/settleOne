import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, CheckCircle2, AlertCircle, Info, Zap } from "lucide-react";
import { create } from "zustand";

export type ToastType = "success" | "error" | "info" | "protocol";

interface Toast {
  id: string;
  title: string;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }));
    setTimeout(() => {
      set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
    }, 5000);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

export function NotificationToast() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-8 right-8 z-[200] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className="pointer-events-auto"
          >
            <div
              className={cn(
                "glass-card w-80 p-5 flex gap-4 relative overflow-hidden",
                toast.type === "protocol"
                  ? "border-brand-teal/30 shadow-[0_0_20px_rgba(0,229,160,0.1)]"
                  : "border-text-muted/10",
              )}
            >
              {/* Shimmer effect for protocol toasts */}
              {toast.type === "protocol" && (
                <div className="absolute top-0 left-0 w-full h-0.5 bg-brand-teal animate-shimmer" />
              )}

              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                  toast.type === "success"
                    ? "bg-brand-teal/10 text-brand-teal"
                    : toast.type === "error"
                      ? "bg-red-500/10 text-red-500"
                      : toast.type === "protocol"
                        ? "bg-brand-teal/20 text-brand-teal"
                        : "bg-bg-tertiary text-text-slate",
                )}
              >
                {toast.type === "success" && (
                  <CheckCircle2 className="w-5 h-5" />
                )}
                {toast.type === "error" && <AlertCircle className="w-5 h-5" />}
                {toast.type === "protocol" && <Zap className="w-5 h-5" />}
                {toast.type === "info" && <Info className="w-5 h-5" />}
              </div>

              <div className="space-y-1">
                <p className="font-syne font-bold text-sm">{toast.title}</p>
                <p className="text-xs text-text-slate leading-relaxed">
                  {toast.message}
                </p>
              </div>

              <button
                onClick={() => removeToast(toast.id)}
                className="absolute top-4 right-4 p-1 hover:bg-white/5 rounded text-text-muted transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

import { cn } from "../utils/cn";
