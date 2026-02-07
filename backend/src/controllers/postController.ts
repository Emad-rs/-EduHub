import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Post } from "../models/Post";

// Get All Posts
export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const postRepository = AppDataSource.getRepository(Post);
    const posts = await postRepository.find({
      order: { createdAt: "DESC" },
      relations: ["author"], // Bring author info
    });

    res.json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Get Posts Error:", error);
    res.status(500).json({ success: false, message: "فشل في جلب المنشورات" });
  }
};

// Create New Post
export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;

    // @ts-ignore
    const authorId = req.user.id;

    if (!content) {
      return res
        .status(400)
        .json({ success: false, message: "محتوى المنشور مطلوب" });
    }

    const postRepository = AppDataSource.getRepository(Post);

    const newPost = postRepository.create({
      content,
      authorId,
    });

    await postRepository.save(newPost);

    // Fetch again to include author details
    const savedPost = await postRepository.findOne({
      where: { id: newPost.id },
      relations: ["author"],
    });

    res.status(201).json({
      success: true,
      data: savedPost,
      message: "تم نشر المنشور بنجاح",
    });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ success: false, message: "فشل في نشر المنشور" });
  }
};
