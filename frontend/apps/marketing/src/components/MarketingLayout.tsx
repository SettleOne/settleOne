import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const MarketingLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-[#E5E7EB] bg-white/80 px-4 backdrop-blur-md md:px-16">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-[#111827]" />
            <span className="text-xl font-bold tracking-tight text-[#111827]">SettleOne</span>
          </Link>
        </div>
        
        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/features" className="text-sm font-medium text-[#6B7280] hover:text-[#111827]">Features</Link>
          <Link to="/pricing" className="text-sm font-medium text-[#6B7280] hover:text-[#111827]">Pricing</Link>
          <Link to="/docs" className="text-sm font-medium text-[#6B7280] hover:text-[#111827]">Docs</Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-4 sm:flex">
            <button className="text-sm font-medium text-[#111827]">Log in</button>
            <button className="rounded-[10px] bg-[#111827] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#111827]/90 transition-colors">
              Get Started
            </button>
          </div>
          <button 
            className="rounded-md p-2 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 md:hidden">
          <nav className="flex flex-col items-center gap-8 p-8">
            <Link to="/features" className="text-xl font-medium text-[#111827]" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link to="/pricing" className="text-xl font-medium text-[#111827]" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <Link to="/docs" className="text-xl font-medium text-[#111827]" onClick={() => setIsMenuOpen(false)}>Docs</Link>
            <hr className="w-full border-[#E5E7EB]" />
            <button className="text-xl font-medium text-[#111827]">Log in</button>
            <button className="w-full rounded-[12px] bg-[#111827] py-4 text-xl font-medium text-white">
              Get Started
            </button>
          </nav>
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-[#E5E7EB] bg-[#FAFAFA] py-16 px-8 md:px-16">
        <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-[#111827]" />
              <span className="text-lg font-bold tracking-tight text-[#111827]">SettleOne</span>
            </div>
            <p className="max-w-[320px] text-sm text-[#6B7280]">
              The commitment layer for MSME commerce. Secure, yield-bearing escrow for modern business.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-[#111827]">Product</h4>
              <Link to="/features" className="text-sm text-[#6B7280] hover:text-[#111827]">Features</Link>
              <Link to="/pricing" className="text-sm text-[#6B7280] hover:text-[#111827]">Pricing</Link>
              <Link to="/docs" className="text-sm text-[#6B7280] hover:text-[#111827]">Docs</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-[#111827]">Company</h4>
              <span className="text-sm text-[#6B7280]">About</span>
              <span className="text-sm text-[#6B7280]">Careers</span>
              <span className="text-sm text-[#6B7280]">Privacy</span>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-[1280px] mt-16 pt-8 border-t border-[#E5E7EB] text-xs text-[#6B7280]">
          © 2026 SettleOne Protocol. All rights reserved.
        </div>
      </footer>
    </div>
  );
};
