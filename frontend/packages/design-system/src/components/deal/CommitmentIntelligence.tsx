import React from 'react';
import { Clock, ShieldCheck, AlertTriangle, CalendarDays } from 'lucide-react';
import { cn } from '../../index';

interface CommitmentIntelligenceProps {
  deliveryDue: string;
  acceptanceWindow: string;
  disputeWindow: string;
  estimatedSettlement: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export const CommitmentIntelligence = ({
  deliveryDue,
  acceptanceWindow,
  disputeWindow,
  estimatedSettlement,
  riskLevel
}: CommitmentIntelligenceProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#6B7280]" />
          Commitment Intelligence
        </h3>
        <div className={cn(
          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border",
          riskLevel === 'Low' ? "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20" :
          riskLevel === 'Medium' ? "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20" :
          "bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20"
        )}>
          Risk: {riskLevel}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
            <Clock className="h-3 w-3" /> Delivery Due
          </span>
          <span className="text-lg font-bold text-[#111827]">{deliveryDue}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
            <CalendarDays className="h-3 w-3" /> Estimated Settlement
          </span>
          <span className="text-lg font-bold text-[#111827]">{estimatedSettlement}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Acceptance Window</span>
          <span className="text-sm font-medium text-[#111827]">{acceptanceWindow}</span>
          <p className="text-[10px] text-[#6B7280]">Starts after verification</p>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Dispute Window</span>
          <span className="text-sm font-medium text-[#111827]">{disputeWindow}</span>
          <p className="text-[10px] text-[#6B7280]">Post-acceptance period</p>
        </div>
      </div>

      {riskLevel !== 'Low' && (
        <div className="mt-2 flex items-center gap-2 rounded-lg bg-[#F59E0B]/5 p-3 border border-[#F59E0B]/10">
          <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />
          <p className="text-xs text-[#F59E0B] font-medium">Delayed delivery may impact yield share.</p>
        </div>
      )}
    </div>
  );
};
