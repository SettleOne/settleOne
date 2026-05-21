# SettleOne

SettleOne is a Payment Commitment Layer (PCL) for business transactions.
It lets a buyer commit funds before work begins, lets a seller prove delivery,
and lets smart contracts settle the payment by release, refund, or split based
on transparent on-chain rules.

The simplest way to understand SettleOne:

```text
Before work starts, payment is locked.
Before payment is released, delivery must be verified.
Before a dispute is finalized, resolution rules must be followed.
```

SettleOne is built for MSMEs, vendors, suppliers, freelancers, service
providers, B2B commerce, marketplaces, and any workflow where delayed payments
or informal settlement promises create operational risk.

## Core Thesis

Most business payment systems treat payment as something that happens after
delivery. That creates a trust gap:

```text
Seller performs work first
Buyer decides when or whether to pay later
Dispute resolution is slow, manual, and uncertain
```

SettleOne changes the order:

```text
Buyer commits funds first
Seller performs work with payment already guaranteed
Delivery is verified
Contracts settle according to the agreed path
```

This is not only escrow. It is programmable settlement infrastructure.

## Table of Contents

- [Core Thesis](#core-thesis)
- [What Problem SettleOne Solves](#what-problem-settleone-solves)
- [What SettleOne Is](#what-settleone-is)
- [What SettleOne Is Not](#what-settleone-is-not)
- [Who SettleOne Is For](#who-settleone-is-for)
- [Repository Scope](#repository-scope)
- [Current Repository Structure](#current-repository-structure)
- [High-Level Architecture](#high-level-architecture)
- [Component Responsibilities](#component-responsibilities)
- [Participants and Trust Boundaries](#participants-and-trust-boundaries)
- [End-to-End Product Flow](#end-to-end-product-flow)
- [Deal Lifecycle and State Machine](#deal-lifecycle-and-state-machine)
- [On-Chain Data Model](#on-chain-data-model)
- [Contract Suite Overview](#contract-suite-overview)
- [Detailed Contract Responsibilities](#detailed-contract-responsibilities)
- [Verification Model](#verification-model)
- [Dispute Model](#dispute-model)
- [Vault and Settlement Model](#vault-and-settlement-model)
- [Automation Model](#automation-model)
- [Yield Strategy Model](#yield-strategy-model)
- [Frontend Product Guide](#frontend-product-guide)
- [Backend and Verifier Guide](#backend-and-verifier-guide)
- [Event and Indexing Guide](#event-and-indexing-guide)
- [Security Model](#security-model)
- [Access Control and Roles](#access-control-and-roles)
- [Upgradeability](#upgradeability)
- [Setup Guide](#setup-guide)
- [Development Workflow](#development-workflow)
- [Testing Guide](#testing-guide)
- [Deployment Guide](#deployment-guide)
- [Integration Guide](#integration-guide)
- [Example User Journeys](#example-user-journeys)
- [Operational Runbook](#operational-runbook)
- [Production Readiness Checklist](#production-readiness-checklist)
- [Roadmap](#roadmap)
- [Glossary](#glossary)
- [License](#license)

## What Problem SettleOne Solves

Many real-world business transactions fail because payment and delivery are not
coordinated by enforceable rules.

Typical problems:

- A seller delivers goods or services, then waits weeks or months for payment.
- A buyer promises payment, but the promise is not programmatically enforceable.
- A marketplace records an order, but the backend cannot guarantee settlement.
- A supplier has weak leverage once goods are delivered.
- A buyer may also need protection from bad delivery or non-delivery.
- Disputes require manual negotiation, email threads, invoices, screenshots,
  support teams, and legal escalation.
- MSMEs suffer because uncertain cash flow affects inventory, payroll, and
  working capital.

SettleOne focuses on one foundational improvement:

```text
Payment must be committed before the transaction begins.
```

Once payment is committed, the system can safely support delivery verification,
dispute windows, automatic release, refunds, partial settlement, and future
extensions like milestones or invoice financing.

## What SettleOne Is

SettleOne is a modular protocol and application architecture for payment
commitments.

It combines:

- Smart contract escrow.
- Explicit deal state management.
- Native ETH and ERC20 funding.
- Delivery proof submission.
- Backend-signed delivery verification.
- Chainlink-style asynchronous verification.
- Buyer confirmation.
- Buyer dispute windows.
- Resolver-based dispute outcomes.
- Seller release, buyer refund, and partial settlement.
- Chainlink Automation-compatible time-based execution.
- Optional ERC20 yield strategy support.
- A future frontend and backend integration surface.

The protocol is designed so the backend can support the workflow, but cannot
arbitrarily take funds. Funds move only through contract-defined settlement
paths.

## What SettleOne Is Not

SettleOne is not a simple payment button.

It is not only a custodial escrow.

It is not a backend-only invoice tracker.

It is not a legal system by itself. It can store hashes of terms, evidence,
proofs, and resolutions, but real-world agreements and dispute policies must
still be defined by the business, marketplace, DAO, or legal framework using
the protocol.

It is not risk-free. Any production deployment still needs:

- Smart contract audits.
- Operational key security.
- Clear verifier policy.
- Clear dispute policy.
- Safe upgrade governance.
- Accepted token policy.
- Monitoring and incident response.
- Yield strategy risk review if yield is enabled.

## Who SettleOne Is For

SettleOne can support many workflows:

| Use case | How SettleOne helps |
| --- | --- |
| MSME supplier payments | Buyer locks payment before supplier ships or performs work. |
| Freelance or agency work | Client commits funds before project delivery begins. |
| Marketplace settlement | Platform coordinates deals while contracts enforce escrow rules. |
| B2B purchase orders | Terms hash links on-chain deal to off-chain order and invoice. |
| Logistics and delivery | Tracking or delivery proof can be hashed and verified. |
| Service-level agreements | Delivery proof can represent completion of a service milestone. |
| Cross-border settlement | Parties can use stablecoins or supported ERC20 assets. |
| DAO/vendor payments | DAO commits funds and releases after verified delivery. |

SettleOne is most useful when:

- Payment certainty matters before work begins.
- Delivery can be represented by off-chain evidence.
- Parties need transparent settlement rules.
- A dispute process is required.
- Automation can reduce manual follow-up.

## Repository Scope

This root repository is the public SettleOne project workspace.

It currently contains:

- A public contract submodule at `contracts/`.
- A public frontend workspace placeholder at `frontend/`.
- Project-level documentation.
- Root licensing and submodule configuration.

It does not currently contain:

- The private backend implementation.
- Production frontend application code.
- A published SDK package.
- Production deployment manifests.

That distinction matters. The contract layer is public and lives inside the
`contracts` submodule. The backend/verifier layer is expected to be private or
separately deployed because it may contain API integrations, validator logic,
operational keys, risk checks, and business-specific workflows.

## Current Repository Structure

```text
SettleOne/
+-- contracts/
|   +-- src/
|   +-- test/
|   +-- script/
|   +-- foundry.toml
|   +-- remappings.txt
|   +-- README.md
+-- frontend/
+-- .gitmodules
+-- LICENSE
+-- README.md
```

The contract submodule is configured in `.gitmodules`:

```text
[submodule "contracts"]
    path = contracts
    url = https://github.com/Sourav-IIITBPL/settleOne-protocol
```

The detailed contract-specific README is:

```text
contracts/README.md
```

This root README explains the full project idea and integration model. The
contract README explains the Solidity suite in contract-level detail.

## High-Level Architecture

SettleOne has three conceptual layers:

```text
User/Product Layer
  - frontend UI
  - wallets
  - deal dashboards
  - notifications

Verification/Operations Layer
  - backend APIs
  - metadata storage
  - proof ingestion
  - validator signatures
  - oracle fulfillment
  - dispute support

Settlement Layer
  - DealManager
  - EscrowVault
  - Settlement
  - DeliveryVerifier / ChainlinkVerifier
  - DisputeManager / Resolver
  - AutomationHandler
```

System diagram:

```text
Seller / Buyer Wallets
        |
        v
Frontend Application
        |
        +------------------------------+
        |                              |
        v                              v
Private Backend / Verifier       Smart Contracts
        |                              |
        | signs / fulfills             | locks and settles funds
        v                              v
Validator / Oracle Infra        EscrowVault + Settlement
        |
        v
Off-chain proof and metadata storage
```

The contracts are the source of truth for:

- Deal state.
- Escrow funding.
- Verification result status.
- Dispute status.
- Settlement outcome.
- Refund/release/split execution.

The backend is the support system for:

- Rich off-chain metadata.
- Evidence validation.
- Proof storage.
- Signatures.
- Oracle responses.
- Notifications.
- Indexing.

## Component Responsibilities

| Component | Responsibility | Current location |
| --- | --- | --- |
| Root repository | Project coordination and documentation. | `README.md` |
| Contracts | Payment commitment, escrow, verification, dispute, settlement, automation. | `contracts/` |
| Frontend | Wallet UX and deal management interface. | `frontend/` placeholder |
| Backend | Private verifier, metadata, APIs, dispute support, indexing. | Not included in this public repo |
| Chainlink / Keepers | Optional oracle and time-based automation infrastructure. | Integrated by contracts and external ops |
| SDK | Future integration wrapper for frontend/backend apps. | Not currently included |

## Participants and Trust Boundaries

SettleOne separates actors carefully.

| Participant | What they can do | What they should not be able to do |
| --- | --- | --- |
| Seller | Create deal, submit proof, receive funds after valid settlement. | Release funds without verified delivery or dispute outcome. |
| Buyer | Fund deal, confirm delivery, dispute during window, receive refund when valid. | Pull funds back after verified delivery and expired dispute window. |
| Validator | Sign delivery approval for `DeliveryVerifier`. | Move funds directly from the vault. |
| Oracle | Fulfill async verification in `ChainlinkVerifier`. | Settle funds without `DealManager` state checks. |
| Arbiter | Record dispute decision in resolver. | Withdraw vault funds directly. |
| Keeper | Trigger valid time-based actions. | Choose arbitrary settlement outcomes. |
| Admin / Governance | Configure modules, roles, pause, upgrade. | Operate without multisig/timelock controls in production. |
| Strategist | Manage optional yield strategy actions. | Override per-deal ownership or settlement rules. |

The key boundary:

```text
Off-chain systems can provide evidence and approvals.
On-chain contracts decide whether funds can move.
```

## End-to-End Product Flow

### 1. Seller prepares deal terms

Seller and buyer agree off-chain on:

- Goods or services.
- Payment amount.
- Payment asset.
- Delivery deadline.
- Dispute window.
- Evidence requirements.
- Dispute policy.
- Commercial terms or invoice.

The application hashes those details into fields such as:

- `termsHash`
- `metadataHash`

The actual documents may live in a backend database, IPFS, Arweave, S3, or
another storage system. The contract stores hashes, not the full documents.

### 2. Seller creates the deal

The seller calls `DealManager.createDeal`.

The deal records:

- buyer
- seller
- token
- amount
- verifier
- dispute resolver
- delivery deadline
- dispute window
- terms hash
- metadata hash
- initial state

The deal starts in `Created`.

### 3. Buyer funds the deal

The buyer calls `depositFunds` or `fundDeal`.

For native ETH:

- `msg.value` must equal the deal amount.

For ERC20:

- Buyer approves the vault/token flow first.
- The contract pulls the expected token amount.
- Fee-on-transfer or unexpected received amounts are rejected.

After funding:

- Deal moves to `FundsLocked`.
- `EscrowVault` stores the position.
- Automation can register the deal for deadline checks.
- Seller now has confidence that payment exists.

### 4. Seller delivers off-chain

The seller delivers goods or services outside the chain.

Examples:

- Shipment delivered.
- Freelance work submitted.
- SaaS service completed.
- Purchase order fulfilled.
- Milestone evidence uploaded.
- Signed delivery receipt collected.

The seller or backend produces a `proofHash`.

### 5. Seller submits proof

Seller calls `submitDeliveryProof`.

The protocol stores:

- `proofHash`
- `proofSubmittedAt`
- verifier record
- `ProofSubmitted` state

Depending on the verifier, proof may be checked immediately or remain pending.

### 6. Delivery is verified

SettleOne supports two verification styles:

- `DeliveryVerifier`: backend/validator signs an EIP-712 approval.
- `ChainlinkVerifier`: oracle-style async request is fulfilled later.

If approved:

- Deal moves to `Delivered`.
- `deliveredAt` is set.
- `disputeWindowEndsAt` is calculated.

If pending:

- Deal remains `ProofSubmitted`.
- A caller or automation can finalize later.

If rejected:

- Deal cannot move to `Delivered`.
- If the delivery deadline expires, refund may become available.

### 7. Buyer responds

After verified delivery, the buyer has three choices.

Confirm:

```text
Buyer confirms delivery -> seller receives funds -> deal settles
```

Dispute:

```text
Buyer disputes during dispute window -> resolver decides outcome
```

Do nothing:

```text
Dispute window expires -> automation or caller can auto-release to seller
```

### 8. Settlement executes

The settlement path can be:

- Full release to seller.
- Full refund to buyer.
- Partial split between seller and buyer.

`Settlement` prevents double settlement, and `EscrowVault` performs the actual
asset transfer.

## Deal Lifecycle and State Machine

SettleOne deals are represented by `DealStructs.Deal`.

### Deal States

| State | Meaning |
| --- | --- |
| `None` | Reserved empty state. Deal ID does not exist. |
| `Created` | Deal has been created but not funded. |
| `FundsLocked` | Buyer has funded the deal and escrow is active. |
| `ProofSubmitted` | Seller submitted delivery proof; verification is pending or finalizing. |
| `Delivered` | Delivery proof has been approved and dispute window is open. |
| `Disputed` | Buyer raised a dispute during the dispute window. |
| `Settled` | Funds have been released, refunded, or split through settlement. |
| `Refunded` | Buyer refund path executed after missed/invalid delivery. |
| `Cancelled` | Unfunded deal was cancelled before escrow funding. |

### State Diagram

```text
None
  |
  v
Created
  |\
  | \ cancelDeal
  |  v
  |  Cancelled
  |
  | depositFunds / fundDeal
  v
FundsLocked
  |\
  | \ refundExpired after deadline
  |  v
  |  Refunded
  |
  | submitDeliveryProof
  v
ProofSubmitted
  |\
  | \ refundExpired if verification never succeeds before expiry
  |  v
  |  Refunded
  |
  | finalizeDelivery after approval
  v
Delivered
  |\
  | \ raiseDispute during dispute window
  |  v
  |  Disputed
  |
  | confirmDelivery or autoRelease
  v
Settled

Disputed
  |
  | resolveDispute
  v
Settled
```

### Allowed State Transitions

The `StateTransitions` library centralizes transition checks.

| From | To | Trigger |
| --- | --- | --- |
| `Created` | `FundsLocked` | Buyer funds deal. |
| `Created` | `Cancelled` | Buyer or seller cancels before funding. |
| `FundsLocked` | `ProofSubmitted` | Seller submits proof. |
| `FundsLocked` | `Refunded` | Delivery deadline expires without verified delivery. |
| `ProofSubmitted` | `Delivered` | Verifier approves proof. |
| `ProofSubmitted` | `Refunded` | Deadline expires and proof is not approved. |
| `Delivered` | `Disputed` | Buyer disputes during dispute window. |
| `Delivered` | `Settled` | Buyer confirms or dispute window expires. |
| `Disputed` | `Settled` | Resolver decision is applied. |

## On-Chain Data Model

### `DealInput`

Used to create a deal.

| Field | Meaning |
| --- | --- |
| `buyer` | Address expected to fund and confirm/dispute the deal. |
| `seller` | Address delivering work and receiving seller-side payout. |
| `token` | `address(0)` for native ETH, otherwise ERC20 token address. |
| `amount` | Payment amount to lock. |
| `deliveryDeadline` | Timestamp by which delivery must be verified. |
| `disputeWindow` | Number of seconds buyer has to dispute after delivery approval. |
| `termsHash` | Hash of invoice, order, agreement, or legal terms. |
| `metadataHash` | Hash of application metadata. |
| `verifier` | Optional per-deal verifier. Defaults to protocol verifier if zero. |
| `disputeResolver` | Optional per-deal resolver. Defaults to protocol resolver if zero. |

### `Deal`

Stored by `DealManager`.

| Field | Meaning |
| --- | --- |
| `buyer` | Buyer address. |
| `seller` | Seller address. |
| `token` | Native ETH marker or ERC20 token. |
| `verifier` | Verifier chosen for this deal. |
| `disputeResolver` | Resolver chosen for this deal. |
| `amount` | Principal amount committed. |
| `createdAt` | Deal creation timestamp. |
| `fundedAt` | Funding timestamp. |
| `proofSubmittedAt` | Proof submission timestamp. |
| `deliveredAt` | Delivery approval timestamp. |
| `deliveryDeadline` | Delivery deadline. |
| `disputeWindowEndsAt` | Final timestamp for buyer dispute. |
| `settledAt` | Terminal settlement/refund/cancel timestamp. |
| `disputeWindow` | Buyer dispute window duration. |
| `state` | Current deal state. |
| `termsHash` | Hash of terms. |
| `metadataHash` | Hash of metadata. |
| `proofHash` | Hash of submitted delivery proof. |

### `VerificationRecord`

Stored by verifiers.

| Field | Meaning |
| --- | --- |
| `requestId` | Async oracle request ID, if used. |
| `seller` | Seller whose proof is being verified. |
| `proofHash` | Submitted proof hash. |
| `responseHash` | Hash of verifier/oracle response. |
| `submittedAt` | Proof submission timestamp. |
| `resolvedAt` | Verification resolution timestamp. |
| `state` | `None`, `Pending`, `Approved`, or `Rejected`. |

### `VaultPosition`

Stored by `EscrowVault`.

| Field | Meaning |
| --- | --- |
| `token` | Native ETH marker or ERC20 token. |
| `principal` | Original principal remaining for the deal. |
| `shares` | Vault accounting shares representing claim on pooled assets. |
| `funded` | Whether the deal has an active vault position. |

### `Dispute`

Stored by `DisputeManager`.

| Field | Meaning |
| --- | --- |
| `dealId` | Disputed deal ID. |
| `buyer` | Buyer address. |
| `seller` | Seller address. |
| `token` | Payment token. |
| `resolver` | Resolver contract used. |
| `amount` | Deal principal amount. |
| `openedAt` | Dispute opening timestamp. |
| `resolvedAt` | Resolution timestamp. |
| `outcome` | `SellerWins`, `BuyerWins`, or `Split`. |
| `active` | Whether dispute is active. |
| `reasonHash` | Hash of buyer reason. |
| `evidenceHash` | Hash of evidence bundle. |
| `resolutionHash` | Hash of final resolution explanation. |
| `proofHash` | Delivery proof hash attached to dispute. |
| `termsHash` | Terms hash attached to dispute. |
| `sellerAward` | Principal awarded to seller. |
| `buyerAward` | Principal awarded to buyer. |

## Contract Suite Overview

The Solidity protocol lives inside `contracts/src`.

```text
contracts/src/
+-- automation/
|   +-- AutomationHandler.sol
|   +-- IAutomationHandler.sol
+-- core/
|   +-- DealManager.sol
|   +-- DealStructs.sol
|   +-- DealErrors.sol
+-- dispute/
|   +-- DisputeManager.sol
|   +-- IDisputeResolver.sol
|   +-- SimpleResolver.sol
+-- external/
|   +-- chainlink/AutomationCompatibleInterface.sol
|   +-- openzeppelin/ReentrancyGuardUpgradeable.sol
+-- interfaces/
|   +-- IDealManager.sol
|   +-- ISettlement.sol
+-- libraries/
|   +-- DealLogic.sol
|   +-- PercentageMath.sol
|   +-- StateTransitions.sol
|   +-- TimeUtils.sol
+-- payment/
|   +-- PaymentToken.sol
|   +-- Settlement.sol
+-- vault/
|   +-- EscrowVault.sol
|   +-- IVault.sol
|   +-- strategies/
|       +-- AaveStrategy.sol
|       +-- BaseStrategy.sol
|       +-- IStrategy.sol
+-- verification/
    +-- ChainlinkVerifier.sol
    +-- DeliveryVerifier.sol
    +-- IVerifier.sol
```

The suite is intentionally modular:

| Module | Primary contract | Purpose |
| --- | --- | --- |
| Core | `DealManager` | Orchestrates deal lifecycle. |
| Data | `DealStructs` | Defines shared structs and enums. |
| Errors | `DealErrors` | Defines custom protocol errors. |
| Vault | `EscrowVault` | Holds and accounts for escrowed assets. |
| Settlement | `Settlement` | Executes one-time release/refund/split. |
| Verification | `DeliveryVerifier`, `ChainlinkVerifier` | Confirms delivery proof. |
| Dispute | `DisputeManager`, `SimpleResolver` | Handles disputes and decisions. |
| Automation | `AutomationHandler` | Executes valid time-based actions. |
| Payment | `PaymentToken` | Optional ERC20 token for testing/demo rails. |
| Strategies | `BaseStrategy`, `AaveStrategy` | Optional ERC20 yield integration. |
| Libraries | `DealLogic`, `StateTransitions`, `TimeUtils`, `PercentageMath` | Shared validation and helper logic. |

## Detailed Contract Responsibilities

### `DealManager.sol`

`DealManager` is the main protocol entry point. It orchestrates the lifecycle,
but it does not directly custody escrowed funds.

Primary responsibilities:

- Create deals.
- Store deal state.
- Store participants and payment configuration.
- Store verifier and resolver addresses.
- Route deposits to `EscrowVault`.
- Route settlement instructions to `Settlement`.
- Submit proof to verifiers.
- Finalize approved delivery.
- Open disputes in `DisputeManager`.
- Apply resolver decisions.
- Trigger auto-release.
- Trigger missed-deadline refunds.
- Cancel unfunded deals.
- Expose read functions for apps and automation.
- Configure default protocol modules.

Important functions:

| Function | Who calls | What it does |
| --- | --- | --- |
| `createDeal(DealInput)` | Seller | Creates a fully specified deal. |
| `createDeal(address,address,uint256,uint256,uint256)` | Seller | Creates a native ETH deal using defaults. |
| `createDeal(address,address,address,uint256,uint256,uint256)` | Seller | Creates an ERC20 deal using defaults. |
| `depositFunds(uint256)` | Buyer | Funds escrow for a deal. |
| `fundDeal(uint256)` | Buyer | Alias to funding flow. |
| `submitDeliveryProof(uint256,bytes32)` | Seller | Stores proof hash and starts verification. |
| `submitDeliveryProof(uint256,bytes32,bytes,bytes)` | Seller | Submits proof plus verifier data. |
| `finalizeDelivery(uint256,bytes)` | Anyone/automation | Finalizes pending proof if verifier approves. |
| `confirmDelivery(uint256)` | Buyer | Releases funds to seller. |
| `raiseDispute(uint256,string)` | Buyer | Raises dispute using plaintext reason hash. |
| `raiseDispute(uint256,bytes32,bytes32)` | Buyer | Raises dispute using reason/evidence hashes. |
| `resolveDispute(uint256,bytes)` | Resolver role | Applies dispute resolver decision. |
| `autoRelease(uint256)` | Anyone/automation | Releases to seller after dispute window expiry. |
| `refundExpired(uint256)` | Anyone/automation | Refunds buyer after missed delivery deadline. |
| `cancelDeal(uint256)` | Buyer or seller | Cancels an unfunded deal. |
| `getDeal(uint256)` | Anyone | Returns full deal struct. |
| `getDealState(uint256)` | Anyone | Returns current state. |
| `getDealCount()` | Anyone | Returns total deals created. |
| `getAutomationAction(uint256)` | Automation/apps | Returns next valid time-based action. |

Important events:

- `DealCreated`
- `DealFunded`
- `DeliveryProofSubmitted`
- `DealDelivered`
- `DeliveryConfirmed`
- `DealDisputed`
- `DisputeResolved`
- `DealRefunded`
- `DealCancelled`
- Module update events

Important roles:

- `PAUSER_ROLE`
- `CONFIG_ROLE`
- `RESOLVER_ROLE`
- `UPGRADER_ROLE`
- `DEFAULT_ADMIN_ROLE`

### `DealStructs.sol`

`DealStructs` defines the shared language of the protocol.

Enums:

- `DealState`
- `VerificationState`
- `DisputeOutcome`
- `AutomationAction`

Structs:

- `DealInput`
- `Deal`
- `VerificationRecord`
- `VaultPosition`
- `Dispute`
- `ResolverContext`
- `DisputeDecision`

This file is important because every major module uses the same data shapes.
That keeps the architecture consistent across core, verification, vault,
dispute, settlement, and automation.

### `DealErrors.sol`

`DealErrors` defines gas-efficient custom errors.

Examples:

- `InvalidAmount`
- `InvalidAddress`
- `InvalidTimestamp`
- `InvalidDisputeWindow`
- `InvalidProof`
- `InvalidReason`
- `Unauthorized`
- `DealNotFound`
- `DealAlreadyFunded`
- `DealNotFunded`
- `NativeValueMismatch`
- `UnexpectedNativeValue`
- `DeliveryDeadlinePassed`
- `DisputeWindowExpired`
- `VerificationPending`
- `VerificationRejected`
- `ResolverNotConfigured`
- `VerifierNotConfigured`
- `InvalidSettlementSplit`
- `UnsupportedTokenBehavior`
- `SignatureExpired`
- `InvalidSignature`
- `UpkeepNotNeeded`
- `SettlementAlreadyExecuted`

Custom errors make reverts easier to reason about and cheaper than long revert
strings.

### `EscrowVault.sol`

`EscrowVault` is the fund custody contract. It stores funds per deal and allows
release/refund only through authorized settlement paths.

Primary responsibilities:

- Accept native ETH and ERC20 deposits.
- Track each funded deal as a `VaultPosition`.
- Maintain asset pools per token.
- Use share accounting for proportional asset ownership.
- Release principal and proportional assets.
- Refund remaining escrow.
- Integrate optional ERC20 strategies.
- Ensure enough liquidity before release.
- Reject unexpected native value.
- Reject fee-on-transfer ERC20 behavior where received amount differs.
- Restrict deposits to `FUNDING_ROLE`.
- Restrict release/refund to `SETTLEMENT_ROLE`.

Important functions:

| Function | Who calls | What it does |
| --- | --- | --- |
| `deposit` | `DealManager` | Locks ETH/ERC20 for a deal. |
| `release` | `Settlement` | Releases selected principal amount to recipient. |
| `refund` | `Settlement` | Refunds remaining position to recipient. |
| `balanceOf` | Anyone | Returns principal and current asset value. |
| `getPosition` | Anyone | Reads stored vault position. |
| `isFunded` | Anyone | Checks whether deal is funded. |
| `setStrategy` | Vault admin | Configures strategy for an ERC20 token. |
| `invest` | Vault admin | Moves idle ERC20 funds into strategy. |
| `divest` | Vault admin | Pulls assets back from strategy. |
| `totalAssets` | Anyone | Returns vault-held plus strategy-held assets. |
| `pause` / `unpause` | Vault admin | Emergency controls. |

Important events:

- `EscrowDeposited`
- `EscrowReleased`
- `StrategyConfigured`
- `StrategyInvestment`
- `StrategyDivestment`

### `Settlement.sol`

`Settlement` is the payout execution layer. It does not decide business logic.
It receives instructions from `DealManager` and calls `EscrowVault`.

Primary responsibilities:

- Enforce one-time settlement per deal.
- Release funds to seller.
- Refund funds to buyer.
- Execute partial settlement.
- Record principal settled to each side.
- Record assets actually released to each side.
- Restrict settlement execution to `DealManager`.

Important functions:

| Function | Who calls | What it does |
| --- | --- | --- |
| `releaseFundsToSeller` | `DealManager` | Releases seller payout. |
| `refundBuyer` | `DealManager` | Refunds buyer. |
| `partialSettlement` | `DealManager` | Splits escrow between buyer and seller. |
| `isSettled` | Anyone | Checks whether settlement already happened. |
| `getBalance` | Anyone | Reads vault balance. |
| `updateVault` | Settlement admin | Updates vault module. |
| `updateDealManager` | Settlement admin | Updates authorized manager. |

Important events:

- `SellerReleased`
- `BuyerRefunded`
- `PartialSettlementExecuted`
- `DealManagerUpdated`
- `VaultUpdated`

### `DeliveryVerifier.sol`

`DeliveryVerifier` is the synchronous backend-signed verifier. It uses EIP-712
typed data and ECDSA signature recovery.

Primary responsibilities:

- Store submitted proof records.
- Verify signed delivery approvals.
- Enforce authorized validator signatures.
- Store approved verification status.
- Store `responseHash`.

The approval being signed is conceptually:

```text
DeliveryApproval(
    uint256 dealId,
    address seller,
    bytes32 proofHash,
    uint64 validUntil
)
```

Important functions:

| Function | Who calls | What it does |
| --- | --- | --- |
| `submitProof` | `DealManager` | Stores pending proof record. |
| `verify` | `DealManager` | Validates EIP-712 signature and approves delivery. |
| `getVerification` | Anyone | Reads full verification record. |
| `getProof` | Anyone | Reads proof hash. |
| `setValidator` | Admin | Grants/revokes validator address. |
| `hashDeliveryApproval` | Backend/apps | Computes typed-data digest. |

Important roles:

- `VALIDATOR_ROLE`
- `UPGRADER_ROLE`
- `DEFAULT_ADMIN_ROLE`

### `ChainlinkVerifier.sol`

`ChainlinkVerifier` is an asynchronous verifier surface for oracle-style
workflows.

Primary responsibilities:

- Create verification requests.
- Map request IDs to deal IDs.
- Allow authorized oracle to fulfill approval/rejection.
- Store response hash and verification state.
- Let `DealManager` read whether proof is approved.

Important functions:

| Function | Who calls | What it does |
| --- | --- | --- |
| `submitProof` | Requester role | Creates pending verification request. |
| `requestVerification` | Requester role | Re-requests verification for existing proof. |
| `fulfillVerification` | Oracle role | Stores approved/rejected oracle response. |
| `verify` | `DealManager` | Returns current verification result. |
| `getVerification` | Anyone | Reads verification record. |
| `setRequester` | Admin | Grants/revokes request creation role. |
| `setOracle` | Admin | Grants/revokes fulfillment role. |

Important roles:

- `REQUESTER_ROLE`
- `ORACLE_ROLE`
- `UPGRADER_ROLE`
- `DEFAULT_ADMIN_ROLE`

### `DisputeManager.sol`

`DisputeManager` stores active disputes and delegates decision logic to a
resolver.

Primary responsibilities:

- Open disputes from `DealManager`.
- Store reason hash and evidence hash.
- Store deal proof and terms context.
- Call configured `IDisputeResolver`.
- Normalize resolver output.
- Store final dispute outcome.
- Mark dispute inactive after resolution.

Important functions:

| Function | Who calls | What it does |
| --- | --- | --- |
| `openDispute` | `DealManager` | Creates dispute record. |
| `resolveDispute` | `DealManager` | Calls resolver and stores final decision. |
| `cancelDispute` | `DealManager` | Cancels active dispute if needed. |
| `getDispute` | Anyone | Reads dispute data. |
| `isDisputed` | Anyone | Checks active dispute state. |
| `setDealManager` | Dispute admin | Updates authorized manager. |

Important events:

- `DisputeOpened`
- `DisputeResolved`
- `DisputeCancelled`
- `DealManagerUpdated`

### `IDisputeResolver.sol`

`IDisputeResolver` is the interface for pluggable arbitration.

A resolver receives:

- buyer
- seller
- token
- amount
- reason hash
- evidence hash
- proof hash
- terms hash

It returns:

- outcome
- seller award
- buyer award
- resolution hash

This keeps arbitration modular. Future resolvers could represent:

- Admin arbitration.
- Multisig arbitration.
- DAO voting.
- Optimistic dispute windows.
- External arbitration providers.
- Marketplace-specific policy engines.

### `SimpleResolver.sol`

`SimpleResolver` is a straightforward role-based resolver. It is useful for
testnets, MVPs, internal pilots, and simple deployments.

Primary responsibilities:

- Let an arbiter record a decision.
- Let `DisputeManager` consume that decision.
- Convert seller-wins, buyer-wins, or split into exact awards.
- Delete consumed decisions to prevent reuse.

Important functions:

| Function | Who calls | What it does |
| --- | --- | --- |
| `decide` | Arbiter role | Records dispute outcome and seller award. |
| `resolve` | Consumer role | Returns and consumes decision. |
| `setConsumer` | Admin | Grants/revokes consumer role. |
| `getDecision` | Anyone | Reads pending decision. |

### `AutomationHandler.sol`

`AutomationHandler` is compatible with Chainlink Automation. It tracks funded
deals and checks whether a valid time-based action exists.

Supported actions:

| Action | Meaning |
| --- | --- |
| `FinalizeDelivery` | Verifier approved asynchronously and deal can be finalized. |
| `ReleaseSeller` | Dispute window expired and seller can receive funds. |
| `RefundBuyer` | Delivery deadline passed without approved delivery. |

Important functions:

| Function | Who calls | What it does |
| --- | --- | --- |
| `registerDeal` | `DealManager` | Adds funded deal to automation set. |
| `unregisterDeal` | `DealManager` | Removes terminal deal. |
| `checkDeadline` | Anyone | Checks whether one deal has work. |
| `executeAutoRelease` | Anyone | Runs seller auto-release if valid. |
| `handleExpiry` | Anyone | Executes finalize/release/refund if valid. |
| `handleAutoSettlement` | Anyone | Runs seller auto-release if valid. |
| `checkUpkeep` | Chainlink Automation | Finds actionable deal. |
| `performUpkeep` | Chainlink Automation | Executes encoded action. |
| `registeredDeals` | Anyone | Paginates registered deal IDs. |
| `setMaxScan` | Automation admin | Configures scan window. |

### `PaymentToken.sol`

`PaymentToken` is an optional ERC20 token.

It can be used for:

- Local testing.
- Demo payment rails.
- Controlled ERC20 flows.
- Internal stable-value experiments.

It is not required for SettleOne. The vault supports native ETH and arbitrary
ERC20 tokens.

### Strategy Contracts

The vault strategy folder contains optional yield infrastructure.

| Contract | Purpose |
| --- | --- |
| `IStrategy` | Defines asset, vault, deposit, withdraw, total assets. |
| `BaseStrategy` | Upgradeable base strategy with vault-only hooks and rescue controls. |
| `AaveStrategy` | Example Aave-compatible strategy using pool supply/withdraw. |

Yield is optional. It adds external protocol risk and should be enabled only
after careful review.

### Libraries

| Library | Purpose |
| --- | --- |
| `DealLogic` | Validates deals, deadlines, refund readiness, auto-release readiness, and settlement splits. |
| `StateTransitions` | Defines valid state transitions and terminal states. |
| `TimeUtils` | Handles timestamp conversion, deadline validation, and dispute window math. |
| `PercentageMath` | Provides basis-point percentage helpers. |

## Verification Model

Verification is the bridge between off-chain delivery and on-chain settlement.

SettleOne stores proof hashes on-chain, while the actual evidence stays
off-chain.

Examples of proof data:

- IPFS CID hash.
- Signed delivery receipt hash.
- Tracking status digest.
- Invoice completion hash.
- Backend delivery record hash.
- Photos, documents, or service completion bundle hash.
- Marketplace order fulfillment hash.

### Backend-signed verification

The backend validates evidence and signs an EIP-712 approval. The contract then
checks that the signer has `VALIDATOR_ROLE`.

This model is useful when:

- The project controls backend verification.
- Delivery evidence is private or complex.
- The verifier needs business logic not suitable for on-chain execution.
- Fast synchronous approval is useful.

### Chainlink-style verification

The async verifier creates a request and waits for an oracle response.

This model is useful when:

- External APIs are required.
- Fulfillment should happen asynchronously.
- Oracle infrastructure should be separated from the application backend.
- Verification may need multiple off-chain systems.

### Verification states

| State | Meaning |
| --- | --- |
| `None` | No proof submitted. |
| `Pending` | Proof submitted and awaiting decision. |
| `Approved` | Delivery accepted by verifier/oracle. |
| `Rejected` | Delivery rejected by verifier/oracle. |

## Dispute Model

Disputes protect buyers after delivery is verified.

The buyer can dispute only:

- After deal is delivered.
- Before `disputeWindowEndsAt`.
- With a non-empty reason hash.

The dispute stores hashes rather than full evidence:

- `reasonHash`
- `evidenceHash`
- `proofHash`
- `termsHash`

The resolver then decides:

| Outcome | Settlement |
| --- | --- |
| `SellerWins` | Seller receives full amount. |
| `BuyerWins` | Buyer receives full refund. |
| `Split` | Seller receives seller award; buyer receives remaining award. |

The current resolver is `SimpleResolver`, but the system is designed for more
advanced resolvers later.

## Vault and Settlement Model

The vault and settlement modules are separated intentionally.

`EscrowVault` answers:

```text
Where are funds held and how much does each deal own?
```

`Settlement` answers:

```text
Has this deal already been paid out, and where should funds go?
```

`DealManager` answers:

```text
Is the protocol state allowed to settle now?
```

This separation reduces accidental authority concentration.

### Native ETH flow

```text
Buyer calls depositFunds with msg.value
DealManager checks buyer and state
EscrowVault records native position
Settlement later releases/refunds native ETH
```

### ERC20 flow

```text
Buyer approves token spending
Buyer calls depositFunds
DealManager checks buyer and state
EscrowVault transferFroms exact amount
Vault rejects received amount mismatch
Settlement later releases/refunds ERC20
```

### Share accounting

The vault tracks principal and shares. Shares represent a proportional claim on
the asset pool. This supports optional yield strategies because a deal can
receive proportional assets if the pool grows.

## Automation Model

Automation exists so deals do not get stuck waiting for a manual caller.

The automation handler checks active deals and asks `DealManager` what action,
if any, is valid.

Possible actions:

- Finalize approved async delivery.
- Release seller after dispute window expiry.
- Refund buyer after missed delivery deadline.

Automation is not trusted with business decisions. It can only execute actions
already allowed by deal state and time rules.

## Yield Strategy Model

Yield is optional.

The vault supports strategy configuration for ERC20 tokens. Native ETH
strategies are intentionally unsupported by the current vault.

Production guidance:

- Keep yield disabled for first production escrow deployments unless needed.
- Enable strategies only for audited, liquid, well-understood assets.
- Use conservative caps.
- Monitor strategy health.
- Ensure divestment liquidity before large settlements.
- Disclose strategy risks to users.

## Frontend Product Guide

The frontend should make the protocol understandable to non-technical users.

Recommended pages:

- Landing page explaining payment commitment.
- Seller dashboard.
- Buyer dashboard.
- Create deal form.
- Deal detail page.
- Funding flow.
- Proof submission flow.
- Delivery confirmation flow.
- Dispute flow.
- Settlement history.
- Admin/ops dashboard for testnet or internal use.

Recommended deal detail sections:

- Deal ID.
- Buyer and seller.
- Payment token and amount.
- Current state.
- Delivery deadline.
- Dispute window countdown.
- Terms hash.
- Metadata hash.
- Proof hash.
- Verification state.
- Vault balance.
- Dispute status.
- Settlement outcome.
- Relevant transaction hashes.

Recommended user actions by state:

| State | Buyer actions | Seller actions |
| --- | --- | --- |
| `Created` | Fund deal, cancel if allowed. | Cancel if allowed. |
| `FundsLocked` | Wait for delivery. | Submit proof. |
| `ProofSubmitted` | Wait for verification. | Monitor verification. |
| `Delivered` | Confirm delivery or raise dispute. | Wait for confirmation/window expiry. |
| `Disputed` | Provide evidence off-chain. | Provide evidence off-chain. |
| `Settled` | View result. | View payout. |
| `Refunded` | View refund. | View terminal status. |
| `Cancelled` | No action. | No action. |

UX rules:

- Always show deadlines in local time and UTC.
- Warn buyer before funding that funds will be escrowed.
- Warn seller that missed delivery can lead to refund.
- Warn buyer that silence after delivery can lead to auto-release.
- Do not show "delivered" until verifier approves.
- Keep hashes clickable to off-chain evidence where possible.
- Make dispute evidence upload explicit and immutable once hashed.

## Backend and Verifier Guide

The backend is not included in this public root repository, but it is central
to a full SettleOne product.

Recommended backend responsibilities:

- Store deal metadata.
- Store terms documents or links.
- Create `termsHash` and `metadataHash`.
- Ingest delivery evidence.
- Validate proof data.
- Produce `proofHash`.
- Sign EIP-712 delivery approvals.
- Track validator key rotation.
- Submit or monitor oracle fulfillments.
- Store dispute evidence bundles.
- Produce `reasonHash`, `evidenceHash`, and `resolutionHash`.
- Index contract events.
- Notify users about deadlines and actions.
- Provide API endpoints for frontend dashboards.

Backend must not be treated as the final authority over funds. Its job is to
produce evidence and signatures. Contracts enforce settlement.

### Suggested backend API shape

Example endpoints:

```text
POST /deals
GET  /deals/:dealId
POST /deals/:dealId/proof
POST /deals/:dealId/verify
POST /deals/:dealId/dispute-evidence
GET  /deals/:dealId/events
GET  /deals/:dealId/verification
GET  /deals/:dealId/dispute
```

### Suggested metadata object

```json
{
  "project": "SettleOne",
  "version": "1",
  "dealId": "1",
  "buyer": "0x...",
  "seller": "0x...",
  "title": "Website delivery milestone",
  "description": "Final delivery for milestone 1",
  "invoiceId": "INV-001",
  "currency": "USDC",
  "amount": "100000000",
  "deliveryDeadline": 1767225600,
  "disputeWindow": 259200,
  "termsUri": "ipfs://...",
  "evidencePolicy": "signed delivery receipt required"
}
```

Hash the canonicalized metadata and store the digest as `metadataHash`.

## Event and Indexing Guide

Indexing events is important for frontend UX and operational monitoring.

Key events to index:

| Contract | Events |
| --- | --- |
| `DealManager` | `DealCreated`, `DealFunded`, `DeliveryProofSubmitted`, `DealDelivered`, `DeliveryConfirmed`, `DealDisputed`, `DisputeResolved`, `DealRefunded`, `DealCancelled` |
| `EscrowVault` | `EscrowDeposited`, `EscrowReleased`, `StrategyConfigured`, `StrategyInvestment`, `StrategyDivestment` |
| `Settlement` | `SellerReleased`, `BuyerRefunded`, `PartialSettlementExecuted` |
| `DeliveryVerifier` | `ProofSubmitted`, `DeliveryVerified`, `ValidatorConfigured` |
| `ChainlinkVerifier` | `VerificationRequested`, `VerificationFulfilled`, `OracleConfigured` |
| `DisputeManager` | `DisputeOpened`, `DisputeResolved`, `DisputeCancelled` |
| `SimpleResolver` | `DecisionRecorded`, `ConsumerUpdated` |
| `AutomationHandler` | `DealRegistered`, `DealUnregistered`, `MaxScanUpdated`, `DealManagerUpdated` |

Recommended index fields:

- deal ID
- buyer
- seller
- token
- amount
- state
- deadlines
- proof hash
- verification state
- dispute state
- settlement amounts
- transaction hash
- block number
- chain ID

## Security Model

SettleOne's security model is built around restricted responsibilities.

Security principles:

- Contracts custody and settle funds.
- Backend cannot bypass contract state.
- Verifier approval does not directly transfer funds.
- Dispute decisions flow through `DisputeManager`.
- Settlement is single-use.
- Vault release/refund is role-gated.
- Automation can only execute valid actions.
- Admin functions are separated by role.
- UUPS upgrades require explicit upgrader authorization.
- Emergency pause exists on critical flows.

Important protections:

- OpenZeppelin `AccessControl`.
- OpenZeppelin upgradeable patterns.
- UUPS upgrade authorization.
- Reentrancy guards on fund-moving paths.
- `SafeERC20` for ERC20 transfers.
- Exact ERC20 received amount checks.
- Custom errors for explicit failures.
- Centralized transition validation.
- Per-deal vault positions.
- Single settlement guard.
- Verifier-specific records.
- Resolver output normalization.
- Automation action validation.

Important risks:

- Validator key compromise can approve false delivery.
- Oracle key compromise can approve false async verification.
- Arbiter key compromise can decide disputes incorrectly.
- Admin/upgrader compromise can change modules or upgrade logic.
- Unsafe ERC20 tokens can create accounting issues.
- Yield strategies can lose funds or become illiquid.
- Poor off-chain evidence policy can create unfair disputes.
- Bugs in future resolvers can produce bad settlements.

## Access Control and Roles

| Contract | Roles |
| --- | --- |
| `DealManager` | `DEFAULT_ADMIN_ROLE`, `PAUSER_ROLE`, `CONFIG_ROLE`, `RESOLVER_ROLE`, `UPGRADER_ROLE` |
| `EscrowVault` | `DEFAULT_ADMIN_ROLE`, `VAULT_ADMIN_ROLE`, `FUNDING_ROLE`, `SETTLEMENT_ROLE`, `UPGRADER_ROLE` |
| `Settlement` | `DEFAULT_ADMIN_ROLE`, `SETTLEMENT_ADMIN_ROLE`, `UPGRADER_ROLE` |
| `DeliveryVerifier` | `DEFAULT_ADMIN_ROLE`, `VALIDATOR_ROLE`, `UPGRADER_ROLE` |
| `ChainlinkVerifier` | `DEFAULT_ADMIN_ROLE`, `REQUESTER_ROLE`, `ORACLE_ROLE`, `UPGRADER_ROLE` |
| `DisputeManager` | `DEFAULT_ADMIN_ROLE`, `DISPUTE_ADMIN_ROLE`, `UPGRADER_ROLE` |
| `SimpleResolver` | `DEFAULT_ADMIN_ROLE`, `ARBITER_ROLE`, `CONSUMER_ROLE`, `UPGRADER_ROLE` |
| `AutomationHandler` | `DEFAULT_ADMIN_ROLE`, `AUTOMATION_ADMIN_ROLE`, `REGISTRAR_ROLE`, `UPGRADER_ROLE` |
| `BaseStrategy` | `DEFAULT_ADMIN_ROLE`, `STRATEGIST_ROLE`, `UPGRADER_ROLE` |
| `PaymentToken` | `DEFAULT_ADMIN_ROLE`, `MINTER_ROLE`, `BURNER_ROLE` |

Production role guidance:

- Use a multisig for admin roles.
- Use a timelock for upgrades where possible.
- Use separate validator and oracle keys.
- Use separate arbiter governance from technical admin when possible.
- Rotate compromised keys immediately.
- Keep deployer keys out of day-to-day operations.
- Document every role assignment after deployment.

## Upgradeability

Most core contracts are designed with UUPS upgradeability.

Upgradeable modules include:

- `DealManager`
- `EscrowVault`
- `Settlement`
- `DeliveryVerifier`
- `ChainlinkVerifier`
- `DisputeManager`
- `SimpleResolver`
- `AutomationHandler`
- `BaseStrategy` implementations

Upgrade guidance:

- Never upgrade directly from an EOA in production.
- Use multisig or governance.
- Run storage-layout checks.
- Run fork tests before upgrade.
- Document upgrade intent.
- Publish implementation addresses.
- Keep rollback and pause procedures ready.
- Avoid careless struct layout changes.

## Setup Guide

### Prerequisites

- Git
- Foundry
- Node.js if frontend code is added

### Clone the root project

```bash
git clone <repo-url> SettleOne
cd SettleOne
```

### Initialize submodules

```bash
git submodule update --init --recursive
```

### Build contracts

```bash
cd contracts
forge build
```

### Run contract tests

```bash
cd contracts
forge test
```

### Format contracts

```bash
cd contracts
forge fmt
```

### Frontend

The `frontend` directory currently exists as a workspace placeholder. When a
frontend app is added, use the package manager and scripts defined inside that
directory.

## Development Workflow

### Root repository workflow

Use the root repository for:

- Project-level README and docs.
- Coordinating public frontend work.
- Tracking the contract submodule pointer.
- Keeping public project context in one place.

### Contract submodule workflow

Because `contracts` is a submodule, contract changes must be committed inside
the submodule first, then the root repo must commit the updated pointer.

```bash
cd contracts
forge build
forge test
git status
git add .
git commit -m "update protocol contracts"
git push

cd ..
git status
git add contracts
git commit -m "update contracts submodule"
git push
```

### Private backend workflow

The backend should be maintained separately if it contains:

- Private APIs.
- Validator keys.
- Oracle keys.
- Business verification rules.
- Commercial integrations.
- Sensitive customer data.

Never commit secrets, private keys, RPC credentials, API keys, or production
webhook secrets to this repository.

## Testing Guide

The current contract test folder is:

```text
contracts/test/
```

At minimum, production readiness requires tests for:

- Deal creation.
- ETH funding.
- ERC20 funding.
- Invalid funding attempts.
- Proof submission.
- EIP-712 verification approval.
- Verification rejection.
- Async verification finalization.
- Buyer confirmation.
- Buyer dispute.
- Seller-wins dispute.
- Buyer-wins dispute.
- Split dispute.
- Auto-release after dispute window.
- Refund after missed delivery deadline.
- Cancel unfunded deal.
- Double settlement prevention.
- Vault accounting.
- Strategy invest/divest.
- Role restrictions.
- Pause behavior.
- Upgrade authorization.
- Event emission.

Recommended additional test categories:

- Fuzz tests for settlement splits.
- Fuzz tests for vault share accounting.
- Fork tests for strategy integrations.
- Invariant tests for total principal and shares.
- Upgrade storage layout tests.
- Integration tests for full user journeys.

Important invariants:

- A deal cannot settle twice.
- Only the buyer can fund the deal.
- Only the seller can submit proof.
- Buyer can dispute only during the dispute window.
- Seller cannot receive funds before valid delivery or dispute outcome.
- Buyer cannot refund after valid auto-release conditions are met.
- Vault positions cannot be overwritten.
- Released principal cannot exceed remaining principal.
- Settlement split must equal total principal.
- Automation cannot execute unsupported actions.

## Deployment Guide

Deployment script:

```text
contracts/script/Deploy.s.sol
```

Expected environment variables:

```bash
PRIVATE_KEY=<deployer-private-key>
ADMIN_ADDRESS=<multisig-or-admin-address>
VALIDATOR_ADDRESS=<initial-validator-address>
AUTOMATION_MAX_SCAN=25
```

Deployment command shape:

```bash
cd contracts
forge script script/Deploy.s.sol --rpc-url <RPC_URL> --broadcast
```

Current deployment sequence:

1. Deploy `DeliveryVerifier` proxy.
2. Deploy `SimpleResolver` proxy.
3. Deploy `EscrowVault` proxy.
4. Deploy `Settlement` proxy.
5. Deploy `DisputeManager` proxy.
6. Deploy `DealManager` proxy.
7. Deploy `AutomationHandler` proxy.
8. Grant vault funding role to `DealManager`.
9. Grant vault settlement role to `Settlement`.
10. Set `Settlement` deal manager to `DealManager`.
11. Set `DisputeManager` deal manager to `DealManager`.
12. Set `SimpleResolver` consumer to `DisputeManager`.
13. Set `DealManager` automation handler to `AutomationHandler`.

Post-deployment checks:

- Confirm all proxy addresses.
- Confirm all implementation addresses.
- Confirm `DealManager` module addresses.
- Confirm vault roles.
- Confirm settlement authorized deal manager.
- Confirm dispute manager authorized deal manager.
- Confirm resolver consumer.
- Confirm validator role.
- Confirm automation registrar.
- Transfer admin/upgrader roles to production governance.
- Revoke unnecessary deployer permissions.
- Verify source code where appropriate.
- Run smoke tests on the deployed chain.

## Integration Guide

### Basic create-and-fund flow

Seller:

```text
createDeal(input)
```

Buyer for ERC20:

```text
approve(vault, amount)
depositFunds(dealId)
```

Buyer for native ETH:

```text
depositFunds(dealId) with msg.value == amount
```

Seller:

```text
submitDeliveryProof(dealId, proofHash, submissionData, verificationData)
```

Buyer:

```text
confirmDelivery(dealId)
```

or:

```text
raiseDispute(dealId, reasonHash, evidenceHash)
```

Automation/caller:

```text
autoRelease(dealId)
refundExpired(dealId)
```

### Useful frontend reads

- `DealManager.getDeal`
- `DealManager.getDealState`
- `DealManager.getDealCount`
- `DealManager.getAutomationAction`
- `EscrowVault.balanceOf`
- `EscrowVault.getPosition`
- `EscrowVault.isFunded`
- `Settlement.isSettled`
- `Settlement.getBalance`
- `DisputeManager.getDispute`
- `DisputeManager.isDisputed`
- `IVerifier.getVerification`
- `IVerifier.getProof`

### Useful backend reads

- Deal state before producing signatures.
- Proof hash stored by verifier.
- Verification record.
- Dispute context.
- Settlement state.
- Event logs for indexing.

### Chain IDs and address management

Production integrations should maintain a deployment registry:

```json
{
  "chainId": 11155111,
  "network": "sepolia",
  "contracts": {
    "dealManager": "0x...",
    "escrowVault": "0x...",
    "settlement": "0x...",
    "deliveryVerifier": "0x...",
    "disputeManager": "0x...",
    "simpleResolver": "0x...",
    "automationHandler": "0x..."
  }
}
```

## Example User Journeys

### Happy path

```text
Seller creates deal
Buyer reviews terms
Buyer locks funds
Seller delivers work
Seller submits proof
Backend verifier approves proof
Buyer confirms delivery
Seller receives funds
Deal ends as Settled
```

### Buyer silence path

```text
Seller creates deal
Buyer locks funds
Seller delivers work
Proof is verified
Buyer does not confirm or dispute
Dispute window expires
Automation calls autoRelease
Seller receives funds
Deal ends as Settled
```

### Buyer dispute path

```text
Seller creates deal
Buyer locks funds
Seller submits proof
Proof is verified
Buyer disputes before deadline
DisputeManager opens dispute
Arbiter records decision
DealManager resolves dispute
Settlement releases/refunds/splits funds
Deal ends as Settled
```

### Seller misses delivery

```text
Seller creates deal
Buyer locks funds
Seller does not submit approved proof before deadline
Automation or user calls refundExpired
Buyer receives refund
Deal ends as Refunded
```

### Cancel before funding

```text
Seller creates deal
Buyer has not funded
Buyer or seller cancels
Deal ends as Cancelled
No funds move
```

## Operational Runbook

### If a deal is stuck in `FundsLocked`

Check:

- Has delivery deadline passed?
- Did seller submit proof?
- Is verifier configured correctly?
- Is automation registered?
- Can `refundExpired` be called?

### If a deal is stuck in `ProofSubmitted`

Check:

- Verifier record state.
- Validator signature validity.
- Oracle fulfillment status.
- Delivery deadline.
- Whether `finalizeDelivery` can be called.
- Whether proof was rejected.

### If a deal is stuck in `Delivered`

Check:

- Current timestamp vs `disputeWindowEndsAt`.
- Whether buyer wants to confirm.
- Whether buyer opened dispute.
- Whether `autoRelease` is available.

### If a deal is stuck in `Disputed`

Check:

- Active dispute record.
- Resolver address.
- Whether arbiter recorded decision.
- Whether caller has `RESOLVER_ROLE`.
- Whether resolver consumer role is configured.

### If settlement fails

Check:

- Has deal already settled?
- Does vault position exist?
- Is `Settlement` authorized in vault?
- Does vault have enough liquidity?
- Is a strategy withdrawal required?
- Is token behavior supported?

### If automation fails

Check:

- Is deal registered?
- Does `getAutomationAction` return anything?
- Is `performData` encoded correctly?
- Is `maxScan` too low?
- Is automation handler pointing at current `DealManager`?
- Are terminal deals being unregistered?

## Production Readiness Checklist

### Smart contracts

- Full unit test coverage.
- Integration test coverage.
- Invariant/fuzz tests for vault and settlement.
- Fork tests for enabled strategies.
- Upgrade storage layout checks.
- External audit.
- Fix audit findings.
- Deployment rehearsal.
- Contract verification.

### Backend

- Deterministic metadata hashing.
- EIP-712 signing implemented correctly.
- Validator key stored in secure key management.
- Signature expiration enforced.
- Proof validation rules documented.
- Dispute evidence pipeline implemented.
- Event indexer implemented.
- Retry logic for oracle fulfillment.
- Alerting for stuck deals.

### Frontend

- Clear buyer funding warnings.
- Clear seller deadline warnings.
- Clear dispute-window countdown.
- Wallet error handling.
- ERC20 approval flow.
- Transaction status tracking.
- Event-based refresh.
- Evidence/proof upload UX.
- Dispute UX.

### Operations

- Multisig admin.
- Timelocked upgrades.
- Key rotation plan.
- Emergency pause process.
- Incident response plan.
- Accepted token policy.
- Oracle policy.
- Dispute policy.
- Yield strategy policy.
- Public deployment registry.

### Legal and product

- Terms of service.
- Dispute policy.
- Evidence policy.
- Privacy policy for off-chain data.
- User risk disclosures.
- Jurisdiction/compliance review if handling regulated payment flows.

## Roadmap

Potential future improvements:

- Milestone-based deals.
- Recurring payment commitments.
- Invoice tokenization.
- Reputation scores for buyers and sellers.
- More verifier modules.
- More resolver modules.
- DAO-based dispute resolution.
- Optimistic challenge windows.
- Stablecoin-first UX.
- SDK for frontend/backend integrations.
- Event indexing service.
- Admin dashboard.
- Strategy risk dashboards.
- Cross-chain payment commitments.
- Merchant checkout integrations.
- Marketplace plugins.

## Glossary

| Term | Meaning |
| --- | --- |
| PCL | Payment Commitment Layer. The settlement layer that ensures payment is committed before work begins. |
| Deal | A payment commitment between buyer and seller. |
| Buyer | Party locking funds and receiving delivery. |
| Seller | Party delivering work and receiving funds. |
| Escrow | Locked funds held by `EscrowVault`. |
| Proof hash | On-chain hash of delivery evidence. |
| Terms hash | On-chain hash of agreement, invoice, order, or commercial terms. |
| Verifier | Contract that approves or rejects delivery proof. |
| Validator | Off-chain signer authorized by `DeliveryVerifier`. |
| Oracle | Off-chain system authorized by `ChainlinkVerifier`. |
| Dispute window | Time after verified delivery when buyer may dispute. |
| Resolver | Contract that decides dispute outcome. |
| Auto-release | Seller payout after buyer silence and dispute-window expiry. |
| Refund expiry | Buyer refund after seller misses delivery deadline. |
| Strategy | Optional external yield integration for ERC20 escrow assets. |

## Project Status

SettleOne currently has a modular smart contract suite in the `contracts`
submodule and project-level documentation in this root repository.

The public root repository should be treated as the coordinator for the product
and integration story. The contract submodule should be treated as the source
for Solidity implementation details. The backend/verifier layer is expected to
be private or separately maintained.

Before production use with real funds, SettleOne should complete formal audit,
deployment rehearsal, operational hardening, backend hardening, monitoring, and
legal/product policy review.

## License

The root repository is licensed under the MIT License. See `LICENSE`.

The contract submodule has its own license file at:

```text
contracts/LICENSE
```
