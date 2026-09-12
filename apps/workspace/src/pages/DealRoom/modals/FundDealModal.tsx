import React, { useState, useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import { Modal, Button, Spinner } from "@settleone/design-system";
import {
  Wallet,
  AlertCircle,
  CheckCircle,
  ExternalLink,
  Copy,
} from "lucide-react";
import {
  useFundDeal,
  useERC20Approve,
  useERC20Allowance,
  useERC20BalanceOf,
  getContractAddress,
} from "@settleone/sdk";
import { useRequireWallet } from "../../../hooks/useRequireWallet";
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
  const [copied, setCopied] = useState(false);

  const amount = formatUnits(requiredAmount, decimals);

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
        fundDeal(dealId, parsedAmount);
      }
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(tokenAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isProcessing =
    isFundPending ||
    isFundConfirming ||
    isApprovePending ||
    isApproveConfirming;

  return (
    <>
      <WalletPromptModal />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Fund Escrow Vault"
        size="md"
      >
        {isFundSuccess ? (
          <div className="text-center py-10 flex flex-col items-center">
            <div className="w-20 h-20 bg-[var(--accent-green)]/10 text-[var(--accent-green)] rounded-full flex items-center justify-center mb-6 border-2 border-[var(--accent-green)]/30 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              Deal Funded Successfully!
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-[280px]">
              Your funds have been securely locked in the smart contract. The
              deal is now active.
            </p>
            <Button
              variant="primary"
              className="w-full h-12 text-base font-semibold"
              onClick={onClose}
            >
              Return to Deal Room
            </Button>
          </div>
        ) : (
          <div className="space-y-6 flex flex-col">
            {/* Header Banner */}
            <div className="bg-[var(--accent-blue)]/10 p-4 rounded-xl border border-[var(--accent-blue)]/30 flex gap-4 items-start shadow-sm">
              <div className="bg-[var(--accent-blue)]/20 p-2 rounded-lg shrink-0">
                <Wallet className="text-[var(--accent-blue)]" size={24} />
              </div>
              <div>
                <p className="font-bold text-[var(--text-primary)] text-base mb-1">
                  Deposit Required
                </p>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  You need to deposit{" "}
                  <span className="font-bold text-[var(--text-primary)]">
                    {amount} {tokenSymbol}
                  </span>{" "}
                  to activate this deal. Funds will be held securely in the
                  Escrow Vault and begin earning yield.
                </p>
              </div>
            </div>

            {/* Token & Amount Cards */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    Asset
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[var(--text-primary)] text-lg">
                      {tokenSymbol}
                    </span>
                    <span className="px-2 py-0.5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded text-xs font-mono text-[var(--text-secondary)] flex items-center gap-1.5">
                      {tokenAddress.slice(0, 6)}...{tokenAddress.slice(-4)}
                      <button
                        onClick={handleCopy}
                        className="hover:text-[var(--text-primary)] transition-colors ml-1"
                      >
                        {copied ? (
                          <CheckCircle
                            size={12}
                            className="text-[var(--accent-green)]"
                          />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                      <a
                        href={`https://etherscan.io/address/${tokenAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[var(--text-primary)] transition-colors"
                      >
                        <ExternalLink size={12} />
                      </a>
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:items-end">
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">
                    Amount
                  </span>
                  <span className="font-bold text-2xl text-[var(--text-primary)] tracking-tight">
                    {amount}
                  </span>
                </div>
              </div>
            </div>

            {/* Wallet Balances */}
            <div className="bg-[var(--bg-subtle)] p-5 rounded-xl border border-[var(--border)] space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--text-secondary)] font-medium">
                  Wallet Balance
                </span>
                <span
                  className={`font-bold ${!hasEnoughBalance ? "text-[var(--accent-red)]" : "text-[var(--text-primary)]"}`}
                >
                  {balance ? formatUnits(balance, decimals) : "0.00"}{" "}
                  {tokenSymbol}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--text-secondary)] font-medium">
                  Vault Allowance
                </span>
                <span className="font-bold text-[var(--text-primary)]">
                  {allowance ? formatUnits(allowance, decimals) : "0.00"}{" "}
                  {tokenSymbol}
                </span>
              </div>
            </div>

            {/* Warnings */}
            {!hasEnoughBalance ? (
              <div className="flex items-start gap-3 text-sm text-[var(--accent-red)] bg-[var(--accent-red)]/10 p-4 rounded-xl border border-[var(--accent-red)]/30">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p className="font-medium">
                  Insufficient balance. You need at least {amount} {tokenSymbol}{" "}
                  in your connected wallet.
                </p>
              </div>
            ) : !hasEnoughAllowance ? (
              <div className="flex items-start gap-3 text-sm text-[var(--accent-amber)] bg-[var(--accent-amber)]/10 p-4 rounded-xl border border-[var(--accent-amber)]/30">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p className="font-medium">
                  First step: You must approve the Escrow smart contract to
                  spend {amount} {tokenSymbol} from your wallet.
                </p>
              </div>
            ) : null}

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-[var(--border)]">
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={isProcessing}
                className="w-full sm:w-auto h-11"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleAction}
                disabled={isProcessing || !hasEnoughBalance}
                className="w-full sm:min-w-[180px] h-11 font-bold text-base shadow-[var(--shadow-glow)]"
              >
                {isApprovePending || isApproveConfirming ? (
                  <span className="flex items-center gap-2">
                    <Spinner size={18} /> Approving...
                  </span>
                ) : isFundPending || isFundConfirming ? (
                  <span className="flex items-center gap-2">
                    <Spinner size={18} /> Funding...
                  </span>
                ) : !hasEnoughAllowance ? (
                  "Approve Token"
                ) : (
                  "Deposit Funds"
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
