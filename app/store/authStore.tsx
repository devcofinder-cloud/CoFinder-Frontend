import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  getProfile,
  editProfile,
  updateProfessionalProfile,
  UpdateProfessionalProfilePayload,
} from "../services/auth.service";

interface User {
  _id: string;

  name: string;
  email: string;

  username?: string;
  displayName?: string;
  location?: string;
  age?: number;
  gender?: string;
  archetype?: string;

  role: string;

  googleId: string | null;
  provider: string;

  profileImage: string | null;

  completionStatus: number;

  createdAt: string;
  updatedAt: string;

  __v: number;
}

interface UpdateProfilePayload {
  name?: string;
  username?: string;
  displayName?: string;
  location?: string;
  age?: number;
  gender?: string;
  profileImage?: File;
}

interface UserStore {
  user: User | null;

  loading: boolean;
  updatingProfile: boolean;
  updatingProfessionalProfile: boolean;

  setUser: (user: User) => void;

  fetchProfile: () => Promise<void>;

  updateProfile: (
    data: UpdateProfilePayload
  ) => Promise<void>;

  updateProfessionalProfile: (
    data: UpdateProfessionalProfilePayload
  ) => Promise<void>;

  logout: () => void;
}

export const authStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,

      loading: false,
      updatingProfile: false,
      updatingProfessionalProfile: false,

      setUser: (user) => set({ user }),

      fetchProfile: async () => {
        try {
          set({ loading: true });

          const response = await getProfile();

          const user = response.data;

          set({
            user,
            loading: false,
          });
        } catch (error) {
          console.error(
            "Failed to fetch profile:",
            error
          );

          set({
            loading: false,
          });
        }
      },

      updateProfile: async (data) => {
        try {
          set({
            updatingProfile: true,
          });

          const response = await editProfile(data);

          const updatedUser =
            response.data?.updatedProfile ||
            response.updatedProfile;

          if (updatedUser) {
            set({
              user: updatedUser,
              updatingProfile: false,
            });
          } else {
            const profileResponse = await getProfile();

            const user = profileResponse.data.data;

            set({
              user,
              updatingProfile: false,
            });
          }
        } catch (error) {
          console.error(
            "Failed to update profile:",
            error
          );

          set({
            updatingProfile: false,
          });

          throw error;
        }
      },

      updateProfessionalProfile: async (data) => {
        try {
          set({
            updatingProfessionalProfile: true,
          });

          const response =
            await updateProfessionalProfile(data);

          console.log(
            "Professional profile updated:",
            response
          );

          set({
            updatingProfessionalProfile: false,
          });
        } catch (error) {
          console.error(
            "Failed to update professional profile:",
            error
          );

          set({
            updatingProfessionalProfile: false,
          });

          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          loading: false,
          updatingProfile: false,
          updatingProfessionalProfile: false,
        });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);