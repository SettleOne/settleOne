import React from 'react';
import { DealState } from '@settleone/types';
import { buttonVariants } from '../../index';
import { cn } from '../../index';

interface ActionCenterProps {
  state: DealState;
  role: 'buyer' | 'seller' | 'arbitrator';
  onAction?: (action: string) => void;
}

export const ActionCenter = ({ state, role, onAction }: ActionCenterProps) => {
  const getActions = () => {
    if (role === 'buyer' && state === DealState.AwaitingFunding) {
      return [
        { id: 'fund', label: 'Fund Deal', variant: 'primary' },
        { id: 'cancel', label: 'Cancel Deal', variant: 'ghost' }
      ];
    }
    if (role === 'seller' && state === DealState.PendingSellerAcceptance) {
      return [
        { id: 'accept', label: 'Accept Deal Terms', variant: 'success' },
        { id: 'reject', label: 'Reject', variant: 'ghost' }
      ];
    }
    if (state === DealState.Active) {
      return [
        { id: 'submit', label: 'Submit Delivery', variant: 'primary', roles: ['seller'] },
        { id: 'dispute', label: 'Raise Dispute', variant: 'error', roles: ['buyer', 'seller'] }
      ].filter(a => !a.roles || a.roles.includes(role));
    }
    if (role === 'buyer' && (state === DealState.DeliverySubmitted || state === DealState.AwaitingAcceptance)) {
      return [
        { id: 'accept', label: 'Accept Delivery', variant: 'success' },
        { id: 'revision', label: 'Request Revision', variant: 'secondary' },
        { id: 'dispute', label: 'Raise Dispute', variant: 'error' }
      ];
    }
    return [];
  };

  const actions = getActions();

  if (actions.length === 0) return null;

  return (
    <div className="rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <h3 className="text-sm font-bold text-[#111827] mb-4 uppercase tracking-wider">Required Actions</h3>
      <div className="flex flex-col md:flex-row gap-3">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onAction?.(action.id)}
            className={cn(buttonVariants({ variant: action.variant as any, size: 'lg' }), 'w-full md:w-auto')}
          >
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
};
