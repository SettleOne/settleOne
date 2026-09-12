import {
  PageHeader,
  Section,
  Paragraph,
  CodeBlock,
  List,
  Callout,
  Table,
  ImageBlock,
  FlowDiagram,
} from "../components/DocsUI";

export function Architecture() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader
        title="System Architecture"
        description="High-level architecture of the SettleOne platform."
      />
      <Section title="Overview">
        <Paragraph>
          The system architecture connects the user interface, backend risk
          engine, data layer, and smart contracts together in a coordinated
          flow. It is built to ensure transparent movement of capital while
          keeping AI and deterministic risk evaluation cleanly separated.
        </Paragraph>

        <FlowDiagram
          direction="vertical"
          steps={[
            "Deal Creation (UI)",
            "Escrow (Smart Contracts)",
            "Risk Policy Evaluation",
            "Strategy Engine (Aave/Yield)",
            "AI Monitor & The Graph",
            "Settlement & Distribution",
          ]}
        />

        <Paragraph>
          When a deal is created and escrow is funded, the system evaluates the
          configured risk policy. If eligible, the strategy engine deploys
          capital to a vetted yield protocol (such as Aave). The Graph indexes
          on-chain events, feeding data back to the risk engine for real-time
          evaluation. The AI monitor interprets this data for users, while smart
          contracts strictly enforce the rules.
        </Paragraph>
      </Section>
    </div>
  );
}

export function RiskEngine() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader
        title="Risk Engine"
        description="Defining exposure limits and evaluating strategies."
      />
      <Section title="Risk Policy">
        <Paragraph>
          The Risk Policy defines the maximum acceptable exposure for a deal. It
          is an explicit set of constraints that must be met before capital can
          be deployed and while it remains active.
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
        <Table
          headers={[
            "Policy",
            "Max Drawdown",
            "Min Liquidity",
            "Settlement Buffer",
            "Auto Exit",
          ]}
          rows={[
            ["Conservative", "0.50%", "98%", "24h", "Yes"],
            ["Balanced", "1.00%", "95%", "12h", "Yes"],
            ["Growth", "2.00%", "90%", "6h", "Yes"],
          ]}
        />
      </Section>
      <Section title="Strategy Evaluation">
        <Paragraph>
          The Strategy Engine evaluates whether a strategy is appropriate for a
          particular deal based on deal amount, settlement deadline, risk
          policy, protocol state, expected yield, and liquidity.
        </Paragraph>
        <Callout type="warning" title="Strict Selection">
          SettleOne follows a strict selection principle that prioritizes risk
          over raw yield. A strategy is not suitable merely because it
          advertises a higher APY; it must satisfy settlement constraints first.
        </Callout>
      </Section>
    </div>
  );
}

export function AIMonitor() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader
        title="AI Monitor"
        description="Interpreting risk and anomalies."
      />
      <Section title="The Role of AI">
        <Paragraph>
          SettleOne's AI layer is designed as a risk interpretation and
          monitoring system, not an autonomous financial agent. It translates
          complex on-chain signals into human-readable insights.
        </Paragraph>
        <List>
          <li>Explains risk signals and summarizes position health.</li>
          <li>Identifies unusual patterns.</li>
          <li>Describes why a strategy may no longer satisfy a policy.</li>
        </List>
        <Callout type="info" title="Strict Boundaries">
          The AI does not hold private keys, custody funds, arbitrarily transfer
          assets, modify risk policies, or bypass smart-contract restrictions.
          The AI layer can fail without the financial control layer becoming
          uncontrolled.
        </Callout>
      </Section>
    </div>
  );
}

export function YieldLayer() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader
        title="DeFi Yield Layer"
        description="Strategy abstractions and integrations."
      />
      <Section title="Strategy Layer">
        <Paragraph>
          The initial strategy layer focuses on Aave. The conceptual flow of
          capital is designed around an abstraction so that additional
          strategies can be introduced safely.
        </Paragraph>

        <FlowDiagram
          direction="horizontal"
          steps={[
            "USDC Escrow",
            "Aave Strategy",
            "Yield Position",
            "Controlled Exit",
            "Settlement",
          ]}
        />

        <Paragraph>
          Potential future strategies may include other lending or liquidity
          protocols, but additional integrations should only be introduced when
          they satisfy SettleOne's risk and settlement requirements.
        </Paragraph>
      </Section>
    </div>
  );
}
