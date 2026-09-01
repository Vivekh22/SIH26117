import { createFileRoute } from "@tanstack/react-router";
import {
  FileText,
  Layers,
  Binary,
  Database,
  HeartPulse,
  Search,
  ArrowRight,
  ScanText,
  Scissors,
  Sparkles,
  BrainCircuit,
} from "lucide-react";
import { useState } from "react";
import { Panel, PanelHeader, PageHeader, StatCard } from "@/components/primitives";
import { searchResultsSeed } from "@/services/mockApi";
import { useAppStore } from "@/lib/app-store";

export const Route = createFileRoute("/knowledge-base")({
  head: () => ({
    meta: [
      { title: "Knowledge Base — teamMESSIER-87 AI Workbench" },
      {
        name: "description",
        content:
          "Local RAG pipeline: extraction, chunking, embeddings and semantic retrieval on ChromaDB.",
      },
      { property: "og:title", content: "Local Knowledge Base" },
      {
        property: "og:description",
        content: "Vector search across confidential documents, entirely on-premise.",
      },
    ],
  }),
  component: KnowledgeBasePage,
});

const PIPELINE = [
  { label: "Document", icon: FileText },
  { label: "Text Extraction", icon: ScanText },
  { label: "Chunking", icon: Scissors },
  { label: "Embedding", icon: Sparkles },
  { label: "Vector Database", icon: Database },
  { label: "Semantic Retrieval", icon: Search },
  { label: "LLM Context", icon: BrainCircuit },
];

function KnowledgeBasePage() {
  const { documentCount, chunkCount, openPreview } = useAppStore();
  const [q, setQ] = useState("PSV testing tolerance");
  const [results, setResults] = useState(searchResultsSeed);
  const [dept, setDept] = useState("All departments");

  return (
    <div className="space-y-4">
      <PageHeader
        title="Knowledge Base"
        description="Everything indexed here is embedded and searched locally."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <StatCard icon={FileText} value={String(documentCount)} label="Documents indexed" />
        <StatCard icon={Layers} value={chunkCount.toLocaleString()} label="Chunks" />
        <StatCard icon={Binary} value="1024-d" label="Embeddings" />
        <StatCard icon={Database} value="ChromaDB" label="Vector DB" />
        <StatCard icon={HeartPulse} value="Healthy" label="Status" />
      </div>

      <Panel>
        <PanelHeader title="Ingestion & Retrieval Pipeline" />
        <div className="flex flex-wrap items-center gap-2 px-5 py-6">
          {PIPELINE.map((p, i) => (
            <div key={p.label} className="flex items-center gap-2">
              <div className="flex min-w-[128px] flex-col items-center gap-2 rounded-xl border border-border bg-card px-4 py-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-soft text-primary">
                  <p.icon className="h-5 w-5" />
                </span>
                <span className="text-center text-[11px] font-semibold leading-tight">
                  {p.label}
                </span>
              </div>
              {i < PIPELINE.length - 1 && (
                <ArrowRight className="h-4 w-4 shrink-0 text-primary/60" />
              )}
            </div>
          ))}
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_280px]">
        <Panel>
          <PanelHeader title="Semantic Search" />
          <div className="px-4 py-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setResults([...searchResultsSeed].sort(() => Math.random() - 0.5));
              }}
              className="flex gap-2"
            >
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-border px-3">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Ask the local knowledge base…"
                  className="h-10 flex-1 bg-transparent text-sm outline-none"
                />
              </div>
              <button className="rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90">
                Search
              </button>
            </form>

            <div className="mt-4 space-y-2">
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => openPreview(r.doc)}
                  className="flex w-full items-start gap-3 rounded-lg border border-border px-4 py-3 text-left hover:bg-muted/40"
                >
                  <span className="flex h-9 w-12 shrink-0 items-center justify-center rounded-md bg-success-soft text-[11px] font-bold text-primary">
                    {r.score.toFixed(2)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-medium">
                      {r.doc} · Page {r.page}
                    </span>
                    <span className="block text-[12px] text-muted-foreground">
                      {r.snippet}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Filters" />
          <div className="space-y-4 px-4 py-4 text-sm">
            {[
              {
                label: "Department",
                value: dept,
                options: ["All departments", "Maintenance", "Operations", "HSE", "Quality"],
                onChange: setDept,
              },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-xs font-semibold">{f.label}</label>
                <select
                  value={f.value}
                  onChange={(e) => f.onChange(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                >
                  {f.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold">Document type</label>
              <select className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary">
                {["All types", "PDF", "DOCX", "XLSX", "Images", "Scanned"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold">Indexed date</label>
              <select className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary">
                {["Any time", "Last 24 hours", "Last 7 days", "Last 30 days"].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold">Document</label>
              <select className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary">
                {["All documents", ...searchResultsSeed.map((r) => r.doc)].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
