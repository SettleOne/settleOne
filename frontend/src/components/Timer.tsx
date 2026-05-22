import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { cn } from "../utils/cn";

interface TimerProps {
  deadline: string | number | Date;
  label?: string;
  className?: string;
  onExpiry?: () => void;
}

export function Timer({ deadline, label, className, onExpiry }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const target = new Date(deadline).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onExpiry) onExpiry();
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline, onExpiry]);

  if (!timeLeft) return null;

  const isCritical = timeLeft.days === 0 && timeLeft.hours < 24;
  const isExpired = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && (
        <span className="text-[10px] font-mono text-text-slate uppercase tracking-widest">
          {label}
        </span>
      )}
      <div className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-lg border bg-bg-tertiary/50",
        isExpired ? "border-red-500/20 text-red-500" : 
        isCritical ? "border-brand-gold/20 text-brand-gold shadow-[0_0_10px_rgba(245,166,35,0.1)]" : 
        "border-brand-teal/20 text-brand-teal"
      )}>
        <Clock className="w-4 h-4" />
        <div className="flex items-center gap-1 font-mono text-sm font-bold">
          {timeLeft.days > 0 && <span>{timeLeft.days}d</span>}
          <span>{timeLeft.hours.toString().padStart(2, '0')}h</span>
          <span>{timeLeft.minutes.toString().padStart(2, '0')}m</span>
          <span>{timeLeft.seconds.toString().padStart(2, '0')}s</span>
        </div>
      </div>
    </div>
  );
}
