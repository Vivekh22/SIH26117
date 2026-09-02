import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  LayoutPanelLeft,
  FileText,
  Boxes,
  Bot,
  Network,
  Wrench,
  ScrollText,
  ShieldCheck,
  Settings,
  HelpCircle,
  Shield,
  ArrowRight,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  Atom,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/lib/app-store";
import { Dot } from "./primitives";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV = [
  { url: "/", label: "Home", icon: Home },
  { url: "/workbench", label: "Workbench", icon: LayoutPanelLeft },
  { url: "/documents", label: "Documents", icon: FileText },
  { url: "/knowledge-base", label: "Knowledge Base", icon: Boxes },
  { url: "/agents", label: "Agents", icon: Bot },
  { url: "/model-router", label: "Model Router", icon: Network },
  { url: "/tools", label: "Tools & Sandbox", icon: Wrench },
  { url: "/audit-logs", label: "Audit Logs", icon: ScrollText },
  { url: "/security", label: "Security", icon: ShieldCheck },
] as const;

const NAV_SECONDARY = [
  { url: "/settings", label: "Settings", icon: Settings },
  { url: "/help", label: "Help & Support", icon: HelpCircle },
] as const;

function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const item = (entry: { url: string; label: string; icon: typeof Home }, active: boolean) => (
    <Link
      key={entry.url}
      to={entry.url as "/"}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/80 hover:bg-muted",
      )}
    >
      <entry.icon className={cn("h-[18px] w-[18px]", active && "text-primary")} />
      {entry.label}
    </Link>
  );

  return (
    <aside className="flex w-[248px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-success-soft text-primary">
          <Atom className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <div className="text-[15px] font-bold tracking-tight">teamMESSIER-87</div>
          <div className="text-[10px] font-semibold tracking-widest text-muted-foreground">
            AI WORKBENCH
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-0.5 px-3">
        {NAV.map((n) => item(n, pathname === n.url))}
      </nav>

      <div className="mx-3 my-3 border-t border-sidebar-border" />

      <nav className="flex flex-col gap-0.5 px-3">
        {NAV_SECONDARY.map((n) => item(n, pathname === n.url))}
      </nav>

      <div className="mx-3 mt-5 rounded-xl border border-border bg-card p-3">
        <div className="flex items-start gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-success-soft text-primary">
            <Shield className="h-4 w-4" />
          </span>
          <div className="text-[11px] leading-relaxed">
            <div className="text-[11px] font-bold tracking-wide">AIR-GAPPED MODE</div>
            <div className="text-muted-foreground">No external connections</div>
            <div className="text-muted-foreground">100% local · Zero egress</div>
          </div>
        </div>
        <Link
          to="/security"
          className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
        >
          View Security Details <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="mt-auto p-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-3 py-3 text-left hover:bg-muted">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success-soft text-xs font-bold text-primary">
              TE
            </span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-sm font-semibold">Test Engineer</span>
              <span className="block text-[11px] text-muted-foreground">Team Member</span>
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Signed in locally</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings">Preferences</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/audit-logs">My activity</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Lock workspace</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}

function TopBar() {
  const { notifications } = useAppStore();
  const [dark, setDark] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const current = [...NAV, ...NAV_SECONDARY].find((n) => n.url === pathname)?.label ?? "Home";

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-border bg-card px-6">
      <div className="text-sm text-muted-foreground">
        teamMESSIER-87 <span className="px-1">/</span>
        <span className="font-semibold text-foreground">{current}</span>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 rounded-lg border border-border px-3.5 py-2 text-[11px] font-semibold tracking-wide">
          <span className="text-muted-foreground">SYSTEM STATUS</span>
          <span className="inline-flex items-center gap-1.5 text-primary">
            <Dot /> SECURE &amp; OPERATIONAL
          </span>
        </div>
        <button
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
        >
          {dark ? <Moon className="h-[18px] w-[18px]" /> : <Sun className="h-[18px] w-[18px]" />}
        </button>
        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {notifications}
          </span>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1.5 rounded-lg px-1 py-1 hover:bg-muted">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-success-soft text-xs font-bold text-primary">
              TE
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Test Engineer</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/help">Help &amp; Support</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function Footer() {
  const items = [
    "teamMESSIER-87",
    "Built for SIH 2026",
    "On-Premise",
    "Air-Gapped",
    "Zero Data Egress",
  ];
  return (
    <footer className="flex items-center justify-center gap-3 border-t border-border bg-card px-6 py-3 text-[11px] text-muted-foreground">
      {items.map((i, idx) => (
        <span key={i} className="inline-flex items-center gap-3">
          {idx > 0 && <span className="text-border">·</span>}
          <span className="inline-flex items-center gap-1.5">
            <Dot /> {i}
          </span>
        </span>
      ))}
    </footer>
  );
}

function PreviewModal() {
  const { previewDoc, closePreview } = useAppStore();
  if (!previewDoc) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 p-6"
      onClick={closePreview}
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-border bg-card shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <div className="text-sm font-semibold">{previewDoc.name}</div>
            <div className="text-xs text-muted-foreground">
              {previewDoc.type} · {previewDoc.pages} pages · {previewDoc.size} ·{" "}
              {previewDoc.department}
            </div>
          </div>
          <button
            onClick={closePreview}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Close preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-4 px-5 py-5">
          <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm leading-relaxed">
            {previewDoc.preview}
          </div>
          <div className="flex items-center gap-2 text-xs text-primary">
            <ShieldCheck className="h-4 w-4" /> Rendered locally — file never leaves the
            organization.
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main className="flex-1 px-6 py-6">{children}</main>
        <Footer />
      </div>
      <PreviewModal />
    </div>
  );
}
