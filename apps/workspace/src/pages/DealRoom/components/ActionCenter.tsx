import React, { useState } from "react";
import { DealState } from "@settleone/types";
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

interface ActionCenterProps {
  currentState: DealState;
  userRole: "buyer" | "seller" | "none";
  deal?: any; // To be typed properly later
}

export function ActionCenter({
  currentState,
  userRole,
  deal,
}: ActionCenterProps) {
  const [isFundModalOpen, setFundModalOpen] = useState(false);
  const [isDeliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [isDisputeModalOpen, setDisputeModalOpen] = useState(false);

  // Helper to check if viewer is a party
  const isBuyer = userRole === "buyer";
  const isSeller = userRole === "seller";

  const renderAwaitingFunding = () => {
    if (isBuyer) {
      return (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Funding Required
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
            Lock funds in the EscrowVault to activate this deal and invite the
            seller to accept.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="secondary">Cancel Deal</Button>
            <Button variant="primary" onClick={() => setFundModalOpen(true)}>
              Fund Deal
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet size={24} />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Awaiting Buyer Funding
        </h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          The buyer has created this deal but has not yet deposited the required
          funds.
        </p>
      </div>
    );
  };

  const renderPendingSellerAcceptance = () => {
    if (isSeller) {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlayCircle size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Invitation Received
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
            Review the deal terms carefully. By accepting, you commit to the
            delivery deadline.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="danger"
              className="bg-transparent border-red-200 text-red-600 hover:bg-red-50"
            >
              Reject Deal
            </Button>
            <Button
              variant="primary"
              className="bg-green-600 hover:bg-green-700"
            >
              Accept Deal
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search size={24} />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Waiting for Seller
        </h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          The seller has been invited and needs to accept or reject the deal
          terms.
        </p>
      </div>
    );
  };

  const renderActive = () => {
    if (isSeller) {
      return (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlayCircle size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Deal Active</h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
            Proceed with the work and submit your delivery proof before the
            deadline.
          </p>
          <div className="flex justify-center gap-3">
            <Button
              variant="primary"
              onClick={() => setDeliveryModalOpen(true)}
            >
              Submit Delivery
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search size={24} />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Work in Progress
        </h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          The seller is currently working on the deliverables.
        </p>
      </div>
    );
  };

  const renderDeliverySubmitted = () => {
    return (
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <RefreshCw className="animate-spin-slow" size={24} />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Verifying Delivery
        </h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          The verifier is reviewing the submitted delivery.
        </p>
      </div>
    );
  };

  const renderAwaitingAcceptance = () => {
    if (isBuyer) {
      return (
        <div className="bg-sky-50 border border-sky-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Review Delivery
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
            The delivery has been verified. Please review and accept, or raise a
            dispute if there are issues.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="danger" onClick={() => setDisputeModalOpen(true)}>
              Raise Dispute
            </Button>
            <Button variant="secondary">Request Revision</Button>
            <Button
              variant="primary"
              className="bg-green-600 hover:bg-green-700"
            >
              Accept Delivery
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-sky-50 border border-sky-200 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search size={24} />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Awaiting Buyer Review
        </h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          The buyer is currently reviewing your delivery.
        </p>
      </div>
    );
  };

  const renderDisputed = () => {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Scale size={24} />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">
          Deal in Dispute
        </h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          An arbitrator is currently reviewing the evidence provided by both
          parties.
        </p>
      </div>
    );
  };

  const renderTerminal = (state: DealState) => {
    let title = "Deal Closed";
    let icon = <CheckCircle size={24} />;
    let colorClass = "bg-gray-50 border-gray-200 text-gray-400";
    let textColor = "text-gray-900";

    if (state === DealState.Released) {
      title = "Funds Released";
      colorClass = "bg-green-50 border-green-200 text-green-600";
    } else if (state === DealState.Refunded) {
      title = "Deal Refunded";
      colorClass = "bg-amber-50 border-amber-200 text-amber-600";
    } else if (state === DealState.Settled) {
      title = "Deal Settled";
      colorClass = "bg-blue-50 border-blue-200 text-blue-600";
    } else if (state === DealState.Cancelled) {
      title = "Deal Cancelled";
      icon = <Ban size={24} />;
      colorClass = "bg-gray-100 border-gray-300 text-gray-500";
    }

    return (
      <div className={`${colorClass} border rounded-lg p-6 text-center`}>
        <div
          className={`w-12 h-12 ${colorClass.split(" ")[0]} rounded-full flex items-center justify-center mx-auto mb-4`}
        >
          {icon}
        </div>
        <h2 className={`text-lg font-bold ${textColor} mb-2`}>{title}</h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          This deal has reached its final state and is now closed.
        </p>
      </div>
    );
  };

  return (
    <div className="mb-6">
      {currentState === DealState.AwaitingFunding && renderAwaitingFunding()}
      {currentState === DealState.PendingSellerAcceptance &&
        renderPendingSellerAcceptance()}
      {currentState === DealState.Active && renderActive()}
      {currentState === DealState.DeliverySubmitted &&
        renderDeliverySubmitted()}
      {currentState === DealState.AwaitingAcceptance &&
        renderAwaitingAcceptance()}
      {currentState === DealState.Disputed && renderDisputed()}
      {[
        DealState.Released,
        DealState.Refunded,
        DealState.Settled,
        DealState.Cancelled,
      ].includes(currentState) && renderTerminal(currentState)}
      {currentState === DealState.None && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <AlertCircle size={24} className="text-gray-400 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-900 mb-2">Draft State</h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            This deal is currently in draft mode.
          </p>
        </div>
      )}

      {/* Modals */}
      <FundDealModal
        isOpen={isFundModalOpen}
        onClose={() => setFundModalOpen(false)}
        onFund={(amt, tok) => {
          console.log("Fund", amt, tok);
          setFundModalOpen(false);
        }}
        requiredAmount={deal?.amount ? String(deal.amount) : "0"}
      />
      <SubmitDeliveryModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setDeliveryModalOpen(false)}
        onSubmit={(files, notes) => {
          console.log("Delivery", files, notes);
          setDeliveryModalOpen(false);
        }}
      />
      <DisputeModal
        isOpen={isDisputeModalOpen}
        onClose={() => setDisputeModalOpen(false)}
        onSubmit={(reason, files) => {
          console.log("Dispute", reason, files);
          setDisputeModalOpen(false);
        }}
      />
    </div>
  );
}
