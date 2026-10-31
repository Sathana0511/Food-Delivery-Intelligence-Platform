import React from 'react'
import {
  LayoutDashboard,
  TrendingUp,
  UtensilsCrossed,
  Users,
  Clock,
  Database,
  Flame,
  Layers,
  ChevronRight,
  Server
} from 'lucide-react'

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard, tag: 'KPIs' },
    { id: 'trends', label: 'Revenue & Trends', icon: TrendingUp, tag: 'Monthly' },
    { id: 'restaurants', label: 'Restaurants & Cuisines', icon: UtensilsCrossed, tag: '50 Outlets' },
    { id: 'customers', label: 'Customer Intelligence', icon: Users, tag: 'RFM & Value' },
    { id: 'operations', label: 'Operations & Hours', icon: Clock, tag: 'Peak Times' },
    { id: 'sql', label: 'SQL Query Inspector', icon: Database, tag: '03_analysis' },
  ]

  return (
    <aside className="w-64 bg-[#0B0F19] border-r border-slate-800 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Flame className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-lg tracking-tight text-white">FOOD<span className="text-orange-500">PULSE</span></span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">SaaS</span>
            </div>
            <p className="text-xs text-slate-400">Delivery Intelligence</p>
          </div>
        </div>
      </div>

      {/* Database Context Badge */}
      <div className="mx-4 my-4 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
        <div className="flex items-center space-x-2 text-slate-300 font-medium mb-1.5">
          <Server className="w-3.5 h-3.5 text-emerald-400" />
          <span>Connected Database</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span className="font-mono text-[11px] text-orange-400 font-semibold">fooddeliverydb</span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            5,000 Orders
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <div className="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Analytics & Modules
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-orange-600/20 to-orange-500/10 text-orange-400 border border-orange-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                isActive ? 'bg-orange-500/20 text-orange-300' : 'bg-slate-800/80 text-slate-400'
              }`}>
                {item.tag}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Time Window</span>
          <span className="text-slate-300 font-medium font-mono text-[11px]">Jan - Jun 2025</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Total Outlets</span>
          <span className="text-slate-300 font-medium font-mono text-[11px]">50 Restaurants</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Active Cities</span>
          <span className="text-slate-300 font-medium font-mono text-[11px]">5 Metros</span>
        </div>
      </div>
    </aside>
  )
}
