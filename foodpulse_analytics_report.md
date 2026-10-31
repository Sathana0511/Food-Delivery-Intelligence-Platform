# FOODPULSE™ SaaS Analytics & Delivery Intelligence Report
**Database**: `fooddeliverydb` | **Engine**: MySQL 8.0 | **Window**: January 2025 – June 2025

---

## Executive Summary & Core Metrics

Based on the actual dataset uploaded (`orders.csv`, `customers.csv`, `restaurants.csv`, `ratings.csv`, and `03_business_analysis.sql`), the **FOODPULSE** platform processes over **5,000 orders** across **50 partner restaurants** and **500 active customers** spanning 5 major Indian metropolitan areas.

| Metric | Real Database Value | Benchmarking Context |
| :--- | :--- | :--- |
| **Total Gross Revenue** | **₹4,097,103.31** (~₹4.10M) | 6-month aggregate gross volume |
| **Total Orders Fulfilled** | **5,000 orders** | Consistent ~833 orders / month |
| **Average Order Value (AOV)** | **₹819.42** | Range: ₹100.12 (Min) to ₹1,499.82 (Max) |
| **Repeat Customer Rate** | **100.0%** | All 500 customers placed ≥2 orders |
| **Overall Average Rating** | **3.76 ★ / 5.0** | Across 3,500 verified consumer ratings |
| **Average Revenue / Customer** | **₹8,194.21** | Customer lifetime value across H1 |
| **Top Performing Partner** | **KFC 118** (ID: 118) | **₹106,094.61** (130 orders, ★ 3.82) |
| **Dominant Cuisine** | **Italian** | **₹810,201.74** (19.77% market share) |
| **Leading Metro City** | **Chennai** | **₹935,204.74** (109 customers, 22.83% share) |

---

## 1. Monthly Financial Performance & MoM Growth

Directly replicating the SQL query using `LAG(total_revenue) OVER (ORDER BY order_year, order_month)`:

```sql
WITH monthly_revenue AS (
    SELECT YEAR(OrderDate) AS order_year, MONTH(OrderDate) AS order_month, SUM(Amount) AS total_revenue
    FROM orders_final GROUP BY YEAR(OrderDate), MONTH(OrderDate)
)
SELECT order_month, ROUND(total_revenue, 2) AS total_revenue,
       ROUND((total_revenue - previous_revenue) * 100.0 / NULLIF(previous_revenue, 0), 2) AS growth_percentage
FROM revenue_with_previous;
```

| Month | Orders | Gross Revenue (₹) | AOV (₹) | MoM Growth (%) | Revenue Share (%) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **January 2025** | 831 | ₹698,967.62 | ₹841.12 | Benchmark | 17.06% |
| **February 2025** | 752 | ₹611,344.28 | ₹812.96 | -12.54% | 14.92% |
| **March 2025** | 808 | ₹667,149.17 | ₹825.68 | +9.13% | 16.28% |
| **April 2025** | 835 | ₹679,911.11 | ₹814.26 | +1.91% | 16.59% |
| **May 2025 (Peak)** | **890** | **₹728,352.81** | ₹818.37 | **+7.12%** | **17.78%** |
| **June 2025** | 884 | ₹711,378.32 | ₹804.73 | -2.33% | 17.36% |

---

## 2. Cuisine Performance & Market Share

Across 7 distinct cuisine categories:

| Cuisine | Partner Outlets | Orders Fulfilled | Total Revenue (₹) | AOV (₹) | Market Share (%) | Avg Rating |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Italian** | 10 | 972 | **₹810,201.74** | ₹833.54 | **19.77%** | 3.78 ★ |
| **North Indian** | 9 | 906 | **₹746,924.03** | ₹824.42 | **18.23%** | 3.75 ★ |
| **Chinese** | 9 | 903 | **₹741,007.24** | ₹820.61 | **18.09%** | 3.74 ★ |
| **Desserts** | 8 | 784 | **₹631,949.16** | ₹806.06 | **15.42%** | 3.82 ★ |
| **Biryani** | 6 | 612 | **₹488,020.11** | ₹797.42 | **11.91%** | 3.79 ★ |
| **Fast Food** | 4 | 422 | **₹357,182.84** | ₹846.40 | **8.72%** | 3.73 ★ |
| **South Indian** | 4 | 401 | **₹321,818.19** | ₹802.54 | **7.85%** | 3.69 ★ |

---

## 3. Top 10 Partner Restaurants by Revenue

Directly implementing `RANK() OVER (ORDER BY SUM(Amount) DESC)` from `03_business_analysis.sql`:

| Rank | ID | Restaurant Name | Cuisine | Orders | Avg Rating | Total Revenue (₹) | Share (%) |
| :---: | :---: | :--- | :--- | :---: | :---: | :---: | :---: |
| **#1** | 118 | **KFC 118** | Fast Food | 130 | 3.82 ★ | **₹106,094.61** | 2.59% |
| **#2** | 123 | **Empire 123** | North Indian | 114 | 3.84 ★ | **₹98,591.60** | 2.41% |
| **#3** | 142 | **Toscano 142** | Italian | 120 | 3.81 ★ | **₹97,390.16** | 2.38% |
| **#4** | 126 | **Toscano 126** | Italian | 118 | 3.65 ★ | **₹97,369.28** | 2.38% |
| **#5** | 102 | **Thalappakatti 102** | Chinese | 114 | 3.76 ★ | **₹94,604.34** | 2.31% |
| **#6** | 139 | **Buhari 139** | Italian | 113 | 3.66 ★ | **₹94,302.43** | 2.30% |
| **#7** | 134 | **Empire 134** | North Indian | 112 | 3.87 ★ | **₹94,008.20** | 2.29% |
| **#8** | 119 | **A2B 119** | Desserts | 109 | 3.84 ★ | **₹92,854.78** | 2.27% |
| **#9** | 135 | **Meghana Foods 135** | North Indian | 114 | 3.62 ★ | **₹92,829.74** | 2.27% |
| **#10** | 128 | **Paradise 128** | Italian | 108 | 3.78 ★ | **₹91,732.33** | 2.24% |

---

## 4. Customer Intelligence & RFM Multi-Tier Classification

### Simple Customer Segmentation (View: `customer_segments`)
- **High Value** (Spend ≥ ₹5,000 & Orders ≥ 5): **439 customers** (₹3,869,103.85 / **94.44%** of revenue)
- **Loyal** (Orders ≥ 5): **45 customers** (₹184,246.54 / **4.50%** of revenue)
- **Potential** (Spend ≥ ₹2,000): **14 customers** (₹42,287.42 / **1.03%** of revenue)
- **Regular** (Other active): **2 customers** (₹1,463.80 / **0.04%** of revenue)

### Multi-Dimensional RFM Quintiles (NTILE 5 on R, F, M)
- **Loyal (R≥3, F≥3)**: 114 profiles • ₹832,281.14 (20.31%)
- **Potential (R≥3)**: 103 profiles • ₹1,109,376.61 (27.08%)
- **Regular (Balanced)**: 103 profiles • ₹679,035.85 (16.57%)
- **At Risk (R≤2, F≤2)**: 97 profiles • ₹1,056,140.34 (25.78%)
- **High Value (R≥4, F≥4, M≥4)**: 83 profiles • ₹420,269.37 (10.26%)

---

## 5. Metro Cities Geographic Footprint

| City | Active Customers | Orders | Total Sales (₹) | Avg / Customer (₹) | Sales Share (%) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Chennai** | 109 | 1,126 | **₹935,204.74** | ₹8,579.86 | **22.83%** |
| **Mumbai** | 112 | 1,102 | **₹894,725.44** | ₹7,988.62 | **21.84%** |
| **Bangalore** | 95 | 1,003 | **₹826,320.45** | ₹8,698.11 | **20.17%** |
| **Hyderabad** | 91 | 896 | **₹729,275.82** | ₹8,014.02 | **17.80%** |
| **Delhi** | 93 | 873 | **₹711,576.86** | ₹7,651.36 | **17.37%** |

---

## 6. Operational Temporal Patterns

- **Weekly Distribution**:
  - **Wednesday Peak**: 770 orders • ₹628,454.56 (15.34% of volume)
  - **Thursday**: 723 orders • ₹599,110.93
  - **Sunday**: 722 orders • ₹590,386.68
  - **Tuesday**: 705 orders • ₹584,853.17
  - **Monday**: 703 orders • ₹571,996.17
  - **Saturday**: 706 orders • ₹560,418.69
  - **Friday**: 671 orders • ₹561,883.11
- **Daily Peak Rush Hours**:
  - **Dinner Rush**: **20:00 (8:00 PM)** with **379 orders** (₹308,648.96)
  - **Lunch Rush**: **11:00 AM** with **375 orders** (₹311,216.48)
  - **Afternoon Rush**: **16:00 (4:00 PM)** with **370 orders** (₹308,861.20)

---

## 7. Deliverables & Codebase Locations

The complete React application has been created in your scratch directory:
- **Project Directory**: `C:\Users\Sathana Jayaraman\.gemini\antigravity\scratch\foodpulse-dashboard`
- **Pre-Aggregated JSON Data**: `src/data/foodpulseData.json` (54 KB)
- **Interactive Standalone HTML Artifact**: `foodpulse_dashboard.html` (90 KB)
- **Source Components**:
  - [App.jsx](file:///C:/Users/Sathana%20Jayaraman/.gemini/antigravity/scratch/foodpulse-dashboard/src/App.jsx)
  - [Sidebar.jsx](file:///C:/Users/Sathana%20Jayaraman/.gemini/antigravity/scratch/foodpulse-dashboard/src/components/Sidebar.jsx)
  - [Header.jsx](file:///C:/Users/Sathana%20Jayaraman/.gemini/antigravity/scratch/foodpulse-dashboard/src/components/Header.jsx)
  - [OverviewTab.jsx](file:///C:/Users/Sathana%20Jayaraman/.gemini/antigravity/scratch/foodpulse-dashboard/src/components/OverviewTab.jsx)
  - [TrendsTab.jsx](file:///C:/Users/Sathana%20Jayaraman/.gemini/antigravity/scratch/foodpulse-dashboard/src/components/TrendsTab.jsx)
  - [RestaurantsTab.jsx](file:///C:/Users/Sathana%20Jayaraman/.gemini/antigravity/scratch/foodpulse-dashboard/src/components/RestaurantsTab.jsx)
  - [CustomersTab.jsx](file:///C:/Users/Sathana%20Jayaraman/.gemini/antigravity/scratch/foodpulse-dashboard/src/components/CustomersTab.jsx)
  - [OperationsTab.jsx](file:///C:/Users/Sathana%20Jayaraman/.gemini/antigravity/scratch/foodpulse-dashboard/src/components/OperationsTab.jsx)
  - [SqlExplorerTab.jsx](file:///C:/Users/Sathana%20Jayaraman/.gemini/antigravity/scratch/foodpulse-dashboard/src/components/SqlExplorerTab.jsx)
