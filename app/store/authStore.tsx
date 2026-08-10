import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  setUser: (user: User) => void;
  logout: () => void;
}

export const authStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user) => set({ user }),

      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
    }
  )
);