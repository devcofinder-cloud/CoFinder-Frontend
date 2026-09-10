import { create } from "zustand";
import {
  getOtherPosts,
  getPostsByUserId,
  getUserProfileById,
  getRecommendedUsers,
  getSameArchetypeUsers,
  getNearbyUsers,
  universalSearch,
} from "../services/dashboard.service";
import { getProfessionalProfile } from "../services/auth.service";



export interface SearchUser extends User {}

export interface SearchPost extends Post {
    author: PostAuthor;
}

export interface SearchResults {
    query: string;
    users: SearchUser[];
    posts: SearchPost[];
    counts: {
        users: number;
        posts: number;
        total: number;
    };
}

export interface PostMedia {
  url: string;
  publicId: string;
  type: "image" | "video" | "file";
  name: string | null;
  size: number | null;
}

export interface PostAuthor {
  _id: string;
  name?: string;
  avatar?: string;
  profileImage?: string | null;
  archetype?: string;
}

export interface Post {
  _id: string;
  author: PostAuthor;
  content?: string;
  media: PostMedia[];
  likes: string[];
  commentsCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  provider: string;
  displayName: string;
  profileImage: string | null;
  location: string;
  age: number;
  gender: string;
  archetype: string;
  completionStatus: number;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  _id: string;
  name: string;
  level: string;
}

export interface Experience {
  _id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Education {
  _id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string | null;
  description: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
}

export interface Certification {
  _id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  portfolio?: string;
  twitter?: string;
}

export interface ProfessionalProfile {
  _id: string;
  user: string;
  headline: string;
  about: string;
  currentRole: string;
  currentCompany: string;
  industry: string;
  experienceLevel: string;
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  socialLinks: SocialLinks;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfileData {
  user: User;
  professionalProfile: ProfessionalProfile;
}

export interface RecommendedUser extends User {
  recommendationScore?: number;
}

interface DashboardState {
  searchResults: SearchResults | null;
loadingSearch: boolean;

search: (
    query?: string,
    limit?: number
) => Promise<void>;

clearSearch: () => void;
  posts: Post[];
  loadingPosts: boolean;

  userData: UserProfileData | null;
  loadingProfile: boolean;
  professionalProfile: ProfessionalProfile | null;

  userPosts: Post[];

  recommendedUsers: RecommendedUser[];
  sameArchetypeUsers: User[];
  nearbyUsers: User[];

  loadingRecommendedUsers: boolean;
  loadingSameArchetypeUsers: boolean;
  loadingNearbyUsers: boolean;

  fetchPosts: () => Promise<void>;

  fetchProfileById: (userId: string) => Promise<void>;

  clearProfile: () => void;

  fetchPostsByUserId: (userId: string) => Promise<void>;

  fetchProfessionalProfileById: (id: string) => Promise<void>;

  fetchRecommendedUsers: (limit?: number) => Promise<void>;

  fetchSameArchetypeUsers: (limit?: number) => Promise<void>;

  fetchNearbyUsers: (limit?: number) => Promise<void>;
}

export const dashboardStore = create<DashboardState>((set) => ({
  posts: [],
  loadingPosts: false,

  userData: null,
  loadingProfile: false,

  userPosts: [],
  professionalProfile: null,
  searchResults: null,
loadingSearch: false,

  recommendedUsers: [],
  sameArchetypeUsers: [],
  nearbyUsers: [],

  loadingRecommendedUsers: false,
  loadingSameArchetypeUsers: false,
  loadingNearbyUsers: false,

  search: async (query = "", limit = 10) => {
    try {
        set({ loadingSearch: true });

        const response = await universalSearch(query, limit);

        set({
            searchResults: response.data || null,
        });
    } catch (error) {
        console.error("Failed to search:", error);

        set({
            searchResults: null,
        });
    } finally {
        set({
            loadingSearch: false,
        });
    }
},

clearSearch: () => {
    set({
        searchResults: null,
        loadingSearch: false,
    });
},

  fetchPosts: async () => {
    try {
      set({ loadingPosts: true });

      const response = await getOtherPosts();

      set({
        posts: response.data?.data || [],
        loadingPosts: false,
      });
    } catch (error) {
      console.error("Failed to fetch posts:", error);

      set({
        posts: [],
        loadingPosts: false,
      });
    }
  },

  fetchProfileById: async (userId: string) => {
    try {
      set({ loadingProfile: true });

      const response = await getUserProfileById(userId);

      set({
        userData: response.data?.data || null,
        loadingProfile: false,
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);

      set({
        userData: null,
        loadingProfile: false,
      });
    }
  },

  clearProfile: () => {
    set({
      userData: null,
      professionalProfile: null,
    });
  },

  fetchPostsByUserId: async (userId: string) => {
    try {
      set({ loadingPosts: true });

      const response = await getPostsByUserId(userId);

      set({
        userPosts: response.data?.data || [],
      });
    } catch (error) {
      console.error("Failed to fetch user posts:", error);

      set({
        userPosts: [],
      });
    } finally {
      set({ loadingPosts: false });
    }
  },

  fetchProfessionalProfileById: async (id) => {
    try {
      const res = await getProfessionalProfile(id);

      set({
        professionalProfile: res.data?.data || res.data,
      });
    } catch (error) {
      console.error("Failed to fetch professional profile:", error);

      set({
        professionalProfile: null,
      });
    }
  },

  fetchRecommendedUsers: async (limit = 10) => {
    try {
      set({ loadingRecommendedUsers: true });

      const response = await getRecommendedUsers(limit);

      set({
        recommendedUsers: response.data?.data || response.data || [],
      });
    } catch (error) {
      console.error("Failed to fetch recommended users:", error);

      set({
        recommendedUsers: [],
      });
    } finally {
      set({
        loadingRecommendedUsers: false,
      });
    }
  },

  fetchSameArchetypeUsers: async (limit = 10) => {
    try {
      set({ loadingSameArchetypeUsers: true });

      const response = await getSameArchetypeUsers(limit);

      set({
        sameArchetypeUsers: response.data?.data || response.data || [],
      });
    } catch (error) {
      console.error("Failed to fetch same archetype users:", error);

      set({
        sameArchetypeUsers: [],
      });
    } finally {
      set({
        loadingSameArchetypeUsers: false,
      });
    }
  },

  fetchNearbyUsers: async (limit = 10) => {
    try {
      set({ loadingNearbyUsers: true });

      const response = await getNearbyUsers(limit);

      set({
        nearbyUsers: response.data?.data || response.data || [],
      });
    } catch (error) {
      console.error("Failed to fetch nearby users:", error);

      set({
        nearbyUsers: [],
      });
    } finally {
      set({
        loadingNearbyUsers: false,
      });
    }
  },
}));
