import React from "react";
import { DealState } from "@settleone/types";
import { Check } from "lucide-react";

interface DealLifecycleTimelineProps {
  currentState: DealState;
}

export function DealLifecycleTimeline({
  currentState,
}: DealLifecycleTimelineProps) {
  // Ordered states representing the linear flow for visualization
  const states = [
    { id: DealState.AwaitingFunding, label: "Created" },
    { id: DealState.PendingSellerAcceptance, label: "Funded" },
    { id: DealState.Active, label: "Seller Accepted" },
    { id: DealState.DeliverySubmitted, label: "Delivery Submitted" },
    { id: DealState.AwaitingAcceptance, label: "Verifying" },
    { id: DealState.Accepted, label: "Accepted" },
    { id: DealState.Settled, label: "Settled" },
  ];

  // Logic to handle terminal states that aren't in the linear path
  let activeIndex = states.findIndex((s) => s.id === currentState);

  // If state is not in the linear path, map it to the closest point
  if (activeIndex === -1) {
    if (
      [DealState.Released, DealState.Refunded, DealState.Settled].includes(
        currentState,
      )
    ) {
      activeIndex = states.length - 1; // Settled
    } else if (currentState === DealState.Disputed) {
      activeIndex = 5; // Accepted (near dispute)
    } else if (currentState === DealState.Cancelled) {
      activeIndex = 0; // Created
    } else {
      activeIndex = 0;
    }
  }

  return (
    <div className="bg-transparent overflow-x-auto hide-scrollbar pb-2">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 pt-6 min-w-[800px]">
        <div className="relative flex items-center justify-between">
          {/* Background line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-[var(--bg-subtle)] -z-10 -translate-y-1/2"></div>

          {/* Active line */}
          <div
            className="absolute left-0 top-1/2 h-0.5 bg-[var(--accent-blue)] transition-all duration-500 ease-in-out -z-10 -translate-y-1/2 shadow-glow"
            style={{ width: `${(activeIndex / (states.length - 1)) * 100}%` }}
          ></div>

          {states.map((state, index) => {
            const isCompleted = index < activeIndex;
            const isActive = index === activeIndex;

            return (
              <div
                key={state.id}
                className="relative flex flex-col items-center group cursor-default"
              >
                {/* Node */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isCompleted
                      ? "bg-[var(--accent-blue)] text-[var(--bg-base)] shadow-glow"
                      : isActive
                        ? "bg-[var(--accent-blue)] text-[var(--bg-base)] ring-4 ring-[var(--accent-blue-glow)] shadow-[var(--shadow-glow)]"
                        : "bg-[var(--bg-subtle)] border-2 border-[var(--bg-card)]"
                  }`}
                >
                  {isCompleted && <Check size={12} strokeWidth={3} />}
                  {isActive && (
                    <div className="w-2 h-2 bg-[var(--bg-base)] rounded-full animate-pulse"></div>
                  )}
                </div>

                {/* Label */}
                <span
                  className={`absolute top-8 text-xs font-medium whitespace-nowrap ${
                    isActive
                      ? "text-[var(--text-primary)] font-bold"
                      : isCompleted
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)]"
                  }`}
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
