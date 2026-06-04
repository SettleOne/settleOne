import { useEffect, useCallback } from "react";
import { useDealStore } from "../stores/useDealStore";
import { useAuthStore } from "../stores/useAuthStore";

export function useDeals() {
  const { deals, loading, error, fetchDeals, createDeal } = useDealStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user) {
      fetchDeals();
    }
  }, [user, fetchDeals]);

  const refreshDeals = useCallback(() => {
    fetchDeals();
  }, [fetchDeals]);

  return {
    deals,
    loading,
    error,
    refreshDeals,
    createDeal,
  };
}
