import React, { useState } from 'react';
import { Modal, Button, FileUploadZone } from '@settleone/design-system';
import { AlertTriangle } from 'lucide-react';

interface DisputeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string, evidenceFiles: File[]) => void;
}

export function DisputeModal({ isOpen, onClose, onSubmit }: DisputeModalProps) {
  const [reason, setReason] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = () => {
    onSubmit(reason, files);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Open Dispute" size="lg">
      <div className="space-y-6">
        
        <div className="bg-red-50 p-4 rounded-md border border-red-100 flex gap-3 text-red-900">
          <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={20} />
          <div className="text-sm">
            <p className="font-semibold mb-1">Are you sure you want to open a dispute?</p>
            <p>Opening a dispute pauses the deal and escalates it to the selected Dispute Resolver. This process may take time and could involve resolution fees.</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Reason for Dispute *</h3>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Clearly explain the issue, what was agreed upon, and what went wrong..."
            className="w-full h-32 px-3 py-2 text-sm border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            required
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Evidence Files</h3>
          <p className="text-xs text-gray-500 mb-2">Upload screenshots, logs, or any other proof to support your claim.</p>
          <FileUploadZone 
            onFilesSelected={setFiles} 
            maxFiles={10} 
            label="Upload Evidence" 
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            variant="danger" 
            onClick={handleSubmit}
            disabled={reason.trim().length < 20}
          >
            Escalate to Dispute
          </Button>
        </div>
      </div>
    </Modal>
  );
}
