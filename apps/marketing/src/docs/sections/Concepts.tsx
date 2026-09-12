import React from "react";
import { PageHeader, Section, Paragraph, Callout, List, Table, CodeBlock } from "../components/DocsUI";

export function Roles() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Participant Roles" description="Who interacts with SettleOne and what they can do." />
      <Section title="Public-Facing Roles">
        <Paragraph>SettleOne separates actors carefully to ensure safety and transparency.</Paragraph>
        <Table 
          headers={["Participant", "What they can do", "What they cannot do"]}
          rows={[
            ["Buyer", "Fund deal, confirm delivery, dispute during window, receive refund when valid.", "Pull funds back after verified delivery and expired dispute window."],
            ["Seller", "Create deal, submit proof, receive funds after valid settlement.", "Release funds without verified delivery or dispute outcome."],
            ["Verifier", "Sign delivery approval.", "Move funds directly from the vault."],
            ["Resolver", "Record dispute decision.", "Withdraw vault funds directly."],
            ["Strategist", "Manage optional yield strategy actions.", "Override per-deal ownership or settlement rules."]
          ]}
        />
      </Section>
    </div>
  );
}

export function DealsAndEscrow() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Deals & Escrow" description="The core of SettleOne's payment commitment layer." />
      <Section title="Deals">
        <Paragraph>A Deal is the primary state machine of a SettleOne transaction. It records the buyer, seller, token, amount, verifier, dispute resolver, delivery deadline, and terms hashes.</Paragraph>
        <CodeBlock 
          code={`None\n  ↓\nCreated\n  ↓\nFundsLocked\n  ↓\nProofSubmitted\n  ↓\nDelivered\n  ↓\nSettled`} 
        />
      </Section>
      <Section title="Escrow">
        <Paragraph>The SettleOne Escrow ensures that payment is committed before work begins. Instead of typical passive escrow, SettleOne's escrow vault manages accounting shares and interacts with the Strategy Engine when DeFi yield is enabled.</Paragraph>
      </Section>
    </div>
  );
}

export function Funding() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Funding" description="Committing capital to the transaction." />
      <Section title="The Commitment">
        <Paragraph>Once a deal is created, the buyer funds the deal using native ETH or supported ERC20 tokens.</Paragraph>
        <Paragraph>After funding, the deal moves to the <strong>FundsLocked</strong> state. The seller now has verifiable on-chain confidence that the payment exists and cannot be arbitrarily withdrawn by the buyer.</Paragraph>
      </Section>
    </div>
  );
}

export function DeliveryEvidence() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Delivery & Evidence" description="Proving that contractual obligations were met." />
      <Section title="Submitting Proof">
        <Paragraph>When the seller completes the required work (e.g., shipping goods, completing software), they submit delivery proof.</Paragraph>
        <Paragraph>The protocol stores a <strong>proofHash</strong>, representing a cryptographic commitment to the off-chain evidence (such as tracking numbers, documents, or logs). The actual documents may live in a backend database, IPFS, Arweave, or S3. The contract only stores the hash, ensuring data integrity without bloating the blockchain.</Paragraph>
      </Section>
    </div>
  );
}

export function Verification() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Verification" description="Approving submitted evidence." />
      <Section title="The Verification Process">
        <Paragraph>Once proof is submitted, it must be verified before the deal can proceed to the dispute window.</Paragraph>
        <Paragraph>SettleOne supports multiple verification styles, such as backend/validator EIP-712 signatures, or asynchronous oracle requests (like Chainlink). If the verifier approves the proof, the deal moves to the <strong>Delivered</strong> state.</Paragraph>
      </Section>
    </div>
  );
}

export function Disputes() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader title="Disputes" description="Handling disagreements on delivery quality." />
      <Section title="The Dispute Window">
        <Paragraph>After delivery is verified, the buyer enters a specific dispute window. During this time, they can confirm the delivery (triggering settlement) or raise a dispute if the delivery was flawed.</Paragraph>
      </Section>
      <Section title="Resolution">
        <Paragraph>If a dispute is raised, the designated <strong>Resolver</strong> evaluates the evidence. The resolver can decide to award the funds entirely to the buyer, entirely to the seller, or split them between the two parties.</Paragraph>
      </Section>
    </div>
  );
}
