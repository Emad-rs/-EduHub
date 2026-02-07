import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";

import { User } from "../models/User";
import { Book } from "../models/Book";
import { Post } from "../models/Post";
import { Attendance } from "../models/Attendance";
import { Activity } from "../models/Activity";
import { Quiz, Question } from "../models/Quiz";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL, // Use connection string if available (for production)
  host: process.env.DATABASE_URL
    ? undefined
    : process.env.POSTGRES_HOST || "localhost",
  port: process.env.DATABASE_URL
    ? undefined
    : parseInt(process.env.POSTGRES_PORT || "5432"),
  username: process.env.DATABASE_URL
    ? undefined
    : process.env.POSTGRES_USER || "postgres",
  password: process.env.DATABASE_URL
    ? undefined
    : process.env.POSTGRES_PASSWORD || "Emadsaad",
  database: process.env.DATABASE_URL
    ? undefined
    : process.env.POSTGRES_DB || "MoDB",
  synchronize: true, // Auto-create tables on the cloud database
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // Required for Neon/Render
  logging: false,
  entities: [User, Book, Post, Attendance, Activity, Quiz, Question],
  migrations: [path.join(__dirname, "../migrations/**/*.{ts,js}")],
  subscribers: [path.join(__dirname, "../subscribers/**/*.{ts,js}")],
});

export const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log(
      "✅ Data Source has been initialized! Connected to PostgreSQL (MoDB).",
    );
  } catch (err) {
    console.error("❌ Error during Data Source initialization:", err);
    process.exit(1);
  }
};
