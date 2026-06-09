import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAccount, useChainId } from "wagmi";
import {
  Check,
  ChevronRight,
  FileText,
  Wallet,
  ShieldCheck,
  Link2,
  AlertCircle,
} from "lucide-react";
import {
  Button,
  Input,
  Select,
  Modal,
  Spinner,
} from "@settleone/design-system";
import { DealType } from "@settleone/types";
import { useCreateDeal } from "@settleone/sdk";
import { parseUnits } from "viem";

export function CreateDealPage() {
  const navigate = useNavigate();
  const chainId = useChainId();
  const { address } = useAccount();

  const [step, setStep] = useState(1);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [createdDealId, setCreatedDealId] = useState("");
  const [error, setError] = useState("");

  // Form State
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [title, setTitle] = useState("");
  const [dealType, setDealType] = useState<DealType>(DealType.SoftDelivery);
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState("USDC");
  const [deliveryDeadline, setDeliveryDeadline] = useState("");

  const { createDeal, isPending, isConfirming, isSuccess, hash } =
    useCreateDeal(chainId);

  const steps = [
    { num: 1, title: "Role & Basics", icon: <FileText size={18} /> },
    { num: 2, title: "Terms & Funding", icon: <Wallet size={18} /> },
    { num: 3, title: "Rules & Verifiers", icon: <ShieldCheck size={18} /> },
    { num: 4, title: "Review & Sign", icon: <Check size={18} /> },
  ];

  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleCreate = async () => {
    try {
      setError("");

      // Validation
      if (!title || !amount || !deliveryDeadline) {
        setError("Please fill in all required fields.");
        return;
      }

      const deadlineTimestamp = BigInt(
        Math.floor(new Date(deliveryDeadline).getTime() / 1000),
      );

      // Construct DealInput
      const dealInput = {
        title,
        seller:
          role === "seller"
            ? address!
            : "0x0000000000000000000000000000000000000000",
        token: "0x3522aBB5186a58b1806a87e84cC2E74E9F1042C2", // Default SettleOneToken for now
        amount: parseUnits(amount, 6),
        deliveryDeadline: deadlineTimestamp,
        dealType,
        acceptanceWindow: 604800, // 7 days in seconds
        disputeWindow: 259200, // 3 days
        partialSettlementAllowed: true,
        metadataHash: title, // Simplified
      };

      await createDeal(dealInput as any);

      // In a real app, we'd wait for the event to get the Deal ID
      setCreatedDealId("00146");
      setSuccessModalOpen(true);
    } catch (err: any) {
      console.error("Creation failed", err);
      setError(err.message || "Failed to create deal.");
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          I am acting as the:
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => setRole("buyer")}
            className={`cursor-pointer border rounded-xl p-5 transition-all ${role === "buyer" ? "border-[var(--accent-blue)] bg-blue-50 ring-1 ring-[var(--accent-blue)]" : "border-gray-200 hover:border-blue-300"}`}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 font-bold mb-3">
              B
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Buyer</h4>
            <p className="text-xs text-gray-500">
              I will fund the escrow vault and receive the final delivery.
            </p>
          </div>
          <div
            onClick={() => setRole("seller")}
            className={`cursor-pointer border rounded-xl p-5 transition-all ${role === "seller" ? "border-[var(--accent-blue)] bg-blue-50 ring-1 ring-[var(--accent-blue)]" : "border-gray-200 hover:border-blue-300"}`}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-600 font-bold mb-3">
              S
            </div>
            <h4 className="font-bold text-gray-900 mb-1">Seller</h4>
            <p className="text-xs text-gray-500">
              I will perform the work, submit the delivery, and receive the
              payout.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-[var(--border)]">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deal Title *
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Smart Contract Audit, Component Sourcing..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deal Category
          </label>
          <Select
            value={dealType === DealType.SoftDelivery ? "soft" : "hard"}
            onChange={(e) =>
              setDealType(
                e.target.value === "soft"
                  ? DealType.SoftDelivery
                  : DealType.HardDelivery,
              )
            }
            options={[
              { value: "soft", label: "Digital Services (Soft Delivery)" },
              { value: "hard", label: "Physical Goods (Hard Delivery)" },
            ]}
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <Input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="5,000"
              type="number"
              className="pl-7"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Token
          </label>
          <Select
            value={token}
            onChange={(e) => setToken(e.target.value)}
            options={[
              { value: "USDC", label: "USDC" },
              { value: "USDT", label: "USDT" },
              { value: "DAI", label: "DAI" },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border)]">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delivery Deadline *
          </label>
          <Input
            type="date"
            value={deliveryDeadline}
            onChange={(e) => setDeliveryDeadline(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Acceptance Window (Days)
          </label>
          <Input type="number" defaultValue="7" />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dispute Resolver
        </label>
        <Select
          options={[
            { value: "settleone", label: "SettleOne Protocol Arbitrators" },
            { value: "custom", label: "Custom Arbitrator Address" },
          ]}
        />
      </div>

      <div className="pt-4 border-t border-[var(--border)] space-y-4">
        <h4 className="text-sm font-semibold text-gray-900">
          Settlement Rules
        </h4>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="rounded text-[var(--accent-blue)]"
            defaultChecked
          />
          <span className="text-sm text-gray-700">
            Allow Partial Settlements
          </span>
        </label>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-gray-50 border border-[var(--border)] rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900">Summary</h3>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Title</span>
            <span className="font-medium text-gray-900">
              {title || "Untitled Deal"}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Your Role</span>
            <span className="font-medium text-gray-900 capitalize">{role}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Value</span>
            <span className="font-bold text-green-600">
              {amount ? `${amount} ${token}` : "—"}
            </span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Deadline</span>
            <span className="font-medium text-gray-900">
              {deliveryDeadline || "—"}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm flex gap-2">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-md text-sm text-blue-900">
        <ShieldCheck className="shrink-0 mt-0.5" size={20} />
        <p>
          By creating this deal, you are signing an on-chain transaction. Your
          terms will be immutable once confirmed.
        </p>
      </div>
    </div>
  );

  const isProcessing = isPending || isConfirming;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="mb-8 px-4 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create New Deal
        </h1>
        <p className="text-gray-500">
          Configure your terms and initialize the transaction commitment layer.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-8 relative px-4 sm:px-0">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
        <div
          className="absolute left-0 top-1/2 h-0.5 bg-[var(--accent-blue)] transition-all duration-300 ease-in-out -z-10 -translate-y-1/2"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>

        {steps.map((s) => {
          const isActive = step === s.num;
          const isPassed = step > s.num;

          return (
            <div key={s.num} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  isPassed
                    ? "bg-[var(--accent-blue)] text-white"
                    : isActive
                      ? "bg-[var(--accent-blue)] text-white ring-4 ring-blue-100"
                      : "bg-white border-2 border-gray-300 text-gray-400"
                }`}
              >
                {isPassed ? <Check size={20} /> : s.icon}
              </div>
              <span
                className={`text-xs mt-2 font-medium hidden sm:block ${isActive ? "text-[var(--text-primary)] font-bold" : "text-gray-500"}`}
              >
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-6 md:p-8 min-h-[400px] flex flex-col mx-4 sm:mx-0">
        <div className="flex-1">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--border)]">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={isProcessing}
            className={step === 1 ? "invisible" : ""}
          >
            Back
          </Button>

          {step < 4 ? (
            <Button
              variant="primary"
              onClick={handleNext}
              className="flex items-center gap-2"
            >
              Next Step <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={handleCreate}
              disabled={isProcessing}
              className="bg-green-600 hover:bg-green-700 focus:ring-green-500 min-w-[160px]"
            >
              {isPending ? (
                "Confirming..."
              ) : isConfirming ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" /> Confirming...
                </span>
              ) : (
                "Sign & Create Deal"
              )}
            </Button>
          )}
        </div>
      </div>

      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => {}}
        title="Deal Created Successfully!"
        size="md"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Your Deal is Live
          </h2>
          <p className="text-gray-500 mb-6">
            Your on-chain transaction was successful. You can now fund the deal
            or invite the seller.
          </p>

          <Button
            variant="primary"
            className="w-full"
            onClick={() => navigate(`/marketplace`)}
          >
            Go to Marketplace
          </Button>
        </div>
      </Modal>
    </div>
  );
}
