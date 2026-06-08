import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mocking an AppShell for operations
function OperationsShell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-base)]">
      <nav className="bg-white border-b border-[var(--border)] px-6 py-4 flex items-center gap-8">
        <div className="font-bold text-xl text-gray-900">SettleOne Ops</div>
        <div className="flex gap-4 text-sm font-medium">
          <a href="/dashboard" className="text-gray-600 hover:text-gray-900">Dashboard</a>
          <a href="/vault" className="text-gray-600 hover:text-gray-900">Vault Manager</a>
          <a href="/disputes" className="text-gray-600 hover:text-gray-900">Disputes</a>
          <a href="/protocol" className="text-gray-600 hover:text-gray-900">Protocol Config</a>
        </div>
      </nav>
      <main>
        {children || <React.Fragment />}
      </main>
    </div>
  );
}

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { VaultPage } from './pages/VaultPage';
import { DisputesPage } from './pages/DisputesPage';
import { ProtocolPage } from './pages/ProtocolPage';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <OperationsShell>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/vault" element={<VaultPage />} />
            <Route path="/disputes" element={<DisputesPage />} />
            <Route path="/protocol" element={<ProtocolPage />} />
          </Routes>
        </OperationsShell>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
