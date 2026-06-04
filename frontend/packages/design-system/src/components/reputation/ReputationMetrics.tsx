import React from 'react';
import { TrendingUp, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '../../index';

interface ReputationMetricsProps {
  completedDeals: number;
  totalVolume: string;
  successRate: string;
  disputeRate: string;
  avgSettlementTime: string;
}

export const ReputationMetrics = ({
  completedDeals,
  totalVolume,
  successRate,
  disputeRate,
  avgSettlementTime
}: ReputationMetricsProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Trust & Reliability Metrics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Completed Deals */}
        <div className="flex flex-col gap-1 rounded-lg bg-[#FAFAFA] border border-[#E5E7EB] p-4">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" /> Completed
          </span>
          <span className="text-xl font-black text-[#111827]">{completedDeals} <span className="text-xs font-medium text-[#6B7280] font-normal">deals</span></span>
        </div>

        {/* Success Rate */}
        <div className="flex flex-col gap-1 rounded-lg bg-[#10B981]/5 border border-[#10B981]/20 p-4">
          <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Success Rate
          </span>
          <span className="text-xl font-black text-[#10B981]">{successRate}</span>
        </div>

        {/* Dispute Rate */}
        <div className="flex flex-col gap-1 rounded-lg bg-[#EF4444]/5 border border-[#EF4444]/20 p-4">
          <span className="text-[10px] font-bold text-[#EF4444] uppercase tracking-wider flex items-center gap-1">
            <AlertTriangle className="h-3 w-3" /> Dispute Rate
          </span>
          <span className="text-xl font-black text-[#EF4444]">{disputeRate}</span>
        </div>

        {/* Average Settlement Time */}
        <div className="flex flex-col gap-1 rounded-lg bg-[#FAFAFA] border border-[#E5E7EB] p-4">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
            <Clock className="h-3 w-3" /> Avg. Settlement
          </span>
          <span className="text-xl font-black text-[#111827]">{avgSettlementTime}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-[#E5E7EB] pt-4 mt-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Total Volume Transacted</span>
          <span className="text-sm font-bold text-[#111827]">{totalVolume} USDC</span>
        </div>
        <button className="text-xs font-bold text-[#3B82F6] hover:underline uppercase tracking-wider">
          View On-Chain History
        </button>
      </div>
    </div>
  );
};
