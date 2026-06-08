import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Avatar, AddressDisplay } from '@settleone/design-system';

export function DealChatRoom() {
  const [message, setMessage] = useState('');

  return (
    <div className="flex flex-col h-[500px] bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
      
      <div className="px-4 py-3 border-b border-[var(--border)] bg-gray-50 flex items-center justify-between">
        <h3 className="font-semibold text-sm">Deal Chat</h3>
        <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
        </span>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
        
        {/* System Message */}
        <div className="flex justify-center my-2">
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            Deal created • Jan 1, 2026
          </span>
        </div>

        {/* Their Message */}
        <div className="flex items-start gap-3">
          <Avatar size="sm" />
          <div className="flex flex-col items-start max-w-[70%]">
            <span className="text-xs text-gray-500 mb-1 ml-1 flex items-center gap-2">
              Seller <AddressDisplay address="0x987...123" length={3} showCopy={false} showLink={false} />
            </span>
            <div className="bg-white border border-[var(--border)] text-gray-800 px-4 py-2 rounded-2xl rounded-tl-none shadow-sm text-sm">
              Hi! I'm reviewing the specs now. Should I focus the audit on the staking contract first?
            </div>
            <span className="text-[10px] text-gray-400 mt-1 ml-1">10:42 AM</span>
          </div>
        </div>

        {/* My Message */}
        <div className="flex items-start gap-3 flex-row-reverse">
          <Avatar initials="JD" size="sm" />
          <div className="flex flex-col items-end max-w-[70%]">
            <span className="text-xs text-gray-500 mb-1 mr-1">You</span>
            <div className="bg-[var(--accent-blue)] text-white px-4 py-2 rounded-2xl rounded-tr-none shadow-sm text-sm">
              Yes please. That's the most critical part holding the liquidity.
            </div>
            <span className="text-[10px] text-gray-400 mt-1 mr-1 flex items-center gap-1">
              10:45 AM
            </span>
          </div>
        </div>

      </div>

      <div className="p-3 border-t border-[var(--border)] bg-white">
        <div className="flex items-end gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors shrink-0">
            <Paperclip size={20} />
          </button>
          <div className="flex-1 bg-gray-50 border border-[var(--border)] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="w-full bg-transparent border-none focus:ring-0 resize-none py-2 px-3 text-sm max-h-[100px] min-h-[40px]"
              rows={1}
            />
          </div>
          <button 
            className={`p-2 rounded-full shrink-0 transition-colors ${message.trim() ? 'bg-[var(--accent-blue)] text-white hover:bg-blue-600 shadow-sm' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
          >
            <Send size={18} className={message.trim() ? 'ml-0.5' : ''} />
          </button>
        </div>
      </div>

    </div>
  );
}
