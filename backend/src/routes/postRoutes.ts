import { Router } from "express";
import { getAllPosts, createPost } from "../controllers/postController";
import { protect } from "../middleware/auth";

const router = Router();

// Routes
router.get("/", protect, getAllPosts);
router.post("/", protect, createPost);

export default router;
