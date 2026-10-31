USE fooddeliverydb;
SELECT
    COUNT(*) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_revenue,
    ROUND(AVG(Amount), 2) AS average_order_value
FROM orders_final;
SELECT
    r.RestaurantID,
    r.Name,
    COUNT(o.OrderID) AS total_orders,
    ROUND(SUM(o.Amount), 2) AS total_revenue
FROM orders_final o
JOIN restaurants r
    ON o.RestaurantID = r.RestaurantID
GROUP BY r.RestaurantID, r.Name
ORDER BY total_revenue DESC
LIMIT 10;
SELECT
    CustomerID,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_spent
FROM orders_final
WHERE CustomerID IS NOT NULL
GROUP BY CustomerID
ORDER BY total_spent DESC
LIMIT 10;
SELECT
    DATE_FORMAT(OrderDate, '%Y-%m') AS order_month,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_revenue
FROM orders_final
GROUP BY order_month
ORDER BY order_month;
SELECT
    RestaurantID,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_revenue,
    ROUND(AVG(Amount), 2) AS average_order_value
FROM orders_final
GROUP BY RestaurantID
ORDER BY total_revenue DESC;
SELECT
    DATE(OrderDate) AS order_date,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_revenue
FROM orders_final
GROUP BY DATE(OrderDate)
ORDER BY order_date;
SELECT
    YEAR(OrderDate) AS order_year,
    MONTH(OrderDate) AS order_month,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_revenue
FROM orders_final
GROUP BY YEAR(OrderDate), MONTH(OrderDate)
ORDER BY order_year, order_month;
SELECT
    CustomerID,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_spent
FROM orders_final
WHERE CustomerID IS NOT NULL
GROUP BY CustomerID
ORDER BY total_orders DESC
LIMIT 10;
SELECT
    RestaurantID,
    COUNT(OrderID) AS total_orders,
    ROUND(AVG(Amount), 2) AS average_order_value
FROM orders_final
GROUP BY RestaurantID
ORDER BY average_order_value DESC
LIMIT 10;
SELECT
    COUNT(OrderID) AS total_orders,
    COUNT(DISTINCT CustomerID) AS total_customers,
    COUNT(DISTINCT RestaurantID) AS total_restaurants,
    ROUND(SUM(Amount), 2) AS total_revenue,
    ROUND(AVG(Amount), 2) AS overall_average_order_value
FROM orders_final;
SELECT
    CustomerID,
    ROUND(SUM(Amount), 2) AS total_spent,
    CASE
        WHEN SUM(Amount) >= 5000 THEN 'High Value'
        WHEN SUM(Amount) >= 2000 THEN 'Medium Value'
        ELSE 'Low Value'
    END AS customer_segment
FROM orders_final
WHERE CustomerID IS NOT NULL
GROUP BY CustomerID
ORDER BY total_spent DESC;
SELECT
    DAYNAME(OrderDate) AS day_name,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_revenue
FROM orders_final
GROUP BY DAYNAME(OrderDate), DAYOFWEEK(OrderDate)
ORDER BY DAYOFWEEK(OrderDate);
SELECT
    HOUR(OrderDate) AS order_hour,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_revenue
FROM orders_final
GROUP BY HOUR(OrderDate)
ORDER BY total_orders DESC;
SELECT
    CustomerID,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_spent,
    ROUND(AVG(Amount), 2) AS average_order_value
FROM orders_final
WHERE CustomerID IS NOT NULL
GROUP BY CustomerID
ORDER BY total_spent DESC
LIMIT 10;
SELECT
    RestaurantID,
    COUNT(OrderID) AS total_orders,
    ROUND(AVG(Amount), 2) AS average_order_value,
    ROUND(SUM(Amount), 2) AS total_revenue
FROM orders_final
GROUP BY RestaurantID
HAVING COUNT(OrderID) >= 5
ORDER BY average_order_value DESC
LIMIT 10;
SELECT
    CustomerID,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_spent
FROM orders_final
WHERE CustomerID IS NOT NULL
GROUP BY CustomerID
HAVING COUNT(OrderID) > 1
ORDER BY total_orders DESC;
SELECT
    COUNT(*) AS total_customers,
    SUM(CASE WHEN total_orders > 1 THEN 1 ELSE 0 END) AS repeat_customers,
    ROUND(
        SUM(CASE WHEN total_orders > 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*),
        2
    ) AS repeat_customer_percentage
FROM (
    SELECT
        CustomerID,
        COUNT(OrderID) AS total_orders
    FROM orders_final
    WHERE CustomerID IS NOT NULL
    GROUP BY CustomerID
) AS customer_orders;
SELECT
    RestaurantID,
    ROUND(SUM(Amount), 2) AS restaurant_revenue,
    ROUND(
        SUM(Amount) * 100.0 /
        (SELECT SUM(Amount) FROM orders_final),
        2
    ) AS revenue_percentage
FROM orders_final
GROUP BY RestaurantID
ORDER BY restaurant_revenue DESC;
SELECT
    DATE(OrderDate) AS order_date,
    ROUND(SUM(Amount), 2) AS daily_revenue,
    ROUND(
        SUM(SUM(Amount)) OVER (
            ORDER BY DATE(OrderDate)
        ),
        2
    ) AS cumulative_revenue
FROM orders_final
GROUP BY DATE(OrderDate)
ORDER BY order_date;
SELECT
    RestaurantID,
    ROUND(SUM(Amount), 2) AS total_revenue,
    RANK() OVER (ORDER BY SUM(Amount) DESC) AS revenue_rank
FROM orders_final
GROUP BY RestaurantID
ORDER BY revenue_rank;
SELECT
    CustomerID,
    ROUND(SUM(Amount), 2) AS total_spent,
    RANK() OVER (ORDER BY SUM(Amount) DESC) AS customer_rank
FROM orders_final
WHERE CustomerID IS NOT NULL
GROUP BY CustomerID
ORDER BY customer_rank;
WITH restaurant_rank AS (
    SELECT
        RestaurantID,
        ROUND(SUM(Amount), 2) AS total_revenue,
        RANK() OVER (ORDER BY SUM(Amount) DESC) AS revenue_rank
    FROM orders_final
    GROUP BY RestaurantID
)
SELECT
    RestaurantID,
    total_revenue,
    revenue_rank
FROM restaurant_rank
WHERE revenue_rank <= 3
ORDER BY revenue_rank;
WITH customer_rank AS (
    SELECT
        CustomerID,
        ROUND(SUM(Amount), 2) AS total_spent,
        RANK() OVER (ORDER BY SUM(Amount) DESC) AS customer_rank
    FROM orders_final
    WHERE CustomerID IS NOT NULL
    GROUP BY CustomerID
)
SELECT
    CustomerID,
    total_spent,
    customer_rank
FROM customer_rank
WHERE customer_rank <= 5
ORDER BY customer_rank;
SELECT
    RestaurantID,
    ROUND(SUM(Amount), 2) AS total_revenue,
    CASE
        WHEN SUM(Amount) >= 10000 THEN 'High Revenue'
        WHEN SUM(Amount) >= 5000 THEN 'Medium Revenue'
        ELSE 'Low Revenue'
    END AS revenue_category
FROM orders_final
GROUP BY RestaurantID
ORDER BY total_revenue DESC;
SELECT
    CustomerID,
    ROUND(SUM(Amount), 2) AS total_spent,
    CASE
        WHEN SUM(Amount) >= 5000 THEN 'High Value'
        WHEN SUM(Amount) >= 2000 THEN 'Medium Value'
        ELSE 'Low Value'
    END AS customer_category
FROM orders_final
WHERE CustomerID IS NOT NULL
GROUP BY CustomerID
ORDER BY total_spent DESC;
WITH customer_segments AS (
    SELECT
        CustomerID,
        SUM(Amount) AS total_spent
    FROM orders_final
    WHERE CustomerID IS NOT NULL
    GROUP BY CustomerID
)
SELECT
    CASE
        WHEN total_spent >= 5000 THEN 'High Value'
        WHEN total_spent >= 2000 THEN 'Medium Value'
        ELSE 'Low Value'
    END AS customer_segment,
    COUNT(*) AS customer_count,
    ROUND(SUM(total_spent), 2) AS segment_revenue
FROM customer_segments
GROUP BY customer_segment
ORDER BY segment_revenue DESC;
SELECT
    RestaurantID,
    ROUND(SUM(Amount), 2) AS total_revenue,
    ROUND(
        SUM(Amount) * 100.0 /
        SUM(SUM(Amount)) OVER (),
        2
    ) AS revenue_percentage
FROM orders_final
GROUP BY RestaurantID
ORDER BY total_revenue DESC;
WITH monthly_revenue AS (
    SELECT
        YEAR(OrderDate) AS order_year,
        MONTH(OrderDate) AS order_month,
        SUM(Amount) AS total_revenue
    FROM orders_final
    GROUP BY YEAR(OrderDate), MONTH(OrderDate)
)
SELECT
    order_year,
    order_month,
    ROUND(total_revenue, 2) AS total_revenue,
    ROUND(
        total_revenue -
        LAG(total_revenue) OVER (
            ORDER BY order_year, order_month
        ),
        2
    ) AS revenue_change
FROM monthly_revenue
ORDER BY order_year, order_month;
WITH monthly_revenue AS (
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
ORDER BY order_year, order_month;
SELECT
    CustomerID,
    MAX(OrderDate) AS last_order_date,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_spent
FROM orders_final
WHERE CustomerID IS NOT NULL
GROUP BY CustomerID
ORDER BY last_order_date DESC;
WITH customer_recency AS (
    SELECT
        CustomerID,
        MAX(OrderDate) AS last_order_date,
        COUNT(OrderID) AS total_orders,
        SUM(Amount) AS total_spent
    FROM orders_final
    WHERE CustomerID IS NOT NULL
    GROUP BY CustomerID
)
SELECT
    CustomerID,
    last_order_date,
    total_orders,
    ROUND(total_spent, 2) AS total_spent,
    CASE
        WHEN DATEDIFF(
            (SELECT MAX(OrderDate) FROM orders_final),
            last_order_date
        ) <= 30 THEN 'Recent'
        WHEN DATEDIFF(
            (SELECT MAX(OrderDate) FROM orders_final),
            last_order_date
        ) <= 90 THEN 'At Risk'
        ELSE 'Inactive'
    END AS customer_status
FROM customer_recency
ORDER BY last_order_date DESC;
SELECT
    CustomerID,
    COUNT(OrderID) AS order_frequency,
    ROUND(SUM(Amount), 2) AS total_spent,
    ROUND(AVG(Amount), 2) AS average_order_value
FROM orders_final
WHERE CustomerID IS NOT NULL
GROUP BY CustomerID
ORDER BY order_frequency DESC, total_spent DESC;
WITH customer_rfm AS (
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
)
SELECT
    CustomerID,
    recency_days,
    frequency,
    ROUND(monetary, 2) AS monetary
FROM customer_rfm
ORDER BY monetary DESC;
WITH customer_rfm AS (
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

        NTILE(5) OVER (
            ORDER BY recency_days DESC
        ) AS recency_score,

        NTILE(5) OVER (
            ORDER BY frequency
        ) AS frequency_score,

        NTILE(5) OVER (
            ORDER BY monetary
        ) AS monetary_score

    FROM customer_rfm
)
SELECT
    CustomerID,
    recency_days,
    frequency,
    ROUND(monetary, 2) AS monetary,
    recency_score,
    frequency_score,
    monetary_score
FROM rfm_scores
ORDER BY monetary_score DESC;
WITH customer_rfm AS (
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
ORDER BY M_score DESC;
WITH customer_rfm AS (
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
        NTILE(5) OVER (ORDER BY recency_days ASC) AS R_score,
        NTILE(5) OVER (ORDER BY frequency DESC) AS F_score,
        NTILE(5) OVER (ORDER BY monetary DESC) AS M_score
    FROM customer_rfm
),
segments AS (
    SELECT
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
)
SELECT
    customer_segment,
    COUNT(*) AS customer_count
FROM segments
GROUP BY customer_segment
ORDER BY customer_count DESC;
WITH customer_data AS (
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
        *,
        NTILE(5) OVER (ORDER BY recency_days ASC) AS R_score,
        NTILE(5) OVER (ORDER BY frequency DESC) AS F_score,
        NTILE(5) OVER (ORDER BY monetary DESC) AS M_score
    FROM customer_data
)
SELECT
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
    END AS customer_segment,
    COUNT(*) AS customer_count,
    ROUND(SUM(monetary), 2) AS total_revenue
FROM rfm_scores
GROUP BY customer_segment
ORDER BY total_revenue DESC;
SELECT
    RestaurantID,
    COUNT(OrderID) AS total_orders,
    ROUND(AVG(Amount), 2) AS average_order_value
FROM orders_final
GROUP BY RestaurantID
ORDER BY total_orders DESC;
WITH restaurant_revenue AS (
    SELECT
        RestaurantID,
        SUM(Amount) AS total_revenue
    FROM orders_final
    GROUP BY RestaurantID
)
SELECT
    RestaurantID,
    ROUND(total_revenue, 2) AS total_revenue,
    RANK() OVER (
        ORDER BY total_revenue DESC
    ) AS revenue_rank,
    ROUND(
        total_revenue * 100.0 /
        SUM(total_revenue) OVER (),
        2
    ) AS revenue_percentage
FROM restaurant_revenue
ORDER BY revenue_rank;
SELECT
    COUNT(OrderID) AS total_orders,
    COUNT(DISTINCT CustomerID) AS total_customers,
    COUNT(DISTINCT RestaurantID) AS total_restaurants,
    ROUND(SUM(Amount), 2) AS total_revenue,
    ROUND(AVG(Amount), 2) AS average_order_value,
    ROUND(MAX(Amount), 2) AS highest_order_value,
    ROUND(MIN(Amount), 2) AS lowest_order_value
FROM orders_final;
SELECT
    COUNT(DISTINCT CustomerID) AS total_customers,
    ROUND(SUM(Amount), 2) AS total_revenue,
    ROUND(
        SUM(Amount) / COUNT(DISTINCT CustomerID),
        2
    ) AS revenue_per_customer
FROM orders_final
WHERE CustomerID IS NOT NULL;
WITH customer_orders AS (
    SELECT
        CustomerID,
        COUNT(OrderID) AS total_orders
    FROM orders_final
    WHERE CustomerID IS NOT NULL
    GROUP BY CustomerID
)
SELECT
    CASE
        WHEN total_orders = 1 THEN 'One-Time Customer'
        ELSE 'Repeat Customer'
    END AS customer_type,
    COUNT(*) AS customer_count
FROM customer_orders
GROUP BY customer_type
ORDER BY customer_count DESC;
WITH customer_summary AS (
    SELECT
        CustomerID,
        COUNT(OrderID) AS total_orders,
        SUM(Amount) AS total_spent
    FROM orders_final
    WHERE CustomerID IS NOT NULL
    GROUP BY CustomerID
)
SELECT
    CASE
        WHEN total_orders = 1 THEN 'One-Time Customer'
        ELSE 'Repeat Customer'
    END AS customer_type,
    COUNT(*) AS customer_count,
    ROUND(SUM(total_spent), 2) AS total_revenue
FROM customer_summary
GROUP BY customer_type
ORDER BY total_revenue DESC;
WITH customer_revenue AS (
    SELECT
        CustomerID,
        SUM(Amount) AS total_spent
    FROM orders_final
    WHERE CustomerID IS NOT NULL
    GROUP BY CustomerID
),
ranked_customers AS (
    SELECT
        CustomerID,
        total_spent,
        NTILE(10) OVER (
            ORDER BY total_spent DESC
        ) AS customer_group
    FROM customer_revenue
)
SELECT
    ROUND(SUM(
        CASE
            WHEN customer_group = 1 THEN total_spent
            ELSE 0
        END
    ), 2) AS top_10_percent_revenue,
    
    ROUND(SUM(total_spent), 2) AS total_customer_revenue,

    ROUND(
        SUM(
            CASE
                WHEN customer_group = 1 THEN total_spent
                ELSE 0
            END
        ) * 100.0 / SUM(total_spent),
        2
    ) AS top_10_percent_revenue_share
FROM ranked_customers;
SELECT
    CustomerID,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS lifetime_value,
    ROUND(AVG(Amount), 2) AS average_order_value
FROM orders_final
WHERE CustomerID IS NOT NULL
GROUP BY CustomerID
ORDER BY lifetime_value DESC
LIMIT 20;
SELECT
    RestaurantID,
    YEAR(OrderDate) AS order_year,
    MONTH(OrderDate) AS order_month,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_revenue
FROM orders_final
GROUP BY
    RestaurantID,
    YEAR(OrderDate),
    MONTH(OrderDate)
ORDER BY
    RestaurantID,
    order_year,
    order_month;
    WITH monthly_revenue AS (
    SELECT
        YEAR(OrderDate) AS order_year,
        MONTH(OrderDate) AS order_month,
        SUM(Amount) AS total_revenue
    FROM orders_final
    GROUP BY
        YEAR(OrderDate),
        MONTH(OrderDate)
),
ranked_months AS (
    SELECT
        order_year,
        order_month,
        total_revenue,
        RANK() OVER (
            ORDER BY total_revenue DESC
        ) AS revenue_rank
    FROM monthly_revenue
)
SELECT
    order_year,
    order_month,
    ROUND(total_revenue, 2) AS total_revenue
FROM ranked_months
WHERE revenue_rank = 1;
WITH daily_revenue AS (
    SELECT
        DATE(OrderDate) AS order_date,
        COUNT(OrderID) AS total_orders,
        SUM(Amount) AS total_revenue
    FROM orders_final
    GROUP BY DATE(OrderDate)
),
ranked_days AS (
    SELECT
        order_date,
        total_orders,
        total_revenue,
        RANK() OVER (
            ORDER BY total_revenue DESC
        ) AS revenue_rank
    FROM daily_revenue
)
SELECT
    order_date,
    total_orders,
    ROUND(total_revenue, 2) AS total_revenue
FROM ranked_days
WHERE revenue_rank = 1;
SELECT
    COUNT(OrderID) AS total_orders,
    COUNT(DISTINCT CustomerID) AS total_customers,
    COUNT(DISTINCT RestaurantID) AS total_restaurants,
    ROUND(SUM(Amount), 2) AS total_revenue,
    ROUND(AVG(Amount), 2) AS average_order_value,
    ROUND(MAX(Amount), 2) AS highest_order_value,
    ROUND(
        SUM(Amount) / COUNT(DISTINCT CustomerID),
        2
    ) AS revenue_per_customer
FROM orders_final
WHERE CustomerID IS NOT NULL;
CREATE VIEW customer_analytics AS
SELECT
    CustomerID,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_spent,
    ROUND(AVG(Amount), 2) AS average_order_value,
    MIN(OrderDate) AS first_order_date,
    MAX(OrderDate) AS last_order_date
FROM orders_final
WHERE CustomerID IS NOT NULL
GROUP BY CustomerID;
SELECT *
FROM customer_analytics;
CREATE VIEW restaurant_analytics AS
SELECT
    RestaurantID,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_revenue,
    ROUND(AVG(Amount), 2) AS average_order_value,
    MIN(OrderDate) AS first_order_date,
    MAX(OrderDate) AS last_order_date
FROM orders_final
GROUP BY RestaurantID;
SELECT *
FROM restaurant_analytics
ORDER BY total_revenue DESC;
CREATE VIEW monthly_performance AS
SELECT
    YEAR(OrderDate) AS order_year,
    MONTH(OrderDate) AS order_month,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_revenue,
    ROUND(AVG(Amount), 2) AS average_order_value
FROM orders_final
GROUP BY
    YEAR(OrderDate),
    MONTH(OrderDate);
SELECT *
FROM monthly_performance
ORDER BY order_year, order_month;
CREATE VIEW customer_segments AS
SELECT
    CustomerID,
    COUNT(OrderID) AS total_orders,
    ROUND(SUM(Amount), 2) AS total_spent,
    ROUND(AVG(Amount), 2) AS average_order_value,
    CASE
        WHEN SUM(Amount) >= 5000
             AND COUNT(OrderID) >= 5
            THEN 'High Value'

        WHEN COUNT(OrderID) >= 5
            THEN 'Loyal'

        WHEN SUM(Amount) >= 2000
            THEN 'Potential'

        WHEN COUNT(OrderID) = 1
            THEN 'One-Time'

        ELSE 'Regular'
    END AS customer_segment
FROM orders_final
WHERE CustomerID IS NOT NULL
GROUP BY CustomerID;
SELECT
    customer_segment,
    COUNT(*) AS customer_count,
    ROUND(SUM(total_spent), 2) AS segment_revenue
FROM customer_segments
GROUP BY customer_segment
ORDER BY segment_revenue DESC;
CREATE VIEW executive_kpis AS
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
SELECT *
FROM executive_kpis;