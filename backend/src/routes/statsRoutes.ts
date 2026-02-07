import { Router } from "express";
import { getUserStats } from "../controllers/statsController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/overview", protect, getUserStats);

export default router;
