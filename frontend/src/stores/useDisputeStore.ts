import { create } from "zustand";
import { apiClient } from "../api/apiClient";

export interface Dispute {
  id: string;
  dealId: string;
  reason: string;
  description: string;
  status: "open" | "resolved" | "cancelled";
  evidence: any[];
  raisedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface DisputeState {
  disputes: Dispute[];
  loading: boolean;
  error: string | null;
  fetchDisputes: () => Promise<void>;
  raiseDispute: (disputeData: any) => Promise<Dispute>;
}

export const useDisputeStore = create<DisputeState>((set) => ({
  disputes: [],
  loading: false,
  error: null,

  fetchDisputes: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.get("/disputes");
      set({ disputes: data.data, loading: false });
    } catch (err: any) {
      set({ error: err.message, loading: false });
    }
  },

  raiseDispute: async (disputeData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await apiClient.post("/disputes", disputeData);
      set((state) => ({ 
        disputes: [data.data, ...state.disputes],
        loading: false 
      }));
      return data.data;
    } catch (err: any) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },
}));
