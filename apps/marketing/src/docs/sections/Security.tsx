import React from "react";
import { PageHeader, Section, Paragraph, Callout, List, Table } from "../components/DocsUI";

export function SecurityModel() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Security Model" description="Defense-in-depth architecture of SettleOne." />
      <Section title="Multi-Layered Security">
        <Paragraph>SettleOne uses defense-in-depth. No single application layer should be treated as the sole security boundary.</Paragraph>
        <List ordered>
          <li>User</li>
          <li>Frontend</li>
          <li>Backend</li>
          <li>Risk Engine</li>
          <li>Protocol Constraints</li>
          <li>Smart Contracts</li>
          <li>DeFi Protocol</li>
        </List>
      </Section>
      <Section title="Critical Principles">
        <List>
          <li><strong>Smart contracts enforce critical financial constraints:</strong> Backend services do not replace contract-level security.</li>
          <li><strong>AI does not receive unrestricted custody:</strong> AI can analyze but cannot arbitrarily move funds.</li>
          <li><strong>Strategy interactions are explicitly controlled:</strong> Only permitted yield strategies can receive escrowed funds.</li>
          <li><strong>Risk policies are explicit:</strong> Constraints are hard-coded into the deal configuration.</li>
          <li><strong>External protocol risk remains visible to users:</strong> SettleOne is transparent about where capital is deployed.</li>
        </List>
      </Section>
    </div>
  );
}

export function RiskModel() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Risk & Loss Model" description="Understanding the risks involved with yield-enabled settlement." />
      <Section title="DeFi Risk">
        <Paragraph>SettleOne does not eliminate DeFi risk. Potential risks include:</Paragraph>
        <List>
          <li><strong>Smart-contract risk:</strong> A vulnerability in SettleOne or an integrated protocol could cause loss.</li>
          <li><strong>Protocol risk:</strong> Aave or another integrated protocol could experience an exploit, malfunction, or unexpected behavior.</li>
          <li><strong>Market risk:</strong> Asset values or market conditions can change.</li>
          <li><strong>Liquidity risk:</strong> Capital may not always be withdrawable at the expected price or speed.</li>
          <li><strong>Oracle/data risk:</strong> Incorrect, delayed, manipulated, or unavailable data can affect monitoring.</li>
          <li><strong>Execution risk:</strong> Transactions can fail, revert, become delayed, or incur unexpected costs.</li>
          <li><strong>Network risk:</strong> Congestion, outages, reorgs, or chain-level issues can affect execution.</li>
          <li><strong>Strategy risk:</strong> A strategy can underperform or lose value.</li>
        </List>
      </Section>
      <Section title="Who bears the loss?">
        <Paragraph>This must be explicitly defined by the deployed deal's legal and protocol terms. SettleOne should never represent strategy principal as guaranteed unless an actual protection mechanism exists.</Paragraph>
        <Callout type="warning">Risk policies reduce exposure; they do not make loss impossible.</Callout>
      </Section>
    </div>
  );
}

export function FailureScenarios() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Failure Scenarios" description="How the system handles edge cases and infrastructure failures." />
      <Section title="Expected Responses">
        <Paragraph>SettleOne should explicitly handle anomalies as follows:</Paragraph>
        <Table 
          headers={["Scenario", "Expected response"]}
          rows={[
            ["Strategy healthy", "Continue monitoring"],
            ["Drawdown threshold breached", "Trigger controlled exit"],
            ["Liquidity threshold breached", "Trigger controlled exit"],
            ["Settlement buffer reached", "Exit before settlement"],
            ["Strategy transaction fails", "Retry/fail safely according to execution policy"],
            ["Graph data unavailable", "Mark data stale and avoid unsafe decisions"],
            ["AI unavailable", "Deterministic risk engine continues"],
            ["Backend unavailable", "Smart-contract state remains authoritative"],
            ["DeFi protocol incident", "Restrict/exit affected strategy where possible"],
            ["Settlement deadline approaching", "Prioritize capital availability"],
          ]}
        />
      </Section>
      <Section title="Key Architectural Property">
        <Callout type="info">The AI layer can fail without the financial control layer becoming uncontrolled.</Callout>
      </Section>
    </div>
  );
}

export function Disclosure() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Security Disclosure" description="Reporting potential security vulnerabilities." />
      <Section title="Reporting Guidelines">
        <Paragraph>If you discover a potential security vulnerability, do not publicly disclose exploit details before the issue has been assessed and addressed.</Paragraph>
        <Paragraph>Security-sensitive reports should be directed through the project's designated private security-reporting channel.</Paragraph>
      </Section>
      <Section title="Do Not Publish">
        <Paragraph>Please do not publish:</Paragraph>
        <List>
          <li>private keys</li>
          <li>credentials</li>
          <li>API secrets</li>
          <li>unpublished vulnerabilities</li>
          <li>exploit code targeting production deployments</li>
          <li>confidential infrastructure details</li>
        </List>
      </Section>
    </div>
  );
}
