import React, { ReactNode, useState } from "react";

interface TabsProps {
  tabs: { id: string; label: string; content: ReactNode }[];
  defaultTabId?: string;
  onChange?: (id: string) => void;
}

export function Tabs({ tabs, defaultTabId, onChange }: TabsProps) {
  const [activeId, setActiveId] = useState(
    defaultTabId || (tabs && tabs.length > 0 ? tabs[0]?.id : ""),
  );

  const handleTabClick = (id: string) => {
    setActiveId(id);
    if (onChange) {
      onChange(id);
    }
  };

  return (
    <div className="w-full">
      <div className="flex border-b border-[var(--border)] overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              activeId === tab.id
                ? "border-[var(--accent-blue)] text-[var(--accent-blue)]"
                : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-4">
        {tabs.find((tab) => tab.id === activeId)?.content}
      </div>
    </div>
  );
}
