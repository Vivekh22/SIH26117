import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { trafficSeries } from "@/services/mockApi";
import { Dot } from "./primitives";

export function TrafficChart({ height = 130 }: { height?: number }) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={trafficSeries} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="t"
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            interval={2}
          />
          <YAxis
            domain={[0, 100]}
            ticks={[0, 50, 100]}
            tickFormatter={(v) => `${v} KB/s`}
            tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
            tickLine={false}
            axisLine={false}
            width={58}
          />
          <Line
            type="monotone"
            dataKey="inbound"
            stroke="var(--chart-1)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="outbound"
            stroke="var(--chart-2)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrafficLegend() {
  return (
    <div className="flex items-center justify-center gap-4 text-[11px] text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <Dot /> Inbound
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Dot tone="info" /> Outbound
      </span>
    </div>
  );
}
