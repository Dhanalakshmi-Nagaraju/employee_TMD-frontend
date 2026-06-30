"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatusChartProps {
  statusDistribution: Record<string, number>;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const STATUS_COLORS: Record<string, string> = {
  PENDING: "#f97316",
  IN_PROGRESS: "#3b82f6",
  COMPLETED: "#22c55e",
};

const STATUS_ORDER = ["COMPLETED", "IN_PROGRESS", "PENDING"] as const;

type ChartEntry = {
  status: string;
  label: string;
  count: number;
  fill: string;
};

function StatusBarLabel({
  x,
  y,
  width,
  index,
  chartData,
}: {
  x?: string | number;
  y?: string | number;
  width?: string | number;
  index?: number;
  chartData: ChartEntry[];
}) {
  const entry = index != null ? chartData[index] : undefined;
  const xNum = typeof x === "number" ? x : Number(x);
  const yNum = typeof y === "number" ? y : Number(y);
  const widthNum = typeof width === "number" ? width : Number(width);

  if (!entry || Number.isNaN(xNum) || Number.isNaN(yNum) || Number.isNaN(widthNum)) {
    return null;
  }

  const centerX = xNum + widthNum / 2;
  const labelOffset = entry.label.length * 3.2;

  return (
    <g transform={`translate(${centerX}, ${yNum - 14})`}>
      <circle cx={-labelOffset - 6} cy={0} r={4} fill={entry.fill} />
      <text
        x={0}
        y={4}
        textAnchor="middle"
        fill="var(--muted-foreground)"
        fontSize={12}
      >
        {entry.label}
      </text>
    </g>
  );
}

export function StatusChart({ statusDistribution }: StatusChartProps) {
  const chartData = STATUS_ORDER.filter((status) => status in statusDistribution).map(
    (status) => ({
      status,
      label: STATUS_LABELS[status],
      count: statusDistribution[status] ?? 0,
      fill: STATUS_COLORS[status],
    })
  );

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tasks by Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">No task data available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Tasks by Status</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 40, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/60" vertical={false} />
            <XAxis dataKey="label" hide />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: "var(--muted)", opacity: 0.3 }}
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "0.5rem",
                color: "var(--foreground)",
              }}
              formatter={(value) => [value, "Tasks"]}
              labelFormatter={(label) => `Status: ${label}`}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={72}>
              {chartData.map((entry) => (
                <Cell key={entry.status} fill={entry.fill} />
              ))}
              <LabelList
                dataKey="label"
                content={(props) => (
                  <StatusBarLabel {...props} chartData={chartData} />
                )}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
