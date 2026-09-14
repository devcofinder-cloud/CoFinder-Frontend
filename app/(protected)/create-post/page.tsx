"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Eye,
  Edit3,
  Trash2,
  Image as ImageIcon,
  Video,
  FileText,
  Search,
  X,
  BarChart3,
  FileEdit,
  Send,
  Loader2,
  AlertCircle,
  RefreshCw,
  Play,
} from "lucide-react";

import {
  createPost,
  getMyPosts,
  updatePost,
  getPostById,
  deletePost,
} from "@/app/services/posts.service";

type MediaType = "image" | "video" | "file";

interface PostMedia {
  url: string;
  publicId: string;
  type: MediaType;
  name?: string | null;
  size?: number | null;
}

interface Post {
  _id: string;
  author: any;
  content?: string;
  media: PostMedia[];
  likes: string[];
  commentsCount: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SelectedMedia {
  file: File;
  preview: string;
  type: MediaType;
}

function unwrapResponse(response: any) {
  return response?.data?.data ?? response?.data ?? response;
}

function normalizePosts(response: any): Post[] {
  const data = unwrapResponse(response);

  if (Array.isArray(data)) return data;

  if (Array.isArray(data?.posts)) return data.posts;

  if (Array.isArray(data?.data)) return data.data;

  return [];
}

function formatDate(date: string) {
  if (!date) return "";

  const created = new Date(date);
  const now = new Date();

  const diff = now.getTime() - created.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;

  return created.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getMediaIcon(type: MediaType) {
  if (type === "image") return <ImageIcon size={16} />;
  if (type === "video") return <Video size={16} />;
  return <FileText size={16} />;
}

function getInitials(author: any) {
  const name = author?.name || author?.fullName || author?.username || "User";

  return name
    .split(" ")
    .slice(0, 2)
    .map((word: string) => word[0])
    .join("")
    .toUpperCase();
}

function getAuthorName(author: any) {
  return author?.name || author?.fullName || author?.username || "You";
}

export default function MyPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async (isRefresh = false) => {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await getMyPosts();

      const fetchedPosts = normalizePosts(response);

      setPosts(fetchedPosts.filter((post) => !post.isDeleted));
    } catch (error: any) {
      console.error("GET MY POSTS ERROR:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to load your posts.",
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();

    return posts.filter((post) => {
      if (!query) return true;

      return (
        post.content?.toLowerCase().includes(query) ||
        post.media?.some((media) => media.name?.toLowerCase().includes(query))
      );
    });
  }, [posts, search]);

  const totalLikes = posts.reduce(
    (total, post) => total + (post.likes?.length || 0),
    0,
  );

  const totalComments = posts.reduce(
    (total, post) => total + (post.commentsCount || 0),
    0,
  );

  const handleCreated = () => {
    setShowCreate(false);
    fetchPosts(true);
  };

  const handleUpdated = () => {
    setEditingPost(null);
    fetchPosts(true);
  };

  const handleDeleted = (postId: string) => {
    setPosts((prev) => prev.filter((post) => post._id !== postId));
  };

  return (
    <main className="min-h-screen bg-white text-black">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-zinc-200/50 blur-3xl" />

        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-zinc-200/40 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-3 pb-24 pt-5 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Content
              </p>

              <h1 className="text-2xl font-black tracking-tight sm:text-4xl">
                My Posts
              </h1>

              <p className="mt-1 max-w-md text-xs text-zinc-500 sm:text-sm">
                Create, manage and track everything you've shared.
              </p>
            </div>

            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setShowCreate(true)}
              className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-black px-4 text-xs font-bold text-white shadow-lg shadow-black/10 sm:px-5 sm:text-sm"
            >
              <Plus size={17} />

              <span className="hidden sm:block">Create Post</span>
            </motion.button>
          </div>
        </motion.div>

        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-5 grid grid-cols-3 gap-2 sm:gap-3"
        >
          <StatCard
            icon={<FileEdit size={17} />}
            value={posts.length.toString()}
            label="Posts"
          />

          <StatCard
            icon={<Heart size={17} />}
            value={totalLikes.toString()}
            label="Likes"
          />

          <StatCard
            icon={<MessageCircle size={17} />}
            value={totalComments.toString()}
            label="Comments"
          />
        </motion.div>

        {/* SEARCH + REFRESH */}
        <div className="mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your posts..."
              className="h-12 w-full rounded-2xl border border-zinc-200 bg-white pl-11 pr-4 text-sm outline-none transition focus:border-zinc-400"
            />

            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-100"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => fetchPosts(true)}
            disabled={refreshing}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-white text-zinc-500 transition hover:text-black disabled:opacity-50"
          >
            <RefreshCw size={17} className={refreshing ? "animate-spin" : ""} />
          </motion.button>
        </div>

        {/* FILTER */}
        <div className="mb-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {["All"].map((tab) => {
            const active = activeTab === tab;

            return (
              <motion.button
                key={tab}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition ${
                  active
                    ? "bg-black text-white"
                    : "border border-zinc-200 bg-white text-zinc-500"
                }`}
              >
                {tab}
              </motion.button>
            );
          })}
        </div>

        {/* ERROR */}
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-5 flex items-center justify-between gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-red-500">
                <AlertCircle size={17} />
              </div>

              <p className="text-xs font-medium text-red-600">{error}</p>
            </div>

            <button
              onClick={() => fetchPosts()}
              className="shrink-0 rounded-lg bg-black px-3 py-2 text-[10px] font-bold text-white"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* LOADING */}
        {loading ? (
          <PostsSkeleton />
        ) : (
          <>
            {/* POSTS */}
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, index) => (
                <MyPostCard
                  key={post._id}
                  post={post}
                  index={index}
                  onEdit={() => setEditingPost(post)}
                  onDeleted={handleDeleted}
                />
              ))}
            </AnimatePresence>

            {/* EMPTY */}
            {filteredPosts.length === 0 && (
              <EmptyState
                search={search}
                onCreate={() => setShowCreate(true)}
              />
            )}
          </>
        )}
      </div>

      {/* CREATE */}
      <AnimatePresence>
        {showCreate && (
          <CreatePostModal
            onClose={() => setShowCreate(false)}
            onCreated={handleCreated}
          />
        )}
      </AnimatePresence>

      {/* EDIT */}
      <AnimatePresence>
        {editingPost && (
          <EditPostModal
            post={editingPost}
            onClose={() => setEditingPost(null)}
            onUpdated={handleUpdated}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-zinc-200 bg-white p-3 sm:rounded-3xl sm:p-4"
    >
      <div className="flex items-center gap-2 text-zinc-400">
        {icon}

        <span className="hidden text-[10px] font-semibold sm:block">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xl font-black sm:text-2xl">{value}</p>

      <p className="text-[10px] text-zinc-400 sm:hidden">{label}</p>
    </motion.div>
  );
}

/* =====================================================
   POST CARD
===================================================== */

function MyPostCard({
  post,
  index,
  onEdit,
  onDeleted,
}: {
  post: Post;
  index: number;
  onEdit: () => void;
  onDeleted: (id: string) => void;
}) {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await deletePost(post._id);

      setShowDelete(false);
      onDeleted(post._id);
    } catch (error: any) {
      console.error("DELETE POST ERROR:", error);

      alert(error?.response?.data?.message || "Failed to delete post.");
    } finally {
      setDeleting(false);
    }
  };

  const handleOpenPost = () => {
    if (deleting) return;

    router.push(`/post/${post._id}`);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ delay: index * 0.06 }}
      onClick={handleOpenPost}
      className="group mb-4 cursor-pointer overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm transition hover:border-zinc-300 hover:shadow-md"
    >
      {/* TOP */}
      <div className="flex items-center justify-between px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
            {getInitials(post.author)}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-bold">
                {getAuthorName(post.author)}
              </p>

              <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[9px] font-bold text-zinc-500">
                Published
              </span>
            </div>

            <p className="text-[11px] text-zinc-400">
              {formatDate(post.createdAt)}
            </p>
          </div>
        </div>

        {/* MENU */}
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            disabled={deleting}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-black disabled:opacity-50"
          >
            {deleting ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <MoreHorizontal size={18} />
            )}
          </button>

          <AnimatePresence>
            {menuOpen && !deleting && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.95,
                  y: -5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                className="absolute right-0 top-10 z-20 w-40 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-xl"
              >
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit();
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-black"
                >
                  <Edit3 size={15} />
                  Edit Post
                </button>

                <div className="my-1 border-t border-zinc-100" />

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setShowDelete(true);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 size={15} />
                  Delete Post
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CONTENT */}
      {post.content && (
        <div className="px-4 pb-4 pt-4 sm:px-5">
          <div
            className="max-h-[180px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="whitespace-pre-line break-words text-sm leading-6 text-zinc-800">
              {post.content}
            </p>
          </div>

          {post.content.length > 700 && (
            <p className="mt-2 text-[10px] font-medium text-zinc-400">
              Scroll to read more
            </p>
          )}
        </div>
      )}

      {/* MEDIA */}
      {post.media?.length > 0 && (
        <div className="px-4 pb-4 sm:px-5" onClick={(e) => e.stopPropagation()}>
          <div
            className={`grid gap-2 ${
              post.media.length === 1 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {post.media.map((media, index) => (
              <MediaPreview key={`${media.publicId}-${index}`} media={media} />
            ))}
          </div>
        </div>
      )}

      {/* STATS */}
      <div className="flex items-center justify-between border-t border-zinc-100 px-4 py-3 text-[11px] text-zinc-400 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Heart size={13} />
            {post.likes?.length || 0}
          </span>

          <span className="flex items-center gap-1">
            <MessageCircle size={13} />
            {post.commentsCount || 0}
          </span>
        </div>

        <span className="flex items-center gap-1 font-semibold text-zinc-500">
          <Eye size={13} />
          View Post
        </span>
      </div>

      {/* ACTIONS */}
      <div
        className="grid grid-cols-2 border-t border-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onEdit}
          className="flex h-11 items-center justify-center gap-2 border-r border-zinc-100 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-black"
        >
          <Edit3 size={15} />
          Edit
        </button>

        <button
          type="button"
          onClick={() => setShowDelete(true)}
          disabled={deleting}
          className="flex h-11 items-center justify-center gap-2 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-50 hover:text-red-500 disabled:opacity-50"
        >
          <Trash2 size={15} />
          Delete
        </button>
      </div>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {showDelete && (
          <DeleteConfirmModal
            deleting={deleting}
            onClose={() => setShowDelete(false)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>
    </motion.article>
  );
}

/* =====================================================
   MEDIA PREVIEW
===================================================== */

function MediaPreview({ media }: { media: PostMedia }) {
  if (media.type === "image") {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-zinc-100">
        <img
          src={media.url}
          alt={media.name || "Post media"}
          className="max-h-[420px] min-h-[180px] w-full object-cover"
        />

        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
          <ImageIcon size={13} />
          Image
        </div>
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-black">
        <video
          src={media.url}
          controls
          className="max-h-[420px] min-h-[180px] w-full object-contain"
        />

        <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur">
          <Play size={12} fill="currentColor" />
          Video
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[120px] items-center gap-3 rounded-2xl bg-zinc-100 p-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
        <FileText size={20} className="text-zinc-500" />
      </div>

      <div className="min-w-0">
        <p className="truncate text-xs font-bold text-zinc-700">
          {media.name || "Attached file"}
        </p>

        <p className="mt-1 text-[10px] text-zinc-400">
          {media.size ? `${(media.size / 1024 / 1024).toFixed(2)} MB` : "File"}
        </p>
      </div>
    </div>
  );
}

/* =====================================================
   CREATE POST MODAL
===================================================== */

function CreatePostModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState("");
  const [media, setMedia] = useState<SelectedMedia[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files.length) return;

    const newMedia: SelectedMedia[] = files.map((file) => {
      let type: MediaType = "file";

      if (file.type.startsWith("image/")) {
        type = "image";
      } else if (file.type.startsWith("video/")) {
        type = "video";
      }

      return {
        file,
        type,
        preview:
          type === "image" || type === "video" ? URL.createObjectURL(file) : "",
      };
    });

    setMedia((prev) => [...prev, ...newMedia]);

    event.target.value = "";
  };

  const removeFile = (index: number) => {
    setMedia((prev) => {
      const item = prev[index];

      if (item?.preview) {
        URL.revokeObjectURL(item.preview);
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  const handleCreate = async () => {
    if (!content.trim() && media.length === 0) {
      setError("Post content or media is required.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      const formData = new FormData();

      if (content.trim()) {
        formData.append("content", content.trim());
      }

      media.forEach((item) => {
        formData.append("media", item.file);
      });

      console.log("MEDIA STATE:", media);

      media.forEach((item) => {
        console.log("FILE:", item.file);
      });

      for (const [key, value] of formData.entries()) {
        console.log("FORM DATA:", key, value);
      }

      await createPost(formData);

      media.forEach((item) => {
        if (item.preview) {
          URL.revokeObjectURL(item.preview);
        }
      });

      onCreated();
    } catch (error: any) {
      console.error("CREATE POST ERROR:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create post.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 mb-20 sm:m-0 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={submitting ? undefined : onClose}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
        }}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] bg-white sm:rounded-[2rem]"
      >
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-zinc-100 bg-white/95 px-5 py-4 backdrop-blur">
          <div>
            <h2 className="text-base font-bold">Create Post</h2>

            <p className="text-[11px] text-zinc-400">
              Share something with the community
            </p>
          </div>

          <button
            disabled={submitting}
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 disabled:opacity-50"
          >
            <X size={17} />
          </button>
        </div>

        {/* USER */}
        <div className="flex items-center gap-3 px-5 pt-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
            ME
          </div>

          <div>
            <p className="text-sm font-bold">Your Post</p>

            <p className="text-[11px] text-zinc-400">Posting publicly</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-5 pt-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={5000}
            placeholder="What's on your mind?"
            rows={6}
            disabled={submitting}
            className="w-full resize-none rounded-2xl bg-zinc-50 p-4 text-sm leading-6 outline-none placeholder:text-zinc-400 focus:ring-1 focus:ring-zinc-200 disabled:opacity-60"
          />

          <div className="mt-1 text-right text-[10px] text-zinc-400">
            {content.length}/5000
          </div>
        </div>

        {/* MEDIA PREVIEWS */}
        {media.length > 0 && (
          <div className="px-5 pt-3">
            <div className="grid grid-cols-2 gap-2">
              {media.map((item, index) => (
                <div
                  key={`${item.file.name}-${index}`}
                  className="relative overflow-hidden rounded-2xl bg-zinc-100"
                >
                  {item.type === "image" && (
                    <img
                      src={item.preview}
                      alt={item.file.name}
                      className="h-32 w-full object-cover"
                    />
                  )}

                  {item.type === "video" && (
                    <video
                      src={item.preview}
                      className="h-32 w-full object-cover"
                    />
                  )}

                  {item.type === "file" && (
                    <div className="flex h-32 flex-col items-center justify-center px-3 text-center">
                      <FileText size={24} className="text-zinc-500" />

                      <p className="mt-2 max-w-full truncate text-[10px] font-semibold text-zinc-600">
                        {item.file.name}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => removeFile(index)}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/80 text-white"
                  >
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mx-5 mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-medium text-red-500">
            <AlertCircle size={15} />
            {error}
          </div>
        )}

        {/* MEDIA BUTTONS */}
        <div className="flex gap-2 px-5 py-4">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx,.txt"
            onChange={handleFiles}
            className="hidden"
          />

          <button
            disabled={submitting}
            onClick={() => fileInputRef.current?.click()}
            className="flex h-10 items-center gap-2 rounded-xl bg-zinc-100 px-3 text-xs font-semibold text-zinc-600 transition hover:bg-zinc-200 disabled:opacity-50"
          >
            <ImageIcon size={16} />
            Media
          </button>

          <span className="flex items-center px-2 text-[10px] text-zinc-400">
            Images, videos & files
          </span>
        </div>

        {/* SUBMIT */}
        <div className="border-t border-zinc-100 px-5 py-4">
          <button
            disabled={submitting || (!content.trim() && media.length === 0)}
            onClick={handleCreate}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-black text-sm font-bold text-white shadow-lg shadow-black/10 transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            {submitting ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                Publishing...
              </>
            ) : (
              <>
                <Send size={16} />
                Publish Post
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =====================================================
   EDIT MODAL
===================================================== */

function EditPostModal({
  post,
  onClose,
  onUpdated,
}: {
  post: Post;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [content, setContent] = useState(post.content || "");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (!content.trim() && post.media.length === 0) {
      setError("Post content or media is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      /*
       * If your updatePost service expects:
       * updatePost(postId, { content })
       *
       * this will work directly.
       */
      await updatePost(post._id, {
        content: content.trim(),
      });

      onUpdated();
    } catch (error: any) {
      console.error("UPDATE POST ERROR:", error);

      setError(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update post.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex mb-20 sm:m-0 items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={loading ? undefined : onClose}
    >
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-t-[2rem] bg-white sm:rounded-[2rem]"
      >
        <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
          <div>
            <h2 className="text-base font-bold">Edit Post</h2>

            <p className="text-[11px] text-zinc-400">
              Update your post content
            </p>
          </div>

          <button
            disabled={loading}
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100"
          >
            <X size={17} />
          </button>
        </div>

        {/* Existing media */}
        {post.media?.length > 0 && (
          <div className="grid grid-cols-2 gap-2 px-5 pt-5">
            {post.media.map((media, index) => (
              <MediaPreview key={`${media.publicId}-${index}`} media={media} />
            ))}
          </div>
        )}

        <div className="px-5 pt-5">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={5000}
            rows={7}
            disabled={loading}
            className="w-full resize-none rounded-2xl bg-zinc-50 p-4 text-sm leading-6 outline-none focus:ring-1 focus:ring-zinc-200 disabled:opacity-60"
          />

          <div className="mt-1 text-right text-[10px] text-zinc-400">
            {content.length}/5000
          </div>
        </div>

        {error && (
          <div className="mx-5 mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-medium text-red-500">
            <AlertCircle size={15} />
            {error}
          </div>
        )}

        <div className="border-t border-zinc-100 px-5 py-4">
          <button
            disabled={loading}
            onClick={handleUpdate}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-black text-sm font-bold text-white disabled:bg-zinc-200 disabled:text-zinc-400"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Edit3 size={16} />
                Save Changes
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* =====================================================
   SKELETON
===================================================== */

function PostsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 animate-pulse rounded-full bg-zinc-200" />

            <div className="space-y-2">
              <div className="h-3 w-24 animate-pulse rounded bg-zinc-200" />

              <div className="h-2 w-16 animate-pulse rounded bg-zinc-100" />
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-zinc-100" />
            <div className="h-3 w-[85%] animate-pulse rounded bg-zinc-100" />
            <div className="h-3 w-[60%] animate-pulse rounded bg-zinc-100" />
          </div>

          <div className="mt-5 h-10 animate-pulse rounded-xl bg-zinc-100" />
        </motion.div>
      ))}
    </div>
  );
}

/* =====================================================
   EMPTY
===================================================== */

function EmptyState({
  search,
  onCreate,
}: {
  search: string;
  onCreate: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl border border-dashed border-zinc-300 bg-white px-6 py-16 text-center"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
        {search ? (
          <Search size={22} className="text-zinc-500" />
        ) : (
          <FileEdit size={22} className="text-zinc-500" />
        )}
      </div>

      <h3 className="mt-4 text-sm font-bold">
        {search ? "No posts found" : "You haven't posted yet"}
      </h3>

      <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-zinc-400">
        {search
          ? "Try searching with a different keyword."
          : "Share your first idea, update or opportunity with the community."}
      </p>

      {!search && (
        <button
          onClick={onCreate}
          className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-black px-5 text-xs font-bold text-white"
        >
          <Plus size={15} />
          Create your first post
        </button>
      )}
    </motion.div>
  );
}

function DeleteConfirmModal({
  deleting,
  onClose,
  onConfirm,
}: {
  deleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 backdrop-blur-sm sm:items-center sm:p-5"
      onClick={deleting ? undefined : onClose}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 60,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 60,
          scale: 0.96,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
        }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem]"
      >
        {/* ICON + CLOSE */}
        <div className="flex items-center justify-between px-5 pt-5">
          <motion.div
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.1,
              type: "spring",
            }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50"
          >
            <Trash2 size={20} className="text-red-500" />
          </motion.div>

          <button
            onClick={onClose}
            disabled={deleting}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition hover:bg-zinc-200 hover:text-black disabled:opacity-50"
          >
            <X size={17} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="px-5 pb-5 pt-5">
          <h2 className="text-lg font-black tracking-tight">
            Delete this post?
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            This action cannot be undone. Your post and its associated media
            will be permanently removed.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="grid grid-cols-2 gap-2 border-t border-zinc-100 p-4">
          <button
            onClick={onClose}
            disabled={deleting}
            className="h-11 rounded-xl border border-zinc-200 bg-white text-sm font-bold text-zinc-600 transition hover:bg-zinc-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={deleting}
            className="flex h-11 items-center justify-center gap-2 rounded-xl bg-red-500 text-sm font-bold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Delete Post
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
