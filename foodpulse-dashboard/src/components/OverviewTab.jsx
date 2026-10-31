import React from 'react'
import {
  IndianRupee,
  ShoppingBag,
  TrendingUp,
  Users,
  Star,
  Building2,
  Award,
  Clock,
  MapPin,
  ArrowUpRight
} from 'lucide-react'
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts'
import KpiCard from './KpiCard'

const CUISINE_COLORS = ['#F97316', '#3B82F6', '#10B981', '#EC4899', '#8B5CF6', '#F59E0B', '#14B8A6']

export default function OverviewTab({ data, setActiveTab }) {
  const kpis = data.executive_kpis
  const monthly = data.monthly_performance
  const cuisines = data.cuisine_performance
  const cities = data.city_performance
  const topRestaurants = data.restaurants.slice(0, 5)

  // Format currency in INR
  const formatINR = (val) => {
    if (val >= 1000000) return `₹${(val / 1000000).toFixed(2)}M`
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}k`
    return `₹${val.toFixed(2)}`
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard
          title="Total Gross Revenue"
          value={`₹${(kpis.total_revenue / 1000000).toFixed(2)}M`}
          subtext="Total order volume"
          icon={IndianRupee}
          badge="H1 2025"
          badgeColor="orange"
          trend="+7.1% Peak"
        />
        <KpiCard
          title="Total Orders"
          value={kpis.total_orders.toLocaleString()}
          subtext="Orders fulfilled"
          icon={ShoppingBag}
          badge="5,000 Total"
          badgeColor="blue"
          trend="833/mo avg"
        />
        <KpiCard
          title="Average Order Value"
          value={`₹${kpis.average_order_value.toFixed(2)}`}
          subtext="Min ₹100 • Max ₹1,500"
          icon={TrendingUp}
          badge="AOV"
          badgeColor="emerald"
        />
        <KpiCard
          title="Repeat Customers"
          value={`${kpis.repeat_customer_percentage.toFixed(0)}%`}
          subtext="500 of 500 customers"
          icon={Users}
          badge="High Retention"
          badgeColor="purple"
        />
        <KpiCard
          title="Average Rating"
          value={`${kpis.overall_average_rating} ★`}
          subtext="From 3,500 verified reviews"
          icon={Star}
          badge="Score 2.5 - 5.0"
          badgeColor="amber"
        />
        <KpiCard
          title="Rev / Customer"
          value={`₹${(kpis.revenue_per_customer / 1000).toFixed(1)}k`}
          subtext="500 unique clients"
          icon={Building2}
          badge="Avg LTV"
          badgeColor="emerald"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue & Orders Trend (2 cols) */}
        <div className="lg:col-span-2 bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Monthly Revenue & Order Volume
                <span className="text-xs font-normal text-slate-400 font-mono">(Jan 2025 - Jun 2025)</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Tracking total sales (₹) and completed order counts</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-orange-400">
                <span className="w-3 h-3 rounded-sm bg-orange-500"></span> Revenue (₹)
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <span className="w-3 h-1 bg-blue-500 rounded-full"></span> Orders
              </span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={monthly} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
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
                  tickFormatter={(val) => `${val}`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const rev = payload[0]?.value || 0
                      const ord = payload[1]?.value || 0
                      const item = monthly.find(m => m.MonthName === label)
                      return (
                        <div className="bg-slate-900 border border-slate-700/80 rounded-xl p-3 shadow-xl text-xs space-y-1">
                          <div className="font-bold text-white border-b border-slate-800 pb-1">{label} 2025</div>
                          <div className="text-orange-400 font-semibold">Revenue: ₹{rev.toLocaleString()}</div>
                          <div className="text-blue-400">Orders: {ord.toLocaleString()}</div>
                          <div className="text-slate-400">AOV: ₹{item?.aov.toFixed(2)}</div>
                          {item?.growth_percentage !== 0 && (
                            <div className={`font-mono ${item?.growth_percentage > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                              MoM: {item?.growth_percentage > 0 ? '+' : ''}{item?.growth_percentage}%
                            </div>
                          )}
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#F97316"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
                <Bar
                  yAxisId="right"
                  dataKey="orders"
                  barSize={20}
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                  opacity={0.85}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cuisine Share Pie Chart (1 col) */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold text-white">Revenue by Cuisine</h2>
              <span className="text-xs font-mono text-orange-400">7 Cuisines</span>
            </div>
            <p className="text-xs text-slate-400 mb-4">Italian & North Indian command &gt;38% total revenue</p>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cuisines}
                    dataKey="revenue"
                    nameKey="Cuisine"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                  >
                    {cuisines.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CUISINE_COLORS[index % CUISINE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                    contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-2 pt-3 border-t border-slate-800 text-xs">
            {cuisines.slice(0, 4).map((c, i) => (
              <div key={c.Cuisine} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CUISINE_COLORS[i] }}></span>
                  <span className="text-slate-300 font-medium">{c.Cuisine}</span>
                </div>
                <div className="font-mono text-slate-400">
                  <span className="text-white font-semibold">{c.revenue_share}%</span> (₹{(c.revenue / 1000).toFixed(0)}k)
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Highlights & Top Performers Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Top Partner Outlet</span>
            <Award className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-lg font-bold text-white">{kpis.top_restaurant.name}</div>
          <div className="text-xs text-orange-400 mt-0.5">{kpis.top_restaurant.cuisine} Cuisine</div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Total Revenue</span>
            <span className="font-bold text-emerald-400 font-mono">₹{kpis.top_restaurant.revenue.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Top Metro City</span>
            <MapPin className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-lg font-bold text-white">{kpis.top_city.name}</div>
          <div className="text-xs text-blue-400 mt-0.5">{kpis.top_city.customers} Active Customers ({kpis.top_city.share}% Share)</div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">City Revenue</span>
            <span className="font-bold text-emerald-400 font-mono">₹{kpis.top_city.revenue.toLocaleString()}</span>
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Peak Hour Rush</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-lg font-bold text-white">20:00 (8:00 PM)</div>
          <div className="text-xs text-amber-400 mt-0.5">379 Orders • ₹308.6k Revenue</div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Secondary Peak</span>
            <span className="font-medium text-slate-300 font-mono">11:00 AM (375 orders)</span>
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-semibold uppercase tracking-wider">Busiest Day</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-white">Wednesday</div>
          <div className="text-xs text-emerald-400 mt-0.5">770 Orders • ₹628,454.56</div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400">Day Revenue Share</span>
            <span className="font-bold text-emerald-400 font-mono">15.34% of Total</span>
          </div>
        </div>
      </div>

      {/* Top 5 Restaurants Quick Preview Table */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white">Top Performing Restaurants by Revenue</h2>
            <p className="text-xs text-slate-400">Ranked using SQL window function RANK() OVER (ORDER BY SUM(Amount) DESC)</p>
          </div>
          <button
            onClick={() => setActiveTab('restaurants')}
            className="flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            View all 50 restaurants <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                <th className="py-3 px-3">Rank</th>
                <th className="py-3 px-3">Restaurant ID</th>
                <th className="py-3 px-3">Outlet Name</th>
                <th className="py-3 px-3">Cuisine</th>
                <th className="py-3 px-3 text-right">Total Orders</th>
                <th className="py-3 px-3 text-right">Avg Rating</th>
                <th className="py-3 px-3 text-right">AOV (₹)</th>
                <th className="py-3 px-3 text-right">Total Revenue (₹)</th>
                <th className="py-3 px-3 text-right">Share (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {topRestaurants.map((r) => (
                <tr key={r.RestaurantID} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-3 font-bold text-orange-400">#{r.revenue_rank}</td>
                  <td className="py-3 px-3 text-slate-400">REST-{r.RestaurantID}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
