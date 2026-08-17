import { create } from "zustand";
import api from "@/app/lib/axios";
import { getOtherPosts } from "../services/dashboard.service";

interface Post {
    _id: string;
    content?: string;
    media?: {
        url: string;
        publicId: string;
        type: "image" | "video" | "file";
    }[];
    author?: {
        _id: string;
        name?: string;
        avatar?: string;
    };
    createdAt?: string;
    updatedAt?: string;
}

interface DashboardState {
    posts: Post[];
    loadingPosts: boolean;

    fetchPosts: () => Promise<void>;
}

export const dashboardStore = create<DashboardState>((set) => ({
    posts: [],
    loadingPosts: false,

    fetchPosts: async () => {
        try {
            set({ loadingPosts: true });

            const response = await getOtherPosts();
            console.log(response)

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
}));