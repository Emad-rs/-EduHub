import { create } from "zustand";
import api from "@/lib/axios";
import { Activity, CreateActivityData } from "@/types/activity";

interface ActivityStore {
  activities: Activity[];
  isLoading: boolean;
  fetchActivities: () => Promise<void>;
  addActivity: (data: CreateActivityData) => Promise<void>;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  activities: [],
  isLoading: false,

  fetchActivities: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get("/activities");
      set({ activities: response.data.data });
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  addActivity: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/activities", data);
      set((state) => ({
        activities: [...state.activities, response.data.data],
      }));
    } catch (error) {
      console.error("Failed to add activity:", error);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
