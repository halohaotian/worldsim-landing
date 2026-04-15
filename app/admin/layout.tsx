import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const role = user.app_metadata?.role;
  if (role !== "admin") redirect("/");

  return (
    <div className="min-h-screen bg-cyber-bg">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold neon-text">WorldSim Admin</h1>
          <a href="/" className="text-slate-400 hover:text-cyber-cyan transition-colors text-sm">返回首页</a>
        </div>
        {children}
      </div>
    </div>
  );
}
