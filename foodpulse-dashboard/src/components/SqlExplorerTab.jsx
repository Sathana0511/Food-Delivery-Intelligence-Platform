import React, { useState } from 'react'
import { Database, Copy, Check, Code, Terminal, Layers } from 'lucide-react'

export default function SqlExplorerTab() {
  const [copiedId, setCopiedId] = useState(null)

  const queries = [
    {
      id: 'kpis',
      title: 'Executive KPIs View (executive_kpis)',
      target: 'Overview Tab Top Metrics Cards',
      description: 'Calculates aggregate order count, total revenue, average order value, unique customers, and revenue per customer.',
      sql: `CREATE VIEW executive_kpis AS
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

SELECT * FROM executive_kpis;`
    },
    {
      id: 'monthly_growth',
      title: 'Monthly Revenue & MoM Growth Rate CTE',
      target: 'Revenue & Trends Tab Bar & Line Chart',
      description: 'Calculates month-over-month growth percentage using the LAG() window function across all 6 months in H1 2025.',
      sql: `WITH monthly_revenue AS (
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
ORDER BY order_year, order_month;`
    },
    {
      id: 'rfm_segmentation',
      title: 'Customer RFM Segmentation (5 Quintiles NTILE)',
      target: 'Customer Intelligence Tab Segmentation Matrix',
      description: 'Scores customers across Recency (days since last order), Frequency (order count), and Monetary (total spend) using NTILE(5).',
      sql: `WITH customer_rfm AS (
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
ORDER BY M_score DESC;`
    },
    {
      id: 'top_restaurants',
      title: 'Top Restaurants by Revenue Share (RANK Window)',
      target: 'Restaurants Tab 50-Outlet Rankings',
      description: 'Joins orders_final with restaurants to compute revenue, order count, and revenue share percentage.',
      sql: `WITH restaurant_revenue AS (
    SELECT
        r.RestaurantID,
        r.Name,
        r.Cuisine,
        COUNT(o.OrderID) AS total_orders,
        SUM(o.Amount) AS total_revenue,
        AVG(o.Amount) AS average_order_value
    FROM orders_final o
    JOIN restaurants r ON o.RestaurantID = r.RestaurantID
    GROUP BY r.RestaurantID, r.Name, r.Cuisine
)
SELECT
    RestaurantID,
    Name,
    Cuisine,
    total_orders,
    ROUND(total_revenue, 2) AS total_revenue,
    ROUND(average_order_value, 2) AS average_order_value,
    RANK() OVER (ORDER BY total_revenue DESC) AS revenue_rank,
    ROUND(
        total_revenue * 100.0 / SUM(total_revenue) OVER (),
        2
    ) AS revenue_percentage
FROM restaurant_revenue
ORDER BY revenue_rank;`
    },
    {
      id: 'hourly_rush',
      title: 'Peak Ordering Rush Hours & Day of Week',
      target: 'Operations Tab 24-Hour Dispatch Chart',
      description: 'Groups orders by HOUR(OrderDate) and DAYNAME(OrderDate) to pinpoint rush periods for logistics.',
      sql: `/* Hourly Distribution */
SELECT
    HOUR(OrderDate) AS order_hour,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_revenue,
    ROUND(AVG(Amount), 2) AS average_order_value
FROM orders_final
GROUP BY HOUR(OrderDate)
ORDER BY total_orders DESC;

/* Day of Week Distribution */
SELECT
    DAYNAME(OrderDate) AS day_name,
    DAYOFWEEK(OrderDate) AS day_num,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_revenue
FROM orders_final
GROUP BY DAYNAME(OrderDate), DAYOFWEEK(OrderDate)
ORDER BY day_num;`
    }
  ]

  const handleCopy = (id, sql) => {
    navigator.clipboard.writeText(sql)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">MySQL 8.0 Business Logic Queries</h2>
            <p className="text-xs text-slate-400">Extracted directly from 03_business_analysis.sql and mapped to FOODPULSE components</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {queries.map((q) => (
          <div key={q.id} className="bg-[#111827] border border-slate-800 rounded-2xl p-5 overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{q.title}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {q.target}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{q.description}</p>
              </div>
              <button
                onClick={() => handleCopy(q.id, q.sql)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors shrink-0"
              >
                {copiedId === q.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied SQL</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Query</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative rounded-xl bg-[#090D16] border border-slate-800/90 p-4 overflow-x-auto">
              <pre className="text-xs font-mono text-emerald-400/90 leading-relaxed">
                <code>{q.sql}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
