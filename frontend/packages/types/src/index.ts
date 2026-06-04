export enum DealState {
  Draft = 'Draft',
  AwaitingFunding = 'AwaitingFunding',
  Negotiation = 'Negotiation',
  PendingSellerAcceptance = 'PendingSellerAcceptance',
  Active = 'Active',
  DeliverySubmitted = 'DeliverySubmitted',
  AwaitingAcceptance = 'AwaitingAcceptance',
  Accepted = 'Accepted',
  Disputed = 'Disputed',
  Released = 'Released',
  Refunded = 'Refunded',
  Settled = 'Settled'
}

export enum DisputeState {
  None = 'None',
  Opened = 'Opened',
  EvidenceCollection = 'EvidenceCollection',
  UnderReview = 'UnderReview',
  Resolved = 'Resolved'
}

export enum VerificationState {
  Pending = 'Pending',
  Submitted = 'Submitted',
  Verified = 'Verified',
  Rejected = 'Rejected'
}

export enum SettlementState {
  Pending = 'Pending',
  Processing = 'Processing',
  Completed = 'Completed',
  Failed = 'Failed'
}

export enum NotificationType {
  ActionRequired = 'ActionRequired',
  StatusUpdate = 'StatusUpdate',
  DeadlineApproaching = 'DeadlineApproaching',
  PaymentReceived = 'PaymentReceived',
  DisputeAlert = 'DisputeAlert'
}

export interface Deal {
  id: string;
  contractId: string;
  title: string;
  description: string;
  buyerAddress: string;
  sellerAddress: string;
  amount: string;
  tokenSymbol: string;
  state: DealState;
  createdAt: number;
  deliveryDeadline: number;
  acceptanceWindow: number;
  disputeWindow: number;
  yieldGenerated: string;
}
