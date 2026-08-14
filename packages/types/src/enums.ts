export enum DealState {
  None = 0,
  Draft = 1,
  AwaitingFunding = 2,
  PendingSellerAcceptance = 3,
  Active = 4,
  DeliverySubmitted = 5,
  AwaitingAcceptance = 6,
  Accepted = 7,
  Disputed = 8,
  Released = 9,
  Refunded = 10,
  Settled = 11,
  Cancelled = 12,
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
  Unknown = 0,
  Image = 1,
  Video = 2,
  PDF = 3,
  Invoice = 4,
  DeliveryReceipt = 5,
  SourceCode = 6,
  ExternalLink = 7,
  TrackingInfo = 8,
  InspectionReport = 9,
  ChatTranscript = 10,
  Email = 11,
  Other = 12,
}

export enum UserRole {
  NormalUser = "user",
  Admin = "admin",
  Arbitrator = "arbitrator",
  VaultManager = "vault_manager",
  Upgrader = "upgrader",
  Verifier = "verifier",
}

export enum VerificationState {
  None = 0,
  Pending = 1,
  Approved = 2,
  Rejected = 3,
}

export enum AutomationAction {
  None = 0,
  ExpireSellerAcceptance = 1,
  FinalizeDelivery = 2,
  AutoAcceptDelivery = 3,
  ReleaseSeller = 4,
  RefundBuyer = 5,
}
