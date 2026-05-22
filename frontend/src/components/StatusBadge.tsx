import * as React from "react";
import { cn } from "../utils/cn";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<
  string,
  { label: string; color: string; dot: string }
> = {
  draft: {
    label: "Draft",
    color: "border-text-slate/20 text-text-slate bg-text-slate/5",
    dot: "bg-text-slate",
  },
  pending_deposit: {
    label: "Pending Deposit",
    color: "border-brand-gold/20 text-brand-gold bg-brand-gold/5",
    dot: "bg-brand-gold glow-gold",
  },
  funded: {
    label: "Funded",
    color: "border-brand-teal/20 text-brand-teal bg-brand-teal/5",
    dot: "bg-brand-teal glow-teal",
  },
  delivery_submitted: {
    label: "Delivered",
    color: "border-brand-teal/20 text-brand-teal bg-brand-teal/5",
    dot: "bg-brand-teal",
  },
  verification_pending: {
    label: "Verifying",
    color: "border-brand-gold/20 text-brand-gold bg-brand-gold/5",
    dot: "bg-brand-gold animate-pulse",
  },
  verified: {
    label: "Verified",
    color: "border-brand-teal/20 text-brand-teal bg-brand-teal/5",
    dot: "bg-brand-teal",
  },
  released: {
    label: "Settled",
    color: "border-text-slate/20 text-text-slate bg-text-slate/5",
    dot: "bg-text-slate",
  },
  disputed: {
    label: "Disputed",
    color: "border-red-500/20 text-red-500 bg-red-500/5",
    dot: "bg-red-500",
  },
  refunded: {
    label: "Refunded",
    color: "border-brand-gold/20 text-brand-gold bg-brand-gold/5",
    dot: "bg-brand-gold",
  },
  cancelled: {
    label: "Cancelled",
    color: "border-text-muted/20 text-text-muted bg-text-muted/5",
    dot: "bg-text-muted",
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status.toLowerCase()] || {
    label: status,
    color: "border-text-muted/20 text-text-muted",
    dot: "bg-text-muted",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono font-bold tracking-[0.2em] uppercase transition-all",
        config.color,
        className,
      )}
    >
      <div className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      {config.label}
    </div>
  );
}
