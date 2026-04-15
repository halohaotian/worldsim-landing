"use client";

import { useState } from "react";
import GlassCard from "@/components/ui/GlassCard";

const cases = [
  { title: "政策效果预测", icon: "📋", desc: "输入政策文件，模拟舆论反应、经济影响和执行阻力，预测政策走向并给出调整建议。", tags: ["教育双减", "房产调控", "环保政策"] },
  { title: "金融危机推演", icon: "💰", desc: "模拟信贷紧缩、恐慌传播和监管应对的连锁反应，评估系统性风险并推荐干预时机。", tags: ["债务违约", "股市暴跌", "银行挤兑"] },
  { title: "舆情危机管理", icon: "📱", desc: "预测信息在社交网络的传播路径和热度曲线，找到最优回应时机和策略。", tags: ["食品安全", "品牌危机", "公关事件"] },
  { title: "公共卫生事件", icon: "🏥", desc: "模拟不同干预策略下的传播曲线、经济影响和社会稳定性，推荐最优防控方案。", tags: ["传染病", "疫苗接种", "封控措施"] },
];

export default function UseCases() {
  const [active, setActive] = useState(0);
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 neon-text">应用场景</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
            {cases.map((c, i) => (
              <button key={c.title} onClick={() => setActive(i)}
                className={`flex-shrink-0 px-6 py-3 rounded-lg text-left transition-all duration-200 ${active === i ? "bg-cyber-cyan/10 border border-cyber-cyan/30 text-white shadow-neon" : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"}`}>
                <span className="mr-2">{c.icon}</span>{c.title}
              </button>
            ))}
          </div>
          <GlassCard className="flex-1 min-h-[200px]">
            <h3 className="text-2xl font-semibold mb-4">{cases[active].title}</h3>
            <p className="text-slate-300 leading-relaxed mb-6">{cases[active].desc}</p>
            <div className="flex flex-wrap gap-2">
              {cases[active].tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs rounded-full bg-cyber-purple/10 text-cyber-purple border border-cyber-purple/20">{tag}</span>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
