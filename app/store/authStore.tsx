import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  getProfile,
  editProfile,
  getProfessionalProfile,
  updateProfessionalProfile as updateProfessionalProfileApi,
  UpdateProfessionalProfilePayload,
  ProfessionalProfile,
  UpdatePayload,
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
  profileImageType?: "avatar" | "image";
  completionStatus: number;
  about?: string;
  bio?: string;
  socialLinks?: {
    portfolio?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserStore {
  user: User | null;
  professionalProfile: ProfessionalProfile | null;

  loading: boolean;
  professionalProfileLoading: boolean;

  updatingProfile: boolean;
  updatingProfessionalProfile: boolean;

  setUser: (user: User) => void;

  fetchProfile: () => Promise<void>;
  fetchProfessionalProfile: () => Promise<void>;

  updateProfile: (data: UpdatePayload) => Promise<void>;

  updateProfessionalProfile: (
    data: UpdateProfessionalProfilePayload,
  ) => Promise<void>;

  logout: () => void;
}

export const authStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      professionalProfile: null,

      loading: false,
      professionalProfileLoading: false,

      updatingProfile: false,
      updatingProfessionalProfile: false,

      setUser: (user) => {
        set({ user });
      },

      fetchProfile: async () => {
        try {
          set({ loading: true });

          const response = await getProfile();

          const user = response.data?.data ?? response.data;

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

      fetchProfessionalProfile: async () => {
        try {
          set({ professionalProfileLoading: true });

          const currentUser = authStore.getState().user;

          if (!currentUser?._id) {
            throw new Error("User ID not found");
          }

          const response = await getProfessionalProfile(currentUser._id);

          const professionalProfile = response.data?.data ?? response.data;

          set({
            professionalProfile,
            professionalProfileLoading: false,
          });
        } catch (error) {
          console.error("Failed to fetch professional profile:", error);

          set({
            professionalProfileLoading: false,
          });
        }
      },

      updateProfessionalProfile: async (data) => {
        try {
          set({
            updatingProfessionalProfile: true,
          });

          const currentUser = authStore.getState().user;

          if (!currentUser?._id) {
            throw new Error("User ID not found");
          }

          await updateProfessionalProfileApi(currentUser._id, data);

          const response = await getProfessionalProfile(currentUser._id);

          const professionalProfile = response.data?.data ?? response.data;

          set({
            professionalProfile,
            updatingProfessionalProfile: false,
          });
        } catch (error) {
          set({
            updatingProfessionalProfile: false,
          });

          throw error;
        }
      },

      updateProfile: async (data) => {
        try {
          set({
            updatingProfile: true,
          });

          const response = await editProfile(data);

          const updatedUser =
            response.data?.updatedProfile ??
            response.updatedProfile ??
            response.data?.user ??
            response.user;

          if (updatedUser) {
            set({
              user: updatedUser,
              updatingProfile: false,
            });
          } else {
            const profileResponse = await getProfile();

            const user = profileResponse.data?.data ?? profileResponse.data;

            set({
              user,
              updatingProfile: false,
            });
          }
        } catch (error) {
          set({
            updatingProfile: false,
          });

          throw error;
        }
      },
      

      logout: () => {
        set({
          user: null,
          professionalProfile: null,
          loading: false,
          professionalProfileLoading: false,
          updatingProfile: false,
          updatingProfessionalProfile: false,
        });
      },
    }),
    {
      name: "auth-storage",
    },
  ),
);
