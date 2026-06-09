import React, { useState, useEffect, useRef } from "react";
import { Send, Paperclip } from "lucide-react";
import { useAccount } from "wagmi";
import { Avatar, AddressDisplay, Spinner } from "@settleone/design-system";
import { useChat, useSendMessage } from "@settleone/api";
import { formatRelativeTime } from "@settleone/utils";

interface DealChatRoomProps {
  dealId: bigint | undefined;
}

export function DealChatRoom({ dealId }: DealChatRoomProps) {
  const { address } = useAccount();
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useChat(dealId?.toString());
  const { mutate: sendMessage } = useSendMessage();

  const messages = data?.messages || [];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!message.trim() || !dealId) return;
    sendMessage({ dealId: dealId.toString(), content: message });
    setMessage("");
  };

  return (
    <div className="flex flex-col h-[500px] bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-gray-50 flex items-center justify-between">
        <h3 className="font-semibold text-sm">Private Deal Chat</h3>
        <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>{" "}
          Encrypted
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50"
      >
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size="md" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm italic">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe =
              msg.senderAddress.toLowerCase() === address?.toLowerCase();
            return (
              <div
                key={msg.id || idx}
                className={`flex items-start gap-3 ${isMe ? "flex-row-reverse" : ""}`}
              >
                <Avatar initials={isMe ? "ME" : "CP"} size="sm" />
                <div
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[70%]`}
                >
                  <span className="text-xs text-gray-500 mb-1 flex items-center gap-2">
                    {!isMe && (
                      <AddressDisplay
                        address={msg.senderAddress}
                        length={4}
                        showCopy={false}
                        showExternalLink={false}
                      />
                    )}
                    {isMe && "You"}
                  </span>
                  <div
                    className={`
                    px-4 py-2 rounded-2xl shadow-sm text-sm
                    ${isMe ? "bg-[var(--accent-blue)] text-white rounded-tr-none" : "bg-white border border-[var(--border)] text-gray-800 rounded-tl-none"}
                  `}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">
                    {formatRelativeTime(BigInt(msg.createdAt))}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-3 border-t border-[var(--border)] bg-white">
        <div className="flex items-end gap-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors shrink-0">
            <Paperclip size={20} />
          </button>
          <div className="flex-1 bg-gray-50 border border-[var(--border)] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type a message..."
              className="w-full bg-transparent border-none focus:ring-0 resize-none py-2 px-3 text-sm max-h-[100px] min-h-[40px]"
              rows={1}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim() || !dealId}
            className={`p-2 rounded-full shrink-0 transition-colors ${message.trim() ? "bg-[var(--accent-blue)] text-white hover:bg-blue-600 shadow-sm" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
          >
            <Send size={18} className={message.trim() ? "ml-0.5" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}
