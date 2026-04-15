"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const messages: Record<string, string> = {
        invalid_credentials: "邮箱或密码错误",
        email_not_confirmed: "邮箱未验证，请查看邮件",
      };
      setError(messages[error.code ?? ""] ?? error.message);
      setLoading(false);
      return;
    }
    router.push("/waitlist-success");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="glass-card p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 neon-text text-center">登录</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input label="邮箱" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="密码" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button type="submit" variant="primary" loading={loading} className="w-full">登录</Button>
        </form>
        <p className="text-slate-400 text-sm text-center mt-6">
          还没有账号？ <Link href="/register" className="text-cyber-cyan hover:underline">立即注册</Link>
        </p>
      </div>
    </div>
  );
}
