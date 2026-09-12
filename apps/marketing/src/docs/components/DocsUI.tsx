import type { ReactNode } from "react";
import { Fragment } from "react";
import {
  Info,
  AlertTriangle,
  ExternalLink,
  CheckCircle,
  ArrowDown,
  ArrowRight,
} from "lucide-react";

export function PageHeader({
  title,
  description,
  image,
}: {
  title: string;
  description?: string;
  image?: string;
}) {
  return (
    <div className="mb-12 pb-8 border-b border-white/10">
      {image && (
        <div className="mb-8 rounded-xl overflow-hidden border border-white/10 bg-slate-50 p-6 flex items-center justify-center">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-contain max-h-[160px]"
          />
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4 leading-tight">
        {title}
      </h1>
      {description && (
        <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
          {description}
        </p>
      )}
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-white mb-6 tracking-tight flex items-center gap-3">
        {title}
      </h2>
      <div className="text-slate-300 space-y-5 leading-relaxed text-base">
        {children}
      </div>
    </section>
  );
}

export function SubSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-10 mt-8">
      <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
      <div className="text-slate-300 space-y-4 leading-relaxed">{children}</div>
    </div>
  );
}

export function Paragraph({ children }: { children: ReactNode }) {
  return <p className="leading-7">{children}</p>;
}

export function List({
  children,
  ordered = false,
}: {
  children: ReactNode;
  ordered?: boolean;
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag
      className={`${ordered ? "list-decimal" : "list-disc"} pl-6 space-y-3 mb-6 marker:text-cyan-500`}
    >
      {children}
    </Tag>
  );
}

export function Callout({
  title,
  children,
  type = "info",
}: {
  title?: string;
  children: ReactNode;
  type?: "info" | "warning" | "success";
}) {
  const styles = {
    info: "bg-blue-950/40 border-blue-900/50 text-blue-200",
    warning: "bg-amber-950/40 border-amber-900/50 text-amber-200",
    success: "bg-emerald-950/40 border-emerald-900/50 text-emerald-200",
  };

  const icons = {
    info: <Info className="text-blue-400 mt-1 shrink-0" size={20} />,
    warning: (
      <AlertTriangle className="text-amber-400 mt-1 shrink-0" size={20} />
    ),
    success: (
      <CheckCircle className="text-emerald-400 mt-1 shrink-0" size={20} />
    ),
  };

  return (
    <div
      className={`p-5 rounded-xl flex gap-4 my-8 backdrop-blur-sm shadow-lg ${styles[type]}`}
    >
      {icons[type]}
      <div>
        {title && <h4 className="font-semibold text-white mb-1.5">{title}</h4>}
        <div className="text-sm opacity-90 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export function CodeBlock({
  code,
  language = "text",
}: {
  code: string;
  language?: string;
}) {
  return (
    <div className="my-8 rounded-xl overflow-hidden bg-[#0c0c0c] shadow-2xl">
      <div className="bg-[#1a1a1a] px-4 py-2 text-xs font-mono text-slate-500 flex justify-between items-center border-b border-white/5">
        <span className="uppercase tracking-wider">{language}</span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
        </div>
      </div>
      <pre className="p-5 overflow-x-auto text-sm font-mono text-cyan-50/90 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function Table({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto my-8 rounded-xl bg-[#111] shadow-xl">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {headers.map((h, i) => (
              <th key={i} className="px-5 py-4 font-semibold text-slate-200">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-white/5 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-4 text-slate-300 align-top">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ContractCard({
  name,
  network,
  address,
  purpose,
  explorerUrl,
}: {
  name: string;
  network: string;
  address: string;
  purpose: string;
  explorerUrl: string;
}) {
  return (
    <div className="rounded-xl p-6 mb-5 bg-[#111] hover:bg-[#151515] transition-all duration-300 shadow-xl group border-l-2 border-cyan-900/50 hover:border-cyan-500">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
              {name}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/5 text-slate-300">
              {network}
            </span>
          </div>
          <p className="text-sm text-slate-400">{purpose}</p>
        </div>
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/30 hover:bg-cyan-900/40 px-4 py-2 rounded-lg transition-all"
        >
          Explorer <ExternalLink size={14} />
        </a>
      </div>
      <div className="bg-black/50 rounded-lg p-4 font-mono text-sm text-slate-300 break-all selection:bg-cyan-500/30">
        {address}
      </div>
    </div>
  );
}

export function ImageBlock({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <div className="my-12 flex flex-col items-center">
      <div className="relative w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden bg-black/20">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain border-none"
        />
      </div>
      {caption && (
        <p className="text-center text-sm text-slate-500 mt-4 font-medium">
          {caption}
        </p>
      )}
    </div>
  );
}

export function FlowDiagram({
  steps,
  direction = "vertical",
}: {
  steps: string[];
  direction?: "vertical" | "horizontal";
}) {
  if (direction === "horizontal") {
    return (
      <div className="my-8 bg-[#0a0a0a]/50 backdrop-blur-xl rounded-xl p-8 shadow-2xl flex flex-wrap items-center justify-center gap-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-transparent pointer-events-none" />
        {steps.map((step, idx) => (
          <Fragment key={idx}>
            <div className="bg-[#151515] border-none rounded-lg px-6 py-3 text-cyan-400 font-semibold text-sm text-center shadow-lg min-w-[140px] z-10 transition-colors hover:bg-[#1a1a1a] ring-1 ring-cyan-900/30">
              {step}
            </div>
            {idx < steps.length - 1 && (
              <ArrowRight className="text-cyan-800 shrink-0 z-10" size={24} />
            )}
          </Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="my-8 bg-[#0a0a0a]/50 backdrop-blur-xl rounded-xl p-8 shadow-2xl flex flex-col items-center justify-center gap-4 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 to-transparent pointer-events-none" />
      {steps.map((step, idx) => (
        <Fragment key={idx}>
          <div className="bg-[#151515] border-none rounded-lg px-8 py-3 text-cyan-400 font-semibold text-sm text-center shadow-lg w-full max-w-xs z-10 transition-colors hover:bg-[#1a1a1a] ring-1 ring-cyan-900/30">
            {step}
          </div>
          {idx < steps.length - 1 && (
            <ArrowDown className="text-cyan-800 shrink-0 z-10" size={24} />
          )}
        </Fragment>
      ))}
    </div>
  );
}
