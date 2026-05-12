"use client";

import {
  ResponsiveContainer,
  LineChart, Line,
  BarChart, Bar,
  AreaChart, Area,
  PieChart, Pie, Cell,
  CartesianGrid,
  XAxis, YAxis,
  Tooltip, Legend,
} from "recharts";

type ChartType = "line" | "bar" | "area" | "pie";

export interface SeriesConfig {
  dataKey: string;
  name: string;
  color: string;
}

export interface ReusableChartProps<T = Record<string, unknown>> {
  data: T[];
  type?: ChartType;
  xKey?: string;
  height?: number;
  series: SeriesConfig[];
  /** Optional XAxis extra props (e.g. angled labels for long org names) */
  xAxisProps?: Record<string, unknown>;
}

const AXIS_STYLE = { stroke: "#64748b", fontSize: 12 } as const;

export default function ReusableChart<T = Record<string, unknown>>({
  data,
  type = "line",
  xKey = "date",
  height = 300,
  series,
  xAxisProps = {},
}: ReusableChartProps<T>) {

  const cartesian = (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
      <XAxis dataKey={xKey} {...AXIS_STYLE} {...xAxisProps} />
      <YAxis {...AXIS_STYLE} />
      <Tooltip />
      <Legend />
    </>
  );

  if (type === "pie") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Tooltip />
          <Legend />
          <Pie
            data={data as Record<string, unknown>[]}
            dataKey={series[0].dataKey}
            nameKey={xKey}
            cx="50%"
            cy="50%"
            outerRadius={100}
            labelLine={false}
            label={({ name, percent }) =>
              `${String(name ?? "").substring(0, 12)}… (${((percent ?? 0) * 100).toFixed(0)}%)`
            }
          >
            {(data as Record<string, unknown>[]).map((entry, i) => (
              <Cell
                key={i}
                fill={
                  (entry.color as string) ||
                  series[i % series.length]?.color ||
                  "#8884d8"
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data as Record<string, unknown>[]}>
          {cartesian}
          {series.map((s) => (
            <Bar key={s.dataKey} dataKey={s.dataKey} fill={s.color} name={s.name} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === "area") {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data as Record<string, unknown>[]}>
          {cartesian}
          {series.map((s) => (
            <Area key={s.dataKey} type="monotone" dataKey={s.dataKey} stroke={s.color} fill={s.color} fillOpacity={0.15} name={s.name} strokeWidth={3} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  // default: line
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data as Record<string, unknown>[]}>
        {cartesian}
        {series.map((s) => (
          <Line key={s.dataKey} type="monotone" dataKey={s.dataKey} stroke={s.color} strokeWidth={3} name={s.name} dot={false} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
