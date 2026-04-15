interface MetricCardProps {
  title: string;
  value: string | number;
  color?: string;
}

export default function MetricCard({ title, value, color = "text-cyber-cyan" }: MetricCardProps) {
  return (
    <div className="glass-card p-6">
      <div className="text-sm text-slate-400 mb-2">{title}</div>
      <div className={`text-3xl font-bold ${color}`}>{typeof value === "number" ? value.toLocaleString() : value}</div>
    </div>
  );
}
