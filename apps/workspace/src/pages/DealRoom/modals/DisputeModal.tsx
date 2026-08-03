import React, { useState } from "react";
import { Modal, Button, FileUploadZone } from "@settleone/design-system";
import { AlertTriangle, Loader2, CheckCircle2 } from "lucide-react";
import { useChainId } from "wagmi";
import { useRaiseDispute } from "@settleone/sdk";
import { apiClient, useUploadFile } from "@settleone/api";

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealId: bigint;
}

type DisputeStatus =
  "idle" | "uploading" | "submitting_api" | "signing_tx" | "success" | "error";

export function DisputeModal({ isOpen, onClose, dealId }: DisputeModalProps) {
  const [reason, setReason] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<DisputeStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const chainId = useChainId();
  const { raiseDispute, isPending, isConfirming, isSuccess } =
    useRaiseDispute(chainId);
  const { mutateAsync: uploadFile } = useUploadFile();

  const handleSubmit = async () => {
    try {
      setStatus("uploading");
      setErrorMessage("");

      // Upload evidence files
      const fileIds = [];
      for (const file of files) {
        const result = await uploadFile({
          file,
          dealId: dealId.toString(),
          context: "dispute",
        });
        fileIds.push(result.file.id);
      }

      setStatus("submitting_api");
      // Submit to backend
      const result = await apiClient<any>("/disputes", {
        method: "POST",
        body: JSON.stringify({
          dealId: dealId.toString(),
          reason,
          evidenceFileIds: fileIds,
        }),
      });

      setStatus("signing_tx");
      // Raise dispute on-chain
      await raiseDispute(dealId, result.reasonHash, result.evidenceHash);
      setStatus("success");
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to raise dispute");
      setStatus("error");
    }
  };

  const isWorking =
    status !== "idle" && status !== "error" && status !== "success";
  const txLoading = isWorking || isPending || isConfirming;

  return (
    <Modal
      isOpen={isOpen}
      onClose={status === "success" ? onClose : isWorking ? () => {} : onClose}
      title="Open Dispute"
      size="lg"
    >
      <div className="space-y-6">
        {status === "success" || isSuccess ? (
          <div className="py-8 flex flex-col items-center text-center">
            <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-xl font-bold mb-2">
              Dispute Raised Successfully
            </h3>
            <p className="text-gray-500 mb-6">
              The dispute resolver will review your evidence.
            </p>
            <Button onClick={onClose} variant="primary">
              Close
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-red-50 p-4 rounded-md border border-red-100 flex gap-3 text-red-900">
              <AlertTriangle
                className="text-red-600 shrink-0 mt-0.5"
                size={20}
              />
              <div className="text-sm">
                <p className="font-semibold mb-1">
                  Are you sure you want to open a dispute?
                </p>
                <p>
                  Opening a dispute pauses the deal and escalates it to the
                  selected Dispute Resolver. This process may take time and
                  could involve resolution fees.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Reason for Dispute *
              </h3>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Clearly explain the issue, what was agreed upon, and what went wrong..."
                className="w-full h-32 px-3 py-2 text-sm border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                required
                disabled={txLoading}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Evidence Files
              </h3>
              <p className="text-xs text-gray-500 mb-2">
                Upload screenshots, logs, or any other proof to support your
                claim.
              </p>
              <FileUploadZone
                onFilesSelected={setFiles}
                maxFiles={10}
                label="Upload Evidence"
              />
            </div>

            {status === "error" && (
              <div className="text-red-600 text-sm font-medium">
                {errorMessage}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <Button variant="ghost" onClick={onClose} disabled={txLoading}>
                Cancel
              </Button>
              <Button
                variant="danger"
                onClick={handleSubmit}
                disabled={reason.trim().length < 20 || txLoading}
              >
                {txLoading ? (
                  <span className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {status === "uploading"
                      ? "Uploading..."
                      : status === "submitting_api"
                        ? "Saving..."
                        : "Confirming..."}
                  </span>
                ) : (
                  "Escalate to Dispute"
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
