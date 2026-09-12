import React from "react";
import { PageHeader, Section, Paragraph, List, Callout, CodeBlock } from "../components/DocsUI";

export function Introduction() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="What is SettleOne?" 
        description="Risk-aware settlement infrastructure for capital that doesn't have to sit idle." 
      />
      <Section title="Overview">
        <Paragraph>
          SettleOne is an intelligent settlement infrastructure platform that combines on-chain escrow, explicit risk policies, deterministic strategy evaluation, DeFi yield management, blockchain data, and AI-powered risk monitoring to manage eligible settlement capital while keeping settlement safety as the primary objective.
        </Paragraph>
        <Paragraph>
          Instead of treating escrow as capital that simply waits until settlement, SettleOne creates a controlled environment in which eligible escrow capital can be evaluated for temporary DeFi deployment under predefined risk and settlement constraints.
        </Paragraph>
        <Callout type="info" title="Settlement safety comes first">
          The objective is not simply to maximize APY. Yield is secondary to the safety and deterministic execution of the underlying transaction.
        </Callout>
      </Section>
      <Section title="Who SettleOne Is For">
        <Paragraph>
          SettleOne is built for MSMEs, vendors, suppliers, freelancers, service providers, B2B commerce, marketplaces, and any workflow where delayed payments or informal settlement promises create operational risk.
        </Paragraph>
        <List>
          <li><strong>MSME supplier payments:</strong> Buyer locks payment before supplier ships or performs work.</li>
          <li><strong>Freelance or agency work:</strong> Client commits funds before project delivery begins.</li>
          <li><strong>Marketplace settlement:</strong> Platform coordinates deals while contracts enforce escrow rules.</li>
          <li><strong>B2B purchase orders:</strong> Terms hash links on-chain deal to off-chain order and invoice.</li>
        </List>
      </Section>
    </div>
  );
}

export function TheProblem() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="The Problem" 
        description="The limitations of traditional escrow and idle settlement capital." 
      />
      <Section title="Idle Capital">
        <Paragraph>
          Traditional escrow solves an important problem: capital is locked until contractual conditions are satisfied. However, during that period, capital can remain economically idle. Settlement capital can remain locked for days or weeks.
        </Paragraph>
        <Paragraph>
          During this period:
        </Paragraph>
        <List>
          <li>Capital may generate no return.</li>
          <li>Participants have limited visibility into the capital's status.</li>
          <li>Yield opportunities may exist but carry additional risk.</li>
          <li>Settlement deadlines introduce time-sensitive liquidity requirements.</li>
          <li>DeFi positions can change after the initial strategy decision.</li>
          <li>Manually monitoring positions does not scale.</li>
        </List>
      </Section>
      <Section title="The Need for Intelligence">
        <Paragraph>
          Simply depositing escrow funds into a yield protocol is insufficient. A settlement system needs to understand:
        </Paragraph>
        <List>
          <li>How much capital can be exposed</li>
          <li>How much drawdown is acceptable</li>
          <li>How much liquidity must remain available</li>
          <li>When the position must be unwound</li>
          <li>Who bears losses</li>
          <li>How yield is accounted for</li>
          <li>How anomalies are detected</li>
          <li>How settlement remains executable</li>
        </List>
      </Section>
    </div>
  );
}

export function TheApproach() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader 
        title="The SettleOne Approach" 
        description="Separating the problem into distinct layers for safety and clarity." 
      />
      <Section title="A Different Model">
        <Paragraph>
          SettleOne explores a different model from traditional static escrow:
        </Paragraph>
        <CodeBlock 
          code={`Deal\n  ↓\nEscrow\n  ↓\nRisk Policy\n  ↓\nStrategy Evaluation\n  ↓\nEligible DeFi Strategy\n  ↓\nRisk Monitoring\n  ↓\nControlled Exit\n  ↓\nSettlement\n  ↓\nYield Distribution`} 
        />
        <Paragraph>
          The objective is to determine: <strong>Can this escrow capital be productively managed without violating the conditions required for safe settlement?</strong>
        </Paragraph>
        <Paragraph>
          If the answer is no, capital should remain idle or exit the strategy.
        </Paragraph>
      </Section>
      <Section title="Layered Architecture">
        <Paragraph>
          SettleOne separates responsibilities into distinct layers. The architectural rule is: <strong>AI explains. Deterministic systems evaluate. Smart contracts enforce.</strong>
        </Paragraph>
        <CodeBlock 
          language="text"
          code={`┌──────────────────────────────────────┐
│             SETTLEONE UI             │
│ Marketplace • Deal Room • Wallet     │
└───────────────────┬──────────────────┘
                    │
                    ▼
┌──────────────────────────────────────┐
│             APPLICATION              │
│ API • Orchestration • Database       │
└───────────────────┬──────────────────┘
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
┌──────────────────┐  ┌──────────────────┐
│   RISK ENGINE    │  │   AI MONITOR     │
│                  │  │                  │
│ Risk Policy      │  │ Risk explanation │
│ Risk evaluation  │  │ Anomaly analysis │
│ Strategy engine  │  │ Human summaries  │
└────────┬─────────┘  └──────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│             DATA LAYER               │
│ The Graph • Aave • Blockchain data   │
└───────────────────┬──────────────────┘
                    │
                    ▼
┌──────────────────────────────────────┐
│          SETTLEONE PROTOCOL          │
│ Escrow • Settlement • Strategies     │
│ Risk enforcement • Exit • Yield      │
└──────────────────────────────────────┘`}
        />
      </Section>
    </div>
  );
}

export function CorePrinciples() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Core Principles" description="The foundational rules governing SettleOne's design." />
      <Section title="1. Settlement safety over yield">
        <Paragraph>The system should prefer a lower-yield strategy—or no strategy—when a higher-yield strategy introduces unacceptable settlement risk.</Paragraph>
      </Section>
      <Section title="2. Explicit risk policies">
        <Paragraph>Risk should never be an implicit assumption. Each eligible deal should have explicit constraints.</Paragraph>
      </Section>
      <Section title="3. Deterministic financial decisions">
        <Paragraph>Financial execution should not depend on an LLM's arbitrary output.</Paragraph>
      </Section>
      <Section title="4. AI as a monitoring and explanation layer">
        <Paragraph>AI helps interpret risk and communicate what is happening. It does not own funds or receive unrestricted authority over financial execution.</Paragraph>
      </Section>
      <Section title="5. Transparent accounting">
        <Paragraph>Principal and yield should always be distinguishable.</Paragraph>
      </Section>
      <Section title="6. Controlled strategy exposure">
        <Paragraph>Only approved strategies should be executable by the protocol.</Paragraph>
      </Section>
      <Section title="7. Time-aware settlement">
        <Paragraph>A strategy must account for the settlement deadline and required liquidity buffer.</Paragraph>
      </Section>
    </div>
  );
}

export function HowItWorks() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="How SettleOne Works" description="The end-to-end flow of a yield-enabled deal." />
      <Section title="The Lifecycle">
        <Paragraph>A typical yield-enabled deal follows this path:</Paragraph>
        <List ordered>
          <li>Buyer and seller create a deal</li>
          <li>Settlement terms are established</li>
          <li>Escrow receives funds</li>
          <li>Risk Policy is assigned</li>
          <li>Strategy Engine evaluates eligible strategies</li>
          <li>Approved strategy is selected</li>
          <li>Capital is deployed</li>
          <li>Position is continuously monitored</li>
          <li>Risk remains within policy</li>
          <li>Strategy exits before settlement</li>
          <li>Capital returns to settlement layer</li>
          <li>Deal settles</li>
          <li>Yield is calculated and distributed</li>
        </List>
      </Section>
      <Section title="When Constraints are Breached">
        <Paragraph>If risk constraints are breached at any time, the system triggers a controlled exit.</Paragraph>
        <CodeBlock 
          code={`Position\n   ↓\nRisk evaluation\n   ↓\nPolicy breach\n   ↓\nControlled exit\n   ↓\nCapital returned\n   ↓\nSettlement continues`}
        />
      </Section>
    </div>
  );
}
