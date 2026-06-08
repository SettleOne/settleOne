import React, { useState } from 'react';
import { Camera, Mail, Globe, MapPin, Building, ShieldCheck } from 'lucide-react';
import { Avatar, Input, Button, AddressDisplay } from '@settleone/design-system';

export function ProfilePage() {
  const [role, setRole] = useState<'buyer' | 'seller' | 'both'>('both');

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage your public identity and SettleOne preferences.</p>
      </div>

      <div className="bg-white border border-[var(--border)] rounded-xl shadow-sm overflow-hidden">
        
        {/* Banner & Avatar */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative">
          <div className="absolute -bottom-10 left-6">
            <div className="relative group cursor-pointer">
              <Avatar initials="JD" size="xl" className="border-4 border-white shadow-sm" />
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={24} className="text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-14 px-6 pb-6 space-y-8">
          
          {/* Linked Wallet */}
          <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
                <ShieldCheck size={20} className="text-green-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Wallet Connected</p>
                <AddressDisplay address="0x1234567890abcdef1234567890abcdef12345678" />
              </div>
            </div>
            <Button variant="secondary">Disconnect</Button>
          </div>

          {/* Primary Role */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">I use SettleOne primarily as a:</h3>
            <div className="grid grid-cols-3 gap-3">
              <button 
                onClick={() => setRole('buyer')}
                className={`p-3 text-sm font-medium rounded-lg border text-center transition-colors ${role === 'buyer' ? 'border-[var(--accent-blue)] bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                Buyer
              </button>
              <button 
                onClick={() => setRole('seller')}
                className={`p-3 text-sm font-medium rounded-lg border text-center transition-colors ${role === 'seller' ? 'border-[var(--accent-blue)] bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                Seller
              </button>
              <button 
                onClick={() => setRole('both')}
                className={`p-3 text-sm font-medium rounded-lg border text-center transition-colors ${role === 'both' ? 'border-[var(--accent-blue)] bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
              >
                Both
              </button>
            </div>
          </div>

          {/* Public Profile Form */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Public Profile Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                <Input type="text" defaultValue="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address (Private)</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input type="email" defaultValue="john@example.com" className="pl-9" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organization / Company</label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input type="text" defaultValue="DeFi Labs Inc." className="pl-9" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <Input type="url" defaultValue="https://defilabs.com" className="pl-9" />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea 
                  className="w-full px-3 py-2 border border-[var(--border)] rounded-md text-sm focus:ring-2 focus:ring-[var(--accent-blue)] focus:outline-none h-24 resize-none"
                  defaultValue="Senior Smart Contract auditor specializing in DeFi protocols."
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button variant="primary">Save Changes</Button>
          </div>

        </div>
      </div>
    </div>
  );
}
