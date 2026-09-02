import { createFileRoute } from "@tanstack/react-router";
import {
  Calculator,
  Search,
  ScanLine,
  FileText,
  Table,
  Repeat,
  ShieldOff,
  CheckCircle2,
  Loader2,
  Circle,
  Play,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Panel, PanelHeader, PageHeader, StatusPill } from "@/components/primitives";
import { toolsSeed } from "@/services/mockApi";
import { useAppStore } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Tools & Sandbox — teamMESSIER-87 AI Workbench" },
      {
        name: "description",
        content: "Isolated on-premise tool execution with network access permanently blocked.",
      },
      { property: "og:title", content: "Secure Tool Execution" },
      {
        property: "og:description",
        content: "Ephemeral sandboxes for calculation, OCR and reporting. No network.",
      },
    ],
  }),
  component: ToolsPage,
});

const ICONS: Record<string, LucideIcon> = {
  calculator: Calculator,
  search: Search,
  scan: ScanLine,
  "file-text": FileText,
  table: Table,
  repeat: Repeat,
};

const SANDBOX_STEPS = [
  "Python Sandbox",
  "Read File",
  "Calculate",
  "Generate Result",
  "Destroy Sandbox",
];

function ToolsPage() {
  const { addAuditLog } = useAppStore();
  const [activeTool, setActiveTool] = useState(toolsSeed[0]!.name);
  const [step, setStep] = useState(-1);
  const [running, setRunning] = useState(false);

  const run = (name: string) => {
    setActiveTool(name);
    setRunning(true);
    setStep(0);
    SANDBOX_STEPS.forEach((_, i) => setTimeout(() => setStep(i), 650 * i));
    setTimeout(() => {
      setStep(SANDBOX_STEPS.length);
      setRunning(false);
      addAuditLog({
        user: "Test Engineer",
        action: "Tool executed (sandbox)",
        model: "Qwen3-Coder-7B",
        document: "—",
        result: `${name} completed · sandbox destroyed`,
        status: "success",
        trace: SANDBOX_STEPS.map((s) => ({ step: s, detail: "Simulated locally", ms: 300 })),
      });
    }, 650 * SANDBOX_STEPS.length);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Secure Tool Execution"
        description="Tools run in ephemeral containers. Frontend simulation only — no real code is executed."
        chips={[{ label: "NETWORK ACCESS BLOCKED", icon: ShieldOff }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {toolsSeed.map((t) => {
            const Icon = ICONS[t.icon] ?? Calculator;
            return (
              <Panel key={t.id} className="flex flex-col px-4 py-4">
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <StatusPill>Available</StatusPill>
                </div>
                <div className="mt-3 text-sm font-semibold">{t.name}</div>
                <p className="mt-1 flex-1 text-[12px] text-muted-foreground">{t.description}</p>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <StatusPill tone="danger">
                    <ShieldOff className="h-3 w-3" /> Network: BLOCKED
                  </StatusPill>
                  <button
                    onClick={() => run(t.name)}
                    disabled={running}
                    className="inline-flex items-center gap-1.5 rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
                  >
                    <Play className="h-3 w-3" /> Run
                  </button>
                </div>
              </Panel>
            );
          })}
        </div>

        <Panel className="h-fit">
          <PanelHeader
            title="Sandbox Execution"
            right={
              <StatusPill tone="danger">
                <ShieldOff className="h-3 w-3" /> NETWORK ACCESS BLOCKED
              </StatusPill>
            }
          />
          <div className="px-4 py-4">
            <div className="mb-3 rounded-lg bg-muted/50 px-3 py-2 text-[12px]">
              Tool: <span className="font-semibold">{activeTool}</span>
            </div>
            {SANDBOX_STEPS.map((s, i) => {
              const state = step > i ? "done" : step === i ? "running" : "pending";
              return (
                <div key={s} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    {state === "done" ? (
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    ) : state === "running" ? (
                      <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    ) : (
                      <Circle className="h-4 w-4 text-muted-foreground/40" />
                    )}
                    {i < SANDBOX_STEPS.length - 1 && (
                      <span
                        className={cn(
                          "w-px flex-1",
                          state === "done" ? "bg-primary/40" : "bg-border",
                        )}
                      />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="text-[13px] font-medium">{s}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {state === "done"
                        ? "Completed"
                        : state === "running"
                          ? "Running…"
                          : "Pending"}
                    </div>
                  </div>
                </div>
              );
            })}
            {step >= SANDBOX_STEPS.length && (
              <div className="rounded-lg bg-success-soft px-3 py-2 text-[11px] font-medium text-primary">
                Result produced locally. Container destroyed, no residue, 0 egress.
              </div>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
