
"use client";

import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import { dashboardStore } from "@/app/store/dashboardStore";

const getTimeAgo = (date: string) => {
  const diff = Math.max(
    0,
    Math.floor((Date.now() - new Date(date).getTime()) / 1000)
  );

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

interface RecentlyPostedProps {
  userId: string;
}

export default function RecentlyPosted({
  userId,
}: RecentlyPostedProps) {
  const router = useRouter();

  const {
    recentlyPosted,
    loadingRecentlyPosted,
    fetchRecentlyPosted,
    toggleLike,
  } = dashboardStore();

  const [pendingLikes, setPendingLikes] = useState<string[]>([]);

  useEffect(() => {
    void fetchRecentlyPosted(1, 10);
  }, [fetchRecentlyPosted]);

  const handleLike = async (postId: string) => {
    if (!userId || pendingLikes.includes(postId)) return;

    setPendingLikes((current) => [...current, postId]);

    try {
      await toggleLike(postId, userId);
    } catch {
      // Store restores the previous state if the API fails.
    } finally {
      setPendingLikes((current) =>
        current.filter((id) => id !== postId)
      );
    }
  };

  return (
    <section className="w-full min-w-0">
      <div className="mb-4 flex items-center justify-between gap-3">
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

        <span className="hidden rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[11px] font-semibold text-zinc-600 sm:block">
          Last 7 Days
        </span>
      </div>

      <div className="w-full min-w-0 max-w-3xl rounded-3xl border border-zinc-200 bg-zinc-50 p-2 sm:p-3">
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
              There haven&apos;t been any posts shared during the last 7 days.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentlyPosted.map((post, index) => {
              const liked = (post.likes || []).includes(userId);
              const isPending = pendingLikes.includes(post._id);

              return (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.05, 0.2),
                  }}
                  className="group w-full min-w-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors duration-200 hover:border-zinc-300"
                >
                  <div className="w-full min-w-0 p-4 sm:p-5">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
                        {post.author?.profileImage ? (
                          <Image
                            src={post.author.profileImage}
                            alt={post.author.name || "User"}
                            fill
                            sizes="40px"
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

                      <button
                        type="button"
                        aria-label="Open post"
                        onClick={() => router.push(`/post/${post._id}`)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-black hover:text-white"
                      >
                        <ArrowUpRight size={15} />
                      </button>
                    </div>

                    {post.content && (
                      <div
                        onClick={() => router.push(`/post/${post._id}`)}
                        className="mt-4 max-w-xl cursor-pointer"
                      >
                        <p className="line-clamp-2 whitespace-pre-line break-words text-sm leading-6 text-zinc-700">
                          {post.content}
                        </p>
                      </div>
                    )}

                    {post.media?.length > 0 && (
                      <div className="mt-4 max-w-xl overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50">
                        {post.media.length === 1 &&
                        post.media[0]?.type === "image" &&
                        !post.media[0]?.url
                          ?.toLowerCase()
                          .includes(".pdf") ? (
                          <div
                            onClick={() =>
                              router.push(`/post/${post._id}`)
                            }
                            className="relative aspect-[16/9] w-full cursor-pointer"
                          >
                            <Image
                              src={post.media[0].url}
                              alt={post.media[0]?.name || "Post image"}
                              fill
                              sizes="(max-width: 768px) 100vw, 600px"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2 p-2">
                            {post.media.slice(0, 3).map((media, i) => (
                              <button
                                type="button"
                                key={`${media.publicId}-${i}`}
                                onClick={() =>
                                  router.push(`/post/${post._id}`)
                                }
                                className="flex min-w-0 items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-600 transition hover:border-zinc-400"
                              >
                                {getMediaIcon(media.type)}
                                <span className="max-w-[140px] truncate">
                                  {media.name || `${media.type} file`}
                                </span>
                              </button>
                            ))}

                            {post.media.length > 3 && (
                              <button
                                type="button"
                                onClick={() =>
                                  router.push(`/post/${post._id}`)
                                }
                                className="flex items-center rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white"
                              >
                                +{post.media.length - 3} more
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    <div className="mt-4 flex max-w-xl items-center justify-between border-t border-zinc-100 pt-3">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          disabled={!userId || isPending}
                          onClick={() => void handleLike(post._id)}
                          aria-label={liked ? "Unlike post" : "Like post"}
                          aria-pressed={liked}
                          className={`flex items-center gap-1.5 rounded-md text-xs transition-colors duration-150 disabled:cursor-not-allowed ${
                            liked
                              ? "font-semibold text-rose-600"
                              : "text-zinc-500 hover:text-rose-600"
                          }`}
                        >
                          <Heart
                            size={16}
                            fill={liked ? "currentColor" : "none"}
                            className="transition-transform duration-150"
                          />
                          <span>{post.likes?.length || 0}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            router.push(`/post/${post._id}`)
                          }
                          className="flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-black"
                        >
                          <MessageCircle size={15} />
                          <span>{post.commentsCount || 0}</span>
                        </button>
                      </div>

                      <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                        Recent
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
