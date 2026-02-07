import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Book } from "../models/Book";
import { Post } from "../models/Post";
import { Attendance } from "../models/Attendance";
import { Quiz } from "../models/Quiz";

export const getUserStats = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;

    const bookRepo = AppDataSource.getRepository(Book);
    const postRepo = AppDataSource.getRepository(Post);
    const attendanceRepo = AppDataSource.getRepository(Attendance);
    const quizRepo = AppDataSource.getRepository(Quiz);

    // Get Counts
    const booksCount = await bookRepo.count(); // Total books in system
    const userPostsCount = await postRepo.count({
      where: { authorId: userId },
    });
    const attendanceCount = await attendanceRepo.count({
      where: { studentId: userId },
    });
    const quizzesCount = await quizRepo.count();

    res.json({
      success: true,
      data: {
        booksRead: booksCount, // For simplicity now
        communityPosts: userPostsCount,
        attendanceSessions: attendanceCount,
        availableQuizzes: quizzesCount,
        studyHours: Math.floor(Math.random() * 50) + 10, // Simulated hours
        gpa: (Math.random() * (4.0 - 2.5) + 2.5).toFixed(2), // Simulated GPA
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "فشل في جلب الإحصائيات" });
  }
};
