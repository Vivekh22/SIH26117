import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Boxes, ListFilter, Cpu, PlayCircle } from "lucide-react";
import { useState } from "react";
import { Panel, PanelHeader, PageHeader, StatusPill } from "@/components/primitives";
import { useAppStore } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/model-router")({
  head: () => ({
    meta: [
      { title: "Model Router — teamMESSIER-87 AI Workbench" },
      {
        name: "description",
        content:
          "Intelligent routing of tasks to the best local model based on capability, VRAM and latency.",
      },
      { property: "og:title", content: "Intelligent Model Router" },
      {
        property: "og:description",
        content: "Task classification and local model selection with zero external inference.",
      },
    ],
  }),
  component: ModelRouterPage,
});

const SAMPLES = [
  { task: "Summarise the PSV testing procedure", model: "Qwen3-8B" },
  { task: "Read this scanned P&ID diagram", model: "Qwen3-VL-7B" },
  { task: "Write a Python script to parse shift logs", model: "Qwen3-Coder-7B" },
  { task: "Reconcile conflicting tolerances across 3 manuals", model: "DeepSeek-R1-Distill-7B" },
];

const FLOW = [
  { label: "Task", icon: ListFilter },
  { label: "Classifier", icon: Cpu },
  { label: "Best Local Model", icon: Boxes },
  { label: "Execution", icon: PlayCircle },
];

function ModelRouterPage() {
  const { models } = useAppStore();
  const [selected, setSelected] = useState<string | null>(null);
  const routed = SAMPLES.find((s) => s.task === selected)?.model;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Intelligent Model Router"
        description="Tasks are classified locally and routed to the most capable on-premise model."
      />

      <Panel>
        <PanelHeader title="Routing Path" />
        <div className="flex flex-wrap items-center gap-3 px-5 py-6">
          {FLOW.map((f, i) => (
            <div key={f.label} className="flex items-center gap-3">
              <div className="flex min-w-[150px] flex-col items-center gap-2 rounded-xl border border-border bg-card px-5 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-soft text-primary">
                  <f.icon className="h-5 w-5" />
                </span>
                <span className="text-[11px] font-semibold">{f.label}</span>
                {f.label === "Best Local Model" && routed && (
                  <span className="text-[10px] font-semibold text-primary">{routed}</span>
                )}
              </div>
              {i < FLOW.length - 1 && <ArrowRight className="h-4 w-4 text-primary/60" />}
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {models.map((m) => {
            const highlighted = routed === m.name;
            return (
              <Panel
                key={m.id}
                className={cn(
                  "px-4 py-4 transition-colors",
                  highlighted && "border-primary bg-success-soft/50",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-soft text-primary">
                      <Boxes className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-sm font-semibold">{m.name}</div>
                      <div className="text-[12px] text-muted-foreground">{m.task}</div>
                    </div>
                  </div>
                  <StatusPill tone={highlighted || m.status === "active" ? "success" : "idle"}>
                    {highlighted ? "Routed" : m.status === "active" ? "Active" : "Idle"}
                  </StatusPill>
                </div>

                <dl className="mt-4 grid grid-cols-4 gap-2 border-t border-border pt-3 text-[11px]">
                  {[
                    ["VRAM", m.vram],
                    ["Quant", m.quantization],
                    ["Latency", m.latency],
                    ["Context", m.context],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="font-semibold">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Current load</span>
                    <span className="font-semibold">{highlighted ? 62 : m.load}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-1.5 rounded-full bg-primary transition-all"
                      style={{ width: `${highlighted ? 62 : m.load}%` }}
                    />
                  </div>
                </div>
              </Panel>
            );
          })}
        </div>

        <Panel>
          <PanelHeader title="Routing Example" />
          <div className="space-y-2 px-4 py-4">
            {SAMPLES.map((s) => (
              <button
                key={s.task}
                onClick={() => setSelected(s.task)}
                className={cn(
                  "w-full rounded-lg border px-3 py-2.5 text-left text-[12px] transition-colors",
                  selected === s.task
                    ? "border-primary bg-success-soft"
                    : "border-border hover:bg-muted/50",
                )}
              >
                <span className="block font-medium">{s.task}</span>
                <span className="mt-0.5 block text-[11px] text-muted-foreground">→ {s.model}</span>
              </button>
            ))}
            <p className="pt-2 text-[11px] text-muted-foreground">
              Select a task to highlight the model the classifier would pick.
            </p>
          </div>
        </Panel>
      </div>
    </div>
  );
}
