import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getQueryTemplate,
  runDatasetQuery,
  topComplaintsQuery,
  complaintsByStatusQuery,
  searchComplaintsQuery,
  skuByCategoryQuery,
  salesByCategoryWithinDateRangeQuery,
} from "../controllers/query.controller.js";

const router = Router();

router.get("/template", asyncHandler(getQueryTemplate));
router.get("/run", asyncHandler(runDatasetQuery));
router.get("/top-complaints", asyncHandler(topComplaintsQuery));
router.get("/by-status", asyncHandler(complaintsByStatusQuery));
router.get("/search", asyncHandler(searchComplaintsQuery));
router.get("/sku-by-category", asyncHandler(skuByCategoryQuery));
router.get(
  "/sales-by-category",
  asyncHandler(salesByCategoryWithinDateRangeQuery)
);

export default router;
