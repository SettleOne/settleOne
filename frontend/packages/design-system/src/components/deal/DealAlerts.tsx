import React from 'react';
import { Bell, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import { cn } from '../../index';

interface DealAlert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  timestamp: string;
}

interface DealAlertsProps {
  alerts: DealAlert[];
}

export const DealAlerts = ({ alerts }: DealAlertsProps) => {
  if (alerts.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2 mb-1">
        <Bell className="h-4 w-4 text-[#6B7280]" />
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Deal Alerts</h3>
      </div>
      
      {alerts.map((alert) => {
        const Icon = alert.type === 'error' ? AlertCircle : alert.type === 'warning' ? AlertCircle : alert.type === 'success' ? CheckCircle2 : Info;
        
        return (
          <div 
            key={alert.id}
            className={cn(
              "flex items-start gap-3 rounded-lg border p-4 shadow-sm transition-all",
              alert.type === 'error' && "bg-[#EF4444]/5 border-[#EF4444]/20 text-[#EF4444]",
              alert.type === 'warning' && "bg-[#F59E0B]/5 border-[#F59E0B]/20 text-[#F59E0B]",
              alert.type === 'success' && "bg-[#10B981]/5 border-[#10B981]/20 text-[#10B981]",
              alert.type === 'info' && "bg-[#3B82F6]/5 border-[#3B82F6]/20 text-[#3B82F6]"
            )}
          >
            <Icon className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1 flex-1">
              <p className="text-sm font-bold leading-tight">{alert.message}</p>
              <span className="text-[10px] opacity-70 font-medium uppercase tracking-widest">{alert.timestamp}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
