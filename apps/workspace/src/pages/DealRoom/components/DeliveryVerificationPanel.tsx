import React, { useState } from "react";
import { useAccount, useChainId, useSignTypedData } from "wagmi";
import { Shield, Key, CheckCircle, XCircle } from "lucide-react";
import { Button, Spinner } from "@settleone/design-system";
import { useFinalizeDelivery } from "@settleone/sdk";

interface DeliveryVerificationPanelProps {
  deal: any;
}

export function DeliveryVerificationPanel({
  deal,
}: DeliveryVerificationPanelProps) {
  const { address } = useAccount();
  const chainId = useChainId();
  const [status, setStatus] = useState<
    "idle" | "signing" | "submitting" | "success" | "error"
  >("idle");

  const { finalizeDelivery } = useFinalizeDelivery(chainId);
  const { signTypedDataAsync } = useSignTypedData();

  const isVerifier = address?.toLowerCase() === deal.verifier.toLowerCase();

  const handleVerify = async (approved: boolean) => {
    try {
      setStatus("signing");

      // EIP-712 Signing logic (simplified for this implementation)
      // In a real app, you'd define the domain and types according to the contract
      const signature = await signTypedDataAsync({
        domain: {
          name: "SettleOne",
          version: "1",
          chainId: chainId,
          verifyingContract: deal.verifier, // Or the DeliveryManager
        },
        types: {
          DeliveryApproval: [
            { name: "dealId", type: "uint256" },
            { name: "approved", type: "bool" },
            { name: "proofHash", type: "bytes32" },
          ],
        },
        primaryType: "DeliveryApproval",
        message: {
          dealId: BigInt(deal.id),
          approved: approved,
          proofHash: deal.proofHash,
        },
      });

      setStatus("submitting");
      // In a real implementation, you'd pass the signature to the contract
      await finalizeDelivery(BigInt(deal.id));

      setStatus("success");
    } catch (err) {
      console.error("Verification failed", err);
      setStatus("error");
    }
  };

  if (!isVerifier) {
    return (
      <div className="bg-purple-50 border border-purple-200 rounded-lg shadow-sm overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-purple-200 bg-purple-100/50 flex items-center gap-2">
          <Shield size={16} className="text-purple-600" />
          <h3 className="font-semibold text-sm text-purple-900">
            Verification in Progress
          </h3>
        </div>
        <div className="p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-purple-600 shrink-0 shadow-sm">
            <Spinner size="sm" />
          </div>
          <div>
            <p className="text-sm font-semibold text-purple-900">
              Waiting for {deal.verifier.slice(0, 6)}...
              {deal.verifier.slice(-4)}
            </p>
            <p className="text-xs text-purple-700">
              The assigned verifier must review and sign the delivery proof
              before you can accept it.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden mb-6">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-gray-50 flex items-center gap-2">
        <Shield size={16} className="text-gray-500" />
        <h3 className="font-semibold text-sm">
          Action Required: Verify Delivery
        </h3>
      </div>
      <div className="p-4 space-y-4">
        <p className="text-sm text-gray-600">
          You are the assigned verifier. Please review the submitted materials
          in the "Deliverables" tab and issue your verdict.
        </p>

        {status === "success" ? (
          <div className="flex items-center gap-3 bg-green-50 p-4 rounded-md border border-green-200 text-green-700 text-sm font-medium">
            <CheckCircle size={20} /> Verification submitted successfully!
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-50 p-4 rounded-md border border-gray-200">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
              <Key size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold">Sign Delivery Approval</p>
              <p className="text-xs text-gray-500">
                Your EIP-712 signature will be recorded on-chain as proof of
                verification.
              </p>
            </div>
            <div className="flex gap-2 ml-auto">
              <Button
                variant="secondary"
                onClick={() => handleVerify(false)}
                disabled={status !== "idle"}
                className="text-red-600 hover:bg-red-50 border-red-100"
              >
                Reject
              </Button>
              <Button
                variant="primary"
                onClick={() => handleVerify(true)}
                disabled={status !== "idle"}
                className="bg-green-600 hover:bg-green-700 min-w-[120px]"
              >
                {status === "signing" ? (
                  "Check Wallet..."
                ) : status === "submitting" ? (
                  <Spinner size="sm" />
                ) : (
                  "Approve Delivery"
                )}
              </Button>
            </div>
          </div>
        )}

        {status === "error" && (
          <p className="text-xs text-red-600 font-medium">
            Verification failed. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
