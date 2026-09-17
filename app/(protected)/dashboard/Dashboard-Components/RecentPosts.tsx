"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Clock3,
  Heart,
  MessageCircle,
  Image as ImageIcon,
  Video,
  FileText,
  ArrowUpRight,
} from "lucide-react";
import { dashboardStore } from "@/app/store/dashboardStore";
import { useRouter } from "next/navigation";

const getTimeAgo = (date: string) => {
  const now = new Date().getTime();
  const created = new Date(date).getTime();
  const diff = Math.floor((now - created) / 1000);

  if (diff < 60) return "Just now";

  const minutes = Math.floor(diff / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";

  return `${days}d ago`;
};

const getMediaIcon = (type: string) => {
  if (type === "image") return <ImageIcon size={14} />;
  if (type === "video") return <Video size={14} />;
  return <FileText size={14} />;
};

export default function RecentlyPosted() {
  const {
    recentlyPosted,
    loadingRecentlyPosted,
    fetchRecentlyPosted,
  } = dashboardStore();

  useEffect(() => {
    fetchRecentlyPosted();
  }, [fetchRecentlyPosted]);

  const approuter = useRouter()

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-black text-white">
              <Clock3 size={16} />
            </div>

            <h2 className="text-lg font-bold tracking-tight text-black sm:text-xl">
              Recently Posted
            </h2>
          </div>

          <p className="ml-10 mt-1 text-xs text-zinc-500">
            Fresh posts from the last 7 days
          </p>
        </div>

        <div className="hidden rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] font-semibold text-zinc-600 sm:block">
          Last 7 Days
        </div>
      </div>

      {/* Main Outer Container */}
      <div className="w-full max-w-3xl rounded-3xl border border-zinc-200 bg-zinc-50 p-2 shadow-md sm:p-3">
        {loadingRecentlyPosted ? (
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-4"
              >
                <div className="flex gap-3">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-200" />

                  <div className="flex-1">
                    <div className="h-3 w-28 rounded bg-zinc-200" />
                    <div className="mt-2 h-2.5 w-20 rounded bg-zinc-100" />
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="h-3 w-full rounded bg-zinc-100" />
                  <div className="h-3 w-4/5 rounded bg-zinc-100" />
                </div>

                <div className="mt-4 h-8 w-32 rounded-lg bg-zinc-100" />
              </div>
            ))}
          </div>
        ) : recentlyPosted.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white px-5 py-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
              <Clock3 size={20} />
            </div>

            <h3 className="mt-4 text-sm font-bold text-black">
              No recent posts
            </h3>

            <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-zinc-500">
              There haven't been any posts shared during the last 7 days.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentlyPosted.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className="group w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:border-zinc-300 hover:shadow-md"
              >
                <div  className="w-full max-w-2xl p-4 sm:p-5">
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
                      {post.author?.profileImage ? (
                        <Image
                          src={post.author.profileImage}
                          alt={post.author.name || "User"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-black text-sm font-bold text-white">
                          {(post.author?.name || "U")
                            .charAt(0)
                            .toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex min-w-0 items-center gap-2">
                        <h3 className="min-w-0 truncate text-sm font-bold text-black">
                          {post.author?.name || "Unknown User"}
                        </h3>

                        {post.author?.archetype && (
                          <span className="hidden shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[9px] font-semibold text-zinc-600 sm:inline-block">
                            {post.author.archetype}
                          </span>
                        )}
                      </div>

                      <div className="mt-0.5 flex items-center gap-1 text-[10px] text-zinc-400">
                        <Clock3 size={10} />
                        <span>{getTimeAgo(post.createdAt)}</span>
                      </div>
                    </div>

                    <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-black hover:text-white">
                      <ArrowUpRight size={15} />
                    </button>
                  </div>

                  {/* Content */}
                  {post.content && (
                    <div onClick={()=>approuter.push(`/post/${post._id}`)} className="mt-4 max-w-xl">
                      <p className="line-clamp-2 overflow-hidden text-ellipsis whitespace-pre-line break-words text-sm leading-6 text-zinc-700">
                        {post.content}
                      </p>
                    </div>
                  )}

                  {/* Media */}
                  {post.media?.length > 0 && (
                    <div className="mt-4 max-w-xl overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                      {post.media.length === 1 &&
                      post.media[0].type === "image" ? (
                        <div className="relative aspect-[16/9] w-full">
                          <Image
                            src={post.media[0].url}
                            alt={post.media[0].name || "Post image"}
                            fill
                            className="object-cover transition duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-2 p-2">
                          {post.media
                            .slice(0, 3)
                            .map((media, mediaIndex) => (
                              <div
                                key={`${media.publicId}-${mediaIndex}`}
                                className="flex min-w-0 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-600"
                              >
                                {getMediaIcon(media.type)}

                                <span className="max-w-[140px] truncate">
                                  {media.name || `${media.type} file`}
                                </span>
                              </div>
                            ))}

                          {post.media.length > 3 && (
                            <div className="flex items-center rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white">
                              +{post.media.length - 3} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="mt-4 flex max-w-xl items-center justify-between border-t border-zinc-100 pt-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Heart size={15} />
                        <span>{post.likes?.length || 0}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <MessageCircle size={15} />
                        <span>{post.commentsCount || 0}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                      Recent
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}