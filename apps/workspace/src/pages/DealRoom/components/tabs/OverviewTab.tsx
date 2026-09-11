import React from "react";

export function OverviewTab({ deal }: { deal: any }) {
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Deal Overview</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-muted)]">Description</h3>
          <p className="text-[var(--text-primary)] mt-1">{deal?.description || "No description provided."}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-muted)]">Deal Type</h3>
            <p className="text-[var(--text-primary)] mt-1">{deal?.dealType === "SoftDelivery" ? "Software" : "Hardware"}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-muted)]">Category</h3>
            <p className="text-[var(--text-primary)] mt-1">{deal?.category || "Uncategorized"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
