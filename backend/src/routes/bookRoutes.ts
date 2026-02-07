import { Router } from "express";
import {
  getAllBooks,
  createBook,
  getBookById,
} from "../controllers/bookController";
import { protect } from "../middleware/auth";

const router = Router();

// Public Routes (الجميع يمكنه القراءة)
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// Protected Routes (يجب تسجيل الدخول للإضافة)
router.post("/", protect, createBook);

export default router;
