import React, { useState } from 'react';
import { Modal, Button, Input, Select } from '@settleone/design-system';
import { Wallet, AlertCircle } from 'lucide-react';

interface FundDealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFund: (amount: string, token: string) => void;
  requiredAmount: string;
}

export function FundDealModal({ isOpen, onClose, onFund, requiredAmount }: FundDealModalProps) {
  const [amount, setAmount] = useState(requiredAmount);
  const [token, setToken] = useState('USDC');

  const handleFund = () => {
    onFund(amount, token);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Fund Deal" size="md">
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-md border border-blue-100 flex gap-3">
          <Wallet className="text-blue-600 shrink-0 mt-0.5" size={20} />
          <div className="text-sm text-blue-900">
            <p className="font-semibold mb-1">Deposit Required</p>
            <p>You need to deposit {requiredAmount} USDC to activate this deal. Funds will be held securely in the Escrow Vault.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Token</label>
            <Select 
              value={token}
              onChange={(e) => setToken(e.target.value)}
              options={[
                { value: 'USDC', label: 'USDC (USD Coin)' },
                { value: 'USDT', label: 'USDT (Tether)' },
                { value: 'DAI', label: 'DAI' }
              ]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Fund</label>
            <div className="relative">
              <Input 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="text"
                className="pl-8"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-600">Wallet Balance</span>
            <span className="font-medium">12,450.00 USDC</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Network Fee</span>
            <span className="font-medium">~0.01 ETH</span>
          </div>
        </div>

        <div className="flex items-start gap-2 text-xs text-gray-500">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          <p>By proceeding, you approve the SettleOne Escrow Vault to transfer {amount} {token} from your wallet.</p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleFund}>Approve & Fund</Button>
        </div>
      </div>
    </Modal>
  );
}
