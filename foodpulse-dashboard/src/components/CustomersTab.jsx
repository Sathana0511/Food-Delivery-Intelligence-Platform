import React from 'react'
import { Users, Award, ShieldAlert, Target, HeartHandshake, MapPin } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function CustomersTab({ data }) {
  const segments = data.customer_segments_simple
  const rfm = data.customer_segments_rfm
  const cities = data.city_performance
  const topCustomers = data.top_customers

  const segmentColors = {
    'High Value': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    'Loyal': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    'Potential': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    'At Risk': 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    'Regular': 'text-slate-400 bg-slate-800 border-slate-700',
  }

  return (
    <div className="space-y-6">
      {/* Customer Segments Cards (SQL View: customer_segments) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {segments.map((seg) => (
          <div key={seg.customer_segment} className="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{seg.customer_segment}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${segmentColors[seg.customer_segment] || segmentColors['Regular']}`}>
                {seg.rev_share}% Rev
              </span>
            </div>
            <div className="text-2xl font-extrabold text-white mt-2">{seg.customer_count} Customers</div>
            <div className="text-xs text-slate-400 mt-1">₹{seg.total_revenue.toLocaleString()} Gross Volume</div>
            <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Avg Spent / User</span>
              <span className="font-mono text-emerald-400 font-bold">₹{seg.avg_spent.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* RFM Matrix & City Distribution Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* RFM Segment Breakdown */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">RFM Multi-Tier Segmentation</h2>
              <p className="text-xs text-slate-400">Calculated via NTILE(5) scoring across Recency, Frequency & Monetary</p>
            </div>
            <span className="text-xs font-mono text-orange-400 font-semibold">500 Total Profiles</span>
          </div>

          <div className="space-y-3">
            {rfm.map((r) => (
              <div key={r.rfm_segment} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{r.rfm_segment}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${segmentColors[r.rfm_segment] || segmentColors['Regular']}`}>
                      {r.customer_count} Users
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    Avg Orders: <span className="text-slate-200 font-mono">{r.avg_orders}</span> • Avg Spent: <span className="text-slate-200 font-mono">₹{r.avg_spent.toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-emerald-400 font-mono">₹{r.total_revenue.toLocaleString()}</div>
                  <div className="text-xs text-slate-400 font-mono">{r.rev_share}% share</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* City Distribution Chart */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">Metro City Delivery Revenue</h2>
              <p className="text-xs text-slate-400">Total gross delivery sales across all 5 serviced cities</p>
            </div>
            <span className="text-xs font-mono text-blue-400 font-semibold">5 Metros</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cities} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" horizontal={false} />
                <XAxis type="number" stroke="#64748B" fontSize={11} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <YAxis dataKey="City" type="category" stroke="#64748B" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val) => [`₹${val.toLocaleString()}`, 'City Revenue']}
                />
                <Bar dataKey="total_revenue" fill="#3B82F6" radius={[0, 6, 6, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-5 gap-2 mt-4 pt-4 border-t border-slate-800 text-center text-xs">
            {cities.map((c) => (
              <div key={c.City}>
                <div className="text-slate-400 text-[11px] truncate">{c.City}</div>
                <div className="font-bold text-white font-mono mt-0.5">{c.rev_share}%</div>
                <div className="text-[10px] text-slate-400">{c.customer_count} cust</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top 25 Highest Spending Customers Table */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white">Top 25 Lifetime Value Customers</h2>
            <p className="text-xs text-slate-400">SQL Query: RANK() OVER (ORDER BY SUM(Amount) DESC) LIMIT 25</p>
          </div>
          <span className="text-xs font-mono text-slate-400">Total Customer Base: 500</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <th className="py-3 px-3">Rank</th>
                <th className="py-3 px-3">Customer ID</th>
                <th className="py-3 px-3">Name</th>
                <th className="py-3 px-3">City</th>
                <th className="py-3 px-3">Member Since</th>
                <th className="py-3 px-3 text-right">Orders</th>
                <th className="py-3 px-3 text-right">AOV (₹)</th>
                <th className="py-3 px-3 text-right">Lifetime Spent (₹)</th>
                <th className="py-3 px-3 text-center">Segment</th>
                <th className="py-3 px-3 text-center">RFM Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {topCustomers.map((c, i) => (
                <tr key={c.CustomerID} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-3 font-bold text-orange-400">#{i + 1}</td>
                  <td className="py-3 px-3 text-slate-400">CUST-{c.CustomerID}</td>
                  <td className="py-3 px-3 font-sans font-semibold text-white">{c.CustomerName}</td>
                  <td className="py-3 px-3 font-sans text-slate-300">{c.City}</td>
                  <td className="py-3 px-3 text-slate-400">{c.SignupDate}</td>
                  <td className="py-3 px-3 text-right text-slate-300 font-bold">{c.orders}</td>
                  <td className="py-3 px-3 text-right text-slate-300">₹{c.aov.toFixed(2)}</td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-400">₹{c.spent.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center font-sans">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {c.customer_segment}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-sans">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${segmentColors[c.rfm_segment] || segmentColors['Regular']}`}>
                      {c.rfm_segment}
                    </span>
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
