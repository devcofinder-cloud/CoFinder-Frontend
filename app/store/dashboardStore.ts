import { create } from "zustand";
import {
  getOtherPosts,
  getPostsByUserId,
  getUserProfileById,
  getRecommendedUsers,
  getSameArchetypeUsers,
  getNearbyUsers,
  universalSearch,
  getPostById,
  togglePostLike,
  addPostComment,
  getPostComments,
  deletePostComment,

 
} from "../services/dashboard.service";
import { getProfessionalProfile } from "../services/auth.service";
import {toggleSavePost, getSavedPosts, togglePostUpvote, getPostVotes,togglePostDownvote,  fetchRecentlyPosted,
} from '../services/posts.service'

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

  upvotes: string[];
  downvotes: string[];

  upvotesCount?: number;
  downvotesCount?: number;

  hasUpvoted?: boolean;
  hasDownvoted?: boolean;

  commentsCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  isSaved?: boolean;
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

  search: (query?: string, limit?: number) => Promise<void>;

  clearSearch: () => void;
  posts: Post[];
  loadingPosts: boolean;
  post: Post | null;
  loadingPost: boolean;

  fetchPostById: (postId: string) => Promise<void>;
  clearPost: () => void;

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



  toggleLike: (postId: string, userId: string) => Promise<any>;
  toggleSave: (postId: string) => Promise<any>;
  fetchSavedPosts: () => Promise<any>;

  addComment: (postId: string, content: string) => Promise<any>;

  getComments: (postId: string) => Promise<any[]>;

  deleteComment: (commentId: string, postId: string) => Promise<any>;
  fetchPosts: () => Promise<void>;

  fetchProfileById: (userId: string) => Promise<void>;

  clearProfile: () => void;

  fetchPostsByUserId: (userId: string) => Promise<void>;

  fetchProfessionalProfileById: (id: string) => Promise<void>;

  fetchRecommendedUsers: (limit?: number) => Promise<void>;

  fetchSameArchetypeUsers: (limit?: number) => Promise<void>;
    getPostVotes: (postId: string) => Promise<any>;
  toggleUpvote: (postId: string) => Promise<any>;
  toggleDownvote: (postId: string) => Promise<any>;

  fetchNearbyUsers: (limit?: number) => Promise<void>;
  savedPosts: Post[];
  loadingSavedPosts: boolean;

  recentlyPosted: Post[];
loadingRecentlyPosted: boolean;

fetchRecentlyPosted: (page?: number, limit?: number) => Promise<void>;
}

export const dashboardStore = create<DashboardState>((set) => ({
  posts: [],
  loadingPosts: false,
  post: null,
  loadingPost: false,
  
recentlyPosted: [],
loadingRecentlyPosted: false,
  savedPosts: [],
  loadingSavedPosts: false,

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

  fetchPostById: async (postId: string) => {
    try {
      set({ loadingPost: true });

      const response = await getPostById(postId);

      set({
        post: response.data?.data || response.data || null,
      });
    } catch (error) {
      console.error("Failed to fetch post:", error);

      set({
        post: null,
      });
    } finally {
      set({
        loadingPost: false,
      });
    }
  },

  clearPost: () => {
    set({
      post: null,
      loadingPost: false,
    });
  },

  toggleLike: async (postId: string, userId: string) => {
    try {
      const res = await togglePostLike(postId);

      if (res.success) {
        const { liked, likesCount } = res.data;

        set((state) => {
          const updatePost = (post: Post): Post => {
            if (post._id !== postId) {
              return post;
            }

            let updatedLikes = [...post.likes];

            if (liked) {
              if (!updatedLikes.includes(userId)) {
                updatedLikes.push(userId);
              }
            } else {
              updatedLikes = updatedLikes.filter((id) => id !== userId);
            }

            return {
              ...post,
              likes: updatedLikes,
            };
          };

          return {
            posts: state.posts.map(updatePost),

            userPosts: state.userPosts.map(updatePost),

            post:
              state.post?._id === postId ? updatePost(state.post) : state.post,
          };
        });
      }

      return res;
    } catch (error) {
      console.error("Toggle like error:", error);
      throw error;
    }
  },

  addComment: async (postId: string, content: string) => {
    try {
      const res = await addPostComment(postId, content);

      if (res.success) {
        set((state) => {
          const updatePost = (post: Post): Post => {
            if (post._id !== postId) {
              return post;
            }

            return {
              ...post,
              commentsCount: post.commentsCount + 1,
            };
          };

          return {
            posts: state.posts.map(updatePost),

            userPosts: state.userPosts.map(updatePost),

            post:
              state.post?._id === postId ? updatePost(state.post) : state.post,
          };
        });
      }

      return res;
    } catch (error) {
      console.error("Add comment error:", error);
      throw error;
    }
  },

  getComments: async (postId: string) => {
    try {
      const res = await getPostComments(postId);

      return res.data?.data || res.data || [];
    } catch (error) {
      console.error("Get comments error:", error);
      throw error;
    }
  },

  deleteComment: async (commentId: string, postId: string) => {
    try {
      const res = await deletePostComment(commentId);

      if (res.success) {
        set((state) => {
          const updatePost = (post: Post): Post => {
            if (post._id !== postId) {
              return post;
            }

            return {
              ...post,
              commentsCount: Math.max(0, post.commentsCount - 1),
            };
          };

          return {
            posts: state.posts.map(updatePost),

            userPosts: state.userPosts.map(updatePost),

            post:
              state.post?._id === postId ? updatePost(state.post) : state.post,
          };
        });
      }

      return res;
    } catch (error) {
      console.error("Delete comment error:", error);
      throw error;
    }
  },

  toggleSave: async (postId: string) => {
    try {
      const res = await toggleSavePost(postId);

      if (res.success) {
        const saved = res.data.saved;

        set((state) => {
          const updatePost = (post: Post): Post => {
            if (post._id !== postId) {
              return post;
            }

            return {
              ...post,
              isSaved: saved,
            };
          };

          return {
            posts: state.posts.map(updatePost),

            userPosts: state.userPosts.map(updatePost),

            post:
              state.post?._id === postId ? updatePost(state.post) : state.post,

            savedPosts: saved
              ? state.savedPosts.some((p) => p._id === postId)
                ? state.savedPosts
                : state.savedPosts
              : state.savedPosts.filter((p) => p._id !== postId),
          };
        });
      }

      return res;
    } catch (error) {
      console.error("Toggle save error:", error);
      throw error;
    }
  },

  fetchSavedPosts: async () => {
  try {
    set({ loadingSavedPosts: true });

    const res = await getSavedPosts();

    const posts =
      res.data?.data ||
      res.data ||
      [];

    set({
      savedPosts: Array.isArray(posts)
        ? posts
        : [],
    });

    return posts;
  } catch (error) {
    console.error(
      "Fetch saved posts error:",
      error
    );

    throw error;
  } finally {
    set({
      loadingSavedPosts: false,
    });
  }
},  getPostVotes: async (postId: string) => {
    try {
      const res = await getPostVotes(postId);

      return res.data?.data || res.data || null;
    } catch (error) {
      console.error("Get post votes error:", error);
      throw error;
    }
  },

  toggleUpvote: async (postId: string) => {
    try {
      const res = await togglePostUpvote(postId);

      if (res.success) {
        const {
          upvoted,
          downvoted,
          upvotesCount,
          downvotesCount,
        } = res.data;

        set((state) => {
          const updatePost = (post: Post): Post => {
            if (post._id !== postId) {
              return post;
            }

            return {
              ...post,
              upvotes: upvoted
                ? [...(post.upvotes || [])]
                : [...(post.upvotes || [])],
              downvotes: downvoted
                ? [...(post.downvotes || [])]
                : [...(post.downvotes || [])],
              upvotesCount,
              downvotesCount,
            };
          };

          return {
            posts: state.posts.map(updatePost),
            userPosts: state.userPosts.map(updatePost),
            post:
              state.post?._id === postId
                ? updatePost(state.post)
                : state.post,
          };
        });
      }

      return res;
    } catch (error) {
      console.error("Toggle upvote error:", error);
      throw error;
    }
  },

  toggleDownvote: async (postId: string) => {
    try {
      const res = await togglePostDownvote(postId);

      if (res.success) {
        const {
          upvoted,
          downvoted,
          upvotesCount,
          downvotesCount,
        } = res.data;

        set((state) => {
          const updatePost = (post: Post): Post => {
            if (post._id !== postId) {
              return post;
            }

            return {
              ...post,
              upvotes: [...(post.upvotes || [])],
              downvotes: [...(post.downvotes || [])],
              upvotesCount,
              downvotesCount,
            };
          };

          return {
            posts: state.posts.map(updatePost),
            userPosts: state.userPosts.map(updatePost),
            post:
              state.post?._id === postId
                ? updatePost(state.post)
                : state.post,
          };
        });
      }

      return res;
    } catch (error) {
      console.error("Toggle downvote error:", error);
      throw error;
    }
  },

  fetchRecentlyPosted: async (page = 1, limit = 10) => {
  try {
    set({ loadingRecentlyPosted: true });

    const response = await fetchRecentlyPosted(page, limit);

    const posts =
      response.data?.posts ||
      response.data?.data ||
      response.data ||
      [];

    set({
      recentlyPosted: Array.isArray(posts) ? posts : [],
    });
  } catch (error) {
    console.error("Failed to fetch recently posted:", error);

    set({
      recentlyPosted: [],
    });
  } finally {
    set({
      loadingRecentlyPosted: false,
    });
  }
},
}));
