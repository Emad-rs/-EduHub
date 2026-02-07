import { Router } from "express";
import {
  getAllActivities,
  createActivity,
} from "../controllers/activityController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", protect, getAllActivities);
router.post("/", protect, createActivity);

export default router;
