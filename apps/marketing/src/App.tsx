import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { DocsPage } from "./pages/DocsPage";

// Auth + other pages are now modal-overlays rendered inside LandingPage.
// Standalone routes for direct URL access still exist:
import { PricingPage } from "./pages/PricingPage";
import { FeaturesPage } from "./pages/FeaturesPage";

// Google OAuth callback — receives token from backend and redirects to correct app
import { GoogleCallbackPage } from "./pages/GoogleCallbackPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/docs/:slug" element={<DocsPage />} />

          {/* Landing page sections reachable via direct URL — render landing with hash */}
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/pricing" element={<PricingPage />} />

          {/* Auth pages — render landing page which handles login/signup as modal overlay */}
          <Route path="/login" element={<LandingPage />} />
          <Route path="/signup" element={<LandingPage />} />
          <Route path="/forgot-password" element={<LandingPage />} />
          <Route path="/verify-otp" element={<LandingPage />} />

          {/* Google OAuth callback — backend redirects here after Google auth */}
          <Route path="/auth/callback" element={<GoogleCallbackPage />} />

          {/* Fallback */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
