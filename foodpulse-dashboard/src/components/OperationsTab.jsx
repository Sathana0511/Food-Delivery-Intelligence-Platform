import React from 'react'
import { Clock, Calendar, Star, ShoppingBag, CheckCircle2 } from 'lucide-react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts'

export default function OperationsTab({ data }) {
  const dow = data.day_of_week
  const hourly = data.hourly_distribution
  const ratings = data.ratings_distribution
  const recentOrders = data.recent_orders

  return (
    <div className="space-y-6">
      {/* Temporal Overview Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Day of Week Volume */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">Day of the Week Ordering Trends</h2>
              <p className="text-xs text-slate-400">Replicating SQL: GROUP BY DAYNAME(OrderDate), DAYOFWEEK(OrderDate)</p>
            </div>
            <span className="text-xs font-mono text-orange-400 font-semibold">Wednesday Peak</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dow} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(d) => d.slice(0, 3)} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val, name) => [name === 'revenue' ? `₹${val.toLocaleString()}` : `${val} orders`, name === 'revenue' ? 'Revenue' : 'Orders']}
                />
                <Bar dataKey="revenue" fill="#F97316" radius={[6, 6, 0, 0]} maxBarSize={36} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-7 gap-1 mt-4 pt-4 border-t border-slate-800 text-center text-xs">
            {dow.map((d) => (
              <div key={d.day}>
                <div className="text-slate-400 text-[11px] truncate">{d.day.slice(0, 3)}</div>
                <div className="font-bold text-white font-mono mt-0.5">{d.orders}</div>
                <div className="text-[10px] text-orange-400 font-mono">₹{(d.revenue / 1000).toFixed(0)}k</div>
              </div>
            ))}
          </div>
        </div>

        {/* 24-Hour Curve */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">24-Hour Dispatch Rush Pattern</h2>
              <p className="text-xs text-slate-400">Replicating SQL: GROUP BY HOUR(OrderDate) ORDER BY total_orders DESC</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold">Peaks: 11:00 & 20:00</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourly} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="hourGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="hour_label" stroke="#64748B" fontSize={11} tickLine={false} interval={2} />
                <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                  formatter={(val, name) => [`${val} orders`, 'Order Volume']}
                />
                <Area type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2.5} fill="url(#hourGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 mt-4 pt-4 border-t border-slate-800">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Lunch Window: 11:00 - 14:00 (1,080 orders)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Dinner Window: 19:00 - 22:00 (1,385 orders)
            </span>
          </div>
        </div>
      </div>

      {/* Ratings Breakdown Row */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white">Customer Satisfaction Rating Distribution</h2>
            <p className="text-xs text-slate-400">Aggregated across 3,500 customer ratings (Score: 2.5 - 5.0)</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Overall Benchmark:</span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold text-xs">
              ★ 3.76 / 5.0
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {ratings.map((r, i) => (
            <div key={r.bracket} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-amber-400 text-sm font-bold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{r.bracket}</span>
              </div>
              <div className="text-xl font-extrabold text-white mt-2">{r.count.toLocaleString()}</div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">{r.percentage}% of reviews</div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: `${r.percentage * 4}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Live Stream */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white">Real-Time Fulfilled Orders Log (Latest 30)</h2>
            <p className="text-xs text-slate-400">Directly fetched from orders_final table with real customer and restaurant joins</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> Live Stream
          </span>
        </div>

        <div className="overflow-x-auto max-h-96">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-[#111827] z-10">
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <th className="py-3 px-3">Order ID</th>
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">City</th>
                <th className="py-3 px-3">Restaurant</th>
                <th className="py-3 px-3">Cuisine</th>
                <th className="py-3 px-3 text-right">Amount (₹)</th>
                <th className="py-3 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {recentOrders.map((ord) => (
                <tr key={ord.OrderID} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-3 font-bold text-orange-400">#{ord.OrderID}</td>
                  <td className="py-3 px-3 text-slate-400 font-normal">{ord.OrderDateStr}</td>
                  <td className="py-3 px-3 font-sans font-medium text-white">{ord.CustomerName}</td>
                  <td className="py-3 px-3 font-sans text-slate-300">{ord.City}</td>
                  <td className="py-3 px-3 font-sans text-slate-300">{ord.Name}</td>
                  <td className="py-3 px-3 font-sans">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                      {ord.Cuisine}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-400">₹{ord.Amount.toFixed(2)}</td>
                  <td className="py-3 px-3 text-center font-sans">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> Delivered
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
