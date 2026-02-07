import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Quiz, Question } from "../models/Quiz";

// Get All Quizzes
export const getAllQuizzes = async (_req: Request, res: Response) => {
  try {
    const quizRepository = AppDataSource.getRepository(Quiz);
    const quizzes = await quizRepository.find({
      order: { createdAt: "DESC" },
      relations: ["creator"],
    });

    res.json({
      success: true,
      data: quizzes,
    });
  } catch (error) {
    console.error("Get Quizzes Error:", error);
    res.status(500).json({ success: false, message: "فشل في جلب الاختبارات" });
  }
};

// Get Single Quiz with Questions
export const getQuizById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quizRepository = AppDataSource.getRepository(Quiz);

    const quiz = await quizRepository.findOne({
      where: { id },
      relations: ["questions", "creator"],
    });

    if (!quiz) {
      return res
        .status(404)
        .json({ success: false, message: "الاختبار غير موجود" });
    }

    res.json({
      success: true,
      data: quiz,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "فشل في جلب بيانات الاختبار" });
  }
};

// Create Quiz (Admin/Professor)
export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { title, description, category, duration, questions } = req.body;
    // @ts-ignore
    const creatorId = req.user.id;

    const quizRepository = AppDataSource.getRepository(Quiz);
    const questionRepository = AppDataSource.getRepository(Question);

    const newQuiz = quizRepository.create({
      title,
      description,
      category,
      duration,
      creatorId,
    });

    await quizRepository.save(newQuiz);

    // Save questions if provided
    if (questions && questions.length > 0) {
      const questionEntities = questions.map((q: any) =>
        questionRepository.create({ ...q, quizId: newQuiz.id }),
      );
      await questionRepository.save(questionEntities);
    }

    res.status(201).json({
      success: true,
      data: newQuiz,
      message: "تم إنشاء الاختبار بنجاح",
    });
  } catch (error) {
    console.error("Create Quiz Error:", error);
    res.status(500).json({ success: false, message: "فشل في إنشاء الاختبار" });
  }
};
