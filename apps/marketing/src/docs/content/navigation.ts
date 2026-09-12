import { DocSection } from "./types";
import { Zap, Layers, Cpu, Globe, Code, Shield, Book } from "lucide-react";

export const docsNavigation: DocSection[] = [
  {
    id: "overview",
    title: "Overview",
    icon: Zap,
    pages: [
      { id: "introduction", title: "Introduction" },
      { id: "principles", title: "Core Principles" },
      { id: "how-it-works", title: "How It Works" },
    ],
  },
  {
    id: "workflow",
    title: "Workflow",
    icon: Layers,
    pages: [
      { id: "deal-lifecycle", title: "Deal Lifecycle" },
      { id: "escrow-funding", title: "Escrow & Funding" },
      { id: "verification", title: "Verification & Disputes" },
      { id: "deal-room", title: "Deal Room" },
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    icon: Cpu,
    pages: [
      { id: "architecture", title: "System Architecture" },
      { id: "risk-engine", title: "Risk Engine" },
      { id: "ai-monitor", title: "AI Monitor" },
      { id: "yield-layer", title: "DeFi Yield Layer" },
    ],
  },
  {
    id: "deployments",
    title: "Protocol",
    icon: Globe,
    pages: [
      { id: "contract-addresses", title: "Contract Addresses" },
      { id: "security", title: "Security Model" },
    ],
  },
  {
    id: "developer",
    title: "Developer",
    icon: Code,
    pages: [
      { id: "api-reference", title: "API Reference" },
      { id: "sdk-reference", title: "SDK Reference" },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    icon: Book,
    pages: [
      { id: "license", title: "License" },
    ],
  },
];
