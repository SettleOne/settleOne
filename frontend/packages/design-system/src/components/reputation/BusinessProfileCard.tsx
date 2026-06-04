import React from 'react';
import { ShieldCheck, MapPin, Building, Globe } from 'lucide-react';
import { cn } from '../../index';

interface BusinessProfileCardProps {
  name: string;
  role: string;
  verified: boolean;
  location: string;
  website: string;
  description: string;
  industry: string;
}

export const BusinessProfileCard = ({
  name,
  role,
  verified,
  location,
  website,
  description,
  industry
}: BusinessProfileCardProps) => {
  return (
    <div className="flex flex-col gap-6 rounded-[12px] border border-[#E5E7EB] bg-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="h-16 w-16 rounded-xl bg-[#111827] flex items-center justify-center text-white font-bold text-2xl shrink-0">
          {name.charAt(0)}
        </div>
        <div className="flex flex-col gap-1 flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-[#111827]">{name}</h2>
            {verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#3B82F6]/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[#3B82F6] border border-[#3B82F6]/20">
                <ShieldCheck className="h-3 w-3" /> KYB Verified
              </span>
            )}
          </div>
          <span className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">{role} • {industry}</span>
          
          <div className="mt-2 flex flex-wrap gap-4 text-xs font-medium text-[#6B7280]">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {location}
            </span>
            <a href="#" className="flex items-center gap-1 hover:text-[#3B82F6] transition-colors">
              <Globe className="h-3.5 w-3.5" /> {website}
            </a>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-[#E5E7EB]">
        <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-2 flex items-center gap-1">
          <Building className="h-4 w-4 text-[#6B7280]" /> About the Business
        </h3>
        <p className="text-sm text-[#374151] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
