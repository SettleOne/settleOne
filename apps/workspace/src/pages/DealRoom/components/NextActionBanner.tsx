import React, { useState, useEffect } from "react";
import { Button } from "@settleone/design-system";
import {
  useAcceptDeal,
  useRejectDeal,
  useCancelDeal,
  useAcceptDelivery,
} from "@settleone/sdk";
import { useChainId, useSwitchChain, useAccount } from "wagmi";
import { useRequireWallet } from "../../../hooks/useRequireWallet";
import { FundDealModal } from "../modals/FundDealModal";
import { SubmitDeliveryModal } from "../modals/SubmitDeliveryModal";
import { DisputeModal } from "../modals/DisputeModal";
import { RequestRevisionModal } from "../modals/RequestRevisionModal";
import {
  Info,
  PlusCircle,
  CreditCard,
  Check,
  ShieldAlert,
  CheckCircle,
  Clock,
} from "lucide-react";
import { CHAIN_CONFIG } from "../../../lib/config";
import { formatUnits } from "viem";

interface NextActionBannerProps {
  currentState: string;
  userRole: "buyer" | "seller" | "verifier" | "resolver" | "none";
  deal: any;
}

export function NextActionBanner({
  currentState,
  userRole,
  deal,
}: NextActionBannerProps) {
  const isBuyer = userRole === "buyer";
  const isSeller = userRole === "seller";
  const isVerifier = userRole === "verifier";
  const isResolver = userRole === "resolver";
  const { address } = useAccount();

  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { requireWallet, WalletPromptModal } = useRequireWallet();

  const chainName = Object.keys(CHAIN_CONFIG).find(
    (key: any) =>
      CHAIN_CONFIG[key as keyof typeof CHAIN_CONFIG].chainId === deal?.chainId,
  );
  const chainConfig = chainName
    ? CHAIN_CONFIG[chainName as keyof typeof CHAIN_CONFIG]
    : null;
  const tokenEntry = chainConfig
    ? Object.entries(chainConfig.tokens).find(
        ([, addr]) =>
          (addr as string).toLowerCase() === deal?.tokenAddress?.toLowerCase(),
      )
    : null;
  const tokenSymbol = tokenEntry ? tokenEntry[0] : "USDC";
  const decimals =
    chainConfig?.decimals?.[tokenSymbol as keyof typeof chainConfig.decimals] ||
    6;

  const [isFundModalOpen, setFundModalOpen] = useState(false);
  const [isDeliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [isDisputeModalOpen, setDisputeModalOpen] = useState(false);
  const [isRevisionModalOpen, setRevisionModalOpen] = useState(false);

  const { acceptDeal, isPending: isAccepting } = useAcceptDeal(chainId);
  const { rejectDeal, isPending: isRejecting } = useRejectDeal(chainId);
  const { cancelDeal, isPending: isCanceling } = useCancelDeal(chainId);
  const { acceptDelivery, isPending: isAcceptingDelivery } =
    useAcceptDelivery(chainId);

  const getDealId = () => {
    return deal?.onChainId ? BigInt(deal.onChainId) : BigInt(deal?.id || 0);
  };

  const isWrongNetwork = chainId !== deal?.chainId;

  // Render button with network interceptor
  const ActionButton = ({
    onClick,
    variant = "primary",
    disabled = false,
    children,
    className = "",
  }: any) => {
    if (isWrongNetwork) {
      return (
        <Button
          variant="secondary"
          onClick={() =>
            requireWallet(() => switchChain({ chainId: deal.chainId }))
          }
          className={className}
        >
          Switch Network
        </Button>
      );
    }
    return (
      <Button
        variant={variant}
        onClick={() => requireWallet(onClick)}
        disabled={disabled}
        className={className}
      >
        {children}
      </Button>
    );
  };

  let title = "Next Action";
  let description = "No action required at this time.";
  let buttons: React.ReactNode = null;

  const isOpenDeal =
    !deal?.sellerAddress ||
    deal.sellerAddress === "0x0000000000000000000000000000000000000000";
  const deposited = deal?.depositedFunds
    ? BigInt(deal.depositedFunds.toString())
    : 0n;
  const totalAmount = deal?.amount ? BigInt(deal.amount.toString()) : 0n;
  const needsMoreFunding = deposited < totalAmount;

  if (currentState === "AwaitingFunding") {
    if (isBuyer) {
      title = "Funding Required";
      description = "Funds are required to continue this transaction.";
      buttons = (
        <div className="flex gap-3">
          <ActionButton
            variant="secondary"
            onClick={() => cancelDeal(getDealId())}
            disabled={isCanceling}
          >
            Cancel Deal
          </ActionButton>
          <ActionButton
            variant="primary"
            onClick={() => setFundModalOpen(true)}
          >
            <CreditCard size={16} className="mr-2" /> Fund Deal
          </ActionButton>
        </div>
      );
    } else {
      title = "Awaiting Deposit";
      description = "Waiting for the buyer to fund the deal.";
    }
  } else if (currentState === "PendingSellerAcceptance") {
    const canAccept = isSeller || (isOpenDeal && !isBuyer);

    if (canAccept) {
      title = "Acceptance Required";
      description =
        "Review the terms and accept the deal to proceed. (Warning: Deadline applies)";
      buttons = (
        <ActionButton
          variant="primary"
          onClick={() => acceptDeal(getDealId())}
          disabled={isAccepting}
        >
          <Check size={16} className="mr-2" /> Accept Deal
        </ActionButton>
      );
    } else if (isBuyer) {
      title = "Awaiting Seller";
      description = "Waiting for a seller to accept the deal.";
      buttons = (
        <ActionButton
          variant="secondary"
          onClick={() => cancelDeal(getDealId())}
          disabled={isCanceling}
        >
          Cancel Deal
        </ActionButton>
      );
    } else {
      title = "Private Deal";
      description = "This deal is reserved for a specific seller.";
    }
  } else if (currentState === "Active") {
    if (isSeller) {
      title = "Work in Progress";
      description =
        "Submit your delivery when the work is completed, or surrender the deal.";
      buttons = (
        <div className="flex gap-3">
          <ActionButton
            variant="danger"
            onClick={() =>
              rejectDeal(
                getDealId(),
                "0x0000000000000000000000000000000000000000000000000000000000000000",
              )
            }
            disabled={isRejecting}
          >
            Surrender Deal
          </ActionButton>
          <ActionButton
            variant="primary"
            onClick={() => setDeliveryModalOpen(true)}
          >
            <PlusCircle size={16} className="mr-2" /> Submit Delivery
          </ActionButton>
        </div>
      );
    } else {
      title = "Work in Progress";
      description = "The seller is currently working on the delivery.";
    }
  } else if (currentState === "DeliverySubmitted") {
    if (isVerifier) {
      title = "Verification Required";
      description =
        "The seller submitted a proof. Please review and verify it.";
      // Note: Ideally routes to Evidence Tab or opens a Verification Modal
      buttons = (
        <ActionButton
          variant="primary"
          onClick={() => {
            /* Open Verification Modal */
          }}
        >
          <CheckCircle size={16} className="mr-2" /> Verify Delivery
        </ActionButton>
      );
    } else {
      title = "Awaiting Verification";
      description =
        "The designated verifier is reviewing the submitted delivery.";
    }
  } else if (currentState === "AwaitingAcceptance") {
    if (isBuyer) {
      title = "Review Delivery";
      description = "The delivery has been verified. Please review and accept.";
      buttons = (
        <div className="flex gap-3">
          <ActionButton
            variant="danger"
            onClick={() => setDisputeModalOpen(true)}
          >
            Raise Dispute
          </ActionButton>
          <ActionButton
            variant="secondary"
            onClick={() => setRevisionModalOpen(true)}
          >
            Request Revision
          </ActionButton>
          {needsMoreFunding ? (
            <ActionButton
              variant="primary"
              onClick={() => setFundModalOpen(true)}
            >
              Fund Remaining{" "}
              {(((totalAmount - deposited) * 100n) / totalAmount).toString()}%
            </ActionButton>
          ) : (
            <ActionButton
              variant="primary"
              onClick={() => acceptDelivery(getDealId())}
              disabled={isAcceptingDelivery}
            >
              Accept Delivery
            </ActionButton>
          )}
        </div>
      );
    } else if (isSeller) {
      title = "Awaiting Review";
      description = "The buyer is currently reviewing your delivery.";
      buttons = (
        <ActionButton
          variant="danger"
          onClick={() => setDisputeModalOpen(true)}
        >
          Raise Dispute
        </ActionButton>
      );
    } else {
      title = "Awaiting Review";
      description = "The buyer is currently reviewing the delivery.";
    }
  } else if (currentState === "Accepted") {
    title = "Deal Accepted";
    description =
      "The deal is accepted. The dispute window is active before settlement.";

    if (isBuyer || isSeller) {
      buttons = (
        <div className="flex items-center gap-3">
          <div className="text-xs text-[var(--text-muted)] flex items-center gap-1 bg-[var(--bg-subtle)] px-2 py-1 rounded">
            <Clock size={12} /> Window Open
          </div>
          <ActionButton
            variant="danger"
            onClick={() => setDisputeModalOpen(true)}
          >
            Raise Dispute
          </ActionButton>
        </div>
      );
    }
  } else if (currentState === "Disputed") {
    if (isResolver) {
      title = "Arbitration Required";
      description =
        "A dispute has been raised. Please review the evidence and submit a verdict.";
      buttons = (
        <ActionButton
          variant="primary"
          onClick={() => {
            /* Route to Dispute Tab or open Modal */
          }}
        >
          <ShieldAlert size={16} className="mr-2" /> Submit Verdict
        </ActionButton>
      );
    } else {
      title = "In Dispute";
      description = "The Arbitrator is reviewing the case.";
    }
  } else if (
    ["Released", "Refunded", "Settled", "Cancelled"].includes(currentState)
  ) {
    title = "Deal Closed";
    description = "This transaction has reached its final state.";
  }

  return (
    <>
      <WalletPromptModal />
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 md:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-left w-full">
          <div className="w-10 h-10 bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] rounded-full flex items-center justify-center shrink-0">
            <Info size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-[var(--text-primary)]">
              {title}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {description}
            </p>
          </div>
        </div>
        {buttons && (
          <div className="flex-shrink-0 w-full md:w-auto flex justify-end">
            {buttons}
          </div>
        )}
      </div>

      <FundDealModal
        isOpen={isFundModalOpen}
        onClose={() => setFundModalOpen(false)}
        dealId={deal?.onChainId ? BigInt(deal.onChainId) : 0n}
        tokenAddress={
          deal?.tokenAddress || "0x0000000000000000000000000000000000000000"
        }
        tokenSymbol={tokenSymbol}
        decimals={decimals}
        requiredAmount={deal?.amount ? BigInt(deal.amount.toString()) : 0n}
      />
      <SubmitDeliveryModal
        dealId={deal?.id as string} onChainId={deal?.onChainId ? BigInt(deal.onChainId) : 0n}
        isOpen={isDeliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
      />
      <DisputeModal
        isOpen={isDisputeModalOpen}
        onClose={() => setDisputeModalOpen(false)}
        dealId={
          deal?.onChainId ? BigInt(deal.onChainId) : BigInt(deal?.id || 0)
        }
      />
      <RequestRevisionModal
        isOpen={isRevisionModalOpen}
        onClose={() => setRevisionModalOpen(false)}
        dealId={
          deal?.onChainId ? BigInt(deal.onChainId) : BigInt(deal?.id || 0)
        }
      />
    </>
  );
}
