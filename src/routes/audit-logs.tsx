import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ShieldOff, AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Panel, PageHeader, StatusPill } from "@/components/primitives";
import { useAppStore } from "@/lib/app-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/audit-logs")({
  head: () => ({
    meta: [
      { title: "Audit Logs — teamMESSIER-87 AI Workbench" },
      {
        name: "description",
        content:
          "Immutable, on-premise audit trail of every workflow, model call and blocked egress attempt.",
      },
      { property: "og:title", content: "Audit & Traceability" },
      {
        property: "og:description",
        content: "Full workflow traces with blocked external requests highlighted.",
      },
    ],
  }),
  component: AuditPage,
});

function AuditPage() {
  const { auditLogs } = useAppStore();
  const [open, setOpen] = useState<string | null>(null);
  const [status, setStatus] = useState("All statuses");
  const [user, setUser] = useState("All users");

  const rows = auditLogs.filter(
    (l) =>
      (status === "All statuses" || l.status === status.toLowerCase()) &&
      (user === "All users" || l.user === user),
  );

  return (
    <div className="space-y-4">
      <PageHeader
        title="Audit & Traceability"
        description="Every action is recorded locally and cannot be altered."
      />

      <div className="flex flex-wrap gap-2">
        {[
          {
            value: user,
            set: setUser,
            options: ["All users", "Test Engineer", "Admin", "System"],
          },
          {
            value: status,
            set: setStatus,
            options: ["All statuses", "Success", "Blocked", "Warning"],
          },
          { value: "All models", set: () => {}, options: ["All models"] },
          { value: "All actions", set: () => {}, options: ["All actions"] },
          { value: "Any date", set: () => {}, options: ["Any date"] },
        ].map((f, i) => (
          <select
            key={i}
            value={f.value}
            onChange={(e) => f.set(e.target.value)}
            className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-medium outline-none focus:border-primary"
          >
            {f.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        ))}
      </div>

      <Panel className="overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border bg-muted/40 text-[11px] uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Timestamp</th>
              <th className="px-4 py-3 font-semibold">User</th>
              <th className="px-4 py-3 font-semibold">Action</th>
              <th className="px-4 py-3 font-semibold">Model</th>
              <th className="px-4 py-3 font-semibold">Document</th>
              <th className="px-4 py-3 font-semibold">Result</th>
              <th className="px-4 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((l) => (
              <>
                <tr
                  key={l.id}
                  onClick={() => setOpen(open === l.id ? null : l.id)}
                  className={cn(
                    "cursor-pointer hover:bg-muted/40",
                    l.status === "blocked" && "bg-danger-soft/70 hover:bg-danger-soft",
                  )}
                >
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-[11px] text-muted-foreground">
                    {l.timestamp}
                  </td>
                  <td className="px-4 py-3 text-[12px]">{l.user}</td>
                  <td className="px-4 py-3 text-[12px] font-medium">{l.action}</td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground">{l.model}</td>
                  <td className="max-w-[220px] truncate px-4 py-3 text-[12px] text-muted-foreground">
                    {l.document}
                  </td>
                  <td className="max-w-[300px] truncate px-4 py-3 text-[12px] text-muted-foreground">
                    {l.result}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <StatusPill
                        tone={
                          l.status === "success"
                            ? "success"
                            : l.status === "blocked"
                              ? "danger"
                              : "warning"
                        }
                      >
                        {l.status === "success" ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : l.status === "blocked" ? (
                          <ShieldOff className="h-3 w-3" />
                        ) : (
                          <AlertTriangle className="h-3 w-3" />
                        )}
                        {l.status}
                      </StatusPill>
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 text-muted-foreground transition-transform",
                          open === l.id && "rotate-180",
                        )}
                      />
                    </span>
                  </td>
                </tr>
                {open === l.id && (
                  <tr key={`${l.id}-trace`} className="bg-muted/30">
                    <td colSpan={7} className="px-6 py-4">
                      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        Workflow trace
                      </div>
                      <div className="mt-3">
                        {l.trace.map((t, i) => (
                          <div key={t.step} className="flex gap-3">
                            <div className="flex flex-col items-center">
                              <CheckCircle2 className="h-4 w-4 text-primary" />
                              {i < l.trace.length - 1 && (
                                <span className="w-px flex-1 bg-primary/30" />
                              )}
                            </div>
                            <div className="flex-1 pb-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[13px] font-medium">{t.step}</span>
                                <span className="font-mono text-[11px] text-muted-foreground">
                                  {t.ms} ms
                                </span>
                              </div>
                              <div className="text-[11px] text-muted-foreground">
                                {t.detail}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </Panel>
    </div>
  );
}
