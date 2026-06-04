import React from 'react';
import { CheckCircle2, Clock, ShieldAlert, Wallet, UserPlus, FileText, ChevronRight } from 'lucide-react';
import { cn } from '../../index';

export type WorkItemType = 'action' | 'review' | 'dispute' | 'payment' | 'onboarding';

export interface WorkItem {
  id: string;
  type: WorkItemType;
  title: string;
  description: string;
  dealId?: string;
  dealTitle?: string;
  deadline?: string;
  priority: 'high' | 'medium' | 'low';
  timestamp: string;
}

interface WorkQueueProps {
  items: WorkItem[];
  onItemClick: (item: WorkItem) => void;
}

export const WorkQueue = ({ items, onItemClick }: WorkQueueProps) => {
  const getIcon = (type: WorkItemType) => {
    switch (type) {
      case 'action': return <CheckCircle2 className="h-5 w-5 text-[#3B82F6]" />;
      case 'review': return <FileText className="h-5 w-5 text-[#F59E0B]" />;
      case 'dispute': return <ShieldAlert className="h-5 w-5 text-[#EF4444]" />;
      case 'payment': return <Wallet className="h-5 w-5 text-[#10B981]" />;
      case 'onboarding': return <UserPlus className="h-5 w-5 text-[#8B5CF6]" />;
    }
  };

  return (
    <div className="flex flex-col rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-[#FAFAFA] px-6 py-4">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">My Work Queue</h3>
        <span className="rounded-full bg-[#111827] px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-widest">
          {items.length} Pending
        </span>
      </div>

      <div className="divide-y divide-[#E5E7EB]">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CheckCircle2 className="h-12 w-12 text-[#E5E7EB] mb-4" />
            <p className="text-sm font-medium text-[#111827]">You're all caught up!</p>
            <p className="text-xs text-[#6B7280]">No items require your attention right now.</p>
          </div>
        ) : (
          items.map((item) => (
            <div 
              key={item.id}
              onClick={() => onItemClick(item)}
              className="flex items-center gap-4 px-6 py-4 hover:bg-[#FAFAFA] transition-colors cursor-pointer group"
            >
              <div className="shrink-0 h-10 w-10 rounded-lg bg-[#FAFAFA] border border-[#E5E7EB] flex items-center justify-center group-hover:bg-white transition-colors">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-bold text-[#111827] truncate">{item.title}</span>
                  {item.priority === 'high' && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#EF4444]/10 text-[#EF4444] text-[8px] font-black uppercase tracking-widest border border-[#EF4444]/20">
                      High Priority
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#6B7280] truncate">{item.description}</p>
                {item.dealTitle && (
                  <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">
                    <span>Deal: {item.dealTitle}</span>
                    <span className="h-1 w-1 rounded-full bg-[#E5E7EB]" />
                    <span>{item.dealId}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0 ml-4">
                {item.deadline ? (
                  <div className="flex items-center gap-1 text-[10px] font-bold text-[#EF4444] uppercase tracking-widest">
                    <Clock className="h-3 w-3" />
                    <span>Due {item.deadline}</span>
                  </div>
                ) : (
                  <span className="text-[10px] font-medium text-[#9CA3AF] uppercase">{item.timestamp}</span>
                )}
                <ChevronRight className="h-4 w-4 text-[#E5E7EB] group-hover:text-[#111827] transition-colors" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
