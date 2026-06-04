import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWalletClient, usePublicClient, useAccount } from "wagmi";
import { formatEther } from "viem";
import {
  Loader2,
  ArrowLeft,
  ShieldCheck,
  User,
  Building,
  Zap,
  Info,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Upload,
  Gavel,
  Wallet,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/Card";
import { Button } from "../../components/Button";
import { StatusBadge } from "../../components/StatusBadge";
import { Modal } from "../../components/Modal";
import { FileUpload } from "../../components/FileUpload";
import { Timer } from "../../components/Timer";
import { dealsSdk } from "../../sdk/deals";
import { apiClient } from "../../api/apiClient";
import { cn } from "../../utils/cn";

export function DealDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [dealMetadata, setDealMetadata] = useState<any>(null);
  const [contractDeal, setContractDeal] = useState<any>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    if (!id || !publicClient) return;

    try {
      // 1. Fetch from Chain
      const cDeal = await dealsSdk.getDeal(publicClient, BigInt(id));
      setContractDeal(cDeal);

      // 2. Fetch from Backend (using contractDealId)
      const { data: bData } = await apiClient.get(
        `/deals?contractDealId=${id}`,
      );
      if (bData.data?.length > 0) {
        setDealMetadata(bData.data[0]);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError("Could not retrieve deal details.");
    } finally {
      setLoading(false);
    }
  }, [id, publicClient]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFund = async () => {
    if (!walletClient || !publicClient || !id || !contractDeal) return;
    setActionLoading(true);
    setError(null);
    try {
      const txHash = await dealsSdk.depositFunds(
        walletClient,
        publicClient,
        BigInt(id),
        formatEther(contractDeal.amount),
      );
      await publicClient.waitForTransactionReceipt({ hash: txHash });
      await fetchData();
    } catch (err: any) {
      setError(err.message || "Deposit failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!walletClient || !publicClient || !id) return;
    setActionLoading(true);
    setError(null);
    try {
      const txHash = await dealsSdk.confirmDelivery(
        walletClient,
        publicClient,
        BigInt(id),
      );
      await publicClient.waitForTransactionReceipt({ hash: txHash });
      await fetchData();
    } catch (err: any) {
      setError(err.message || "Confirmation failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUploadComplete = async (hash: `0x${string}`) => {
    if (!walletClient || !publicClient || !id) return;
    setIsUploadModalOpen(false);
    setActionLoading(true);
    setError(null);
    try {
      const txHash = await dealsSdk.submitProof(
        walletClient,
        publicClient,
        BigInt(id),
        hash,
      );
      await publicClient.waitForTransactionReceipt({ hash: txHash });
      await fetchData();
    } catch (err: any) {
      setError(err.message || "Submission failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <div className="relative">
          <Loader2 className="w-12 h-12 animate-spin text-brand-teal" />
          <div className="absolute inset-0 blur-xl bg-brand-teal/20 animate-pulse" />
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-text-slate animate-pulse">
          Initializing Protocol State
        </p>
      </div>
    );
  }

  if (!contractDeal)
    return (
      <div className="container py-20 text-center space-y-6">
        <AlertCircle className="w-16 h-16 text-brand-gold mx-auto opacity-50" />
        <h2 className="text-2xl font-syne font-bold">Protocol Not Found</h2>
        <Button variant="outline" onClick={() => navigate("/deals")}>
          Back to Dashboard
        </Button>
      </div>
    );

  const isBuyer = address?.toLowerCase() === contractDeal.buyer.toLowerCase();
  const isSeller = address?.toLowerCase() === contractDeal.seller.toLowerCase();

  const dealStateMap = [
    "None",
    "Created",
    "FundsLocked",
    "ProofSubmitted",
    "Delivered",
    "Disputed",
    "Settled",
    "Refunded",
    "Cancelled",
  ];
  const stateLabel = dealStateMap[contractDeal.state];
  const displayStatus = dealMetadata?.status || stateLabel.toLowerCase();

  return (
    <div className="container max-w-7xl mx-auto px-4 py-12 relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="space-y-3">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/deals")}
            className="flex items-center gap-2 text-text-slate hover:text-brand-teal transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
              Protocol Explorer
            </span>
          </motion.button>
          <div className="flex items-center gap-4">
            <h1 className="font-syne font-extrabold text-3xl md:text-5xl tracking-tight">
              {dealMetadata?.title || "Protocol Instance"}
            </h1>
            <StatusBadge status={displayStatus} />
          </div>
          <div className="flex items-center gap-2 text-text-slate font-mono text-[10px] uppercase tracking-widest">
            <span className="text-brand-teal">Instance ID:</span> {id}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 p-6 glass-card border-brand-teal/10">
          <p className="text-[10px] font-mono text-text-slate uppercase tracking-[0.3em]">
            Capital Locked
          </p>
          <p className="text-4xl font-syne font-black text-brand-teal tracking-tighter">
            {formatEther(contractDeal.amount)}{" "}
            <span className="text-xl font-normal opacity-50">ETH</span>
          </p>
        </div>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-3"
        >
          <AlertCircle className="w-4 h-4" />
          <p>{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          {/* Main Info */}
          <Card className="overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-brand-teal via-brand-gold to-brand-teal animate-shimmer" />
            <CardHeader className="border-b border-text-muted/5 pb-8 pt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <CardDescription className="mb-2">
                      Counterparties
                    </CardDescription>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center border border-text-muted/10 group hover:border-brand-teal/30 transition-all">
                          <User className="w-5 h-5 text-brand-teal" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono uppercase text-text-slate tracking-tighter">
                            Buyer Node
                          </p>
                          <p className="font-mono text-xs truncate max-w-[200px]">
                            {contractDeal.buyer}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-bg-tertiary flex items-center justify-center border border-text-muted/10 group hover:border-brand-gold/30 transition-all">
                          <Building className="w-5 h-5 text-brand-gold" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono uppercase text-text-slate tracking-tighter">
                            Seller Node
                          </p>
                          <p className="font-mono text-xs truncate max-w-[200px]">
                            {contractDeal.seller}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <CardDescription className="mb-2">
                      Temporal Constraints
                    </CardDescription>
                    <div className="space-y-4">
                      <Timer
                        deadline={Number(contractDeal.deliveryDeadline) * 1000}
                        label="Execution Deadline"
                      />
                      <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-text-slate" />
                        <div>
                          <p className="text-[10px] font-mono uppercase text-text-slate tracking-tighter">
                            Dispute window
                          </p>
                          <p className="text-sm font-medium">
                            {Number(contractDeal.disputeWindow) /
                              (24 * 60 * 60)}{" "}
                            Earth Days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              <CardDescription className="mb-4">
                Protocol Metadata
              </CardDescription>
              <p className="text-text-primary leading-relaxed max-w-2xl text-lg">
                {dealMetadata?.description ||
                  "Loading extended manifest from off-chain storage..."}
              </p>
            </CardContent>
          </Card>

          {/* Action Context */}
          <AnimatePresence>
            {(isBuyer || isSeller) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <Card className="border-brand-teal/20 bg-brand-teal/[0.03]">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-3">
                      <Zap className="w-5 h-5 text-brand-teal fill-brand-teal/20" />
                      Required Action
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                      <div className="flex-1 space-y-2">
                        <h4 className="text-xl font-bold">
                          {stateLabel === "Created" &&
                            isBuyer &&
                            "Activate Capital Escrow"}
                          {stateLabel === "Created" &&
                            isSeller &&
                            "Awaiting Capital Activation"}
                          {stateLabel === "FundsLocked" &&
                            isSeller &&
                            "Transmit Delivery Manifest"}
                          {stateLabel === "FundsLocked" &&
                            isBuyer &&
                            "Manifest Pending Transmission"}
                          {stateLabel === "ProofSubmitted" &&
                            "Protocol Verification Layer Active"}
                          {stateLabel === "Delivered" &&
                            isBuyer &&
                            "Verify Transmission & Release"}
                          {stateLabel === "Settled" &&
                            "Protocol Execution Finalized"}
                        </h4>
                        <p className="text-sm text-text-slate leading-relaxed">
                          {stateLabel === "Created" &&
                            isBuyer &&
                            "Lock the agreed capital in the immutable SettleOne vault. This action is irreversible and triggers the delivery phase."}
                          {stateLabel === "Created" &&
                            isSeller &&
                            "The protocol instance is initialized. Once the buyer activates the escrow, you will be notified to begin the workflow."}
                          {stateLabel === "FundsLocked" &&
                            isSeller &&
                            "Capital is secured. Transmit your proof of delivery or work manifest to trigger the verification layer."}
                          {stateLabel === "FundsLocked" &&
                            isBuyer &&
                            "The capital is safely locked. Awaiting the seller to transmit delivery proof for your review."}
                          {stateLabel === "ProofSubmitted" &&
                            "The manifest has been broadcasted to verifier nodes. Awaiting cryptographic consensus before release capability is granted."}
                          {stateLabel === "Delivered" &&
                            isBuyer &&
                            "The manifest has been received. You have the right to release funds immediately or raise a dispute if the terms are not met."}
                          {stateLabel === "Settled" &&
                            "All terms of the commitment have been satisfied. The capital has been distributed to the recipient node."}
                        </p>
                      </div>

                      <div className="shrink-0">
                        {stateLabel === "Created" && isBuyer && (
                          <Button
                            size="lg"
                            className="h-16 px-10 gap-3 text-lg"
                            onClick={handleFund}
                            disabled={actionLoading}
                          >
                            {actionLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <>
                                <Wallet className="w-5 h-5" /> Activate Escrow
                              </>
                            )}
                          </Button>
                        )}
                        {stateLabel === "FundsLocked" && isSeller && (
                          <Button
                            size="lg"
                            className="h-16 px-10 gap-3 text-lg group"
                            onClick={() => setIsUploadModalOpen(true)}
                            disabled={actionLoading}
                          >
                            {actionLoading ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <>
                                <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />{" "}
                                Upload Proof
                              </>
                            )}
                          </Button>
                        )}
                        {stateLabel === "Delivered" && isBuyer && (
                          <div className="flex flex-col sm:flex-row gap-4">
                            <Button
                              variant="outline"
                              size="lg"
                              className="h-16 px-8 border-red-500/20 text-red-500 hover:bg-red-500/5 gap-3"
                            >
                              <Gavel className="w-5 h-5" /> Raise Dispute
                            </Button>
                            <Button
                              size="lg"
                              className="h-16 px-10 gap-3 text-lg"
                              onClick={handleConfirm}
                              disabled={actionLoading}
                            >
                              {actionLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                              ) : (
                                <>
                                  <CheckCircle2 className="w-5 h-5" /> Confirm &
                                  Release
                                </>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="lg:col-span-4 space-y-10">
          {/* Protocol Flow */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm tracking-[0.2em] font-mono text-text-slate">
                PROTOCOL FLOW
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-[15px] before:-z-10 before:h-full before:w-0.5 before:bg-text-muted/10">
                {[
                  {
                    label: "Initialized",
                    date: contractDeal.createdAt,
                    active: true,
                  },
                  {
                    label: "Escrow Activated",
                    date: contractDeal.fundedAt,
                    active: Number(contractDeal.fundedAt) > 0,
                  },
                  {
                    label: "Manifest Transmitted",
                    date: contractDeal.proofSubmittedAt,
                    active: Number(contractDeal.proofSubmittedAt) > 0,
                  },
                  {
                    label: "Delivery Finalized",
                    date: contractDeal.deliveredAt,
                    active: Number(contractDeal.deliveredAt) > 0,
                  },
                  {
                    label: "Settlement complete",
                    date: contractDeal.settledAt,
                    active: Number(contractDeal.settledAt) > 0,
                  },
                ].map((step, i) => (
                  <div key={i} className="relative flex items-start gap-6">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full border-2 flex items-center justify-center bg-bg-secondary shrink-0 transition-all duration-500",
                        step.active
                          ? "border-brand-teal text-brand-teal shadow-[0_0_10px_rgba(0,229,160,0.2)]"
                          : "border-text-muted/20 text-text-muted",
                      )}
                    >
                      {step.active ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                      )}
                    </div>
                    <div className="pt-1">
                      <p
                        className={cn(
                          "text-xs font-mono uppercase tracking-widest",
                          step.active
                            ? "text-text-primary font-bold"
                            : "text-text-slate",
                        )}
                      >
                        {step.label}
                      </p>
                      {step.active && (
                        <p className="text-[10px] text-text-slate font-mono mt-1">
                          {new Date(Number(step.date) * 1000).toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Onchain Specs */}
          <Card className="bg-bg-tertiary/10">
            <CardHeader>
              <CardTitle className="text-sm tracking-[0.2em] font-mono text-text-slate">
                NETWORK SPECS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <p className="text-[9px] font-mono uppercase text-text-slate tracking-[0.2em]">
                  Metadata Manifest Hash
                </p>
                <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-bg-primary/50 border border-text-muted/10 group cursor-pointer hover:border-brand-teal/30 transition-all">
                  <span className="text-[10px] font-mono truncate text-brand-teal">
                    {contractDeal.metadataHash}
                  </span>
                  <ExternalLink className="w-3 h-3 text-text-slate shrink-0" />
                </div>
              </div>

              {Number(contractDeal.proofHash) !== 0 && (
                <div className="space-y-1 pt-2 border-t border-white/5">
                  <p className="text-[9px] font-mono uppercase text-text-slate tracking-[0.2em]">
                    Delivery Proof Hash
                  </p>
                  <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-bg-primary/50 border border-text-muted/10 group cursor-pointer hover:border-brand-teal/30 transition-all">
                    <span className="text-[10px] font-mono truncate text-brand-teal">
                      {contractDeal.proofHash}
                    </span>
                    <ExternalLink className="w-3 h-3 text-text-slate shrink-0" />
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-text-muted/5">
                  <span className="text-[10px] font-mono uppercase text-text-slate">
                    Network
                  </span>
                  <span className="text-[10px] font-mono text-brand-teal">
                    Ethereum (Sepolia)
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-text-muted/5">
                  <span className="text-[10px] font-mono uppercase text-text-slate">
                    Verifier Node
                  </span>
                  <span className="text-[10px] font-mono">
                    Chainlink Automation
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-bg-tertiary/50 border border-text-muted/10 flex items-start gap-3">
                <Info className="w-4 h-4 text-brand-teal mt-0.5" />
                <p className="text-[10px] text-text-slate leading-relaxed uppercase tracking-wider">
                  The SettleOne protocol ensures atomic settlement. Funds are
                  cryptographically locked until manifest verification.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Protocol Transmission"
      >
        <FileUpload
          onUploadComplete={handleUploadComplete}
          onCancel={() => setIsUploadModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
