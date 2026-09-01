import { createFileRoute } from "@tanstack/react-router";
import {
  BanIcon,
  WifiOff,
  Boxes,
  ScrollText,
  Container,
  Database,
  ArrowRight,
  X,
  Cloud,
} from "lucide-react";
import { Panel, PanelHeader, PageHeader, StatCard } from "@/components/primitives";

export const Route = createFileRoute("/security")({
  head: () => ({
    meta: [
      { title: "Security — teamMESSIER-87 AI Workbench" },
      {
        name: "description",
        content:
          "Air-gap posture, egress enforcement and the on-premise architecture boundary.",
      },
      { property: "og:title", content: "System Security" },
      {
        property: "og:description",
        content: "Zero data egress architecture with sandboxed tools and immutable audit.",
      },
    ],
  }),
  component: SecurityPage,
});

const CHAIN = [
  "Documents",
  "Processing",
  "RAG / Vector DB",
  "Agent Orchestrator",
  "Model Router",
  "Reasoning · Vision · Coding models",
  "Tool Sandbox",
  "Verification",
  "Output + Audit Log",
];

function SecurityPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="System Security"
        description="The workbench is physically and logically isolated from public networks."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-6">
        <StatCard icon={BanIcon} value="0 bytes" label="Data Egress" />
        <StatCard icon={WifiOff} value="Air-Gapped" label="Network" />
        <StatCard icon={Boxes} value="4" label="Local Models" />
        <StatCard icon={ScrollText} value="Enabled" label="Audit Logging" />
        <StatCard icon={Container} value="Isolated" label="Sandbox" />
        <StatCard icon={Database} value="Enabled" label="RAG" />
      </div>

      <Panel>
        <PanelHeader title="Deployment Architecture" />
        <div className="grid grid-cols-1 gap-6 px-5 py-6 lg:grid-cols-[1fr_260px]">
          <div className="rounded-xl border-2 border-primary/40 bg-success-soft/30 p-5">
            <div className="mb-4 text-[11px] font-bold tracking-widest text-primary">
              ORGANIZATION PREMISES
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {CHAIN.map((c, i) => (
                <div key={c} className="flex items-center gap-2">
                  <div className="rounded-lg border border-border bg-card px-3 py-2.5 text-center text-[11px] font-semibold">
                    {c}
                  </div>
                  {i < CHAIN.length - 1 && (
                    <ArrowRight className="h-4 w-4 shrink-0 text-primary/60" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-[11px] text-muted-foreground">
              All compute, storage and inference stay within this boundary.
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-[color:var(--danger)]">
              <span className="h-px w-8 bg-[color:var(--danger)]" />
              <X className="h-4 w-4" /> BLOCKED
              <span className="h-px w-8 bg-[color:var(--danger)]" />
            </div>
            <div className="w-full rounded-xl border-2 border-dashed border-[color:var(--danger)]/50 bg-danger-soft/50 px-4 py-6 text-center">
              <Cloud className="mx-auto h-6 w-6 text-[color:var(--danger)]" />
              <div className="mt-2 text-[11px] font-bold tracking-widest text-[color:var(--danger)]">
                PUBLIC CLOUD / EXTERNAL AI
              </div>
              <div className="mt-1 text-[11px] text-muted-foreground">
                Unreachable · every attempt is denied and logged
              </div>
            </div>
          </div>
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {[
          {
            title: "Egress enforcement",
            body: "Firewall rule EG-01 denies all outbound traffic. Attempts are recorded as blocked audit events.",
          },
          {
            title: "Sandbox isolation",
            body: "Tools execute in ephemeral containers with no network namespace and a read-only mount.",
          },
          {
            title: "Immutable audit",
            body: "Append-only trail of prompts, retrievals, model routing, verification and outputs.",
          },
        ].map((c) => (
          <Panel key={c.title} className="px-4 py-4">
            <div className="text-sm font-semibold">{c.title}</div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
              {c.body}
            </p>
          </Panel>
        ))}
      </div>
    </div>
  );
}
