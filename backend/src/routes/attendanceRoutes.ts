import { Router } from "express";
import {
  markAttendance,
  getMyAttendance,
} from "../controllers/attendanceController";
import { protect } from "../middleware/auth";

const router = Router();

router.post("/mark", protect, markAttendance);
router.get("/history", protect, getMyAttendance);

export default router;
