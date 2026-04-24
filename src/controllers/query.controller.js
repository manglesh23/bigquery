import {
  getTemplateQuery,
  runQueryAgainstDataset,
  getTopComplaints,
  getComplaintsByStatus,
  searchComplaints,
  getSkuByCategory,
  getSalesByCategoryWithinDateRange,
} from "../services/query.service.js";

const parseLimit = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
};

export const getQueryTemplate = async (req, res) => {
  const template = getTemplateQuery();

  res.status(200).json({
    success: true,
    data: template,
  });
};

export const runDatasetQuery = async (req, res) => {
  const result = await runQueryAgainstDataset();

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const topComplaintsQuery = async (req, res) => {
  const limit = parseLimit(req.query.limit, 10);
  const result = await getTopComplaints({ limit });

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const complaintsByStatusQuery = async (req, res) => {
  const limit = parseLimit(req.query.limit, 25);
  const result = await getComplaintsByStatus({ limit });

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const searchComplaintsQuery = async (req, res) => {
  const limit = parseLimit(req.query.limit, 50);
  const result = await searchComplaints({
    status: req.query.status,
    limit,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const skuByCategoryQuery = async (req, res) => {
  const result = await getSkuByCategory();

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const salesByCategoryWithinDateRangeQuery = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({
      success: false,
      message: "startDate and endDate are required query parameters.",
    });
  }

  const result = await getSalesByCategoryWithinDateRange({
    startDate,
    endDate,
  });

  res.status(200).json({
    success: true,
    data: result,
  });
};
