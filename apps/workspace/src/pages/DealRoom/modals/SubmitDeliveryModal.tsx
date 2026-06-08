import React, { useState } from 'react';
import { Modal, Button, FileUploadZone, Input } from '@settleone/design-system';

interface SubmitDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (files: File[], notes: string) => void;
}

export function SubmitDeliveryModal({ isOpen, onClose, onSubmit }: SubmitDeliveryModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onSubmit(files, notes);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Submit Delivery" size="lg">
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">1. Upload Deliverables</h3>
          <FileUploadZone 
            onFilesSelected={setFiles} 
            maxFiles={10} 
            maxSizeMB={50} 
            label="Drag and drop delivery files here" 
          />
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">2. Delivery Notes (Optional)</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add any instructions, passwords, or context the buyer needs to review this delivery..."
            className="w-full h-32 px-3 py-2 text-sm border border-[var(--border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--accent-blue)] resize-none"
          />
        </div>

        <div className="bg-blue-50 p-4 rounded-md border border-blue-100 text-sm text-blue-900">
          <p className="font-semibold mb-1">What happens next?</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>The buyer will be notified to review your submission.</li>
            <li>They have a 7-day Acceptance Window to accept or request revisions.</li>
            <li>If they do nothing, you can auto-finalize the deal after the window expires.</li>
          </ul>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit}
            disabled={files.length === 0}
          >
            Submit Delivery
          </Button>
        </div>
      </div>
    </Modal>
  );
}
