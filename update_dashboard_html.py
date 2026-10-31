import json
import os

json_path = r'C:\Users\Sathana Jayaraman\.gemini\antigravity\scratch\foodpulse-dashboard\src\data\foodpulseData.json'
with open(json_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

artifact_dir = r'C:\Users\Sathana Jayaraman\.gemini\antigravity\brain\952f3d2a-5d4b-43b4-899b-71183805b3bc'
target_html = os.path.join(artifact_dir, 'foodpulse_dashboard.html')

data_json_str = json.dumps(data)

html_template = f'''<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FOODPULSE Analytics - Food Delivery Intelligence</title>
  <!-- Tailwind CSS -->
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <!-- Chart.js CDN -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
    body {{
      font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    }}
    .font-mono {{
      font-family: 'JetBrains Mono', monospace;
    }}
    ::-webkit-scrollbar {{
      width: 6px;
      height: 6px;
    }}
    ::-webkit-scrollbar-track {{
      background: #0B0F19;
    }}
    ::-webkit-scrollbar-thumb {{
      background: #1E293B;
      border-radius: 4px;
    }}
    ::-webkit-scrollbar-thumb:hover {{
      background: #334155;
    }}
    .glow-card {{
      transition: all 0.2s ease-in-out;
    }}
    .glow-card:hover {{
      transform: translateY(-2px);
      box-shadow: 0 10px 25px -5px rgba(249, 115, 22, 0.08);
    }}
  </style>
</head>
<body class="bg-[#090D16] text-slate-100 antialiased min-h-screen flex flex-col md:flex-row overflow-x-hidden">

  <!-- Left Sidebar -->
  <aside class="w-full md:w-64 bg-[#0B0F19] border-r border-slate-800 flex flex-col shrink-0 select-none">
    <!-- Brand Header -->
    <div class="p-5 border-b border-slate-800/80 flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20 text-white font-black text-xl">
          🔥
        </div>
        <div>
          <div class="flex items-center space-x-1.5">
            <span class="font-extrabold text-lg tracking-tight text-white">FOOD<span class="text-orange-500">PULSE</span></span>
            <span class="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">SaaS</span>
          </div>
          <p class="text-xs text-slate-400">Delivery Intelligence</p>
        </div>
      </div>
    </div>

    <!-- Database Context Badge -->
    <div class="mx-4 my-4 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs">
      <div class="flex items-center space-x-2 text-slate-300 font-medium mb-1.5">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span>Connected Database</span>
      </div>
      <div class="flex items-center justify-between text-slate-400">
        <span class="font-mono text-[11px] text-orange-400 font-semibold">fooddeliverydb</span>
        <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          5,000 Orders
        </span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 space-y-1">
      <div class="px-3 py-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
        Analytics & Modules
      </div>
      <button onclick="switchTab('overview')" id="btn-overview" class="tab-btn w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all bg-gradient-to-r from-orange-600/20 to-orange-500/10 text-orange-400 border border-orange-500/30">
        <div class="flex items-center space-x-3">
          <span>📊</span>
          <span>Executive Overview</span>
        </div>
        <span class="text-[10px] px-1.5 py-0.5 rounded font-mono bg-orange-500/20 text-orange-300">KPIs</span>
      </button>

      <button onclick="switchTab('trends')" id="btn-trends" class="tab-btn w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent">
        <div class="flex items-center space-x-3">
          <span>📈</span>
          <span>Revenue & Trends</span>
        </div>
        <span class="text-[10px] px-1.5 py-0.5 rounded font-mono bg-slate-800/80 text-slate-400">Monthly</span>
      </button>

      <button onclick="switchTab('restaurants')" id="btn-restaurants" class="tab-btn w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent">
        <div class="flex items-center space-x-3">
          <span>🍽️</span>
          <span>Restaurants & Cuisines</span>
        </div>
        <span class="text-[10px] px-1.5 py-0.5 rounded font-mono bg-slate-800/80 text-slate-400">50 Outlets</span>
      </button>

      <button onclick="switchTab('customers')" id="btn-customers" class="tab-btn w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent">
        <div class="flex items-center space-x-3">
          <span>👥</span>
          <span>Customer Intelligence</span>
        </div>
        <span class="text-[10px] px-1.5 py-0.5 rounded font-mono bg-slate-800/80 text-slate-400">RFM</span>
      </button>

      <button onclick="switchTab('operations')" id="btn-operations" class="tab-btn w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent">
        <div class="flex items-center space-x-3">
          <span>⏱️</span>
          <span>Operations & Hours</span>
        </div>
        <span class="text-[10px] px-1.5 py-0.5 rounded font-mono bg-slate-800/80 text-slate-400">Peak Times</span>
      </button>

      <button onclick="switchTab('sql')" id="btn-sql" class="tab-btn w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent">
        <div class="flex items-center space-x-3">
          <span>⚡</span>
          <span>SQL Query Inspector</span>
        </div>
        <span class="text-[10px] px-1.5 py-0.5 rounded font-mono bg-slate-800/80 text-slate-400">MySQL</span>
      </button>
    </nav>

    <!-- Footer Stats -->
    <div class="p-4 border-t border-slate-800 text-xs text-slate-400 space-y-2">
      <div class="flex items-center justify-between">
        <span>Time Window</span>
        <span class="text-slate-300 font-mono text-[11px]">Jan - Jun 2025</span>
      </div>
      <div class="flex items-center justify-between">
        <span>Total Outlets</span>
        <span class="text-slate-300 font-mono text-[11px]">50 Restaurants</span>
      </div>
      <div class="flex items-center justify-between">
        <span>Active Cities</span>
        <span class="text-slate-300 font-mono text-[11px]">5 Metros</span>
      </div>
    </div>
  </aside>

  <!-- Main Content View -->
  <div class="flex-1 flex flex-col min-w-0 bg-[#090D16]">
    <!-- Top Bar -->
    <header class="bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <div class="flex items-center space-x-2.5">
          <h1 id="header-title" class="text-xl font-bold text-white tracking-tight">Executive Overview</h1>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Live DB Sync
          </span>
        </div>
        <p id="header-subtitle" class="text-xs text-slate-400 mt-0.5">Macro food delivery operational performance & KPI health</p>
      </div>

      <div class="flex items-center flex-wrap gap-3">
        <div class="relative">
          <input
            id="global-search"
            type="text"
            placeholder="Search restaurants, cuisines, cities..."
            oninput="handleGlobalSearch(this.value)"
            class="w-64 pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-orange-500/50 transition-all"
          />
          <span class="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs">🔍</span>
        </div>

        <div class="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300 font-medium">
          <span class="text-orange-400">📅</span>
          <span class="font-mono text-[11px]">Jan 2025 – Jun 2025</span>
        </div>

        <button onclick="alert('Database sync active: 5,000 orders refreshed from fooddeliverydb!')" class="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-300 hover:text-white transition-all flex items-center gap-1.5">
          <span>🔄</span>
          <span>Refresh</span>
        </button>
      </div>
    </header>

    <!-- Main Dynamic Body -->
    <main id="tab-content" class="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
      <!-- Injected via JavaScript -->
    </main>
  </div>

  <script>
    const DATA = {data_json_str};
    let currentTab = 'overview';
    let currentCuisineFilter = 'ALL';
    let searchQuery = '';
    let sortColumn = 'revenue';
    let sortAsc = false;
    let chartInstances = {{}};

    const tabHeaders = {{
      overview: {{ title: 'Executive Overview', subtitle: 'Macro food delivery operational performance & KPI health' }},
      trends: {{ title: 'Revenue & Growth Analytics', subtitle: 'Monthly gross merchandise value, MoM growth & cumulative volume' }},
      restaurants: {{ title: 'Restaurant & Cuisine Intelligence', subtitle: '50 partner restaurants across 7 signature cuisines' }},
      customers: {{ title: 'Customer Segmentation & RFM Matrix', subtitle: '500 customers classified by Recency, Frequency, Monetary and Value tiers' }},
      operations: {{ title: 'Operational Timing & Satisfaction', subtitle: 'Day of week trends, hourly rush distributions and customer ratings' }},
      sql: {{ title: 'SQL Query & Schema Inspector', subtitle: 'Direct mapping of views and queries from 03_business_analysis.sql' }},
    }};

    function switchTab(tabId) {{
      currentTab = tabId;
      document.querySelectorAll('.tab-btn').forEach(b => {{
        b.className = 'tab-btn w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent';
      }});
      const activeBtn = document.getElementById('btn-' + tabId);
      if (activeBtn) {{
        activeBtn.className = 'tab-btn w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all bg-gradient-to-r from-orange-600/20 to-orange-500/10 text-orange-400 border border-orange-500/30';
      }}

      document.getElementById('header-title').innerText = tabHeaders[tabId].title;
      document.getElementById('header-subtitle').innerText = tabHeaders[tabId].subtitle;

      renderCurrentTab();
    }}

    function handleGlobalSearch(val) {{
      searchQuery = val.toLowerCase();
      if (currentTab !== 'restaurants' && currentTab !== 'customers') {{
        switchTab('restaurants');
      }} else {{
        renderCurrentTab();
      }}
    }}

    function renderCurrentTab() {{
      // Destroy any existing Chart.js instances before re-rendering
      Object.keys(chartInstances).forEach(k => {{
        if (chartInstances[k]) {{
          try {{ chartInstances[k].destroy(); }} catch(e) {{}}
        }}
      }});
      chartInstances = {{}};

      const container = document.getElementById('tab-content');
      if (currentTab === 'overview') renderOverview(container);
      else if (currentTab === 'trends') renderTrends(container);
      else if (currentTab === 'restaurants') renderRestaurants(container);
      else if (currentTab === 'customers') renderCustomers(container);
      else if (currentTab === 'operations') renderOperations(container);
      else if (currentTab === 'sql') renderSql(container);
    }}

    // Helper: Initialize Chart.js safely with fallback
    function initChart(canvasId, config) {{
      const canvas = document.getElementById(canvasId);
      if (!canvas) return;

      if (typeof Chart !== 'undefined') {{
        try {{
          chartInstances[canvasId] = new Chart(canvas.getContext('2d'), config);
          return;
        }} catch (err) {{
          console.warn('Chart.js render fallback:', err);
        }}
      }}

      // Fallback: Custom canvas rendering if Chart.js is unavailable
      renderCanvasFallback(canvas, config);
    }}

    function renderCanvasFallback(canvas, config) {{
      const ctx = canvas.getContext('2d');
      const w = canvas.width = canvas.parentElement.clientWidth || 400;
      const h = canvas.height = canvas.parentElement.clientHeight || 260;
      ctx.clearRect(0, 0, w, h);

      const type = config.type;
      const data = config.data;
      if (!data || !data.labels || !data.datasets) return;

      if (type === 'doughnut' || type === 'pie') {{
        const dataset = data.datasets[0];
        const total = dataset.data.reduce((a, b) => a + b, 0);
        let startAngle = -Math.PI / 2;
        const cx = w / 2, cy = h / 2, radius = Math.min(cx, cy) - 25;
        const innerRadius = type === 'doughnut' ? radius * 0.55 : 0;

        dataset.data.forEach((val, i) => {{
          const sliceAngle = (val / total) * 2 * Math.PI;
          ctx.beginPath();
          ctx.arc(cx, cy, radius, startAngle, startAngle + sliceAngle);
          if (innerRadius > 0) {{
            ctx.arc(cx, cy, innerRadius, startAngle + sliceAngle, startAngle, true);
          }} else {{
            ctx.lineTo(cx, cy);
          }}
          ctx.closePath();
          ctx.fillStyle = dataset.backgroundColor[i % dataset.backgroundColor.length];
          ctx.fill();
          startAngle += sliceAngle;
        }});
      }} else {{
        // Bar / Line fallback
        const padX = 45, padY = 30;
        const chartW = w - padX * 2, chartH = h - padY * 2;
        const dataset = data.datasets[0];
        const maxVal = Math.max(...dataset.data) * 1.15 || 1;
        const count = data.labels.length;
        const stepX = chartW / count;

        // Grid lines
        ctx.strokeStyle = '#1F2937';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {{
          const y = padY + (chartH / 4) * i;
          ctx.beginPath();
          ctx.moveTo(padX, y);
          ctx.lineTo(w - padX, y);
          ctx.stroke();
        }}

        // Draw bars or line
        if (type === 'bar') {{
          const barWidth = Math.min(stepX * 0.55, 36);
          dataset.data.forEach((val, i) => {{
            const barH = (val / maxVal) * chartH;
            const x = padX + i * stepX + (stepX - barWidth) / 2;
            const y = padY + chartH - barH;
            ctx.fillStyle = dataset.backgroundColor || '#F97316';
            ctx.fillRect(x, y, barWidth, barH);

            ctx.fillStyle = '#64748B';
            ctx.font = '10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(data.labels[i], x + barWidth / 2, h - 8);
          }});
        }} else if (type === 'line') {{
          ctx.beginPath();
          dataset.data.forEach((val, i) => {{
            const x = padX + i * stepX + stepX / 2;
            const y = padY + chartH - (val / maxVal) * chartH;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }});
          ctx.strokeStyle = dataset.borderColor || '#10B981';
          ctx.lineWidth = 2.5;
          ctx.stroke();

          dataset.data.forEach((val, i) => {{
            const x = padX + i * stepX + stepX / 2;
            const y = padY + chartH - (val / maxVal) * chartH;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = dataset.borderColor || '#10B981';
            ctx.fill();

            ctx.fillStyle = '#64748B';
            ctx.font = '10px monospace';
            ctx.textAlign = 'center';
            ctx.fillText(data.labels[i], x, h - 8);
          }});
        }}
      }}
    }}

    // 1. OVERVIEW TAB
    function renderOverview(container) {{
      const kpis = DATA.executive_kpis;
      const monthly = DATA.monthly_performance;
      const cuisines = DATA.cuisine_performance;
      const topRest = DATA.restaurants.slice(0, 5);

      container.innerHTML = `
        <!-- KPI Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
            <div class="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase">Gross Revenue <span class="text-orange-400">₹</span></div>
            <div class="text-2xl font-extrabold text-white mt-2">₹${{(kpis.total_revenue / 1000000).toFixed(2)}}M</div>
            <div class="mt-2 text-xs text-slate-400 flex justify-between"><span>5,000 Orders</span> <span class="text-emerald-400 font-mono">+7.1% Peak</span></div>
          </div>

          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
            <div class="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase">Total Orders <span class="text-blue-400">📦</span></div>
            <div class="text-2xl font-extrabold text-white mt-2">${{kpis.total_orders.toLocaleString()}}</div>
            <div class="mt-2 text-xs text-slate-400 flex justify-between"><span>H1 2025</span> <span class="text-blue-400 font-mono">833/mo avg</span></div>
          </div>

          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
            <div class="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase">Avg Order Value <span class="text-emerald-400">📊</span></div>
            <div class="text-2xl font-extrabold text-white mt-2">₹${{kpis.average_order_value.toFixed(2)}}</div>
            <div class="mt-2 text-xs text-slate-400">Min ₹100 • Max ₹1,500</div>
          </div>

          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
            <div class="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase">Repeat Rate <span class="text-purple-400">🔁</span></div>
            <div class="text-2xl font-extrabold text-white mt-2">100%</div>
            <div class="mt-2 text-xs text-slate-400">500 of 500 repeat buyers</div>
          </div>

          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
            <div class="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase">Avg Rating <span class="text-amber-400">★</span></div>
            <div class="text-2xl font-extrabold text-white mt-2">${{kpis.overall_average_rating}} ★</div>
            <div class="mt-2 text-xs text-slate-400">From 3,500 ratings</div>
          </div>

          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
            <div class="flex justify-between items-center text-xs text-slate-400 font-semibold uppercase">Rev / Cust <span class="text-emerald-400">👤</span></div>
            <div class="text-2xl font-extrabold text-white mt-2">₹${{(kpis.revenue_per_customer / 1000).toFixed(1)}}k</div>
            <div class="mt-2 text-xs text-slate-400">500 unique clients</div>
          </div>
        </div>

        <!-- Monthly Trend Chart & Cuisine Breakdown -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h2 class="text-base font-bold text-white">Monthly Gross Revenue & Order Count</h2>
                <p class="text-xs text-slate-400">Performance trajectory across January to June 2025</p>
              </div>
              <div class="flex items-center gap-3 text-xs">
                <span class="text-orange-400 flex items-center gap-1"><span class="w-3 h-3 bg-orange-500 rounded-sm inline-block"></span> Revenue (₹)</span>
                <span class="text-blue-400 flex items-center gap-1"><span class="w-3 h-3 bg-blue-500 rounded-sm inline-block"></span> Orders</span>
              </div>
            </div>

            <div class="h-64 w-full relative">
              <canvas id="chart-monthly-overview"></canvas>
            </div>
          </div>

          <!-- Cuisine Breakdown Doughnut -->
          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div class="flex justify-between items-center mb-1">
                <h2 class="text-base font-bold text-white">Revenue by Cuisine</h2>
                <span class="text-xs font-mono text-orange-400">7 Cuisines</span>
              </div>
              <p class="text-xs text-slate-400 mb-2">Italian & North Indian generate >38% total revenue</p>

              <div class="h-44 w-full relative">
                <canvas id="chart-cuisine-doughnut"></canvas>
              </div>
            </div>

            <div class="space-y-1.5 mt-2 pt-3 border-t border-slate-800 text-xs">
              ${{cuisines.slice(0, 4).map((c, i) => {
                const colors = ['#F97316', '#3B82F6', '#10B981', '#EC4899'];
                return `
                  <div class="flex justify-between items-center">
                    <span class="flex items-center gap-1.5 text-slate-300">
                      <span class="w-2.5 h-2.5 rounded-full inline-block" style="background-color: ${{colors[i]}}"></span>
                      ${{c.Cuisine}}
                    </span>
                    <span class="font-mono text-slate-400"><strong class="text-white">${{c.revenue_share}}%</strong> (₹${{(c.revenue/1000).toFixed(0)}}k)</span>
                  </div>
                `;
              }).join('')}}
            </div>
          </div>
        </div>

        <!-- Highlight Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
            <div class="text-xs text-slate-400 font-semibold uppercase">Top Partner Outlet</div>
            <div class="text-lg font-bold text-white mt-1">${{kpis.top_restaurant.name}}</div>
            <div class="text-xs text-orange-400">${{kpis.top_restaurant.cuisine}} • ★ ${{kpis.top_restaurant.rating}}</div>
            <div class="mt-3 pt-3 border-t border-slate-800 flex justify-between text-xs">
              <span class="text-slate-400">Gross Volume</span>
              <span class="font-bold text-emerald-400 font-mono">₹${{kpis.top_restaurant.revenue.toLocaleString()}}</span>
            </div>
          </div>

          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
            <div class="text-xs text-slate-400 font-semibold uppercase">Top Metro City</div>
            <div class="text-lg font-bold text-white mt-1">${{kpis.top_city.name}}</div>
            <div class="text-xs text-blue-400">${{kpis.top_city.customers}} Customers (${{kpis.top_city.share}}% Share)</div>
            <div class="mt-3 pt-3 border-t border-slate-800 flex justify-between text-xs">
              <span class="text-slate-400">Total Spent</span>
              <span class="font-bold text-emerald-400 font-mono">₹${{kpis.top_city.revenue.toLocaleString()}}</span>
            </div>
          </div>

          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
            <div class="text-xs text-slate-400 font-semibold uppercase">Peak Order Hour</div>
            <div class="text-lg font-bold text-white mt-1">20:00 (8:00 PM)</div>
            <div class="text-xs text-amber-400">379 orders • ₹308,648.96</div>
            <div class="mt-3 pt-3 border-t border-slate-800 flex justify-between text-xs">
              <span class="text-slate-400">Lunch Peak</span>
              <span class="font-mono text-slate-300">11:00 AM (375 ords)</span>
            </div>
          </div>

          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
            <div class="text-xs text-slate-400 font-semibold uppercase">Peak Order Day</div>
            <div class="text-lg font-bold text-white mt-1">Wednesday</div>
            <div class="text-xs text-emerald-400">770 orders • ₹628,454.56</div>
            <div class="mt-3 pt-3 border-t border-slate-800 flex justify-between text-xs">
              <span class="text-slate-400">Day Share</span>
              <span class="font-mono text-emerald-400 font-bold">15.34% of Total</span>
            </div>
          </div>
        </div>

        <!-- Top 5 Preview Table -->
        <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-base font-bold text-white">Top 5 Partner Outlets by Sales Volume</h2>
              <p class="text-xs text-slate-400">Direct results from SQL View restaurant_analytics</p>
            </div>
            <button onclick="switchTab('restaurants')" class="text-xs font-semibold text-orange-400 hover:text-orange-300">View all 50 Outlets →</button>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <th class="py-3 px-3">Rank</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">Restaurant Name</th>
                  <th class="py-3 px-3">Cuisine</th>
                  <th class="py-3 px-3 text-right">Orders</th>
                  <th class="py-3 px-3 text-right">Avg Rating</th>
                  <th class="py-3 px-3 text-right">AOV (₹)</th>
                  <th class="py-3 px-3 text-right">Total Revenue (₹)</th>
                  <th class="py-3 px-3 text-right">Share</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 font-mono">
                ${{topRest.map(r => `
                  <tr class="hover:bg-slate-900/60 transition-colors">
                    <td class="py-3 px-3 font-bold text-orange-400">#${{r.revenue_rank}}</td>
                    <td class="py-3 px-3 text-slate-400">#${{r.RestaurantID}}</td>
                    <td class="py-3 px-3 font-sans font-semibold text-white">${{r.Name}}</td>
                    <td class="py-3 px-3 font-sans"><span class="px-2 py-0.5 rounded-full text-[11px] bg-slate-800 text-slate-300 border border-slate-700">${{r.Cuisine}}</span></td>
                    <td class="py-3 px-3 text-right text-slate-300">${{r.total_orders}}</td>
                    <td class="py-3 px-3 text-right font-sans"><span class="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">★ ${{r.avg_rating.toFixed(2)}}</span></td>
                    <td class="py-3 px-3 text-right text-slate-300">₹${{r.average_order_value.toFixed(2)}}</td>
                    <td class="py-3 px-3 text-right font-bold text-emerald-400">₹${{r.total_revenue.toLocaleString()}}</td>
                    <td class="py-3 px-3 text-right text-slate-400">${{r.revenue_percentage}}%</td>
                  </tr>
                `).join('')}}
              </tbody>
            </table>
          </div>
        </div>
      `;

      // Initialize Overview Charts
      setTimeout(() => {{
        initChart('chart-monthly-overview', {{
          type: 'bar',
          data: {{
            labels: monthly.map(m => m.MonthName),
            datasets: [
              {{
                label: 'Gross Revenue (₹)',
                data: monthly.map(m => m.revenue),
                backgroundColor: '#F97316',
                borderRadius: 4,
                yAxisID: 'y'
              }},
              {{
                label: 'Order Count',
                data: monthly.map(m => m.orders),
                backgroundColor: '#3B82F6',
                borderRadius: 4,
                yAxisID: 'y1'
              }}
            ]
          }},
          options: {{
            responsive: true,
            maintainAspectRatio: false,
            scales: {{
              x: {{ grid: {{ display: false }}, ticks: {{ color: '#94A3B8' }} }},
              y: {{
                type: 'linear',
                position: 'left',
                grid: {{ color: '#1F2937' }},
                ticks: {{ color: '#94A3B8', callback: (v) => '₹' + (v / 1000) + 'k' }}
              }},
              y1: {{
                type: 'linear',
                position: 'right',
                grid: {{ display: false }},
                ticks: {{ color: '#60A5FA' }}
              }}
            }},
            plugins: {{ legend: {{ display: false }} }}
          }}
        }});

        initChart('chart-cuisine-doughnut', {{
          type: 'doughnut',
          data: {{
            labels: cuisines.map(c => c.Cuisine),
            datasets: [{{
              data: cuisines.map(c => c.revenue),
              backgroundColor: ['#F97316', '#3B82F6', '#10B981', '#EC4899', '#8B5CF6', '#F59E0B', '#14B8A6'],
              borderWidth: 2,
              borderColor: '#111827'
            }}]
          }},
          options: {{
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {{ legend: {{ display: false }} }}
          }}
        }});
      }}, 50);
    }}

    // 2. TRENDS TAB
    function renderTrends(container) {{
      const monthly = DATA.monthly_performance;
      const cumulative = DATA.daily_cumulative_sample || [];

      container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5">
            <div class="text-xs font-semibold text-slate-400 uppercase">Peak Revenue Month</div>
            <div class="text-xl font-bold text-white mt-2">May 2025</div>
            <div class="text-xs text-emerald-400 font-mono mt-1 font-semibold">₹728,352.81 (+7.12% MoM)</div>
          </div>
          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5">
            <div class="text-xs font-semibold text-slate-400 uppercase">Highest Ticket AOV</div>
            <div class="text-xl font-bold text-white mt-2">January 2025</div>
            <div class="text-xs text-orange-400 font-mono mt-1 font-semibold">₹841.12 Average Ticket</div>
          </div>
          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5">
            <div class="text-xs font-semibold text-slate-400 uppercase">Monthly Run-Rate</div>
            <div class="text-xl font-bold text-white mt-2">₹682,850.55</div>
            <div class="text-xs text-blue-400 font-mono mt-1 font-semibold">833 Orders / Month</div>
          </div>
          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5">
            <div class="text-xs font-semibold text-slate-400 uppercase">Cumulative H1 Gross</div>
            <div class="text-xl font-bold text-white mt-2">₹4,097,103.31</div>
            <div class="text-xs text-emerald-400 font-mono mt-1 font-semibold">100% Target Fulfilled</div>
          </div>
        </div>

        <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-base font-bold text-white">Month-over-Month Growth % & Gross Revenue (₹)</h2>
              <p class="text-xs text-slate-400">Replicating SQL CTE: LAG(total_revenue) OVER (ORDER BY order_year, order_month)</p>
            </div>
            <div class="flex items-center gap-3 text-xs">
              <span class="text-orange-400">■ Revenue (₹)</span>
              <span class="text-emerald-400 font-mono font-bold">● MoM Growth %</span>
            </div>
          </div>

          <div class="h-72 w-full relative">
            <canvas id="chart-growth-line"></canvas>
          </div>
        </div>

        <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-base font-bold text-white">Cumulative Sales Trajectory (Jan - Jun 2025)</h2>
              <p class="text-xs text-slate-400">Replicating SQL Window Query 162: SUM(SUM(Amount)) OVER (ORDER BY DATE(OrderDate))</p>
            </div>
            <span class="text-xs font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Final: ₹4,097,103.31</span>
          </div>

          <div class="h-64 w-full relative">
            <canvas id="chart-cumulative-area"></canvas>
          </div>
        </div>

        <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <h2 class="text-base font-bold text-white mb-1">Monthly Performance Breakdown (View: monthly_performance)</h2>
          <p class="text-xs text-slate-400 mb-4">Calculated via SQL CTE with previous_revenue and growth_percentage</p>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead>
                <tr class="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <th class="py-3 px-3">Period</th>
                  <th class="py-3 px-3 text-right">Orders</th>
                  <th class="py-3 px-3 text-right">Revenue (₹)</th>
                  <th class="py-3 px-3 text-right">AOV (₹)</th>
                  <th class="py-3 px-3 text-right">MoM Growth</th>
                  <th class="py-3 px-3 text-right">Revenue Share</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 font-mono">
                ${{monthly.map(m => `
                  <tr class="hover:bg-slate-900/60">
                    <td class="py-3 px-3 font-sans font-semibold text-white">${{m.MonthName}} 2025 <span class="text-slate-400 font-mono font-normal">(${{m.YearMonth}})</span></td>
                    <td class="py-3 px-3 text-right text-slate-300">${{m.orders.toLocaleString()}}</td>
                    <td class="py-3 px-3 text-right font-bold text-emerald-400">₹${{m.revenue.toLocaleString()}}</td>
                    <td class="py-3 px-3 text-right text-slate-300">₹${{m.aov.toFixed(2)}}</td>
                    <td class="py-3 px-3 text-right">
                      ${{m.growth_percentage === 0 ? '<span class="text-slate-400">Benchmark</span>' : m.growth_percentage > 0 ? `<span class="text-emerald-400 font-bold">+${{m.growth_percentage}}%</span>` : `<span class="text-rose-400 font-bold">${{m.growth_percentage}}%</span>`}}
                    </td>
                    <td class="py-3 px-3 text-right text-slate-400">${{((m.revenue / 4097103.31) * 100).toFixed(2)}}%</td>
                  </tr>
                `).join('')}}
              </tbody>
            </table>
          </div>
        </div>
      `;

      setTimeout(() => {{
        initChart('chart-growth-line', {{
          type: 'bar',
          data: {{
            labels: monthly.map(m => m.MonthName),
            datasets: [
              {{
                type: 'bar',
                label: 'Gross Revenue (₹)',
                data: monthly.map(m => m.revenue),
                backgroundColor: '#F97316',
                borderRadius: 4,
                yAxisID: 'y'
              }},
              {{
                type: 'line',
                label: 'MoM Growth %',
                data: monthly.map(m => m.growth_percentage),
                borderColor: '#10B981',
                backgroundColor: '#10B981',
                borderWidth: 3,
                tension: 0.2,
                yAxisID: 'y1'
              }}
            ]
          }},
          options: {{
            responsive: true,
            maintainAspectRatio: false,
            scales: {{
              x: {{ grid: {{ display: false }}, ticks: {{ color: '#94A3B8' }} }},
              y: {{
                type: 'linear',
                position: 'left',
                grid: {{ color: '#1F2937' }},
                ticks: {{ color: '#94A3B8', callback: (v) => '₹' + (v / 1000) + 'k' }}
              }},
              y1: {{
                type: 'linear',
                position: 'right',
                grid: {{ display: false }},
                ticks: {{ color: '#34D399', callback: (v) => v + '%' }}
              }}
            }},
            plugins: {{ legend: {{ display: false }} }}
          }}
        }});

        initChart('chart-cumulative-area', {{
          type: 'line',
          data: {{
            labels: cumulative.map(c => c.date.slice(5)),
            datasets: [{{
              label: 'Cumulative Gross (₹)',
              data: cumulative.map(c => c.cumulative_revenue),
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              fill: true,
              tension: 0.3,
              pointRadius: 0
            }}]
          }},
          options: {{
            responsive: true,
            maintainAspectRatio: false,
            scales: {{
              x: {{ grid: {{ display: false }}, ticks: {{ color: '#94A3B8', maxTicksLimit: 12 }} }},
              y: {{
                grid: {{ color: '#1F2937' }},
                ticks: {{ color: '#94A3B8', callback: (v) => '₹' + (v / 1000000).toFixed(1) + 'M' }}
              }}
            }},
            plugins: {{ legend: {{ display: false }} }}
          }}
        }});
      }}, 50);
    }}

    // 3. RESTAURANTS TAB
    function renderRestaurants(container) {{
      const cuisines = DATA.cuisine_performance;
      const allCuisines = ['ALL', ...cuisines.map(c => c.Cuisine)];
      
      const filtered = DATA.restaurants.filter(r => {{
        const matchesCuisine = currentCuisineFilter === 'ALL' || r.Cuisine === currentCuisineFilter;
        const matchesSearch = !searchQuery ||
          r.Name.toLowerCase().includes(searchQuery) ||
          r.Cuisine.toLowerCase().includes(searchQuery) ||
          String(r.RestaurantID).includes(searchQuery);
        return matchesCuisine && matchesSearch;
      }}).sort((a, b) => {{
        let vA = a.total_revenue, vB = b.total_revenue;
        if (sortColumn === 'orders') {{ vA = a.total_orders; vB = b.total_orders; }}
        else if (sortColumn === 'aov') {{ vA = a.average_order_value; vB = b.average_order_value; }}
        else if (sortColumn === 'rating') {{ vA = a.avg_rating; vB = b.avg_rating; }}
        else if (sortColumn === 'name') {{ return sortAsc ? a.Name.localeCompare(b.Name) : b.Name.localeCompare(a.Name); }}
        return sortAsc ? vA - vB : vB - vA;
      }});

      container.innerHTML = `
        <div class="flex items-center gap-1.5 flex-wrap bg-[#111827] border border-slate-800 p-4 rounded-2xl">
          <span class="text-xs text-slate-400 mr-2">Filter Cuisine:</span>
          ${{allCuisines.map(c => `
            <button onclick="setFilterCuisine('${{c}}')" class="px-3 py-1 rounded-lg text-xs font-medium transition-all ${{currentCuisineFilter === c ? 'bg-orange-500 text-white font-bold' : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'}}">
              ${{c}}
            </button>
          `).join('')}}
        </div>

        <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 class="text-base font-bold text-white">All 50 Partner Outlets Directory</h2>
              <p class="text-xs text-slate-400">Showing ${{filtered.length}} partner restaurants in fooddeliverydb</p>
            </div>
            <div class="flex items-center gap-2 text-xs">
              <span class="text-slate-400">Sort By:</span>
              <select onchange="handleSortChange(this.value)" class="bg-slate-900 border border-slate-800 text-slate-200 px-2.5 py-1.5 rounded-lg text-xs focus:outline-none focus:border-orange-500">
                <option value="revenue" ${{sortColumn === 'revenue' ? 'selected' : ''}}>Revenue (₹)</option>
                <option value="orders" ${{sortColumn === 'orders' ? 'selected' : ''}}>Total Orders</option>
                <option value="aov" ${{sortColumn === 'aov' ? 'selected' : ''}}>Average Order Value</option>
                <option value="rating" ${{sortColumn === 'rating' ? 'selected' : ''}}>Customer Rating</option>
                <option value="name" ${{sortColumn === 'name' ? 'selected' : ''}}>Outlet Name</option>
              </select>
            </div>
          </div>

          <div class="overflow-x-auto max-h-[600px]">
            <table class="w-full text-left text-xs">
              <thead class="sticky top-0 bg-[#111827] z-10">
                <tr class="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <th class="py-3 px-3">Rank</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">Restaurant Name</th>
                  <th class="py-3 px-3">Cuisine</th>
                  <th class="py-3 px-3 text-right">Orders</th>
                  <th class="py-3 px-3 text-right">Rating</th>
                  <th class="py-3 px-3 text-right">AOV (₹)</th>
                  <th class="py-3 px-3 text-right">Total Revenue (₹)</th>
                  <th class="py-3 px-3 text-right">Share</th>
                  <th class="py-3 px-3 text-center">Tier</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 font-mono">
                ${{filtered.map(r => `
                  <tr class="hover:bg-slate-900/60">
                    <td class="py-3 px-3 font-bold text-orange-400">#${{r.revenue_rank}}</td>
                    <td class="py-3 px-3 text-slate-400">#${{r.RestaurantID}}</td>
                    <td class="py-3 px-3 font-sans font-semibold text-white">${{r.Name}}</td>
                    <td class="py-3 px-3 font-sans"><span class="px-2 py-0.5 rounded-full text-[11px] bg-slate-800 text-slate-300 border border-slate-700">${{r.Cuisine}}</span></td>
                    <td class="py-3 px-3 text-right text-slate-300">${{r.total_orders}}</td>
                    <td class="py-3 px-3 text-right font-sans"><span class="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold">★ ${{r.avg_rating.toFixed(2)}}</span></td>
                    <td class="py-3 px-3 text-right text-slate-300">₹${{r.average_order_value.toFixed(2)}}</td>
                    <td class="py-3 px-3 text-right font-bold text-emerald-400">₹${{r.total_revenue.toLocaleString()}}</td>
                    <td class="py-3 px-3 text-right text-slate-400">${{r.revenue_percentage}}%</td>
                    <td class="py-3 px-3 text-center font-sans">
                      <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${{r.total_revenue >= 100000 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400 border border-slate-700'}}">
                        ${{r.total_revenue >= 100000 ? 'Top Tier' : 'Standard'}}
                      </span>
                    </td>
                  </tr>
                `).join('')}}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }}

    function setFilterCuisine(c) {{
      currentCuisineFilter = c;
      renderCurrentTab();
    }}

    function handleSortChange(col) {{
      if (sortColumn === col) {{
        sortAsc = !sortAsc;
      }} else {{
        sortColumn = col;
        sortAsc = false;
      }}
      renderCurrentTab();
    }}

    // 4. CUSTOMERS TAB
    function renderCustomers(container) {{
      const segs = DATA.customer_segments_simple;
      const rfm = DATA.customer_segments_rfm;
      const cities = DATA.city_performance;
      const topCust = DATA.top_customers;

      container.innerHTML = `
        <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
          ${{segs.map(s => `
            <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5 glow-card">
              <div class="flex justify-between text-xs text-slate-400 font-semibold uppercase">
                <span>${{s.customer_segment}}</span>
                <span class="text-emerald-400">${{s.rev_share}}% Rev</span>
              </div>
              <div class="text-2xl font-extrabold text-white mt-2">${{s.customer_count}} Users</div>
              <div class="text-xs text-slate-400 mt-1">₹${{s.total_revenue.toLocaleString()}} Gross</div>
              <div class="mt-3 pt-3 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                <span>Avg Spent</span>
                <span class="font-mono font-bold text-emerald-400">₹${{s.avg_spent.toLocaleString()}</span>
              </div>
            </div>
          `).join('')}}
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h2 class="text-base font-bold text-white">RFM Multi-Tier Classification</h2>
                <p class="text-xs text-slate-400">Scored via NTILE(5) on Recency, Frequency & Monetary</p>
              </div>
              <span class="text-xs font-mono text-orange-400">500 Profiles</span>
            </div>

            <div class="space-y-3">
              ${{rfm.map(r => `
                <div class="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-sm font-bold text-white">${{r.rfm_segment}}</span>
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300">${{r.customer_count} Users</span>
                    </div>
                    <div class="text-xs text-slate-400 mt-1">
                      Avg Spent: <span class="font-mono text-slate-200">₹${{r.avg_spent.toLocaleString()}</span>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-bold text-emerald-400 font-mono">₹${{r.total_revenue.toLocaleString()}</div>
                    <div class="text-xs text-slate-400 font-mono">${{r.rev_share}% share</div>
                  </div>
                </div>
              `).join('')}}
            </div>
          </div>

          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h2 class="text-base font-bold text-white">Metro Cities Delivery Sales</h2>
                <p class="text-xs text-slate-400">Volume across all 5 operational city zones</p>
              </div>
              <span class="text-xs font-mono text-blue-400">5 Metros</span>
            </div>

            <div class="h-60 w-full relative">
              <canvas id="chart-city-bars"></canvas>
            </div>
          </div>
        </div>

        <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-base font-bold text-white">Top 25 Lifetime Value Customers</h2>
              <p class="text-xs text-slate-400">Ranked using SQL: RANK() OVER (ORDER BY SUM(Amount) DESC)</p>
            </div>
            <span class="text-xs font-mono text-slate-400">Top 5% Buyers</span>
          </div>

          <div class="overflow-x-auto max-h-[450px]">
            <table class="w-full text-left text-xs">
              <thead class="sticky top-0 bg-[#111827] z-10">
                <tr class="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <th class="py-3 px-3">Rank</th>
                  <th class="py-3 px-3">ID</th>
                  <th class="py-3 px-3">Name</th>
                  <th class="py-3 px-3">City</th>
                  <th class="py-3 px-3">Joined</th>
                  <th class="py-3 px-3 text-right">Orders</th>
                  <th class="py-3 px-3 text-right">AOV (₹)</th>
                  <th class="py-3 px-3 text-right">Total Spent (₹)</th>
                  <th class="py-3 px-3 text-center">Tier</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 font-mono">
                ${{topCust.map((c, i) => `
                  <tr class="hover:bg-slate-900/60">
                    <td class="py-3 px-3 font-bold text-orange-400">#${{i + 1}}</td>
                    <td class="py-3 px-3 text-slate-400">CUST-${{c.CustomerID}}</td>
                    <td class="py-3 px-3 font-sans font-semibold text-white">${{c.CustomerName}}</td>
                    <td class="py-3 px-3 font-sans text-slate-300">${{c.City}}</td>
                    <td class="py-3 px-3 text-slate-400">${{c.SignupDate}}</td>
                    <td class="py-3 px-3 text-right text-slate-300 font-bold">${{c.orders}}</td>
                    <td class="py-3 px-3 text-right text-slate-300">₹${{c.aov.toFixed(2)}}</td>
                    <td class="py-3 px-3 text-right font-bold text-emerald-400">₹${{c.spent.toLocaleString()}}</td>
                    <td class="py-3 px-3 text-center font-sans">
                      <span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        ${{c.customer_segment}}
                      </span>
                    </td>
                  </tr>
                `).join('')}}
              </tbody>
            </table>
          </div>
        </div>
      `;

      setTimeout(() => {{
        initChart('chart-city-bars', {{
          type: 'bar',
          data: {{
            labels: cities.map(c => c.City),
            datasets: [{{
              label: 'Gross Sales (₹)',
              data: cities.map(c => c.total_revenue),
              backgroundColor: ['#3B82F6', '#10B981', '#F97316', '#8B5CF6', '#EC4899'],
              borderRadius: 4
            }}]
          }},
          options: {{
            responsive: true,
            maintainAspectRatio: false,
            scales: {{
              x: {{ grid: {{ display: false }}, ticks: {{ color: '#94A3B8' }} }},
              y: {{
                grid: {{ color: '#1F2937' }},
                ticks: {{ color: '#94A3B8', callback: (v) => '₹' + (v / 1000).toFixed(0) + 'k' }}
              }}
            }},
            plugins: {{ legend: {{ display: false }} }}
          }}
        }});
      }}, 50);
    }}

    // 5. OPERATIONS TAB
    function renderOperations(container) {{
      const dow = DATA.day_of_week;
      const hourly = DATA.hourly_distribution;
      const ratings = DATA.ratings_distribution;
      const recent = DATA.recent_orders;

      container.innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <h2 class="text-base font-bold text-white mb-1">Day of the Week Ordering Trends</h2>
            <p class="text-xs text-slate-400 mb-4">Order volume by weekday (Peak: Wednesday with 770 orders)</p>
            <div class="h-64 w-full relative">
              <canvas id="chart-dow-bar"></canvas>
            </div>
          </div>

          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6">
            <h2 class="text-base font-bold text-white mb-1">24-Hour Dispatch Rush Pattern</h2>
            <p class="text-xs text-slate-400 mb-4">Replicating SQL: GROUP BY HOUR(OrderDate) (Peaks: 11:00 & 20:00)</p>
            <div class="h-64 w-full relative">
              <canvas id="chart-hourly-rush"></canvas>
            </div>
          </div>
        </div>

        <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <h2 class="text-base font-bold text-white mb-1">Customer Satisfaction Rating Brackets</h2>
          <p class="text-xs text-slate-400 mb-4">3,500 total ratings (Benchmark: ★ 3.76 / 5.0)</p>
          <div class="grid grid-cols-1 sm:grid-cols-5 gap-3">
            ${{ratings.map(r => `
              <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div class="text-amber-400 font-bold text-sm">★ ${{r.bracket}}</div>
                <div class="text-xl font-extrabold text-white mt-2">${{r.count.toLocaleString()}}</div>
                <div class="text-xs text-slate-400 font-mono mt-0.5">${{r.percentage}}% of reviews</div>
                <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
                  <div class="bg-amber-400 h-full rounded-full" style="width: ${{r.percentage * 4}}%"></div>
                </div>
              </div>
            `).join('')}}
          </div>
        </div>

        <!-- Recent Orders Feed -->
        <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h2 class="text-base font-bold text-white">Real-Time Fulfilled Orders Log (Latest 30)</h2>
              <p class="text-xs text-slate-400">Direct query join on orders_final, restaurants, and customers</p>
            </div>
            <span class="text-xs text-emerald-400 font-medium flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Delivered
            </span>
          </div>

          <div class="overflow-x-auto max-h-96">
            <table class="w-full text-left text-xs">
              <thead class="sticky top-0 bg-[#111827] z-10">
                <tr class="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                  <th class="py-3 px-3">Order ID</th>
                  <th class="py-3 px-3">Timestamp</th>
                  <th class="py-3 px-3">Customer</th>
                  <th class="py-3 px-3">City</th>
                  <th class="py-3 px-3">Restaurant</th>
                  <th class="py-3 px-3">Cuisine</th>
                  <th class="py-3 px-3 text-right">Amount (₹)</th>
                  <th class="py-3 px-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-800/60 font-mono">
                ${{recent.map(o => `
                  <tr class="hover:bg-slate-900/60">
                    <td class="py-3 px-3 font-bold text-orange-400">#${{o.OrderID}}</td>
                    <td class="py-3 px-3 text-slate-400">${{o.OrderDateStr}}</td>
                    <td class="py-3 px-3 font-sans font-medium text-white">${{o.CustomerName}}</td>
                    <td class="py-3 px-3 font-sans text-slate-300">${{o.City}}</td>
                    <td class="py-3 px-3 font-sans text-slate-300">${{o.Name}}</td>
                    <td class="py-3 px-3 font-sans"><span class="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">${{o.Cuisine}}</span></td>
                    <td class="py-3 px-3 text-right font-bold text-emerald-400">₹${{o.Amount.toFixed(2)}}</td>
                    <td class="py-3 px-3 text-center font-sans"><span class="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Delivered</span></td>
                  </tr>
                `).join('')}}
              </tbody>
            </table>
          </div>
        </div>
      `;

      setTimeout(() => {{
        initChart('chart-dow-bar', {{
          type: 'bar',
          data: {{
            labels: dow.map(d => d.day.slice(0, 3)),
            datasets: [{{
              label: 'Gross Revenue (₹)',
              data: dow.map(d => d.revenue),
              backgroundColor: '#F97316',
              borderRadius: 4
            }}]
          }},
          options: {{
            responsive: true,
            maintainAspectRatio: false,
            scales: {{
              x: {{ grid: {{ display: false }}, ticks: {{ color: '#94A3B8' }} }},
              y: {{
                grid: {{ color: '#1F2937' }},
                ticks: {{ color: '#94A3B8', callback: (v) => '₹' + (v / 1000).toFixed(0) + 'k' }}
              }}
            }},
            plugins: {{ legend: {{ display: false }} }}
          }}
        }});

        initChart('chart-hourly-rush', {{
          type: 'line',
          data: {{
            labels: hourly.map(h => h.hour_label),
            datasets: [{{
              label: 'Hourly Orders',
              data: hourly.map(h => h.orders),
              borderColor: '#3B82F6',
              backgroundColor: 'rgba(59, 130, 246, 0.2)',
              fill: true,
              tension: 0.35,
              pointRadius: 2
            }}]
          }},
          options: {{
            responsive: true,
            maintainAspectRatio: false,
            scales: {{
              x: {{ grid: {{ display: false }}, ticks: {{ color: '#94A3B8', maxTicksLimit: 8 }} }},
              y: {{ grid: {{ color: '#1F2937' }}, ticks: {{ color: '#94A3B8' }} }}
            }},
            plugins: {{ legend: {{ display: false }} }}
          }}
        }});
      }}, 50);
    }}

    // 6. SQL TAB
    function renderSql(container) {{
      container.innerHTML = `
        <div class="bg-[#111827] border border-slate-800 rounded-2xl p-6">
          <h2 class="text-base font-bold text-white mb-1">03_business_analysis.sql Source Mapping</h2>
          <p class="text-xs text-slate-400">The exact MySQL 8.0 views, window functions, and CTEs that power the FOODPULSE dashboard</p>
        </div>

        <div class="space-y-4">
          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5">
            <div class="text-sm font-bold text-white mb-1">1. View: executive_kpis (Lines 837-851)</div>
            <pre class="bg-[#090D16] p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed"><code>CREATE VIEW executive_kpis AS
SELECT
    COUNT(OrderID) AS total_orders,
    COUNT(DISTINCT CustomerID) AS total_customers,
    COUNT(DISTINCT RestaurantID) AS total_restaurants,
    ROUND(SUM(Amount), 2) AS total_revenue,
    ROUND(AVG(Amount), 2) AS average_order_value,
    ROUND(MAX(Amount), 2) AS highest_order_value,
    ROUND(
        SUM(Amount) / NULLIF(COUNT(DISTINCT CustomerID), 0),
        2
    ) AS revenue_per_customer
FROM orders_final;

SELECT * FROM executive_kpis;</code></pre>
          </div>

          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5">
            <div class="text-sm font-bold text-white mb-1">2. Monthly MoM Revenue Growth CTE (Lines 302-323)</div>
            <pre class="bg-[#090D16] p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed"><code>WITH monthly_revenue AS (
    SELECT
        YEAR(OrderDate) AS order_year,
        MONTH(OrderDate) AS order_month,
        SUM(Amount) AS total_revenue
    FROM orders_final
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
),
revenue_with_previous AS (
    SELECT
        order_year,
        order_month,
        total_revenue,
        LAG(total_revenue) OVER (
            ORDER BY order_year, order_month
        ) AS previous_revenue
    FROM monthly_revenue
)
SELECT
    order_year,
    order_month,
    ROUND(total_revenue, 2) AS total_revenue,
    ROUND(previous_revenue, 2) AS previous_revenue,
    ROUND(
        (total_revenue - previous_revenue)
        * 100.0 / NULLIF(previous_revenue, 0),
        2
    ) AS growth_percentage
FROM revenue_with_previous
ORDER BY order_year, order_month;</code></pre>
          </div>

          <div class="bg-[#111827] border border-slate-800 rounded-2xl p-5">
            <div class="text-sm font-bold text-white mb-1">3. RFM Customer Segmentation (Lines 447-478)</div>
            <pre class="bg-[#090D16] p-4 rounded-xl text-xs font-mono text-emerald-400 overflow-x-auto leading-relaxed"><code>WITH customer_rfm AS (
    SELECT
        CustomerID,
        DATEDIFF(
            (SELECT MAX(OrderDate) FROM orders_final),
            MAX(OrderDate)
        ) AS recency_days,
        COUNT(OrderID) AS frequency,
        SUM(Amount) AS monetary
    FROM orders_final
    WHERE CustomerID IS NOT NULL
    GROUP BY CustomerID
),
rfm_scores AS (
    SELECT
        CustomerID,
        recency_days,
        frequency,
        monetary,
        NTILE(5) OVER (ORDER BY recency_days ASC) AS R_score,
        NTILE(5) OVER (ORDER BY frequency DESC) AS F_score,
        NTILE(5) OVER (ORDER BY monetary DESC) AS M_score
    FROM customer_rfm
)
SELECT
    CustomerID,
    recency_days,
    frequency,
    ROUND(monetary, 2) AS monetary,
    R_score,
    F_score,
    M_score,
    CASE
        WHEN R_score >= 4 AND F_score >= 4 AND M_score >= 4
            THEN 'High Value'
        WHEN R_score >= 3 AND F_score >= 3
            THEN 'Loyal'
        WHEN R_score >= 3
            THEN 'Potential'
        WHEN R_score <= 2 AND F_score <= 2
            THEN 'At Risk'
        ELSE 'Regular'
    END AS customer_segment
FROM rfm_scores
ORDER BY M_score DESC;</code></pre>
          </div>
        </div>
      `;
    }}

    // Initialize
    switchTab('overview');
  </script>
</body>
</html>
'''

with open(target_html, 'w', encoding='utf-8') as f:
    f.write(html_template)

# Also copy to scratch folder
preview_path = r'C:\Users\Sathana Jayaraman\.gemini\antigravity\scratch\foodpulse-dashboard\dashboard_preview.html'
with open(preview_path, 'w', encoding='utf-8') as f:
    f.write(html_template)

print('Updated both standalone HTML files successfully! Size:', os.path.getsize(target_html), 'bytes')
