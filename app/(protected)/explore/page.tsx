"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ArrowUpRight,
  SlidersHorizontal,
  X,
  Sparkles,
  Clock3,
  User,
  Image as ImageIcon,
  Video,
} from "lucide-react";
import { dashboardStore } from "@/app/store/dashboardStore";
import { useRouter } from "next/navigation";

const categories = [
  "All",
  "Technology",
  "Design",
  "Product",
  "Marketing",
  "Business",
];

type PostMedia = {
  url: string;
  publicId?: string;
  type: "image" | "video" | "file";
};

type PostAuthor = {
  _id: string;
  name: string;
  email?: string;
  profileImage?: string | null;
  archetype?: string;
};

type ExplorePost = {
  _id: string;
  author: PostAuthor;
  content: string;
  media: PostMedia[];
  createdAt: string;
  updatedAt: string;
};

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { posts, loadingPosts, fetchPosts } = dashboardStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  /*
   * Store se aane wale posts ko ExplorePost type me treat kar rahe hain.
   *
   * Agar tumhare Zustand store me posts ka type already properly defined hai
   * toh ye cast hata bhi sakte ho.
   */
  const explorePosts = (posts || []) as ExplorePost[];

  const filteredPosts = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return explorePosts.filter((post) => {
      const matchesSearch =
        !searchValue ||
        post.content?.toLowerCase().includes(searchValue) ||
        post.author?.name?.toLowerCase().includes(searchValue) ||
        post.author?.email?.toLowerCase().includes(searchValue) ||
        post.author?.archetype?.toLowerCase().includes(searchValue);

      const matchesCategory =
        activeCategory === "All" ||
        post.author?.archetype
          ?.toLowerCase()
          .includes(activeCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [explorePosts, search, activeCategory]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      {/* ================= HEADER ================= */}

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600">
                <Sparkles size={13} />
                Discover your next co-founder
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Find someone worth
                <span className="block text-zinc-400">building with.</span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
                Discover ambitious founders, explore their ideas, and connect
                with people whose skills complement yours.
              </p>
            </div>

            <div className="text-left lg:text-right">
              <p className="text-3xl font-bold tracking-tight">
                {explorePosts.length}+
              </p>

              <p className="text-xs text-zinc-500">posts from founders</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEARCH + FILTERS ================= */}

      <section className="sticky top-0 z-20 border-b border-zinc-200 bg-zinc-50/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search */}

            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search founders, posts, archetypes..."
                className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium transition hover:border-zinc-400"
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>
          </div>

          {/* Categories */}

          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition ${
                  activeCategory === category
                    ? "bg-zinc-950 text-white"
                    : "border border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400 hover:text-zinc-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filter Panel */}

          {showFilters && (
            <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Refine your search</h3>

                <button
                  onClick={() => setShowFilters(false)}
                  className="text-zinc-400 transition hover:text-zinc-950"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <Filter
                  title="Startup Stage"
                  options={["Idea", "MVP", "Growth"]}
                />

                <Filter
                  title="Availability"
                  options={["Full-time", "Part-time"]}
                />

                <Filter
                  title="Location"
                  options={["Remote", "Delhi", "Bangalore"]}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= CONTENT ================= */}

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {/* Recommended */}

        <div className="mb-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">
                  Explore founders
                </h2>

                <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-bold text-white">
                  LIVE
                </span>
              </div>

              <p className="mt-1 text-xs text-zinc-500">
                Latest posts shared by founders
              </p>
            </div>

            <p className="hidden text-xs font-medium text-zinc-400 sm:block">
              {filteredPosts.length} results
            </p>
          </div>

          {/* ================= LOADING ================= */}

          {loadingPosts && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <PostSkeleton key={index} />
              ))}
            </div>
          )}

          {/* ================= POSTS ================= */}

          {!loadingPosts && filteredPosts.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredPosts.map((post) => (
                <FounderPostCard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* ================= EMPTY STATE ================= */}

        {!loadingPosts && filteredPosts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white py-20 text-center">
            <Search className="mx-auto text-zinc-300" size={35} />

            <h3 className="mt-4 text-sm font-semibold">No posts found</h3>

            <p className="mt-1 text-xs text-zinc-500">
              Try searching for another founder, archetype or keyword.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

/* =========================================================
   POST CARD
========================================================= */

function FounderPostCard({ post }: { post: ExplorePost }) {
  const authorName = post.author?.name || "Unknown Founder";

  const appRouter = useRouter()

  const initials = authorName
    .split(" ")
    .map((name) => name.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/50">
      {/* ================= MATCH / ARCHETYPE ================= */}

      {post.author?.archetype && (
        <div className="absolute right-5 top-5 z-10">
          <div className="rounded-full border border-zinc-200 bg-white/90 px-2.5 py-1 text-[10px] font-bold text-zinc-700 backdrop-blur">
            {post.author.archetype}
          </div>
        </div>
      )}

      <div className="p-5">
        {/* ================= PROFILE ================= */}

        <div
        onClick={()=>appRouter.push(`/user-profile/${post?.author?._id}`)}
        className="flex items-center gap-3">
          {/* Profile Image */}

          {post.author?.profileImage ? (
            <img
              src={post.author.profileImage}
              alt={authorName}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white">
              {initials}
            </div>
          )}

          <div className="min-w-0 pr-24">
            <h3 className="truncate text-sm font-bold">{authorName}</h3>

            {post.author?.archetype && (
              <p className="mt-0.5 truncate text-xs text-zinc-500">
                {post.author.archetype}
              </p>
            )}

            <div className="mt-1 flex items-center gap-1 text-[10px] text-zinc-400">
              <Clock3 size={11} />

              {formattedDate}
            </div>
          </div>
        </div>

        {/* ================= POST CONTENT ================= */}

        <div className="mt-5 rounded-xl bg-zinc-50 p-4">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            <User size={12} />
            Founder Post
          </div>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-zinc-800">
            {post.content || "No content available."}
          </p>
        </div>

        {/* ================= MEDIA ================= */}

        {post.media?.length > 0 && (
          <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200">
            {post.media[0].type === "image" && (
              <img
                src={post.media[0].url}
                alt="Post media"
                className="h-56 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
              />
            )}

            {post.media[0].type === "video" && (
              <div className="relative">
                <video
                  src={post.media[0].url}
                  controls
                  className="h-56 w-full object-cover"
                />

                <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[10px] text-white">
                  <Video size={11} />
                  Video
                </div>
              </div>
            )}

            {post.media[0].type === "file" && (
              <div className="flex h-24 items-center gap-3 px-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100">
                  <ImageIcon size={18} />
                </div>

                <div>
                  <p className="text-xs font-semibold">Attached file</p>

                  <a
                    href={post.media[0].url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block text-[10px] text-zinc-500 hover:text-zinc-950"
                  >
                    Open attachment
                  </a>
                </div>
              </div>
            )}

            {post.media.length > 1 && (
              <div className="border-t border-zinc-200 px-3 py-2 text-[10px] font-medium text-zinc-400">
                +{post.media.length - 1} more media
              </div>
            )}
          </div>
        )}

        {/* ================= AUTHOR EMAIL ================= */}

        {post.author?.email && (
          <div className="mt-4">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Contact
            </p>

            <p className="mt-1 truncate text-xs font-medium text-zinc-700">
              {post.author.email}
            </p>
          </div>
        )}
      </div>

      {/* ================= FOOTER ================= */}

      <div className="mt-auto flex items-center justify-between border-t border-zinc-100 px-5 py-4">
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
          <Clock3 size={12} />
          Posted {formattedDate}
        </div>

        <button
          className="flex items-center gap-1.5 rounded-lg bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800"
          onClick={() => {
            appRouter.push(`/user-profile/${post.author._id}`)
            console.log("Open profile:", post.author._id);
          }}
        >
          View profile
          <ArrowUpRight size={14} />
        </button>
      </div>
    </article>
  );
}

/* =========================================================
   FILTER
========================================================= */

function Filter({ title, options }: { title: string; options: string[] }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-zinc-700">{title}</p>

      <select className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-xs text-zinc-600 outline-none focus:border-zinc-400">
        <option>Any</option>

        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

/* =========================================================
   SKELETON
========================================================= */

function PostSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded-full bg-zinc-200" />

        <div className="flex-1">
          <div className="h-3 w-28 rounded bg-zinc-200" />

          <div className="mt-2 h-2.5 w-20 rounded bg-zinc-100" />

          <div className="mt-2 h-2 w-24 rounded bg-zinc-100" />
        </div>
      </div>

      <div className="mt-5 rounded-xl bg-zinc-50 p-4">
        <div className="h-2 w-20 rounded bg-zinc-200" />

        <div className="mt-4 h-3 w-full rounded bg-zinc-200" />

        <div className="mt-2 h-3 w-4/5 rounded bg-zinc-200" />

        <div className="mt-2 h-3 w-3/5 rounded bg-zinc-200" />
      </div>

      <div className="mt-5 flex justify-between border-t border-zinc-100 pt-4">
        <div className="h-3 w-20 rounded bg-zinc-100" />

        <div className="h-8 w-24 rounded-lg bg-zinc-200" />
      </div>
    </div>
  );
}
