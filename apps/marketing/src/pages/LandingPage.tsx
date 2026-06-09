import React from "react";
import { ArrowRight, ShieldCheck, Zap, Globe, Lock } from "lucide-react";
import { Button } from "@settleone/design-system";

export function LandingPage() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Navbar Mock */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <span className="font-bold text-xl">SettleOne</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
          <a href="/features" className="hover:text-gray-900">
            Features
          </a>
          <a href="/pricing" className="hover:text-gray-900">
            Pricing
          </a>
          <a href="/docs" className="hover:text-gray-900">
            Docs
          </a>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/login"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Login
          </a>
          <a href="/signup">
            <Button variant="primary">Start Building</Button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-4 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-6 border border-blue-100">
          <Zap size={14} /> Arbitrum Sepolia Mainnet is Live
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
          Trustless Escrow for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Web3 Commerce
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
          SettleOne is the verifiable transaction commitment layer. Lock funds,
          deliver work, and settle on-chain with decentralized arbitration.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            variant="primary"
            className="h-12 px-8 text-lg w-full sm:w-auto"
          >
            Launch Workspace
          </Button>
          <Button
            variant="secondary"
            className="h-12 px-8 text-lg w-full sm:w-auto flex items-center gap-2"
          >
            Read the Docs <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50 border-t border-[var(--border)] px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to trade securely
            </h2>
            <p className="text-gray-600">
              Built for developers, auditors, freelancers, and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--border)]">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Lock size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Yield-Bearing Escrow</h3>
              <p className="text-gray-600 leading-relaxed">
                Funds locked in the SettleOne Vault automatically generate yield
                via Aave V3 while you wait for the delivery.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--border)]">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">
                Decentralized Arbitration
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Disputes are handled fairly. Plug into Kleros court or use
                SettleOne's native multi-sig resolution mechanism.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-[var(--border)]">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Verifiable Deliveries</h3>
              <p className="text-gray-600 leading-relaxed">
                Cryptographically prove deliveries. Enforce EIP-712 signatures
                or Chainlink AnyAPI for physical supply chains.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
