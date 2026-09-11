import React from "react";
import { FileText, Lock, Globe, ShieldCheck } from "lucide-react";

export function EvidenceTab({ deal }: { deal: any }) {
  const formatBytes = (bytes?: string | number | bigint) => {
    if (!bytes) return "Unknown size";
    const b = Number(bytes);
    if (b < 1024) return `${b} B`;
    if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
    return `${(b / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">Evidence Room</h2>
      <p className="text-sm text-[var(--text-secondary)] mb-6">
        All encrypted files and evidence associated with this deal are stored here.
      </p>
      
      {(!deal?.files || deal.files.length === 0) ? (
        <div className="bg-[var(--bg-subtle)] border border-[var(--border)] rounded-lg p-8 text-center flex flex-col items-center">
          <FileText size={32} className="text-[var(--text-muted)] mb-3" />
          <p className="text-[var(--text-muted)] font-medium">No evidence files have been uploaded yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {deal.files.map((file: any, i: number) => (
            <div key={i} className="flex flex-col xl:flex-row justify-between items-start xl:items-center p-4 bg-[var(--bg-subtle)] border border-[var(--border)] rounded-lg gap-4">
              <div className="flex items-start gap-3 w-full xl:w-auto overflow-hidden">
                <div className="w-10 h-10 bg-[var(--bg-base)] border border-[var(--border)] rounded flex items-center justify-center shrink-0">
                  <FileText size={20} className="text-[var(--accent-blue)]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-[var(--text-primary)] truncate max-w-[200px] sm:max-w-[300px]">
                    {file.originalName || "evidence_file"}
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] flex items-center gap-2 mt-1 truncate">
                    <span>{formatBytes(file.sizeBytes)}</span>
                    <span>•</span>
                    <span className="uppercase">{file.context || "Evidence"}</span>
                    <span>•</span>
                    <span className="font-mono text-[10px]" title="Content Hash">{file.contentHash?.slice(0, 12)}...</span>
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <span className="text-xs px-2 py-1 bg-[var(--bg-base)] border border-[var(--border)] text-[var(--text-secondary)] rounded flex items-center gap-1 capitalize" title="Access Level">
                  <Lock size={12} />
                  {file.accessLevel?.replace("_", " ") || "Parties Only"}
                </span>
                
                {file.ipfsCid && (
                  <a href={`https://ipfs.io/ipfs/${file.ipfsCid}`} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] rounded flex items-center gap-1 hover:bg-[var(--accent-purple)]/20 transition-colors">
                    <Globe size={12} />
                    IPFS
                  </a>
                )}

                {file.isCommittedOnchain && (
                  <span className="text-xs px-2 py-1 bg-[var(--accent-green)]/10 text-[var(--accent-green)] rounded flex items-center gap-1" title={`Evidence ID: ${file.onChainEvidenceId}`}>
                    <ShieldCheck size={12} />
                    On-chain
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
