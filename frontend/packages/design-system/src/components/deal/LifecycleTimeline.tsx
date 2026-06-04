import React from 'react';
import { DealState } from '@settleone/types';
import { Check, Circle } from 'lucide-react';
import { cn } from '../../index';

const STAGES = [
  { id: 'created', label: 'Created', state: DealState.Draft },
  { id: 'funded', label: 'Funded', state: DealState.AwaitingFunding },
  { id: 'accepted', label: 'Accepted', state: DealState.PendingSellerAcceptance },
  { id: 'active', label: 'Active', state: DealState.Active },
  { id: 'delivered', label: 'Delivered', state: DealState.DeliverySubmitted },
  { id: 'settled', label: 'Settled', state: DealState.Settled },
];

interface LifecycleTimelineProps {
  currentState: DealState;
}

export const LifecycleTimeline = ({ currentState }: LifecycleTimelineProps) => {
  // Simplified logic to determine active index for mockup
  let activeIndex = 1;
  if (currentState === DealState.PendingSellerAcceptance) activeIndex = 2;
  if (currentState === DealState.Active) activeIndex = 3;
  if (currentState === DealState.Settled) activeIndex = 5;

  return (
    <div className="rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <h3 className="text-sm font-bold text-[#111827] mb-6 uppercase tracking-wider">Transaction Lifecycle</h3>
      <div className="relative flex w-full justify-between">
        <div className="absolute top-1/2 left-0 h-[2px] w-full -translate-y-1/2 bg-[#E5E7EB]"></div>
        <div 
          className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-[#111827] transition-all duration-500"
          style={{ width: `${(activeIndex / (STAGES.length - 1)) * 100}%` }}
        ></div>
        
        {STAGES.map((stage, index) => {
          const isCompleted = index <= activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center gap-2">
              <div 
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white transition-colors duration-300',
                  isCompleted ? 'border-[#111827]' : 'border-[#E5E7EB]',
                  isCurrent && 'ring-4 ring-[#111827]/10'
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4 text-[#111827]" />
                ) : (
                  <Circle className="h-2 w-2 fill-[#E5E7EB] text-[#E5E7EB]" />
                )}
              </div>
              <span className={cn(
                'absolute -bottom-6 text-xs font-medium whitespace-nowrap',
                isCompleted ? 'text-[#111827]' : 'text-[#6B7280]'
              )}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-8 pt-4 border-t border-[#E5E7EB] text-xs text-[#6B7280] text-center">
        View full activity history
      </div>
    </div>
  );
};
