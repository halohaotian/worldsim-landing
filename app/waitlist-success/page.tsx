import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import Button from "@/components/ui/Button";

export default async function WaitlistSuccessPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: entry } = await supabase
    .from("worldsim_waitlist")
    .select("id, status")
    .eq("email", user.email)
    .single();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass-card p-8 w-full max-w-md text-center">
        <div className="text-6xl mb-6">&#10003;</div>
        <h1 className="text-2xl font-bold mb-2 neon-text">已加入 Waitlist！</h1>
        {entry && (
          <p className="text-slate-400 mb-6">
            您的排队号：<span className="text-cyber-cyan font-bold text-xl">#{entry.id}</span>
          </p>
        )}
        <p className="text-slate-400 mb-8">我们会在产品就绪时通过邮件通知您。</p>
        <Link href="/"><Button variant="outline">返回首页</Button></Link>
      </div>
    </div>
  );
}
