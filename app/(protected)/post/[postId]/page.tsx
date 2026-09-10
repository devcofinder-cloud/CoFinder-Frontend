"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Play,
  FileText,
  Download,
  Check,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { dashboardStore } from "@/app/store/dashboardStore";
import MediaViewer from "@/app/(protected)/chat/comp/MediaViewer";
import PdfViewer from "@/app/(protected)/chat/comp/PdfViewer";

export default function PostDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const postId = params?.postId as string;

  const { post, loadingPost, fetchPostById, clearPost } = dashboardStore();

  const [mediaViewer, setMediaViewer] = useState<{
    isOpen: boolean;
    url: string;
    type: "image" | "video";
    name?: string;
  }>({
    isOpen: false,
    url: "",
    type: "image",
  });

  const [pdfViewer, setPdfViewer] = useState<{
    isOpen: boolean;
    url: string;
    name?: string;
  }>({
    isOpen: false,
    url: "",
  });

  const [liked, setLiked] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!postId) return;

    fetchPostById(postId);

    return () => {
      clearPost();
    };
  }, [postId, fetchPostById, clearPost]);

  useEffect(() => {
    if (post) {
      // Agar backend future me current-user like status bheje
      // toh yahan use kar sakte hain.
      setLiked(false);
    }
  }, [post]);

  const openImage = (url: string, name?: string | null) => {
    setMediaViewer({
      isOpen: true,
      url,
      type: "image",
      name: name || "Image",
    });
  };

  const openVideo = (url: string, name?: string | null) => {
    setMediaViewer({
      isOpen: true,
      url,
      type: "video",
      name: name || "Video",
    });
  };

  const openPdf = (url: string, name?: string | null) => {
    setPdfViewer({
      isOpen: true,
      url,
      name: name || "PDF Document",
    });
  };

  const closeMediaViewer = () => {
    setMediaViewer({
      isOpen: false,
      url: "",
      type: "image",
    });
  };

  const closePdfViewer = () => {
    setPdfViewer({
      isOpen: false,
      url: "",
    });
  };

  const handleShare = async () => {
    if (!post) return;

    const shareUrl = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${post.author?.name || "Co-Finder"}'s post`,
          text: post.content || "Check out this post on Co-Finder",
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);

        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 1800);
      }
    } catch {
      // User cancelled share
    }
  };

  if (loadingPost) {
    return <PostSkeleton />;
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-white text-zinc-950">
        <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col">
          <header className="sticky top-0 z-40 flex h-14 items-center border-b border-zinc-200 bg-white/90 px-4 backdrop-blur-xl">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-zinc-100 active:scale-90"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 className="ml-2 text-[15px] font-semibold">Post</h1>
          </header>

          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
              <FileText size={25} className="text-zinc-400" />
            </div>

            <h2 className="text-lg font-semibold">Post not found</h2>

            <p className="mt-1 max-w-xs text-sm text-zinc-500">
              This post may have been deleted or is no longer available.
            </p>

            <button
              type="button"
              onClick={() => router.back()}
              className="mt-6 rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition active:scale-95"
            >
              Go back
            </button>
          </div>
        </div>
      </main>
    );
  }

  const media = post.media || [];

  const photos = media.filter((item) => item.type === "image");

  const videos = media.filter((item) => item.type === "video");

  const files = media.filter((item) => item.type === "file");

  const totalMedia = media.length;

  return (
    <>
      <main className="min-h-screen bg-white text-zinc-950">
        <div className="mx-auto min-h-screen w-full max-w-2xl border-x border-zinc-100">
          {/* HEADER */}
          <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-zinc-200 bg-white/90 px-3 backdrop-blur-xl">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-100 active:scale-90"
              >
                <ArrowLeft size={20} />
              </button>

              <div>
                <h1 className="text-[15px] font-semibold leading-none">Post</h1>

                <p className="mt-1 text-[10px] text-zinc-400">Co-Finder</p>
              </div>
            </div>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-100 active:scale-90"
            >
              <MoreHorizontal size={20} />
            </button>
          </header>

          {/* POST */}
          <article>
            {/* AUTHOR */}
            <div className="flex items-center justify-between px-4 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => router.push(`/user-profile/${post.author?._id}`)}
                  className="relative shrink-0"
                >
                  <div className="h-11 w-11 overflow-hidden rounded-full bg-zinc-100 ring-1 ring-zinc-200">
                    {post.author?.profileImage ? (
                      <img
                        src={post.author.profileImage}
                        alt={post.author.name || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-sm font-bold text-white">
                        {post.author?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                </button>

                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => router.push(`/profile/${post.author?._id}`)}
                    className="block max-w-full truncate text-left text-[14px] font-semibold"
                  >
                    {post.author?.name || "Unknown User"}
                  </button>

                  {post.author?.archetype && (
                    <p className="mt-0.5 truncate text-[11px] text-zinc-500">
                      {post.author.archetype}
                    </p>
                  )}
                </div>
              </div>

              <span className="shrink-0 text-[10px] text-zinc-400">
                {formatPostDate(post.createdAt)}
              </span>
            </div>

            {/* CONTENT */}
            {post.content?.trim() && (
              <div className="px-4 pb-4">
                <p className="whitespace-pre-wrap break-words text-[14px] leading-6 text-zinc-800">
                  {post.content}
                </p>
              </div>
            )}

            {/* MEDIA */}
            {totalMedia > 0 && (
              <div className="w-full">
                {/* SINGLE IMAGE */}
                {photos.length === 1 && (
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.99 }}
                    onClick={() => openImage(photos[0].url, photos[0].name)}
                    className="relative block w-full overflow-hidden bg-zinc-100"
                  >
                    <img
                      src={photos[0].url}
                      alt={photos[0].name || "Post image"}
                      className="max-h-[75vh] w-full object-cover"
                    />
                  </motion.button>
                )}

                {/* MULTIPLE IMAGES */}
                {photos.length > 1 && (
                  <div className="grid grid-cols-2 gap-0.5 bg-white">
                    {photos.map((image, index) => (
                      <motion.button
                        key={`${image.publicId}-${index}`}
                        type="button"
                        whileTap={{ scale: 0.985 }}
                        onClick={() => openImage(image.url, image.name)}
                        className={`relative aspect-square overflow-hidden bg-zinc-100 ${
                          photos.length === 3 && index === 0 ? "col-span-2" : ""
                        }`}
                      >
                        <img
                          src={image.url}
                          alt={image.name || `Post image ${index + 1}`}
                          className="h-full w-full object-cover transition duration-300 hover:scale-105"
                        />

                        {index === 3 && photos.length > 4 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                            <span className="text-lg font-semibold text-white">
                              +{photos.length - 4}
                            </span>
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* VIDEOS */}
                {videos.length > 0 && (
                  <div className="space-y-1 bg-white">
                    {videos.map((video, index) => (
                      <motion.button
                        key={`${video.publicId}-${index}`}
                        type="button"
                        whileTap={{ scale: 0.99 }}
                        onClick={() => openVideo(video.url, video.name)}
                        className="relative block w-full overflow-hidden bg-black"
                      >
                        <video
                          src={video.url}
                          muted
                          playsInline
                          preload="metadata"
                          className="max-h-[75vh] w-full object-contain"
                        />

                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-xl backdrop-blur-md">
                            <Play
                              size={22}
                              fill="currentColor"
                              className="ml-1 text-zinc-950"
                            />
                          </div>
                        </div>

                        {videos.length > 1 && (
                          <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-md">
                            Video {index + 1}
                          </div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* FILES */}
                {files.length > 0 && (
                  <div className="space-y-2 px-4 py-3">
                    {files.map((file, index) => {
                      const isPdf = file.name?.toLowerCase().endsWith(".pdf");

                      return (
                        <motion.div
                          key={`${file.publicId}-${index}`}
                          whileTap={{ scale: 0.99 }}
                          className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-3"
                        >
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white">
                            <FileText size={19} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[13px] font-medium">
                              {file.name || "Document"}
                            </p>

                            {file.size && (
                              <p className="mt-0.5 text-[10px] text-zinc-400">
                                {formatFileSize(file.size)}
                              </p>
                            )}
                          </div>

                          {isPdf ? (
                            <button
                              type="button"
                              onClick={() => openPdf(file.url, file.name)}
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-200 transition active:scale-90"
                            >
                              <FileText size={16} />
                            </button>
                          ) : (
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm ring-1 ring-zinc-200 transition active:scale-90"
                            >
                              <Download size={16} />
                            </a>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ACTION BAR */}
            <div className="border-b border-zinc-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {/* LIKE */}
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.82 }}
                    onClick={() => setLiked((prev) => !prev)}
                    className={`flex h-10 items-center gap-2 rounded-full px-3 transition ${
                      liked ? "bg-zinc-950 text-white" : "hover:bg-zinc-100"
                    }`}
                  >
                    <Heart size={19} fill={liked ? "currentColor" : "none"} />

                    <span className="text-xs font-medium">
                      {(post.likes?.length || 0) +
                        (liked ? 1 : 0) -
                        (liked && post.likes?.length > 0 ? 1 : 0)}
                    </span>
                  </motion.button>

                  {/* COMMENTS */}
                  <button
                    type="button"
                    className="flex h-10 items-center gap-2 rounded-full px-3 transition hover:bg-zinc-100"
                  >
                    <MessageCircle size={19} />

                    <span className="text-xs font-medium">
                      {post.commentsCount || 0}
                    </span>
                  </button>
                </div>

                {/* SHARE */}
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.85 }}
                  onClick={handleShare}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-100"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check size={19} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="share"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Share2 size={19} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>

              {post.likes?.length > 0 && (
                <p className="mt-1 px-3 text-[11px] font-medium text-zinc-500">
                  {post.likes.length}{" "}
                  {post.likes.length === 1 ? "like" : "likes"}
                </p>
              )}
            </div>

            {/* POST FOOTER */}
            <div className="px-4 py-5">
              <div className="rounded-2xl bg-zinc-50 p-4">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 overflow-hidden rounded-full bg-zinc-200">
                    {post.author?.profileImage ? (
                      <img
                        src={post.author.profileImage}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-950 text-[9px] font-bold text-white">
                        {post.author?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>

                  <span className="text-[11px] font-semibold">
                    {post.author?.name || "Unknown User"}
                  </span>

                  <span className="text-[10px] text-zinc-400">•</span>

                  <span className="text-[10px] text-zinc-400">
                    {formatPostDate(post.createdAt)}
                  </span>
                </div>

                <p className="mt-3 text-[11px] leading-5 text-zinc-500">
                  Connect, collaborate and build something meaningful with the
                  Co-Finder community.
                </p>
              </div>
            </div>
          </article>
        </div>
      </main>

      {/* MEDIA VIEWER */}
      <MediaViewer
        isOpen={mediaViewer.isOpen}
        onClose={closeMediaViewer}
        url={mediaViewer.url}
        type={mediaViewer.type}
        name={mediaViewer.name}
      />

      {/* PDF VIEWER */}
      <PdfViewer
        isOpen={pdfViewer.isOpen}
        onClose={closePdfViewer}
        url={pdfViewer.url}
        name={pdfViewer.name}
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* SKELETON                                                                    */
/* -------------------------------------------------------------------------- */

function PostSkeleton() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto min-h-screen w-full max-w-2xl border-x border-zinc-100">
        <div className="sticky top-0 z-40 flex h-14 items-center border-b border-zinc-200 bg-white/90 px-3 backdrop-blur-xl">
          <div className="h-9 w-9 animate-pulse rounded-full bg-zinc-100" />

          <div className="ml-3">
            <div className="h-3 w-14 animate-pulse rounded bg-zinc-200" />
            <div className="mt-1 h-2 w-10 animate-pulse rounded bg-zinc-100" />
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 animate-pulse rounded-full bg-zinc-100" />

            <div className="flex-1">
              <div className="h-3 w-28 animate-pulse rounded bg-zinc-200" />
              <div className="mt-2 h-2 w-20 animate-pulse rounded bg-zinc-100" />
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-zinc-100" />
            <div className="h-3 w-[85%] animate-pulse rounded bg-zinc-100" />
            <div className="h-3 w-[60%] animate-pulse rounded bg-zinc-100" />
          </div>
        </div>

        <div className="aspect-square w-full animate-pulse bg-zinc-100" />

        <div className="flex items-center gap-3 px-4 py-4">
          <div className="h-9 w-20 animate-pulse rounded-full bg-zinc-100" />
          <div className="h-9 w-20 animate-pulse rounded-full bg-zinc-100" />
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                     */
/* -------------------------------------------------------------------------- */

function formatPostDate(date: string) {
  if (!date) return "";

  const created = new Date(date);
  const now = new Date();

  const diff = now.getTime() - created.getTime();

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;

  return created.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}
