import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  deadline: number; // Unix timestamp in seconds
  warningThreshold?: number; // In seconds (e.g. 86400 for 24h)
}

export function CountdownTimer({
  deadline,
  warningThreshold = 86400,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isWarning, setIsWarning] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = Math.floor(Date.now() / 1000);
      const remaining = deadline - now;

      if (remaining <= 0) {
        setTimeLeft("Expired");
        setIsExpired(true);
        setIsWarning(false);
        return;
      }

      setIsExpired(false);
      setIsWarning(remaining < warningThreshold);

      const days = Math.floor(remaining / 86400);
      const hours = Math.floor((remaining % 86400) / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);

      if (days > 0) setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      else if (hours > 0) setTimeLeft(`${hours}h ${minutes}m`);
      else setTimeLeft(`${minutes}m`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [deadline, warningThreshold]);

  return (
    <div
      className={`inline-flex items-center gap-1.5 font-medium ${
        isExpired
          ? "text-[var(--accent-red)]"
          : isWarning
            ? "text-[var(--accent-amber)]"
            : "text-[var(--text-secondary)]"
      }`}
    >
      <Clock size={16} />
      <span>{timeLeft}</span>
    </div>
  );
}
