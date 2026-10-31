import React from 'react'
import { TrendingUp, ArrowUpRight, ArrowDownRight, Calendar, DollarSign, BarChart2 } from 'lucide-react'
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts'

export default function TrendsTab({ data }) {
  const monthly = data.monthly_performance
  const cumulative = data.daily_cumulative_sample || []

  return (
    <div className="space-y-6">
      {/* Monthly Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Peak Revenue Month</div>
          <div className="text-xl font-bold text-white mt-2">May 2025</div>
          <div className="text-xs text-emerald-400 font-mono mt-1 font-semibold">₹728,352.81 (+7.12% MoM)</div>
          <div className="text-[11px] text-slate-400 mt-2">890 orders fulfilled</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Highest AOV Month</div>
          <div className="text-xl font-bold text-white mt-2">January 2025</div>
          <div className="text-xs text-orange-400 font-mono mt-1 font-semibold">₹841.12 Average Ticket</div>
          <div className="text-[11px] text-slate-400 mt-2">831 orders • ₹698,967.62</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Monthly Revenue</div>
          <div className="text-xl font-bold text-white mt-2">₹682,850.55</div>
          <div className="text-xs text-blue-400 font-mono mt-1 font-semibold">833 Orders / Month</div>
          <div className="text-[11px] text-slate-400 mt-2">Consistent velocity across H1</div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cumulative Total</div>
          <div className="text-xl font-bold text-white mt-2">₹4,097,103.31</div>
          <div className="text-xs text-emerald-400 font-mono mt-1 font-semibold">100% Target Met</div>
          <div className="text-[11px] text-slate-400 mt-2">5,000 Total Transactions</div>
        </div>
      </div>

      {/* Monthly MoM Growth & Revenue Chart */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              Monthly Revenue & MoM Growth Rate
            </h2>
            <p className="text-xs text-slate-400">Replicating query 312: LAG(total_revenue) OVER (ORDER BY order_year, order_month)</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-orange-400 font-medium">
              <span className="w-3 h-3 bg-orange-500 rounded-sm"></span> Monthly Revenue (₹)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-3 h-0.5 bg-emerald-400"></span> MoM Growth %
            </span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={monthly} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
              <XAxis dataKey="MonthName" stroke="#64748B" fontSize={12} tickLine={false} />
              <YAxis
                yAxisId="left"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `${val}%`}
              />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                formatter={(val, name) => [
                  name === 'revenue' ? `₹${val.toLocaleString()}` : `${val}%`,
                  name === 'revenue' ? 'Revenue' : 'MoM Growth'
                ]}
              />
              <Bar yAxisId="left" dataKey="revenue" fill="#F97316" radius={[6, 6, 0, 0]} maxBarSize={48} />
              <Line yAxisId="right" type="monotone" dataKey="growth_percentage" stroke="#10B981" strokeWidth={3} dot={{ r: 4, fill: '#10B981' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cumulative Sales Run-Rate */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white">Cumulative Revenue Trajectory (Jan - Jun 2025)</h2>
            <p className="text-xs text-slate-400">Replicating SQL Window Query 162: SUM(SUM(Amount)) OVER (ORDER BY DATE(OrderDate))</p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
            Final: ₹4,097,103.31
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={cumulative} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="cumulGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
              <XAxis dataKey="date" stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(d) => d.slice(5)} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(val) => `₹${(val / 1000000).toFixed(1)}M`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                formatter={(val) => [`₹${val.toLocaleString()}`, 'Cumulative Revenue']}
              />
              <Area type="monotone" dataKey="cumulative_revenue" stroke="#10B981" strokeWidth={2.5} fill="url(#cumulGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Performance SQL View Data Table */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-white">Monthly Performance Breakdown (View: monthly_performance)</h2>
          <span className="text-xs font-mono text-slate-400">H1 Financial Data</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <th className="py-3 px-3">Period</th>
                <th className="py-3 px-3 text-right">Orders</th>
                <th className="py-3 px-3 text-right">Revenue (₹)</th>
                <th className="py-3 px-3 text-right">AOV (₹)</th>
                <th className="py-3 px-3 text-right">MoM Growth</th>
                <th className="py-3 px-3 text-right">Revenue Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {monthly.map((m) => (
                <tr key={m.YearMonth} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-3 font-sans font-semibold text-white">
                    {m.MonthName} 2025 <span className="text-slate-400 font-mono font-normal">({m.YearMonth})</span>
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300">{m.orders.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-400">₹{m.revenue.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right text-slate-300">₹{m.aov.toFixed(2)}</td>
                  <td className="py-3 px-3 text-right">
                    {m.growth_percentage === 0 ? (
                      <span className="text-slate-400">Benchmark</span>
                    ) : m.growth_percentage > 0 ? (
                      <span className="inline-flex items-center text-emerald-400 font-bold">
                        +{m.growth_percentage}%
                      </span>
                    ) : (
                      <span className="inline-flex items-center text-rose-400 font-bold">
                        {m.growth_percentage}%
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-sans">
                    <div className="w-24 ml-auto bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-orange-500 h-full rounded-full"
                        style={{ width: `${(m.revenue / 728352.81) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
