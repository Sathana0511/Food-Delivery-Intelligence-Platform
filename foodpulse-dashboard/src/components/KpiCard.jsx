import React from 'react'

export default function KpiCard({ title, value, subtext, icon: Icon, badge, badgeColor = 'orange', trend }) {
  const badgeStyles = {
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  }

  return (
    <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-5 hover:border-slate-700/80 transition-all glow-card">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className="w-8 h-8 rounded-lg bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-300">
            <Icon className="w-4 h-4 text-orange-400" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-2xl font-extrabold text-white tracking-tight">{value}</div>
        {badge && (
          <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${badgeStyles[badgeColor] || badgeStyles.orange}`}>
            {badge}
          </span>
        )}
      </div>

      {subtext && (
        <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
          <span>{subtext}</span>
          {trend && <span className="font-mono text-[11px] text-emerald-400 font-semibold">{trend}</span>}
        </div>
      )}
    </div>
  )
}
