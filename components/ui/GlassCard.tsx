import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = "", hover = false }: GlassCardProps) {
  return (
    <div
      className={`glass-card p-6 ${
        hover
          ? "transition-all duration-300 hover:bg-white/10 hover:shadow-neon hover:-translate-y-1"
          : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
