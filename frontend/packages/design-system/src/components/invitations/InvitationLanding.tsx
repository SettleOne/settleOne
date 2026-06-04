import React from 'react';
import { ShieldCheck, Lock, TrendingUp, ArrowRight, Wallet, CheckCircle2 } from 'lucide-react';
import { cn } from '../../index';

interface InvitationLandingProps {
  senderName: string;
  amount: string;
  currency: string;
  dealTitle: string;
  onJoin: () => void;
}

export const InvitationLanding = ({
  senderName,
  amount,
  currency,
  dealTitle,
  onJoin
}: InvitationLandingProps) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[640px] bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl overflow-hidden">
        <div className="bg-[#111827] p-12 text-center text-white relative">
          <div className="absolute top-0 right-0 p-4">
            <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest">
              Secured Transaction
            </span>
          </div>
          <div className="h-16 w-16 bg-white rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-xl">
            <ShieldCheck className="h-10 w-10 text-[#111827]" />
          </div>
          <h1 className="text-3xl font-black tracking-tight mb-2">You've Been Invited</h1>
          <p className="text-white/60 text-lg">
            {senderName} invited you to join a protected transaction on SettleOne.
          </p>
        </div>

        <div className="p-12 space-y-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-[0.2em]">Transaction Subject</span>
              <h2 className="text-2xl font-bold text-[#111827]">{dealTitle}</h2>
            </div>

            <div className="grid grid-cols-2 gap-8 py-6 border-y border-[#E5E7EB]">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Escrow Amount</span>
                <span className="text-3xl font-black text-[#111827]">{amount} <span className="text-sm font-medium text-[#6B7280]">{currency}</span></span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-[#10B981]" /> Yield Share
                </span>
                <span className="text-3xl font-black text-[#10B981]">80%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-[#111827] uppercase tracking-widest text-center">Platform Protections</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ProtectionFeature 
                icon={Lock} 
                title="Automated Escrow" 
                desc="Funds are locked until you deliver."
              />
              <ProtectionFeature 
                icon={TrendingUp} 
                title="Yield Generation" 
                desc="Earn yield while funds are locked."
              />
              <ProtectionFeature 
                icon={CheckCircle2} 
                title="Dispute OS" 
                desc="Fair arbitration if things go wrong."
              />
            </div>
          </div>

          <div className="pt-4 flex flex-col gap-4">
            <button 
              onClick={onJoin}
              className="w-full h-16 rounded-2xl bg-[#111827] text-white font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-xl"
            >
              Secure This Transaction <ArrowRight className="h-6 w-6" />
            </button>
            <p className="text-center text-xs text-[#6B7280]">
              No wallet required to start. We'll guide you through the setup.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded bg-[#111827]" />
          <span className="text-lg font-bold text-[#111827]">SettleOne</span>
        </div>
        <p className="text-sm text-[#6B7280] max-w-[320px]">
          The commitment layer for commerce. Powering trusted B2B relationships.
        </p>
      </div>
    </div>
  );
};

const ProtectionFeature = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="flex flex-col items-center text-center gap-2 p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E7EB]">
    <Icon className="h-6 w-6 text-[#111827]" />
    <span className="text-xs font-black text-[#111827] uppercase leading-tight">{title}</span>
    <p className="text-[10px] text-[#6B7280] leading-relaxed">{desc}</p>
  </div>
);
