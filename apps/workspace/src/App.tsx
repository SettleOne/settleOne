import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppShell } from './components/layout/AppShell';

// Pages
import { MarketplacePage } from './pages/MarketplacePage';
import { DealRoomPage } from './pages/DealRoomPage';
import { CreateDealPage } from './pages/CreateDealPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { ProfilePage } from './pages/ProfilePage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Navigate to="/marketplace" replace />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/:id" element={<DealRoomPage />} />
          <Route path="/create-deal" element={<CreateDealPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/inbox" element={<div className="p-8">Inbox (Coming soon)</div>} />
          <Route path="/settings" element={<div className="p-8">Settings (Coming soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
