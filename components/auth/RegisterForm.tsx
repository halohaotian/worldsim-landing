"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) { setError("密码至少 8 位"); return; }
    if (password !== confirmPassword) { setError("两次输入的密码不一致"); return; }
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      const messages: Record<string, string> = {
        user_already_exists: "该邮箱已注册",
        email_address_invalid: "邮箱格式不正确",
        weak_password: "密码强度不足",
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
        <h1 className="text-2xl font-bold mb-2 neon-text text-center">注册</h1>
        <p className="text-slate-400 text-sm text-center mb-6">注册即自动加入 Waitlist 排队</p>
        <form onSubmit={handleRegister} className="space-y-4">
          <Input label="邮箱" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="密码（至少 8 位）" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Input label="确认密码" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button type="submit" variant="primary" loading={loading} className="w-full">注册并加入排队</Button>
        </form>
        <p className="text-slate-400 text-sm text-center mt-6">
          已有账号？ <Link href="/login" className="text-cyber-cyan hover:underline">去登录</Link>
        </p>
      </div>
    </div>
  );
}
