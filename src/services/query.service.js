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
