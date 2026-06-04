# SettleOne Phase 1: Foundation Deliverable

## 1. Monorepo Folder Structure
The project has been refactored into a Turborepo monorepo:
```text
frontend/
├── apps/
│   ├── marketing/      # Landing page and public-facing content
│   ├── workspace/      # Main Transaction OS for Buyers and Sellers
│   └── operations/     # Admin and Arbitrator dashboard
├── packages/
│   ├── design-system/  # Shared UI tokens, components, and styling
│   ├── types/          # Shared TypeScript domain models and enums
│   ├── sdk/            # Blockchain interaction layer (Viem/Wagmi)
│   ├── api/            # Off-chain data fetching (TanStack Query/Axios)
│   └── utils/          # Formatting, time, and common helper functions
├── turbo.json          # Monorepo task orchestration
└── package.json        # Root workspace configuration
```

## 2. Design Token Definitions
Located in `packages/design-system/src/tokens/index.ts`.
- **Colors:** Neutral B2B palette (Background: #FAFAFA, Primary: #111827) with semantic accents (Success, Warning, Error, Info).
- **Typography:** Inter-based scale (12px to 48px).
- **Spacing:** 4px based scale (4, 8, 12, 16, 24, 32, 48, 64).
- **Radius:** 12px for cards, 10px for interactive elements.
- **Shadows:** Multi-layered soft shadows (sm, md, lg).

## 3. Component Inventory (Planned)
The following high-level components are planned for the `design-system` package:
- **Foundations:** Button (CVA-based), Input, Card, Badge, Avatar.
- **SettleOne Specific:** DealTimeline, ActionCenter, VaultYieldCard, EvidenceCard, StatusBadge.
- **Layout:** Shell, Sidebar, PageHeader, Grid.

## 4. Shared Package Architecture
- **@settleone/types:** Single source of truth for all domain logic (`DealState`, `DisputeState`, etc.).
- **@settleone/design-system:** Consumed by all 3 apps to ensure visual consistency.
- **@settleone/api & @settleone/sdk:** Isolate the data fetching and blockchain logic from UI components.

## 5. Dependency Graph
- `apps/*` depend on `packages/*`.
- `packages/design-system` depends on `packages/types` (eventually).
- `packages/api` and `packages/sdk` depend on `packages/types`.

## 6. Route Ownership Map
- **Marketing:** `/`, `/features`, `/pricing`, `/docs`.
- **Workspace:** `/dashboard`, `/deals/*`, `/vault`, `/evidence`, `/disputes`.
- **Operations:** `/admin`, `/arbitrate/*`, `/monitoring`.

## 7. Build Strategy
- **Local:** `npm run build` at root triggers `turbo build`. Turbo caches unchanged packages.
- **CI/CD:** Automated builds on pull requests to ensure cross-package compatibility.

## 8. Deployment Strategy
- **Marketing:** Vercel (Production branch).
- **Workspace:** Vercel (Production branch, different project).
- **Operations:** Internal-only Vercel/Private deployment (Access controlled).
- **Versioning:** Independent versioning for apps; synchronized internal versioning for shared packages during development.
