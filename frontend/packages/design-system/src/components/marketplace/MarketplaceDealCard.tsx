import React from 'react';
import { Clock, DollarSign, Tag, ShieldCheck, ArrowRight } from 'lucide-react';
import { cn } from '../../index';

interface MarketplaceDealCardProps {
  title: string;
  budget: string;
  category: string;
  deadline: string;
  buyerName: string;
  buyerVerified: boolean;
  escrowFunded: boolean;
  onClick?: () => void;
}

export const MarketplaceDealCard = ({
  title,
  budget,
  category,
  deadline,
  buyerName,
  buyerVerified,
  escrowFunded,
  onClick
}: MarketplaceDealCardProps) => {
  return (
    <div 
      onClick={onClick}
      className="group flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm hover:border-[#111827] hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#FAFAFA] border border-[#E5E7EB] px-2 py-0.5 text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">
              {category}
            </span>
            {escrowFunded && (
              <span className="rounded-full bg-[#10B981]/10 text-[#10B981] text-[10px] font-bold px-2 py-0.5 border border-[#10B981]/20 uppercase tracking-widest">
                Escrow Funded
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold text-[#111827] group-hover:text-[#3B82F6] transition-colors line-clamp-1">{title}</h3>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <span className="text-xl font-black text-[#111827]">${budget}</span>
          <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Fixed Budget</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#FAFAFA]">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#6B7280]" />
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Deadline</span>
            <span className="text-xs font-bold text-[#111827]">{deadline}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-[#111827] flex items-center justify-center text-white text-[10px] font-bold">
            {buyerName.charAt(0)}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-[#111827]">{buyerName}</span>
              {buyerVerified && <ShieldCheck className="h-3 w-3 text-[#3B82F6]" />}
            </div>
            <span className="text-[10px] text-[#6B7280]">Verified Buyer</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-1">
          {/* Tags */}
          <span className="text-[10px] font-medium text-[#6B7280] bg-[#FAFAFA] px-2 py-0.5 rounded">React</span>
          <span className="text-[10px] font-medium text-[#6B7280] bg-[#FAFAFA] px-2 py-0.5 rounded">TypeScript</span>
        </div>
        <button className="flex items-center gap-1.5 text-sm font-bold text-[#111827] group-hover:translate-x-1 transition-transform">
          View Opportunity <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
