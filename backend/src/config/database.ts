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
  host: process.env.POSTGRES_HOST || "localhost",
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "Emadsaad",
  database: process.env.POSTGRES_DB || "MoDB",
  synchronize: true, // ⚠️ True for dev only. False in production!
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
