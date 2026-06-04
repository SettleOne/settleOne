import React from 'react';
import { Folder, FileText, Search, Filter, Hash, User, Clock, ChevronRight } from 'lucide-react';
import { cn } from '../../index';

interface EvidenceItem {
  id: string;
  name: string;
  type: 'folder' | 'file';
  dealId?: string;
  uploader: string;
  timestamp: string;
  hash?: string;
  status: 'verified' | 'pending' | 'rejected';
}

const mockEvidence: EvidenceItem[] = [
  { id: '1', name: 'Deal #125 Documentation', type: 'folder', uploader: 'System', timestamp: '2 days ago', status: 'verified' },
  { id: '2', name: 'Invoice_001.pdf', type: 'file', dealId: 'DEL-8F92A', uploader: 'Seller', timestamp: '5 hours ago', hash: '0x8b...2d1e', status: 'pending' },
  { id: '3', name: 'Signed_Contract.pdf', type: 'file', dealId: 'DEL-8F92A', uploader: 'System', timestamp: '2 days ago', hash: '0x1a...f9c2', status: 'verified' },
];

export const EvidenceExplorer = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Search and Filter Bar */}
      <div className="flex items-center justify-between rounded-[12px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search by hash, uploader, or deal ID..."
              className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] pl-10 pr-4 text-sm outline-none transition-all focus:border-[#111827] focus:bg-white"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-[#E5E7EB] px-4 py-2 text-sm font-medium text-[#111827] hover:bg-[#FAFAFA]">
            <Filter className="h-4 w-4" /> Filters
          </button>
        </div>
        <button className="rounded-lg bg-[#111827] px-4 py-2 text-sm font-bold text-white hover:bg-[#111827]/90">
          Upload Evidence
        </button>
      </div>

      {/* Explorer Grid */}
      <div className="rounded-[12px] border border-[#E5E7EB] bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FAFAFA] text-[#6B7280] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Name</th>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Deal / Collection</th>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Uploader</th>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Hash / Verification</th>
              <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px]">Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {mockEvidence.map((item) => (
              <tr key={item.id} className="hover:bg-[#FAFAFA] transition-colors cursor-pointer group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {item.type === 'folder' ? (
                      <Folder className="h-5 w-5 text-[#3B82F6] fill-[#3B82F6]/20" />
                    ) : (
                      <FileText className="h-5 w-5 text-[#6B7280]" />
                    )}
                    <span className="font-bold text-[#111827] group-hover:text-[#3B82F6] transition-colors">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {item.dealId ? (
                    <span className="inline-flex items-center gap-1 rounded bg-[#F3F4F6] px-2 py-1 text-xs font-medium text-[#4B5563]">
                      {item.dealId}
                    </span>
                  ) : (
                    <span className="text-[#6B7280]">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-[#9CA3AF]" />
                    <span className="text-[#4B5563]">{item.uploader}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {item.hash ? (
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4 text-[#9CA3AF]" />
                      <span className="font-mono text-xs text-[#6B7280] bg-[#F3F4F6] px-1.5 py-0.5 rounded">{item.hash}</span>
                      {item.status === 'verified' && (
                        <span className="h-2 w-2 rounded-full bg-[#10B981]" title="Verified on-chain" />
                      )}
                      {item.status === 'pending' && (
                        <span className="h-2 w-2 rounded-full bg-[#F59E0B]" title="Verification pending" />
                      )}
                    </div>
                  ) : (
                    <span className="text-[#6B7280]">-</span>
                  )}
                </td>
                <td className="px-6 py-4 text-[#6B7280] flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {item.timestamp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
