import { DealState, DealType } from "./enums";

export interface DealInput {
  buyer: `0x${string}`;
  seller: `0x${string}`;
  token: `0x${string}`;
  amount: bigint;
  deliveryDeadline: bigint;
  disputeWindow: bigint;
  acceptanceWindow: bigint;
  sellerAcceptanceWindowSecs: bigint;
  dealType: DealType;
  partialSettlementAllowed: boolean;
  termsHash: `0x${string}`;
  metadataHash: `0x${string}`;
  evidenceRequirementsHash: `0x${string}`;
  settlementRulesHash: `0x${string}`;
  verifier: `0x${string}`;
  disputeResolver: `0x${string}`;
}

export interface Deal {
  buyer: `0x${string}`;
  seller: `0x${string}`;
  token: `0x${string}`;
  verifier: `0x${string}`;
  disputeResolver: `0x${string}`;
  amount: bigint;
  depositedFunds: bigint;
  fundingStage: number;
  createdAt: bigint;
  sellerAcceptanceDeadline: bigint;
  sellerAcceptedAt: bigint;
  fundedAt: bigint;
  deliverySubmittedAt: bigint;
  deliveryVerifiedAt: bigint;
  acceptedAt: bigint;
  finalizedAt: bigint;
  deliveryDeadline: bigint;
  acceptanceWindowEndsAt: bigint;
  disputeWindowEndsAt: bigint;
  acceptanceWindow: bigint;
  disputeWindow: bigint;
  sellerAcceptanceWindowSecs: bigint;
  dealType: DealType;
  state: DealState;
  partialSettlementAllowed: boolean;
  termsHash: `0x${string}`;
  metadataHash: `0x${string}`;
  evidenceRequirementsHash: `0x${string}`;
  settlementRulesHash: `0x${string}`;
  proofHash: `0x${string}`;
}

export interface VaultPosition {
  token: `0x${string}`;
  principal: bigint;
  shares: bigint;
  funded: boolean;
}

export interface SettlementPayout {
  sellerAmount: bigint;
  buyerAmount: bigint;
  treasuryAmount: bigint;
  yieldAmount: bigint;
}

export interface Evidence {
  dealId: bigint;
  submitter: `0x${string}`;
  role: number;
  evidenceType: number;
  contentHash: `0x${string}`;
  cid: string;
  submittedAt: bigint;
}

export interface Dispute {
  dealId: bigint;
  buyer: `0x${string}`;
  seller: `0x${string}`;
  token: `0x${string}`;
  resolver: `0x${string}`;
  amount: bigint;
  openedAt: bigint;
  resolvedAt: bigint;
  outcome: number;
  active: boolean;
  reasonHash: `0x${string}`;
  evidenceHash: `0x${string}`;
  resolutionHash: `0x${string}`;
  proofHash: `0x${string}`;
  termsHash: `0x${string}`;
  sellerAward: bigint;
  buyerAward: bigint;
}

export interface Delivery {
  dealId: bigint;
  seller: `0x${string}`;
  proofHash: `0x${string}`;
  cid: string;
  revision: number;
  submittedAt: bigint;
  status: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  walletAddress?: `0x${string}`;
  avatarUrl?: string;
  organization?: string;
  location?: string;
  timezone?: string;
  phone?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  dealId: string;
  senderId: string;
  senderAddress: `0x${string}`;
  content: string;
  attachmentUrl?: string;
  attachmentName?: string;
  createdAt: string;
  read: boolean;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  dealId?: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}
