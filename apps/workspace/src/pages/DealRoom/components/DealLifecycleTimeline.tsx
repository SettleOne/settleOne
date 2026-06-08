import React from 'react';
import { DealState } from '@settleone/types';
import { Check } from 'lucide-react';

interface DealLifecycleTimelineProps {
  currentState: DealState;
}

export function DealLifecycleTimeline({ currentState }: DealLifecycleTimelineProps) {
  // Ordered states representing the linear flow
  const states = [
    { id: DealState.AwaitingFunding, label: 'Created' },
    { id: DealState.PendingSellerAcceptance, label: 'Funded' },
    { id: DealState.Active, label: 'Seller Accepted' },
    { id: DealState.DeliverySubmitted, label: 'Delivery Submitted' },
    { id: DealState.AwaitingAcceptance, label: 'Verifying' },
    { id: DealState.Accepted, label: 'Accepted' },
    { id: DealState.Settled, label: 'Settled' }
  ];

  // Mock determining state order for timeline visualization
  const currentIndex = states.findIndex(s => s.id === currentState) >= 0 
    ? states.findIndex(s => s.id === currentState) 
    : 0;

  return (
    <div className="bg-white border-b border-[var(--border)] overflow-x-auto hide-scrollbar">
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 py-6 min-w-[800px]">
        <div className="relative flex items-center justify-between">
          
          {/* Background line */}
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
          
          {/* Active line */}
          <div 
            className="absolute left-0 top-1/2 h-0.5 bg-[var(--accent-blue)] transition-all duration-500 ease-in-out -z-10 -translate-y-1/2"
            style={{ width: `${(currentIndex / (states.length - 1)) * 100}%` }}
          ></div>

          {states.map((state, index) => {
            const isCompleted = index < currentIndex;
            const isActive = index === currentIndex;
            const isFuture = index > currentIndex;

            return (
              <div key={state.id} className="relative flex flex-col items-center group cursor-default">
                
                {/* Node */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isCompleted ? 'bg-[var(--accent-blue)] text-white' :
                  isActive ? 'bg-[var(--accent-blue)] text-white ring-4 ring-blue-100 shadow-sm' :
                  'bg-gray-200 border-2 border-white'
                }`}>
                  {isCompleted && <Check size={12} strokeWidth={3} />}
                  {isActive && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                </div>

                {/* Label */}
                <span className={`absolute top-8 text-xs font-medium whitespace-nowrap ${
                  isActive ? 'text-[var(--text-primary)] font-bold' : 
                  isCompleted ? 'text-[var(--text-primary)]' : 
                  'text-gray-400'
                }`}>
                  {state.label}
                </span>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
