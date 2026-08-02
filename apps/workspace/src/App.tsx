import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppShell } from "./components/layout/AppShell";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";

// Pages
import { MarketplacePage } from "./pages/MarketplacePage";
import { DealRoomPage } from "./pages/DealRoomPage";
import { CreateDealPage } from "./pages/CreateDealPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AuthCallback } from "./pages/AuthCallback";
import { InboxPage } from "./pages/InboxPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ActiveDealsPage } from "./pages/ActiveDealsPage";
import { CreatedDealsPage } from "./pages/CreatedDealsPage";
import { AcceptedDealsPage } from "./pages/AcceptedDealsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Auth routes (unprotected) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/auth/callback" element={<AuthCallback />} />

          {/* Protected workspace routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppShell />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Navigate to="/marketplace" replace />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/:id" element={<DealRoomPage />} />
            <Route path="/create-deal" element={<CreateDealPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/deals/active" element={<ActiveDealsPage />} />
            <Route path="/deals/created" element={<CreatedDealsPage />} />
            <Route path="/deals/accepted" element={<AcceptedDealsPage />} />
          </Route>

          <Route
            path="/unauthorized"
            element={
              <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[var(--bg-base)]">
                <div className="text-6xl font-bold text-[var(--accent-red)]">403</div>
                <p className="text-[var(--text-secondary)] text-lg">Unauthorized access</p>
                <a href="/login" className="text-[var(--accent-blue)] hover:underline font-medium">
                  Return to login
                </a>
              </div>
            }
          />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-[var(--bg-base)]">
                <div className="text-6xl font-bold gradient-text">404</div>
                <p className="text-[var(--text-secondary)] text-lg">Page not found</p>
                <a href="/marketplace" className="text-[var(--accent-blue)] hover:underline font-medium">
                  Go to Marketplace
                </a>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
