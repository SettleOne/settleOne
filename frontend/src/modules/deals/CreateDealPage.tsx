import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useWalletClient, usePublicClient, useAccount } from "wagmi";
import { parseEther, zeroAddress, decodeEventLog } from "viem";
import {
  Loader2,
  ArrowLeft,
  Shield,
  Clock,
  FileText,
  ChevronRight,
  Sparkles,
  Send,
  Globe,
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
import { dealsSdk } from "../../sdk/deals";
import { apiClient } from "../../api/apiClient";
import { DEAL_MANAGER_ABI } from "../../constants/abis";
import { cn } from "../../utils/cn";

const createDealSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  buyerWallet: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address"),
  amount: z.string().min(1, "Amount is required"),
  deliveryDeadline: z.string().min(1, "Deadline is required"),
  disputeWindow: z.number().min(1).max(30),
});

type CreateDealForm = z.infer<typeof createDealSchema>;

export function CreateDealPage() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateDealForm>({
    resolver: zodResolver(createDealSchema),
    defaultValues: {
      disputeWindow: 3,
    },
  });

  const onSubmit = async (data: CreateDealForm) => {
    if (!walletClient || !publicClient || !address) {
      setError("Please connect your wallet first");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Create Draft Deal in Backend (Off-chain metadata)
      setLoadingMsg("Storing deal metadata...");
      const { data: backendResponse } = await apiClient.post("/deals", {
        title: data.title,
        description: data.description,
        buyerWallet: data.buyerWallet,
        amountWei: parseEther(data.amount).toString(),
        currencySymbol: "ETH",
        deadlineAt: new Date(data.deliveryDeadline).toISOString(),
        metadata: {
          disputeWindowDays: data.disputeWindow,
          termsVersion: "1.0",
        },
      });

      const offChainDealId = backendResponse.data.id;

      // Step 2: Create Deal on Smart Contract
      setLoadingMsg("Awaiting contract confirmation...");
      const txHash = await dealsSdk.createDeal(walletClient, publicClient, {
        buyer: data.buyerWallet as `0x${string}`,
        seller: address as `0x${string}`,
        token: zeroAddress,
        amount: data.amount,
        deliveryDeadline: Math.floor(
          new Date(data.deliveryDeadline).getTime() / 1000,
        ),
        disputeWindow: data.disputeWindow * 24 * 60 * 60,
        termsHash:
          "0x0000000000000000000000000000000000000000000000000000000000000000", // Default
        metadataHash:
          "0x0000000000000000000000000000000000000000000000000000000000000000", // We could hash off-chain ID
        verifier: zeroAddress,
        disputeResolver: zeroAddress,
      });

      setLoadingMsg("Waiting for transaction to be mined...");
      const receipt = await publicClient.waitForTransactionReceipt({
        hash: txHash,
      });

      // Step 3: Extract Contract Deal ID from logs
      let contractDealId: bigint | null = null;
      for (const log of receipt.logs) {
        try {
          const event = decodeEventLog({
            abi: DEAL_MANAGER_ABI,
            data: log.data,
            topics: log.topics,
          });
          if (event.eventName === "DealCreated") {
            contractDealId = (event.args as any).dealId;
            break;
          }
        } catch (e) {
          /* skip */
        }
      }

      if (!contractDealId)
        throw new Error("Could not find DealCreated event in transaction");

      // Step 4: Link On-chain ID with Backend
      setLoadingMsg("Finalizing deal linkage...");
      await apiClient.patch(`/deals/${offChainDealId}/link-chain`, {
        contractDealId: contractDealId.toString(),
        escrowContractAddress: receipt.to,
      });

      navigate(`/deals/${contractDealId}`);
    } catch (err: any) {
      console.error("Create deal error:", err);
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to create deal. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto px-4 py-12 relative z-10">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate("/deals")}
        className="flex items-center gap-2 text-text-slate hover:text-brand-teal transition-colors mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Return to Dashboard
        </span>
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="space-y-2">
            <h1 className="font-syne font-extrabold text-4xl md:text-5xl tracking-tight">
              Initialize <span className="text-brand-teal">Commitment</span>
            </h1>
            <p className="text-text-slate font-mono text-xs uppercase tracking-[0.2em]">
              Secure a new B2B payment obligation onchain
            </p>
          </div>

          <Card className="p-1">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-8">
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-3">
                  <Sparkles className="w-4 h-4 rotate-180" />
                  <p>{error}</p>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-slate ml-1">
                      Project Title
                    </label>
                    <input
                      {...register("title")}
                      className={cn(
                        "w-full bg-bg-tertiary/50 border rounded-xl px-5 py-4 focus:outline-none focus:border-brand-teal transition-all text-lg font-syne",
                        errors.title
                          ? "border-red-500/50"
                          : "border-text-muted/10",
                      )}
                      placeholder="e.g. Enterprise API Suite"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-[10px] mt-1 ml-1">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-slate ml-1">
                      Buyer Address
                    </label>
                    <div className="relative">
                      <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input
                        {...register("buyerWallet")}
                        className={cn(
                          "w-full bg-bg-tertiary/50 border rounded-xl pl-12 pr-5 py-4 focus:outline-none focus:border-brand-teal transition-all font-mono text-sm",
                          errors.buyerWallet
                            ? "border-red-500/50"
                            : "border-text-muted/10",
                        )}
                        placeholder="0x..."
                      />
                    </div>
                    {errors.buyerWallet && (
                      <p className="text-red-500 text-[10px] mt-1 ml-1">
                        {errors.buyerWallet.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-slate ml-1">
                    Scope of Work
                  </label>
                  <textarea
                    {...register("description")}
                    rows={4}
                    className={cn(
                      "w-full bg-bg-tertiary/50 border rounded-xl px-5 py-4 focus:outline-none focus:border-brand-teal transition-all leading-relaxed",
                      errors.description
                        ? "border-red-500/50"
                        : "border-text-muted/10",
                    )}
                    placeholder="Describe the deliverables in detail..."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-[10px] mt-1 ml-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-slate ml-1">
                      Capital (ETH)
                    </label>
                    <input
                      {...register("amount")}
                      type="number"
                      step="0.001"
                      className={cn(
                        "w-full bg-bg-tertiary/50 border rounded-xl px-5 py-4 focus:outline-none focus:border-brand-teal transition-all font-syne font-bold",
                        errors.amount
                          ? "border-red-500/50"
                          : "border-text-muted/10",
                      )}
                      placeholder="0.00"
                    />
                    {errors.amount && (
                      <p className="text-red-500 text-[10px] mt-1 ml-1">
                        {errors.amount.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-slate ml-1">
                      Deadline
                    </label>
                    <input
                      {...register("deliveryDeadline")}
                      type="datetime-local"
                      className={cn(
                        "w-full bg-bg-tertiary/50 border rounded-xl px-5 py-4 focus:outline-none focus:border-brand-teal transition-all",
                        errors.deliveryDeadline
                          ? "border-red-500/50"
                          : "border-text-muted/10",
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-slate ml-1">
                      Dispute Window (Days)
                    </label>
                    <input
                      {...register("disputeWindow", { valueAsNumber: true })}
                      type="number"
                      className={cn(
                        "w-full bg-bg-tertiary/50 border rounded-xl px-5 py-4 focus:outline-none focus:border-brand-teal transition-all",
                        errors.disputeWindow
                          ? "border-red-500/50"
                          : "border-text-muted/10",
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full h-16 text-lg group"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span className="animate-pulse">{loadingMsg}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span>Deploy Commitment Protocol</span>
                    </div>
                  )}
                </Button>
                <p className="text-center text-[10px] font-mono text-text-slate uppercase tracking-[0.3em] mt-6">
                  Transaction will be processed on the connected network
                </p>
              </div>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          <Card className="bg-brand-teal/[0.03] border-brand-teal/10">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-teal" />
                SettleOne Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                {
                  icon: Shield,
                  title: "Zero-Trust Escrow",
                  desc: "Capital is locked in an immutable vault until verification.",
                },
                {
                  icon: Clock,
                  title: "Automated Deadlines",
                  desc: "Protocols auto-expire if commitments aren't met.",
                },
                {
                  icon: Globe,
                  title: "Onchain Verification",
                  desc: "Proof is hashed and permanently recorded.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-bg-secondary flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-text-primary">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-text-slate leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-bg-tertiary/20">
            <CardHeader>
              <CardTitle className="text-base">Draft Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 font-mono text-[10px] uppercase tracking-widest text-text-slate">
                <div className="flex justify-between border-b border-text-muted/5 pb-2">
                  <span>Contract</span>
                  <span className="text-brand-teal">DealManager.v1</span>
                </div>
                <div className="flex justify-between border-b border-text-muted/5 pb-2">
                  <span>Capital</span>
                  <span className="text-text-primary">
                    {watch("amount") || "0.00"} ETH
                  </span>
                </div>
                <div className="flex justify-between border-b border-text-muted/5 pb-2">
                  <span>Resolver</span>
                  <span className="text-text-primary">Standard</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span className="text-brand-gold">0.00%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
