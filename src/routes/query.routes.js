import { Router } from "express";
import {
  getQueryTemplate,
  runDatasetQuery,
  topComplaintsQuery,
  complaintsByStatusQuery,
  searchComplaintsQuery,
} from "../controllers/query.controller.js";

const router = Router();

router.get("/template", getQueryTemplate);
router.get("/run", runDatasetQuery);
router.get("/top-complaints", topComplaintsQuery);
router.get("/by-status", complaintsByStatusQuery);
router.get("/search", searchComplaintsQuery);

export default router;
