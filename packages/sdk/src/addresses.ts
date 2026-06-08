import { sepolia, arbitrumSepolia } from 'wagmi/chains';

export const CONTRACT_ADDRESSES = {
  [sepolia.id]: {
    DealManager: '0xF484ebC73232B3620c542F000f080F24A21D3b60' as const,
    DeliveryManager: '0x0C6A7e506A69Af5E29eB34A446CB4dC3650e720e' as const,
    EvidenceManager: '0x00a284bFB64886a58581f786eABDA50522e8FeC3' as const,
    DisputeManager: '0x25B8469d2cdF9Fe64CB76B348f2aaB92a8522817' as const,
    Settlement: '0x011B737Ed97940387EC5F2b8c59B2A73d3c6e33a' as const,
    EscrowVault: '0x9FF68f9892298B4f64236d8c2De8352FD9116b04' as const,
    AutomationHandler: '0xa8ce4B57c717BAe8FD4F8C3Ef5f93709Ed399c65' as const,
    SimpleResolver: '0x5b0cCbbF6d2e8623F1223e52315D56173b2758C6' as const,
    ChainlinkVerifier: '0x92d66749CeC9056d183128995FDb095da29d6C93' as const,
    DeliveryVerifier: '0x6CFe64FeF7EF4196b6464b1D4D4AeCFd3c4dde89' as const,
    SettleOneToken: '0x3522aBB5186a58b1806a87e84cC2E74E9F1042C2' as const,
  },
  [arbitrumSepolia.id]: {
    DealManager: '0xe352C24Dac19E25Db39605c990cA109720d0A425' as const,
    DeliveryManager: '0x5d21594702EF24EC2e917DAb5ecC4F9F2C489b40' as const,
    EvidenceManager: '0x9E3f9daC55064c2930A0034F36FEdced8F5C2860' as const,
    DisputeManager: '0x5C2EfC4a951707E31bE1F2973C5d488F8c16757d' as const,
    Settlement: '0x6590229031AA52E162A2f62e9C7ba0BA4EFe7a25' as const,
    EscrowVault: '0xF090E3d100D4947eEAe08FC9c773b4851374080e' as const,
    AutomationHandler: '0x566f01C8BFC601064354390ABAb390Dbe7B5F6d7' as const,
    SimpleResolver: '0xF01099b14089D51ef61D6703c06879518664eCd6' as const,
    ChainlinkVerifier: '0x2F9e5592A7cf2A2FE4e52de41F29ab24345F4b28' as const,
    DeliveryVerifier: '0x240685ad42805Ae94AE7169F2D7e320aF6AAC618' as const,
    SettleOneToken: '0xEC8cEC0d6F360AdF11AbF033A87203280b9deDB1' as const,
  },
} as const;

export type SupportedChainId = keyof typeof CONTRACT_ADDRESSES;
export type ContractName = keyof (typeof CONTRACT_ADDRESSES)[SupportedChainId];

export function getContractAddress(chainId: number, contract: ContractName): `0x${string}` {
  const addresses = CONTRACT_ADDRESSES[chainId as SupportedChainId];
  if (!addresses) throw new Error(`Unsupported chain: ${chainId}`);
  return addresses[contract] as `0x${string}`;
}
