import React from "react";
import { PageHeader, Section, Paragraph, Callout, List } from "../components/DocsUI";

export function TechStack() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Technology Stack" description="The core technologies powering SettleOne." />
      <Section title="Frontend">
        <List>
          <li>React & TypeScript</li>
          <li>Tailwind CSS & shadcn/ui</li>
          <li>wagmi, RainbowKit, & viem</li>
        </List>
      </Section>
      <Section title="Backend & Infrastructure">
        <List>
          <li>Node.js, TypeScript, Fastify, Zod</li>
          <li>PostgreSQL</li>
          <li>Redis, BullMQ, Socket.IO / WebSockets</li>
        </List>
      </Section>
      <Section title="Blockchain & DeFi">
        <List>
          <li>Solidity & Foundry</li>
          <li>EVM-compatible blockchains</li>
          <li>Aave & Strategy abstractions</li>
        </List>
      </Section>
      <Section title="Data & Automation">
        <List>
          <li>The Graph</li>
          <li>Deterministic risk checks & Background workers</li>
          <li>Chainlink where technically appropriate</li>
        </List>
      </Section>
      <Section title="AI">
        <List>
          <li>LLM-based risk interpretation</li>
          <li>Structured risk inputs & anomaly analysis</li>
          <li>Human-readable explanations</li>
        </List>
      </Section>
    </div>
  );
}

export function Infrastructure() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Data & Infrastructure" description="How data moves through the SettleOne system." />
      <Section title="Background Processing">
        <Paragraph>Asynchronous tasks are handled efficiently by background workers:</Paragraph>
        <List>
          <li>Position monitoring & risk checks</li>
          <li>Settlement deadline checks</li>
          <li>Graph synchronization & yield snapshots</li>
          <li>AI analysis & notifications</li>
        </List>
      </Section>
      <Section title="Real-Time Updates">
        <Paragraph>WebSockets provide live updates for yield changes, position state, risk status, settlement countdown, alerts, and transaction status.</Paragraph>
        <Callout type="info">Real-time infrastructure improves the user experience but does not become the source of truth for financial state.</Callout>
      </Section>
    </div>
  );
}

export function ApiReference() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="API Reference" description="Detailed API documentation will be published here." />
      <Section title="Coming Soon">
        <Paragraph>SettleOne's public APIs are currently in development. This section will eventually include comprehensive endpoints for programmatic interaction with the SettleOne infrastructure.</Paragraph>
      </Section>
    </div>
  );
}

export function SdkReference() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="SDK Reference" description="Detailed SDK documentation will be published here." />
      <Section title="Coming Soon">
        <Paragraph>The official SettleOne SDK is under active development. Once released, developers will be able to easily integrate SettleOne's deal creation, escrow, and settlement capabilities natively within their own applications.</Paragraph>
      </Section>
    </div>
  );
}
