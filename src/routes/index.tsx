import { createFileRoute, Link } from "@tanstack/react-router";
import {
  FileText,
  Bot,
  Boxes,
  Network,
  ShieldCheck,
  ArrowRight,
  UploadCloud,
  Info,
  CheckCircle2,
  Download,
  FileCheck2,
  ListChecks,
  Cpu,
  BanIcon,
  MoreVertical,
  Lock,
} from "lucide-react";
import { useRef } from "react";
import { Panel, PanelHeader, StatCard, StatusPill, Dot } from "@/components/primitives";
import { TrafficChart, TrafficLegend } from "@/components/TrafficChart";
import { useAppStore } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — teamMESSIER-87 AI Workbench" },
      {
        name: "description",
        content:
          "Dashboard for the sovereign on-premise agentic AI workbench: documents, agents, local models and air-gap status.",
      },
      { property: "og:title", content: "teamMESSIER-87 AI Workbench" },
      {
        property: "og:description",
        content: "Sovereign on-premise agentic AI workbench. 100% local. Zero data egress.",
      },
    ],
  }),
  component: HomePage,
});

const typeColor: Record<string, string> = {
  PDF: "bg-danger-soft text-[color:var(--danger)]",
  DOCX: "bg-secondary text-[color:var(--info)]",
  XLSX: "bg-success-soft text-primary",
  PNG: "bg-warning-soft text-[color:var(--warning)]",
  SCANNED: "bg-muted text-muted-foreground",
};

function HomePage() {
  const { documents, documentCount, agents, models, uploadDocument, openPreview } = useAppStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((f) => uploadDocument({ name: f.name, size: f.size }));
  };

  return (
    <div className="space-y-4">
      {/* Hero row */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.55fr_1fr]">
        <Panel className="relative overflow-hidden px-8 py-7">
          <div className="relative z-10 max-w-xl">
            <p className="text-sm font-medium text-muted-foreground">Welcome back,</p>
            <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-primary">
              teamMESSIER-87
            </h1>
            <p className="mt-2 text-base font-semibold">
              Sovereign On-Premise Agentic AI Workbench
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Your secure, intelligent workspace for industrial AI operations.
              <br />
              100% local. Zero data egress. Maximum sovereignty.
            </p>

            <div className="mt-5 flex flex-wrap items-stretch gap-4">
              <Link
                to="/workbench"
                className="inline-flex h-12 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Go to Workbench <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFiles(e.dataTransfer.files);
                }}
                className="flex items-center gap-3 rounded-lg border border-dashed border-border px-4 py-2.5 text-left transition-colors hover:border-primary hover:bg-success-soft/40"
              >
                <UploadCloud className="h-6 w-6 text-muted-foreground" />
                <span className="text-xs leading-relaxed">
                  <span className="block font-semibold">Drag &amp; drop documents here</span>
                  <span className="block text-muted-foreground">or click to browse files</span>
                  <span className="block text-[10px] text-muted-foreground">
                    PDF, DOCX, XLSX, PNG up to 50MB
                  </span>
                </span>
              </button>
              <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>
          </div>

          <ShieldGraphic />
        </Panel>

        <Panel className="flex flex-col px-5 py-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              Live Network Traffic (External)
              <Info className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <StatusPill>
              <ShieldCheck className="h-3 w-3" /> Network Blocked
            </StatusPill>
          </div>
          <div className="mt-3 flex items-start justify-between">
            <div>
              <div className="text-3xl font-extrabold tracking-tight">0 KB/s</div>
              <div className="mt-2 text-xs font-semibold">External Traffic</div>
              <div className="text-xs text-muted-foreground">Zero egress enforced</div>
            </div>
            <TrafficLegend />
          </div>
          <TrafficChart height={120} />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-3 text-[11px] text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> All outbound connections blocked
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Air-gapped &amp; Verified
            </span>
          </div>
        </Panel>
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard icon={FileText} value={String(documentCount)} label="Documents" />
        <StatCard icon={Bot} value="6" label="AI Agents" />
        <StatCard icon={Boxes} value="4" label="Models Available" />
        <StatCard icon={Network} value="Qwen3-8B" label="Active Model" />
        <StatCard icon={ShieldCheck} value="100%" label="Secure" />
      </div>

      {/* Panel row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        <Panel>
          <PanelHeader title="Recent Documents" viewAllTo="/documents" />
          <div className="divide-y divide-border">
            {documents.slice(0, 4).map((d) => (
              <button
                key={d.id}
                onClick={() => openPreview(d)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-muted/50"
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[9px] font-bold",
                    typeColor[d.type],
                  )}
                >
                  {d.type.slice(0, 4)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium">{d.name}</span>
                  <span className="block text-[11px] text-muted-foreground">
                    Uploaded {d.uploadedAt} · {d.type} · {d.size}
                  </span>
                </span>
                <MoreVertical className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Active Agents" viewAllTo="/agents" />
          <div className="divide-y divide-border">
            {agents.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-success-soft text-primary">
                  <Bot className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium">{a.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{a.description}</div>
                </div>
                <StatusPill tone={a.status === "active" ? "success" : "idle"}>
                  {a.status === "active" ? "Active" : "Idle"}
                </StatusPill>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Model Router Status" viewAllTo="/model-router" />
          <div className="divide-y divide-border">
            {models.map((m) => (
              <div key={m.id} className="flex items-center gap-3 px-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-muted text-foreground/70">
                  <Boxes className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium">{m.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{m.task}</div>
                </div>
                <div className="flex items-center gap-1.5">
                  {m.usedNow && <StatusPill tone="idle">Used now</StatusPill>}
                  <StatusPill tone={m.status === "active" ? "success" : "idle"}>
                    {m.status === "active" ? "Active" : "Idle"}
                  </StatusPill>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="System Health" />
          <div className="flex items-center gap-4 px-4 py-4">
            <HealthRing />
            <div className="flex-1 space-y-2">
              {[
                "Local Models",
                "Vector Database",
                "Sandbox Environment",
                "Audit System",
                "Agent Orchestrator",
              ].map((s) => (
                <div key={s} className="flex items-center gap-2 text-[12px]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  <span className="flex-1 font-medium">{s}</span>
                  <span className="text-[11px] font-semibold text-primary">Operational</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        <Panel className="px-4 py-4">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-semibold">Network Activity (Real-time)</h3>
            <div className="text-right">
              <div className="text-lg font-bold">0 KB/s</div>
              <div className="text-[10px] text-muted-foreground">Current</div>
            </div>
          </div>
          <TrafficChart height={130} />
          <div className="mt-2">
            <TrafficLegend />
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Recent Task Progress" viewAllTo="/audit-logs" />
          <div className="px-4 py-4">
            {[
              ["Ingest Document", "2m ago"],
              ["Plan & Analyze", "5m ago"],
              ["Route to Model (Qwen3-8B)", "8m ago"],
              ["Execute & Verify", "12m ago"],
            ].map(([label, time], i, arr) => (
              <div key={label} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {i < arr.length - 1 && <span className="w-px flex-1 bg-primary/30" />}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium">{label}</span>
                    <span className="text-[11px] text-muted-foreground">{time}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground">Completed</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Latest Output" viewAllTo="/workbench" />
          <div className="space-y-3 px-4 py-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary text-[9px] font-bold text-[color:var(--info)]">
                DOCX
              </span>
              <div className="min-w-0">
                <div className="truncate text-[13px] font-medium">
                  Approval_Note_PSV_Testing.docx
                </div>
                <div className="text-[11px] text-muted-foreground">Generated 2m ago · 56 KB</div>
              </div>
            </div>
            <p className="text-[11px] leading-relaxed text-muted-foreground">
              This is to certify that PSV testing has been carried out as per MRPL standard P-204.
              All parameters are within the acceptable range and the valve is fit for operation…
            </p>
            <button className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90">
              <Download className="h-3.5 w-3.5" /> Download
            </button>
            <div className="space-y-1.5 border-t border-border pt-3 text-[11px]">
              <div className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span className="font-semibold">Confidence: 92%</span>
              </div>
              <button
                onClick={() => openPreview("Maintenance_Manual_P-204.pdf")}
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Source:
                Maintenance_Manual_P-204.pdf (Page 12)
              </button>
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Evidence & Traceability" viewAllTo="/audit-logs" />
          <div className="space-y-3 px-4 py-4">
            {[
              {
                icon: FileCheck2,
                title: "Source Documents (3)",
                detail: "Maintenance_Manual_P-204.pdf (Page 12)",
              },
              {
                icon: ListChecks,
                title: "Verification Steps (4)",
                detail: "Parameter check, Cross-verify, Rule validation, Final review",
              },
              { icon: Cpu, title: "Model Used", detail: "Qwen3-8B (Reasoning)" },
              { icon: BanIcon, title: "No External Calls", detail: "Confirmed · 0 egress" },
            ].map((e) => (
              <div key={e.title} className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-success-soft text-primary">
                  <e.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold">{e.title}</div>
                  <div className="truncate text-[11px] text-muted-foreground">{e.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function ShieldGraphic() {
  return (
    <div className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 xl:block">
      <div className="relative flex h-56 w-64 items-center justify-center">
        <span className="absolute h-52 w-52 rounded-full border border-primary/10" />
        <span className="absolute h-40 w-40 rounded-full border border-primary/15" />
        <span className="absolute h-28 w-28 rounded-full border border-primary/20" />
        <span className="absolute inset-0 grid-dots opacity-25" />
        <span className="relative flex h-28 w-24 items-center justify-center rounded-[28%] bg-primary text-primary-foreground shadow-lg">
          <Lock className="h-9 w-9" />
        </span>
      </div>
    </div>
  );
}

function HealthRing() {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="var(--muted)" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={`${c} ${c}`}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-lg font-extrabold text-primary">100%</div>
        <div className="text-[10px] text-muted-foreground">Healthy</div>
      </div>
    </div>
  );
}
