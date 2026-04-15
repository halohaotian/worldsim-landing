import GlassCard from "@/components/ui/GlassCard";

const features = [
  { icon: "🌐", title: "世界构建", desc: "从真实数据自动生成包含数千到百万级 Agent 的平行社会，每个 Agent 具备独立人格与记忆" },
  { icon: "⚡", title: "多域仿真", desc: "社交媒体、经济市场、政策博弈、疫情传播多域联动，模拟真实世界的复杂关联" },
  { icon: "🔮", title: "事件预测", desc: "基于涌现仿真的多维度分析，支持反事实推演和因果推断，预测事件走向" },
];

export default function CoreValue() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 neon-text">核心能力</h2>
        <p className="text-slate-400 text-center mb-16 text-lg">一个社会级复杂系统的数字实验室</p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <GlassCard key={f.title} hover>
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-white">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
