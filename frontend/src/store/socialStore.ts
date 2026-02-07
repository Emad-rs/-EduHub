import { create } from "zustand";
import api from "@/lib/axios";
import { Post, CreatePostData } from "@/types/post";

interface SocialStore {
  posts: Post[];
  isLoading: boolean;
  fetchPosts: () => Promise<void>;
  createPost: (data: CreatePostData) => Promise<void>;
}

export const useSocialStore = create<SocialStore>((set, get) => ({
  posts: [],
  isLoading: false,

  fetchPosts: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/posts");
      set({ posts: response.data.data });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  createPost: async (data: CreatePostData) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/posts", data);
      const newPost = response.data.data;
      set((state) => ({ posts: [newPost, ...state.posts] }));
    } catch (error) {
      console.error("Failed to create post:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
