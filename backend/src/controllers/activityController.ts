import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Activity } from "../models/Activity";

// Get All Activities
export const getAllActivities = async (_req: Request, res: Response) => {
  try {
    const activityRepository = AppDataSource.getRepository(Activity);
    const activities = await activityRepository.find({
      order: { date: "ASC" },
      relations: ["organizer"],
    });

    res.json({
      success: true,
      data: activities,
    });
  } catch (error) {
    console.error("Get Activities Error:", error);
    res.status(500).json({ success: false, message: "فشل في جلب الأنشطة" });
  }
};

// Create New Activity (Admin/Professor only)
export const createActivity = async (req: Request, res: Response) => {
  try {
    const { title, description, date, location, imageUrl } = req.body;

    // @ts-ignore
    const organizerId = req.user.id;

    const activityRepository = AppDataSource.getRepository(Activity);

    const newActivity = activityRepository.create({
      title,
      description,
      date,
      location,
      imageUrl,
      organizerId,
    });

    await activityRepository.save(newActivity);

    res.status(201).json({
      success: true,
      data: newActivity,
      message: "تم إنشاء النشاط بنجاح",
    });
  } catch (error) {
    console.error("Create Activity Error:", error);
    res.status(500).json({ success: false, message: "فشل في إنشاء النشاط" });
  }
};
