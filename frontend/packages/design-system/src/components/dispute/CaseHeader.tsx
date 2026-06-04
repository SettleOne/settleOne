import React from 'react';
import { ShieldAlert, Scale, Clock } from 'lucide-react';
import { cn } from '../../index';

interface CaseHeaderProps {
  caseId: string;
  dealId: string;
  title: string;
  status: 'Negotiation' | 'Arbitration' | 'Resolved';
  filedDate: string;
  disputedAmount: string;
  tokenSymbol: string;
}

export const CaseHeader = ({
  caseId,
  dealId,
  title,
  status,
  filedDate,
  disputedAmount,
  tokenSymbol
}: CaseHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 border-b border-[#E5E7EB] bg-white px-6 py-6 md:flex-row md:items-center md:justify-between rounded-[12px] shadow-sm">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-[#EF4444]/10 flex items-center justify-center">
            <Scale className="h-5 w-5 text-[#EF4444]" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tight text-[#111827]">{title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="rounded-full bg-[#FAFAFA] border border-[#E5E7EB] px-2 py-0.5 text-[10px] font-bold text-[#6B7280]">
                {caseId}
              </span>
              <span className="text-xs text-[#6B7280]">Linked to Deal {dealId}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:items-end gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#6B7280]">Disputed Amount:</span>
          <span className="text-xl font-bold text-[#111827]">{disputedAmount} <span className="text-sm text-[#6B7280]">{tokenSymbol}</span></span>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-wider">
          <span className={cn(
            "px-2 py-1 rounded-full border flex items-center gap-1",
            status === 'Negotiation' ? "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20" :
            status === 'Arbitration' ? "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20" :
            "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20"
          )}>
            {status === 'Negotiation' && <Clock className="h-3 w-3" />}
            {status === 'Arbitration' && <Scale className="h-3 w-3" />}
            {status}
          </span>
          <span className="text-[#6B7280]">Filed: {filedDate}</span>
        </div>
      </div>
    </div>
  );
};
