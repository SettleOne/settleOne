import React from "react";
import { PageHeader, Section, Paragraph, Callout, CodeBlock, Table, List } from "../components/DocsUI";

export function Workflow() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Product Workflow" description="The complete user journey around one settlement lifecycle." />
      <Section title="The User Journey">
        <Paragraph>
          The SettleOne product workflow is designed around a single, comprehensive settlement lifecycle. The user should not need to manually operate every underlying DeFi transaction; the system abstracts protocol complexity while keeping the important financial state visible.
        </Paragraph>
        <CodeBlock 
          code={`Create Deal\n     ↓\nDefine Terms\n     ↓\nFund Escrow\n     ↓\nSelect Risk Policy\n     ↓\nEvaluate Strategy\n     ↓\nDeploy Eligible Capital\n     ↓\nMonitor Position\n     ↓\nExit Before Settlement\n     ↓\nSettle Deal\n     ↓\nAccount for Yield\n     ↓\nDistribute Yield`}
        />
      </Section>
    </div>
  );
}

export function RiskPolicy() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Risk Policy" description="Defining the maximum acceptable exposure for a deal." />
      <Section title="Policy Definitions">
        <Paragraph>
          The Risk Policy defines the maximum acceptable exposure for a deal. It is an explicit set of constraints that must be met before capital can be deployed and while it remains active.
        </Paragraph>
        <CodeBlock 
          language="typescript"
          code={`type RiskPolicy = {
  maxDrawdownBps: number;
  minLiquidityBps: number;
  settlementBufferSeconds: number;
  autoExit: boolean;
};`}
        />
      </Section>
      <Section title="Example Policies">
        <Paragraph>
          These values are policy examples, not guarantees. The actual policy available to a deal should depend on the strategies, assets, chain, liquidity conditions, and protocol implementation.
        </Paragraph>
        <Table 
          headers={["Policy", "Max Drawdown", "Min Liquidity", "Settlement Buffer", "Auto Exit"]}
          rows={[
            ["Conservative", "0.50%", "98%", "24h", "Yes"],
            ["Balanced", "1.00%", "95%", "12h", "Yes"],
            ["Growth", "2.00%", "90%", "6h", "Yes"],
          ]}
        />
        <Callout type="info" title="Practical Example">
          For a $10,000 deal with a Conservative policy, the system should not treat a strategy as suitable merely because it advertises a higher APY. It must satisfy the settlement constraints first.
        </Callout>
      </Section>
    </div>
  );
}

export function StrategyEngine() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Strategy Engine" description="Evaluating if a strategy is appropriate for a deal." />
      <Section title="Evaluation Parameters">
        <Paragraph>
          The Strategy Engine evaluates whether a strategy is appropriate for a particular deal based on a wide range of inputs:
        </Paragraph>
        <List>
          <li>Deal amount</li>
          <li>Settlement deadline</li>
          <li>Risk policy</li>
          <li>Current protocol state</li>
          <li>Expected yield</li>
          <li>Liquidity</li>
          <li>Historical/current risk indicators</li>
          <li>Strategy characteristics</li>
          <li>Current position</li>
        </List>
      </Section>
      <Section title="Engine Output">
        <Paragraph>
          The engine produces structured output, for example:
        </Paragraph>
        <CodeBlock 
          code={`Strategy: Aave
Expected APY: 4.1%
Risk: Low
Liquidity: High
Policy Compatibility: Yes
Suitability: 91/100`}
        />
        <Callout type="warning">
          The score is an evaluation signal—not a promise of future performance.
        </Callout>
      </Section>
      <Section title="Strategy Selection Principle">
        <Paragraph>
          SettleOne follows a strict selection principle that prioritizes risk over raw yield.
        </Paragraph>
        <CodeBlock 
          code={`// Correct Principle
Risk constraints
      ↓
Eligibility
      ↓
Strategy evaluation
      ↓
Expected return
      ↓
Suitability

// Incorrect Principle
Highest APY
      ↓
Deposit immediately`}
        />
      </Section>
    </div>
  );
}

export function DefiYield() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="DeFi Yield Layer" description="Strategy abstractions and protocol integrations." />
      <Section title="Initial Strategy Layer">
        <Paragraph>
          The initial strategy layer focuses on Aave. The conceptual flow of capital is designed around an abstraction so that additional strategies can be introduced safely.
        </Paragraph>
        <CodeBlock 
          code={`USDC\n  ↓\nSettleOne Escrow\n  ↓\nAave Strategy\n  ↓\nYield Position\n  ↓\nControlled Exit\n  ↓\nSettleOne\n  ↓\nSettlement`}
        />
        <Paragraph>
          Potential future strategies may include other lending or liquidity protocols, but additional integrations should only be introduced when they satisfy SettleOne's risk and settlement requirements.
        </Paragraph>
      </Section>
    </div>
  );
}

export function AIMonitor() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="AI Risk Monitor" description="Interpreting risk and anomalies with AI." />
      <Section title="The Role of AI">
        <Paragraph>
          SettleOne's AI layer is designed as a risk interpretation and monitoring system, not an autonomous financial agent.
        </Paragraph>
        <Paragraph>The AI can:</Paragraph>
        <List>
          <li>explain risk signals</li>
          <li>summarize position health</li>
          <li>identify unusual patterns</li>
          <li>describe why a strategy may no longer satisfy a policy</li>
          <li>convert technical risk information into understandable language</li>
          <li>provide monitoring summaries</li>
        </List>
      </Section>
      <Section title="Example Outputs">
        <Paragraph>A healthy position summary:</Paragraph>
        <Callout type="success" title="Position healthy">
          Current position remains within the configured risk policy. No action is required.
        </Callout>
        <Paragraph>A risk detection summary:</Paragraph>
        <Callout type="warning" title="Risk detected">
          Available liquidity has moved below the configured threshold. The position should be exited according to the deal's risk policy.
        </Callout>
      </Section>
      <Section title="What AI Does Not Do">
        <Paragraph>The AI is strictly partitioned from financial control.</Paragraph>
        <Callout type="info">
          <List>
            <li>AI does not hold private keys</li>
            <li>AI does not custody funds</li>
            <li>AI does not arbitrarily transfer assets</li>
            <li>AI does not modify risk policies</li>
            <li>AI does not bypass smart-contract restrictions</li>
            <li>AI does not independently choose unrestricted financial transactions</li>
          </List>
        </Callout>
      </Section>
    </div>
  );
}

export function AutomatedResponse() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Automated Risk Response" description="Deterministic risk reaction and execution." />
      <Section title="Deterministic Exits">
        <Paragraph>
          Risk response should be deterministic wherever possible. When policies are breached, the system executes predefined reactions.
        </Paragraph>
        <CodeBlock 
          code={`IF drawdown > maximum allowed
        ↓
      EXIT

IF liquidity < minimum required
        ↓
      EXIT

IF settlement deadline enters safety buffer
        ↓
      EXIT`}
        />
      </Section>
      <Section title="Infrastructure Integration">
        <Paragraph>
          Where oracle/automation infrastructure is appropriate, SettleOne may integrate services such as Chainlink. Integrations should be used because they provide a real architectural requirement—not merely for technology branding.
        </Paragraph>
      </Section>
    </div>
  );
}

export function Settlement() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Settlement" description="The primary objective of the SettleOne protocol." />
      <Section title="Settlement Safety">
        <Paragraph>
          Settlement remains the primary objective. A yield position should not be allowed to compromise the ability to complete the underlying deal.
        </Paragraph>
        <CodeBlock 
          code={`Strategy\n   ↓\nExit\n   ↓\nCapital available\n   ↓\nSettlement conditions satisfied\n   ↓\nFunds released`}
        />
        <Paragraph>
          The settlement layer should remain independent from the AI layer.
        </Paragraph>
      </Section>
    </div>
  );
}

export function YieldAccounting() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Yield Accounting & Distribution" description="Separating and distributing generated yield." />
      <Section title="Principal vs Yield">
        <Paragraph>
          SettleOne transparently separates principal from generated yield to calculate the final settlement value.
        </Paragraph>
        <CodeBlock 
          code={`Principal       $10,000.00
Generated Yield    +$32.48
──────────────────────────
Total            $10,032.48`}
        />
      </Section>
      <Section title="Distribution Model">
        <Paragraph>
          For the initial model, yield can be distributed equally between parties, or according to the configured mechanism of the deployed contract.
        </Paragraph>
        <CodeBlock 
          code={`Buyer      50%
Seller     50%

For $40 of yield:
Buyer      +$20
Seller     +$20`}
        />
      </Section>
      <Section title="Important Considerations">
        <Callout type="warning" title="Yield is not guaranteed">
          The system must account for:
          <List>
            <li>positive yield</li>
            <li>zero yield</li>
            <li>strategy losses</li>
            <li>fees and withdrawal costs</li>
            <li>protocol losses</li>
            <li>execution costs</li>
          </List>
        </Callout>
      </Section>
    </div>
  );
}

export function DealRoom() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Deal Room" description="The operational interface for live transactions." />
      <Section title="Interface Overview">
        <Paragraph>
          The Deal Room is the operational interface for a live transaction. It should make the state of capital understandable without requiring users to understand DeFi infrastructure.
        </Paragraph>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 font-mono text-sm mt-6">
          <div className="text-xl font-bold mb-4 pb-4 border-b border-slate-200">Deal #1024</div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-slate-500 mb-1">Amount</div>
              <div className="font-bold">$10,000 USDC</div>
            </div>
            <div>
              <div className="text-slate-500 mb-1">Settlement</div>
              <div className="font-bold">in 6d 12h</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-6 bg-white p-4 rounded-lg border border-slate-200">
            <div><div className="text-slate-500 text-xs uppercase mb-1">Escrow</div><div className="font-semibold">$10,000</div></div>
            <div><div className="text-slate-500 text-xs uppercase mb-1">Strategy</div><div className="font-semibold">Aave</div></div>
            <div><div className="text-slate-500 text-xs uppercase mb-1">Yield</div><div className="font-semibold text-emerald-600">+$6.42</div></div>
            <div><div className="text-slate-500 text-xs uppercase mb-1">Risk</div><div className="font-semibold text-blue-600">LOW</div></div>
          </div>
          <div className="mb-6">
            <div className="text-slate-500 mb-2">AI Risk Monitor</div>
            <div className="bg-emerald-50 text-emerald-800 p-3 rounded-lg border border-emerald-100 flex items-center gap-2">
              <span className="text-emerald-500">✓</span> Position healthy. No action required.
            </div>
          </div>
          <div>
            <div className="text-slate-500 mb-2">Timeline</div>
            <ul className="space-y-2">
              <li className="flex gap-2 items-center"><span className="text-emerald-500">✓</span> Deal created</li>
              <li className="flex gap-2 items-center"><span className="text-emerald-500">✓</span> Escrow funded</li>
              <li className="flex gap-2 items-center"><span className="text-emerald-500">✓</span> Strategy selected</li>
              <li className="flex gap-2 items-center"><span className="text-emerald-500">✓</span> Yield generating</li>
              <li className="flex gap-2 items-center text-slate-400">○ Settlement</li>
              <li className="flex gap-2 items-center text-slate-400">○ Yield distribution</li>
            </ul>
          </div>
        </div>
      </Section>
    </div>
  );
}
