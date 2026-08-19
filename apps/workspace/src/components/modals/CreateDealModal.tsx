import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  ChevronRight,
  ChevronLeft,
  FileText,
  Wallet,
  ShieldCheck,
  Check,
  Code,
  Package,
  AlertCircle,
  Upload,
  Trash2,
} from "lucide-react";
import { useChainId, useAccount } from "wagmi";
import { useCreateDeal } from "@settleone/sdk";
import { apiClient } from "@settleone/api";
import { useRequireWallet } from "../../hooks/useRequireWallet";
import { CHAIN_CONFIG, UI_CHAIN_MAPPING } from "../../lib/config";
import { parseUnits, keccak256 } from "viem";
import { SUPPORTED_CHAINS, SUPPORTED_TOKENS } from "../../lib/constants";

interface CreateDealModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SOFTWARE_CATEGORIES = [
  "All",
  "Smart Contract Audit",
  "Web Development",
  "Mobile App",
  "Design/UI",
  "Backend/API",
  "Data/Analytics",
  "Consulting",
  "Other",
];
const HARDWARE_CATEGORIES = [
  "All",
  "Electronics",
  "Manufacturing",
  "Equipment",
  "Furniture",
  "Wearables",
  "Inventory",
  "Other",
];

const CHAINS_ID = [11155111, 421614, 1, 42161, 137, 8453];

export function CreateDealModal({ isOpen, onClose }: CreateDealModalProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [createdId, setCreatedId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Form state
  const [form, setForm] = useState({
    name: "",
    dealType: "software" as "software" | "hardware",
    category: "",
    description: "",
    amount: "",
    token: "USDC",
    chain: "Arbitrum",
    sellerAddress: "",
    fundingOption: "staged" as "full" | "staged",
    partialSettlement: true,
    sellerWindow: "7",
    deliveryDeadline: "",
    acceptanceWindow: "7",
    disputeWindow: "3",
    verifier: "protocol" as "protocol" | "chainlink" | "custom",
    customVerifier: "",
    resolver: "protocol" as "protocol" | "custom",
    customResolver: "",
    termsFile: null as File | null,
    evidenceRequirements: "",
    settlementRules: "",
    sellerSpecifications: "",
  });

  const update = (key: keyof typeof form, val: any) =>
    setForm((f) => ({ ...f, [key]: val }));

  // ALL hooks MUST be called before any conditional return (Rules of Hooks)
  const rawChainId = useChainId();
  const { address } = useAccount();
  const safeChainId = CHAINS_ID.includes(rawChainId) ? rawChainId : 421614;
  const {
    createDeal,
    hash,
    isPending: isTxPending,
    isSuccess: isTxSuccess,
    error: txError,
  } = useCreateDeal(safeChainId);
  const { requireWallet, WalletPromptModal } = useRequireWallet();

  React.useEffect(() => {
    if (txError) {
      console.error("SMART CONTRACT CRASHED:", txError);
      setErrorMessage("Transaction failed. Please try again.");
      setIsPending(false);
    }
  }, [txError]);

  // Fire-and-forget: the indexer auto-links onChainId in the background.
  // We just show success as soon as the tx is confirmed on-chain.
  React.useEffect(() => {
    if (isTxSuccess && createdId) {
      setIsSuccess(true);
      setIsPending(false);
    }
  }, [isTxSuccess, createdId]);

  // Early return AFTER all hooks
  if (!isOpen) return null;

  const steps = [
    { num: 1, label: "Deal Details", icon: FileText },
    { num: 2, label: "Timelines & Rules", icon: Wallet },
    { num: 3, label: "Documents", icon: ShieldCheck },
    { num: 4, label: "Preview", icon: Check },
  ];

  const categories =
    form.dealType === "software" ? SOFTWARE_CATEGORIES : HARDWARE_CATEGORIES;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    requireWallet(async () => {
      setErrorMessage("");
      setIsPending(true);
      try {
        const config =
          CHAIN_CONFIG[form.chain] || CHAIN_CONFIG["Arbitrum Sepolia"];
        const tokenAddress = config.tokens[form.token];

        let termsHash = undefined;
        if (form.termsFile) {
          const arrayBuffer = await form.termsFile.arrayBuffer();
          termsHash = keccak256(new Uint8Array(arrayBuffer));
        }

        const apiPayload = {
          chainId: config.chainId,
          name: form.name,
          description: form.description || undefined,
          category: form.category || undefined,
          dealType:
            form.dealType === "software" ? "SoftDelivery" : "HardDelivery",
          sellerAddress: form.sellerAddress || undefined,
          tokenAddress: tokenAddress,
          amount: form.amount || "0",
          fundingType: form.fundingOption,
          sellerAcceptanceWindowSeconds: Number(form.sellerWindow) * 86400,
          deliveryDeadlineTimestamp: Math.floor(
            new Date(form.deliveryDeadline || Date.now() + 86400000).getTime() /
            1000,
          ),
          acceptanceWindowSeconds: Number(form.acceptanceWindow) * 86400,
          disputeWindowSeconds: Number(form.disputeWindow) * 86400,
          partialSettlementAllowed: form.partialSettlement,
          verifierAddress:
            form.verifier === "custom"
              ? form.customVerifier || undefined
              : form.verifier === "chainlink"
                ? config.chainlinkVerifier
                : config.verifier,
          resolverAddress:
            form.resolver === "custom"
              ? form.customResolver || undefined
              : config.resolver,
          termsHash: termsHash,
          evidenceRequirements: form.evidenceRequirements || undefined,
          settlementRules: form.settlementRules || undefined,
          sellerSpecifications: form.sellerSpecifications || undefined,
        };

        const result = await apiClient<any>("/deals", {
          method: "POST",
          body: JSON.stringify(apiPayload),
        });

        if (form.termsFile && result.data.deal?.id) {
          const fd = new FormData();
          fd.append("file", form.termsFile);
          fd.append("dealId", result.data.deal.id);
          fd.append("context", "terms");
          apiClient("/files/upload", { method: "POST", body: fd }).catch(
            console.error,
          );
        }

        const amountInWei = parseUnits(
          form.amount || "0",
          config.decimals[form.token] || 18,
        );

        createDeal({
          amount: amountInWei,
          buyer:
            (address as `0x${string}`) ||
            "0x0000000000000000000000000000000000000000",
          seller:
            (form.sellerAddress as `0x${string}`) ||
            "0x0000000000000000000000000000000000000000",
          token: tokenAddress as `0x${string}`,

          sellerAcceptanceWindow: BigInt(
            apiPayload.sellerAcceptanceWindowSeconds,
          ),
          deliveryDeadline: BigInt(apiPayload.deliveryDeadlineTimestamp),
          acceptanceWindow: BigInt(apiPayload.acceptanceWindowSeconds),
          disputeWindow: BigInt(apiPayload.disputeWindowSeconds),

          dealType: form.dealType === "software" ? 0 : 1,
          partialSettlementAllowed: form.partialSettlement,
          termsHash:
            result.data.hashes?.termsHash ||
            termsHash ||
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          metadataHash:
            result.data.hashes?.metadataHash ||
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          evidenceRequirementsHash:
            result.data.hashes?.evidenceHash ||
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          settlementRulesHash:
            result.data.hashes?.rulesHash ||
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          verifier: (apiPayload.verifierAddress ||
            "0x0000000000000000000000000000000000000000") as `0x${string}`,
          disputeResolver: (apiPayload.resolverAddress ||
            "0x0000000000000000000000000000000000000000") as `0x${string}`,
        });

        setCreatedId(result.data.deal.id);
        // setIsSuccess(true);
      } catch (err: any) {
        setErrorMessage(err.message || "Failed to create deal");
        setIsPending(false);
      }
    });
  };

  const charCount = form.name.length;

  return (
    <>
      <WalletPromptModal />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }}
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        {/* ── Modal Card ─────────────────────────────────────────── */}
        <div
          className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[var(--border)] shrink-0">
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)]">
                Create a New Deal
              </h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                All fields are committed on-chain after you confirm.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] rounded-md transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Steps indicator */}
          {!isSuccess && (
            <div className="flex items-center px-6 py-4 border-b border-[var(--border)] gap-0 shrink-0">
              {steps.map((s, i) => (
                <React.Fragment key={s.num}>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= s.num
                          ? "bg-[var(--accent-blue)] text-white"
                          : "bg-[var(--bg-subtle)] text-[var(--text-muted)] border border-[var(--border)]"
                        }`}
                    >
                      {step > s.num ? <Check size={12} /> : s.num}
                    </div>
                    <span
                      className={`text-xs font-medium hidden sm:block ${step === s.num
                          ? "text-[var(--text-primary)]"
                          : "text-[var(--text-muted)]"
                        }`}
                    >
                      {s.label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className="flex-1 h-px mx-3"
                      style={{
                        background:
                          step > s.num ? "var(--accent-blue)" : "var(--border)",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Body — scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {isSuccess ? (
              /* Success state */
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-[var(--accent-green)]/15 text-[var(--accent-green)] rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                  <Check size={40} />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
                  Deal Created!
                </h3>
                <p className="text-[var(--text-secondary)] mb-1">
                  Deal ID:{" "}
                  <span className="font-mono text-[var(--text-primary)]">
                    #{createdId}
                  </span>
                </p>
                <p className="text-xs text-[var(--text-muted)] mb-6">
                  Share: settleone.xyz/marketplace/{createdId}
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => {
                      onClose();
                      navigate(`/marketplace/${createdId.replace("DL-", "")}`);
                    }}
                    className="px-6 py-2.5 bg-[var(--accent-blue)] text-white font-semibold text-sm rounded-[var(--radius-input)] hover:bg-[var(--accent-blue-hover)] transition-all shadow-[var(--shadow-glow)]"
                  >
                    View Deal Room
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      navigate("/marketplace");
                    }}
                    className="px-6 py-2.5 bg-[var(--bg-subtle)] text-[var(--text-primary)] font-medium text-sm rounded-[var(--radius-input)] hover:bg-[var(--bg-hover)] border border-[var(--border)] transition-all"
                  >
                    Go to Marketplace
                  </button>
                </div>
              </div>
            ) : step === 1 ? (
              /* STEP 1 */
              <>
                {/* Deal Name */}
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-sm font-medium text-[var(--text-secondary)]">
                      Deal Name{" "}
                      <span className="text-[var(--accent-red)]">*</span>
                    </label>
                    <span
                      className={`text-xs ${charCount > 100 ? "text-[var(--accent-red)]" : "text-[var(--text-muted)]"}`}
                    >
                      {charCount}/120
                    </span>
                  </div>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    maxLength={120}
                    placeholder="e.g. Smart Contract Audit for DeFi Protocol"
                    className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_var(--accent-blue-glow)]"
                  />
                </div>

                {/* Deal Type */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Deal Type{" "}
                    <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {(["software", "hardware"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => update("dealType", type)}
                        className={`p-4 rounded-[var(--radius-card)] border-2 text-left transition-all ${form.dealType === type
                            ? "border-[var(--accent-blue)] bg-[var(--accent-blue-glow2)]"
                            : "border-[var(--border)] hover:border-[var(--border-light)] bg-[var(--bg-base)]"
                          }`}
                      >
                        <div
                          className={`mb-2 ${form.dealType === type ? "text-[var(--accent-blue)]" : "text-[var(--text-muted)]"}`}
                        >
                          {type === "software" ? (
                            <Code size={20} />
                          ) : (
                            <Package size={20} />
                          )}
                        </div>
                        <p className="font-semibold text-sm text-[var(--text-primary)] capitalize">
                          {type === "software"
                            ? "Software / Digital"
                            : "Hardware / Physical"}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          {type === "software"
                            ? "Code, designs, audits, consulting"
                            : "Products, equipment, inventory"}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Category <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                    className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]"
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Deal Description{" "}
                    <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    rows={4}
                    placeholder="Describe exactly what is being bought/sold, deliverables expected, acceptance criteria..."
                    className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] focus:shadow-[0_0_0_3px_var(--accent-blue-glow)] resize-none"
                  />
                  {form.description.length > 0 &&
                    form.description.length < 100 && (
                      <p className="text-xs text-[var(--accent-amber)] mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> Minimum 100 characters (
                        {form.description.length}/100)
                      </p>
                    )}
                </div>

                {/* Amount */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Deal Amount{" "}
                      <span className="text-[var(--accent-red)]">*</span>
                    </label>
                    <input
                      type="number"
                      value={form.amount}
                      onChange={(e) => update("amount", e.target.value)}
                      placeholder="5000"
                      className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
                    />
                  </div>
                  <div className="relative">
                    <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Token
                    </label>
                    <details className="group">
                      <summary
                        className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(-
  -radius-input)] text-sm text-[var(--text-primary)] flex items-center justify-between cursor-pointer list-none focus:outline-
  none hover:border-[var(--border-light)] transition-colors select-none [&::-webkit-details-marker]:hidden"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              SUPPORTED_TOKENS.find((t) => t.id === form.token)
                                ?.logo
                            }
                            alt="Token"
                            className="w-5 h-5 rounded-full bg-white"
                          />
                          <span className="font-medium">
                            {
                              SUPPORTED_TOKENS.find((t) => t.id === form.token)
                                ?.symbol
                            }
                          </span>
                        </div>
                        {/* Arrow Icon */}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[var(--text-muted)] group-open:rotate-180 transition-transform"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </summary>

                      {/* Dropdown Options */}
                      <div
                        className="absolute top-[100%] left-0 w-full mt-2 bg-[var(--bg-card)] border border-[var(--
  border)] rounded-lg shadow-xl z-20 overflow-hidden flex flex-col"
                      >
                        {SUPPORTED_TOKENS.map((token) => (
                          <button
                            key={token.id}
                            type="button"
                            onClick={(e) => {
                              update("token", token.id);
                              // Close the dropdown after selection
                              const details =
                                e.currentTarget.closest("details");
                              if (details) details.open = false;
                            }}
                            className={`w-full px-4 py-2.5 flex items-center gap-3 text-sm transition-colors text-left 
  border-b border-[var(--border)] last:border-0 ${form.token === token.id
                                ? "bg-[var(--bg-subtle)] text-[var(--text-primary)]"
                                : "text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
                              }`}
                          >
                            <img
                              src={token.logo}
                              alt={token.symbol}
                              className="w-5 h-5 rounded-full bg-white"
                            />
                            <span className="font-medium">{token.symbol}</span>
                          </button>
                        ))}
                      </div>
                    </details>
                  </div>
                </div>

                {/* Chain */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Chain
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    <div className="flex flex-wrap gap-2 mt-2">
                      {SUPPORTED_CHAINS.map((chain) => (
                        <button
                          key={chain.id}
                          type="button"
                          onClick={() => update("chain", chain.id)}
                          className={`px-3 py-1.5 rounded-lg border text-sm font-semibold transition-all flex items-center gap-2 ${form.chain === chain.id
                              ? "border-[var(--accent-blue)] bg-[var(--accent-blue)] text-white shadow-md shadow-blue-500/20"
                              : "border-[var(--border)] bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:border-[var(--border-light)] hover:text-[var(--text-primary)]"
                            }`}
                        >
                          <img
                            src={chain.logo}
                            alt={chain.name}
                            className="w-4 h-4 rounded-full"
                          />
                          {chain.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Seller Address */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Seller Address{" "}
                    <span className="text-[var(--text-muted)] font-normal">
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={form.sellerAddress}
                    onChange={(e) => update("sellerAddress", e.target.value)}
                    placeholder="0x... or leave empty for open marketplace"
                    className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] font-mono"
                  />
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    If you specify a seller, only they can accept this deal.
                  </p>
                </div>

                {/* Funding Option */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Funding Option{" "}
                    <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        key: "full",
                        label: "Full payment upfront (100%)",
                        desc: "Pay everything at funding stage",
                      },
                      {
                        key: "staged",
                        label: "Staged funding: 60% now, 40% before acceptance",
                        desc: "Seller knows remaining 40% is coming only if delivery passes verification",
                      },
                    ].map((opt) => (
                      <label
                        key={opt.key}
                        className={`flex items-start gap-3 p-3 rounded-[var(--radius-input)] border cursor-pointer transition-all ${form.fundingOption === opt.key
                            ? "border-[var(--accent-blue)] bg-[var(--accent-blue-glow2)]"
                            : "border-[var(--border)] hover:border-[var(--border-light)]"
                          }`}
                      >
                        <input
                          type="radio"
                          checked={form.fundingOption === opt.key}
                          onChange={() => update("fundingOption", opt.key)}
                          className="mt-1 accent-[var(--accent-blue)]"
                        />
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">
                            {opt.label}
                          </p>
                          <p className="text-xs text-[var(--text-muted)] mt-0.5">
                            {opt.desc}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Partial Settlement */}
                <div className="flex items-center justify-between p-3 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)]">
                  <div>
                    <p className="text-sm font-medium text-[var(--text-primary)]">
                      Partial Settlement Allowed
                    </p>
                    <p className="text-xs text-[var(--text-muted)]">
                      Allow arbitrator to split the amount in disputes
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={form.partialSettlement}
                      onChange={(e) =>
                        update("partialSettlement", e.target.checked)
                      }
                    />
                    <div className="w-11 h-6 bg-[var(--bg-subtle)] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-blue)] border border-[var(--border)]" />
                  </label>
                </div>
              </>
            ) : step === 2 ? (
              /* STEP 2 */
              <>
                {/* Seller Acceptance Window */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Seller Acceptance Window{" "}
                    <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <select
                    value={form.sellerWindow}
                    onChange={(e) => update("sellerWindow", e.target.value)}
                    className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]"
                  >
                    {["1", "3", "7", "14", "30"].map((d) => (
                      <option key={d} value={d}>
                        {d} day{d !== "1" ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    After you fund, the seller acceptance countdown starts.
                  </p>
                </div>

                {/* Delivery Deadline */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Delivery Deadline{" "}
                    <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.deliveryDeadline}
                    onChange={(e) => update("deliveryDeadline", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]"
                    style={{ colorScheme: "dark" }}
                  />
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Seller must submit verified delivery by this date or you are
                    automatically refunded.
                  </p>
                </div>

                {/* Buyer Acceptance Window */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Buyer Acceptance Window{" "}
                    <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <select
                    value={form.acceptanceWindow}
                    onChange={(e) => update("acceptanceWindow", e.target.value)}
                    className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]"
                  >
                    {["1", "3", "7", "14"].map((d) => (
                      <option key={d} value={d}>
                        {d} day{d !== "1" ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    If you don't act, delivery is auto-accepted after this
                    window.
                  </p>
                </div>

                {/* Dispute Window */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Dispute Window{" "}
                    <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <select
                    value={form.disputeWindow}
                    onChange={(e) => update("disputeWindow", e.target.value)}
                    className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]"
                  >
                    {["1", "3", "5", "7"].map((d) => (
                      <option key={d} value={d}>
                        {d} day{d !== "1" ? "s" : ""}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    After you accept, this is your window to raise a dispute.
                  </p>
                </div>

                {/* Verifier */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Verifier <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        key: "protocol",
                        label: "Protocol Default Verifier",
                        desc: "SettleOne's EIP-712 validator (recommended)",
                      },
                      {
                        key: "chainlink",
                        label: "Chainlink Oracle Verifier",
                        desc: "Async oracle node verifies delivery independently",
                      },
                      {
                        key: "custom",
                        label: "Custom Address (advanced)",
                        desc: "Specify your own verifier contract",
                      },
                    ].map((opt) => (
                      <label
                        key={opt.key}
                        className={`flex items-start gap-3 p-3 rounded-[var(--radius-input)] border cursor-pointer transition-all ${form.verifier === opt.key
                            ? "border-[var(--accent-blue)] bg-[var(--accent-blue-glow2)]"
                            : "border-[var(--border)] hover:border-[var(--border-light)]"
                          }`}
                      >
                        <input
                          type="radio"
                          checked={form.verifier === opt.key}
                          onChange={() => update("verifier", opt.key)}
                          className="mt-1 accent-[var(--accent-blue)]"
                        />
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">
                            {opt.label}
                          </p>
                          <p className="text-xs text-[var(--text-muted)]">
                            {opt.desc}
                          </p>
                        </div>
                      </label>
                    ))}
                    {form.verifier === "custom" && (
                      <input
                        type="text"
                        value={form.customVerifier}
                        onChange={(e) =>
                          update("customVerifier", e.target.value)
                        }
                        placeholder="0x... verifier contract address"
                        className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] font-mono focus:outline-none focus:border-[var(--accent-blue)]"
                      />
                    )}
                  </div>
                </div>

                {/* Dispute Resolver */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Dispute Resolver{" "}
                    <span className="text-[var(--accent-red)]">*</span>
                  </label>
                  <div className="space-y-2">
                    {[
                      {
                        key: "protocol",
                        label: "Protocol Default Arbitrator",
                        desc: "SettleOne's qualified arbitration panel (recommended)",
                      },
                      {
                        key: "custom",
                        label: "Custom Address (advanced)",
                        desc: "Specify your own resolver contract",
                      },
                    ].map((opt) => (
                      <label
                        key={opt.key}
                        className={`flex items-start gap-3 p-3 rounded-[var(--radius-input)] border cursor-pointer transition-all ${form.resolver === opt.key
                            ? "border-[var(--accent-blue)] bg-[var(--accent-blue-glow2)]"
                            : "border-[var(--border)] hover:border-[var(--border-light)]"
                          }`}
                      >
                        <input
                          type="radio"
                          checked={form.resolver === opt.key}
                          onChange={() => update("resolver", opt.key)}
                          className="mt-1 accent-[var(--accent-blue)]"
                        />
                        <div>
                          <p className="text-sm font-medium text-[var(--text-primary)]">
                            {opt.label}
                          </p>
                          <p className="text-xs text-[var(--text-muted)]">
                            {opt.desc}
                          </p>
                        </div>
                      </label>
                    ))}
                    {form.resolver === "custom" && (
                      <input
                        type="text"
                        value={form.customResolver}
                        onChange={(e) =>
                          update("customResolver", e.target.value)
                        }
                        placeholder="0x... resolver contract address"
                        className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] font-mono focus:outline-none focus:border-[var(--accent-blue)]"
                      />
                    )}
                  </div>
                </div>
              </>
            ) : step === 3 ? (
              /* STEP 3 */
              <>
                {/* Terms Upload */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                    Terms & Commercial Agreement{" "}
                    <span className="text-[var(--text-muted)] font-normal">
                      (optional)
                    </span>
                  </label>
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[var(--border)] rounded-[var(--radius-card)] cursor-pointer hover:border-[var(--accent-blue)] hover:bg-[var(--accent-blue-glow2)] transition-all">
                    <Upload
                      size={24}
                      className="text-[var(--text-muted)] mb-2"
                    />
                    <span className="text-sm text-[var(--text-secondary)]">
                      {form.termsFile
                        ? form.termsFile.name
                        : "Drag & drop or click to upload"}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] mt-1">
                      PDF, DOC, TXT — max 10MB
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) =>
                        update("termsFile", e.target.files?.[0] || null)
                      }
                    />
                  </label>
                  {form.termsFile && (
                    <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm">
                      <FileText
                        size={14}
                        className="text-[var(--accent-blue)]"
                      />
                      <span className="text-[var(--text-primary)] flex-1 truncate">
                        {form.termsFile.name}
                      </span>
                      <button
                        onClick={() => update("termsFile", null)}
                        className="text-[var(--text-muted)] hover:text-[var(--accent-red)]"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    This document is hashed and its hash committed on-chain as
                    termsHash. The file itself is stored encrypted off-chain.
                  </p>
                </div>

                {/* Evidence Requirements */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Evidence Requirements{" "}
                    <span className="text-[var(--text-muted)] font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={form.evidenceRequirements}
                    onChange={(e) =>
                      update("evidenceRequirements", e.target.value)
                    }
                    rows={3}
                    placeholder="Describe what the seller must submit as delivery proof..."
                    className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] resize-none"
                  />
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    This is hashed as evidenceRequirementsHash.
                  </p>
                </div>

                {/* Settlement Rules */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Settlement Rules{" "}
                    <span className="text-[var(--text-muted)] font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={form.settlementRules}
                    onChange={(e) => update("settlementRules", e.target.value)}
                    rows={3}
                    placeholder="Any custom settlement rules for the arbitrator..."
                    className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] resize-none"
                  />
                </div>

                {/* Seller Specifications Required */}
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Seller Specifications Required{" "}
                    <span className="text-[var(--text-muted)] font-normal">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    value={form.sellerSpecifications}
                    onChange={(e) =>
                      update("sellerSpecifications", e.target.value)
                    }
                    rows={3}
                    placeholder="Specify any strict requirements the seller must adhere to..."
                    className="w-full px-4 py-2.5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)] resize-none"
                  />
                </div>
              </>
            ) : (
              /* STEP 4: Preview */
              <>
                {/* Preview Panel */}
                <div className="p-5 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-inner overflow-hidden">
                  <h4 className="text-sm font-bold text-[var(--text-primary)] mb-5 uppercase tracking-wider flex items-center gap-2">
                          Deal Preview
                    </h4>

                    {/* Grid for short key-value pairs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm mb-6 pb-6 border-b border-[var(--border)]">
                      {[
                        { label: "Deal Name", value: form.name || "—" },
                        { label: "Type", value: form.dealType === "software" ? "Software" : "Hardware" },
                        { label: "Category", value: form.category || "—" },
                        { label: "Amount", value: `${form.amount || "0"} ${form.token}` },
                        { label: "Network", value: form.chain },
                        { label: "Seller", value: form.sellerAddress ? `${form.sellerAddress.slice(0, 6)}...${form.sellerAddress.slice(-4)}` : "Open Marketplace" },
                        { label: "Funding", value: form.fundingOption === "staged" ? "60/40 Staged" : "100% Upfront" },
                        { label: "Partial Settlement", value: form.partialSettlement ? "Enabled" : "Disabled" },
                        { label: "Delivery Deadline", value: form.deliveryDeadline || "Not set" },
                        { label: "Verifier", value: form.verifier === "custom" ? "Custom" : form.verifier },
                        { label: "Arbitrator", value: form.resolver === "custom" ? "Custom" : form.resolver },
                        { label: "Attached File", value: form.termsFile ? form.termsFile.name : "None" },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-xs text-[var(--text-muted)] mb-1">{item.label}</span>
                          <span className="text-[var(--text-primary)] font-medium truncate">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Full width blocks for long text fields */}
                    <div className="space-y-4 text-sm">
                      {form.description && (
                        <div>
                          <span className="block text-xs text-[var(--text-muted)] mb-1.5">Description</span>
                          <p className="p-3 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-[var(--text-secondary)] whitespace-pre-wrap">
                            {form.description}
                          </p>
                        </div>
                      )}
                      {form.evidenceRequirements && (
                        <div>
                          <span className="block text-xs text-[var(--text-muted)] mb-1.5">Evidence Requirements</span>
                          <p className="p-3 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-[var(--text-secondary)] whitespace-pre-wrap">
                            {form.evidenceRequirements}
                          </p>
                        </div>
                      )}
                      {form.settlementRules && (
                        <div>
                          <span className="block text-xs text-[var(--text-muted)] mb-1.5">Settlement Rules</span>
                          <p className="p-3 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-[var(--text-secondary)] whitespace-pre-wrap">
                            {form.settlementRules}
                          </p>
                        </div>
                      )}
                      {form.sellerSpecifications && (
                        <div>
                          <span className="block text-xs text-[var(--text-muted)] mb-1.5">Seller Specifications</span>
                          <p className="p-3 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] text-[var(--text-secondary)] whitespace-pre-wrap">
                            {form.sellerSpecifications}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>



                  {/* Disclaimer */}
                  <div className="flex items-start gap-3 p-4 bg-[var(--accent-amber)]/10 border border-[var(--accent-amber)]/30 rounded-[var(--radius-input)]">
                    <AlertCircle
                      size={20}
                      className="text-[var(--accent-amber)] mt-0.5 shrink-0"
                    />
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      Creating this deal will call{" "}
                      <span className="font-mono text-[var(--text-primary)] bg-[var(--bg-subtle)] px-1 rounded border border-[var(--border)]">
                        DealManager.createDeal()
                      </span>{" "}
                      on {form.chain}. Make sure you have carefully reviewed the
                      terms. Estimated gas cost: ~0.003 ETH.
                    </p>
                  </div>
                </>
            )}
              </div>

            {/* Footer */}
            {!isSuccess && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-[var(--border)] shrink-0 bg-[var(--bg-elevated)]">
                <button
                  onClick={() =>
                    step > 1 ? setStep((s) => (s - 1) as any) : onClose()
                  }
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] rounded-[var(--radius-input)] transition-colors border border-[var(--border)]"
                >
                  <ChevronLeft size={16} />
                  {step === 1 ? "Cancel" : "Back"}
                </button>

                {step < 4 ? (
                  <button
                    onClick={() => setStep((s) => (s + 1) as any)}
                    className="flex items-center gap-1.5 px-6 py-2 text-sm font-semibold text-white bg-[var(--accent-blue)] hover:bg-[var(--accent-blue-hover)] rounded-[var(--radius-input)] transition-all shadow-[var(--shadow-glow)]"
                  >
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="flex items-center gap-2 px-6 py-2 text-sm font-semibold text-white bg-[var(--accent-blue)] hover:bg-[var(--accent-blue-hover)] rounded-[var(--radius-input)] transition-all shadow-[var(--shadow-glow)] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isPending ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Signing…
                      </>
                    ) : (
                      <>
                        Create Deal <Check size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </div>{" "}
          {/* end modal card */}
        </div>{" "}
        {/* end overlay */}
      </>
      );
}
