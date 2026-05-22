import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info, Zap } from "lucide-react";
import { useNotificationStore } from "../stores/useNotificationStore";
import { cn } from "../utils/cn";

export function NotificationToast() {
  const { notifications, markAsRead } = useNotificationStore();
  const activeNotifications = notifications.filter((n) => !n.read).slice(0, 3);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-brand-teal" />;
      case "warning":
        return <Zap className="w-5 h-5 text-brand-gold" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-brand-teal" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {activeNotifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={cn(
              "glass-card p-4 min-w-[320px] max-w-md flex gap-4 pointer-events-auto shadow-2xl border-l-4",
              n.type === "success"
                ? "border-l-brand-teal"
                : n.type === "warning"
                  ? "border-l-brand-gold"
                  : n.type === "error"
                    ? "border-l-red-500"
                    : "border-l-brand-teal",
            )}
          >
            <div className="shrink-0 pt-1">{getIcon(n.type)}</div>
            <div className="flex-1 pr-4">
              <h4 className="font-bold text-sm text-text-primary">{n.title}</h4>
              <p className="text-xs text-text-slate mt-1 leading-relaxed">
                {n.message}
              </p>
            </div>
            <button
              onClick={() => markAsRead(n.id)}
              className="absolute top-2 right-2 p-1 text-text-muted hover:text-text-primary transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
