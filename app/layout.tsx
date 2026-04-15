import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Tracker from "@/components/Tracker";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WorldSim - 用 AI Agent 构建平行世界",
  description: "多智能体平行世界仿真平台，模拟真实社会的复杂环境，通过大规模涌现仿真预测事件的演化轨迹与最终结果。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <Tracker />
        {children}
      </body>
    </html>
  );
}
