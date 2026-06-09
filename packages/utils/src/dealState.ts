import { DealState } from "@settleone/types";

const STATE_COLORS: Record<DealState, string> = {
  [DealState.None]: "#9CA3AF",
  [DealState.AwaitingFunding]: "#F59E0B",
  [DealState.PendingSellerAcceptance]: "#3B82F6",
  [DealState.Active]: "#10B981",
  [DealState.DeliverySubmitted]: "#8B5CF6",
  [DealState.AwaitingAcceptance]: "#0EA5E9",
  [DealState.Accepted]: "#14B8A6",
  [DealState.Disputed]: "#EF4444",
  [DealState.Released]: "#10B981",
  [DealState.Refunded]: "#F59E0B",
  [DealState.Settled]: "#64748B",
  [DealState.Cancelled]: "#9CA3AF",
};

const STATE_LABELS: Record<DealState, string> = {
  [DealState.None]: "None",
  [DealState.AwaitingFunding]: "Awaiting Funding",
  [DealState.PendingSellerAcceptance]: "Pending Acceptance",
  [DealState.Active]: "Active",
  [DealState.DeliverySubmitted]: "Delivery Submitted",
  [DealState.AwaitingAcceptance]: "Awaiting Acceptance",
  [DealState.Accepted]: "Accepted",
  [DealState.Disputed]: "Disputed",
  [DealState.Released]: "Released",
  [DealState.Refunded]: "Refunded",
  [DealState.Settled]: "Settled",
  [DealState.Cancelled]: "Cancelled",
};

export function getDealStateColor(state: DealState): string {
  return STATE_COLORS[state] || "#9CA3AF";
}

export function getDealStateLabel(state: DealState): string {
  return STATE_LABELS[state] || "Unknown";
}
