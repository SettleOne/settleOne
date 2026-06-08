import React from 'react';
import { Clock, ShieldAlert } from 'lucide-react';
import { DealStateTag, NetworkBadge, CountdownTimer, Avatar } from '@settleone/design-system';
import { DealState, DealType } from '@settleone/types';
import { getDealStateColor, getDealStateLabel, formatAmount } from '@settleone/utils';
import { Link } from 'react-router-dom';

interface DealCardProps {
  id: string;
  title: string;
  amount: bigint;
  tokenSymbol: string;
  decimals: number;
  state: DealState;
  dealType: DealType;
  deadline: number;
  buyerAddress: string;
  chainId: number;
}

export function DealCard({ 
  id, title, amount, tokenSymbol, decimals, state, dealType, deadline, chainId 
}: DealCardProps) {
  const isHardDelivery = dealType === DealType.HardDelivery;

  return (
    <Link to={`/marketplace/${id}`} className="block group">
      <div className="bg-white border border-[var(--border)] rounded-lg shadow-sm hover:shadow-md hover:border-[var(--accent-blue)] transition-all p-5 flex flex-col h-full">
        
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[var(--text-secondary)] bg-gray-100 px-2 py-0.5 rounded">
              #{id}
            </span>
            <NetworkBadge chainId={chainId} className="!py-0.5" />
            {isHardDelivery && (
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
                <ShieldAlert size={10} /> Physical
              </span>
            )}
          </div>
          <DealStateTag 
            state={state} 
            label={getDealStateLabel(state)} 
            colorHex={getDealStateColor(state)} 
          />
        </div>

        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-blue)] transition-colors line-clamp-2">
          {title}
        </h3>

        <div className="mt-auto pt-4 flex items-end justify-between border-t border-[var(--border)] border-dashed">
          <div>
            <p className="text-xs text-[var(--text-secondary)] mb-1">Budget</p>
            <p className="text-xl font-bold text-[var(--text-primary)]">
              {formatAmount(amount, decimals, tokenSymbol)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[var(--text-secondary)] mb-1">Time Remaining</p>
            <CountdownTimer deadline={deadline} />
          </div>
        </div>

      </div>
    </Link>
  );
}
