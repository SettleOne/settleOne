# Phase 3: Deal Room Architecture & Review

## 1. Component Hierarchy Diagram

The Deal Room acts as the transaction OS, structured as a high-context workspace rather than a simple page.

```text
<WorkspaceShell> (Global App Layout)
  └── <DealRoomLayout> (Core Product Surface)
      ├── <DealHeader> (Persistent Context: Title, ID, Counterparty, Amount)
      ├── <MainWorkspace> (Left/Center Panel - Scrollable)
      │   ├── <StatusBanner> (Current State, Countdown, Primary Action)
      │   ├── <LifecycleTimeline> (Visual Audit Trail of Stages)
      │   ├── <ActionCenter> (Contextual Actions based on Role & State)
      │   └── <WorkspaceTabs> (Deep Dives)
      │       ├── <DeliverablesWorkspace> (Files, Tracking, IPFS)
      │       ├── <EvidenceWorkspace> (Case Management, Verified Artifacts)
      │       ├── <CommunicationLayer> (Slack-like Transaction Channel)
      │       └── <ActivityFeed> (GitHub-style Event Timeline)
      └── <RightContextPanel> (Sticky Side Panel)
          ├── <StateSummary> (Quick awareness)
          ├── <DeadlineTracker> (Active countdowns)
          └── <EscrowYieldPanel> (Principal, Yield, Projected Settlement)
```

## 2. State Mapping Diagram

The `DealState` drives the UI visualization, specifically the `StatusBanner` and `LifecycleTimeline`.

```text
[Draft] -> [AwaitingFunding] -> [PendingSellerAcceptance] -> [Active]
                                                                |
        +-------------------------------------------------------+
        v
[DeliverySubmitted] -> [AwaitingAcceptance] -> [Accepted] -> [Released/Settled]
        |                       |                  |
        v                       v                  v
    (Disputed)             (Disputed)          (Refunded)
```

**Status Banner Mapping Examples:**
- `AwaitingFunding`: Warning Yellow | "Awaiting Buyer Funding" | Countdown: 24h
- `PendingSellerAcceptance`: Info Blue | "Awaiting Seller Acceptance" | Countdown: 48h
- `Active`: Success Green | "Deal is Active" | Countdown to Delivery
- `Disputed`: Error Red | "Dispute Window Active" | Action required from Arbitrator

## 3. Action Center Mapping

Actions are never hardcoded. They are derived from `(DealState, UserRole, VerificationState)`.

| Deal State | Buyer Actions | Seller Actions | Arbitrator Actions |
| :--- | :--- | :--- | :--- |
| **AwaitingFunding** | `Fund Deal`, `Cancel Deal` | *None (Wait)* | *None* |
| **PendingSellerAcceptance** | *None (Wait)* | `Accept Deal`, `Reject Deal` | *None* |
| **Active** | `Raise Dispute` | `Submit Delivery`, `Raise Dispute` | *None* |
| **DeliverySubmitted** | `Review Delivery`, `Raise Dispute` | *None (Wait)* | *None* |
| **AwaitingAcceptance** | `Accept Delivery`, `Raise Dispute` | *None (Wait)* | *None* |
| **Disputed** | `Submit Evidence`, `Propose Settlement` | `Submit Evidence`, `Propose Settlement` | `Review Evidence`, `Issue Verdict` |
| **Accepted** | `Release Funds` | *None* | *None* |

## 4. Realtime Event Flow Diagram

The Deal Room feels "alive" through the `@settleone/utils` `eventBus`, which will eventually connect to WebSockets/blockchain events.

```text
[Smart Contract / Backend]
        |
        v (Webhook / Polling / WebSocket)
[RealtimeProvider (React Context)]
        |
        +-- emits --> 'DealFunded'
        |
[eventBus.subscribe('DealFunded')]
        |
        +--> Updates <StatusBanner> (Changes to PendingSellerAcceptance)
        +--> Updates <LifecycleTimeline> (Marks Funded as Complete)
        +--> Updates <ActionCenter> (Reveals Seller Actions)
        +--> Appends to <ActivityFeed> ("Buyer funded 5,000 USDC")
        +--> Triggers NotificationProvider (Toast Alert)
```

## Review Request
The structural UI components for these modules are being built into `@settleone/design-system/src/components/deal/` and integrated into the `apps/workspace/src/pages/DealRoom.tsx` page to provide the requested responsive screenshots (Desktop, Tablet, Mobile) as per Phase 3 requirements.
