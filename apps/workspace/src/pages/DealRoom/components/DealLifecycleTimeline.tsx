import React from "react";
import { Check, AlertTriangle, XCircle } from "lucide-react";

// Accepts string states matching your Prisma/backend schema
interface DealLifecycleTimelineProps {
  currentState: string;
}

const DEFAULT_STATES = [
  { id: "AwaitingFunding", label: "Created" },
  { id: "PendingSellerAcceptance", label: "Funded" },
  { id: "Active", label: "Accepted" },
  { id: "DeliverySubmitted", label: "Delivered" },
  { id: "AwaitingAcceptance", label: "Verifying" },
  { id: "Accepted", label: "Accepted" },
  { id: "Settled", label: "Settled" },
];

// Terminal states that don't fit on the linear path
const TERMINAL_MAP: Record<string, number> = {
  Released: 6,
  Refunded: 6,
  Settled: 6,
  Disputed: 4,
  Cancelled: 0,
};

export function DealLifecycleTimeline({
  currentState,
}: DealLifecycleTimelineProps) {
  const isDisputed = currentState === "Disputed";
  const isCancelled = currentState === "Cancelled";

  // Dynamically swap the first node if cancelled
  const STATES = [...DEFAULT_STATES];
  if (isCancelled) {
    STATES[0] = { id: "Cancelled", label: "Cancelled" };
  }

  let activeIndex = STATES.findIndex((s) => s.id === currentState);
  if (activeIndex === -1) {
    activeIndex = TERMINAL_MAP[currentState] ?? 0;
  }

  return (
    <div className="bg-transparent overflow-x-auto hide-scrollbar">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8 min-w-[600px] relative">
        <div className="relative flex items-center justify-between">
          
          {/* Background track (z-0 so it goes behind nodes, but not behind the whole page) */}
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-[var(--border)] -translate-y-1/2 z-0 rounded-full" />

          {/* Active track */}
          <div
            className="absolute left-0 top-1/2 h-1 transition-all duration-700 ease-in-out -translate-y-1/2 z-0 rounded-full"
            style={{
              width: `${(activeIndex / (STATES.length - 1)) * 100}%`,
              background: isDisputed
                ? "var(--accent-red)"
                : isCancelled
                  ? "var(--text-muted)"
                  : "var(--accent-blue)",
              boxShadow: isDisputed
                ? "0 0 10px rgba(239,68,68,0.6)"
                : isCancelled
                  ? "none"
                  : "0 0 10px rgba(59,130,246,0.6)",
            }}
          />

          {STATES.map((state, index) => {
            const isCompleted = index < activeIndex;
            const isActive = index === activeIndex;

            let nodeStyle = "bg-[var(--bg-subtle)] border-2 border-[var(--border)]";
            let textStyle = "text-[var(--text-muted)]";

            if (isCompleted) {
              nodeStyle = isDisputed
                ? "bg-[var(--accent-red)] text-white border-[var(--accent-red)]"
                : isCancelled
                  ? "bg-[var(--text-muted)] text-white border-[var(--text-muted)]"
                  : "bg-[var(--accent-blue)] text-white border-[var(--accent-blue)]";
              textStyle = "text-[var(--text-primary)] font-medium";
            } else if (isActive) {
              nodeStyle = isDisputed
                ? "bg-[var(--accent-red)] text-white ring-4 ring-red-500/30 border-[var(--accent-red)]"
                : isCancelled
                  ? "bg-[var(--bg-subtle)] text-[var(--accent-red)] border-[var(--accent-red)] ring-4 ring-red-500/20"
                  : "bg-[var(--accent-blue)] text-white ring-4 ring-blue-500/30 border-[var(--accent-blue)]";
              textStyle = isCancelled ? "text-[var(--accent-red)] font-bold" : "text-[var(--text-primary)] font-bold";
            }

            return (
              <div
                key={state.id}
                className="relative flex flex-col items-center z-10"
              >
                {/* Node */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${nodeStyle}`}
                >
                  {isDisputed && isActive ? (
                    <AlertTriangle size={14} strokeWidth={2.5} />
                  ) : isCancelled && isActive ? (
                    <XCircle size={14} strokeWidth={2.5} />
                  ) : isCompleted ? (
                    <Check size={14} strokeWidth={3} />
                  ) : isActive && !isCancelled ? (
                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
                  ) : null}
                </div>

                {/* Label */}
                <span
                  className={`absolute top-10 text-[11px] whitespace-nowrap transition-colors ${textStyle}`}
                >
                  {state.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
