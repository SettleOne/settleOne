import React from "react";
import { PageHeader, Section, Paragraph, CodeBlock, List, Callout } from "../components/DocsUI";

export function SystemArchitecture() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="System Architecture" description="High-level public architecture of the SettleOne platform." />
      <Section title="Overview">
        <Paragraph>
          The system architecture connects the user interface, backend risk engine, data layer, and smart contracts together in a coordinated flow.
        </Paragraph>
        <CodeBlock 
          language="text"
          code={`                         SETTLEONE
                             │
                             ▼
                       DEAL CREATION
                             │
                             ▼
                          ESCROW
                             │
                             ▼
                       RISK POLICY
                             │
                             ▼
                     STRATEGY ENGINE
                             │
                             ▼
                           AAVE
                             │
                             ▼
                       YIELD POSITION
                             │
              ┌──────────────┴──────────────┐
              ▼                             ▼
        The Graph                      AI Monitor
              │                             │
              └──────────────┬──────────────┘
                             ▼
                       RISK ENGINE
                             │
                  ┌──────────┴──────────┐
                  ▼                     ▼
               HEALTHY                BREACH
                  │                     │
                  │                CONTROLLED EXIT
                  │                     │
                  └──────────┬──────────┘
                             ▼
                        SETTLEMENT
                             │
                             ▼
                     YIELD DISTRIBUTION`}
        />
      </Section>
    </div>
  );
}

export function RepoArchitecture() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Repository Architecture" description="The modular organization of the SettleOne codebase." />
      <Section title="Component Boundaries">
        <Paragraph>
          SettleOne is intentionally divided into multiple repositories according to system responsibility rather than individual technologies.
        </Paragraph>
        <CodeBlock 
          language="text"
          code={`SettleOne
│
├── settleone-frontend
│   └── Product UI
│
├── settleone-backend
│   └── Private application backend
│
├── settleone-protocol
│   └── Smart-contract layer
│
├── settleone-risk-engine
│   └── Risk + strategy evaluation
│
├── settleone-ai
│   └── AI risk monitoring
│
└── settleone-data
    └── The Graph + blockchain data`}
        />
      </Section>
      <Section title="Visibility & Purpose">
        <List>
          <li><strong>settleone-frontend:</strong> Responsible for Marketplace, Deal Room, wallet connection, UI, and user notifications. Visibility: Public.</li>
          <li><strong>settleone-backend:</strong> Responsible for private application infrastructure, APIs, database, orchestration, internal services. Visibility: Private.</li>
          <li><strong>settleone-protocol:</strong> Responsible for the on-chain layer, escrow, settlement, strategies, risk-policy enforcement, and controlled exits. Visibility: Determined by protocol IP boundary.</li>
          <li><strong>settleone-risk-engine:</strong> Responsible for deterministic financial/risk evaluation, policy scoring, strategy eligibility. Visibility: Public during designated release period / selective thereafter.</li>
          <li><strong>settleone-ai:</strong> Responsible for AI Risk Monitor, anomaly interpretation, and natural-language summaries. Consumes structured signals, not raw financial control. Visibility: Public during designated release period / selective thereafter.</li>
          <li><strong>settleone-data:</strong> Responsible for The Graph integrations, blockchain data ingestion, event processing, and data normalization. Visibility: Public during designated release period / selective thereafter.</li>
        </List>
      </Section>
    </div>
  );
}

export function ContractArchitecture() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Smart Contract Architecture" description="The on-chain protocol components." />
      <Section title="Module Overview">
        <Paragraph>
          The smart contracts are designed modularly to separate state, business logic, risk enforcement, and yield integration.
        </Paragraph>
        <CodeBlock 
          language="text"
          code={`contracts/
├── core/
│   ├── SettleOneEscrow
│   └── SettleOneSettlement
│
├── risk/
│   └── RiskPolicy
│
├── strategies/
│   ├── StrategyManager
│   └── AaveStrategy
│
├── yield/
│   └── YieldDistributor
│
├── exit/
│   └── ExitManager
│
├── interfaces/
│
├── test/
│
└── script/`}
        />
      </Section>
      <Section title="Core Components">
        <List>
          <li><strong>Escrow:</strong> Responsible for receiving funds, maintaining deal state, tracking authorization, and enforcing release conditions.</li>
          <li><strong>Settlement:</strong> Responsible for completing the underlying transaction, releasing funds according to rules, and coordinating final state.</li>
          <li><strong>Risk Policy:</strong> Defines permitted risk parameters for the protocol.</li>
          <li><strong>Strategy Manager:</strong> Controls which strategies can be interacted with.</li>
          <li><strong>Aave Strategy:</strong> Encapsulates Aave-specific interactions.</li>
          <li><strong>Yield Distributor:</strong> Handles accounting and distribution according to the configured mechanism.</li>
          <li><strong>Exit Manager:</strong> Provides a controlled path for unwinding eligible strategy positions.</li>
        </List>
      </Section>
    </div>
  );
}

export function ExampleDeal() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Example Deal" description="A step-by-step walkthrough of a yield-enabled SettleOne transaction." />
      <Section title="Deal Parameters">
        <Paragraph>Consider the following deal setup:</Paragraph>
        <CodeBlock 
          code={`Deal Amount:       $10,000 USDC
Settlement:        7 days
Risk Profile:      Conservative
Yield Split:       50 / 50`}
        />
      </Section>
      <Section title="Step 1 — Escrow">
        <Paragraph>Capital is deposited into the SettleOne Escrow contract.</Paragraph>
        <CodeBlock code={`$10,000\n   ↓\nSettleOne Escrow`} />
      </Section>
      <Section title="Step 2 — Policy Definition">
        <Paragraph>The system establishes the constraints.</Paragraph>
        <CodeBlock code={`Max Drawdown: 0.50%\nMin Liquidity: 98%\nSettlement Buffer: 24h\nAuto Exit: Enabled`} />
      </Section>
      <Section title="Step 3 — Strategy Evaluation">
        <Paragraph>The Strategy Engine evaluates available strategies. Suppose Aave satisfies the policy.</Paragraph>
        <CodeBlock code={`Aave\nAPY: 4.1%\nRisk: Low\nLiquidity: High\nCompatible: Yes`} />
      </Section>
      <Section title="Step 4 — Deployment">
        <Paragraph>Capital is deployed to the strategy.</Paragraph>
        <CodeBlock code={`Escrow\n  ↓\nAave`} />
      </Section>
      <Section title="Step 5 — Monitoring">
        <Paragraph>The data layer provides current position information. The deterministic risk engine evaluates it, and the AI monitor explains the state.</Paragraph>
        <Callout type="success" title="Position healthy">No action required.</Callout>
      </Section>
      <Section title="Step 6 — Anomaly (Example)">
        <Paragraph>Suppose a policy threshold is breached.</Paragraph>
        <CodeBlock code={`Risk Engine\n     ↓\nPolicy breach\n     ↓\nControlled Exit`} />
      </Section>
      <Section title="Step 7 — Settlement">
        <Paragraph>Capital returns to the settlement layer.</Paragraph>
        <CodeBlock code={`Capital\n  ↓\nSettlement\n  ↓\nBuyer / Seller`} />
      </Section>
      <Section title="Step 8 — Yield">
        <Paragraph>Any realized yield is accounted for separately and distributed according to the deal's configured terms.</Paragraph>
      </Section>
    </div>
  );
}

export function GraphDataLayer() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="The Graph Data Layer" description="Indexing blockchain events for the risk engine." />
      <Section title="Data Architecture">
        <Paragraph>
          The Graph provides indexed blockchain data that feeds SettleOne's monitoring and analytical systems.
        </Paragraph>
        <CodeBlock 
          code={`Blockchain\n     ↓\nAave / SettleOne activity\n     ↓\nThe Graph\n     ↓\nSettleOne Data Layer\n     ↓\nNormalized Data\n     ↓\nRisk Engine\n     ↓\nDeal Room / AI Monitor`}
        />
      </Section>
      <Section title="Available Metrics">
        <Paragraph>
          The data layer provides information such as protocol activity, position state, liquidity-related metrics, historical events, transaction activity, strategy state, and settlement-related blockchain events. The exact data depends on deployed subgraphs.
        </Paragraph>
      </Section>
    </div>
  );
}
