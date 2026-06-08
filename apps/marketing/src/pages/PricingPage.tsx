import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@settleone/design-system';

export function PricingPage() {
  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* Navbar Mock */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white font-bold text-xl">S</div>
          <span className="font-bold text-xl">SettleOne</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="/" className="hover:text-gray-900">Home</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">Login</a>
        </div>
      </nav>

      <section className="pt-20 pb-24 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Transparent Protocol Fees</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            SettleOne charges a small fee only when a deal successfully settles. No monthly subscriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          <div className="border border-[var(--border)] rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-2">Standard Protocol Fee</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-extrabold">1.5%</span>
              <span className="text-gray-500 font-medium">per settlement</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-700"><Check className="text-green-500" size={20} /> Zero creation fees</li>
              <li className="flex items-center gap-3 text-gray-700"><Check className="text-green-500" size={20} /> Access to yield generation</li>
              <li className="flex items-center gap-3 text-gray-700"><Check className="text-green-500" size={20} /> Custom verifiable rules</li>
            </ul>
            <Button variant="primary" className="w-full h-12 text-lg">Start Free</Button>
          </div>

          <div className="border-2 border-[var(--accent-blue)] rounded-2xl p-8 shadow-md relative bg-blue-50/30">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-[var(--accent-blue)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Disputed Deals
            </div>
            <h3 className="text-2xl font-bold mb-2">Dispute Resolution</h3>
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-5xl font-extrabold text-blue-900">+2.5%</span>
              <span className="text-gray-500 font-medium">arbitration fee</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-gray-700"><Check className="text-blue-500" size={20} /> Applied only if escalated</li>
              <li className="flex items-center gap-3 text-gray-700"><Check className="text-blue-500" size={20} /> Full evidence review</li>
              <li className="flex items-center gap-3 text-gray-700"><Check className="text-blue-500" size={20} /> Enforceable on-chain payout</li>
            </ul>
            <Button variant="secondary" className="w-full h-12 text-lg">Learn about Disputes</Button>
          </div>

        </div>
      </section>

    </div>
  );
}
