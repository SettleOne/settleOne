import React from 'react';

export const Placeholder = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-[#111827]">{title}</h1>
      <div className="h-[400px] w-full rounded-[12px] border-2 border-dashed border-[#E5E7EB] bg-white flex items-center justify-center text-[#6B7280]">
        This is a placeholder for the {title} module.
      </div>
    </div>
  );
};
