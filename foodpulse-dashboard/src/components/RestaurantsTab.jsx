import React, { useState, useMemo } from 'react'
import { Utensils, Star, DollarSign, ShoppingBag, Search, Filter, ArrowUpDown } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

export default function RestaurantsTab({ data, searchTerm, setSearchTerm }) {
  const [selectedCuisine, setSelectedCuisine] = useState('ALL')
  const [sortBy, setSortBy] = useState('revenue') // 'revenue', 'orders', 'aov', 'rating'
  const [sortAsc, setSortAsc] = useState(false)

  const cuisines = data.cuisine_performance
  const restaurants = data.restaurants

  const cuisineList = ['ALL', ...cuisines.map(c => c.Cuisine)]

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      const matchesCuisine = selectedCuisine === 'ALL' || r.Cuisine === selectedCuisine
      const matchesSearch = !searchTerm ||
        r.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.Cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(r.RestaurantID).includes(searchTerm)
      return matchesCuisine && matchesSearch
    }).sort((a, b) => {
      let valA = a.total_revenue
      let valB = b.total_revenue
      if (sortBy === 'orders') {
        valA = a.total_orders
        valB = b.total_orders
      } else if (sortBy === 'aov') {
        valA = a.average_order_value
        valB = b.average_order_value
      } else if (sortBy === 'rating') {
        valA = a.avg_rating
        valB = b.avg_rating
      }
      return sortAsc ? valA - valB : valB - valA
    })
  }, [restaurants, selectedCuisine, searchTerm, sortBy, sortAsc])

  return (
    <div className="space-y-6">
      {/* Cuisine Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {cuisines.map(c => (
          <div
            key={c.Cuisine}
            onClick={() => setSelectedCuisine(selectedCuisine === c.Cuisine ? 'ALL' : c.Cuisine)}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${
              selectedCuisine === c.Cuisine
                ? 'bg-orange-500/10 border-orange-500 text-white shadow-lg shadow-orange-500/10'
                : 'bg-[#111827] border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 truncate">{c.Cuisine}</div>
            <div className="text-lg font-bold text-white mt-1">₹{(c.revenue / 1000).toFixed(0)}k</div>
            <div className="text-[11px] text-orange-400 font-mono mt-0.5">{c.revenue_share}% share</div>
            <div className="text-[10px] text-slate-400 mt-2 flex justify-between">
              <span>{c.orders} ords</span>
              <span>★ {c.avg_rating}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Cuisine Benchmark Bar Chart */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white">Cuisine Revenue Comparison (₹)</h2>
            <p className="text-xs text-slate-400">Total gross earnings per cuisine category across all partner outlets</p>
          </div>
          <span className="text-xs font-mono text-slate-400">Total: ₹4,097,103.31</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cuisines} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
              <XAxis dataKey="Cuisine" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
                formatter={(val, name) => [`₹${val.toLocaleString()}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#F97316" radius={[6, 6, 0, 0]} maxBarSize={45} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filter and Controls Header */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Cuisine selector tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-orange-400" /> Filter:
            </span>
            {cuisineList.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCuisine(c)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  selectedCuisine === c
                    ? 'bg-orange-500 text-white font-bold shadow-md shadow-orange-500/20'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Sorter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs focus:outline-none focus:border-orange-500"
            >
              <option value="revenue">Revenue (₹)</option>
              <option value="orders">Total Orders</option>
              <option value="aov">Average Order Value</option>
              <option value="rating">Customer Rating</option>
            </select>
            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white"
              title="Toggle sort direction"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 50 Partner Restaurants Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <th className="py-3 px-3">Rank</th>
                <th className="py-3 px-3">ID</th>
                <th className="py-3 px-3">Restaurant Name</th>
                <th className="py-3 px-3">Cuisine</th>
                <th className="py-3 px-3 text-right">Orders</th>
                <th className="py-3 px-3 text-right">Rating</th>
                <th className="py-3 px-3 text-right">AOV (₹)</th>
                <th className="py-3 px-3 text-right">Total Revenue (₹)</th>
                <th className="py-3 px-3 text-right">Revenue Share</th>
                <th className="py-3 px-3 text-center">Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredRestaurants.map((r, idx) => (
                <tr key={r.RestaurantID} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-3 font-bold text-orange-400">#{r.revenue_rank}</td>
                  <td className="py-3 px-3 text-slate-400">#{r.RestaurantID}</td>
                  <td className="py-3 px-3 font-sans font-semibold text-white">{r.Name}</td>
                  <td className="py-3 px-3 font-sans">
                    <span className="px-2 py-0.5 rounded-full text-[11px] bg-slate-800 text-slate-300 border border-slate-700">
                      {r.Cuisine}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300">{r.total_orders}</td>
                  <td className="py-3 px-3 text-right font-sans">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">
                      ★ {r.avg_rating.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300">₹{r.average_order_value.toFixed(2)}</td>
                  <td className="py-3 px-3 text-right font-bold text-emerald-400">₹{r.total_revenue.toLocaleString()}</td>
                  <td className="py-3 px-3 text-right text-slate-400">{r.revenue_percentage}%</td>
                  <td className="py-3 px-3 text-center font-sans">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      r.total_revenue >= 100000
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : r.total_revenue >= 80000
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}>
                      {r.total_revenue >= 100000 ? 'Top Tier' : r.total_revenue >= 80000 ? 'Core Tier' : 'Standard'}
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
