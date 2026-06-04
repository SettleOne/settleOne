import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../index';

interface InviteMethodCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  isSelected?: boolean;
  onClick: () => void;
  badge?: string;
}

export const InviteMethodCard = ({
  icon: Icon,
  title,
  description,
  isSelected,
  onClick,
  badge
}: InviteMethodCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-4 rounded-xl border p-6 text-left transition-all relative overflow-hidden",
        isSelected 
          ? "border-[#111827] bg-[#111827] text-white shadow-lg ring-2 ring-[#111827]/10" 
          : "border-[#E5E7EB] bg-white text-[#111827] hover:border-[#111827] hover:shadow-md"
      )}
    >
      {badge && (
        <span className={cn(
          "absolute top-0 right-0 px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-bl-lg",
          isSelected ? "bg-white/10 text-white" : "bg-[#111827] text-white"
        )}>
          {badge}
        </span>
      )}
      <div className={cn(
        "rounded-lg p-2.5",
        isSelected ? "bg-white/10" : "bg-[#FAFAFA]"
      )}>
        <Icon className={cn("h-6 w-6", isSelected ? "text-white" : "text-[#111827]")} />
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-bold text-base">{title}</span>
        <p className={cn(
          "text-xs leading-relaxed",
          isSelected ? "text-white/70" : "text-[#6B7280]"
        )}>
          {description}
        </p>
      </div>
    </button>
  );
};
