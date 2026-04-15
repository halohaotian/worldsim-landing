"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function WaitlistCTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMessage(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("waitlist").insert({ email });
      if (error) {
        if (error.code === "23505") {
          setMessage({ type: "success", text: "您已在排队中，我们会尽快与您联系！" });
        } else {
          setMessage({ type: "error", text: "提交失败，请稍后重试" });
        }
      } else {
        setMessage({ type: "success", text: "成功加入 Waitlist！我们已发送确认邮件。" });
        setEmail("");
      }
    } catch {
      setMessage({ type: "error", text: "网络错误，请稍后重试" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-transparent via-cyber-purple/5 to-transparent">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text">加入 Waitlist</h2>
        <p className="text-slate-400 text-lg mb-10">成为第一批探索平行世界的先行者</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input type="email" placeholder="输入您的邮箱" value={email} onChange={(e) => setEmail(e.target.value)} required className="flex-1" />
          <Button type="submit" variant="primary" loading={loading}>加入排队</Button>
        </form>
        {message && (
          <p className={`mt-4 text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>{message.text}</p>
        )}
      </div>
    </section>
  );
}
