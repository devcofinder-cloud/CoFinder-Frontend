import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  getProfile,
  editProfile,
  getProfessionalProfile,
  updateProfessionalProfile,
  UpdateProfessionalProfilePayload,
  ProfessionalProfile,
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

  // Professional profile
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

interface UpdateProfilePayload {
  name?: string;
  username?: string;
  displayName?: string;
  location?: string;
  age?: number;
  gender?: string;

  profileImage?: File | string;
  profileImageType?: "avatar" | "image";
}

interface UserStore {
  user: User | null;

  // Professional profile
  professionalProfile: ProfessionalProfile | null;

  loading: boolean;
  professionalProfileLoading: boolean;

  updatingProfile: boolean;
  updatingProfessionalProfile: boolean;

  setUser: (user: User) => void;

  fetchProfile: () => Promise<void>;

  fetchProfessionalProfile: () => Promise<void>;

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

      // Professional profile initial state
      professionalProfile: null,

      loading: false,
      professionalProfileLoading: false,

      updatingProfile: false,
      updatingProfessionalProfile: false,

      setUser: (user) => set({ user }),

      // =========================
      // GET USER PROFILE
      // =========================
      fetchProfile: async () => {
        try {
          set({
            loading: true,
          });

          const response = await getProfile();

          const user =
            response.data?.data ||
            response.data;

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

      // =========================
      // GET PROFESSIONAL PROFILE
      // =========================
      fetchProfessionalProfile: async () => {
        try {
          set({
            professionalProfileLoading: true,
          });

          const response =
            await getProfessionalProfile();

          const professionalProfile =
            response.data?.data ||
            response.data;

          set({
            professionalProfile,
            professionalProfileLoading: false,
          });
        } catch (error) {
          console.error(
            "Failed to fetch professional profile:",
            error
          );

          set({
            professionalProfileLoading: false,
          });
        }
      },

      // =========================
      // UPDATE USER PROFILE
      // =========================
      updateProfile: async (data) => {
        try {
          set({
            updatingProfile: true,
          });

          const response =
            await editProfile(data);

          const updatedUser =
            response.data?.updatedProfile ||
            response.updatedProfile;

          if (updatedUser) {
            set({
              user: updatedUser,
              updatingProfile: false,
            });
          } else {
            const profileResponse =
              await getProfile();

            const user =
              profileResponse.data?.data ||
              profileResponse.data;

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

      // =========================
      // UPDATE PROFESSIONAL PROFILE
      // =========================
      updateProfessionalProfile: async (
        data
      ) => {
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

          // GET latest professional profile
          const profileResponse =
            await getProfessionalProfile();

          const professionalProfile =
            profileResponse.data?.data ||
            profileResponse.data;

          set({
            professionalProfile,
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

      // =========================
      // LOGOUT
      // =========================
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
    }
  )
);