import React from 'react';
import { MessageSquare, Handshake, ChevronRight } from 'lucide-react';
import { cn } from '../../index';

export const NegotiationWorkspace = () => {
  return (
    <div className="flex flex-col rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm overflow-hidden h-[500px]">
      <div className="flex items-center justify-between border-b border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4 text-[#6B7280]" />
          <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Negotiation Channel</h3>
        </div>
        <span className="text-[10px] font-bold text-[#F59E0B] bg-[#F59E0B]/10 px-2 py-0.5 rounded-full border border-[#F59E0B]/20 uppercase tracking-widest">
          Pre-Arbitration Phase
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        <div className="flex items-center justify-center py-2">
          <span className="text-xs text-[#6B7280] font-medium bg-[#FAFAFA] px-3 py-1 rounded-full">
            Dispute Initiated
          </span>
        </div>

        {/* Message 1 */}
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-xs font-bold">
            B
          </div>
          <div className="flex flex-col gap-1 w-full max-w-[80%]">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-[#111827]">Buyer</span>
              <span className="text-[10px] text-[#6B7280] uppercase">10:00 AM</span>
            </div>
            <div className="rounded-lg rounded-tl-none bg-[#FAFAFA] p-3 text-sm text-[#374151] border border-[#E5E7EB]">
              The delivered assets do not match the specification in Annex A. I am requesting a 50% refund.
            </div>
          </div>
        </div>

        {/* Message 2 */}
        <div className="flex items-start gap-3 flex-row-reverse">
          <div className="h-8 w-8 shrink-0 rounded-full bg-[#10B981] flex items-center justify-center text-white text-xs font-bold">
            S
          </div>
          <div className="flex flex-col gap-1 w-full max-w-[80%] items-end">
            <div className="flex items-baseline gap-2">
              <span className="text-[10px] text-[#6B7280] uppercase">11:30 AM</span>
              <span className="text-sm font-bold text-[#111827]">Seller</span>
            </div>
            <div className="rounded-lg rounded-tr-none bg-[#111827] p-3 text-sm text-white">
              Annex A was fulfilled in V2 of the deliverables. Please check the Evidence folder. However, I am willing to offer a 20% discount to resolve this quickly.
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#E5E7EB] p-4 bg-[#FAFAFA] flex flex-col gap-3">
        <textarea 
          placeholder="Type your response to negotiate..." 
          className="w-full rounded-lg border border-[#E5E7EB] p-3 text-sm outline-none focus:border-[#111827] resize-none"
          rows={2}
        />
        <div className="flex justify-between items-center">
          <button className="text-xs font-bold text-[#6B7280] hover:text-[#111827] uppercase tracking-wider">
            Escalate to Arbitrator
          </button>
          <div className="flex gap-2">
            <button className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-sm font-bold text-[#111827] hover:bg-[#FAFAFA]">
              Propose Settlement
            </button>
            <button className="rounded-lg bg-[#111827] px-4 py-2 text-sm font-bold text-white hover:bg-[#111827]/90">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
