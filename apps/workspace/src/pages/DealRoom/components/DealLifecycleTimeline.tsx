import React from "react";
import { Check, AlertTriangle, XCircle } from "lucide-react";

// Accepts string states matching your Prisma/backend schema
interface DealLifecycleTimelineProps {
  currentState: string;
}

const STATES = [
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
  let activeIndex = STATES.findIndex((s) => s.id === currentState);
  if (activeIndex === -1) {
    activeIndex = TERMINAL_MAP[currentState] ?? 0;
  }

  const isDisputed = currentState === "Disputed";
  const isCancelled = currentState === "Cancelled";

  return (
    <div className="bg-transparent overflow-x-auto hide-scrollbar">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-5 min-w-[600px]">
        <div className="relative flex items-center justify-between">
          {/* Background track */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[var(--bg-subtle)] -z-10 -translate-y-1/2" />

          {/* Active track */}
          <div
            className="absolute left-0 top-1/2 h-0.5 transition-all duration-700 ease-in-out -z-10 -translate-y-1/2"
            style={{
              width: `${(activeIndex / (STATES.length - 1)) * 100}%`,
              background: isDisputed
                ? "var(--accent-red)"
                : isCancelled
                  ? "var(--text-muted)"
                  : "var(--accent-blue)",
              boxShadow: isDisputed
                ? "0 0 8px rgba(239,68,68,0.5)"
                : isCancelled
                  ? "none"
                  : "0 0 8px rgba(59,130,246,0.5)",
            }}
          />

          {STATES.map((state, index) => {
            const isCompleted = index < activeIndex;
            const isActive = index === activeIndex;

            let nodeStyle =
              "bg-[var(--bg-subtle)] border-2 border-[var(--bg-card)]";
            let textStyle = "text-[var(--text-muted)]";

            if (isCompleted) {
              nodeStyle = isDisputed
                ? "bg-[var(--accent-red)] text-white"
                : isCancelled
                  ? "bg-[var(--text-muted)] text-white"
                  : "bg-[var(--accent-blue)] text-white";
              textStyle = "text-[var(--text-primary)]";
            } else if (isActive) {
              nodeStyle = isDisputed
                ? "bg-[var(--accent-red)] text-white ring-4 ring-red-500/30"
                : isCancelled
                  ? "bg-[var(--text-muted)] text-white"
                  : "bg-[var(--accent-blue)] text-white ring-4 ring-blue-500/30";
              textStyle = "text-[var(--text-primary)] font-bold";
            }

            return (
              <div
                key={state.id}
                className="relative flex flex-col items-center"
              >
                {/* Node */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm ${nodeStyle}`}
                >
                  {isDisputed && isActive ? (
                    <AlertTriangle size={12} strokeWidth={2.5} />
                  ) : isCancelled && isActive ? (
                    <XCircle size={12} strokeWidth={2.5} />
                  ) : isCompleted ? (
                    <Check size={12} strokeWidth={3} />
                  ) : isActive ? (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  ) : null}
                </div>

                {/* Label */}
                <span
                  className={`absolute top-8 text-[10px] font-medium whitespace-nowrap transition-colors ${textStyle}`}
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
