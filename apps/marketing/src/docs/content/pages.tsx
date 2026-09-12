import type { FC } from "react";

import * as Overview from "../sections/Overview";
import * as Workflow from "../sections/Workflow";
import * as Infrastructure from "../sections/Infrastructure";
import * as Deployments from "../sections/Deployments";
import * as Developer from "../sections/Developer";
import * as Resources from "../sections/Resources";

const pageRegistry: Record<string, FC> = {
  // Overview
  introduction: Overview.Introduction,
  principles: Overview.Principles,
  "how-it-works": Overview.HowItWorks,
  "demo": Overview.PlatformDemo,

  // Workflow
  "deal-lifecycle": Workflow.DealLifecycle,
  "escrow-funding": Workflow.EscrowFunding,
  verification: Workflow.VerificationDisputes,
  "deal-room": Workflow.DealRoom,

  // Infrastructure
  architecture: Infrastructure.Architecture,
  "risk-engine": Infrastructure.RiskEngine,
  "ai-monitor": Infrastructure.AIMonitor,
  "yield-layer": Infrastructure.YieldLayer,

  // Deployments (Protocol)
  "contract-addresses": Deployments.ContractAddresses,
  security: Deployments.SecurityModel,

  // Developer
  "api-reference": Developer.ApiReference,
  "sdk-reference": Developer.SdkReference,

  // Resources
  license: Resources.License,
};

export function PageContent({ pageId }: { pageId: string }) {
  const Component = pageRegistry[pageId];

  if (!Component) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500">
        <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
        <p>The documentation page "{pageId}" could not be found.</p>
      </div>
    );
  }

  return <Component />;
}
