import { createFileRoute } from "@tanstack/react-router";
import { Upload, Lock, Loader2, CheckCircle2, ScanLine } from "lucide-react";
import { useRef, useState } from "react";
import { Panel, PageHeader, StatusPill } from "@/components/primitives";
import { useAppStore } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Documents — teamMESSIER-87 AI Workbench" },
      {
        name: "description",
        content:
          "Confidential document library with local OCR, indexing status and on-premise preview.",
      },
      { property: "og:title", content: "Confidential Documents" },
      {
        property: "og:description",
        content: "All documents remain inside the organization. Indexed locally.",
      },
    ],
  }),
  component: DocumentsPage,
});

const FILTERS = ["All", "PDF", "Images", "DOCX", "XLSX", "Scanned"] as const;

export function statusMeta(status: string) {
  switch (status) {
    case "indexed":
      return { label: "Indexed", tone: "success" as const, icon: CheckCircle2 };
    case "ocr":
      return { label: "OCR", tone: "warning" as const, icon: ScanLine };
    case "processing":
      return { label: "Processing", tone: "warning" as const, icon: Loader2 };
    default:
      return { label: "Uploading", tone: "idle" as const, icon: Loader2 };
  }
}

function DocumentsPage() {
  const { documents, uploadDocument, openPreview } = useAppStore();
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const inputRef = useRef<HTMLInputElement>(null);

  const visible = documents.filter((d) => {
    if (filter === "All") return true;
    if (filter === "Images") return d.type === "PNG";
    if (filter === "Scanned") return d.type === "SCANNED";
    return d.type === filter;
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Confidential Documents"
        description="Every file is stored, OCR'd and embedded on-premise."
        actions={
          <>
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
            <button
              onClick={() => inputRef.current?.click()}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Upload className="h-4 w-4" /> Upload Document
            </button>
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors",
              filter === f
                ? "border-primary bg-success-soft text-primary"
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium text-primary">
          <Lock className="h-3.5 w-3.5" /> All documents remain inside the organization
        </span>
      </div>

      <Panel className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-[11px] uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Document</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Pages</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Indexed</th>
              <th className="px-4 py-3 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {visible.map((d) => {
              const meta = statusMeta(d.status);
              return (
                <tr
                  key={d.id}
                  onClick={() => openPreview(d)}
                  className="cursor-pointer hover:bg-muted/40"
                >
                  <td className="px-4 py-3">
                    <div className="text-[13px] font-medium">{d.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {d.size} · {d.department}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{d.type}</td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{d.pages}</td>
                  <td className="px-4 py-3">
                    <StatusPill tone={meta.tone}>
                      <meta.icon
                        className={cn("h-3 w-3", d.status === "processing" && "animate-spin")}
                      />
                      {meta.label}
                    </StatusPill>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">
                    {d.indexed ? "Yes" : "—"}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">
                    {d.uploadedAt}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
