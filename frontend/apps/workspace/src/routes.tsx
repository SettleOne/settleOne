import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Placeholder } from './pages/Placeholder';
import { WorkspaceShell } from './components/WorkspaceShell';
import { DealRoom } from './pages/DealRoom';

import { EvidenceCenter } from './pages/EvidenceCenter';

import { DisputeWorkspace } from './pages/DisputeWorkspace';

import { VaultIntelligence } from './pages/VaultIntelligence';

import { CounterpartyDirectory } from './pages/CounterpartyDirectory';

import { Inbox } from './pages/Inbox';
import { InvitationWorkspace } from './pages/InvitationWorkspace';
import { JoinDeal } from './pages/JoinDeal';
import { Marketplace } from './pages/Marketplace';
import { SellerDashboard } from './pages/SellerDashboard';
import { NegotiationRoom } from './pages/NegotiationRoom';

export const router = createBrowserRouter([
  {
    path: '/join/:id',
    element: <JoinDeal />,
  },
  {
    path: '/',
    element: <WorkspaceShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/inbox" replace />,
      },
      {
        path: 'inbox',
        element: <Inbox />,
      },
      {
        path: 'marketplace',
        element: <Marketplace />,
      },
      {
        path: 'seller',
        element: <SellerDashboard />,
      },
      {
        path: 'negotiate/:id',
        element: <NegotiationRoom />,
      },
      {
        path: 'invitations',
        element: <InvitationWorkspace />,
      },
      {
        path: 'dashboard',
        element: <Placeholder title="Dashboard" />,
      },
      {
        path: 'network',
        element: <CounterpartyDirectory />,
      },
      {
        path: 'deals',
        children: [
          {
            index: true,
            element: <Placeholder title="Deals List" />,
          },
          {
            path: 'create',
            element: <Placeholder title="Create Deal" />,
          },
          {
            path: ':id',
            element: <DealRoom />,
          },
        ],
      },
      {
        path: 'vault',
        element: <VaultIntelligence />,
      },
      {
        path: 'evidence',
        element: <EvidenceCenter />,
      },
      {
        path: 'disputes',
        element: <DisputeWorkspace />,
      },
      {
        path: 'analytics',
        element: <Placeholder title="Analytics" />,
      },
      {
        path: 'settings',
        element: <Placeholder title="Settings" />,
      },
    ],
  },
]);




