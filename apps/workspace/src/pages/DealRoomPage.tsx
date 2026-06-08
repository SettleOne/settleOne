import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DealState } from '@settleone/types';
import { DealRoomHeader } from './DealRoom/components/DealRoomHeader';
import { DealLifecycleTimeline } from './DealRoom/components/DealLifecycleTimeline';
import { IntelligencePanels } from './DealRoom/components/IntelligencePanels';
import { ActionCenter } from './DealRoom/components/ActionCenter';
import { DealChatRoom } from './DealRoom/components/DealChatRoom';
import { SubmittedDeliveriesLog } from './DealRoom/components/SubmittedDeliveriesLog';
import { ActivityFeed } from './DealRoom/components/ActivityFeed';
import { DeliveryVerificationPanel } from './DealRoom/components/DeliveryVerificationPanel';
import { BuyerAcceptancePanel } from './DealRoom/components/BuyerAcceptancePanel';
import { SettlementSummaryCard } from './DealRoom/components/SettlementSummaryCard';
import { Tabs } from '@settleone/design-system';

export function DealRoomPage() {
  const { id } = useParams();
  const [currentState] = useState<DealState>(DealState.DeliverySubmitted);
  const [userRole] = useState<'buyer' | 'seller'>('buyer');

  const tabsData = [
    {
      id: 'terms',
      label: 'Deal Terms & Info',
      content: (
        <div className="p-6 bg-white border border-[var(--border)] rounded-lg shadow-sm">
          <h3 className="text-lg font-bold mb-4">Deal Specifications</h3>
          <p className="text-gray-600 mb-4">Complete Smart Contract Audit for a new Yield Farming protocol.</p>
          <div className="prose max-w-none text-sm text-gray-600">
            <ul>
              <li>Full line-by-line manual review of 5 smart contracts.</li>
              <li>Automated static analysis using Slither and Mythril.</li>
              <li>Verification of all mathematical invariants.</li>
              <li>Gas optimization report.</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 'delivery',
      label: 'Deliverables & Evidence',
      content: (
        <div className="space-y-4">
          <SubmittedDeliveriesLog />
        </div>
      )
    },
    {
      id: 'chat',
      label: 'Deal Chat',
      content: (
        <DealChatRoom />
      )
    }
  ];

  return (
    <div className="flex flex-col -mx-4 md:-mx-6 -mt-4 md:-mt-6">
      <DealRoomHeader />
      <DealLifecycleTimeline currentState={currentState} />
      
      <div className="max-w-[1200px] w-full mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* Left Column: Intelligence Panels */}
          <IntelligencePanels />

          {/* Center Column: Main Workspace */}
          <div className="flex-1 flex flex-col min-w-0">
            <ActionCenter currentState={currentState} userRole={userRole} />

            {/* Conditional Panels based on state */}
            {currentState === DealState.DeliverySubmitted && userRole === 'buyer' && (
              <>
                <DeliveryVerificationPanel />
                <BuyerAcceptancePanel />
              </>
            )}

            {currentState === DealState.Settled && (
              <SettlementSummaryCard />
            )}
            
            <div className="mt-2">
              <Tabs tabs={tabsData} />
            </div>
          </div>

          {/* Right Column: Activity Feed */}
          <div className="w-full md:w-[280px] shrink-0">
            <ActivityFeed />
          </div>

        </div>
      </div>
    </div>
  );
}
