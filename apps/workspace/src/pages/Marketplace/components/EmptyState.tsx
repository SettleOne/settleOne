import React from "react";
import { SearchX } from "lucide-react";
import { Button } from "@settleone/design-system";

interface EmptyStateProps {
  onClearFilters?: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center border border-[var(--border)] rounded-xl bg-[var(--bg-card)] shadow-sm max-w-md w-full mx-auto mt-10">
      <div className="w-16 h-16 bg-[var(--bg-subtle)] text-[var(--text-muted)] rounded-full flex items-center justify-center mb-5">
        <SearchX size={32} />
      </div>
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
        No deals found
      </h3>
      <p className="text-sm text-[var(--text-secondary)] mb-6 leading-relaxed">
        We couldn't find any deals matching your current search or filter
        criteria. Try adjusting your filters.
      </p>
      {onClearFilters && (
        <Button variant="secondary" onClick={onClearFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  );
}
