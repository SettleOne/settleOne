import React from 'react';
import { BusinessProfileCard, ReputationMetrics } from '@settleone/design-system/components/reputation';

export const CounterpartyDirectory = () => {
  return (
    <div className="flex flex-col gap-6 p-2 md:p-6 max-w-4xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-[#111827]">Business Profile</h1>
        <p className="text-sm text-[#6B7280]">
          Counterparty trust and reputation metrics.
        </p>
      </div>

      <BusinessProfileCard 
        name="AlphaDev Solutions"
        role="AGENCY / SELLER"
        verified={true}
        location="San Francisco, CA"
        website="alphadev.io"
        industry="Software Development"
        description="We are a premium software development agency specializing in React, Node.js, and Web3 integrations. We have delivered over 40 successful projects through SettleOne."
      />

      <ReputationMetrics 
        completedDeals={42}
        totalVolume="145,500"
        successRate="98%"
        disputeRate="2.4%"
        avgSettlementTime="4.2 Days"
      />
    </div>
  );
};
