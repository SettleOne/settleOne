import React from 'react';
import { Deal, DealState } from '@settleone/types';
import { cn } from '../../index';

interface DealHeaderProps {
  deal: Deal;
}

export const DealHeader = ({ deal }: DealHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 border-b border-[#E5E7EB] bg-white px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight text-[#111827]">{deal.title}</h1>
          <span className="rounded-full bg-[#FAFAFA] px-2.5 py-0.5 text-xs font-medium text-[#6B7280] border border-[#E5E7EB]">
            {deal.id}
          </span>
        </div>
        <div className="flex items-center gap-4 text-sm text-[#6B7280]">
          <span className="flex items-center gap-1">
            Created: {new Date(deal.createdAt).toLocaleDateString()}
          </span>
          <span className="h-1 w-1 rounded-full bg-[#E5E7EB]" />
          <span className="flex items-center gap-1">
            Counterparty: <span className="font-mono text-[#111827]">{deal.sellerAddress}</span>
          </span>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-end gap-1">
        <span className="text-sm font-medium text-[#6B7280]">Deal Amount</span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight text-[#111827]">{deal.amount}</span>
          <span className="text-lg font-bold text-[#6B7280]">{deal.tokenSymbol}</span>
        </div>
      </div>
    </div>
  );
};
