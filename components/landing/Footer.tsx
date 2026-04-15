export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-bold neon-text tracking-wider">WorldSim</div>
        <div className="flex gap-6 text-slate-500 text-sm">
          <a href="https://github.com" className="hover:text-cyber-cyan transition-colors">GitHub</a>
          <a href="#" className="hover:text-cyber-cyan transition-colors">文档</a>
          <a href="#" className="hover:text-cyber-cyan transition-colors">联系我们</a>
        </div>
        <div className="text-slate-600 text-sm">&copy; {new Date().getFullYear()} WorldSim. All rights reserved.</div>
      </div>
    </footer>
  );
}
