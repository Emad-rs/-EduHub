import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Attendance } from "../models/Attendance";

// Register attendance
export const markAttendance = async (req: Request, res: Response) => {
  try {
    const { sessionId, sessionName } = req.body;

    // @ts-ignore
    const studentId = req.user.id;

    const attendanceRepository = AppDataSource.getRepository(Attendance);

    // Check if already marked for this session
    const existing = await attendanceRepository.findOne({
      where: { sessionId, studentId },
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "لقد قمت بتسجيل الحضور بالفعل لهذه المحاضرة",
      });
    }

    const newAttendance = attendanceRepository.create({
      sessionId,
      sessionName,
      studentId,
    });

    await attendanceRepository.save(newAttendance);

    res.status(201).json({
      success: true,
      message: "تم تسجيل حضورك بنجاح! ✅",
      data: newAttendance,
    });
  } catch (error) {
    console.error("Attendance Error:", error);
    res.status(500).json({ success: false, message: "فشل في تسجيل الحضور" });
  }
};

// Get attendance history (for Professor or student)
export const getMyAttendance = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    // @ts-ignore
    const userRole = req.user.role;

    console.log(`Fetching attendance for user: ${userId}, Role: ${userRole}`);

    const attendanceRepository = AppDataSource.getRepository(Attendance);

    let logs;
    if (userRole === "admin" || userRole === "professor") {
      // For professors, show all logs with student info
      logs = await attendanceRepository.find({
        relations: ["student"],
        order: { timestamp: "DESC" },
      });
    } else {
      // For students, show only their logs
      logs = await attendanceRepository.find({
        where: { studentId: userId },
        order: { timestamp: "DESC" },
      });
    }

    console.log(`Found ${logs.length} attendance records.`);

    res.json({ success: true, data: logs });
  } catch (error) {
    console.error("getMyAttendance Error:", error);
    res.status(500).json({ success: false, message: "خطأ في جلب سجل الحضور" });
  }
};
