import React, { useState, useEffect, useRef } from "react";
import { Send, Paperclip } from "lucide-react";
import { useAccount } from "wagmi";
import { Avatar, AddressDisplay, Spinner } from "@settleone/design-system";
import { useSendMessage } from "@settleone/api";
import { formatRelativeTime } from "@settleone/utils";

import { useChatSocket } from "@settleone/api";

interface DealChatRoomProps {
  dealId: bigint | undefined;
}

export function DealChatRoom({ dealId }: DealChatRoomProps) {
  const { address } = useAccount();
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem("so_access_token");
  const {
    messages,
    sendMessage: emitMessage,
    sendTyping,
    typingUsers,
    markRead,
  } = useChatSocket(dealId?.toString(), token);
  const isLoading = false;
  const { mutate: sendMessage } = useSendMessage();

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
    <div className="flex flex-col h-[500px] bg-[var(--bg-card)] border border-[var(--border)] rounded-lg shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-subtle)] flex items-center justify-between">
        <h3 className="font-semibold text-sm text-[var(--text-primary)]">
          Private Deal Chat
        </h3>
        <span className="text-xs text-[var(--state-active)] bg-[var(--state-active)]/20 px-2 py-0.5 rounded-full font-medium flex items-center gap-1.5 shadow-glow">
          <span className="w-1.5 h-1.5 bg-[var(--state-active)] rounded-full animate-pulse"></span>{" "}
          Encrypted
        </span>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-4 bg-[var(--bg-base)]"
      >
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner size={24} />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12 text-[var(--text-muted)] text-sm italic">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg: any, idx: number) => {
            const isMe =
              msg.senderAddress.toLowerCase() === address?.toLowerCase();
            const senderName = msg.sender?.name || (isMe ? "You" : "Counterparty");
            
            return (
              <div
                key={msg.id || idx}
                className={`flex items-start gap-3 ${isMe ? "flex-row-reverse" : ""}`}
              >
                {msg.sender?.avatarUrl ? (
                   <img src={msg.sender.avatarUrl} alt={senderName} className="w-8 h-8 rounded-full object-cover shrink-0 border border-[var(--border)]" />
                ) : (
                   <Avatar initials={isMe ? "ME" : senderName.charAt(0).toUpperCase()} size="sm" />
                )}
                
                <div
                  className={`flex flex-col ${isMe ? "items-end" : "items-start"} max-w-[70%]`}
                >
                  <span className="text-xs text-[var(--text-muted)] mb-1 flex items-center gap-2">
                    {msg.sender?.name ? (
                      <span className="font-medium text-[var(--text-primary)]">{isMe ? "You" : msg.sender.name}</span>
                    ) : (
                      <>
                        {!isMe && (
                          <AddressDisplay
                            address={msg.senderAddress}
                            length={4}
                            showCopy={false}
                            showExternalLink={false}
                          />
                        )}
                        {isMe && "You"}
                      </>
                    )}
                    {msg.sender?.role && !isMe && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] uppercase font-bold">
                        {msg.sender.role}
                      </span>
                    )}
                  </span>
                  <div
                    className={`
                    px-4 py-2 rounded-2xl shadow-sm text-sm
                    ${isMe ? "bg-[var(--accent-blue)] text-[var(--text-primary)] rounded-tr-none shadow-[var(--shadow-glow)]" : "bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] rounded-tl-none"}
                  `}
                  >
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] mt-1">
                    {formatRelativeTime(BigInt(msg.createdAt))}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-3 border-t border-[var(--border)] bg-[var(--bg-card)]">
        <div className="flex items-end gap-2">
          <button className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--bg-hover)] transition-colors shrink-0">
            <Paperclip size={20} />
          </button>
          <div className="flex-1 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[var(--accent-blue-glow)] focus-within:border-[var(--accent-blue)] transition-all">
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
              className="w-full bg-transparent border-none focus:ring-0 text-[var(--text-primary)] placeholder-[var(--text-muted)] resize-none py-2 px-3 text-sm max-h-[100px] min-h-[40px] outline-none"
              rows={1}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!message.trim() || !dealId}
            className={`p-2 rounded-full shrink-0 transition-colors ${message.trim() ? "bg-[var(--accent-blue)] text-[var(--text-primary)] hover:brightness-110 shadow-[var(--shadow-glow)]" : "bg-[var(--bg-hover)] text-[var(--text-muted)] cursor-not-allowed"}`}
          >
            <Send size={18} className={message.trim() ? "ml-0.5" : ""} />
          </button>
        </div>
      </div>
    </div>
  );
}
