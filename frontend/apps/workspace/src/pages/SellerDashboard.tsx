import React from 'react';
import { WorkQueue, WorkItem, ReputationMetrics, BusinessProfileCard } from '@settleone/design-system';
import { Briefcase, Zap, Star, Target, ArrowRight } from 'lucide-react';

const sellerWorkItems: WorkItem[] = [
  {
    id: '1',
    type: 'action',
    title: 'New Deal Opportunity: UI Implementation',
    description: 'TechFlow Inc. invited you to negotiate on a $2,500 project.',
    priority: 'high',
    timestamp: '1 hour ago'
  },
  {
    id: '2',
    type: 'review',
    title: 'Revision Requested: Logo Pack',
    description: 'Buyer requested a revision on V1 of the deliverables.',
    dealId: 'DEL-9B12C',
    dealTitle: 'Logo Design Pack',
    deadline: '1D 4H',
    priority: 'medium',
    timestamp: '4 hours ago'
  }
];

export const SellerDashboard = () => {
  return (
    <div className="flex flex-col gap-8 p-2 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight text-[#111827]">Seller Workspace</h1>
        <p className="text-base text-[#6B7280]">
          Manage your active commitments and discover new business opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Work & Stats (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <WorkQueue items={sellerWorkItems} onItemClick={(item) => console.log(item)} />
          
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-[#6B7280]" />
                Active Engagements
              </h3>
              <button className="text-xs font-bold text-[#3B82F6] hover:underline uppercase tracking-widest">
                View All Deals
              </button>
            </div>
            
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-[#F3F4F6] hover:border-[#111827] transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-[#FAFAFA] flex items-center justify-center text-[#111827] font-bold">
                      {i === 1 ? 'TF' : 'DL'}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#111827]">
                        {i === 1 ? 'React Implementation' : 'Smart Contract Audit'}
                      </span>
                      <span className="text-[10px] text-[#6B7280] uppercase tracking-widest font-medium">
                        {i === 1 ? 'TechFlow Inc' : 'DeFi Labs'} • $2,500
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-2 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] text-[10px] font-bold uppercase border border-[#10B981]/20">
                      Active
                    </span>
                    <ArrowRight className="h-4 w-4 text-[#E5E7EB] group-hover:text-[#111827] transition-colors" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Seller Profile & Reputation (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <BusinessProfileCard 
            name="AlphaDev Solutions"
            role="SELLER"
            verified={true}
            location="San Francisco, CA"
            website="alphadev.io"
            industry="Software"
            description="Premium engineering agency specializing in high-trust B2B transactions."
          />

          <ReputationMetrics 
            completedDeals={42}
            totalVolume="145,500"
            successRate="98%"
            disputeRate="2.4%"
            avgSettlementTime="4.2 Days"
          />

          <div className="rounded-2xl bg-[#111827] p-6 text-white shadow-xl relative overflow-hidden">
            <Zap className="absolute -right-4 -bottom-4 h-32 w-32 text-white/5" />
            <h3 className="text-sm font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <Star className="h-4 w-4 text-[#F59E0B] fill-[#F59E0B]" />
              Trust Score: 940
            </h3>
            <p className="text-xs text-white/60 mb-4">You are in the top 5% of sellers on SettleOne. This unlocks priority deal discovery.</p>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-[#10B981] w-[94%]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
