import React, { useState } from "react";
import { useChainId, useAccount } from "wagmi";
import {
  DollarSign,
  ShieldCheck,
  ArrowRightLeft,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Button, Spinner, NetworkBadge } from "@settleone/design-system";
import { useERC20BalanceOf, getContractAddress } from "@settleone/sdk";
import { formatUnits } from "viem";

export function VaultPage() {
  const chainId = useChainId();
  const { address } = useAccount();
  const [isClaiming, setIsClaiming] = useState(false);

  const vaultAddress = getContractAddress(chainId, "EscrowVault");

  // Example Token: SettleOneToken (SOT)
  const tokenAddress = getContractAddress(chainId, "SettleOneToken");
  const { data: vaultBalance, isLoading: isBalanceLoading } = useERC20BalanceOf(
    tokenAddress,
    vaultAddress,
  );

  const handleClaimFees = async () => {
    setIsClaiming(true);
    // In a real implementation, this would call vault.claimProtocolFees()
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsClaiming(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Escrow Vault Manager
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage underlying yield strategies and protocol revenue.
          </p>
        </div>
        <div className="flex gap-3">
          <NetworkBadge chainId={chainId} />
          <Button variant="primary">Add New Strategy</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Vault Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[var(--border)] flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                  SOT
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    SettleOne Core Vault
                  </h3>
                  <p className="text-xs text-gray-500">
                    Managing {tokenAddress.slice(0, 8)}...
                  </p>
                </div>
              </div>
              <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                AAVE V3 STRATEGY
              </span>
            </div>

            <div className="p-6 bg-gray-50/50">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                <div>
                  <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">
                    Total Locked
                  </p>
                  <p className="text-xl font-bold text-gray-900">
                    {isBalanceLoading ? (
                      <Spinner size="sm" />
                    ) : (
                      `${formatUnits(vaultBalance || 0n, 18)} SOT`
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">
                    Current APY
                  </p>
                  <p className="text-xl font-bold text-green-600 flex items-center gap-1">
                    4.25% <TrendingUp size={14} />
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">
                    Buffer
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    5.0% (Available)
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1 uppercase font-semibold">
                    Utilized
                  </p>
                  <p className="text-sm font-medium text-blue-600">
                    95.0% (In Aave)
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="secondary"
                  className="flex-1 flex justify-center gap-2 border-gray-200"
                >
                  <ArrowRightLeft size={16} /> Rebalance Strategy
                </Button>
                <Button
                  variant="primary"
                  onClick={handleClaimFees}
                  disabled={isClaiming}
                  className="flex-1 flex justify-center gap-2 bg-green-600 hover:bg-green-700 border-none shadow-sm"
                >
                  {isClaiming ? (
                    <Spinner size="sm" />
                  ) : (
                    <>
                      <ShieldCheck size={16} /> Claim Protocol Fees
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">
              Historical Performance
            </h3>
            <div className="h-[240px] flex items-center justify-center text-gray-300 border-2 border-dashed border-gray-100 rounded-lg">
              [ Yield Accumulation Chart ]
            </div>
          </div>
        </div>

        {/* Sidebar: Health & Alerts */}
        <div className="space-y-6">
          <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-5">
            <h3 className="font-bold text-sm text-gray-900 mb-4">
              Vault Health
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">Liquidity Coverage</span>
                  <span className="font-bold text-green-600">Healthy</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-green-500 h-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-gray-500">Oracle Latency</span>
                  <span className="font-bold text-gray-900">12s</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 shrink-0" size={18} />
              <div className="text-xs text-amber-800">
                <p className="font-bold mb-1 uppercase tracking-wider">
                  Maintenance Required
                </p>
                <p className="leading-relaxed">
                  The USDC vault buffer has dropped below 3%. A rebalance is
                  recommended to ensure enough liquidity for immediate seller
                  releases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
