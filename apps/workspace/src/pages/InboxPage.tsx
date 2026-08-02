import React, { useState } from "react";
import { Search, Filter, MessageSquare, AlertCircle, Clock, ShieldAlert, CheckCircle } from "lucide-react";
import { Button } from "@settleone/design-system";

const mockNotifications = [
  {
    id: 1,
    title: "Deal Accepted",
    preview: "Your deal #DL-00143 was accepted by 0xabc...def.",
    time: "10 mins ago",
    type: "Deal Update",
    unread: true,
    icon: CheckCircle,
    color: "text-[var(--state-accepted)]",
  },
  {
    id: 2,
    title: "Delivery Submitted",
    preview: "Seller has submitted delivery for #DL-00129.",
    time: "2 hours ago",
    type: "Action Required",
    unread: true,
    icon: MessageSquare,
    color: "text-[var(--state-delivery-submitted)]",
  },
  {
    id: 3,
    title: "Delivery Deadline Approaching",
    preview: "You have less than 48 hours to submit delivery for #DL-00084.",
    time: "1 day ago",
    type: "Warning",
    unread: false,
    icon: Clock,
    color: "text-[var(--accent-amber)]",
  },
  {
    id: 4,
    title: "Dispute Raised",
    preview: "A dispute was raised on your deal #DL-00055.",
    time: "2 days ago",
    type: "Dispute",
    unread: false,
    icon: ShieldAlert,
    color: "text-[var(--state-disputed)]",
  },
];

export function InboxPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedNotifId, setSelectedNotifId] = useState<number | null>(1);

  const selectedNotif = mockNotifications.find((n) => n.id === selectedNotifId);

  return (
    <div className="max-w-6xl mx-auto p-6 h-[calc(100vh-80px)] flex flex-col text-[var(--text-primary)] font-[var(--font-sans)] relative">
      {/* Background image */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/docs-hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.04,
          zIndex: 0,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Inbox</h1>
            <p className="text-[var(--text-secondary)] mt-1">
              Notifications, messages, and alerts.
            </p>
          </div>
        </div>

        <div className="flex-1 flex gap-6 min-h-0">
          {/* Left Panel: List */}
          <div className="w-1/3 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] flex flex-col shadow-[var(--shadow-card)] overflow-hidden">
            <div className="p-4 border-b border-[var(--border)]">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {["All", "Unread", "Deal Updates", "System", "Disputes"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-sm rounded-[var(--radius-pill)] whitespace-nowrap transition-colors ${
                      activeTab === tab
                        ? "bg-[var(--accent-blue)] text-white border border-[var(--border-light)]"
                        : "bg-[var(--bg-base)] text-[var(--text-secondary)] border border-[var(--border)] hover:bg-[var(--bg-subtle)]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar">
              {mockNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => setSelectedNotifId(n.id)}
                  className={`p-4 border-b border-[var(--border)] cursor-pointer transition-colors hover:bg-[var(--bg-subtle)] flex gap-4 ${
                    selectedNotifId === n.id ? "bg-[var(--bg-subtle)] border-l-4 border-l-[var(--accent-blue)]" : "border-l-4 border-l-transparent"
                  }`}
                >
                  <div className={`mt-1 ${n.color}`}>
                    <n.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-semibold text-sm ${n.unread ? "text-white" : "text-[var(--text-secondary)]"}`}>{n.title}</span>
                      <span className="text-xs text-[var(--text-muted)]">{n.time}</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                      {n.preview}
                    </p>
                  </div>
                  {n.unread && (
                    <div className="w-2 h-2 rounded-full bg-[var(--accent-blue)] mt-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel: Detail */}
          <div className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] flex flex-col overflow-hidden">
            {selectedNotif ? (
              <>
                <div className="p-6 border-b border-[var(--border)] flex items-center justify-between bg-[var(--bg-subtle)]">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-[var(--radius-input)] bg-[var(--bg-base)] border border-[var(--border)] ${selectedNotif.color}`}>
                      <selectedNotif.icon size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">{selectedNotif.title}</h2>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {selectedNotif.time} • {selectedNotif.type}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 overflow-y-auto relative">
                  {/* Subtle background icon for the detail view */}
                  <div className="absolute right-10 top-10 opacity-5 pointer-events-none">
                     <selectedNotif.icon size={160} />
                  </div>
                  <div className="bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 mb-6 relative z-10 shadow-inner">
                    <p className="text-[var(--text-primary)] leading-relaxed text-lg">
                      {selectedNotif.preview}
                    </p>
                    <p className="text-[var(--text-secondary)] mt-6 text-sm">
                      Please review the details in the deal room and take the necessary action before the window expires. Failure to act may result in automatic state transitions.
                    </p>
                  </div>
                  <div className="flex gap-4 relative z-10">
                    <Button variant="primary" className="shadow-[0_0_15px_rgba(59,130,246,0.3)]">View Deal Room</Button>
                    <Button variant="secondary">Mark as Read</Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-[var(--text-secondary)]">
                <MessageSquare size={48} className="mb-4 opacity-20" />
                <p>Select a notification to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
