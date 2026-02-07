import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// API routes
import authRoutes from "./routes/authRoutes";
import bookRoutes from "./routes/bookRoutes";
import postRoutes from "./routes/postRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import activityRoutes from "./routes/activityRoutes";
import quizRoutes from "./routes/quizRoutes";
import statsRoutes from "./routes/statsRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/attendance", attendanceRoutes);
app.use("/api/v1/activities", activityRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/stats", statsRoutes);

// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "OK",
    message: "EduHub Backend is running",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.get("/api/v1", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to EduHub API",
    version: "1.0.0",
    endpoints: {
      health: "/health",
      api: "/api/v1",
    },
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start server
const startServer = async () => {
  try {
    // Connect to Database
    const { connectDatabase } = await import("./config/database");
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🔗 API: http://localhost:${PORT}/api/v1`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
