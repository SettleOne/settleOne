import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Placeholder } from './pages/Placeholder';
import { OperationsShell } from './components/OperationsShell';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <OperationsShell />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Placeholder title="Admin Dashboard" />,
      },
      {
        path: 'disputes',
        children: [
          {
            index: true,
            element: <Placeholder title="Dispute Queue" />,
          },
          {
            path: ':id',
            element: <Placeholder title="Dispute Review" />,
          },
        ],
      },
      {
        path: 'arbitrators',
        element: <Placeholder title="Arbitrator Management" />,
      },
      {
        path: 'vault-health',
        element: <Placeholder title="Vault Monitoring" />,
      },
      {
        path: 'users',
        element: <Placeholder title="User Administration" />,
      },
      {
        path: 'settings',
        element: <Placeholder title="Global Settings" />,
      },
    ],
  },
]);
