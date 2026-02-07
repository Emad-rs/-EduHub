import { create } from "zustand";
import api from "@/lib/axios";

interface Stats {
  booksRead: number;
  communityPosts: number;
  attendanceSessions: number;
  availableQuizzes: number;
  studyHours: number;
  gpa: string;
}

interface StatsStore {
  stats: Stats | null;
  isLoading: boolean;
  fetchStats: () => Promise<void>;
}

export const useStatsStore = create<StatsStore>((set) => ({
  stats: null,
  isLoading: false,

  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/stats/overview");
      set({ stats: response.data.data });
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
