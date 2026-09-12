import {
  PageHeader,
  Section,
  Paragraph,
  List,
  Callout,
  FlowDiagram,
} from "../components/DocsUI";

export function Introduction() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Epic Hero Section with Golden Coin Background */}
      <div className="flex flex-col items-center justify-center mb-16 pt-20 pb-24 border border-white/10 relative overflow-hidden rounded-3xl bg-[#050505] shadow-2xl w-full">
        {/* Background Coin with Low Opacity, Full Width, No Transitions */}
        <div
          className="absolute inset-0 z-0 opacity-10 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: "url('/logoCoin.png')" }}
        />

        {/* Strong ambient dark overlay to ensure text visibility */}
        <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />

        <div className="relative z-10 px-6 text-center w-full">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,1)]">
            SettleOne
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-2xl font-medium mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,1)]">
            Risk-aware settlement infrastructure for capital that doesn't have
            to sit idle.
          </p>
        </div>
      </div>

      <Section title="Overview">
        <Paragraph>
          SettleOne is an intelligent settlement infrastructure platform that
          combines on-chain escrow, explicit risk policies, deterministic
          strategy evaluation, DeFi yield management, blockchain data, and
          AI-powered risk monitoring to manage eligible settlement capital while
          keeping settlement safety as the primary objective.
        </Paragraph>
        <Paragraph>
          Traditional escrow solves an important problem: capital is locked
          until contractual conditions are satisfied. However, during that
          period, capital can remain economically idle for days or weeks,
          generating no return, while participants have limited visibility into
          its status.
        </Paragraph>
        <Paragraph>
          Instead of treating escrow as capital that simply waits until
          settlement, SettleOne creates a controlled environment in which
          eligible escrow capital can be evaluated for temporary DeFi deployment
          under predefined risk and settlement constraints.
        </Paragraph>

        <Callout type="info" title="Settlement safety comes first">
          The objective is not simply to maximize APY. Yield is secondary to the
          safety and deterministic execution of the underlying transaction. If
          capital cannot be productively managed without violating settlement
          conditions, it remains idle or exits the strategy.
        </Callout>
      </Section>

      <Section title="Who SettleOne Is For">
        <Paragraph>
          SettleOne is built for MSMEs, vendors, suppliers, freelancers, service
          providers, B2B commerce, marketplaces, and any workflow where delayed
          payments or informal settlement promises create operational risk.
        </Paragraph>
        <List>
          <li>
            <strong>MSME supplier payments:</strong> Buyer locks payment before
            supplier ships or performs work.
          </li>
          <li>
            <strong>Freelance or agency work:</strong> Client commits funds
            before project delivery begins.
          </li>
          <li>
            <strong>Marketplace settlement:</strong> Platform coordinates deals
            while contracts enforce escrow rules.
          </li>
          <li>
            <strong>B2B purchase orders:</strong> Terms hash links on-chain deal
            to off-chain order and invoice.
          </li>
        </List>
      </Section>
    </div>
  );
}

export function Principles() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageHeader
        title="Core Principles"
        description="The foundational rules governing SettleOne's design."
      />
      <Section title="Design Philosophy">
        <Paragraph>
          SettleOne separates responsibilities into distinct layers. The core
          architectural rule is:{" "}
          <strong>
            AI explains. Deterministic systems evaluate. Smart contracts
            enforce.
          </strong>
        </Paragraph>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
            <h4 className="text-cyan-400 font-bold mb-2">
              1. Safety Over Yield
            </h4>
            <p className="text-sm text-slate-300">
              The system prefers a lower-yield strategy—or no strategy—when a
              higher-yield strategy introduces unacceptable settlement risk.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
            <h4 className="text-cyan-400 font-bold mb-2">
              2. Explicit Policies
            </h4>
            <p className="text-sm text-slate-300">
              Risk should never be an implicit assumption. Each eligible deal
              has strictly defined constraints.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
            <h4 className="text-cyan-400 font-bold mb-2">
              3. Deterministic Decisions
            </h4>
            <p className="text-sm text-slate-300">
              Financial execution never depends on an LLM's arbitrary output.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
            <h4 className="text-cyan-400 font-bold mb-2">4. AI as a Monitor</h4>
            <p className="text-sm text-slate-300">
              AI helps interpret risk and communicate what is happening, but
              cannot move funds.
            </p>
          </div>
        </div>

        <List>
          <li>
            <strong>Transparent accounting:</strong> Principal and yield are
            always distinguishable.
          </li>
          <li>
            <strong>Controlled strategy exposure:</strong> Only approved
            strategies are executable by the protocol.
          </li>
          <li>
            <strong>Time-aware settlement:</strong> A strategy must account for
            the settlement deadline and required liquidity buffer.
          </li>
        </List>
      </Section>
    </div>
  );
}

export function HowItWorks() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageHeader
        title="How It Works"
        description="The end-to-end flow of a yield-enabled deal."
      />
      <Section title="The Lifecycle">
        <Paragraph>A typical yield-enabled deal follows this path:</Paragraph>

        <FlowDiagram
          direction="horizontal"
          steps={[
            "Create Deal",
            "Fund Escrow",
            "Evaluate Strategy",
            "Deploy Capital",
            "Monitor Risk",
            "Settle Deal",
          ]}
        />

        <List ordered>
          <li>Buyer and seller create a deal</li>
          <li>Settlement terms are established</li>
          <li>Escrow receives funds</li>
          <li>Risk Policy is assigned</li>
          <li>Strategy Engine evaluates eligible strategies</li>
          <li>Approved strategy is selected</li>
          <li>Capital is deployed</li>
          <li>Position is continuously monitored</li>
          <li>Risk remains within policy</li>
          <li>Strategy exits before settlement</li>
          <li>Capital returns to settlement layer</li>
          <li>Deal settles</li>
          <li>Yield is calculated and distributed</li>
        </List>
      </Section>
    </div>
  );
}

export function PlatformDemo() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageHeader title="Platform Demo" description="See SettleOne in action." />
      <Section title="Video Walkthrough">
        <Paragraph>
          Watch the comprehensive walkthrough of the SettleOne platform, covering deal creation, risk evaluation, and settlement.
        </Paragraph>
        <div className="my-10 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black relative w-full aspect-video flex items-center justify-center">
          {/* USER: Replace the src with your actual YouTube embed link below */}
          <iframe 
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
            title="SettleOne Platform Demo" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
        </div>
      </Section>
    </div>
  );
}
