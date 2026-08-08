import React, { useState, useEffect, useRef, useCallback } from "react";
import { CheckCircle, Circle } from "lucide-react";

/* ══════════════════════════════════════════════════════════════════════════
   AUTO-TICKING DEAL STATE TIMELINE  (uses IntersectionObserver)
   ══════════════════════════════════════════════════════════════════════════ */
const DEAL_STATES = [
  { label: "Awaiting\nFunding", color: "#F59E0B", shortLabel: "Funding" },
  { label: "Pending\nAcceptance", color: "#3B82F6", shortLabel: "Pending" },
  { label: "Active", color: "#10B981", shortLabel: "Active" },
  { label: "Delivery\nSubmitted", color: "#8B5CF6", shortLabel: "Delivery" },
  { label: "Verifying", color: "#0EA5E9", shortLabel: "Verify" },
  { label: "Awaiting\nAcceptance", color: "#0EA5E9", shortLabel: "Awaiting" },
  { label: "Accepted", color: "#14B8A6", shortLabel: "Accepted" },
  { label: "Released", color: "#10B981", shortLabel: "Released" },
  { label: "Disputed", color: "#EF4444", shortLabel: "Disputed" },
  { label: "Settled", color: "#64748B", shortLabel: "Settled" },
  { label: "Refunded", color: "#F59E0B", shortLabel: "Refunded" },
  { label: "Cancelled", color: "#6B7280", shortLabel: "Cancelled" },
];

export function DealTimeline() {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const loopTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  const startAnimation = useCallback(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const runCycle = () => {
      setIsRunning(true);
      setActiveIdx(0);
      let current = 0;
      intervalRef.current = setInterval(() => {
        current += 1;
        if (current >= DEAL_STATES.length) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          // Auto-loop: pause 2s then restart
          loopTimeoutRef.current = setTimeout(() => {
            setActiveIdx(-1);
            setTimeout(runCycle, 400);
          }, 2000);
          return;
        }
        setActiveIdx(current);
      }, 650);
    };
    runCycle();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setTimeout(startAnimation, 400);
        }
      },
      { threshold: 0.3 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      observer.disconnect();
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current);
    };
  }, [startAnimation]);

  return (
    <div ref={sectionRef}>
      {/* Timeline — hidden scroll bar */}
      <div
        style={
          {
            overflowX: "auto",
            paddingBottom: "4px",
            msOverflowStyle: "none",
          } as any
        }
        className="timeline-scroll"
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            minWidth: "max-content",
            padding: "24px 24px 8px",
            gap: 0,
            position: "relative",
          }}
        >
          {/* Background rail */}
          <div
            style={{
              position: "absolute",
              top: "45px",
              left: "48px",
              right: "48px",
              height: "2px",
              background: "rgba(255,255,255,0.06)",
              borderRadius: "1px",
            }}
          />
          {/* Animated fill rail */}
          <div
            style={{
              position: "absolute",
              top: "45px",
              left: "48px",
              height: "2px",
              borderRadius: "1px",
              zIndex: 1,
              background:
                "linear-gradient(90deg, #F59E0B, #3B82F6, #10B981, #8B5CF6, #14B8A6, #10B981)",
              width:
                activeIdx < 0
                  ? "0%"
                  : `${(activeIdx / (DEAL_STATES.length - 1)) * 100}%`,
              transition: "width 0.55s cubic-bezier(0.16,1,0.3,1)",
              boxShadow: "0 0 12px rgba(59,130,246,0.6)",
            }}
          />

          {DEAL_STATES.map((state, i) => {
            const isActive = i <= activeIdx;
            const isCurrent = i === activeIdx;
            return (
              <div
                key={i}
                style={{ display: "flex", alignItems: "flex-start", zIndex: 2 }}
              >
                <div
                  onClick={() => {
                    if (!isRunning) setActiveIdx(i);
                  }}
                  style={{
                    cursor: isRunning ? "default" : "pointer",
                    padding: "0 10px",
                    textAlign: "center",
                  }}
                >
                  {/* Node circle */}
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: isActive
                        ? `${state.color}22`
                        : "rgba(255,255,255,0.03)",
                      border: `2px solid ${isActive ? state.color : "rgba(255,255,255,0.1)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 10px",
                      boxShadow: isCurrent
                        ? `0 0 0 4px ${state.color}25, 0 0 24px ${state.color}50`
                        : isActive
                          ? `0 0 12px ${state.color}30`
                          : "none",
                      transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
                      transform: isCurrent
                        ? "scale(1.15)"
                        : isActive
                          ? "scale(1.05)"
                          : "scale(1)",
                    }}
                  >
                    {isActive ? (
                      <CheckCircle
                        size={isCurrent ? 20 : 17}
                        style={{ color: state.color, transition: "all 0.3s" }}
                      />
                    ) : (
                      <Circle
                        size={13}
                        style={{ color: "rgba(255,255,255,0.15)" }}
                      />
                    )}
                  </div>
                  {/* Label */}
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: isActive ? 700 : 500,
                      color: isActive ? state.color : "var(--text-muted)",
                      maxWidth: "68px",
                      lineHeight: 1.35,
                      whiteSpace: "pre-line",
                      transition: "color 0.4s",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {state.label}
                  </div>
                </div>
                {/* Connector gap between nodes (visual only — actual line is the rail above) */}
                {i < DEAL_STATES.length - 1 && (
                  <div
                    style={{ width: "8px", flexShrink: 0, marginTop: "21px" }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* State label indicator only — no button */}
      {activeIdx >= 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "14px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "5px 16px",
              borderRadius: "9999px",
              background: `${DEAL_STATES[activeIdx]?.color}12`,
              border: `1px solid ${DEAL_STATES[activeIdx]?.color}35`,
              transition: "all 0.4s",
            }}
          >
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: DEAL_STATES[activeIdx]?.color,
                boxShadow: `0 0 8px ${DEAL_STATES[activeIdx]?.color}`,
                animation: "pulse-glow 1.5s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: DEAL_STATES[activeIdx]?.color,
                letterSpacing: "0.03em",
              }}
            >
              {DEAL_STATES[activeIdx]?.label.replace("\n", " ")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
