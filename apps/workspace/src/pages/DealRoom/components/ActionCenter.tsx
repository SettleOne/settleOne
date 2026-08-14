import React, { useState } from "react";
import { useChainId } from "wagmi";
import {
  useAcceptDeal,
  useRejectDeal,
  useCancelDeal,
  useAcceptDelivery,
  useRequestRevision,
} from "@settleone/sdk";
import { useRequireWallet } from "../../../hooks/useRequireWallet";
// Use plain strings matching Prisma backend state field
import {
  AlertCircle,
  Wallet,
  PlayCircle,
  FileText,
  CheckCircle,
  Search,
  XCircle,
  Scale,
  RefreshCw,
  Send,
  Lock,
  Ban,
} from "lucide-react";
import { Button } from "@settleone/design-system";
import { FundDealModal } from "../modals/FundDealModal";
import { SubmitDeliveryModal } from "../modals/SubmitDeliveryModal";
import { DisputeModal } from "../modals/DisputeModal";
import { RequestRevisionModal } from "../modals/RequestRevisionModal";

interface ActionCenterProps {
  currentState: string; // string from backend e.g. "AwaitingFunding"
  userRole: "buyer" | "seller" | "none";
  deal?: any;
}

export function ActionCenter({
  currentState,
  userRole,
  deal,
}: ActionCenterProps) {
  const chainId = useChainId();
  const { acceptDeal, isPending: isAccepting } = useAcceptDeal(chainId);
  const { rejectDeal, isPending: isRejecting } = useRejectDeal(chainId);
  const { cancelDeal, isPending: isCanceling } = useCancelDeal(chainId);
  const { acceptDelivery, isPending: isAcceptingDelivery } =
    useAcceptDelivery(chainId);
  const { requestRevision, isPending: isRequestingRevision } =
    useRequestRevision(chainId);

  const { requireWallet, WalletPromptModal } = useRequireWallet();

  const getDealId = () => BigInt(deal?.onChainId || deal?.id || 0);

  const [isFundModalOpen, setFundModalOpen] = useState(false);
  const [isDeliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [isDisputeModalOpen, setDisputeModalOpen] = useState(false);
  const [isRevisionModalOpen, setRevisionModalOpen] = useState(false);

  // Helper to check if viewer is a party
  const isBuyer = userRole === "buyer";
  const isSeller = userRole === "seller";

  const renderAwaitingFunding = () => {
    if (isBuyer) {
      return (
        <div className="bg-[var(--state-awaiting-funding)]/10 border border-[var(--state-awaiting-funding)]/30 rounded-lg p-6 text-center shadow-sm">
          <div className="w-12 h-12 bg-[var(--state-awaiting-funding)]/20 text-[var(--state-awaiting-funding)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Wallet size={24} />
          </div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
            Funding Required
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6">
            Lock funds in the EscrowVault to activate this deal and invite the
            seller to accept.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="secondary"
              onClick={() => requireWallet(() => cancelDeal(getDealId()))}
              disabled={isCanceling}
            >
              Cancel Deal
            </Button>
            <Button variant="primary" onClick={() => setFundModalOpen(true)}>
              Fund Deal
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-lg p-6 text-center shadow-sm">
        <div className="w-12 h-12 bg-[var(--bg-hover)] text-[var(--text-muted)] rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet size={24} />
        </div>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
          Awaiting Buyer Funding
        </h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          The buyer has created this deal but has not yet deposited the required
          funds.
        </p>
      </div>
    );
  };

  const renderPendingSellerAcceptance = () => {
    if (isSeller) {
      return (
        <div className="bg-[var(--state-pending-acceptance)]/10 border border-[var(--state-pending-acceptance)]/30 rounded-lg p-6 text-center shadow-sm">
          <div className="w-12 h-12 bg-[var(--state-pending-acceptance)]/20 text-[var(--state-pending-acceptance)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <PlayCircle size={24} />
          </div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
            Invitation Received
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6">
            Review the deal terms carefully. By accepting, you commit to the
            delivery deadline.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="danger"
              className="bg-transparent border-[var(--accent-red)] text-[var(--accent-red)] hover:bg-[var(--accent-red)]/10"
              onClick={() => requireWallet(() => rejectDeal(getDealId()))}
              disabled={isRejecting}
            >
              Reject Deal
            </Button>
            <Button
              variant="primary"
              className="bg-[var(--accent-green)] hover:brightness-110 border-none text-[var(--bg-base)] font-bold shadow-[var(--shadow-glow)]"
              onClick={() => requireWallet(() => acceptDeal(getDealId()))}
              disabled={isAccepting}
            >
              Accept Deal
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-[var(--state-pending-acceptance)]/5 border border-[var(--state-pending-acceptance)]/20 rounded-lg p-6 text-center shadow-sm">
        <div className="w-12 h-12 bg-[var(--state-pending-acceptance)]/20 text-[var(--state-pending-acceptance)] rounded-full flex items-center justify-center mx-auto mb-4">
          <Search size={24} />
        </div>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
          Waiting for Seller
        </h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          The seller has been invited and needs to accept or reject the deal
          terms.
        </p>
      </div>
    );
  };

  const renderActive = () => {
    if (isSeller) {
      return (
        <div className="bg-[var(--state-active)]/10 border border-[var(--state-active)]/30 rounded-lg p-6 text-center shadow-sm">
          <div className="w-12 h-12 bg-[var(--state-active)]/20 text-[var(--state-active)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <PlayCircle size={24} />
          </div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
            Deal Active
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6">
            Proceed with the work and submit your delivery proof before the
            deadline.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="primary"
              onClick={() => setDeliveryModalOpen(true)}
              className="bg-[var(--accent-purple)] hover:brightness-110 border-none text-[var(--text-primary)] font-bold shadow-[var(--shadow-glow)]"
            >
              Submit Delivery
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-[var(--state-active)]/5 border border-[var(--state-active)]/20 rounded-lg p-6 text-center shadow-sm">
        <div className="w-12 h-12 bg-[var(--state-active)]/20 text-[var(--state-active)] rounded-full flex items-center justify-center mx-auto mb-4">
          <Search size={24} />
        </div>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
          Work in Progress
        </h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          The seller is currently working on the deliverables.
        </p>
      </div>
    );
  };

  const renderDeliverySubmitted = () => {
    return (
      <div className="bg-[var(--state-delivery-submitted)]/10 border border-[var(--state-delivery-submitted)]/30 rounded-lg p-6 text-center shadow-sm">
        <div className="w-12 h-12 bg-[var(--state-delivery-submitted)]/20 text-[var(--state-delivery-submitted)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
          <RefreshCw className="animate-spin-slow" size={24} />
        </div>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
          Verifying Delivery
        </h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          The verifier is reviewing the submitted delivery.
        </p>
      </div>
    );
  };

  const renderAwaitingAcceptance = () => {
    if (isBuyer) {
      return (
        <div className="bg-[var(--state-awaiting-acceptance)]/10 border border-[var(--state-awaiting-acceptance)]/30 rounded-lg p-6 text-center shadow-sm">
          <div className="w-12 h-12 bg-[var(--state-awaiting-acceptance)]/20 text-[var(--state-awaiting-acceptance)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
            <FileText size={24} />
          </div>
          <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
            Review Delivery
          </h2>
          <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6">
            The delivery has been verified. Please review and accept, or raise a
            dispute if there are issues.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="danger"
              onClick={() => setDisputeModalOpen(true)}
              className="border-[var(--accent-red)] text-[var(--text-primary)] hover:bg-[var(--accent-red)]/10 bg-transparent"
            >
              Raise Dispute
            </Button>
            <Button
              variant="secondary"
              onClick={() => setRevisionModalOpen(true)}
              className="border-[var(--border-light)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)] bg-transparent"
            >
              Request Revision
            </Button>
            <Button
              variant="primary"
              onClick={() => requireWallet(() => acceptDelivery(getDealId()))}
              disabled={isAcceptingDelivery}
              className="bg-[var(--accent-green)] hover:brightness-110 border-none text-[var(--bg-base)] font-bold shadow-[var(--shadow-glow)]"
            >
              Accept Delivery
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-[var(--state-awaiting-acceptance)]/5 border border-[var(--state-awaiting-acceptance)]/20 rounded-lg p-6 text-center shadow-sm">
        <div className="w-12 h-12 bg-[var(--state-awaiting-acceptance)]/20 text-[var(--state-awaiting-acceptance)] rounded-full flex items-center justify-center mx-auto mb-4">
          <Search size={24} />
        </div>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
          Awaiting Buyer Review
        </h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          The buyer is currently reviewing your delivery.
        </p>
      </div>
    );
  };

  const renderDisputed = () => {
    return (
      <div className="bg-[var(--state-disputed)]/10 border border-[var(--state-disputed)]/30 rounded-lg p-6 text-center shadow-sm">
        <div className="w-12 h-12 bg-[var(--state-disputed)]/20 text-[var(--state-disputed)] rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Scale size={24} />
        </div>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
          Deal in Dispute
        </h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          An arbitrator is currently reviewing the evidence provided by both
          parties.
        </p>
      </div>
    );
  };

  const renderTerminal = (state: string) => {
    let title = "Deal Closed";
    let icon = <CheckCircle size={24} />;
    let colorClass =
      "bg-[var(--bg-subtle)] border-[var(--border)] text-[var(--text-muted)]";
    let textColor = "text-[var(--text-primary)]";

    if (state === "Released") {
      title = "Funds Released";
      colorClass =
        "bg-[var(--state-released)]/10 border-[var(--state-released)]/30 text-[var(--state-released)]";
    } else if (state === "Refunded") {
      title = "Deal Refunded";
      colorClass =
        "bg-[var(--state-refunded)]/10 border-[var(--state-refunded)]/30 text-[var(--state-refunded)]";
    } else if (state === "Settled") {
      title = "Deal Settled";
      colorClass =
        "bg-[var(--state-settled)]/10 border-[var(--state-settled)]/30 text-[var(--state-settled)]";
    } else if (state === "Cancelled") {
      title = "Deal Cancelled";
      icon = <Ban size={24} />;
      colorClass =
        "bg-[var(--state-cancelled)]/10 border-[var(--border-light)] text-[var(--state-cancelled)]";
    }

    const dotColor = colorClass.split(" ")[2] || "text-[var(--text-muted)]";

    return (
      <div
        className={`${colorClass.split(" ")[0]} ${colorClass.split(" ")[1]} border rounded-lg p-6 text-center shadow-sm`}
      >
        <div
          className={`w-12 h-12 bg-[var(--bg-card)] ${dotColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-glow`}
        >
          {icon}
        </div>
        <h2 className={`text-lg font-bold ${textColor} mb-2`}>{title}</h2>
        <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
          This deal has reached its final state and is now closed.
        </p>
      </div>
    );
  };

  return (
    <>
      <WalletPromptModal />
      <div className="mb-6">
        {currentState === "AwaitingFunding" && renderAwaitingFunding()}
        {currentState === "PendingSellerAcceptance" &&
          renderPendingSellerAcceptance()}
        {currentState === "Active" && renderActive()}
        {currentState === "DeliverySubmitted" && renderDeliverySubmitted()}
        {currentState === "AwaitingAcceptance" && renderAwaitingAcceptance()}
        {currentState === "Disputed" && renderDisputed()}
        {["Released", "Refunded", "Settled", "Cancelled"].includes(
          currentState,
        ) && renderTerminal(currentState as any)}
        {currentState === "None" && (
          <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-lg p-6 text-center shadow-sm">
            <AlertCircle
              size={24}
              className="text-[var(--text-muted)] mx-auto mb-4"
            />
            <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">
              Draft State
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto">
              This deal is currently in draft mode.
            </p>
          </div>
        )}

        {/* Modals */}
        <FundDealModal
          isOpen={isFundModalOpen}
          onClose={() => setFundModalOpen(false)}
          dealId={deal?.onChainId ? BigInt(deal.onChainId) : 0n}
          tokenAddress={(deal?.token as any) || "0x"}
          tokenSymbol={(deal?.token as any) || "USDC"}
          decimals={6}
          requiredAmount={deal?.amount ? BigInt(deal.amount as any) : 0n}
        />
        <SubmitDeliveryModal
          dealId={deal?.id as unknown as bigint}
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
      </div>
    </>
  );
}
