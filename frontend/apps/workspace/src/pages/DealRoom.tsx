import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DealState, Deal } from '@settleone/types';
import { useRealtime } from '../providers/RealtimeProvider';
import { useNotify } from '../providers/NotificationProvider';
import {
  DealHeader,
  StatusBanner,
  LifecycleTimeline,
  ActionCenter,
  EscrowYieldPanel,
  DeliverablesWorkspace,
  EvidenceWorkspace,
  CommunicationLayer,
  ActivityFeed
} from '@settleone/design-system/components/deal';

// Mock Deal Data
const mockDeal: Deal = {
  id: 'DEL-8F92A',
  contractId: '0x123...abc',
  title: 'Website Redesign & Frontend Development',
  description: 'Complete overhaul of the marketing website using React and Tailwind CSS.',
  buyerAddress: '0x1234567890abcdef1234567890abcdef12345678',
  sellerAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
  amount: '5,000',
  tokenSymbol: 'USDC',
  state: DealState.Active,
  createdAt: Date.now() - 86400000 * 2, // 2 days ago
  deliveryDeadline: Date.now() + 86400000 * 5, // 5 days from now
  acceptanceWindow: 86400000 * 2,
  disputeWindow: 86400000 * 3,
  yieldGenerated: '0.10'
};

export const DealRoom = () => {
  const { id } = useParams();
  const [deal, setDeal] = useState<Deal>(mockDeal);
  const [techDetailsOpen, setTechDetailsOpen] = useState(false);
  const { emit } = useRealtime();
  const notify = useNotify();

  // Mock Alerts
  const dealAlerts = [
    { id: '1', type: 'warning' as const, message: 'Delivery verification is taking longer than expected.', timestamp: '2H AGO' },
    { id: '2', type: 'info' as const, message: 'Seller requested a clarification on Annex A.', timestamp: '1D AGO' }
  ];

  const handleAction = (actionId: string) => {
    switch (actionId) {
      case 'submit':
        emit('DeliverySubmitted', { dealId: deal.id });
        setDeal(prev => ({ ...prev, state: DealState.DeliverySubmitted }));
        notify('success', 'Delivery Submitted', 'Your deliverables have been submitted for review.');
        break;
      case 'revision':
        notify('info', 'Revision Requested', 'A revision request has been sent to the seller.');
        break;
      case 'dispute':
        emit('DisputeRaised', { dealId: deal.id });
        setDeal(prev => ({ ...prev, state: DealState.Disputed }));
        notify('error', 'Dispute Raised', 'The deal has been placed into dispute state.');
        break;
      default:
        console.log('Action not implemented:', actionId);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <DealHeader deal={deal} />
        <div className="flex items-center justify-end px-4 md:px-8">
          <button 
            onClick={() => setTechDetailsOpen(true)}
            className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest hover:text-[#111827] flex items-center gap-1.5 transition-colors"
          >
            Technical Details Drawer
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:items-start px-4 md:px-8 pb-12">
        {/* Left Column (Operating Context) - 4 cols */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          <CommitmentIntelligence 
            deliveryDue="2d 13h"
            acceptanceWindow="48 Hours"
            disputeWindow="72 Hours"
            estimatedSettlement="June 15, 2026"
            riskLevel="Low"
          />
          
          <CounterpartyCard 
            name="AlphaDev Solutions"
            role="SELLER"
            verified={true}
            completedDeals={42}
            successRate="98%"
            avgSettlementTime="4.2 Days"
            memberSince="Jan 2024"
          />

          <FinancialProjection 
            amount={5000}
            yieldToday={0.10}
            projectedYield7d={0.45}
            platformFeeRate={0.02}
            tokenSymbol="USDC"
          />

          {deal.state === DealState.Disputed && (
            <SettlementSimulator 
              amount={5000}
              yieldGenerated={0.10}
              tokenSymbol="USDC"
            />
          )}

          <DealAlerts alerts={dealAlerts} />
        </div>

        {/* Center/Main Column (Deal Workspace) - 5 cols */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          <StatusBanner state={deal.state} deadline={deal.deliveryDeadline} />
          <LifecycleTimeline currentState={deal.state} />
          <ActionCenter state={deal.state} role="buyer" onAction={handleAction} />
          
          <div className="flex flex-col gap-8 bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm">
            <DeliverablesWorkspace />
            <EvidenceWorkspace />
            <CommunicationLayer />
          </div>
        </div>

        {/* Right Column (Activity Rail) - 3 cols */}
        <div className="xl:col-span-3">
          <div className="xl:sticky xl:top-[88px] bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-sm min-h-[600px]">
            <ActivityFeed />
          </div>
        </div>
      </div>

      <TechnicalDetails 
        isOpen={techDetailsOpen}
        onClose={() => setTechDetailsOpen(false)}
        dealId={deal.id}
        contractAddress="0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
        vaultId="0x4b...f2a"
        verifier="Chainlink Functions"
        chain="Polygon PoS"
      />
    </div>
  );
};
