import React, { useState } from "react";
import {
      Bell, Wallet, Shield, AlertTriangle, Trash2, Download, Lock, Smartphone, Globe, LogOut, Plus, CheckCircle2 
    } from "lucide-react";
    import { Button, Input } from "@settleone/design-system";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
   useUser,
  useRequestEmailChange,
  useVerifyEmailChange,
  useChangePassword,
  useSessions,
  useRevokeSession,
} from "@settleone/api";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("notifications");
  
    const { data: user } = useUser();
      const { openConnectModal } = useConnectModal();

   /// Security tab hooks and variables
  
    // --- API Hooks ---
    const requestEmail = useRequestEmailChange();
    const verifyEmail = useVerifyEmailChange();
    const updatePassword = useChangePassword();
    const { data: sessions } = useSessions();
    const revokeSession = useRevokeSession();
    const { openConnectModal } = useConnectModal();
  
    // Security Tab States
    const [emailChangeStep, setEmailChangeStep] = useState<"initial" | "verify-new">("initial");
    const [currentPasswordForEmail, setCurrentPasswordForEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newEmailOtp, setNewEmailOtp] = useState("");
  
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  

  return (
    <div className="max-w-5xl mx-auto p-6 text-[var(--text-primary)] font-[var(--font-sans)] relative">
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

      <div className="relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-[var(--text-secondary)] mt-2">
            Manage your account preferences, notifications, and security.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-2">
                {[
                  { id: "wallet", label: "Wallets & Web3", icon: Wallet },
                  { id: "security", label: "Account Security", icon: Lock },
                  { id: "sessions", label: "Active Sessions", icon: Smartphone },
                  { id: "notifications", label: "Notifications", icon: Bell },
                  { id: "privacy", label: "Privacy", icon: Shield },
                  { id: "danger", label: "Danger Zone", icon: AlertTriangle, color: "text-[var(--accent-red)]" },
                ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-input)] transition-colors ${
                  activeTab === tab.id
                    ? "bg-[var(--accent-blue)]/10 text-[var(--accent-blue-bright)] border border-[var(--accent-blue)]/30"
                    : "hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)]"
                } ${tab.color || ""}`}
              >
                <tab.icon size={18} />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] p-8 shadow-[var(--shadow-card)]">
            
            {/* --- CONNECTED WALLETS --- */}
            
            {activeTab === "wallet" && (
                          <div>
                            <div className="flex items-center justify-between mb-5 border-b border-[var(--border)] pb-2">
                              <h3 className="text-xl font-bold text-[var(--text-primary)]">
                                Connected Wallets
                              </h3>
                              {(!user?.wallets || user.wallets.length < 3) && (
                                <button
                                  type="button"
                                  onClick={openConnectModal}
                                  className="flex items-center justify-center gap-2 w-full py-3 border border-dashed border-[var(--border)] rounded-[var(--radius-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-light)] transition-
              colors bg-[var(--bg-subtle)]"
                                >
                                  <Plus size={16} />
                                  <span>Link New Wallet</span>
                                </button>
                              )}
                            </div>
            
                            <div className="flex flex-col space-y-4">
                              {user?.wallets?.map((wallet: any, index: number) => (
                                <div key={wallet.address} className="relative group">
                                  <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                                    Wallet {index + 1}{" "}
                                    {wallet.isPrimary && (
                                      <span className="text-[var(--accent-green)]">
                                        (Primary)
                                      </span>
                                    )}
                                  </label>
            
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="text"
                                      readOnly
                                      value={wallet.address}
                                      className="flex-1 bg-[var(--bg-subtle)] border-[var(--border)] text-[var(--text-muted)] font-mono text-sm opacity-80 cursor-not-allowed"
                                    />
            
                                    {/* Action Buttons - Visible only on hover */}
                                    <div className="absolute right-2 bottom-1.5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 bg-[var(--bg-subtle)] pl-2">
                                      {!wallet.isPrimary && (
                                        <button
                                          type="button"
                                          className="px-2 py-1 text-xs bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] rounded hover:bg-[var(--accent-blue)]/20 transition-colors"
                                        >
                                          Make Primary
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        className="px-2 py-1 text-xs bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"
                                      >
                                        Disconnect
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              {(!user?.wallets || user.wallets.length === 0) && (
                                <p className="text-sm text-[var(--text-muted)] italic">
                                  No wallets connected yet.
                                </p>
                              )}
                            </div>
                          </div>
            )}
            
            {activeTab === "security" && (
                        <div className="space-y-8 animate-fade-in">
                          {/* ─────────────────────────────────────────────────────────
                                  1. CHANGE EMAIL 
                              ─────────────────────────────────────────────────────────── */}
                          <div>
                            <h3 className="text-xl font-bold mb-4">Change Email Address</h3>
                            <div className="space-y-4 max-w-md">
                              {emailChangeStep === "initial" && (
                                <div className="space-y-4">
                                  <div>
                                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                                      Current Password
                                    </label>
                                    <Input
                                      type="password"
                                      value={currentPasswordForEmail}
                                      onChange={(e) =>
                                        setCurrentPasswordForEmail(e.target.value)
                                      }
                                      className="bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-primary)]"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                                      New Email Address
                                    </label>
                                    <Input
                                      type="email"
                                      value={newEmail}
                                      onChange={(e) => setNewEmail(e.target.value)}
                                      className="bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-primary)]"
                                    />
                                  </div>
                                  <Button
                                    variant="secondary"
                                    disabled={
                                      requestEmail.isPending ||
                                      !currentPasswordForEmail ||
                                      !newEmail
                                    }
                                    onClick={async () => {
                                      try {
                                        await requestEmail.mutateAsync({
                                          currentPassword: currentPasswordForEmail,
                                          newEmail,
                                        });
                                        setEmailChangeStep("verify-new");
                                      } catch (err: any) {
                                        alert(
                                          err.message || "Failed to send verification code",
                                        );
                                      }
                                    }}
                                  >
                                    {requestEmail.isPending
                                      ? "Sending..."
                                      : "Send Verification Code"}
                                  </Button>
                                </div>
                              )}
            
                              {emailChangeStep === "verify-new" && (
                                <div className="p-5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-lg">
                                  <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                                    Enter 6-digit OTP sent to {newEmail}
                                  </label>
                                  <Input
                                    type="text"
                                    value={newEmailOtp}
                                    onChange={(e) => setNewEmailOtp(e.target.value)}
                                    className="mb-4 bg-[var(--bg-base)] border-[var(--border)]"
                                  />
                                  <div className="flex gap-3">
                                    <Button
                                      variant="primary"
                                      disabled={
                                        verifyEmail.isPending || newEmailOtp.length !== 6
                                      }
                                      onClick={async () => {
                                        try {
                                          await verifyEmail.mutateAsync({
                                            newEmail,
                                            code: newEmailOtp,
                                          });
                                          setEmailChangeStep("initial");
                                          setCurrentPasswordForEmail("");
                                          setNewEmail("");
                                          setNewEmailOtp("");
                                          alert("Email successfully updated!");
                                        } catch (err: any) {
                                          alert(err.message || "Invalid OTP");
                                        }
                                      }}
                                    >
                                      {verifyEmail.isPending
                                        ? "Verifying..."
                                        : "Confirm & Update"}
                                    </Button>
                                    <Button
                                      variant="secondary"
                                      onClick={() => setEmailChangeStep("initial")}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
            
                          {/* ─────────────────────────────────────────────────────────
                                  2. CHANGE PASSWORD 
                              ─────────────────────────────────────────────────────────── */}
                          <div className="pt-6 border-t border-[var(--border)]">
                            <h3 className="text-xl font-bold mb-4">Change Password</h3>
                            <div className="space-y-4 max-w-md">
                              <div>
                                <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                                  Current Password
                                </label>
                                <Input
                                  type="password"
                                  value={currentPassword}
                                  onChange={(e) => setCurrentPassword(e.target.value)}
                                  className="bg-[var(--bg-base)] border-[var(--border)]"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                                  New Password
                                </label>
                                <Input
                                  type="password"
                                  value={newPassword}
                                  onChange={(e) => setNewPassword(e.target.value)}
                                  className="bg-[var(--bg-base)] border-[var(--border)]"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                                  Confirm New Password
                                </label>
                                <Input
                                  type="password"
                                  value={confirmPassword}
                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                  className={`bg-[var(--bg-base)] border-[var(--border)] ${confirmPassword && newPassword !== confirmPassword ? "border-red-500" : ""}`}
                                />
                                {confirmPassword && newPassword !== confirmPassword && (
                                  <p className="text-xs text-red-500 mt-1">
                                    Passwords do not match
                                  </p>
                                )}
                              </div>
                              <Button
                                variant="primary"
                                disabled={
                                  updatePassword.isPending ||
                                  !currentPassword ||
                                  !newPassword ||
                                  newPassword !== confirmPassword
                                }
                                onClick={async () => {
                                  try {
                                    await updatePassword.mutateAsync({
                                      currentPassword,
                                      newPassword,
                                    });
                                    setCurrentPassword("");
                                    setNewPassword("");
                                    setConfirmPassword("");
                                    alert(
                                      "Password updated! All other devices have been logged out.",
                                    );
                                  } catch (err: any) {
                                    alert(err.message || "Failed to update password");
                                  }
                                }}
                              >
                                {updatePassword.isPending
                                  ? "Updating..."
                                  : "Update Password"}
                              </Button>
                            </div>
                          </div>
                        </div>
            )}
            
            {activeTab === "sessions" && (
                <div className="pt-6 border-t border-[var(--border)]">
                              <h3 className="text-xl font-bold mb-4">Active Sessions</h3>
                              <div className="space-y-3">
                                {sessions?.length === 0 && (
                                  <p className="text-sm text-[var(--text-secondary)]">
                                    No active sessions found.
                                  </p>
                                )}
                                {sessions?.map((session: any) => (
                                  <div
                                    key={session.id}
                                    className="flex items-center justify-between p-4 bg-[var(--bg-base)] border
                border-[var(--border)] rounded-[var(--radius-input)] transition-all hover:border-[var(--border-light)]"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="p-2 bg-[var(--bg-subtle)] rounded-full text-[var(--text-secondary)]">
                                        {session.deviceInfo?.includes("Mac") ? (
                                          <Globe size={20} />
                                        ) : (
                                          <Smartphone size={20} />
                                        )}
                                      </div>
                                      <div>
                                        <p className="font-medium text-sm">
                                          {session.deviceInfo || "Unknown Device"}
                                        </p>
                                        <p className="text-xs text-[var(--text-secondary)]">
                                          {session.ipAddress || "Unknown IP"} •{" "}
                                          {new Date(session.createdAt).toLocaleDateString()}
                                        </p>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => {
                                        if (
                                          confirm(
                                            "Are you sure you want to revoke this session?",
                                          )
                                        ) {
                                          revokeSession.mutate(session.id);
                                        }
                                      }}
                                      disabled={revokeSession.isPending}
                                      className="text-sm text-[var(--accent-red)] hover:text-red-400 font-medium flex items-center gap-1 transition-colors"
                                    >
                                      <LogOut size={14} /> Revoke
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                        )}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Bell className="text-[var(--accent-blue)]" /> Notification
                    Preferences
                  </h2>
                  <p className="text-[var(--text-secondary)] text-sm mb-6">
                    Choose what updates you want to receive and where.
                  </p>
                  <div className="space-y-6">
                    {[
                      {
                        title: "Deal State Changes",
                        desc: "When a deal is accepted, funded, or settled.",
                      },
                      {
                        title: "Deadline Reminders",
                        desc: "Warnings when delivery or acceptance windows are closing.",
                      },
                      {
                        title: "Dispute Updates",
                        desc: "Alerts when a dispute is raised or resolved.",
                      },
                      {
                        title: "New Messages",
                        desc: "When you receive a new message in the inbox.",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[var(--border)] last:border-0 gap-4"
                      >
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">
                            {item.title}
                          </p>
                          <p className="text-[var(--text-secondary)] text-sm mt-1">
                            {item.desc}
                          </p>
                        </div>
                        <div className="flex gap-6 bg-[var(--bg-base)] p-3 rounded-[var(--radius-input)] border border-[var(--border)]">
                          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium hover:text-[var(--accent-blue-bright)] transition-colors">
                            <input
                              type="checkbox"
                              className="accent-[var(--accent-blue)] w-4 h-4 cursor-pointer"
                              defaultChecked
                            />
                            Email
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium hover:text-[var(--accent-blue-bright)] transition-colors">
                            <input
                              type="checkbox"
                              className="accent-[var(--accent-blue)] w-4 h-4 cursor-pointer"
                              defaultChecked
                            />
                            In-app
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button variant="primary">Save Preferences</Button>
                </div>
              </div>
            )}

            {activeTab === "wallet" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Wallet className="text-[var(--accent-blue)]" /> Wallet &
                  Network
                </h2>
                <div className="p-5 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)] flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[var(--text-secondary)] mb-1">
                      Connected Wallet
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--accent-green)] animate-pulse"></div>
                      <p className="font-mono text-base font-medium">
                        0x1234...5678
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="secondary"
                    className="hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50"
                  >
                    Disconnect
                  </Button>
                </div>
                <div className="space-y-5 mt-8">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      Preferred Network
                    </label>
                    <select className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] transition-all">
                      <option>Arbitrum One</option>
                      <option>Ethereum Mainnet</option>
                      <option>Base</option>
                      <option>Polygon</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      Gas Limit Preferences
                    </label>
                    <select className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] transition-all">
                      <option>Auto (Recommended)</option>
                      <option>High (Faster)</option>
                      <option>Low (Cheaper)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "privacy" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Shield className="text-[var(--accent-blue)]" /> Privacy
                </h2>
                <div className="space-y-8 mt-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      Profile Visibility
                    </label>
                    <select className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)] transition-all">
                      <option>Public</option>
                      <option>Deals Only</option>
                      <option>Private</option>
                    </select>
                    <p className="text-[var(--text-muted)] text-sm mt-2">
                      Controls who can view your public profile page.
                    </p>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-input)]">
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">
                        Show Wallet Address Publicly
                      </p>
                      <p className="text-[var(--text-muted)] text-sm mt-1">
                        If disabled, your address will only be visible to
                        parties in active deals.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        defaultChecked
                      />
                      <div className="w-11 h-6 bg-[var(--bg-base)] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-[var(--text-muted)] after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[var(--accent-blue)] peer-checked:after:bg-white border border-[var(--border)]"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "danger" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4 text-[var(--accent-red)] flex items-center gap-2">
                  <AlertTriangle /> Danger Zone
                </h2>
                <div className="border border-[var(--accent-red)]/30 rounded-[var(--radius-card)] overflow-hidden bg-red-950/10">
                  <div className="p-5 border-b border-[var(--accent-red)]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">
                        Export My Data
                      </p>
                      <p className="text-[var(--text-secondary)] text-sm mt-1">
                        Download a JSON file containing all your deals and
                        account history.
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] hover:bg-[var(--bg-subtle)] transition-colors whitespace-nowrap">
                      <Download size={16} /> Export Data
                    </button>
                  </div>
                  <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <p className="font-medium text-[var(--accent-red)]">
                        Delete Account
                      </p>
                      <p className="text-[var(--text-secondary)] text-sm mt-1">
                        Permanently delete your account. This action cannot be
                        undone.
                      </p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-[var(--accent-red)] text-white rounded-[var(--radius-input)] hover:bg-red-600 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)] whitespace-nowrap">
                      <Trash2 size={16} /> Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
