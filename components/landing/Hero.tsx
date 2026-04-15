import Link from "next/link";
import Button from "@/components/ui/Button";
import ParticleBackground from "./ParticleBackground";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="text-6xl md:text-7xl font-bold mb-6 neon-text tracking-wider">
          WorldSim
        </h1>
        <p className="text-xl md:text-2xl text-slate-300 mb-4 leading-relaxed">
          用 AI Agent 构建平行世界
        </p>
        <p className="text-lg text-slate-400 mb-10 leading-relaxed">
          模拟真实社会的复杂环境，通过大规模涌现仿真预测事件的演化轨迹与最终结果
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register">
            <Button variant="primary" className="text-lg px-8 py-4">加入 Waitlist</Button>
          </Link>
          <a href="#features">
            <Button variant="outline" className="text-lg px-8 py-4">了解更多</Button>
          </a>
        </div>
        <div className="mt-16 flex justify-center gap-12 text-slate-500 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-cyan neon-text">1M+</div>
            <div>Agent 规模</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-purple neon-text-purple">5</div>
            <div>仿真域联动</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyber-pink">28</div>
            <div>Agent 行为类型</div>
          </div>
        </div>
      </div>
    </section>
  );
}
