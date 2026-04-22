import bigquery from "../../bigquery/bigquery.js";

const PRICE_PER_TB_USD = 5;

const getEstimatedCostUsd = (totalBytesProcessed) => {
  const bytes = Number(totalBytesProcessed || 0);
  const bytesPerTb = 1024 ** 4;
  return Number(((bytes / bytesPerTb) * PRICE_PER_TB_USD).toFixed(6));
};

const isDryRunEnabled = () => {
  const value = process.env.DRY_RUN;
  if (typeof value !== "string") {
    return false;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "1";
};

export const executeQuery = async ({ sql, params }) => {
  const dryRun = isDryRunEnabled();

  if (dryRun) {
    const [job] = await bigquery.createQueryJob({
      query: sql,
      location: "US",
      params,
      dryRun: true,
      useQueryCache: false,
    });

    const totalBytesProcessed =
      job?.metadata?.statistics?.totalBytesProcessed || "0";

    return {
      dryRun: true,
      totalBytesProcessed,
      estimatedCostUsd: getEstimatedCostUsd(totalBytesProcessed),
      message: "Dry run completed. Query was validated but not executed.",
    };
  }

  const [rows] = await bigquery.query({
    query: sql,
    location: "US",
    params,
  });

  return {
    dryRun: false,
    rowCount: rows.length,
    rows,
  };
};
