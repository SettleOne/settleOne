import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronRight, FileText, Wallet, ShieldCheck, Link2 } from 'lucide-react';
import { Button, Input, Select, Modal } from '@settleone/design-system';
import { DealType } from '@settleone/types';

export function CreateDealPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [newDealId, setNewDealId] = useState('');

  // Form State
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [title, setTitle] = useState('');
  const [dealType, setDealType] = useState<DealType>(DealType.SoftDelivery);
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('USDC');
  const [deliveryDeadline, setDeliveryDeadline] = useState('');

  const steps = [
    { num: 1, title: 'Role & Basics', icon: <FileText size={18} /> },
    { num: 2, title: 'Terms & Funding', icon: <Wallet size={18} /> },
    { num: 3, title: 'Rules & Verifiers', icon: <ShieldCheck size={18} /> },
    { num: 4, title: 'Review & Sign', icon: <Check size={18} /> }
  ];

  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleCreate = () => {
    // Mocking the blockchain transaction
    setTimeout(() => {
      setNewDealId('DL-00146');
      setSuccessModalOpen(true);
    }, 1500);
  };

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">I am acting as the:</h3>
        <div className="grid grid-cols-2 gap-4">
          <div 
            onClick={() => setRole('buyer')}
            className={`cursor-pointer border rounded-xl p-5 transition-all ${role === 'buyer' ? 'border-[var(--accent-blue)] bg-blue-50 ring-1 ring-[var(--accent-blue)]' : 'border-gray-200 hover:border-blue-300'}`}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 font-bold mb-3">B</div>
            <h4 className="font-bold text-gray-900 mb-1">Buyer</h4>
            <p className="text-xs text-gray-500">I will fund the escrow vault and receive the final delivery.</p>
          </div>
          <div 
            onClick={() => setRole('seller')}
            className={`cursor-pointer border rounded-xl p-5 transition-all ${role === 'seller' ? 'border-[var(--accent-blue)] bg-blue-50 ring-1 ring-[var(--accent-blue)]' : 'border-gray-200 hover:border-blue-300'}`}
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-600 font-bold mb-3">S</div>
            <h4 className="font-bold text-gray-900 mb-1">Seller</h4>
            <p className="text-xs text-gray-500">I will perform the work, submit the delivery, and receive the payout.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-[var(--border)]">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deal Title</label>
          <Input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="e.g. Smart Contract Audit, Component Sourcing..." 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deal Category</label>
          <Select 
            value={dealType === DealType.SoftDelivery ? 'soft' : 'hard'}
            onChange={(e) => setDealType(e.target.value === 'soft' ? DealType.SoftDelivery : DealType.HardDelivery)}
            options={[
              { value: 'soft', label: 'Digital Services (Soft Delivery)' },
              { value: 'hard', label: 'Physical Goods (Hard Delivery)' }
            ]}
          />
          <p className="text-xs text-gray-500 mt-1">Physical goods will require a valid tracking number or 3rd-party logistics verification.</p>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <Input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="5,000" type="number" className="pl-7" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Token</label>
          <Select 
            value={token}
            onChange={(e) => setToken(e.target.value)}
            options={[
              { value: 'USDC', label: 'USDC' },
              { value: 'USDT', label: 'USDT' },
              { value: 'DAI', label: 'DAI' }
            ]}
          />
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 flex items-start gap-3">
        <Wallet className="text-purple-600 shrink-0 mt-0.5" size={20} />
        <div className="text-sm text-purple-900">
          <p className="font-semibold mb-1">Yield Generation Active</p>
          <p>These funds will automatically be supplied to Aave V3 while held in escrow. Yield is distributed proportionally at settlement.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border)]">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Deadline</label>
          <Input type="date" value={deliveryDeadline} onChange={(e) => setDeliveryDeadline(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Acceptance Window (Days)</label>
          <Input type="number" defaultValue="7" />
          <p className="text-xs text-gray-500 mt-1">Time given to buyer to review the delivery.</p>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Verifier (Optional)</label>
        <Select 
          options={[
            { value: 'none', label: 'None (Direct Buyer Acceptance)' },
            { value: 'chainlink', label: 'Chainlink AnyAPI Verifier' },
            { value: 'custom', label: 'Custom Address' }
          ]}
        />
        <p className="text-xs text-gray-500 mt-1">If set, an oracle or 3rd party must programmatically verify the delivery before the buyer can accept it.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Dispute Resolver</label>
        <Select 
          options={[
            { value: 'kleros', label: 'Kleros Court (Decentralized)' },
            { value: 'settleone', label: 'SettleOne Protocol Arbitrators' },
            { value: 'custom', label: 'Custom Arbitrator Address' }
          ]}
        />
      </div>

      <div className="pt-4 border-t border-[var(--border)] space-y-4">
        <h4 className="text-sm font-semibold text-gray-900">Advanced Settlement Rules</h4>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded text-[var(--accent-blue)]" defaultChecked />
          <span className="text-sm text-gray-700">Allow Partial Settlements (e.g., 50% release, 50% refund)</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="rounded text-[var(--accent-blue)]" />
          <span className="text-sm text-gray-700">Require EIP-712 cryptographic signature on final delivery</span>
        </label>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="bg-gray-50 border border-[var(--border)] rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4 text-gray-900">Summary</h3>
        
        <div className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Title</span>
            <span className="font-medium text-gray-900">{title || 'Untitled Deal'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Your Role</span>
            <span className="font-medium text-gray-900 capitalize">{role}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Value</span>
            <span className="font-bold text-green-600">{amount ? `${amount} ${token}` : '—'}</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-500">Dispute Resolver</span>
            <span className="font-medium text-gray-900">Kleros Court</span>
          </div>
        </div>

        <div className="mt-6 bg-gray-900 text-gray-300 p-4 rounded-md font-mono text-xs overflow-hidden">
          <p className="text-gray-500 mb-1">// Generated EIP-712 Terms Hash</p>
          <p className="break-all">0x8a9c4b7d12f3e8081a93b458763f9202ba456710db4f7962c03810a48b392a8c</p>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-md text-sm text-blue-900">
        <ShieldCheck className="shrink-0 mt-0.5" size={20} />
        <p>By creating this deal, you are signing an on-chain transaction. {role === 'buyer' ? 'You will be prompted to fund the Escrow Vault in the next step.' : 'You will be prompted to share the deal link with your buyer.'}</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto py-8">
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Deal</h1>
        <p className="text-gray-500">Configure your terms, set up the vault, and invite the counterparty.</p>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
        <div 
          className="absolute left-0 top-1/2 h-0.5 bg-[var(--accent-blue)] transition-all duration-300 ease-in-out -z-10 -translate-y-1/2"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>
        
        {steps.map((s) => {
          const isActive = step === s.num;
          const isPassed = step > s.num;
          
          return (
            <div key={s.num} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                isPassed ? 'bg-[var(--accent-blue)] text-white' :
                isActive ? 'bg-[var(--accent-blue)] text-white ring-4 ring-blue-100' :
                'bg-white border-2 border-gray-300 text-gray-400'
              }`}>
                {isPassed ? <Check size={20} /> : s.icon}
              </div>
              <span className={`text-xs mt-2 font-medium hidden sm:block ${isActive ? 'text-[var(--text-primary)] font-bold' : 'text-gray-500'}`}>
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Form Container */}
      <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm p-6 md:p-8 min-h-[400px] flex flex-col">
        
        <div className="flex-1">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-[var(--border)]">
          <Button 
            variant="ghost" 
            onClick={handlePrev} 
            className={step === 1 ? 'invisible' : ''}
          >
            Back
          </Button>
          
          {step < 4 ? (
            <Button variant="primary" onClick={handleNext} className="flex items-center gap-2">
              Next Step <ChevronRight size={16} />
            </Button>
          ) : (
            <Button variant="primary" onClick={handleCreate} className="bg-green-600 hover:bg-green-700 focus:ring-green-500">
              Sign & Create Deal
            </Button>
          )}
        </div>
      </div>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModalOpen} onClose={() => {}} title="Deal Created Successfully!" size="md">
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Deal #{newDealId} is Live</h2>
          <p className="text-gray-500 mb-6">Your on-chain transaction was successful.</p>
          
          <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg flex items-center justify-between mb-8">
            <span className="text-sm font-mono text-gray-600 truncate mr-3">https://app.settleone.xyz/invite/{newDealId}</span>
            <Button variant="secondary" className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 h-auto text-xs">
              <Link2 size={14} /> Copy Link
            </Button>
          </div>

          <Button variant="primary" className="w-full" onClick={() => navigate(`/marketplace/${newDealId}`)}>
            Go to Deal Room
          </Button>
        </div>
      </Modal>

    </div>
  );
}
