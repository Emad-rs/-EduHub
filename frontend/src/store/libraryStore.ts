import { create } from "zustand";
import api from "@/lib/axios";
import { Book, CreateBookData } from "@/types/book";

interface LibraryStore {
  books: Book[];
  isLoading: boolean;
  fetchBooks: () => Promise<void>;
  addBook: (data: CreateBookData) => Promise<void>;
}

export const useLibraryStore = create<LibraryStore>((set, get) => ({
  books: [],
  isLoading: false,

  fetchBooks: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/books");
      set({ books: response.data.data });
    } catch (error) {
      console.error("Failed to fetch books:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addBook: async (data: CreateBookData) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/books", data);
      const newBook = response.data.data;
      set((state) => ({ books: [newBook, ...state.books] }));
    } catch (error) {
      console.error("Failed to add book:", error);
      throw error; // Re-throw to handle in component (e.g., show toast)
    } finally {
      set({ isLoading: false });
    }
  },
}));
