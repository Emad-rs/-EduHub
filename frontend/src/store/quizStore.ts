import { create } from "zustand";
import api from "@/lib/axios";
import { Quiz } from "@/types/quiz";

interface QuizStore {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  isLoading: boolean;
  fetchQuizzes: () => Promise<void>;
  fetchQuizById: (id: string) => Promise<void>;
}

export const useQuizStore = create<QuizStore>((set) => ({
  quizzes: [],
  currentQuiz: null,
  isLoading: false,

  fetchQuizzes: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/quizzes");
      set({ quizzes: response.data.data });
    } catch (error) {
      console.error("Failed to fetch quizzes:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchQuizById: async (id: string) => {
    set({ isLoading: true });
    try {
      const response = await api.get(`/quizzes/${id}`);
      set({ currentQuiz: response.data.data });
    } catch (error) {
      console.error("Failed to fetch quiz:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
