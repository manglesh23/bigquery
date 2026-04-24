import { executeQuery } from "../utils/executeQuery.js";

export const getTemplateQuery = () => {
  return {
    dataset: "bigquery-public-data.austin_311.311_service_requests",
    sql: "SELECT unique_key, complaint_description, status FROM `bigquery-public-data.austin_311.311_service_requests` LIMIT 100",
    location: "US",
    note: "Run the server with DRY_RUN=true (example: npm run dev:dryrun) to return cost estimates instead of executing queries.",
  };
};

export const runQueryAgainstDataset = async () => {
  const sql = `
    SELECT unique_key, complaint_description, status
    FROM \`bigquery-public-data.austin_311.311_service_requests\`
    LIMIT 100
  `;

  return executeQuery({ sql });
};

export const getTopComplaints = async ({ limit = 10 } = {}) => {
  const sql = `
    SELECT complaint_description, COUNT(*) AS total_count
    FROM \`bigquery-public-data.austin_311.311_service_requests\`
    WHERE complaint_description IS NOT NULL
    GROUP BY complaint_description
    ORDER BY total_count DESC
    LIMIT @limit
  `;

  return executeQuery({
    sql,
    params: { limit },
  });
};

export const getComplaintsByStatus = async ({
  limit = 25,
} = {}) => {
  const sql = `
    SELECT status, COUNT(*) AS total_count
    FROM \`bigquery-public-data.austin_311.311_service_requests\`
    WHERE status IS NOT NULL
    GROUP BY status
    ORDER BY total_count DESC
    LIMIT @limit
  `;

  return executeQuery({
    sql,
    params: { limit },
  });
};

export const searchComplaints = async ({
  status,
  limit = 50,
} = {}) => {
  const sql = `
    SELECT unique_key, complaint_description, status
    FROM \`bigquery-public-data.austin_311.311_service_requests\`
    WHERE (@status IS NULL OR LOWER(status) = LOWER(@status))
    LIMIT @limit
  `;

  return executeQuery({
    sql,
    params: { status: status || null, limit },
  });
};

export const getSkuByCategory = async () => {
  const sql = `
    SELECT
      category_name,
      COUNT(DISTINCT sku_name) AS sku_count,
      ARRAY_AGG(DISTINCT sku_name) AS sku_name
    FROM \`learningbigq-493718.product_data.product_data\`
    GROUP BY category_name
  `;

  return executeQuery({ sql });
};

export const getSalesByCategoryWithinDateRange = async ({
  startDate,
  endDate,
} = {}) => {
  const sql = `
    SELECT
      category_name,
     ROUND(SUM(COALESCE(SAFE_CAST(sales AS FLOAT64), 0)),2 )AS total_sales
    FROM \`learningbigq-493718.product_data.product_data\`
    WHERE DATE(scrape_timestamp) BETWEEN @startDate AND @endDate
    GROUP BY category_name
    ORDER BY total_sales DESC
  `;

  return executeQuery({
    sql,
    params: { startDate, endDate },
  });
};
