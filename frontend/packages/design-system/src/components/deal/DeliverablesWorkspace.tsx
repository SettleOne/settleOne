import React from 'react';
import { FileText, Download, CheckCircle, Clock, History } from 'lucide-react';

export const DeliverablesWorkspace = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-[#111827] uppercase tracking-wider">Deliverables</h3>
        <div className="flex items-center gap-2">
          <button className="text-xs font-bold text-[#6B7280] uppercase tracking-widest hover:text-[#111827] flex items-center gap-1">
            <History className="h-3 w-3" /> Version History
          </button>
          <button className="text-sm font-bold text-[#111827] hover:underline">Upload New</button>
        </div>
      </div>
      
      <div className="rounded-[12px] border border-[#E5E7EB] bg-white overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FAFAFA] text-[#6B7280] border-b border-[#E5E7EB]">
            <tr>
              <th className="px-4 py-3 font-bold uppercase tracking-widest text-[10px]">Version</th>
              <th className="px-4 py-3 font-bold uppercase tracking-widest text-[10px]">File Name</th>
              <th className="px-4 py-3 font-bold uppercase tracking-widest text-[10px]">Uploaded</th>
              <th className="px-4 py-3 font-bold uppercase tracking-widest text-[10px]">Status</th>
              <th className="px-4 py-3 font-bold uppercase tracking-widest text-[10px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            <tr className="bg-[#10B981]/5">
              <td className="px-4 py-3 font-bold text-[#111827]">V2 (Latest)</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#111827]" />
                  <span className="font-bold text-[#111827]">final_designs_v2_updated.zip</span>
                </div>
              </td>
              <td className="px-4 py-3 text-[#6B7280] font-medium">Today, 10:45 AM</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/10 px-2.5 py-1 text-xs font-bold text-[#10B981] border border-[#10B981]/20">
                  <CheckCircle className="h-3 w-3" /> Verified
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button className="rounded-md p-1.5 text-[#6B7280] hover:bg-white hover:text-[#111827] transition-colors">
                  <Download className="h-4 w-4" />
                </button>
              </td>
            </tr>
            <tr className="opacity-60">
              <td className="px-4 py-3 font-medium text-[#6B7280]">V1</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#6B7280]" />
                  <span className="font-medium text-[#6B7280]">initial_draft.zip</span>
                </div>
              </td>
              <td className="px-4 py-3 text-[#6B7280] font-medium">Nov 12, 4:20 PM</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#6B7280]/10 px-2.5 py-1 text-xs font-bold text-[#6B7280] border border-[#6B7280]/20">
                  Superseded
                </span>
              </td>
              <td className="px-4 py-3 text-right">
                <button className="text-[#6B7280] hover:text-[#111827]">
                  <Download className="h-4 w-4 inline" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
