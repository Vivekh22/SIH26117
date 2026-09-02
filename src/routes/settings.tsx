import { createFileRoute } from "@tanstack/react-router";
import { Panel, PanelHeader, PageHeader, StatusPill } from "@/components/primitives";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — teamMESSIER-87 AI Workbench" },
      {
        name: "description",
        content: "Workspace, inference and retention preferences for the on-premise workbench.",
      },
      { property: "og:title", content: "Workbench Settings" },
      {
        property: "og:description",
        content: "Configure local inference, retention and air-gap enforcement.",
      },
    ],
  }),
  component: SettingsPage,
});

function Row({ label, hint, control }: { label: string; hint: string; control: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3.5 last:border-0">
      <div>
        <div className="text-[13px] font-medium">{label}</div>
        <div className="text-[11px] text-muted-foreground">{hint}</div>
      </div>
      <StatusPill>{control}</StatusPill>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="Settings" description="Local-only configuration for this deployment." />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Inference" />
          <Row
            label="Default model"
            hint="Used when the router is inconclusive"
            control="Qwen3-8B"
          />
          <Row label="Max context" hint="Tokens per request" control="32K" />
          <Row label="Quantization" hint="Balance of VRAM and quality" control="Q5_K_M" />
        </Panel>
        <Panel>
          <PanelHeader title="Security" />
          <Row label="Air-gapped mode" hint="Blocks all outbound traffic" control="Enforced" />
          <Row label="Sandbox network" hint="Tool containers" control="Disabled" />
          <Row label="Audit retention" hint="Immutable local storage" control="365 days" />
        </Panel>
        <Panel>
          <PanelHeader title="Knowledge Base" />
          <Row label="Vector database" hint="On-premise instance" control="ChromaDB" />
          <Row label="Chunk size" hint="Tokens per chunk" control="512" />
          <Row label="Embedding model" hint="Runs locally" control="bge-local-embed" />
        </Panel>
        <Panel>
          <PanelHeader title="Workspace" />
          <Row label="Organization" hint="Deployment owner" control="teamMESSIER-87" />
          <Row label="Role" hint="Current session" control="Team Member" />
          <Row label="Locale" hint="Interface language" control="English (IN)" />
        </Panel>
      </div>
    </div>
  );
}
