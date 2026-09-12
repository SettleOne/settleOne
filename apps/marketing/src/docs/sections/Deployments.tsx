import {
  PageHeader,
  Section,
  Paragraph,
  ContractCard,
  Callout,
  List,
} from "../components/DocsUI";

export function ContractAddresses() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader
        title="Contract Addresses"
        description="Publicly verifiable SettleOne protocol deployments."
      />

      <Callout type="info">
        Only verified deployment addresses should be published. The addresses
        listed below are the official SettleOne deployments.
      </Callout>

      <Section title="Sepolia">
        <ContractCard
          name="DealManager"
          network="Sepolia"
          address="0xF484ebC73232B3620c542F000f080F24A21D3b60"
          purpose="Orchestrates deal lifecycle and manages interactions between other core contracts."
          explorerUrl="https://sepolia.etherscan.io/address/0xF484ebC73232B3620c542F000f080F24A21D3b60"
        />
        <ContractCard
          name="EscrowVault"
          network="Sepolia"
          address="0x9FF68f9892298B4f64236d8c2De8352FD9116b04"
          purpose="Holds and accounts for escrowed assets securely."
          explorerUrl="https://sepolia.etherscan.io/address/0x9FF68f9892298B4f64236d8c2De8352FD9116b04"
        />
        <ContractCard
          name="Settlement"
          network="Sepolia"
          address="0x011B737Ed97940387EC5F2b8c59B2A73d3c6e33a"
          purpose="Executes final release, refund, or split distributions."
          explorerUrl="https://sepolia.etherscan.io/address/0x011B737Ed97940387EC5F2b8c59B2A73d3c6e33a"
        />
        <ContractCard
          name="DeliveryManager"
          network="Sepolia"
          address="0x0C6A7e506A69Af5E29eB34A446CB4dC3650e720e"
          purpose="Manages delivery state and verification orchestration."
          explorerUrl="https://sepolia.etherscan.io/address/0x0C6A7e506A69Af5E29eB34A446CB4dC3650e720e"
        />
        <ContractCard
          name="EvidenceManager"
          network="Sepolia"
          address="0x00a284bFB64886a58581f786eABDA50522e8FeC3"
          purpose="Handles cryptographic commitments for evidence."
          explorerUrl="https://sepolia.etherscan.io/address/0x00a284bFB64886a58581f786eABDA50522e8FeC3"
        />
        <ContractCard
          name="DisputeManager"
          network="Sepolia"
          address="0x25B8469d2cdF9Fe64CB76B348f2aaB92a8522817"
          purpose="Manages disputes between buyer and seller."
          explorerUrl="https://sepolia.etherscan.io/address/0x25B8469d2cdF9Fe64CB76B348f2aaB92a8522817"
        />
        <ContractCard
          name="SettleOneToken"
          network="Sepolia"
          address="0x3522aBB5186a58b1806a87e84cC2E74E9F1042C2"
          purpose="Native ERC20 token for SettleOne."
          explorerUrl="https://sepolia.etherscan.io/address/0x3522aBB5186a58b1806a87e84cC2E74E9F1042C2"
        />
      </Section>

      <Section title="Arbitrum Sepolia">
        <ContractCard
          name="DealManager"
          network="Arbitrum Sepolia"
          address="0xe352C24Dac19E25Db39605c990cA109720d0A425"
          purpose="Orchestrates deal lifecycle and manages interactions between other core contracts."
          explorerUrl="https://sepolia.arbiscan.io/address/0xe352C24Dac19E25Db39605c990cA109720d0A425"
        />
        <ContractCard
          name="EscrowVault"
          network="Arbitrum Sepolia"
          address="0xF090E3d100D4947eEAe08FC9c773b4851374080e"
          purpose="Holds and accounts for escrowed assets securely."
          explorerUrl="https://sepolia.arbiscan.io/address/0xF090E3d100D4947eEAe08FC9c773b4851374080e"
        />
        <ContractCard
          name="Settlement"
          network="Arbitrum Sepolia"
          address="0x6590229031AA52E162A2f62e9C7ba0BA4EFe7a25"
          purpose="Executes final release, refund, or split distributions."
          explorerUrl="https://sepolia.arbiscan.io/address/0x6590229031AA52E162A2f62e9C7ba0BA4EFe7a25"
        />
        <ContractCard
          name="DeliveryManager"
          network="Arbitrum Sepolia"
          address="0x5d21594702EF24EC2e917DAb5ecC4F9F2C489b40"
          purpose="Manages delivery state and verification orchestration."
          explorerUrl="https://sepolia.arbiscan.io/address/0x5d21594702EF24EC2e917DAb5ecC4F9F2C489b40"
        />
        <ContractCard
          name="EvidenceManager"
          network="Arbitrum Sepolia"
          address="0x9E3f9daC55064c2930A0034F36FEdced8F5C2860"
          purpose="Handles cryptographic commitments for evidence."
          explorerUrl="https://sepolia.arbiscan.io/address/0x9E3f9daC55064c2930A0034F36FEdced8F5C2860"
        />
        <ContractCard
          name="DisputeManager"
          network="Arbitrum Sepolia"
          address="0x5C2EfC4a951707E31bE1F2973C5d488F8c16757d"
          purpose="Manages disputes between buyer and seller."
          explorerUrl="https://sepolia.arbiscan.io/address/0x5C2EfC4a951707E31bE1F2973C5d488F8c16757d"
        />
        <ContractCard
          name="SettleOneToken"
          network="Arbitrum Sepolia"
          address="0xEC8cEC0d6F360AdF11AbF033A87203280b9deDB1"
          purpose="Native ERC20 token for SettleOne."
          explorerUrl="https://sepolia.arbiscan.io/address/0xEC8cEC0d6F360AdF11AbF033A87203280b9deDB1"
        />
      </Section>
    </div>
  );
}

export function SecurityModel() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader
        title="Security Model"
        description="Defense-in-depth architecture and risk awareness."
      />
      <Section title="Multi-Layered Security">
        <Paragraph>
          SettleOne utilizes a defense-in-depth security approach. Smart
          contracts enforce critical financial constraints, ensuring that
          backend services do not replace on-chain security.
        </Paragraph>
        <List>
          <li>
            <strong>Strategy interactions are explicitly controlled:</strong>{" "}
            Only permitted yield strategies can receive escrowed funds.
          </li>
          <li>
            <strong>Risk policies are explicit:</strong> Constraints are
            hard-coded into the deal configuration.
          </li>
          <li>
            <strong>External protocol risk remains visible:</strong> SettleOne
            provides transparency regarding where and how capital is deployed.
          </li>
        </List>
      </Section>
      <Section title="Risk Model">
        <Paragraph>
          SettleOne does not eliminate DeFi risk. Participants should be aware
          of potential risks, including smart-contract risk, underlying protocol
          risk (e.g. Aave), market risk, and liquidity constraints.
        </Paragraph>
        <Callout type="warning" title="No Guarantees">
          Risk policies reduce exposure; they do not make loss impossible.
          SettleOne does not guarantee principal preservation or yield unless an
          explicit protection mechanism exists in the deal's terms.
        </Callout>
      </Section>
    </div>
  );
}
