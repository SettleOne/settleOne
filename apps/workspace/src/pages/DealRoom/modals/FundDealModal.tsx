import React, { useState, useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import {
  Modal,
  Button,
  Input,
  Select,
  Spinner,
} from "@settleone/design-system";
import { Wallet, AlertCircle, CheckCircle } from "lucide-react";
import { useFundDeal } from "@settleone/sdk";
import { useRequireWallet } from "../../../hooks/useRequireWallet";
import {
  useERC20Approve,
  useERC20Allowance,
  useERC20BalanceOf,
} from "@settleone/sdk";
import { getContractAddress } from "@settleone/sdk";
import { formatUnits, parseUnits } from "viem";

interface FundDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealId: bigint;
  requiredAmount: bigint;
  tokenAddress: `0x${string}`;
  tokenSymbol: string;
  decimals: number;
}

export function FundDealModal({
  isOpen,
  onClose,
  dealId,
  requiredAmount,
  tokenAddress,
  tokenSymbol,
  decimals,
}: FundDealModalProps) {
  const { address } = useAccount();
  const chainId = useChainId();
  const vaultAddress = getContractAddress(chainId, "EscrowVault");
  const { requireWallet, WalletPromptModal } = useRequireWallet();

  const [amount, setAmount] = useState(formatUnits(requiredAmount, decimals));

  const {
    fundDeal,
    isPending: isFundPending,
    isConfirming: isFundConfirming,
    isSuccess: isFundSuccess,
  } = useFundDeal(chainId);
  const {
    approve,
    isPending: isApprovePending,
    isConfirming: isApproveConfirming,
    isSuccess: isApproveSuccess,
  } = useERC20Approve(tokenAddress);
  const { data: allowance, refetch: refetchAllowance } = useERC20Allowance(
    tokenAddress,
    address,
    vaultAddress,
  );
  const { data: balance } = useERC20BalanceOf(tokenAddress, address);

  const parsedAmount = parseUnits(amount, decimals);
  const hasEnoughAllowance = allowance ? allowance >= parsedAmount : false;
  const hasEnoughBalance = balance ? balance >= parsedAmount : false;

  useEffect(() => {
    if (isApproveSuccess) {
      refetchAllowance();
    }
  }, [isApproveSuccess, refetchAllowance]);

  const handleAction = () => {
    requireWallet(() => {
      if (!hasEnoughAllowance) {
        approve(vaultAddress, parsedAmount);
      } else {
        fundDeal(dealId);
      }
    });
  };

  const isProcessing =
    isFundPending ||
    isFundConfirming ||
    isApprovePending ||
    isApproveConfirming;

  return (
    <>
      <WalletPromptModal />
      <Modal isOpen={isOpen} onClose={onClose} title="Fund Deal" size="md">
        {isFundSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Deal Funded!
            </h2>
            <p className="text-gray-500 mb-6">
              Your deposit was successful. The deal is now awaiting seller
              acceptance.
            </p>
            <Button variant="primary" className="w-full" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex gap-3">
              <Wallet className="text-blue-600 shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Deposit Required</p>
                <p>
                  You need to deposit {formatUnits(requiredAmount, decimals)}{" "}
                  {tokenSymbol} to activate this deal. Funds will be held
                  securely in the Escrow Vault and begin earning yield.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Token
                </label>
                <div className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-medium text-gray-900">
                  {tokenSymbol} ({tokenAddress.slice(0, 6)}...
                  {tokenAddress.slice(-4)})
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount to Fund
                </label>
                <div className="relative">
                  <Input
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    type="text"
                    disabled={true} // In this context, requiredAmount is usually fixed by the deal
                    className="pr-16"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    {tokenSymbol}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-600">Your Balance</span>
                <span
                  className={`font-medium ${!hasEnoughBalance ? "text-red-600" : ""}`}
                >
                  {balance ? formatUnits(balance, decimals) : "0.00"}{" "}
                  {tokenSymbol}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Current Allowance</span>
                <span className="font-medium">
                  {allowance ? formatUnits(allowance, decimals) : "0.00"}{" "}
                  {tokenSymbol}
                </span>
              </div>
            </div>

            {!hasEnoughBalance && (
              <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                <p>
                  Insufficient balance. You need at least{" "}
                  {formatUnits(requiredAmount, decimals)} {tokenSymbol} to fund
                  this deal.
                </p>
              </div>
            )}

            <div className="flex items-start gap-2 text-xs text-gray-500">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <p>
                {!hasEnoughAllowance
                  ? `First, you must approve the Escrow Vault to transfer ${tokenSymbol} from your wallet.`
                  : `By proceeding, you will transfer ${amount} ${tokenSymbol} to the Escrow Vault.`}
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="ghost" onClick={onClose} disabled={isProcessing}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleAction}
                disabled={isProcessing || !hasEnoughBalance}
                className="min-w-[140px]"
              >
                {isApprovePending || isApproveConfirming ? (
                  <span className="flex items-center gap-2">
                    <Spinner size={16} /> Approving...
                  </span>
                ) : isFundPending || isFundConfirming ? (
                  <span className="flex items-center gap-2">
                    <Spinner size={16} /> Funding...
                  </span>
                ) : !hasEnoughAllowance ? (
                  "Approve Token"
                ) : (
                  "Fund Deal"
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
