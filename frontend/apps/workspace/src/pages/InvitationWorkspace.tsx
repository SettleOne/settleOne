import React, { useState } from 'react';
import { 
  InviteMethodCard, 
  MagicLinkGenerator, 
  EmailInviteForm 
} from '@settleone/design-system';
import { Mail, Link, QrCode, MessageCircle, FileText } from 'lucide-react';

export const InvitationWorkspace = () => {
  const [method, setMethod] = useState<'email' | 'link' | 'qr' | 'whatsapp'>('link');

  return (
    <div className="flex flex-col gap-8 p-2 md:p-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-[#111827]">Invitation Workspace</h1>
        <p className="text-sm text-[#6B7280]">
          Onboard new counterparties into protected transactions via smart invites.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Method Selection (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h3 className="text-xs font-bold text-[#111827] uppercase tracking-[0.2em] mb-2">Select Invite Method</h3>
          <InviteMethodCard 
            icon={Link}
            title="Magic Link"
            description="Generate a reusable link to share anywhere."
            isSelected={method === 'link'}
            onClick={() => setMethod('link')}
            badge="Fastest"
          />
          <InviteMethodCard 
            icon={Mail}
            title="Email Invitation"
            description="Send a formal invitation via SettleOne."
            isSelected={method === 'email'}
            onClick={() => setMethod('email')}
          />
          <InviteMethodCard 
            icon={QrCode}
            title="QR Code"
            description="For in-person or printed agreements."
            isSelected={method === 'qr'}
            onClick={() => setMethod('qr')}
          />
          <InviteMethodCard 
            icon={MessageCircle}
            title="WhatsApp"
            description="Direct link sharing for mobile businesses."
            isSelected={method === 'whatsapp'}
            onClick={() => setMethod('whatsapp')}
          />
        </div>

        {/* Center Column: Configuration (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="rounded-2xl bg-[#FAFAFA] border border-[#E5E7EB] p-8">
            {method === 'link' && (
              <MagicLinkGenerator 
                inviteLink="https://settleone.app/join/DEL-8F92A-X92"
                onShareWhatsApp={() => console.log('WhatsApp share')}
              />
            )}
            {method === 'email' && <EmailInviteForm />}
            {method === 'qr' && (
              <div className="flex flex-col items-center justify-center gap-6 py-12 bg-white rounded-2xl border border-[#E5E7EB]">
                <div className="h-48 w-48 bg-white border-8 border-[#FAFAFA] rounded-xl flex items-center justify-center shadow-inner">
                  <QrCode className="h-32 w-32 text-[#111827]" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-[#111827]">Scan to Join Deal</p>
                  <p className="text-xs text-[#6B7280]">Redirects to secure joining page.</p>
                </div>
                <button className="flex items-center gap-2 text-sm font-bold text-[#111827] hover:underline">
                  <FileText className="h-4 w-4" /> Download QR as PDF
                </button>
              </div>
            )}
            {method === 'whatsapp' && (
              <div className="flex flex-col gap-6">
                <div className="p-6 bg-white rounded-2xl border border-[#E5E7EB]">
                  <h3 className="text-sm font-bold text-[#111827] mb-4">Draft WhatsApp Message</h3>
                  <div className="bg-[#DCF8C6]/30 p-4 rounded-xl text-sm text-[#075E54] border border-[#DCF8C6]">
                    "Hey! I've set up our $5,000 transaction on SettleOne to protect our upcoming shipment. You can join the secure escrow here: https://settleone.app/join/DEL-8F92A-X92"
                  </div>
                </div>
                <button className="w-full h-14 rounded-xl bg-[#25D366] text-white font-bold flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all shadow-lg">
                  <MessageCircle className="h-6 w-6 fill-white" /> Open WhatsApp to Send
                </button>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider mb-4">Pending Invitations</h3>
            <div className="divide-y divide-[#E5E7EB]">
              {[1, 2].map((i) => (
                <div key={i} className="py-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#111827]">business@example.com</span>
                    <span className="text-[10px] text-[#6B7280] uppercase">Sent via Email • 2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded">Awaiting Join</span>
                    <button className="text-xs font-bold text-[#EF4444] hover:underline">Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
