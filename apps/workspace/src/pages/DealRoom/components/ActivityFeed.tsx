import React from "react";
import { Activity, Wallet, PlayCircle, MessageSquare } from "lucide-react";
import { AddressDisplay } from "@settleone/design-system";

interface ActivityFeedProps {
  dealId: bigint | undefined;
}

export function ActivityFeed({ dealId }: ActivityFeedProps) {
  const events = [
    {
      id: 1,
      type: "message",
      icon: <MessageSquare size={14} />,
      color: "bg-gray-100 text-gray-600",
      title: "New message",
      desc: "Seller sent a message in chat.",
      time: "10:42 AM",
      date: "Jan 10, 2026",
    },
    {
      id: 2,
      type: "funded",
      icon: <Wallet size={14} />,
      color: "bg-green-100 text-green-600",
      title: "Deal Funded",
      desc: "Buyer deposited funds into the Vault.",
      time: "09:15 AM",
      date: "Jan 5, 2026",
      txHash: "0xabc...def",
    },
    {
      id: 3,
      type: "created",
      icon: <PlayCircle size={14} />,
      color: "bg-blue-100 text-blue-600",
      title: "Deal Created",
      desc: `Deal #DL-${String(dealId || 0).padStart(5, "0")} initialized.`,
      time: "14:30 PM",
      date: "Jan 1, 2026",
      txHash: "0x123...456",
    },
  ];

  return (
    <div className="bg-white border border-[var(--border)] rounded-lg shadow-sm overflow-hidden mb-6 h-full flex flex-col min-h-[400px]">
      <div className="px-4 py-3 border-b border-[var(--border)] bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity size={16} className="text-gray-500" />
          <h3 className="font-semibold text-sm">Activity Feed</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider">
            Live
          </span>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <div className="relative border-l border-gray-200 ml-3 space-y-6 pb-4">
          {events.map((event) => (
            <div key={event.id} className="relative pl-6">
              <div
                className={`absolute -left-[11px] top-0.5 w-[22px] h-[22px] rounded-full flex items-center justify-center border-2 border-white shadow-sm ${event.color}`}
              >
                {event.icon}
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-start mb-0.5">
                  <span className="text-sm font-semibold text-gray-900">
                    {event.title}
                  </span>
                  <span className="text-xs text-gray-500">{event.time}</span>
                </div>
                <p className="text-xs text-gray-600 mb-1.5">{event.desc}</p>

                {event.txHash && (
                  <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                    <span>TX:</span>
                    <AddressDisplay address={event.txHash} length={4} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
