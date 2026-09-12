import React, { useState } from "react";
import { Button } from "@settleone/design-system";
import { useAcceptDeal, useRejectDeal, useCancelDeal, useAcceptDelivery } from "@settleone/sdk";
import { useChainId } from "wagmi";
import { useRequireWallet } from "../../../hooks/useRequireWallet";
import { FundDealModal } from "../modals/FundDealModal";
import { SubmitDeliveryModal } from "../modals/SubmitDeliveryModal";
import { DisputeModal } from "../modals/DisputeModal";
import { RequestRevisionModal } from "../modals/RequestRevisionModal";
import { Info, PlusCircle, CreditCard, Check } from "lucide-react";
import { CHAIN_CONFIG } from "../../../lib/config";

interface NextActionBannerProps {
  currentState: string;
  userRole: "buyer" | "seller" | "verifier" | "resolver" | "none";
  deal: any;
}

export function NextActionBanner({ currentState, userRole, deal }: NextActionBannerProps) {
  const isBuyer = userRole === "buyer";
  const isSeller = userRole === "seller";
  
  const chainId = useChainId();
  const { requireWallet, WalletPromptModal } = useRequireWallet();
  
  const chainName = Object.keys(CHAIN_CONFIG).find((key: any) => CHAIN_CONFIG[key as keyof typeof CHAIN_CONFIG].chainId === deal?.chainId);
  const chainConfig = chainName ? CHAIN_CONFIG[chainName as keyof typeof CHAIN_CONFIG] : null;
  const tokenEntry = chainConfig ? Object.entries(chainConfig.tokens).find(([, addr]) => (addr  as string).toLowerCase() === deal?.tokenAddress?.toLowerCase()) : null;
  const tokenSymbol = tokenEntry ? tokenEntry[0] : "USDC";
  const decimals = chainConfig?.decimals?.[tokenSymbol as keyof typeof chainConfig.decimals] || 6;

  const [isFundModalOpen, setFundModalOpen] = useState(false);
  const [isDeliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [isDisputeModalOpen, setDisputeModalOpen] = useState(false);
  const [isRevisionModalOpen, setRevisionModalOpen] = useState(false);

  const { acceptDeal, isPending: isAccepting } = useAcceptDeal(chainId);
  const { rejectDeal, isPending: isRejecting } = useRejectDeal(chainId);
  const { cancelDeal, isPending: isCanceling } = useCancelDeal(chainId);
  const { acceptDelivery, isPending: isAcceptingDelivery } = useAcceptDelivery(chainId);

  const getDealId = () => {
    return deal?.onChainId ? BigInt(deal.onChainId) : BigInt(deal?.id || 0);
  };


  let title = "Next Action";
  let description = "No action required at this time.";
  let buttons: React.ReactNode = null;

  if (currentState === "AwaitingFunding") {
    title = "Funding Required";
    description = "Funds are required to continue this transaction.";
    buttons = (
      <div className="flex gap-3">
        <Button variant="secondary" onClick={() => requireWallet(() => cancelDeal(getDealId()))} disabled={isCanceling}>
          Cancel Deal
        </Button>
        <Button variant="primary" onClick={() => requireWallet(() => setFundModalOpen(true))}>
          <CreditCard size={16} className="mr-2" /> Fund Deal
        </Button>
      </div>
    );
  } else if (currentState === "PendingSellerAcceptance") {
    if (isSeller) {
      title = "Acceptance Required";
      description = "Review the terms and accept the deal to proceed.";
      buttons = (
        <div className="flex gap-3">
          <Button variant="danger" onClick={() => requireWallet(() => rejectDeal(getDealId(), "0x0000000000000000000000000000000000000000000000000000000000000000"))} disabled={isRejecting}>
            Reject
          </Button>
          <Button variant="primary" onClick={() => requireWallet(() => acceptDeal(getDealId()))} disabled={isAccepting}>
            <Check size={16} className="mr-2" /> Accept Deal
          </Button>
        </div>
      );
    } else {
      title = "Awaiting Seller";
      description = "Waiting for the seller to accept the deal.";
    }
  } else if (currentState === "Active") {
    if (isSeller) {
      title = "Work in Progress";
      description = "Submit your delivery when the work is completed.";
      buttons = (
        <Button variant="primary" onClick={() => requireWallet(() => setDeliveryModalOpen(true))}>
          <PlusCircle size={16} className="mr-2" /> Submit Delivery
        </Button>
      );
    } else {
      title = "Work in Progress";
      description = "The seller is currently working on the delivery.";
    }
  } else if (currentState === "AwaitingAcceptance") {
    if (isBuyer) {
      title = "Review Delivery";
      description = "The delivery has been verified. Please review and accept.";
      buttons = (
        <div className="flex gap-3">
          <Button variant="danger" onClick={() => setDisputeModalOpen(true)}>Raise Dispute</Button>
          <Button variant="secondary" onClick={() => setRevisionModalOpen(true)}>Request Revision</Button>
          <Button variant="primary" onClick={() => requireWallet(() => acceptDelivery(getDealId()))} disabled={isAcceptingDelivery}>
            Accept Delivery
          </Button>
        </div>
      );
    } else {
      title = "Awaiting Review";
      description = "The buyer is currently reviewing your delivery.";
    }
  } else if (["Released", "Refunded", "Settled", "Cancelled"].includes(currentState)) {
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
            <h2 className="text-base font-bold text-[var(--text-primary)]">{title}</h2>
            <p className="text-sm text-[var(--text-secondary)]">{description}</p>
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
            tokenAddress={deal?.tokenAddress || "0x0000000000000000000000000000000000000000"}
            tokenSymbol={tokenSymbol}
            decimals={decimals}
            requiredAmount={deal?.amount ? BigInt(deal.amount.toString()) : 0n}
          />
      <SubmitDeliveryModal dealId={deal?.id as unknown as bigint} isOpen={isDeliveryModalOpen} onClose={() => setDeliveryModalOpen(false)} />
      <DisputeModal isOpen={isDisputeModalOpen} onClose={() => setDisputeModalOpen(false)} dealId={deal?.onChainId ? BigInt(deal.onChainId) : BigInt(deal?.id || 0)} />
      <RequestRevisionModal isOpen={isRevisionModalOpen} onClose={() => setRevisionModalOpen(false)} dealId={deal?.onChainId ? BigInt(deal.onChainId) : BigInt(deal?.id || 0)} />
    </>
  );
}
