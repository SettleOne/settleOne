import React from "react";
import { PageHeader, Section, Paragraph, List, Callout, CodeBlock, ImageBlock } from "../components/DocsUI";

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
        <ImageBlock src="/hero-bg.jpg" alt="SettleOne Overview" />
        <Paragraph>
          Traditional escrow solves an important problem: capital is locked until contractual conditions are satisfied. However, during that period, capital can remain economically idle for days or weeks, generating no return, while participants have limited visibility into its status.
        </Paragraph>
        <Paragraph>
          Instead of treating escrow as capital that simply waits until settlement, SettleOne creates a controlled environment in which eligible escrow capital can be evaluated for temporary DeFi deployment under predefined risk and settlement constraints.
        </Paragraph>
        <Callout type="info" title="Settlement safety comes first">
          The objective is not simply to maximize APY. Yield is secondary to the safety and deterministic execution of the underlying transaction. If capital cannot be productively managed without violating settlement conditions, it remains idle or exits the strategy.
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

export function Principles() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Core Principles" description="The foundational rules governing SettleOne's design." />
      <Section title="Design Philosophy">
        <Paragraph>SettleOne separates responsibilities into distinct layers. The core architectural rule is: <strong>AI explains. Deterministic systems evaluate. Smart contracts enforce.</strong></Paragraph>
        <List>
          <li><strong>Settlement safety over yield:</strong> The system prefers a lower-yield strategy—or no strategy—when a higher-yield strategy introduces unacceptable settlement risk.</li>
          <li><strong>Explicit risk policies:</strong> Risk should never be an implicit assumption. Each eligible deal has explicit constraints.</li>
          <li><strong>Deterministic financial decisions:</strong> Financial execution does not depend on an LLM's arbitrary output.</li>
          <li><strong>AI as a monitoring layer:</strong> AI helps interpret risk and communicate what is happening. It does not own funds or receive unrestricted authority over financial execution.</li>
          <li><strong>Transparent accounting:</strong> Principal and yield are always distinguishable.</li>
          <li><strong>Controlled strategy exposure:</strong> Only approved strategies are executable by the protocol.</li>
          <li><strong>Time-aware settlement:</strong> A strategy must account for the settlement deadline and required liquidity buffer.</li>
        </List>
      </Section>
    </div>
  );
}

export function HowItWorks() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="How It Works" description="The end-to-end flow of a yield-enabled deal." />
      <Section title="The Lifecycle">
        <Paragraph>A typical yield-enabled deal follows this path:</Paragraph>
        <ImageBlock src="/images/dealLifecycle.png" alt="Deal Lifecycle Flow" />
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
    </div>
  );
}
