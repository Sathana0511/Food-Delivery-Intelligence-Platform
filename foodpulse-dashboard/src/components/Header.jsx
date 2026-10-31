import React from 'react'
import { Search, Calendar, Bell, Download, RefreshCw, Sparkles, Filter } from 'lucide-react'

export default function Header({ activeTab, searchTerm, setSearchTerm, onRefresh }) {
  const tabTitles = {
    overview: { title: 'Executive Overview', subtitle: 'Macro food delivery operational performance & KPI health' },
    trends: { title: 'Revenue & Growth Analytics', subtitle: 'Monthly gross merchandise value, MoM growth & cumulative volume' },
    restaurants: { title: 'Restaurant & Cuisine Intelligence', subtitle: '50 partner restaurants across 7 signature cuisines' },
    customers: { title: 'Customer Segmentation & RFM Matrix', subtitle: '500 customers classified by Recency, Frequency, Monetary and Value tiers' },
    operations: { title: 'Operational Timing & Satisfaction', subtitle: 'Day of week trends, hourly rush distributions and customer ratings' },
    sql: { title: 'SQL Query & Schema Inspector', subtitle: 'Direct mapping of views and queries from 03_business_analysis.sql' },
  }

  const current = tabTitles[activeTab] || tabTitles.overview

  return (
    <header className="bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Title & Subtitle */}
      <div>
        <div className="flex items-center space-x-2.5">
          <h1 className="text-xl font-bold text-white tracking-tight">{current.title}</h1>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live DB Sync
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">{current.subtitle}</p>
      </div>

      {/* Action Controls */}
      <div className="flex items-center flex-wrap gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search restaurants, cuisines, cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64 pl-9 pr-3 py-1.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all"
          />
        </div>

        {/* Date Selector Badge */}
        <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 font-medium">
          <Calendar className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-mono text-[11px]">Jan 2025 – Jun 2025</span>
        </div>

        {/* Refresh Action */}
        <button
          onClick={onRefresh}
          title="Reload dataset"
          className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  )
}
