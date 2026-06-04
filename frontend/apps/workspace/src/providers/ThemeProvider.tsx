import React from 'react';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111827] antialiased">
      {children}
    </div>
  );
};
