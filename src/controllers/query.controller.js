import {
  getTemplateQuery,
  runQueryAgainstDataset,
  getTopComplaints,
  getComplaintsByStatus,
  searchComplaints,
} from "../services/query.service.js";

const parseLimit = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }
  return parsed;
};

export const getQueryTemplate = async (req, res, next) => {
  try {
    const template = getTemplateQuery();

    res.status(200).json({
      success: true,
      data: template,
    });
  } catch (error) {
    next(error);
  }
};

export const runDatasetQuery = async (req, res, next) => {
  try {
    const result = await runQueryAgainstDataset();

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const topComplaintsQuery = async (req, res, next) => {
  try {
    const limit = parseLimit(req.query.limit, 10);
    const result = await getTopComplaints({ limit });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const complaintsByStatusQuery = async (req, res, next) => {
  try {
    const limit = parseLimit(req.query.limit, 25);
    const result = await getComplaintsByStatus({ limit });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const searchComplaintsQuery = async (req, res, next) => {
  try {
    const limit = parseLimit(req.query.limit, 50);
    const result = await searchComplaints({
      status: req.query.status,
      limit,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
