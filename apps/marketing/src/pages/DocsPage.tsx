import React, { useState } from "react";
import {
  Search,
  ChevronRight,
  ExternalLink,
  Menu,
  X,
  BookOpen,
  Zap,
  Code,
  Shield,
  Scale,
  Coins,
  Link,
  Globe,
  Terminal,
  AlertTriangle,
  Info,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

/* ─── Logo ─────────────────────────────────────────────────────────────── */
function SettleOneLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoGradDocs" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <path
        d="M20 2L36 11V29L20 38L4 29V11L20 2Z"
        stroke="url(#logoGradDocs)"
        strokeWidth="2"
        fill="rgba(59,130,246,0.1)"
      />
      <path
        d="M14 16.5C14 14.567 15.567 13 17.5 13H22C23.657 13 25 14.343 25 16C25 17.657 23.657 19 22 19H18C16.343 19 15 20.343 15 22C15 23.657 16.343 25 18 25H22.5C24.433 25 26 23.433 26 21.5"
        stroke="url(#logoGradDocs)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ─── Doc Data ──────────────────────────────────────────────────────────── */
const docSections = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Zap,
    color: "#3B82F6",
    pages: [
      { id: "introduction", label: "Introduction", active: true },
      { id: "quickstart", label: "Quickstart Guide" },
      { id: "architecture", label: "Architecture Overview" },
      { id: "installation", label: "Installation" },
    ],
  },
  {
    id: "deal-lifecycle",
    label: "Deal Lifecycle",
    icon: ArrowRight,
    color: "#10B981",
    pages: [
      { id: "deal-states", label: "Deal States" },
      { id: "creating-deals", label: "Creating a Deal" },
      { id: "funding", label: "Funding Guide (60/40)" },
      { id: "cancellation", label: "Cancellation & Refunds" },
    ],
  },
  {
    id: "delivery-verification",
    label: "Delivery & Verification",
    icon: CheckCircle,
    color: "#8B5CF6",
    pages: [
      { id: "submit-delivery", label: "Submit Delivery" },
      { id: "evidence-layer", label: "Evidence Layer (IPFS)" },
      { id: "eip712", label: "EIP-712 Signatures" },
      { id: "chainlink-verifier", label: "Chainlink Verifier" },
    ],
  },
  {
    id: "disputes",
    label: "Disputes & Arbitration",
    icon: Scale,
    color: "#F59E0B",
    pages: [
      { id: "raising-dispute", label: "Raising a Dispute" },
      { id: "arbitration-flow", label: "Arbitration Flow" },
      { id: "verdicts", label: "Verdicts & Split Settlement" },
      { id: "dispute-window", label: "Dispute Window" },
    ],
  },
  {
    id: "setl-token",
    label: "SETL Token",
    icon: Coins,
    color: "#06B6D4",
    pages: [
      { id: "setl-overview", label: "SETL Overview" },
      { id: "governance", label: "Governance" },
      { id: "staking", label: "Arbitrator Staking" },
      { id: "buybacks", label: "Fee Buybacks" },
    ],
  },
  {
    id: "smart-contracts",
    label: "Smart Contract Reference",
    icon: Code,
    color: "#EF4444",
    pages: [
      { id: "deal-manager", label: "DealManager.sol" },
      { id: "escrow-vault", label: "EscrowVault.sol" },
      { id: "delivery-manager", label: "DeliveryManager.sol" },
      { id: "dispute-resolver", label: "DisputeResolver.sol" },
    ],
  },
  {
    id: "api-reference",
    label: "API Reference",
    icon: Globe,
    color: "#10B981",
    pages: [
      { id: "auth-endpoints", label: "Auth Endpoints" },
      { id: "deal-endpoints", label: "Deal Endpoints" },
      { id: "user-endpoints", label: "User Endpoints" },
    ],
  },
  {
    id: "sdk-reference",
    label: "SDK Reference",
    icon: Terminal,
    color: "#3B82F6",
    pages: [
      { id: "sdk-install", label: "Installation" },
      { id: "use-deal-manager", label: "useDealManager() Hook" },
      { id: "use-escrow-vault", label: "useEscrowVault() Hook" },
      { id: "use-delivery", label: "useDelivery() Hook" },
    ],
  },
];

const anchors = [
  "Introduction",
  "Core Concepts",
  "EscrowVault",
  "DealManager",
  "DeliveryManager",
  "Security & Audits",
  "Developer Warning",
];

/* ─── Docs Main Content ─────────────────────────────────────────────────── */
function IntroductionContent() {
  return (
    <div>
      {/* Docs Hero */}
      <div
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          marginBottom: "2.5rem",
          position: "relative",
          border: "1px solid var(--border)",
        }}
      >
        <img
          src="/docs-hero.jpg"
          alt="SettleOne SDK Architecture"
          style={{
            width: "100%",
            height: "240px",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(7,11,20,0.9) 0%, rgba(7,11,20,0.2) 60%, transparent 100%)",
          }}
        />
        <div style={{ position: "absolute", bottom: "24px", left: "28px" }}>
          <div
            className="section-badge"
            style={{ marginBottom: "8px", display: "inline-flex" }}
          >
            <BookOpen size={10} /> Getting Started
          </div>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "#fff",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Introduction to SettleOne
          </h1>
        </div>
      </div>

      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "16px",
          lineHeight: 1.8,
          marginBottom: "2rem",
        }}
      >
        SettleOne is a{" "}
        <strong style={{ color: "var(--text-primary)" }}>
          verifiable transaction commitment layer
        </strong>{" "}
        for Web3 commerce. We provide trustless escrow, yield generation, and
        decentralized dispute resolution for freelancers, auditors, and supply
        chain merchants operating in MSME markets.
      </p>

      {/* Info callout */}
      <div
        style={{
          background: "rgba(59,130,246,0.08)",
          border: "1px solid rgba(59,130,246,0.25)",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "2rem",
          display: "flex",
          gap: "14px",
          alignItems: "flex-start",
        }}
      >
        <Info
          size={18}
          style={{
            color: "var(--accent-blue)",
            flexShrink: 0,
            marginTop: "2px",
          }}
        />
        <div>
          <p
            style={{
              fontWeight: 600,
              fontSize: "14px",
              color: "var(--accent-blue)",
              margin: "0 0 4px",
            }}
          >
            Live on Arbitrum Sepolia
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "13px",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            SettleOne V1 is currently deployed on Arbitrum Sepolia testnet.
            Mainnet deployment is pending final audit completion.
          </p>
        </div>
      </div>

      <h2
        id="core-concepts"
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "16px",
          paddingTop: "8px",
          borderTop: "1px solid var(--border)",
        }}
      >
        Core Concepts
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "14px",
          lineHeight: 1.8,
          marginBottom: "20px",
        }}
      >
        The protocol is split into three main pieces of infrastructure, each
        handling a distinct phase of the deal lifecycle:
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px",
          marginBottom: "2.5rem",
        }}
      >
        {[
          {
            icon: Code,
            color: "#3B82F6",
            title: "DealManager",
            desc: "Orchestrates all state transitions — from AwaitingFunding through to Released, Settled, or Cancelled. Acts as the protocol's central state machine.",
          },
          {
            icon: Shield,
            color: "#8B5CF6",
            title: "EscrowVault",
            desc: "Secures stablecoin deposits and routes them to Aave V3 for yield generation while the deal is active. Uses a share-based model for precise accounting.",
          },
          {
            icon: CheckCircle,
            color: "#10B981",
            title: "DeliveryManager",
            desc: "Stores IPFS CID proofs and handles the EIP-712 cryptographic verification of deliverables. Every proof is immutably recorded on-chain.",
          },
        ].map((card) => (
          <div
            key={card.title}
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "20px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: `${card.color}18`,
                border: `1px solid ${card.color}30`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "14px",
              }}
            >
              <card.icon size={20} style={{ color: card.color }} />
            </div>
            <h3
              style={{
                fontSize: "15px",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "8px",
                fontFamily: "var(--font-mono)",
              }}
            >
              {card.title}
              <span style={{ color: "var(--text-muted)" }}>.sol</span>
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "13px",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {card.desc}
            </p>
          </div>
        ))}
      </div>

      <h2
        id="escrowvault"
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "16px",
          paddingTop: "8px",
          borderTop: "1px solid var(--border)",
        }}
      >
        EscrowVault Architecture
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "14px",
          lineHeight: 1.8,
          marginBottom: "16px",
        }}
      >
        The EscrowVault is a shared yield-bearing pool. When a buyer funds a
        deal, their tokens are deposited into the vault which mints internal
        "shares" representing their portion. These shares are then deployed to
        Aave V3 to accrue yield over the deal duration.
      </p>
      <div className="code-block" style={{ marginBottom: "2rem" }}>
        <span style={{ color: "#8B9CC8" }}>
          // Simplified EscrowVault deposit flow
        </span>
        {"\n"}
        <span style={{ color: "#E879F9" }}>function</span>{" "}
        <span style={{ color: "#22D3EE" }}>deposit</span>(
        <span style={{ color: "#F0F4FF" }}>uint256 amount, uint256 dealId</span>
        ) <span style={{ color: "#E879F9" }}>external</span> {"{"}
        {"\n"}
        {"  "}
        <span style={{ color: "#8B9CC8" }}>// Transfer tokens from buyer</span>
        {"\n"}
        {"  "}
        <span style={{ color: "#F0F4FF" }}>
          IERC20(token).transferFrom(msg.sender, address(this), amount);
        </span>
        {"\n"}
        {"  "}
        <span style={{ color: "#8B9CC8" }}>// Supply to Aave V3 pool</span>
        {"\n"}
        {"  "}
        <span style={{ color: "#F0F4FF" }}>
          aavePool.supply(token, amount, address(this), 0);
        </span>
        {"\n"}
        {"  "}
        <span style={{ color: "#8B9CC8" }}>
          // Mint shares for deal tracking
        </span>
        {"\n"}
        {"  "}
        <span style={{ color: "#F0F4FF" }}>
          dealShares[dealId] = _mintShares(amount);
        </span>
        {"\n"}
        {"}"}
      </div>

      <h2
        id="dealmanager"
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "16px",
          paddingTop: "8px",
          borderTop: "1px solid var(--border)",
        }}
      >
        DealManager State Machine
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "14px",
          lineHeight: 1.8,
          marginBottom: "16px",
        }}
      >
        Every deal progresses through a well-defined sequence of states. State
        transitions are triggered by on-chain actions (funding, delivery
        submission, acceptance) or automated by Chainlink Keepers (timeout
        escalations).
      </p>
      <div
        style={{
          background: "rgba(16,185,129,0.06)",
          border: "1px solid rgba(16,185,129,0.2)",
          borderRadius: "10px",
          padding: "16px 20px",
          marginBottom: "2rem",
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
          color: "var(--text-secondary)",
          lineHeight: 1.9,
        }}
      >
        <span style={{ color: "#F59E0B" }}>AwaitingFunding</span>
        {" → "}
        <span style={{ color: "#3B82F6" }}>PendingSellerAcceptance</span>
        {" → "}
        <span style={{ color: "#10B981" }}>Active</span>
        {" → "}
        <span style={{ color: "#8B5CF6" }}>DeliverySubmitted</span>
        {" → "}
        <span style={{ color: "#0EA5E9" }}>Verifying</span>
        {" → "}
        <span style={{ color: "#14B8A6" }}>AwaitingAcceptance</span>
        {" → "}
        <br />
        {"       → "}
        <span style={{ color: "#10B981" }}>Released</span>
        {" | "}
        <span style={{ color: "#EF4444" }}>Disputed</span>
        {" → "}
        <span style={{ color: "#64748B" }}>Settled</span>
        {" | "}
        <span style={{ color: "#F59E0B" }}>Refunded</span>
        {" | "}
        <span style={{ color: "#6B7280" }}>Cancelled</span>
      </div>

      <h2
        id="deliverymanager"
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "16px",
          paddingTop: "8px",
          borderTop: "1px solid var(--border)",
        }}
      >
        DeliveryManager
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "14px",
          lineHeight: 1.8,
          marginBottom: "2rem",
        }}
      >
        Sellers submit delivery proof by calling{" "}
        <code
          style={{
            fontFamily: "var(--font-mono)",
            background: "rgba(255,255,255,0.07)",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "12px",
            color: "#7DD3FC",
          }}
        >
          submitDelivery(dealId, ipfsCid)
        </code>
        . The IPFS CID is stored immutably on-chain. A verifier (EIP-712 signer
        or Chainlink node) then calls{" "}
        <code
          style={{
            fontFamily: "var(--font-mono)",
            background: "rgba(255,255,255,0.07)",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "12px",
            color: "#7DD3FC",
          }}
        >
          verifyDelivery()
        </code>{" "}
        to advance the deal to <em>AwaitingAcceptance</em>.
      </p>

      <h2
        id="security-audits"
        style={{
          fontSize: "22px",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "16px",
          paddingTop: "8px",
          borderTop: "1px solid var(--border)",
        }}
      >
        Security &amp; Audits
      </h2>
      <p
        style={{
          color: "var(--text-secondary)",
          fontSize: "14px",
          lineHeight: 1.8,
          marginBottom: "20px",
        }}
      >
        Security is our top priority. The V1 smart contracts have been audited
        by OpenZeppelin and Trail of Bits. All funds are held in non-upgradable
        proxy contracts with a 48-hour time-lock on critical parameter changes.
      </p>

      {/* Warning callout */}
      <div
        id="developer-warning"
        style={{
          background: "rgba(239,68,68,0.08)",
          border: "1px solid rgba(239,68,68,0.25)",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "2.5rem",
          display: "flex",
          gap: "14px",
          alignItems: "flex-start",
        }}
      >
        <AlertTriangle
          size={18}
          style={{ color: "#EF4444", flexShrink: 0, marginTop: "2px" }}
        />
        <div>
          <p
            style={{
              fontWeight: 700,
              fontSize: "14px",
              color: "#F87171",
              margin: "0 0 6px",
            }}
          >
            Developer Warning
          </p>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "13px",
              margin: "0 0 8px",
              lineHeight: 1.6,
            }}
          >
            When interacting with the SDK, ensure you pass amounts in their
            native decimal format.
          </p>
          <div
            className="code-block"
            style={{ fontSize: "12px", padding: "10px 14px" }}
          >
            <span style={{ color: "#8B9CC8" }}>
              // ❌ Wrong — will cause precision errors
            </span>
            {"\n"}
            <span style={{ color: "#F0F4FF" }}>
              createDeal({"{"} amount: 100 {"}"});
            </span>
            {"\n\n"}
            <span style={{ color: "#8B9CC8" }}>
              // ✅ Correct — use parseOnChainAmount()
            </span>
            {"\n"}
            <span style={{ color: "#22D3EE" }}>import</span>{" "}
            <span style={{ color: "#F0F4FF" }}>{"{ parseOnChainAmount }"}</span>{" "}
            <span style={{ color: "#22D3EE" }}>from</span>{" "}
            <span style={{ color: "#A3E635" }}>'@settleone/utils'</span>;{"\n"}
            <span style={{ color: "#F0F4FF" }}>
              createDeal({"{"} amount: parseOnChainAmount(100, 'USDC') {"}"});
            </span>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          borderTop: "1px solid var(--border)",
          paddingTop: "24px",
        }}
      >
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "var(--accent-blue)",
            fontSize: "14px",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Next: Quickstart Guide <ChevronRight size={16} />
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN DOCS PAGE
   ═══════════════════════════════════════════════════════════════════════════ */
export function DocsPage() {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [activePage, setActivePage] = useState("introduction");
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "getting-started",
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState("Introduction");

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const filteredSections = searchQuery
    ? docSections
        .map((s) => ({
          ...s,
          pages: s.pages.filter((p) =>
            p.label.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter(
          (s) =>
            s.pages.length > 0 ||
            s.label.toLowerCase().includes(searchQuery.toLowerCase()),
        )
    : docSections;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--bg-base)",
        fontFamily: "var(--font-sans)",
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(7,11,20,0.95)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border)",
          height: "58px",
          display: "flex",
          alignItems: "center",
          padding: "0 1.5rem",
          gap: "20px",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <SettleOneLogo size={28} />
          <span
            style={{
              fontWeight: 700,
              fontSize: "16px",
              color: "var(--text-primary)",
            }}
          >
            SettleOne
          </span>
        </a>
        <div
          style={{
            width: "1px",
            height: "24px",
            background: "var(--border)",
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: "13px",
            color: "var(--text-muted)",
            flexShrink: 0,
          }}
        >
          Docs
        </span>

        {/* Global search */}
        <div style={{ flex: 1, maxWidth: "500px", position: "relative" }}>
          <Search
            size={14}
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
          <input
            id="docs-search"
            type="text"
            placeholder="Search docs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "6px 12px 6px 34px",
              fontSize: "13px",
              color: "var(--text-primary)",
              outline: "none",
              transition: "all 0.2s",
              fontFamily: "var(--font-sans)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--accent-blue)";
              e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--border)";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Nav links */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginLeft: "auto",
            alignItems: "center",
          }}
        >
          <a
            href="/"
            style={{
              color: "var(--text-secondary)",
              fontSize: "13px",
              fontWeight: 500,
              textDecoration: "none",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            Home
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            style={{
              color: "var(--text-secondary)",
              fontSize: "13px",
              fontWeight: 500,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            GitHub <ExternalLink size={12} />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileSidebarOpen((v) => !v)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-primary)",
            padding: "4px",
            marginLeft: "8px",
          }}
        >
          {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div style={{ display: "flex", paddingTop: "58px", minHeight: "100vh" }}>
        {/* ── LEFT SIDEBAR ────────────────────────────────────────────────── */}
        <aside
          id="docs-sidebar"
          style={{
            width: "260px",
            flexShrink: 0,
            position: "fixed",
            top: "58px",
            left: 0,
            bottom: 0,
            overflowY: "auto",
            overflowX: "hidden",
            background: "rgba(7,11,20,0.98)",
            borderRight: "1px solid var(--border)",
            padding: "1.5rem 0",
            transform: mobileSidebarOpen ? "translateX(0)" : undefined,
            zIndex: 50,
          }}
          className="docs-sidebar"
        >
          {filteredSections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.includes(section.id);
            return (
              <div key={section.id} style={{ marginBottom: "4px" }}>
                <button
                  onClick={() => toggleSection(section.id)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 20px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color:
                      activeSection === section.id
                        ? section.color
                        : "var(--text-secondary)",
                    fontSize: "13px",
                    fontWeight: 600,
                    textAlign: "left",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== section.id)
                      e.currentTarget.style.color = "var(--text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== section.id)
                      e.currentTarget.style.color = "var(--text-secondary)";
                  }}
                >
                  <Icon
                    size={14}
                    style={{
                      flexShrink: 0,
                      color: isExpanded ? section.color : "inherit",
                    }}
                  />
                  <span style={{ flex: 1 }}>{section.label}</span>
                  <ChevronRight
                    size={12}
                    style={{
                      transform: isExpanded ? "rotate(90deg)" : "rotate(0)",
                      transition: "transform 0.2s",
                      flexShrink: 0,
                    }}
                  />
                </button>

                {isExpanded && (
                  <ul
                    style={{
                      listStyle: "none",
                      padding: "2px 0 4px",
                      margin: 0,
                    }}
                  >
                    {section.pages.map((page) => {
                      const isActive = activePage === page.id;
                      return (
                        <li key={page.id}>
                          <button
                            id={`docs-link-${page.id}`}
                            onClick={() => {
                              setActivePage(page.id);
                              setActiveSection(section.id);
                              setMobileSidebarOpen(false);
                            }}
                            style={{
                              width: "100%",
                              background: isActive
                                ? `${section.color}12`
                                : "none",
                              border: "none",
                              cursor: "pointer",
                              borderLeft: isActive
                                ? `2px solid ${section.color}`
                                : "2px solid transparent",
                              padding: isActive
                                ? "6px 20px 6px 34px"
                                : "6px 20px 6px 36px",
                              color: isActive
                                ? section.color
                                : "var(--text-muted)",
                              fontSize: "13px",
                              textAlign: "left",
                              transition: "all 0.15s",
                            }}
                            onMouseEnter={(e) => {
                              if (!isActive) {
                                e.currentTarget.style.color =
                                  "var(--text-secondary)";
                                e.currentTarget.style.background =
                                  "rgba(255,255,255,0.03)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isActive) {
                                e.currentTarget.style.color =
                                  "var(--text-muted)";
                                e.currentTarget.style.background = "none";
                              }
                            }}
                          >
                            {page.label}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </aside>

        {/* ── MAIN CONTENT ───────────────────────────────────────────────── */}
        <main
          style={{
            flex: 1,
            marginLeft: "260px",
            marginRight: "220px",
            padding: "2.5rem 3rem",
            maxWidth: "none",
            minWidth: 0,
          }}
          id="docs-main"
          className="docs-main"
        >
          <IntroductionContent />
        </main>

        {/* ── RIGHT SIDEBAR (On This Page) ────────────────────────────────── */}
        <aside
          id="docs-anchors"
          style={{
            width: "220px",
            flexShrink: 0,
            position: "fixed",
            top: "58px",
            right: 0,
            bottom: 0,
            overflowY: "auto",
            borderLeft: "1px solid var(--border)",
            padding: "1.5rem 1.25rem",
            background: "rgba(7,11,20,0.6)",
          }}
          className="docs-anchors"
        >
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "12px",
            }}
          >
            On this page
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {anchors.map((anchor) => {
              const isActive = activeAnchor === anchor;
              return (
                <li key={anchor}>
                  <button
                    id={`anchor-${anchor.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => setActiveAnchor(anchor)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      padding: "5px 0 5px 12px",
                      borderLeft: isActive
                        ? "2px solid var(--accent-blue)"
                        : "2px solid transparent",
                      fontSize: "12px",
                      color: isActive
                        ? "var(--accent-blue)"
                        : "var(--text-muted)",
                      transition: "all 0.15s",
                      lineHeight: 1.5,
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive)
                        e.currentTarget.style.color = "var(--text-secondary)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive)
                        e.currentTarget.style.color = "var(--text-muted)";
                    }}
                  >
                    {anchor}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Separator */}
          <div
            style={{
              height: "1px",
              background: "var(--border)",
              margin: "20px 0",
            }}
          />

          {/* Quick links */}
          <p
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginBottom: "10px",
            }}
          >
            Quick Links
          </p>
          {[
            { label: "GitHub", href: "#" },
            { label: "Contracts", href: "#" },
            { label: "Audit Report", href: "#" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                color: "var(--text-muted)",
                fontSize: "12px",
                textDecoration: "none",
                padding: "4px 0",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              <ExternalLink size={11} /> {link.label}
            </a>
          ))}
        </aside>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 1200px) {
          .docs-anchors { display: none !important; }
          .docs-main { margin-right: 0 !important; }
        }
        @media (max-width: 768px) {
          .docs-sidebar {
            transform: translateX(-100%);
            transition: transform 0.25s ease;
          }
          .docs-main {
            margin-left: 0 !important;
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
