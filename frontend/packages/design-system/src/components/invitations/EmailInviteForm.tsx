import React from 'react';
import { Mail, Send } from 'lucide-react';

export const EmailInviteForm = () => {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
          <Mail className="h-4 w-4 text-[#6B7280]" />
          Email Invitation
        </h3>
        <p className="text-xs text-[#6B7280]">We'll send a professional invitation on your behalf.</p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Recipient Email</label>
          <input 
            type="email" 
            placeholder="business@example.com" 
            className="w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 text-sm outline-none transition-all focus:border-[#111827] focus:bg-white"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Personal Message (Optional)</label>
          <textarea 
            placeholder="e.g. Please join this deal to secure our next shipment terms." 
            className="w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-2.5 text-sm outline-none transition-all focus:border-[#111827] focus:bg-white resize-none"
            rows={3}
          />
        </div>

        <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#111827] py-3 text-sm font-bold text-white hover:bg-[#111827]/90 transition-all shadow-md">
          <Send className="h-4 w-4" /> Send Invitation
        </button>
      </div>
    </div>
  );
};
