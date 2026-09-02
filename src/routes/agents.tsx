import { createFileRoute } from "@tanstack/react-router";
import {
  Bot,
  Plus,
  ArrowRight,
  UserRound,
  Brain,
  ListTree,
  Database,
  Wrench,
  ShieldCheck,
  PackageCheck,
} from "lucide-react";
import { Panel, PanelHeader, PageHeader, StatusPill } from "@/components/primitives";
import { useAppStore } from "@/lib/app-store";

export const Route = createFileRoute("/agents")({
  head: () => ({
    meta: [
      { title: "Agents — teamMESSIER-87 AI Workbench" },
      {
        name: "description",
        content: "Local agent workflows: understand, plan, retrieve, execute, verify and deliver.",
      },
      { property: "og:title", content: "Agent Workflows" },
      {
        property: "og:description",
        content: "Orchestrated on-premise agents with bound tools and knowledge sources.",
      },
    ],
  }),
  component: AgentsPage,
});

const FLOW = [
  { label: "User Request", icon: UserRound },
  { label: "Understand", icon: Brain },
  { label: "Plan", icon: ListTree },
  { label: "Retrieve", icon: Database },
  { label: "Execute Tool", icon: Wrench },
  { label: "Verify", icon: ShieldCheck },
  { label: "Deliver", icon: PackageCheck },
];

function AgentsPage() {
  const { agents } = useAppStore();

  return (
    <div className="space-y-4">
      <PageHeader
        title="Agent Workflows"
        description="Every agent runs against local models and the on-premise vector store."
        actions={
          <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" /> Create Agent
          </button>
        }
      />

      <Panel>
        <PanelHeader title="Orchestration Graph" />
        <div className="flex flex-wrap items-center gap-2 px-5 py-6">
          {FLOW.map((f, i) => (
            <div key={f.label} className="flex items-center gap-2">
              <div className="flex min-w-[128px] flex-col items-center gap-2 rounded-xl border border-border bg-card px-4 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-soft text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <span className="text-center text-[11px] font-semibold">{f.label}</span>
              </div>
              {i < FLOW.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-primary/60" />}
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {agents.map((a) => (
          <Panel key={a.id} className="px-4 py-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-soft text-primary">
                <Bot className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold">{a.name}</span>
                  <StatusPill tone={a.status === "active" ? "success" : "idle"}>
                    {a.status === "active" ? "Active" : "Idle"}
                  </StatusPill>
                </div>
                <p className="mt-0.5 text-[12px] text-muted-foreground">{a.description}</p>
              </div>
            </div>

            <div className="mt-4 space-y-1.5">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Capabilities
              </div>
              <div className="flex flex-wrap gap-1.5">
                {a.capabilities.map((c) => (
                  <span
                    key={c}
                    className="rounded-md bg-muted px-2 py-1 text-[11px] font-medium text-foreground/80"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-3 text-[11px]">
              <div>
                <dt className="text-muted-foreground">Tools</dt>
                <dd className="font-semibold">{a.tools}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Knowledge</dt>
                <dd className="truncate font-semibold">{a.knowledgeSources.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Last run</dt>
                <dd className="font-semibold">{a.lastRun}</dd>
              </div>
            </dl>
          </Panel>
        ))}
      </div>
    </div>
  );
}
