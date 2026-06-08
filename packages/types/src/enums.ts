export enum DealState {
  None = 0,
  AwaitingFunding = 1,
  PendingSellerAcceptance = 2,
  Active = 3,
  DeliverySubmitted = 4,
  AwaitingAcceptance = 5,
  Accepted = 6,
  Disputed = 7,
  Released = 8,
  Refunded = 9,
  Settled = 10,
  Cancelled = 11,
}

export enum DisputeOutcome {
  None = 0,
  SellerWins = 1,
  BuyerWins = 2,
  Split = 3,
}

export enum DealType {
  SoftDelivery = 0,
  HardDelivery = 1,
}

export enum EvidenceRole {
  General = 0,
  DealTerms = 1,
  DeliveryProof = 2,
  BuyerDispute = 3,
  SellerDispute = 4,
  SellerResponse = 5,
  Arbitration = 6,
  Acceptance = 7,
  Rejection = 8,
}

export enum EvidenceType {
  Image = 0,
  Video = 1,
  PDF = 2,
  Invoice = 3,
  DeliveryReceipt = 4,
  SourceCode = 5,
  ExternalLink = 6,
  TrackingInfo = 7,
  InspectionReport = 8,
  ChatTranscript = 9,
  Email = 10,
  Other = 11,
}

export enum UserRole {
  NormalUser = 'user',
  Admin = 'admin',
  Arbitrator = 'arbitrator',
  VaultManager = 'vault_manager',
  Upgrader = 'upgrader',
  Verifier = 'verifier',
}

export enum VerificationState {
  None = 0,
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

export enum AutomationAction {
  None = 0,
  FinalizeDelivery = 1,
  AutoAcceptDelivery = 2,
  ReleaseSeller = 3,
  RefundBuyer = 4,
}
