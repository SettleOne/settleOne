import React from 'react';
import { 
  VaultOverview, 
  YieldAttribution, 
  HistoricalYield, 
  StrategyAllocation, 
  SettlementForecasting 
} from '@settleone/design-system/components/vault';

export const VaultIntelligence = () => {
  return (
    <div className="flex flex-col gap-6 p-2 md:p-6 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-[#111827]">Vault Intelligence Center</h1>
        <p className="text-sm text-[#6B7280]">
          Monitor platform-wide escrow TVL, yield generation strategies, and projected settlements.
        </p>
      </div>

      <VaultOverview />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 flex flex-col gap-6">
          <HistoricalYield />
          <YieldAttribution />
        </div>
        <div className="flex flex-col gap-6">
          <StrategyAllocation />
          <SettlementForecasting />
        </div>
      </div>
    </div>
  );
};
