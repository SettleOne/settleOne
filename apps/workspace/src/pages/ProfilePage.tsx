import React, { useState } from "react";
import {
  Camera,
  Mail,
  Globe,
  Building,
  ShieldCheck,
  CheckCircle,
  Briefcase,
  Lock,
  Smartphone,
  LogOut,
} from "lucide-react";
import {
  Avatar,
  Input,
  Button,
  AddressDisplay,
} from "@settleone/design-system";

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("created");
  const [role, setRole] = useState<"buyer" | "seller" | "both">("both");

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 text-[var(--text-primary)] font-[var(--font-sans)]">
      {/* Left Panel: Profile Card */}
      <div className="w-full md:w-80 shrink-0">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-[var(--shadow-card)] overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-[var(--accent-blue)] to-[var(--accent-purple)] relative">
            <div className="absolute -bottom-10 left-6">
              <div className="relative group cursor-pointer">
                <Avatar
                  initials="JD"
                  size="xl"
                  className="border-4 border-[var(--bg-card)] shadow-sm bg-[var(--bg-base)]"
                />
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={24} className="text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-14 px-6 pb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              John Doe{" "}
              <CheckCircle size={16} className="text-[var(--accent-blue)]" />
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              john@example.com
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm border-b border-[var(--border)] pb-2">
                <span className="text-[var(--text-secondary)]">
                  Member since
                </span>
                <span className="font-medium">Jan 2026</span>
              </div>
              <div className="flex justify-between text-sm border-b border-[var(--border)] pb-2 items-center">
                <span className="text-[var(--text-secondary)]">Wallet</span>
                <AddressDisplay address="0x1234567890abcdef1234567890abcdef12345678" />
              </div>
              <div className="flex justify-between text-sm border-b border-[var(--border)] pb-2">
                <span className="text-[var(--text-secondary)]">Role</span>
                <span className="font-medium capitalize">{role}</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 text-[var(--text-secondary)]">
                <span>Profile Completion</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-[var(--bg-base)] rounded-full h-2">
                <div
                  className="bg-[var(--accent-blue)] h-2 rounded-full"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel: Tabs & Content */}
      <div className="flex-1">
        <div className="mb-6 flex gap-2 border-b border-[var(--border)] overflow-x-auto scrollbar-hide">
          {[
            { id: "account", label: "Account Info", icon: Building },
            { id: "security", label: "Security", icon: Lock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-[var(--accent-blue)] text-[var(--accent-blue)]"
                  : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-light)]"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-card)] min-h-[400px]">
          {activeTab === "account" && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold mb-4">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    defaultValue="John Doe"
                    className="bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                      size={16}
                    />
                    <Input
                      type="email"
                      defaultValue="john@example.com"
                      className="pl-9 bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-primary)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                    Organization / Company
                  </label>
                  <div className="relative">
                    <Building
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                      size={16}
                    />
                    <Input
                      type="text"
                      defaultValue="DeFi Labs Inc."
                      className="pl-9 bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-primary)]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                    Business Location / Region
                  </label>
                  <Input
                    type="text"
                    defaultValue="San Francisco, CA"
                    className="bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                    Time Zone
                  </label>
                  <select className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] px-4 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                    <option>Coordinated Universal Time (UTC)</option>
                  </select>
                </div>
              </div>

              {/* Connected Wallets section (Vertical Column) */}
              <div className="pt-6 mt-6 border-t border-[var(--border)]">
                <h4 className="text-sm font-bold mb-4 text-[var(--text-primary)] uppercase tracking-wider">
                  Connected Wallets
                </h4>
                <div className="flex flex-col space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      Wallet 1 (Primary)
                    </label>
                    <Input
                      type="text"
                      placeholder="0x..."
                      defaultValue="0x1234567890abcdef1234567890abcdef12345678"
                      className="w-full bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-primary)] font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      Wallet 2
                    </label>
                    <Input
                      type="text"
                      placeholder="0x..."
                      className="w-full bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-primary)] font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      Wallet 3
                    </label>
                    <Input
                      type="text"
                      placeholder="0x..."
                      className="w-full bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-primary)] font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-[var(--border)] flex justify-end">
                <Button variant="primary">Save Changes</Button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Change Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      Current Password
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      New Password
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      Confirm New Password
                    </label>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-primary)]"
                    />
                  </div>
                  <Button variant="primary">Update Password</Button>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold">
                      Two-Factor Authentication (2FA)
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mt-1">
                      Protect your account with an extra layer of security.
                    </p>
                  </div>
                  <Button variant="secondary">Enable 2FA</Button>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border)]">
                <h3 className="text-xl font-bold mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[var(--bg-subtle)] rounded-full text-[var(--accent-blue)]">
                        <Globe size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">Mac OS • Chrome</p>
                        <p className="text-xs text-[var(--text-secondary)]">
                          San Francisco, CA • Current Session
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-[var(--accent-green)] font-medium px-2 py-1 bg-green-900/30 rounded-full">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)]">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[var(--bg-subtle)] rounded-full text-[var(--text-secondary)]">
                        <Smartphone size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          iPhone 14 • Safari
                        </p>
                        <p className="text-xs text-[var(--text-secondary)]">
                          New York, NY • Last seen 2h ago
                        </p>
                      </div>
                    </div>
                    <button className="text-sm text-[var(--accent-red)] hover:text-red-400 font-medium flex items-center gap-1">
                      <LogOut size={14} /> Revoke
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
