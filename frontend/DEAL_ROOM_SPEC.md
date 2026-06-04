# SettleOne Deal Room Specification

The Deal Room is the primary interface where Buyers and Sellers manage their commitments. It is a live, state-driven transaction environment.

## 1. Component Hierarchy

```text
DealRoomLayout
├── StickyHeader
│   ├── DealStatusBanner (State-aware: e.g., "Awaiting Funding", "Disputed")
│   └── DealTitleSection (ID, Participants, Created Date)
├── DealTimeline (The primary progress tracker)
├── ActionCenter (Contextual actions: "Fund", "Deliver", "Accept")
├── MainContent (Two-column grid)
│   ├── LeftColumn (Primary Operations)
│   │   ├── DeliverablesPanel (Submitted work + Evidence hashes)
│   │   ├── EvidencePanel (Generic document management)
│   │   └── MessagingPanel (Audit trail of communication)
│   └── RightColumn (Financials & Status)
│       ├── DealSummaryCard (Amount, Deadline, Rules)
│       ├── EscrowVaultPanel
│       │   ├── EscrowPositionCard (Locked Principal)
│       │   └── VaultYieldCard (Live APY + Generated Yield)
│       ├── SettlementBreakdownCard (Projected payout split)
│       └── ActivityFeed (Immutable event log)
```

## 2. Responsive Layouts

### Desktop (1280px+)
- **Layout:** Two columns. Left (65%), Right (35%).
- **Navigation:** Fixed sidebar (280px).
- **Timeline:** Horizontal above the grid.

### Tablet (768px - 1024px)
- **Layout:** Single column.
- **Sidebar:** Collapsed to icon-only or hamburger menu.
- **Timeline:** Horizontal (scrollable if necessary).
- **Order:** Header -> Timeline -> Action Center -> Summary -> Escrow/Vault -> Deliverables -> Evidence -> Messages -> Activity.

### Mobile (<768px)
- **Layout:** Vertical stack with high density.
- **Timeline:** Simplified vertical progress list or horizontally scrollable cards.
- **Action Center:** Sticky to the bottom of the viewport for thumb-accessibility.
- **Tabs:** Use tabs for [Overview | Evidence | Messages] to reduce vertical scrolling.

---

## 3. State-Driven Action Mapping

Actions are strictly derived from the `DealState` and the user's `Role`.

| DealState | Buyer Actions | Seller Actions | UI Status Indicator |
| :--- | :--- | :--- | :--- |
| `AwaitingFunding` | **Fund Deal**, Cancel | View Terms | Warning: Unfunded |
| `PendingSellerAcceptance` | Cancel | **Accept**, **Reject** | Info: Pending Seller |
| `Active` | View Progress | **Submit Delivery** | Success: Work in Progress |
| `DeliverySubmitted` | View Evidence | Update Delivery | Info: Verification Pending |
| `AwaitingAcceptance` | **Accept Delivery**, **Dispute** | View Evidence | Warning: Review Required |
| `Accepted` | View Countdown | View Countdown | Success: Dispute Window |
| `Disputed` | **Submit Evidence** | **Submit Evidence** | Error: In Dispute |
| `Released` | View Receipt | View Receipt | Success: Finalized |

---

## 4. Visual Wireframe (Conceptual)

```text
+-------------------------------------------------------------+
| [LOGO] Search...                     [🔔] [Profile]         |
+-------------------------------------------------------------+
| [Side] | [ID #125] Smart Contract Audit                     |
| [Nav ] | Status: ACTIVE (3 Days Left)                       |
|        | -------------------------------------------------- |
|        | [Timeline: CREATED -> FUNDED -> ACCEPTED -> ACTIVE]|
|        | -------------------------------------------------- |
|        | [ ACTION: SUBMIT DELIVERY (Primary) ]              |
|        | -------------------------------------------------- |
|        | [ LEFT COLUMN ]              [ RIGHT COLUMN ]      |
|        | +----------------------+     +--------------------+|
|        | | DELIVERABLES         |     | DEAL SUMMARY       ||
|        | | - file_v1.zip [hash] |     | Amount: 10,000 USDC||
|        | +----------------------+     | Deadline: Oct 12   ||
|        | | EVIDENCE             |     +--------------------+|
|        | | - invoice.pdf        |     | ESCROW & VAULT     ||
|        | +----------------------+     | Principal: 10k USDC||
|        | | MESSAGING            |     | Yield: +12.50 USDC ||
|        | | "Seller: Working!"   |     +--------------------+|
+-------------------------------------------------------------+
```
