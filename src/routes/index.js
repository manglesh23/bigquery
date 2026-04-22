import { Router } from "express";
import queryRouter from "./query.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BigQuery API v1",
  });
});

router.use("/query", queryRouter);

export default router;
