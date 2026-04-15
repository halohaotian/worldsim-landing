import { WaitlistEntry } from "@/lib/types";

interface WaitlistTableProps {
  entries: WaitlistEntry[];
}

export default function WaitlistTable({ entries }: WaitlistTableProps) {
  return (
    <div className="glass-card p-6 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Waitlist 用户列表</h3>
      {entries.length === 0 ? (
        <p className="text-slate-500 text-center py-8">暂无数据</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-slate-400 border-b border-white/5">
              <th className="text-left py-3 px-2">排队号</th>
              <th className="text-left py-3 px-2">邮箱</th>
              <th className="text-left py-3 px-2">注册时间</th>
              <th className="text-left py-3 px-2">状态</th>
              <th className="text-left py-3 px-2">来源</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e) => (
              <tr key={e.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-3 px-2 text-cyber-cyan">#{e.id}</td>
                <td className="py-3 px-2">{e.email}</td>
                <td className="py-3 px-2 text-slate-400">{new Date(e.created_at).toLocaleDateString("zh-CN")}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-0.5 rounded text-xs ${e.status === "waiting" ? "bg-yellow-500/10 text-yellow-400" : e.status === "invited" ? "bg-cyber-cyan/10 text-cyber-cyan" : "bg-green-500/10 text-green-400"}`}>
                    {e.status === "waiting" ? "等待中" : e.status === "invited" ? "已邀请" : "已激活"}
                  </span>
                </td>
                <td className="py-3 px-2 text-slate-400">{e.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
