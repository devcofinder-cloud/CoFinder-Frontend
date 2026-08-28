"use client";

import { dashboardStore } from "@/app/store/dashboardStore";
import { motion } from "framer-motion";
import {
    FileText,
    Heart,
    MessageCircle,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Posts() {
    const params = useParams();

    const userId = params.userId as string;

    const userPosts = dashboardStore(
        (state) => state.userPosts
    );

    const fetchPostsByUserId = dashboardStore(
        (state) => state.fetchPostsByUserId
    );


    const loadingPosts = dashboardStore((state)=>state.loadingPosts)

    useEffect(() => {
        if (userId) {
            fetchPostsByUserId(userId);
        }
    }, [userId, fetchPostsByUserId]);

    const activePosts = userPosts.filter(
        (post) => !post.isDeleted
    );

 if (loadingPosts) {
  return (
    <div className="w-full animate-pulse">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-zinc-200" />

          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 rounded bg-zinc-200" />
            <div className="h-3 w-24 rounded bg-zinc-100" />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <div className="h-4 w-full rounded bg-zinc-200" />
          <div className="h-4 w-5/6 rounded bg-zinc-200" />
          <div className="h-4 w-2/3 rounded bg-zinc-200" />
        </div>

        <div className="mt-6 h-64 w-full rounded-2xl bg-zinc-200" />

        <div className="mt-5 flex gap-3">
          <div className="h-8 w-20 rounded-full bg-zinc-200" />
          <div className="h-8 w-20 rounded-full bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}

    if (!activePosts.length) {
        return (
            <motion.section
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-zinc-200 bg-white p-8 sm:p-12"
            >
                <div className="mx-auto flex max-w-md flex-col items-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                        <FileText size={22} />
                    </div>

                    <h2 className="mt-5 text-xl font-black tracking-tight">
                        No Posts Yet
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                        Posts from this user will appear here.
                    </p>
                </div>
            </motion.section>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
        >
            {activePosts.map((post) => (
                <article
                    key={post._id}
                    className="overflow-hidden rounded-2xl border border-zinc-200 bg-white"
                >
                    <div className="p-5 sm:p-6">
                        <p className="whitespace-pre-wrap text-sm leading-6 text-zinc-700">
                            {post.content}
                        </p>

                        <p className="mt-3 text-xs text-zinc-400">
                            {new Date(
                                post.createdAt
                            ).toLocaleDateString()}
                        </p>
                    </div>

                    {post.media.length > 0 && (
                        <div
                            className={`grid ${
                                post.media.length === 1
                                    ? "grid-cols-1"
                                    : "grid-cols-2"
                            } gap-1`}
                        >
                            {post.media.map((media) => (
                                <div
                                    key={media.publicId}
                                    className="overflow-hidden bg-zinc-100"
                                >
                                    {media.type === "image" && (
                                        <img
                                            src={media.url}
                                            alt={
                                                media.name ||
                                                "Post image"
                                            }
                                            className="h-full max-h-[500px] w-full object-cover"
                                        />
                                    )}

                                    {media.type === "video" && (
                                        <video
                                            src={media.url}
                                            controls
                                            className="max-h-[500px] w-full"
                                        />
                                    )}

                                    {media.type === "file" && (
                                        <a
                                            href={media.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex min-h-32 items-center justify-center text-sm font-semibold text-zinc-700"
                                        >
                                            {media.name ||
                                                "View file"}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex items-center gap-5 border-t border-zinc-100 px-5 py-4 text-zinc-400">
                        <div className="flex items-center gap-1.5">
                            <Heart size={17} />

                            <span className="text-xs font-medium">
                                {post.likes.length}
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                            <MessageCircle size={17} />

                            <span className="text-xs font-medium">
                                {post.commentsCount}
                            </span>
                        </div>
                    </div>
                </article>
            ))}
        </motion.section>
    );
}