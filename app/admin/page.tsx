import { createServerSupabaseClient } from "@/lib/supabase/server";
import MetricCard from "@/components/admin/MetricCard";
import TrendChart from "@/components/admin/TrendChart";
import WaitlistTable from "@/components/admin/WaitlistTable";

export const revalidate = 60;

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient();

  const today = new Date().toISOString().split("T")[0];

  const [todayPV, totalRegs, waitlistCount, trendData, waitlistEntries] = await Promise.all([
    supabase.from("worldsim_page_views").select("id", { count: "exact", head: true }).gte("created_at", `${today}T00:00:00`),
    supabase.from("worldsim_profiles").select("id", { count: "exact", head: true }),
    supabase.from("worldsim_waitlist").select("id", { count: "exact", head: true }),
    supabase.from("worldsim_daily_stats").select("*").order("date", { ascending: false }).limit(30),
    supabase.from("worldsim_waitlist").select("*").order("created_at", { ascending: false }).limit(50),
  ]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="今日 PV" value={todayPV.count ?? 0} color="text-cyber-cyan" />
        <MetricCard title="总注册数" value={totalRegs.count ?? 0} color="text-cyber-purple" />
        <MetricCard title="Waitlist" value={waitlistCount.count ?? 0} color="text-cyber-pink" />
        <MetricCard title="今日趋势" value="-" color="text-green-400" />
      </div>
      <TrendChart data={(trendData.data ?? []).reverse()} />
      <WaitlistTable entries={waitlistEntries.data ?? []} />
    </div>
  );
}
