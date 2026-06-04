import { create } from "zustand";
import { apiClient } from "../api/apiClient";

export interface Deal {
  id: string;
  onchainDealId?: string;
  title: string;
  description?: string;
  amountWei: string;
  amountFormatted: string;
  buyerWallet: string;
  sellerWallet: string;
  status: string;
  deliveryDeadline: string;
  disputeWindow: string;
  createdAt: string;
  updatedAt: string;
  metadata?: any;
}

interface DealState {
  deals: Deal[];
  activeDeal: Deal | null;
  loading: boolean;
  error: string | null;
  fetchDeals: (filters?: any) => Promise<void>;
  fetchDealById: (id: string) => Promise<void>;
  setActiveDeal: (deal: Deal | null) => void;
  createDeal: (dealData: any) => Promise<Deal>;
}

export const useDealStore = create<DealState>((set) => ({
  deals: [],
  activeDeal: null,
  loading: false,
  error: null,

  fetchDeals: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get("/deals", { params: filters });
      set({ deals: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  fetchDealById: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get(`/deals/${id}`);
      set({ activeDeal: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  setActiveDeal: (deal) => set({ activeDeal: deal }),

  createDeal: async (dealData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post("/deals", dealData);
      set((state) => ({
        deals: [data.data, ...state.deals],
        loading: false,
      }));
      return data.data;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));
