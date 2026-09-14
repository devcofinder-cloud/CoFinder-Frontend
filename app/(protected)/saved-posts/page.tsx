
"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bookmark,
  Search,
  ArrowUpRight,
  Clock3,
  User,
  Video,
  FileText,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { dashboardStore } from "@/app/store/dashboardStore";

type PostMedia = {
  url: string;
  publicId?: string;
  type: "image" | "video" | "file";
  name?: string | null;
};

type PostAuthor = {
  _id: string;
  name: string;
  email?: string;
  profileImage?: string | null;
  avatar?: string | null;
  archetype?: string;
};

type SavedPost = {
  _id: string;
  author: PostAuthor;
  content?: string;
  media: PostMedia[];
  likes: string[];
  commentsCount: number;
  isSaved?: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function SavedPostsPage() {
  const router = useRouter();

  const {
    savedPosts,
    loadingSavedPosts,
    fetchSavedPosts,
    toggleSave,
  } = dashboardStore();

  const [search, setSearch] = useState("");
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSavedPosts();
  }, [fetchSavedPosts]);

  const posts = (savedPosts || []) as SavedPost[];

  const filteredPosts = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return posts;

    return posts.filter((post) => {
      return (
        post.content?.toLowerCase().includes(value) ||
        post.author?.name?.toLowerCase().includes(value) ||
        post.author?.email?.toLowerCase().includes(value) ||
        post.author?.archetype?.toLowerCase().includes(value) ||
        post.media?.some((media) =>
          media.name?.toLowerCase().includes(value)
        )
      );
    });
  }, [posts, search]);

  const handleRemove = async (postId: string) => {
    if (removingId) return;

    try {
      setRemovingId(postId);
      await toggleSave(postId);
    } catch (error) {
      console.error("Remove saved post failed:", error);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      {/* HEADER */}

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600">
                <Bookmark size={13} fill="currentColor" />
                Your collection
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Saved posts
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                Keep the ideas, founders and insights you want to come back to.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-3 text-right">
                <p className="text-2xl font-bold tracking-tight">
                  {posts.length}
                </p>
                <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                  Saved
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEARCH */}

      <section className="sticky top-0 z-20 border-b border-zinc-200 bg-zinc-50/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
          <div className="relative max-w-xl">
            <Search
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search saved posts..."
              className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-11 pr-10 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-950"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        {loadingSavedPosts ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SavedPostSkeleton key={index} />
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold tracking-tight">
                  Your saved ideas
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  {filteredPosts.length}{" "}
                  {filteredPosts.length === 1 ? "post" : "posts"} found
                </p>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post) => (
                <SavedPostCard
                  key={post._id}
                  post={post}
                  removing={removingId === post._id}
                  onRemove={() => handleRemove(post._id)}
                  onOpen={() => router.push(`/post/${post._id}`)}
                />
              ))}
            </div>
          </>
        ) : search ? (
          <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-5 py-20 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100">
              <Search size={24} className="text-zinc-400" />
            </div>

            <h3 className="mt-5 text-sm font-bold">
              No matching saved posts
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-zinc-500">
              Try searching with another founder name, archetype or keyword.
            </p>

            <button
              type="button"
              onClick={() => setSearch("")}
              className="mt-5 rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-zinc-800"
            >
              Clear search
            </button>
          </div>
        ) : (
          <EmptySavedPosts onExplore={() => router.push("/explore")} />
        )}
      </main>
    </div>
  );
}

/* =========================================================
   SAVED POST CARD
========================================================= */

function SavedPostCard({
  post,
  removing,
  onRemove,
  onOpen,
}: {
  post: SavedPost;
  removing: boolean;
  onRemove: () => void;
  onOpen: () => void;
}) {
  const authorName = post.author?.name || "Unknown Founder";

  const initials = authorName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const formattedDate = new Date(post.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const firstMedia = post.media?.[0];

  return (
    <article
      className={`group relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/50 ${
        removing ? "pointer-events-none opacity-50" : ""
      }`}
    >
      {/* SAVED BADGE */}

      <div className="absolute right-4 top-4 z-10">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white/90 text-zinc-950 shadow-sm backdrop-blur">
          <Bookmark size={16} fill="currentColor" />
        </div>
      </div>

      <div className="p-5">
        {/* AUTHOR */}

        <div
          onClick={onOpen}
          className="flex cursor-pointer items-center gap-3"
        >
          {post.author?.profileImage || post.author?.avatar ? (
            <img
              src={post.author.profileImage || post.author.avatar || ""}
              alt={authorName}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-xs font-bold text-white">
              {initials}
            </div>
          )}

          <div className="min-w-0 pr-12">
            <h3 className="truncate text-sm font-bold">{authorName}</h3>

            {post.author?.archetype && (
              <p className="mt-0.5 truncate text-xs text-zinc-500">
                {post.author.archetype}
              </p>
            )}

            <div className="mt-1 flex items-center gap-1 text-[10px] text-zinc-400">
              <Clock3 size={10} />
              {formattedDate}
            </div>
          </div>
        </div>

        {/* CONTENT */}

        <div
          onClick={onOpen}
          className="mt-5 cursor-pointer rounded-xl bg-zinc-50 p-4 transition hover:bg-zinc-100"
        >
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            <User size={11} />
            Founder Post
          </div>

          <p className="mt-3 line-clamp-5 whitespace-pre-wrap break-words text-sm leading-6 text-zinc-800">
            {post.content || "No content available."}
          </p>

          {post.content && post.content.length > 300 && (
            <div className="mt-3 flex items-center gap-1 text-[10px] font-semibold text-zinc-400">
              Read full post
              <ArrowUpRight size={11} />
            </div>
          )}
        </div>

        {/* MEDIA */}

        {firstMedia && (
          <div
            onClick={onOpen}
            className="mt-4 cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100"
          >
            {firstMedia.type === "image" && (
              <img
                src={firstMedia.url}
                alt={firstMedia.name || "Saved post media"}
                className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              />
            )}

            {firstMedia.type === "video" && (
              <div className="relative">
                <video
                  src={firstMedia.url}
                  muted
                  playsInline
                  className="h-48 w-full object-cover"
                />

                <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[10px] font-medium text-white">
                  <Video size={10} />
                  Video
                </div>
              </div>
            )}

            {firstMedia.type === "file" && (
              <div className="flex h-24 items-center gap-3 px-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                  <FileText size={17} className="text-zinc-600" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs font-semibold">
                    {firstMedia.name || "Attached file"}
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-400">
                    Open post to view
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {post.media?.length > 1 && (
          <p className="mt-2 text-[10px] font-medium text-zinc-400">
            +{post.media.length - 1} more media
          </p>
        )}
      </div>

      {/* FOOTER */}

      <div className="mt-auto border-t border-zinc-100 px-5 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-[11px] font-medium text-zinc-400">
            <span>
              {post.likes?.length || 0}{" "}
              {(post.likes?.length || 0) === 1 ? "like" : "likes"}
            </span>

            <span>
              {post.commentsCount || 0}{" "}
              {post.commentsCount === 1 ? "comment" : "comments"}
            </span>
          </div>

          <button
            type="button"
            onClick={onRemove}
            disabled={removing}
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 disabled:opacity-50"
          >
            <Bookmark size={15} fill="currentColor" />

            {removing ? "Removing..." : "Remove"}
          </button>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptySavedPosts({ onExplore }: { onExplore: () => void }) {
  return (
    <div className="rounded-3xl border border-dashed border-zinc-300 bg-white px-5 py-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-950 text-white shadow-xl">
        <Bookmark size={27} fill="currentColor" />
      </div>

      <h2 className="mt-6 text-xl font-bold tracking-tight">
        Nothing saved yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">
        Found an interesting founder or idea? Save the post and it will appear
        here for you to revisit anytime.
      </p>

      <button
        type="button"
        onClick={onExplore}
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-xs font-semibold text-white transition hover:bg-zinc-800"
      >
        Explore posts
        <ArrowUpRight size={15} />
      </button>
    </div>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function SavedPostSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-full bg-zinc-200" />

        <div className="flex-1">
          <div className="h-3 w-28 rounded bg-zinc-200" />
          <div className="mt-2 h-2.5 w-20 rounded bg-zinc-100" />
          <div className="mt-2 h-2 w-24 rounded bg-zinc-100" />
        </div>

        <div className="h-9 w-9 rounded-xl bg-zinc-100" />
      </div>

      <div className="mt-5 rounded-xl bg-zinc-50 p-4">
        <div className="h-2 w-20 rounded bg-zinc-200" />
        <div className="mt-4 h-3 w-full rounded bg-zinc-200" />
        <div className="mt-2 h-3 w-5/6 rounded bg-zinc-200" />
        <div className="mt-2 h-3 w-3/5 rounded bg-zinc-100" />
      </div>

      <div className="mt-4 h-48 rounded-xl bg-zinc-100" />

      <div className="mt-5 flex justify-between border-t border-zinc-100 pt-4">
        <div className="h-3 w-24 rounded bg-zinc-100" />
        <div className="h-8 w-20 rounded-lg bg-zinc-200" />
      </div>
    </div>
  );
}
