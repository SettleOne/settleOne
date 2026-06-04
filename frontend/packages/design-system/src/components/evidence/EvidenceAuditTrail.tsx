import React from 'react';
import { History, User, CheckCircle2, Download, Search } from 'lucide-react';
import { cn } from '../../index';

interface AuditEvent {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  details?: string;
  icon: any;
  color: string;
}

const mockEvents: AuditEvent[] = [
  { id: '1', action: 'Evidence Verified', actor: 'System Oracle', timestamp: 'Oct 15, 10:45 AM', icon: CheckCircle2, color: 'text-[#10B981] bg-[#10B981]/10 border-[#10B981]/20' },
  { id: '2', action: 'Evidence Uploaded', actor: 'Seller (0xABCD...EF01)', timestamp: 'Oct 15, 10:42 AM', icon: User, color: 'text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20' },
  { id: '3', action: 'Collection Created', actor: 'Buyer (0x1234...5678)', timestamp: 'Oct 14, 2:30 PM', icon: History, color: 'text-[#6B7280] bg-[#FAFAFA] border-[#E5E7EB]' },
];

export const EvidenceAuditTrail = () => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
          <History className="h-4 w-4 text-[#6B7280]" />
          Chain of Custody (Audit Trail)
        </h3>
        <button className="text-[#6B7280] hover:text-[#111827]">
          <Download className="h-4 w-4" />
        </button>
      </div>

      <div className="relative pl-4 border-l border-[#E5E7EB] ml-3 mt-2 space-y-6">
        {mockEvents.map((event, i) => {
          const Icon = event.icon;
          return (
            <div key={event.id} className="relative">
              <div className={cn("absolute -left-[27px] top-0 h-6 w-6 rounded-full border flex items-center justify-center", event.color)}>
                <Icon className="h-3 w-3" />
              </div>
              <div className="flex flex-col gap-1 ml-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-[#111827]">{event.action}</span>
                  <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">{event.timestamp}</span>
                </div>
                <span className="text-xs text-[#6B7280] font-medium flex items-center gap-1">
                  By {event.actor}
                </span>
                {event.details && (
                  <p className="mt-1 text-sm text-[#374151] bg-[#FAFAFA] border border-[#E5E7EB] rounded p-2">
                    {event.details}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
