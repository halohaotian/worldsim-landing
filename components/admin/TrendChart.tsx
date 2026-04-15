"use client";

import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import GlassCard from "@/components/ui/GlassCard";
import { DailyStats } from "@/lib/types";

interface TrendChartProps {
  data: DailyStats[];
}

export default function TrendChart({ data }: TrendChartProps) {
  return (
    <GlassCard className="p-6">
      <h3 className="text-lg font-semibold mb-4">30 天趋势</h3>
      {data.length === 0 ? (
        <p className="text-slate-500 text-center py-8">暂无数据</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip
              contentStyle={{ background: "#111827", border: "1px solid #1e293b", borderRadius: 8 }}
              labelStyle={{ color: "#f1f5f9" }}
            />
            <Legend />
            <Line type="monotone" dataKey="page_views" name="PV" stroke="#00f0ff" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="registrations" name="注册" stroke="#a855f7" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="waitlist_joins" name="Waitlist" stroke="#f472b6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </GlassCard>
  );
}
