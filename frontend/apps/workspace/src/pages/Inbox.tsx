import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WorkQueue, WorkItem } from '@settleone/design-system';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const mockWorkItems: WorkItem[] = [
  {
    id: '1',
    type: 'review',
    title: 'Review Delivery: V2 Deliverables',
    description: 'AlphaDev Solutions has submitted V2 of the Website Redesign.',
    dealId: 'DEL-8F92A',
    dealTitle: 'Website Redesign',
    deadline: '2H 30M',
    priority: 'high',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'dispute',
    title: 'Action Required: Respond to Dispute Proposal',
    description: 'Seller proposed a 80/20 split for the current dispute.',
    dealId: 'DEL-9B12C',
    dealTitle: 'Logo Design Pack',
    deadline: '1D 4H',
    priority: 'high',
    timestamp: '5 hours ago'
  },
  {
    id: '3',
    type: 'action',
    title: 'Accept Counterparty Invite',
    description: 'DesignStudio LLC invited you to a new Wholesale Purchase agreement.',
    priority: 'medium',
    timestamp: 'Yesterday'
  },
  {
    id: '4',
    type: 'onboarding',
    title: 'Complete KYB Verification',
    description: 'Upgrade to Tier 3 to unlock higher transaction limits and trusted badge.',
    priority: 'medium',
    timestamp: '2 days ago'
  },
  {
    id: '5',
    type: 'payment',
    title: 'Fund Escrow: Smart Contract Audit',
    description: 'The deal is ready. Deposit 5,000 USDC to begin the audit.',
    dealId: 'DEL-11A9Z',
    dealTitle: 'Smart Contract Audit',
    priority: 'low',
    timestamp: '3 days ago'
  }
];

export const Inbox = () => {
  const navigate = useNavigate();

  const handleItemClick = (item: WorkItem) => {
    if (item.dealId) {
      navigate(`/deals/${item.dealId}`);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-2 md:p-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-[#111827]">Work Queue</h1>
        <p className="text-sm text-[#6B7280]">
          Manage tasks requiring your immediate attention across the platform.
        </p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white pl-10 pr-4 text-sm outline-none transition-all focus:border-[#111827]"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-bold text-[#111827] hover:bg-[#FAFAFA]">
            <Filter className="h-4 w-4" /> Filter
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-bold text-[#111827] hover:bg-[#FAFAFA]">
            <SlidersHorizontal className="h-4 w-4" /> Sort
          </button>
        </div>
      </div>

      <WorkQueue items={mockWorkItems} onItemClick={handleItemClick} />
      
      <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#6B7280]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
        <span>System Status: Optimal. All events are being processed in real-time.</span>
      </div>
    </div>
  );
};
