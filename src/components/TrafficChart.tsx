import { Dot } from "./primitives";

const TICKS = ["-60s", "-45s", "-30s", "-15s", "Now"];

/**
 * Flat-baseline network chart. Values are pinned at 0 KB/s because the
 * deployment is air-gapped (see mockApi.trafficSeries).
 */
export function TrafficChart({ height = 130 }: { height?: number }) {
  const rows = ["100 KB/s", "50 KB/s", "0 KB/s"];
  return (
    <div className="mt-2 flex w-full gap-2" style={{ height }}>
      <div className="flex flex-col justify-between py-1 text-[10px] text-muted-foreground">
        {rows.map((r) => (
          <span key={r}>{r}</span>
        ))}
      </div>
      <div className="flex-1">
        <div className="relative h-[calc(100%-16px)] w-full">
          {[0, 50, 100].map((p) => (
            <span
              key={p}
              className="absolute left-0 right-0 border-t border-border"
              style={{ top: `${p}%` }}
            />
          ))}
          <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[color:var(--chart-1)]" />
          <span className="absolute bottom-[2px] left-0 right-0 h-[2px] rounded-full bg-[color:var(--chart-2)] opacity-60" />
        </div>
        <div className="flex justify-between pt-1 text-[10px] text-muted-foreground">
          {TICKS.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TrafficLegend() {
  return (
    <div className="flex items-center gap-4 text-[11px] text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <Dot /> Inbound
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Dot tone="info" /> Outbound
      </span>
    </div>
  );
}
