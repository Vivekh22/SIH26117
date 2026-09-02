import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("rounded-xl border border-border bg-card", className)}>{children}</div>;
}

export function PanelHeader({
  title,
  viewAllTo,
  right,
}: {
  title: string;
  viewAllTo?: string;
  right?: ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-border px-4 py-3">
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
      {right}
      {viewAllTo && (
        <Link
          to={viewAllTo}
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

export function StatCard({
  icon: Icon,
  value,
  label,
  valueClass,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  valueClass?: string;
}) {
  return (
    <Panel className="flex items-center gap-3 px-4 py-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-success-soft text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <div className={cn("truncate text-xl font-bold tracking-tight", valueClass)}>{value}</div>
        <div className="text-xs font-medium text-foreground/80">{label}</div>
      </div>
    </Panel>
  );
}

export function StatusPill({
  tone = "success",
  children,
  className,
}: {
  tone?: "success" | "idle" | "warning" | "danger" | "info";
  children: ReactNode;
  className?: string;
}) {
  const tones = {
    success: "bg-success-soft text-primary",
    idle: "bg-muted text-muted-foreground",
    warning: "bg-warning-soft text-[color:var(--warning)]",
    danger: "bg-danger-soft text-[color:var(--danger)]",
    info: "bg-secondary text-[color:var(--info)]",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Dot({ tone = "success" }: { tone?: "success" | "idle" | "info" | "danger" }) {
  const tones = {
    success: "bg-primary",
    idle: "bg-[color:var(--idle)]",
    info: "bg-[color:var(--info)]",
    danger: "bg-[color:var(--danger)]",
  } as const;
  return <span className={cn("inline-block h-2 w-2 rounded-full", tones[tone])} />;
}

export function PageHeader({
  title,
  description,
  chips,
  actions,
}: {
  title: string;
  description?: string;
  chips?: { label: string; icon?: LucideIcon }[];
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        {chips && (
          <div className="mt-3 flex flex-wrap gap-2">
            {chips.map((c) => (
              <StatusPill key={c.label} className="px-2.5 py-1">
                {c.icon ? <c.icon className="h-3.5 w-3.5" /> : <Dot />}
                {c.label}
              </StatusPill>
            ))}
          </div>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
