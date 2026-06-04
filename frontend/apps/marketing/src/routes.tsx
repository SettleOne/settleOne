import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { MarketingLayout } from './components/MarketingLayout';

const MarketingPlaceholder = ({ title }: { title: string }) => (
  <div className="flex h-[600px] items-center justify-center bg-white px-8">
    <div className="text-center">
      <h1 className="text-5xl font-bold tracking-tight text-[#111827]">{title}</h1>
      <p className="mt-6 text-xl text-[#6B7280]">Coming soon. We are building the future of B2B commerce.</p>
    </div>
  </div>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MarketingLayout />,
    children: [
      {
        index: true,
        element: (
          <div className="flex flex-col items-center justify-center bg-white py-32 px-8">
            <div className="text-center max-w-[800px]">
              <h1 className="text-7xl font-bold tracking-tight text-[#111827] leading-[1.1]">
                The Commitment Layer for Commerce.
              </h1>
              <p className="mt-8 text-2xl text-[#6B7280]">
                Trustless B2B transactions with automated escrow, proof-of-delivery, and yield-bearing vaults.
              </p>
              <div className="mt-12 flex items-center justify-center gap-6">
                <button className="rounded-[12px] bg-[#111827] px-8 py-4 text-lg font-medium text-white hover:bg-[#111827]/90 transition-all">
                  Get Started
                </button>
                <button className="rounded-[12px] border border-[#E5E7EB] px-8 py-4 text-lg font-medium text-[#111827] hover:bg-[#FAFAFA] transition-all">
                  Read Documentation
                </button>
              </div>
            </div>
          </div>
        ),
      },
      { path: 'features', element: <MarketingPlaceholder title="Features" /> },
      { path: 'pricing', element: <MarketingPlaceholder title="Pricing" /> },
      { path: 'docs', element: <MarketingPlaceholder title="Documentation" /> },
    ],
  },
]);
