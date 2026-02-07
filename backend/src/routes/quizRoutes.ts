import { Router } from "express";
import {
  getAllQuizzes,
  getQuizById,
  createQuiz,
} from "../controllers/quizController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/", protect, getAllQuizzes);
router.get("/:id", protect, getQuizById);
router.post("/", protect, createQuiz);

export default router;
