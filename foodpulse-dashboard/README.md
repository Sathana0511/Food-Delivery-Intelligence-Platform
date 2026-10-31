# FOODPULSE - Food Delivery Analytics Dashboard (SaaS)

An enterprise dark-themed SaaS intelligence dashboard for **fooddeliverydb**, built with **React**, **Recharts**, **Lucide Icons**, and **Tailwind CSS**.

---

## 📊 Real Dataset Metrics & Schema
This dashboard is powered by the actual MySQL database scripts and CSV records:
- **Database**: `fooddeliverydb`
- **Total Orders**: `5,000` (from `orders_final` / `orders.csv`)
- **Total Gross Revenue**: `₹4,097,103.31`
- **Average Order Value (AOV)**: `₹819.42`
- **Time Period**: `January 2025 – June 2025`
- **Partner Outlets**: `50` restaurants (IDs 101 to 150)
- **Active Customers**: `500` customers (IDs 1 to 500)
- **Customer Ratings**: `3,500` ratings (Mean: `3.76 ★`)
- **Cuisines**: Biryani, Italian, North Indian, Chinese, Desserts, Fast Food, South Indian
- **Metro Cities**: Mumbai, Delhi, Hyderabad, Bangalore, Chennai

---

## 🚀 Quick Start Instructions

1. Open this folder in your terminal or IDE:
   ```bash
   cd "C:\Users\Sathana Jayaraman\.gemini\antigravity\scratch\foodpulse-dashboard"
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open your browser at `http://localhost:3000`.

---

## 🛠️ Dashboard Architecture

- `src/data/foodpulseData.json`: Pre-aggregated analytics payload matching SQL queries and views from `03_business_analysis.sql`.
- `src/components/Sidebar.jsx`: Collapsible navigation with database context pill.
- `src/components/Header.jsx`: Sticky header with real-time search, date picker, and refresh.
- `src/components/OverviewTab.jsx`: Top KPI cards, monthly ComposedChart (Area + Bar), cuisine pie chart, and performance highlights.
- `src/components/TrendsTab.jsx`: MoM revenue growth rate and cumulative run-rate line chart.
- `src/components/RestaurantsTab.jsx`: 50-partner outlet table with cuisine filters, rating badges, and sorters.
- `src/components/CustomersTab.jsx`: High Value / Loyal / Potential / Regular customer tiers, RFM Matrix breakdown, and Top 25 LTV customers.
- `src/components/OperationsTab.jsx`: Day of week order bar charts, 24-hour rush curve, and live delivery stream.
- `src/components/SqlExplorerTab.jsx`: Interactive SQL inspector showing exact MySQL 8.0 CTEs, window functions, and views.
