
    import React, { useState } from "react";
    import { Clock, Calendar, Zap, Copy } from "lucide-react";
    import { formatUnits } from "viem";
    
    // 1. Helper to map Backend string states to your premium UI colors
    export function getDealStateStyle(state: string) {
      const map: Record<string, { color: string; bg: string; border: string; dot: string }> = {
        "AwaitingFunding": { color: "#fbbf24", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)", dot: "#f59e0b" },
        "PendingSellerAcceptance": { color: "#60a5fa", bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.3)", dot: "#3b82f6" },
        "Active": { color: "#4ade80", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", dot: "#22c55e" },
        "DeliverySubmitted": { color: "#a78bfa", bg: "rgba(139,92,246,0.12)", border: "rgba(139,92,246,0.3)", dot: "#8b5cf6" },
        "AwaitingAcceptance": { color: "#22d3ee", bg: "rgba(6,182,212,0.12)", border: "rgba(6,182,212,0.3)", dot: "#06b6d4" },
        "Accepted": { color: "#2dd4bf", bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.3)", dot: "#14b8a6" },
        "Disputed": { color: "#f87171", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.3)", dot: "#ef4444" },
        "Released": { color: "#4ade80", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)", dot: "#22c55e" },
        "Refunded": { color: "#fb7185", bg: "rgba(251,113,133,0.12)", border: "rgba(251,113,133,0.3)", dot: "#f43f5e" },
        "Settled": { color: "#34d399", bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.3)", dot: "#10b981" },
        "Expired": { color: "#9ca3af", bg: "rgba(156,163,175,0.12)", border: "rgba(156,163,175,0.3)", dot: "#6b7280" },
        "Cancelled": { color: "#9ca3af", bg: "rgba(156,163,175,0.12)", border: "rgba(156,163,175,0.3)", dot: "#6b7280" },
      };
      return map[state] || map["Settled"]!;
    }
    
    // 2. The main DealCard Component
    export function DealCard({ deal, onClick }: { deal: any; onClick: () => void }) {
      const [copied, setCopied] = useState(false);
    
      const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (deal.buyerAddress) {
          navigator.clipboard.writeText(deal.buyerAddress);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      };
    
      // Wire up state colors
      const style = getDealStateStyle(deal.state);
      
      // Format dates securely
      const deadline = deal.deliveryDeadline ? new Date(deal.deliveryDeadline) : null;
      const now = Date.now();
      const hoursLeft = deadline ? (deadline.getTime() - now) / 3600000 : null;
      const isExpiringSoon = hoursLeft !== null && hoursLeft > 0 && hoursLeft <= 48;
    
      // Flawless BigInt & Prisma Math logic
      // Assume USDC with 6 decimals by default if not strictly specified
      const formattedAmount = deal.amount ? Number(formatUnits(BigInt(deal.amount.toString()), decimals)) : 0;
      const decimals = 6; 
      const formattedDeposited = deal.depositedFunds ? Number(formatUnits(BigInt(deal.depositedFunds.toString()), decimals)) : 0;
      const progress = formattedAmount > 0 ? Math.min(100, (formattedDeposited / formattedAmount) * 100) : 0;
      
      // Quick map for Chain ID to Name
      const chainName = deal.chainId === 11155111 ? "Sepolia" : deal.chainId === 421614 ? "Arbitrum Sepolia" : "Arbitrum";
    
      return (
        <div
          onClick={onClick}
          className="group cursor-pointer bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--accent-blue)]
  transition-all duration-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--accent-blue)] to-transparent opacity-[0.03] rounded-bl-
  full pointer-events-none group-hover:opacity-[0.08] transition-opacity" />
    
          <div className="flex items-start justify-between mb-3 relative z-10">
            <div
              className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
              style={{ backgroundColor: style.bg, color: style.color, borderColor: style.border, borderWidth: "1px" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: style.dot }} />
              {deal.state.replace(/([A-Z])/g, " $1").trim()}
            </div>
            <div className="text-[10px] font-semibold text-[var(--text-muted)] bg-[var(--bg-subtle)] px-2 py-1 rounded-md">
              {deal.dealType === "SoftDelivery" ? "SOFTWARE" : "HARDWARE"}
            </div>
          </div>
    
          <h3 className="font-bold text-[var(--text-primary)] text-[15px] leading-snug line-clamp-2 mb-1">
            {deal.name || deal.title || `Deal #${deal.id.slice(0, 8)}`}
          </h3>
    
          <p className="text-xs text-[var(--text-muted)] font-mono mb-3">
            #{deal.onChainId ? String(deal.onChainId).padStart(5, "0") : deal.id.slice(0, 8)}
          </p>
          <div className="flex items-center gap-1.5 mb-3 text-xs text-[var(--text-secondary)]">
    
            <span className="text-[var(--text-muted)]">Creator:</span>
            <span className="font-mono text-[var(--text-primary)]">
              {deal.buyerAddress
                ? `${deal.buyerAddress.slice(0, 6)}…${deal.buyerAddress.slice(-4)}`
                : "0x0000…0000"}
            </span>
            <button
              onClick={handleCopy}
              className="p-0.5 text-[var(--text-muted)] hover:text-[var(--accent-blue)] transition-colors"
            >
              {copied ? <span className="text-[var(--accent-green)]">✓</span> : <Copy size={11} />}
            </button>
          </div>
    
          <div className="mb-3">
            <span className="text-xl font-bold text-[var(--text-primary)]">
              {formattedAmount > 0 ? formattedAmount.toLocaleString() : "0"}
            </span>
            <span className="text-sm text-[var(--text-muted)] ml-1">
              USDC
            </span>
            {progress > 0 && progress < 100 && (
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Deposited: {progress.toFixed(0)}%
              </p>
            )}
          </div>
    
          {formattedAmount > 0 && (
            <div className="w-full h-1 bg-[var(--bg-subtle)] rounded-full mb-3 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: progress >= 100 ? "#22c55e" : progress > 0 ? "#f59e0b" : "#374151",
                }}
              />
            </div>
          )}
    
          <div className="space-y-1 mb-4 text-xs text-[var(--text-secondary)]">
            {deadline && (
              <div className="flex items-center gap-1.5">
                <Calendar size={11} className="text-[var(--text-muted)]" />
                <span>
                  Deadline:{" "}
                  {deadline.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            )}
            {deal.createdAt && (
              <div className="flex items-center gap-1.5">
                <Clock size={11} className="text-[var(--text-muted)]" />
                <span>
                  Created {Math.round((now - new Date(deal.createdAt).getTime()) / 86400000)} days ago
                </span>
              </div>
            )}
            {isExpiringSoon && (
              <div className="flex items-center gap-1 text-[var(--accent-amber)]">
                <Zap size={11} />
                <span className="font-semibold">
                  Expires in {hoursLeft! > 24 ? `${Math.floor(hoursLeft! / 24)}d ${Math.floor(hoursLeft! % 24)}h` : `${Math.floor(hoursLeft!)}h`}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-[var(--text-muted)] bg-[var(--bg-subtle)] px-2 py-0.5 rounded-full border border-
  [var(--border)]">
                {chainName}
              </span>
            </div>
            <span className="text-xs font-semibold text-[var(--accent-blue)] group-hover:text-[var(--accent-blue-bright)] transition-colors">
              View Deal →
            </span>
          </div>
        </div>
      );
    }