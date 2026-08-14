import React, { useState } from "react";
import { Modal, Button, FileUploadZone } from "@settleone/design-system";
import { RefreshCw, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useChainId } from "wagmi";
import { useRequestRevision } from "@settleone/sdk";
import { useUploadFile } from "@settleone/api";
import { useRequireWallet } from "../../../hooks/useRequireWallet";
import { hashContent } from "@settleone/utils";

interface RequestRevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealId: bigint;
}

type RevisionStatus =
  "idle" | "uploading" | "signing_tx" | "confirming_tx" | "success" | "error";

export function RequestRevisionModal({
  isOpen,
  onClose,
  dealId,
}: RequestRevisionModalProps) {
  const [reason, setReason] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<RevisionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const chainId = useChainId();
  const { requestRevision, isPending, isConfirming, isSuccess } =
    useRequestRevision(chainId);
  const { mutateAsync: uploadFile } = useUploadFile();
  const { requireWallet, WalletPromptModal } = useRequireWallet();

  const handleSubmit = () => {
    if (!reason.trim()) return;

    requireWallet(async () => {
      try {
        setErrorMessage("");
        setStatus("uploading");

        // Upload evidence files and collect their CIDs/hashes
        let evidenceCid = "";
        if (files.length > 0) {
          const result = await uploadFile({
            file: files[0],
            dealId: dealId.toString(),
            context: "revision",
          });
          evidenceCid = result.file.id;
        }

        // Hash the reason text to produce a bytes32 reasonHash
        const reasonHash = hashContent(reason) as `0x${string}`;

        // Hash the evidence CID (or a zero hash if no files were attached)
        const evidenceHash = evidenceCid
          ? (hashContent(evidenceCid) as `0x${string}`)
          : "0x0000000000000000000000000000000000000000000000000000000000000000";

        setStatus("signing_tx");
        requestRevision(dealId, reasonHash, evidenceHash);

        setStatus("success");
      } catch (err: any) {
        console.error("Revision request failed:", err);
        setErrorMessage(err.message || "Failed to submit revision request.");
        setStatus("error");
      }
    });
  };

  const isWorking =
    status === "uploading" ||
    status === "signing_tx" ||
    status === "confirming_tx" ||
    isPending ||
    isConfirming;

  const succeeded = status === "success" || isSuccess;

  const getButtonLabel = () => {
    if (status === "uploading") return "Uploading Evidence...";
    if (status === "signing_tx" || isPending) return "Sign in Wallet...";
    if (status === "confirming_tx" || isConfirming) return "Confirming...";
    return "Request Revision";
  };

  const handleClose = () => {
    if (isWorking) return;
    // Reset state on close
    setReason("");
    setFiles([]);
    setStatus("idle");
    setErrorMessage("");
    onClose();
  };

  return (
    <>
      <WalletPromptModal />
      <Modal
        isOpen={isOpen}
        onClose={handleClose}
        title="Request Revision"
        size="lg"
      >
        <div className="space-y-6">
          {succeeded ? (
            // ── SUCCESS STATE ──────────────────────────────────────────
            <div className="py-8 flex flex-col items-center text-center">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                Revision Requested
              </h3>
              <p className="text-[var(--text-secondary)] mb-6">
                Your revision request has been recorded on-chain. The seller
                will be notified and must re-submit the delivery.
              </p>
              <Button onClick={handleClose} variant="primary">
                Close
              </Button>
            </div>
          ) : (
            // ── FORM STATE ─────────────────────────────────────────────
            <>
              {/* Info Banner */}
              <div className="bg-amber-50 p-4 rounded-md border border-amber-100 flex gap-3 text-amber-900">
                <RefreshCw
                  className="text-amber-600 shrink-0 mt-0.5"
                  size={18}
                />
                <div className="text-sm">
                  <p className="font-semibold mb-1">Request a Revision</p>
                  <p>
                    Explain what needs to be corrected. The seller must
                    re-submit the delivery before the deadline. This action is
                    recorded on-chain.
                  </p>
                </div>
              </div>

              {/* Error Banner */}
              {status === "error" && (
                <div className="bg-red-50 p-3 rounded-md border border-red-100 flex gap-2 text-red-700 text-sm">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Reason Textarea */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
                  Reason for Revision <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Describe clearly what is missing or incorrect in the delivery..."
                  rows={4}
                  disabled={isWorking}
                  className="w-full px-3 py-2 text-sm border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-
  [var(--accent-blue)] resize-none bg-[var(--bg-card)] text-[var(--text-primary)] disabled:opacity-60"
                />
              </div>

              {/* Evidence Upload (Optional) */}
              <div>
                <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                  Supporting Evidence{" "}
                  <span className="text-[var(--text-muted)] font-normal">
                    (Optional)
                  </span>
                </label>
                <FileUploadZone
                  onFilesSelected={setFiles}
                  maxFiles={1}
                  maxSizeMB={20}
                  label="Attach a screenshot or document showing the issue"
                />
                {files.length > 0 && (
                  <div className="mt-2 p-2 bg-[var(--bg-subtle)] rounded border border-[var(--border)] flex items-center justify-between">
                    <span className="text-xs font-medium text-[var(--text-primary)]">
                      {files[0]?.name}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">
                      {files[0]?.size
                        ? (files[0].size / 1024 / 1024).toFixed(2)
                        : "0"}{" "}
                      MB
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
                <Button
                  variant="ghost"
                  onClick={handleClose}
                  disabled={isWorking}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={!reason.trim() || isWorking}
                  className="min-w-[180px] flex items-center justify-center gap-2"
                >
                  {isWorking ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {getButtonLabel()}
                    </>
                  ) : (
                    <>
                      <RefreshCw size={16} />
                      Request Revision
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}
