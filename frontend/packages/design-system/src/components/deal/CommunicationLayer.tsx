import React from 'react';
import { MessageSquare, Paperclip, Send } from 'lucide-react';

export const CommunicationLayer = () => {
  return (
    <div className="flex flex-col h-[500px] rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 border-b border-[#E5E7EB] bg-[#FAFAFA] px-4 py-3">
        <MessageSquare className="h-4 w-4 text-[#6B7280]" />
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Deal Channel</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
        {/* Message 1 */}
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-xs font-bold">
            B
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-[#111827]">Buyer</span>
              <span className="text-xs text-[#6B7280]">10:00 AM</span>
            </div>
            <p className="text-sm text-[#374151]">
              I've funded the deal. Looking forward to the delivery!
            </p>
          </div>
        </div>

        {/* Message 2 */}
        <div className="flex items-start gap-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-[#10B981] flex items-center justify-center text-white text-xs font-bold">
            S
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-bold text-[#111827]">Seller</span>
              <span className="text-xs text-[#6B7280]">11:30 AM</span>
            </div>
            <p className="text-sm text-[#374151]">
              Received. I will start working on it right away. Should be done by tomorrow.
            </p>
          </div>
        </div>

        {/* System Event */}
        <div className="flex items-center justify-center gap-2 py-2">
          <div className="h-px flex-1 bg-[#E5E7EB]"></div>
          <span className="text-[10px] font-medium uppercase tracking-wider text-[#6B7280] bg-[#FAFAFA] px-2 py-1 rounded">
            Delivery Submitted
          </span>
          <div className="h-px flex-1 bg-[#E5E7EB]"></div>
        </div>
      </div>

      <div className="border-t border-[#E5E7EB] p-3 bg-white">
        <div className="flex items-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-2">
          <button className="text-[#6B7280] hover:text-[#111827]">
            <Paperclip className="h-4 w-4" />
          </button>
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-[#6B7280]"
          />
          <button className="rounded bg-[#111827] p-1.5 text-white hover:bg-[#111827]/90">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
