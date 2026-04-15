const steps = [
  { num: "01", title: "种子数据", desc: "输入新闻、政策、事件等真实世界数据" },
  { num: "02", title: "平行世界", desc: "自动生成 Agent 社会和知识图谱" },
  { num: "03", title: "仿真推演", desc: "多域联动仿真，观察涌现行为" },
  { num: "04", title: "预测报告", desc: "多维度分析与事件走向预测" },
];

export default function Workflow() {
  return (
    <section className="py-24 px-6 bg-cyber-surface/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 neon-text-purple">工作流程</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className="relative text-center">
              <div className="text-5xl font-bold text-cyber-cyan/20 mb-4">{step.num}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-3 w-6 text-cyber-cyan/40 text-2xl">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
