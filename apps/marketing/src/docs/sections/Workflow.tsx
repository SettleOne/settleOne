import React from "react";
import { PageHeader, Section, Paragraph, Callout, CodeBlock, Table, List, ImageBlock } from "../components/DocsUI";

export function DealLifecycle() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Deal Lifecycle" description="The core state machine of a SettleOne transaction." />
      <Section title="Deal States">
        <Paragraph>
          A Deal is the primary state machine of a SettleOne transaction. It records the buyer, seller, token, amount, verifier, dispute resolver, delivery deadline, and terms hashes.
        </Paragraph>
        <CodeBlock 
          language="text"
          code={`None\n  ↓\nCreated\n  ↓\nFundsLocked\n  ↓\nProofSubmitted\n  ↓\nDelivered\n  ↓\nSettled`} 
        />
        <Paragraph>
          The SettleOne product workflow is designed around a single, comprehensive settlement lifecycle. Users do not need to manually operate every underlying DeFi transaction; the system abstracts protocol complexity while keeping the important financial state visible.
        </Paragraph>
      </Section>
    </div>
  );
}

export function EscrowFunding() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Escrow & Funding" description="Committing capital securely." />
      <Section title="The Commitment">
        <Paragraph>
          The SettleOne Escrow ensures that payment is committed before work begins. Once a deal is created, the buyer funds the deal using native ETH or supported ERC20 tokens.
        </Paragraph>
        <Paragraph>
          After funding, the deal moves to the <strong>FundsLocked</strong> state. The seller now has verifiable on-chain confidence that the payment exists and cannot be arbitrarily withdrawn by the buyer.
        </Paragraph>
      </Section>
      <Section title="Active Escrow">
        <Paragraph>
          Instead of typical passive escrow, SettleOne's escrow vault manages accounting shares and interacts with the Strategy Engine when DeFi yield is enabled. Principal and yield are transparently separated.
        </Paragraph>
        <CodeBlock 
          language="text"
          code={`Principal       $10,000.00
Generated Yield    +$32.48
──────────────────────────
Total            $10,032.48`}
        />
      </Section>
    </div>
  );
}

export function VerificationDisputes() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Verification & Disputes" description="Proving delivery and handling disagreements." />
      <Section title="Delivery & Evidence">
        <Paragraph>
          When the seller completes the required work, they submit delivery proof. The protocol stores a <strong>proofHash</strong>, representing a cryptographic commitment to the off-chain evidence (such as tracking numbers or documents). The actual documents live off-chain, ensuring data integrity without bloating the blockchain.
        </Paragraph>
      </Section>
      <Section title="Verification">
        <Paragraph>
          Once proof is submitted, it must be verified. SettleOne supports multiple verification styles, such as backend/validator EIP-712 signatures, or asynchronous oracle requests. If the verifier approves the proof, the deal moves to the <strong>Delivered</strong> state.
        </Paragraph>
      </Section>
      <Section title="Disputes">
        <Paragraph>
          After delivery is verified, the buyer enters a specific dispute window. During this time, they can confirm the delivery (triggering settlement) or raise a dispute if the delivery was flawed.
        </Paragraph>
        <Paragraph>
          If a dispute is raised, the designated <strong>Resolver</strong> evaluates the evidence. The resolver can decide to award the funds entirely to the buyer, entirely to the seller, or split them between the two parties.
        </Paragraph>
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
          The Deal Room is the operational interface for a live transaction. It makes the state of capital understandable without requiring users to understand underlying DeFi infrastructure.
        </Paragraph>
        <ImageBlock src="/images/dealRoom.png" alt="SettleOne Deal Room" />
        <Paragraph>
          Within the Deal Room, users can track the deal timeline, view the current escrow status, monitor any active yield strategies, and see real-time updates on risk parameters and AI analysis.
        </Paragraph>
        <ImageBlock src="/images/portfolio-yield.png" alt="Portfolio and Yield Tracking" />
      </Section>
    </div>
  );
}
