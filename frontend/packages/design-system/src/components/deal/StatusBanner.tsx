import React from 'react';
import { DealState } from '@settleone/types';
import { AlertCircle, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';
import { cn } from '../../index';

interface StatusBannerProps {
  state: DealState;
  deadline?: number;
}

export const StatusBanner = ({ state, deadline }: StatusBannerProps) => {
  let config = {
    color: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
    icon: Clock,
    title: 'Awaiting Action',
    description: 'Waiting for the next step.',
    action: 'View Details',
    buttonColor: 'bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white'
  };

  switch (state) {
    case DealState.AwaitingFunding:
      config = {
        color: 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20',
        icon: Clock,
        title: 'Awaiting Buyer Funding',
        description: 'The deal is created and waiting for you to deposit funds into escrow.',
        action: 'Fund Deal',
        buttonColor: 'bg-[#F59E0B] hover:bg-[#F59E0B]/90 text-white'
      };
      break;
    case DealState.PendingSellerAcceptance:
      config = {
        color: 'bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/20',
        icon: AlertCircle,
        title: 'Awaiting Seller Acceptance',
        description: 'Funds are secured in escrow. Waiting for the seller to accept the terms.',
        action: 'Review Terms',
        buttonColor: 'bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white'
      };
      break;
    case DealState.Active:
      config = {
        color: 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/20',
        icon: CheckCircle2,
        title: 'Deal is Active',
        description: 'The seller is currently fulfilling the delivery requirements.',
        action: 'Submit Delivery',
        buttonColor: 'bg-[#10B981] hover:bg-[#10B981]/90 text-white'
      };
      break;
    case DealState.Disputed:
      config = {
        color: 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/20',
        icon: ShieldAlert,
        title: 'Dispute Window Active',
        description: 'A dispute has been raised. Arbitration is currently under review.',
        action: 'View Case',
        buttonColor: 'bg-[#EF4444] hover:bg-[#EF4444]/90 text-white'
      };
      break;
  }

  const Icon = config.icon;

  return (
    <div className={cn('flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-[12px] border p-4 shadow-sm', config.color)}>
      <div className="flex items-start gap-4">
        <Icon className="h-6 w-6 shrink-0 mt-0.5" />
        <div className="flex flex-col gap-1">
          <h3 className="font-bold tracking-tight">{config.title}</h3>
          <p className="text-sm opacity-90">{config.description}</p>
        </div>
      </div>
      <div className="flex flex-col md:items-end gap-2 shrink-0">
        {deadline && (
          <span className="text-xs font-medium uppercase tracking-wider opacity-80">
            Time Remaining: 24:00:00
          </span>
        )}
        <button className={cn('rounded-[10px] px-4 py-2 text-sm font-medium transition-colors w-full md:w-auto', config.buttonColor)}>
          {config.action}
        </button>
      </div>
    </div>
  );
};
