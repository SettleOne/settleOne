import { useNotificationStore } from "../../stores/useNotificationStore";
import {
  Card,
  CardContent,
} from "../../components/Card";
import { Button } from "../../components/Button";
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  Clock
} from "lucide-react";
import { cn } from "../../utils/cn";

export function NotificationsPage() {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    clearNotifications 
  } = useNotificationStore();

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle2 className="w-5 h-5 text-brand-teal" />;
      case "warning": return <AlertTriangle className="w-5 h-5 text-brand-gold" />;
      case "error": return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-brand-teal" />;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-2">
          <h1 className="font-syne font-extrabold text-4xl tracking-tight">
            Notification <span className="text-brand-teal">Center</span>
          </h1>
          <p className="text-text-slate font-mono text-xs uppercase tracking-[0.2em]">
            Stay updated with protocol transmissions
          </p>
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2 text-[10px] font-mono tracking-widest uppercase"
            onClick={markAllAsRead}
          >
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-2 text-[10px] font-mono tracking-widest uppercase text-red-400 hover:text-red-500 hover:bg-red-500/5"
            onClick={clearNotifications}
          >
            <Trash2 className="w-4 h-4" />
            Clear all
          </Button>
        </div>
      </div>

      {notifications.length === 0 ? (
        <Card className="py-32 text-center">
          <div className="w-20 h-20 rounded-full bg-bg-tertiary flex items-center justify-center mx-auto mb-6 border border-text-muted/5">
            <Bell className="w-10 h-10 text-text-muted opacity-20" />
          </div>
          <h3 className="text-xl font-syne font-bold mb-2">No transmissions yet</h3>
          <p className="text-text-slate max-w-sm mx-auto text-sm">
            Your notification queue is currently empty. We'll alert you when 
            protocol events occur.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <Card 
              key={n.id} 
              className={cn(
                "transition-all duration-300",
                !n.read ? "border-brand-teal/30 bg-brand-teal/[0.02]" : "opacity-80"
              )}
              onClick={() => markAsRead(n.id)}
            >
              <CardContent className="p-6 flex gap-6">
                <div className="shrink-0 pt-1">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className={cn("font-bold text-lg", !n.read ? "text-text-primary" : "text-text-slate")}>
                      {n.title}
                    </h4>
                    <div className="flex items-center gap-2 text-text-slate text-[10px] font-mono">
                      <Clock className="w-3 h-3" />
                      {new Date(n.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                  <p className="text-sm text-text-slate leading-relaxed">
                    {n.message}
                  </p>
                  {!n.read && (
                    <div className="pt-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-brand-teal animate-pulse shadow-[0_0_8px_var(--color-brand-teal)]" />
                      <span className="ml-2 text-[10px] font-mono text-brand-teal uppercase tracking-widest">New Transmission</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
