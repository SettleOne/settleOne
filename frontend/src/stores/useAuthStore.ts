import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'BUYER' | 'SELLER' | 'BOTH' | 'admin' | 'arbitrator';

interface User {
  id: string;
  walletAddress: string;
  name?: string;
  businessName?: string;
  role: UserRole;
  email?: string;
  reputationScore: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),
    }),
    {
      name: 'settleone-auth-storage',
    }
  )
)
