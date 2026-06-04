import React, { useState } from 'react';
import { Copy, Check, Link, Share2, MessageCircle } from 'lucide-react';
import { cn } from '../../index';

interface MagicLinkGeneratorProps {
  inviteLink: string;
  onShareWhatsApp: () => void;
}

export const MagicLinkGenerator = ({ inviteLink, onShareWhatsApp }: MagicLinkGeneratorProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider flex items-center gap-2">
          <Link className="h-4 w-4 text-[#6B7280]" />
          Smart Invite Link
        </h3>
        <p className="text-xs text-[#6B7280]">Anyone with this link can join the transaction as a counterparty.</p>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1 rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3 font-mono text-xs text-[#111827] truncate">
          {inviteLink}
        </div>
        <button 
          onClick={copyToClipboard}
          className={cn(
            "rounded-lg p-3 transition-all",
            copied ? "bg-[#10B981] text-white" : "bg-[#111827] text-white hover:bg-[#111827]/90"
          )}
        >
          {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={onShareWhatsApp}
          className="flex items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] bg-white py-3 text-xs font-bold text-[#111827] hover:bg-[#FAFAFA] transition-colors"
        >
          <MessageCircle className="h-4 w-4 text-[#25D366] fill-[#25D366]" /> Share on WhatsApp
        </button>
        <button 
          className="flex items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] bg-white py-3 text-xs font-bold text-[#111827] hover:bg-[#FAFAFA] transition-colors"
        >
          <Share2 className="h-4 w-4 text-[#3B82F6]" /> Social Share
        </button>
      </div>

      <div className="rounded-lg bg-[#3B82F6]/5 border border-[#3B82F6]/10 p-4">
        <p className="text-[10px] text-[#3B82F6] font-medium leading-relaxed">
          <strong>Pro-tip:</strong> You can also download the transaction summary as a PDF and share it with the counterparty before they join.
        </p>
      </div>
    </div>
  );
};
