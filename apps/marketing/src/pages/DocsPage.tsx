import React from 'react';

export function DocsPage() {
  return (
    <div className="bg-white min-h-screen font-sans flex flex-col md:flex-row">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-50 border-r border-[var(--border)] min-h-screen p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--accent-blue)] to-[var(--accent-purple)] flex items-center justify-center text-white font-bold text-xl">S</div>
          <span className="font-bold text-xl">SettleOne</span>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Getting Started</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="font-medium text-[var(--accent-blue)]">Introduction</li>
              <li className="hover:text-gray-900 cursor-pointer">Quickstart Guide</li>
              <li className="hover:text-gray-900 cursor-pointer">Architecture Overview</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Smart Contracts</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">DealManager.sol</li>
              <li className="hover:text-gray-900 cursor-pointer">EscrowVault.sol</li>
              <li className="hover:text-gray-900 cursor-pointer">DeliveryManager.sol</li>
              <li className="hover:text-gray-900 cursor-pointer">EIP-712 Signatures</li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">SDK & API</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-gray-900 cursor-pointer">Installation</li>
              <li className="hover:text-gray-900 cursor-pointer">useDealManager() Hook</li>
              <li className="hover:text-gray-900 cursor-pointer">useEscrowVault() Hook</li>
            </ul>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 max-w-4xl">
        <div className="prose prose-blue max-w-none">
          <h1>Introduction to SettleOne</h1>
          <p className="text-xl text-gray-600 mb-8">
            SettleOne is a verifiable transaction commitment layer for Web3 commerce. We provide trustless escrow, yield generation, and decentralized dispute resolution for freelancers, auditors, and supply chain merchants.
          </p>

          <h2>Core Concepts</h2>
          <p>
            The protocol is split into three main pieces of infrastructure:
          </p>
          <ul>
            <li><strong>DealManager:</strong> Handles state transitions (Funding &rarr; Delivery &rarr; Accepted &rarr; Settled).</li>
            <li><strong>EscrowVault:</strong> Secures the stablecoin deposits and routes them to Aave V3 for yield generation while the deal is active.</li>
            <li><strong>DeliveryManager:</strong> Stores IPFS CID proofs and handles the EIP-712 cryptographic verification of deliverables.</li>
          </ul>

          <h2>Security & Audits</h2>
          <p>
            Security is our top priority. The V1 smart contracts have been audited by OpenZeppelin and Trail of Bits. All funds are held in non-upgradable proxy contracts.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8 text-blue-900">
            <h4 className="font-bold mb-2">Developer Warning</h4>
            <p className="text-sm">When interacting with the SDK, ensure you pass amounts in their native decimal format. Use the <code>parseOnChainAmount</code> utility provided in the <code>@settleone/utils</code> package to avoid precision errors.</p>
          </div>
        </div>
      </main>

    </div>
  );
}
