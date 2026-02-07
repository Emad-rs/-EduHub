import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Book } from "../models/Book";

// Get All Books
export const getAllBooks = async (_req: Request, res: Response) => {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const books = await bookRepository.find({
      order: { createdAt: "DESC" },
      relations: ["uploader"], // Bring uploader info
    });

    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error("Get Books Error:", error);
    res.status(500).json({ success: false, message: "فشل في جلب الكتب" });
  }
};

// Create New Book
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, description, category, coverUrl, pdfUrl } = req.body;

    // @ts-ignore - User is appended by auth middleware
    const uploaderId = req.user.id;

    const bookRepository = AppDataSource.getRepository(Book);

    const newBook = bookRepository.create({
      title,
      author,
      description,
      category,
      coverUrl,
      pdfUrl,
      uploaderId,
    });

    await bookRepository.save(newBook);

    res.status(201).json({
      success: true,
      data: newBook,
      message: "تم إضافة الكتاب بنجاح",
    });
  } catch (error) {
    console.error("Create Book Error:", error);
    res.status(500).json({ success: false, message: "فشل في إضافة الكتاب" });
  }
};

// Get Single Book
export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const bookRepository = AppDataSource.getRepository(Book);

    const book = await bookRepository.findOne({
      where: { id },
      relations: ["uploader"],
    });

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "الكتاب غير موجود" });
    }

    res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    console.error("Get Book Error:", error);
    res.status(500).json({ success: false, message: "خطأ في السيرفر" });
  }
};
