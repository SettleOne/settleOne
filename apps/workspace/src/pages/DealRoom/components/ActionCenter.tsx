import React, { useState } from 'react';
import { DealState } from '@settleone/types';
import { AlertCircle, Wallet, PlayCircle, FileText, CheckCircle, Search } from 'lucide-react';
import { Button } from '@settleone/design-system';
import { FundDealModal } from '../modals/FundDealModal';
import { SubmitDeliveryModal } from '../modals/SubmitDeliveryModal';
import { DisputeModal } from '../modals/DisputeModal';

interface ActionCenterProps {
  currentState: DealState;
  userRole: 'buyer' | 'seller' | 'none';
}

export function ActionCenter({ currentState, userRole }: ActionCenterProps) {
  const [isFundModalOpen, setFundModalOpen] = useState(false);
  const [isDeliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [isDisputeModalOpen, setDisputeModalOpen] = useState(false);

  const renderAwaitingFunding = () => {
    if (userRole === 'buyer') {
      return (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Wallet size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Funding Required</h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
            You need to deposit 5,000 USDC into the Escrow Vault to activate this deal. Funds will securely generate yield while awaiting delivery.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="secondary">Cancel Deal</Button>
            <Button variant="primary" onClick={() => setFundModalOpen(true)}>Fund Deal (5,000 USDC)</Button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <Wallet size={24} />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Awaiting Buyer Funding</h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          The buyer has created this deal but has not yet deposited the required funds. You will be able to accept it once funded.
        </p>
      </div>
    );
  };

  const renderActive = () => {
    if (userRole === 'seller') {
      return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <PlayCircle size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Deal Active</h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
            You are now bound by this deal. Please proceed with the work and submit your delivery proof before the deadline.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="primary" onClick={() => setDeliveryModalOpen(true)}>Submit Delivery</Button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search size={24} />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Work in Progress</h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          The seller is currently working on the deliverables. You will be notified when they submit the delivery.
        </p>
      </div>
    );
  };

  const renderDeliverySubmitted = () => {
    if (userRole === 'buyer') {
      return (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText size={24} />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Delivery Received</h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
            The seller has submitted the delivery. Please review the materials and accept or request a revision.
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="danger" onClick={() => setDisputeModalOpen(true)}>Open Dispute</Button>
            <Button variant="secondary">Request Revision</Button>
            <Button variant="primary">Accept & Release Funds</Button>
          </div>
        </div>
      );
    }
    return (
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
        <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={24} />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Delivery Submitted</h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Waiting for the buyer to review and accept the delivery. If they don't respond within the acceptance window, you can finalize the deal.
        </p>
      </div>
    );
  };

  const renderFallback = () => (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
      <AlertCircle size={24} className="text-gray-400 mx-auto mb-4" />
      <h2 className="text-lg font-bold text-gray-900 mb-2">No Actions Available</h2>
      <p className="text-sm text-gray-600 max-w-md mx-auto">
        There are no actions you can take at this stage of the deal.
      </p>
    </div>
  );

  return (
    <div className="mb-6">
      {currentState === DealState.AwaitingFunding && renderAwaitingFunding()}
      {currentState === DealState.Active && renderActive()}
      {currentState === DealState.DeliverySubmitted && renderDeliverySubmitted()}
      {![DealState.AwaitingFunding, DealState.Active, DealState.DeliverySubmitted].includes(currentState) && renderFallback()}

      {/* Modals */}
      <FundDealModal 
        isOpen={isFundModalOpen} 
        onClose={() => setFundModalOpen(false)} 
        onFund={(amt, tok) => { console.log('Fund', amt, tok); setFundModalOpen(false); }} 
        requiredAmount="5,000" 
      />
      <SubmitDeliveryModal 
        isOpen={isDeliveryModalOpen} 
        onClose={() => setDeliveryModalOpen(false)} 
        onSubmit={(files, notes) => { console.log('Delivery', files, notes); setDeliveryModalOpen(false); }} 
      />
      <DisputeModal 
        isOpen={isDisputeModalOpen} 
        onClose={() => setDisputeModalOpen(false)} 
        onSubmit={(reason, files) => { console.log('Dispute', reason, files); setDisputeModalOpen(false); }} 
      />
    </div>
  );
}
