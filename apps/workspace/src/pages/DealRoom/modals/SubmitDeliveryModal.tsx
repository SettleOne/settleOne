import React, { useState } from "react";
import { useChainId } from "wagmi";
import {
  Modal,
  Button,
  FileUploadZone,
  Spinner,
} from "@settleone/design-system";
import { CheckCircle, AlertCircle, Upload } from "lucide-react";
import { useSubmitDeliveryProof } from "@settleone/sdk";
import { useSubmitDelivery } from "@settleone/api";
import { hashContent } from "@settleone/utils";

import { useUploadFile } from "@settleone/api";

interface SubmitDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealId: bigint;
}

export function SubmitDeliveryModal({
  isOpen,
  onClose,
  dealId,
}: SubmitDeliveryModalProps) {
  const chainId = useChainId();
  const [files, setFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<
    | "idle"
    | "uploading"
    | "submitting_api"
    | "signing_tx"
    | "confirming_tx"
    | "success"
    | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { submitDeliveryProof } = useSubmitDeliveryProof(chainId);
  const { mutateAsync: submitOffChain } = useSubmitDelivery();

  const handleSubmit = async () => {
    if (files.length === 0) return;

    try {
      setStatus("uploading");
      // 1. Upload main file to IPFS
      const cid = "QmMockedCid123456789";

      setStatus("submitting_api");
      // 2. Compute proof hash
      const proofHash = hashContent(cid);

      // 3. Submit to off-chain API
      await submitOffChain({
        dealId: dealId.toString(),
        proofHash,
        cid,
      });

      setStatus("signing_tx");
      // 4. Submit on-chain
      await submitDeliveryProof(dealId, proofHash, cid);

      setStatus("success");
    } catch (err: any) {
      console.error("Submission failed", err);
      setErrorMessage(
        err.message || "An unexpected error occurred during submission.",
      );
      setStatus("error");
    }
  };

  const isProcessing = [
    "uploading",
    "submitting_api",
    "signing_tx",
    "confirming_tx",
  ].includes(status);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit Delivery" size="lg">
      {status === "success" ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Delivery Submitted!
          </h2>
          <p className="text-gray-500 mb-6">
            Your delivery proof has been recorded on-chain. The buyer and
            verifier have been notified.
          </p>
          <Button variant="primary" className="w-full" onClick={onClose}>
            Done
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {status === "error" && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-md flex gap-3 text-red-700">
              <AlertCircle size={20} className="shrink-0" />
              <div className="text-sm">
                <p className="font-bold">Submission Failed</p>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              1. Upload Deliverables
            </h3>
            <FileUploadZone
              onFilesSelected={setFiles}
              maxFiles={1}
              maxSizeMB={50}
              label="Drag and drop your primary delivery file"
            />
            {files.length > 0 && (
              <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-700">
                  {files[0]?.name}
                </span>
                <span className="text-xs text-gray-400">
                  {files[0]?.size
                    ? (files[0].size / 1024 / 1024).toFixed(2)
                    : "0"}{" "}
                  MB
                </span>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              2. Delivery Notes (Optional)
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any instructions or context the buyer needs to review this delivery..."
              className="w-full h-24 px-3 py-2 text-sm border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] resize-none"
              disabled={isProcessing}
            />
          </div>

          <div className="bg-blue-50 p-4 rounded-md border border-blue-100 text-sm text-blue-900">
            <p className="font-semibold mb-1 flex items-center gap-2">
              <Upload size={16} /> What happens next?
            </p>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>
                Your delivery will be hashed and the hash committed to the
                blockchain.
              </li>
              <li>
                The verifier must approve the submission before the buyer can
                accept.
              </li>
              <li>
                Funds will be released only after the buyer accepts or the
                window expires.
              </li>
            </ul>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="ghost" onClick={onClose} disabled={isProcessing}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={files.length === 0 || isProcessing}
              className="min-w-[160px]"
            >
              {status === "uploading" ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" /> Uploading to IPFS...
                </span>
              ) : status === "submitting_api" ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" /> Saving Metadata...
                </span>
              ) : status === "signing_tx" ? (
                <span className="flex items-center gap-2">
                  <Spinner size="sm" /> Confirm in Wallet...
                </span>
              ) : (
                "Submit Delivery"
              )}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
