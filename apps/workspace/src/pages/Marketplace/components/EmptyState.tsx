import React from "react";
import { SearchX } from "lucide-react";
import { Button } from "@settleone/design-system";

interface EmptyStateProps {
  onClearFilters?: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-[var(--border)] rounded-xl bg-gray-50/50">
      <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mb-4">
        <SearchX size={32} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">No deals found</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">
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
