import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppShell } from "./components/layout/AppShell";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

// Pages
import { MarketplacePage } from "./pages/MarketplacePage";
import { DealRoomPage } from "./pages/DealRoomPage";
import { CreateDealPage } from "./pages/CreateDealPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AuthCallback } from "./pages/AuthCallback";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
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
            <Route
              path="/inbox"
              element={<div className="p-8">Inbox (Coming soon)</div>}
            />
            <Route
              path="/settings"
              element={<div className="p-8">Settings (Coming soon)</div>}
            />
          </Route>
          <Route
            path="/unauthorized"
            element={
              <div className="min-h-screen flex items-center justify-center font-bold">
                403 | Unauthorized
              </div>
            }
          />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
