# Phase 6: Organization Workspaces & Team Permissions

The objective of Phase 6 is to transition SettleOne from an individual-user platform into a **Multi-User Business Platform**. As MSMEs scale, transactions are rarely managed by a single person; they require teams (Finance, Ops, Legal).

---

## 1. Organization Architecture

### Organization Entity
A new `Organization` entity will own Deals, Evidence, and Vaults, rather than individual `User` accounts.

```typescript
interface Organization {
  id: string;
  name: string;
  taxId?: string;
  verifiedStatus: boolean;
  walletAddress: string; // The primary multisig or treasury wallet
  members: OrganizationMember[];
}

interface OrganizationMember {
  userId: string;
  role: OrganizationRole;
  joinedAt: number;
}
```

---

## 2. Role-Based Access Control (RBAC)

Transactions will be managed through granular permissions based on the following personas:

| Role | Permissions |
| :--- | :--- |
| **Owner** | Full control, billing, member management, vault withdrawals. |
| **Finance Manager** | Funding deals, releasing payments, viewing yield analytics. |
| **Operations Manager** | Creating deals, submitting deliverables, uploading evidence. |
| **Legal Reviewer** | Reviewing terms, evidence validation, initiating disputes. |
| **Viewer** | Read-only access to all deal rooms and activity feeds. |

---

## 3. Collaborative Transaction Workflows

### Multi-Sig Approval UI
Integration with Safe (formerly Gnosis Safe) for high-value transactions.
- **Workflow:** Finance Manager initiates funding -> Owner receives notification -> Owner approves via wallet -> Transaction executed.

### Internal Threading
Private "internal-only" communication channels within the Deal Room, separate from the counterparty communication layer.

---

## 4. Shared Resource Management

### Shared Evidence Locker
Platform-wide evidence organized by departments or projects, accessible to all authorized team members.

### Shared Vault Intelligence
Aggregation of yield across all organization-owned deals, with attribution by project or manager.

---

## 5. Transition Strategy (Future-Proofing)

To ensure current work is compatible with Phase 6:

1.  **Context Injection:** Ensure all components (`ActionCenter`, `StatusBanner`) receive `userRole` not just from the Deal (Buyer/Seller) but also from the Organization context (Finance/Legal).
2.  **API Schema:** Backend endpoints should support `orgId` as an optional filter for all list operations.
3.  **UI Zones:** The "Transaction Workspace Zone" architecture is already designed for high-density information, making it easy to add "Team Presence" indicators (who is currently viewing the deal).

---

## Conclusion
Phase 6 will solidify SettleOne as the primary **Operating System for Trusted Organizations**, allowing businesses to scale their transaction volume safely while delegating tasks across their teams.
