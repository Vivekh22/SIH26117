import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, LifeBuoy, ShieldCheck, ArrowRight } from "lucide-react";
import { Panel, PanelHeader, PageHeader } from "@/components/primitives";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help & Support — teamMESSIER-87 AI Workbench" },
      {
        name: "description",
        content: "Guides for running secure workflows, indexing documents and reading audits.",
      },
      { property: "og:title", content: "Help & Support" },
      {
        property: "og:description",
        content: "Operator guidance for the sovereign on-premise AI workbench.",
      },
    ],
  }),
  component: HelpPage,
});

const GUIDES = [
  {
    icon: BookOpen,
    title: "Run your first secure workflow",
    body: "Upload a document, describe the task and watch the 7-step pipeline execute locally.",
    to: "/workbench",
  },
  {
    icon: LifeBuoy,
    title: "Index a scanned manual",
    body: "OCR, chunking and embedding all happen on-premise. Track progress in Documents.",
    to: "/documents",
  },
  {
    icon: ShieldCheck,
    title: "Prove zero data egress",
    body: "Review the architecture boundary and the blocked-request events in the audit trail.",
    to: "/security",
  },
] as const;

function HelpPage() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Help & Support"
        description="Offline documentation bundled with this deployment — no internet required."
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {GUIDES.map((g) => (
          <Panel key={g.title} className="px-4 py-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-success-soft text-primary">
              <g.icon className="h-5 w-5" />
            </span>
            <div className="mt-3 text-sm font-semibold">{g.title}</div>
            <p className="mt-1 text-[12px] text-muted-foreground">{g.body}</p>
            <Link
              to={g.to}
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              Open <ArrowRight className="h-3 w-3" />
            </Link>
          </Panel>
        ))}
      </div>
      <Panel>
        <PanelHeader title="Support" />
        <div className="px-4 py-4 text-[12px] text-muted-foreground">
          On-site support: contact the plant IT desk. Incident reference prefix{" "}
          <span className="font-mono text-foreground">SIH26117</span>. Remote assistance is
          disabled by policy in air-gapped mode.
        </div>
      </Panel>
    </div>
  );
}
