import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/app/lib/axios";
import { getProfile } from "../services/auth.service";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  googleId: string | null;
  provider: string;
  profileImage: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  completionStatus: number;
}

interface UserStore {
  user: User | null;
  loading: boolean;

  setUser: (user: User) => void;
  fetchProfile: () => Promise<void>;
  logout: () => void;
}

export const authStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      loading: false,

      setUser: (user) => set({ user }),

      fetchProfile: async () => {
        try {
          set({ loading: true });

          const response = await getProfile();

          const user = response.data.data;

          set({
            user,
            loading: false,
          });
        } catch (error) {
          console.error("Failed to fetch profile:", error);

          set({
            loading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          loading: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);