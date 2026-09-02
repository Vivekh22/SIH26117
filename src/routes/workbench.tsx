import { createFileRoute } from "@tanstack/react-router";
import {
  UploadCloud,
  Play,
  ShieldCheck,
  Cpu,
  BanIcon,
  CheckCircle2,
  Loader2,
  Circle,
  Download,
  RotateCcw,
  FileText,
} from "lucide-react";
import { useRef, useState } from "react";
import { Panel, PanelHeader, PageHeader, StatusPill } from "@/components/primitives";
import { useAppStore } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/workbench")({
  head: () => ({
    meta: [
      { title: "Workbench — teamMESSIER-87 AI Workbench" },
      {
        name: "description",
        content:
          "Run secure, fully local agentic workflows over confidential industrial documents.",
      },
      { property: "og:title", content: "Secure AI Workbench" },
      {
        property: "og:description",
        content: "Air-gapped 7-step agentic pipeline with verified, cited outputs.",
      },
    ],
  }),
  component: WorkbenchPage,
});

const STEPS = ["Understand", "Plan", "Route", "Retrieve", "Execute", "Verify", "Deliver"] as const;

function WorkbenchPage() {
  const { documents, uploadDocument, openPreview, addAuditLog } = useAppStore();
  const [task, setTask] = useState(
    "Draft an approval note confirming PSV testing for valve P-204 as per MRPL standard, citing the maintenance manual.",
  );
  const [query, setQuery] = useState("PSV testing tolerance P-204");
  const [selected, setSelected] = useState<string>(documents[0]?.id ?? "");
  const [active, setActive] = useState(-1);
  const [done, setDone] = useState(false);
  const [running, setRunning] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = () => {
    setRunning(true);
    setDone(false);
    setActive(0);
    STEPS.forEach((_, i) => {
      setTimeout(() => setActive(i), 700 * i);
    });
    setTimeout(() => {
      setActive(STEPS.length);
      setRunning(false);
      setDone(true);
      addAuditLog({
        user: "Test Engineer",
        action: "Workflow executed",
        model: "Qwen3-8B",
        document: documents.find((d) => d.id === selected)?.name ?? "—",
        result: "Verified analysis generated · confidence 92%",
        status: "success",
        trace: STEPS.map((s) => ({
          step: s,
          detail: `${s} completed locally`,
          ms: 200 + Math.round(Math.random() * 1800),
        })),
      });
    }, 700 * STEPS.length);
  };

  return (
    <div className="space-y-4">
      <PageHeader
        title="Secure AI Workbench"
        description="Plan, route and execute agentic tasks entirely inside your premises."
        chips={[
          { label: "AIR-GAPPED", icon: ShieldCheck },
          { label: "LOCAL INFERENCE", icon: Cpu },
          { label: "0 DATA EGRESS", icon: BanIcon },
        ]}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Panel>
          <PanelHeader title="1 · Input" />
          <div className="space-y-4 px-4 py-4">
            <button
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                Array.from(e.dataTransfer.files).forEach((f) =>
                  uploadDocument({ name: f.name, size: f.size }),
                );
              }}
              className="flex w-full flex-col items-center gap-1.5 rounded-lg border border-dashed border-border py-6 text-center hover:border-primary hover:bg-success-soft/40"
            >
              <UploadCloud className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs font-semibold">Upload confidential document</span>
              <span className="text-[10px] text-muted-foreground">
                PDF, DOCX, XLSX, PNG up to 50MB
              </span>
            </button>
            <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) =>
                Array.from(e.target.files ?? []).forEach((f) =>
                  uploadDocument({ name: f.name, size: f.size }),
                )
              }
            />

            <div>
              <label className="text-xs font-semibold">Context documents</label>
              <div className="mt-2 max-h-52 space-y-1.5 overflow-auto">
                {documents.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelected(d.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-[12px]",
                      selected === d.id
                        ? "border-primary bg-success-soft"
                        : "border-border hover:bg-muted/50",
                    )}
                  >
                    <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="min-w-0 flex-1 truncate">{d.name}</span>
                    <span className="text-[10px] text-muted-foreground">{d.type}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold">Retrieval query</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              />
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="2 · Task" />
          <div className="space-y-4 px-4 py-4">
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              rows={11}
              className="w-full resize-none rounded-lg border border-border bg-background px-3 py-3 text-sm leading-relaxed outline-none focus:border-primary"
            />
            <button
              onClick={run}
              disabled={running}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
            >
              {running ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              {running ? "Running secure workflow…" : "Run Secure Workflow"}
            </button>
            <p className="text-[11px] text-muted-foreground">
              Execution is confined to local models and the on-premise sandbox. No prompt or
              document leaves the network.
            </p>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="3 · Execution" />
          <div className="px-4 py-4">
            {STEPS.map((s, i) => {
              const state = active > i ? "done" : active === i ? "running" : "pending";
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
                    {i < STEPS.length - 1 && (
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
                          ? "In progress…"
                          : "Pending"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      {done && (
        <Panel className="animate-fade-in">
          <PanelHeader
            title="Verified Analysis"
            right={
              <StatusPill>
                <ShieldCheck className="h-3 w-3" /> Evidence Verified
              </StatusPill>
            }
          />
          <div className="grid grid-cols-1 gap-6 px-5 py-5 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <ul className="space-y-2 text-sm">
                {[
                  "PSV-204 was tested on 28 Aug 2026 at a set pressure of 18.4 barg, within the ±3% tolerance of MRPL standard P-204.",
                  "Seat tightness verified per API 527; no measurable leakage recorded.",
                  "Isolation and re-instatement followed the hot-work permit procedure in Safety_Protocol_2024.",
                  "Valve is fit for continued service; next test due 28 Aug 2027.",
                ].map((b) => (
                  <li key={b} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground/90">{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <div className="text-xs font-semibold">Sources</div>
                <div className="mt-2 space-y-1.5">
                  {[
                    ["Maintenance_Manual_P-204.pdf", "Page 12"],
                    ["Safety_Protocol_2024.pdf", "Page 8"],
                    ["Scanned_Logbook_Unit3.pdf", "Page 77"],
                  ].map(([name, page]) => (
                    <button
                      key={name}
                      onClick={() => openPreview(name as string)}
                      className="flex w-full items-center gap-2 rounded-lg border border-border px-3 py-2 text-left text-[12px] hover:bg-muted/50"
                    >
                      <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="flex-1 truncate">{name}</span>
                      <span className="text-[11px] text-muted-foreground">{page}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-semibold">Confidence</span>
                  <span className="text-2xl font-extrabold text-primary">92%</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-muted">
                  <div className="h-2 w-[92%] rounded-full bg-primary" />
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Prototype confidence indicator
                </p>
              </div>
              <div className="flex gap-2">
                <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                  <Download className="h-3.5 w-3.5" /> Export
                </button>
                <button
                  onClick={run}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border px-3 py-2.5 text-xs font-semibold hover:bg-muted"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Run Again
                </button>
              </div>
              <div className="rounded-lg bg-success-soft px-3 py-2 text-[11px] font-medium text-primary">
                Model: Qwen3-8B · 0 external calls · execution logged to audit trail
              </div>
            </div>
          </div>
        </Panel>
      )}
    </div>
  );
}
