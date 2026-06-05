import React from 'react';
import { ShieldAlert, Clock, AlertTriangle, Activity, RefreshCcw } from 'lucide-react';
import { cn } from '../../index';

interface HealthMetric {
  label: string;
  value: number;
  trend: 'up' | 'down' | 'neutral';
  status: 'healthy' | 'warning' | 'critical';
}

const mockMetrics: HealthMetric[] = [
  { label: 'Deals At Risk', value: 3, trend: 'up', status: 'warning' },
  { label: 'Missed Deadlines', value: 1, trend: 'neutral', status: 'critical' },
  { label: 'Verification Delays', value: 5, trend: 'down', status: 'warning' },
  { label: 'Predicted Disputes', value: 2, trend: 'up', status: 'warning' }
];

export const EscrowHealthDashboard = () => {
  return (
    <div className="flex flex-col gap-6 p-2 md:p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-[#111827] flex items-center gap-2">
            <Activity className="h-6 w-6 text-[#3B82F6]" /> Escrow Health Center
          </h1>
          <p className="text-sm text-[#6B7280]">
            Operational heartbeat and risk detection across all active transactions.
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-bold text-[#111827] hover:bg-[#FAFAFA]">
          <RefreshCcw className="h-4 w-4" /> Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockMetrics.map((metric, i) => (
          <div key={i} className={cn(
            "flex flex-col gap-2 rounded-[12px] border p-6 shadow-sm transition-all",
            metric.status === 'healthy' ? "bg-white border-[#E5E7EB]" :
            metric.status === 'warning' ? "bg-[#F59E0B]/5 border-[#F59E0B]/20" :
            "bg-[#EF4444]/5 border-[#EF4444]/20"
          )}>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider flex items-center gap-1",
              metric.status === 'healthy' ? "text-[#6B7280]" :
              metric.status === 'warning' ? "text-[#F59E0B]" :
              "text-[#EF4444]"
            )}>
              {metric.status === 'critical' ? <AlertTriangle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
              {metric.label}
            </span>
            <div className="flex items-baseline justify-between mt-2">
              <span className={cn(
                "text-3xl font-black",
                metric.status === 'healthy' ? "text-[#111827]" :
                metric.status === 'warning' ? "text-[#F59E0B]" :
                "text-[#EF4444]"
              )}>
                {metric.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm overflow-hidden mt-2">
        <div className="px-6 py-4 border-b border-[#E5E7EB] bg-[#FAFAFA] flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Actionable Alerts</h3>
          <span className="text-xs font-bold text-[#EF4444]">Requires Immediate Attention</span>
        </div>
        <div className="divide-y divide-[#E5E7EB]">
          <div className="p-4 px-6 flex items-center justify-between hover:bg-[#FAFAFA] transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-[#EF4444]/10 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-[#EF4444]" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-[#111827]">Delivery Deadline Exceeded</span>
                <span className="text-xs text-[#6B7280]">Deal DEL-11A9Z • Missed by 4 hours</span>
              </div>
            </div>
            <button className="rounded-lg bg-[#EF4444] px-4 py-2 text-xs font-bold text-white hover:bg-[#EF4444]/90 opacity-0 group-hover:opacity-100 transition-opacity">
              Escalate to Dispute
            </button>
          </div>
          
          <div className="p-4 px-6 flex items-center justify-between hover:bg-[#FAFAFA] transition-colors cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-[#F59E0B]" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-[#111827]">Verification Oracle Delayed</span>
                <span className="text-xs text-[#6B7280]">Deal DEL-8F92A • API response timeout</span>
              </div>
            </div>
            <button className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-bold text-[#111827] hover:bg-[#FAFAFA] opacity-0 group-hover:opacity-100 transition-opacity">
              Trigger Manual Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
