import React, { useState, useEffect, useRef } from "react";
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
  MessageCircle,
  Twitter,
  Github,
  Linkedin,
  Hash,
  X,
  ChevronDown,
} from "lucide-react";
import {
  UTC_TIMEZONES,
  SUPPORTED_CHAINS,
  SUPPORTED_TOKENS,
} from "../lib/constants";
import { Avatar, Input, Button } from "@settleone/design-system";
import { useUser, useUpdateProfile } from "@settleone/api";
import {
  useRequestEmailChange,
  useVerifyEmailChange,
  useChangePassword,
  useSessions,
  useRevokeSession,
} from "@settleone/api";

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState("account");
  const { data: user } = useUser();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  // Multi-select state for Escrow Preferences
  const [selectedChains, setSelectedChains] = useState<string[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);

  // Dropdown UI state
  const [isChainDropdownOpen, setIsChainDropdownOpen] = useState(false);
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false);

  // Sync state with user data once it loads
  useEffect(() => {
    if (user?.preferredChain) setSelectedChains(user.preferredChain);
    if (user?.preferredTokens) setSelectedTokens(user.preferredTokens);
  }, [user]);

  // profile completion percentage calculation (Expanded)
  const profileFields = [
    user?.name,
    user?.email,
    user?.wallets && user.wallets.length > 0,
    user?.organization,
    user?.location,
    user?.timezone,
    user?.bio,
    user?.website,
    user?.telegram,
    user?.discord,
    user?.xTwitter,
    user?.github,
    user?.linkedin,
    user?.farcaster,
    user?.preferredChain && user.preferredChain.length > 0,
    user?.preferredTokens && user.preferredTokens.length > 0,
  ];
  const filledFields = profileFields.filter(Boolean).length;
  const completionPercent = user
    ? Math.round((filledFields / profileFields.length) * 100)
    : 0;

  // Handle outside clicks for dropdowns
  const chainRef = useRef<HTMLDivElement>(null);
  const tokenRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chainRef.current && !chainRef.current.contains(event.target as Node))
        setIsChainDropdownOpen(false);
      if (tokenRef.current && !tokenRef.current.contains(event.target as Node))
        setIsTokenDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8 text-[var(--text-primary)] font-[var(--font-sans)] animate-fade-in">
      {/* Left Panel: Profile Card */}
      <div className="w-full md:w-80 shrink-0">
        <div className="rounded-[var(--radius-card)] bg-[var(--bg-card)] border border-[rgba(255,255,255,0.07)] shadow-[0_8px_40px_rgba(0,0,0,0.6)]">
          {/* Banner Container - REMOVED overflow-hidden so Avatar can pop out! */}
          <div
            className="relative rounded-t-[var(--radius-card)] h-28"
            style={{
              backgroundImage:
                "url(/blockchain-bg.jpg), linear-gradient(135deg, #1d4ed8, #7c3aed)",
              backgroundSize: "cover, cover",
              backgroundPosition: "center, center",
            }}
          >
            {/* Banner Background Upload (Camera icon in top right) */}
            <label className="absolute top-2 right-2 p-2 bg-black/40 hover:bg-black/60 rounded-full cursor-pointer transition-colors group z-10">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0])
                    console.log(
                      "Uploading background:",
                      e.target.files[0].name,
                    );
                }}
              />
              <Camera
                size={16}
                className="text-white opacity-70 group-hover:opacity-100"
              />
            </label>

            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/70 to-purple-500/60 rounded-t-[var(--radius-card)]" />

            {/* Avatar - Absolute positioned to pop out of the banner bottom */}
            <div className="absolute -bottom-10 left-6 z-20">
              <label className="relative group cursor-pointer block rounded-full">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      // TODO: Wire to API apiClient('/users/me/avatar', {method: 'POST'})
                      console.log("Uploading avatar:", file.name);
                    }
                  }}
                />
                <Avatar
                  src={user?.avatarUrl}
                  initials={
                    user?.name ? user.name.substring(0, 2).toUpperCase() : "U"
                  }
                  size="xl"
                  className="border-4 border-[var(--bg-card)] shadow-md bg-[var(--bg-base)] object-cover w-24 h-24"
                />
                <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={24} className="text-white drop-shadow-md" />
                </div>
              </label>
            </div>
          </div>

          {/* Card Body */}
          <div className="pt-14 px-6 pb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              {user?.name || "User"}
              <CheckCircle size={16} className="text-[var(--accent-blue)]" />
            </h2>
            <p className="text-[var(--text-secondary)] text-sm mb-4">
              {user?.email || ""}
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm border-b border-[var(--border)] pb-2">
                <span className="text-[var(--text-secondary)]">
                  Member since
                </span>
                <span className="font-medium">
                  {user?.createdAt
                    ? new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })
                    : "Recently"}
                </span>
              </div>
              <div className="flex justify-between text-sm border-b border-[var(--border)] pb-2 items-center">
                <span className="text-[var(--text-secondary)]">Wallet</span>
                <span
                  className="font-mono text-[var(--text-muted)] truncate max-w-[140px]"
                  title={
                    user?.wallets?.find((w) => w.isPrimary)?.address ||
                    user?.wallets?.[0]?.address
                  }
                >
                  {user?.wallets?.find((w) => w.isPrimary)?.address ||
                    user?.wallets?.[0]?.address ||
                    "No wallet"}
                </span>
              </div>
              <div className="flex justify-between text-sm border-b border-[var(--border)] pb-2">
                <span className="text-[var(--text-secondary)]">Role</span>
                <span className="font-medium capitalize">
                  {user?.role || ""}
                </span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1 text-[var(--text-secondary)]">
                <span>Profile Completion</span>
                <span>{completionPercent}%</span>
              </div>
              <div className="w-full bg-[var(--bg-base)] rounded-full h-2">
                <div
                  className="bg-[var(--accent-blue)] h-2 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
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

        <div
          className="rounded-[var(--radius-card)] p-6 min-h-[400px]"
          style={{
            background:
              "linear-gradient(160deg, rgba(12,22,40,0.85), rgba(8,14,26,0.8))",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {activeTab === "account" && (
            <form
              className="space-y-10"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                updateProfile({
                  name: formData.get("name") as string,
                  organization: formData.get("organization") as string,
                  location: formData.get("location") as string,
                  timezone: formData.get("timezone") as string,
                  bio: formData.get("bio") as string,
                  website: formData.get("website") as string,
                  telegram: formData.get("telegram") as string,
                  discord: formData.get("discord") as string,
                  xTwitter: formData.get("xTwitter") as string,
                  linkedin: formData.get("linkedin") as string,
                  github: formData.get("github") as string,
                  farcaster: formData.get("farcaster") as string,
                  preferredChain: formData.getAll("preferredChain") as string[],
                  preferredTokens: formData.getAll(
                    "preferredTokens",
                  ) as string[],
                });
              }}
            >
              {/* --- BASIC INFO --- */}
              <div>
                <h3 className="text-xl font-bold mb-5 border-b border-[var(--border)] pb-2 text-[var(--text-primary)]">
                  Basic Profile
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      Display Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      defaultValue={user?.name || ""}
                      placeholder="John Doe"
                      className="bg-[var(--bg-base)] border-[var(--border)]"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      <Mail size={16} /> Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      defaultValue={user?.email || ""}
                      readOnly
                      title="Email cannot be changed directly"
                      className="bg-[var(--bg-subtle)] border-[var(--border)] text-[var(--text-muted)] opacity-80 cursor-not-allowed"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      Short Bio / What you do
                    </label>
                    <textarea
                      name="bio"
                      defaultValue={user?.bio || ""}
                      rows={3}
                      placeholder="Smart Contract Developer & Auditor based in..."
                      className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] p-3 text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors resize-none placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                </div>
              </div>

              {/* --- PROFESSIONAL DETAILS --- */}
              <div>
                <h3 className="text-xl font-bold mb-5 border-b border-[var(--border)] pb-2 text-[var(--text-primary)]">
                  Professional Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      <Building size={16} /> Organization / DAO
                    </label>
                    <Input
                      type="text"
                      name="organization"
                      placeholder="DeFi Security Inc."
                      defaultValue={user?.organization || ""}
                      className="bg-[var(--bg-base)] border-[var(--border)] placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      <Globe size={16} /> Website / Portfolio
                    </label>
                    <Input
                      type="url"
                      name="website"
                      placeholder="https://example.com"
                      defaultValue={user?.website || ""}
                      className="bg-[var(--bg-base)] border-[var(--border)] placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      Country / Region
                    </label>
                    <Input
                      type="text"
                      name="location"
                      placeholder="United States"
                      defaultValue={user?.location || ""}
                      className="bg-[var(--bg-base)] border-[var(--border)] placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      Time Zone (UTC Offset)
                    </label>
                    <select
                      name="timezone"
                      defaultValue={user?.timezone || ""}
                      className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] px-4 py-[10px] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-blue)]"
                    >
                      <option value="" disabled>
                        Select your UTC Time Zone
                      </option>
                      {UTC_TIMEZONES.map((tz) => (
                        <option key={tz.value} value={tz.value}>
                          {tz.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* --- SOCIAL & IDENTITY --- */}
              <div>
                <h3 className="text-xl font-bold mb-5 border-b border-[var(--border)] pb-2 text-[var(--text-primary)]">
                  Web3 Identity & Socials
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      <MessageCircle size={16} className="text-[#229ED9]" />{" "}
                      Telegram
                    </label>
                    <Input
                      type="text"
                      name="telegram"
                      placeholder="@username"
                      defaultValue={user?.telegram || ""}
                      className="bg-[var(--bg-base)] border-[var(--border)] placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      <Hash size={16} className="text-[#5865F2]" /> Discord
                    </label>
                    <Input
                      type="text"
                      name="discord"
                      placeholder="username#0000"
                      defaultValue={user?.discord || ""}
                      className="bg-[var(--bg-base)] border-[var(--border)] placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      <Twitter size={16} className="text-slate-300" /> X
                      (Twitter)
                    </label>
                    <Input
                      type="text"
                      name="xTwitter"
                      placeholder="@username"
                      defaultValue={user?.xTwitter || ""}
                      className="bg-[var(--bg-base)] border-[var(--border)] placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      <span className="text-[#855DCD] font-bold text-xs border border-[#855DCD] rounded px-1">
                        FC
                      </span>{" "}
                      Farcaster
                    </label>
                    <Input
                      type="text"
                      name="farcaster"
                      placeholder="@username"
                      defaultValue={user?.farcaster || ""}
                      className="bg-[var(--bg-base)] border-[var(--border)] placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      <Github size={16} className="text-slate-300" /> GitHub
                    </label>
                    <Input
                      type="text"
                      name="github"
                      placeholder="username"
                      defaultValue={user?.github || ""}
                      className="bg-[var(--bg-base)] border-[var(--border)] placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium mb-2 text-[var(--text-secondary)]">
                      <Linkedin size={16} className="text-[#0A66C2]" /> LinkedIn
                    </label>
                    <Input
                      type="text"
                      name="linkedin"
                      placeholder="Profile URL"
                      defaultValue={user?.linkedin || ""}
                      className="bg-[var(--bg-base)] border-[var(--border)] placeholder:text-[var(--text-muted)]"
                    />
                  </div>
                </div>
              </div>

              {/* --- ESCROW PREFERENCES --- */}
              <div>
                <h3 className="text-xl font-bold mb-5 border-b border-[var(--border)] pb-2 text-[var(--text-primary)]">
                  Escrow Preferences
                </h3>
                <div className="flex flex-col space-y-8">
                  {/* Preferred Chains Custom Dropdown */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">
                        Preferred Networks/Chains
                      </label>

                      {/* Hidden inputs to capture state for form submission */}
                      {selectedChains.map((chain) => (
                        <input
                          key={chain}
                          type="hidden"
                          name="preferredChain"
                          value={chain}
                        />
                      ))}

                      <div className="relative w-64" ref={chainRef}>
                        <div
                          onClick={() =>
                            setIsChainDropdownOpen(!isChainDropdownOpen)
                          }
                          className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] px-4 py-2 cursor-pointer flex items-center justify-between group hover:border-[var(--accent-blue)] transition-colors"
                        >
                          <span className="text-[var(--text-muted)] text-sm">
                            Select networks...
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-[var(--text-muted)] transition-transform ${isChainDropdownOpen ? "rotate-180" : ""}`}
                          />
                        </div>

                        {isChainDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-xl z-50 max-h-60 overflow-y-auto overflow-hidden">
                            {SUPPORTED_CHAINS.map((chain) => (
                              <div
                                key={chain.id}
                                onClick={() => {
                                  if (selectedChains.includes(chain.id)) {
                                    setSelectedChains((prev) =>
                                      prev.filter((c) => c !== chain.id),
                                    );
                                  } else {
                                    setSelectedChains((prev) => [
                                      ...prev,
                                      chain.id,
                                    ]);
                                  }
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-subtle)] cursor-pointer transition-colors border-b border-[var(--border-light)] last:border-0"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedChains.includes(chain.id)}
                                  readOnly
                                  className="w-4 h-4 accent-[var(--accent-blue)] bg-transparent border-[var(--border)] rounded cursor-pointer pointer-events-none"
                                />
                                <img
                                  src={chain.logo}
                                  alt={chain.name}
                                  className="w-5 h-5 rounded-full"
                                />
                                <span className="text-sm font-medium text-[var(--text-primary)]">
                                  {chain.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Selected Pills Outside */}
                    {selectedChains.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedChains.map((chainId) => {
                          const chainObj = SUPPORTED_CHAINS.find(
                            (c) => c.id === chainId,
                          );
                          return (
                            <span
                              key={chainId}
                              className="flex items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--border-light)] px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-primary)] shadow-sm"
                            >
                              {chainObj?.logo && (
                                <img
                                  src={chainObj.logo}
                                  alt={chainObj.name}
                                  className="w-4 h-4 rounded-full"
                                />
                              )}
                              {chainObj?.name || chainId}
                              <X
                                size={14}
                                className="ml-1 cursor-pointer text-[var(--text-muted)] hover:text-red-400 transition-colors"
                                onClick={() => {
                                  setSelectedChains((prev) =>
                                    prev.filter((c) => c !== chainId),
                                  );
                                }}
                              />
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Preferred Tokens Custom Dropdown */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-[var(--text-secondary)]">
                        Preferred Tokens
                      </label>

                      {/* Hidden inputs to capture state for form submission */}
                      {selectedTokens.map((token) => (
                        <input
                          key={token}
                          type="hidden"
                          name="preferredTokens"
                          value={token}
                        />
                      ))}

                      <div className="relative w-64" ref={tokenRef}>
                        <div
                          onClick={() =>
                            setIsTokenDropdownOpen(!isTokenDropdownOpen)
                          }
                          className="w-full bg-[var(--bg-base)] border border-[var(--border)] rounded-[var(--radius-input)] px-4 py-2 cursor-pointer flex items-center justify-between group hover:border-[var(--accent-green)] transition-colors"
                        >
                          <span className="text-[var(--text-muted)] text-sm">
                            Select tokens...
                          </span>
                          <ChevronDown
                            size={16}
                            className={`text-[var(--text-muted)] transition-transform ${isTokenDropdownOpen ? "rotate-180" : ""}`}
                          />
                        </div>

                        {isTokenDropdownOpen && (
                          <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-card)] shadow-xl z-50 max-h-60 overflow-y-auto overflow-hidden">
                            {SUPPORTED_TOKENS.map((token) => (
                              <div
                                key={token.id}
                                onClick={() => {
                                  if (selectedTokens.includes(token.id)) {
                                    setSelectedTokens((prev) =>
                                      prev.filter((t) => t !== token.id),
                                    );
                                  } else {
                                    setSelectedTokens((prev) => [
                                      ...prev,
                                      token.id,
                                    ]);
                                  }
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-subtle)] cursor-pointer transition-colors border-b border-[var(--border-light)] last:border-0"
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedTokens.includes(token.id)}
                                  readOnly
                                  className="w-4 h-4 accent-[var(--accent-green)] bg-transparent border-[var(--border)] rounded cursor-pointer pointer-events-none"
                                />
                                <img
                                  src={token.logo}
                                  alt={token.name}
                                  className="w-5 h-5 rounded-full"
                                />
                                <span className="text-sm font-medium text-[var(--text-primary)]">
                                  {token.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Selected Pills Outside */}
                    {selectedTokens.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedTokens.map((tokenId) => {
                          const tokenObj = SUPPORTED_TOKENS.find(
                            (t) => t.id === tokenId,
                          );
                          return (
                            <span
                              key={tokenId}
                              className="flex items-center gap-1.5 bg-[var(--bg-card)] border border-[var(--border-light)] px-3 py-1.5 rounded-full text-xs font-medium text-[var(--text-primary)] shadow-sm"
                            >
                              {tokenObj?.logo && (
                                <img
                                  src={tokenObj.logo}
                                  alt={tokenObj.name}
                                  className="w-4 h-4 rounded-full"
                                />
                              )}
                              {tokenObj?.name || tokenId}
                              <X
                                size={14}
                                className="ml-1 cursor-pointer text-[var(--text-muted)] hover:text-red-400 transition-colors"
                                onClick={() => {
                                  setSelectedTokens((prev) =>
                                    prev.filter((t) => t !== tokenId),
                                  );
                                }}
                              />
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* --- CONNECTED WALLETS --- */}
              <div>
                <div className="flex items-center justify-between mb-5 border-b border-[var(--border)] pb-2">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">
                    Connected Wallets
                  </h3>
                  {(!user?.wallets || user.wallets.length < 3) && (
                    <button
                      type="button"
                      className="text-xs text-[var(--accent-blue)] hover:text-blue-400 font-bold transition-colors"
                    >
                      + Link New Wallet
                    </button>
                  )}
                </div>

                <div className="flex flex-col space-y-4">
                  {user?.wallets?.map((wallet, index) => (
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

              {/* --- SAVE BUTTON --- */}
              <div className="pt-8 border-t border-[var(--border)] flex justify-end">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isPending}
                  className="px-8 py-3 font-bold text-md shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all"
                >
                  {isPending ? "Saving Profile..." : "Save Changes"}
                </Button>
              </div>
            </form>
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

              {/* ─────────────────────────────────────────────────────────
                      3. ACTIVE SESSIONS 
                  ─────────────────────────────────────────────────────────── */}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
