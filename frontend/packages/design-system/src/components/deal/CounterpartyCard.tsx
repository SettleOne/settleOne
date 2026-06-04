import React from 'react';
import { UserCheck, Star, ShieldCheck } from 'lucide-react';

interface CounterpartyCardProps {
  name: string;
  role: string;
  verified: boolean;
  completedDeals: number;
  successRate: string;
  avgSettlementTime: string;
  memberSince: string;
}

export const CounterpartyCard = ({
  name,
  role,
  verified,
  completedDeals,
  successRate,
  avgSettlementTime,
  memberSince
}: CounterpartyCardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-[#111827] flex items-center justify-center text-white font-bold text-lg">
          {name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-[#111827]">{name}</span>
            {verified && <ShieldCheck className="h-4 w-4 text-[#3B82F6]" />}
          </div>
          <span className="text-xs text-[#6B7280] font-medium uppercase tracking-wider">{role}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 border-t border-[#E5E7EB] pt-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Completed Deals</span>
          <span className="text-sm font-bold text-[#111827]">{completedDeals}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Success Rate</span>
          <span className="text-sm font-bold text-[#10B981]">{successRate}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Avg. Settlement</span>
          <span className="text-sm font-bold text-[#111827]">{avgSettlementTime}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider">Member Since</span>
          <span className="text-sm font-bold text-[#111827]">{memberSince}</span>
        </div>
      </div>
    </div>
  );
};
