import { create } from "zustand";
import {
    getOtherPosts,
    getPostsByUserId,
    getUserProfileById,
} from "../services/dashboard.service";

/* =========================================================
   POST TYPES
========================================================= */

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

/* =========================================================
   USER TYPES
========================================================= */

export interface User {
    _id: string;
    name: string;
    username: string;
    email:string;
    provider:string;
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

/* =========================================================
   PROFESSIONAL PROFILE TYPES
========================================================= */

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

/* =========================================================
   USER PROFILE RESPONSE
========================================================= */

export interface UserProfileData {
    user: User;
    professionalProfile: ProfessionalProfile;
}

/* =========================================================
   DASHBOARD STATE
========================================================= */

interface DashboardState {
    posts: Post[];
    loadingPosts: boolean;

    userData: UserProfileData | null;
    loadingProfile: boolean;

    userPosts: Post[];

    fetchPosts: () => Promise<void>;

    fetchProfileById: (
        userId: string
    ) => Promise<void>;

    clearProfile: () => void;

    fetchPostsByUserId: (
        userId: string
    ) => Promise<void>;
}

/* =========================================================
   STORE
========================================================= */

export const dashboardStore = create<DashboardState>((set) => ({
    posts: [],
    loadingPosts: false,

    userData: null,
    loadingProfile: false,

    userPosts:[],

    fetchPosts: async () => {
        try {
            set({ loadingPosts: true });

            const response = await getOtherPosts();

            console.log("Posts response:", response);

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

            console.log("Profile response:", response);

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
        });
    },

    fetchPostsByUserId: async (userId: string) => {
    try {
        set({loadingPosts:true})
        const response = await getPostsByUserId(userId);

        set({
            userPosts: response.data?.data || [],
        });
    } catch (error) {
        console.error("Failed to fetch user posts:", error);

        set({
            userPosts: [],
        });
    }finally{
        set({loadingPosts:false})
    }
},
}));