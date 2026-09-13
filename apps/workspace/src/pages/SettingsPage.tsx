import React, { useEffect, useState } from "react";
import {
  Bell,
  Wallet,
  Shield,
  AlertTriangle,
  Trash2,
  Download,
  Lock,
  Smartphone,
  Globe,
  LogOut,
  Plus,
  CheckCircle2,
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
  useRemoveWallet,
  useMakePrimaryWallet,
} from "@settleone/api";

import {
  useUpdateProfile,
  useDeleteAccount,
  exportUserData,
} from "@settleone/api";
import { useDisconnect } from "wagmi";
import { useAccount, useSignMessage } from "wagmi";
import { useLinkWallet, useWalletNonce } from "@settleone/api";

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState("notifications");

  const { data: user } = useUser();

  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();
  const removeWallet = useRemoveWallet();
  const makePrimary = useMakePrimaryWallet();

  const updateProfile = useUpdateProfile();
  const deleteAccount = useDeleteAccount();
  const [notifPrefs, setNotifPrefs] = useState<any>(
    user?.notificationPrefs || {},
  );

  //  this sync the state when user data loads:
  useEffect(() => {
    if (user?.notificationPrefs) {
      setNotifPrefs(user.notificationPrefs);
    }
  }, [user?.notificationPrefs]);

  /// Security tab hooks and variables

  // --- API Hooks ---
  const requestEmail = useRequestEmailChange();
  const verifyEmail = useVerifyEmailChange();
  const updatePassword = useChangePassword();
  const { data: sessions } = useSessions();
  const revokeSession = useRevokeSession();

  // Security Tab States
  const [emailChangeStep, setEmailChangeStep] = useState<
    "initial" | "verify-new"
  >("initial");
  const [currentPasswordForEmail, setCurrentPasswordForEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newEmailOtp, setNewEmailOtp] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Wallet Linking Logic
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const getNonce = useWalletNonce();
  const linkWallet = useLinkWallet();

  const handleLinkWallet = async () => {
    if (!address) {
      alert("Please connect the wallet in MetaMask first.");
      return;
    }

    if (user?.wallets?.some((w: any) => w.address.toLowerCase() === address.toLowerCase())) {
      alert("This wallet is already linked to your account!");
      return;
    }

    try {
      const nonce = await getNonce.mutateAsync(address);
      const messageToSign = await getNonce.mutateAsync(address);
      const signature = await signMessageAsync({ message: messageToSign });

      await linkWallet.mutateAsync({ address, signature });
      alert("Wallet linked successfully! You can now make it primary.");
    } catch (error: any) {
      console.error(error);
      alert("Failed to link wallet: " + error.message);
    }
  };

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
              {
                id: "danger",
                label: "Danger Zone",
                icon: AlertTriangle,
                color: "text-[var(--accent-red)]",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-input)] transition-colors ${activeTab === tab.id
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
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                      Connected Wallets
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm mt-1">
                      Your{" "}
                      <span className="text-[var(--accent-green)] font-medium">
                        Primary
                      </span>{" "}
                      wallet is where you will receive all escrow payouts and
                      refunds.
                    </p>
                  </div>
                  {(!user?.wallets || user.wallets.length < 3) && (
                    <button
                      type="button"
                      onClick={handleLinkWallet}
                      disabled={linkWallet.isPending || getNonce.isPending}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-[var(--border)] rounded-[var(--radius-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--
  border-light)] transition-colors bg-[var(--bg-subtle)] whitespace-nowrap"
                    >
                      <Plus size={16} />
                      {linkWallet.isPending ? "Linking..." : "Link New Wallet"}
                    </button>
                  )}
                </div>

                <div className="flex flex-col space-y-4">
                  {user?.wallets?.map((wallet: any, index: number) => (
                    <div
                      key={wallet.address}
                      className="relative p-4 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-[var(--radius-card)]"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-[var(--text-secondary)]">
                          Wallet {index + 1}
                          {wallet.isPrimary && (
                            <span className="ml-3 px-2 py-0.5 rounded text-xs bg-[var(--accent-green)]/10 text-[var(--accent-green)] border border-[var(--accent-green)]/20">
                              Primary Payout Address
                            </span>
                          )}
                        </label>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                          {!wallet.isPrimary && (
                            <button
                              type="button"
                              onClick={() => makePrimary.mutate(wallet.address)}
                              disabled={makePrimary.isPending}
                              className="px-3 py-1 text-xs bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] rounded hover:bg-[var(--accent-blue)]/20 transition-colors"
                            >
                              {makePrimary.isPending
                                ? "Setting..."
                                : "Make Primary"}
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm("Remove this wallet?"))
                                removeWallet.mutate(wallet.address);
                            }}
                            disabled={
                              removeWallet.isPending || wallet.isPrimary
                            }
                            className={`px-3 py-1 text-xs rounded transition-colors ${wallet.isPrimary
                              ? "bg-slate-500/10 text-slate-500 cursor-not-allowed"
                              : "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                              }`}
                            title={
                              wallet.isPrimary
                                ? "Cannot delete primary wallet"
                                : "Remove wallet"
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <Input
                        type="text"
                        readOnly
                        value={wallet.address}
                        className="w-full bg-[var(--bg-base)] border-[var(--border)] text-[var(--text-muted)] font-mono text-sm opacity-80 cursor-not-allowed"
                      />
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
                  <h3 className="text-xl font-bold mb-4">
                    Change Email Address
                  </h3>
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
                                err.message ||
                                "Failed to send verification code",
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
                    <select
                      value={user?.profileVisibility || "Public"}
                      onChange={(e) =>
                        updateProfile.mutate({
                          profileVisibility: e.target.value,
                        })
                      }
                      disabled={updateProfile.isPending}
                      className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] px-4 py-3 text-[var(--text-primary)]"
                    >
                      <option value="Public">Public</option>
                      <option value="Deals Only">Deals Only</option>
                      <option value="Private">Private</option>
                    </select>
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
                        checked={user?.showWalletPublicly ?? true}
                        onChange={(e) =>
                          updateProfile.mutate({
                            showWalletPublicly: e.target.checked,
                          })
                        }
                        disabled={updateProfile.isPending}
                      />
                      <div
                        className="w-11 h-6 bg-[var(--bg-base)] peer-focus:outline-none rounded-full peer peer-
  checked:after:translate-x-full peer-checked:bg-[var(--accent-blue)] border border-[var(--border)]"
                      ></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* // The Notifications Block: */}

            {activeTab === "notifications" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Bell className="text-[var(--accent-blue)]" /> Notification
                    Preferences
                  </h2>
                  <div className="space-y-6">
                    {[
                      "Deal State Changes",
                      "Deadline Reminders",
                      "Dispute Updates",
                      "New Messages",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-[var(--border)] gap-4"
                      >
                        <p className="font-medium text-[var(--text-primary)]">
                          {item}
                        </p>
                        <div className="flex gap-6 bg-[var(--bg-base)] p-3 rounded-[var(--radius-input)] border border-[var(--border)]">
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              className="accent-[var(--accent-blue)] w-4 h-4"
                              checked={notifPrefs[item]?.email ?? true}
                              onChange={(e) =>
                                setNotifPrefs({
                                  ...notifPrefs,
                                  [item]: {
                                    ...notifPrefs[item],
                                    email: e.target.checked,
                                  },
                                })
                              }
                            />{" "}
                            Email
                          </label>
                          <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              className="accent-[var(--accent-blue)] w-4 h-4"
                              checked={notifPrefs[item]?.inApp ?? true}
                              onChange={(e) =>
                                setNotifPrefs({
                                  ...notifPrefs,
                                  [item]: {
                                    ...notifPrefs[item],
                                    inApp: e.target.checked,
                                  },
                                })
                              }
                            />{" "}
                            In-app
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button
                    variant="primary"
                    onClick={() =>
                      updateProfile.mutate({ notificationPrefs: notifPrefs })
                    }
                    disabled={updateProfile.isPending}
                  >
                    {updateProfile.isPending ? "Saving..." : "Save Preferences"}
                  </Button>
                </div>
              </div>
            )}

            {/* // The Danger Zone Block: */}

            {activeTab === "danger" && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4 text-[var(--accent-red)] flex items-center gap-2">
                  <AlertTriangle />
                  Danger Zone
                </h2>
                <div className="border border-[var(--accent-red)]/30 rounded-[var(--radius-card)] overflow-hidden bg-red-950/10">
                  <div className="p-5 border-b border-[var(--accent-red)]/20 flex justify-between gap-4">
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">
                        Export My Data
                      </p>
                      <p className="text-[var(--text-secondary)] text-sm">
                        Download a JSON file containing all your deals and
                        account history.
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        exportUserData(localStorage.getItem("auth_token") || "")
                      }
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] hover:bg-[var(--bg-subtle)]"
                    >
                      <Download size={16} /> Export Data
                    </button>
                  </div>
                  <div className="p-5 flex justify-between gap-4">
                    <div>
                      <p className="font-medium text-[var(--accent-red)]">
                        Delete Account
                      </p>
                      <p className="text-[var(--text-secondary)] text-sm">
                        Permanently delete your account. This cannot be undone.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        if (
                          confirm(
                            "Are you absolutely sure? This will delete all your data forever.",
                          )
                        ) {
                          deleteAccount.mutate(undefined, {
                            onSuccess: () => {
                              alert("Account deleted.");
                              window.location.href = "/"; // Send them out of the app
                            },
                          });
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm bg-[var(--accent-red)] text-white rounded-[var(-
  -radius-input)] hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                    >
                      <Trash2 size={16} />{" "}
                      {deleteAccount.isPending
                        ? "Deleting..."
                        : "Delete Account"}
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
