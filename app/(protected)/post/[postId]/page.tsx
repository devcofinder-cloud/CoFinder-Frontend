"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  User,
  Send,
  Trash2,
  Loader2,
  FileText,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

import { dashboardStore } from "@/app/store/dashboardStore";
import MediaViewer from "@/app/(protected)/chat/comp/MediaViewer";
import PdfViewer from "@/app/(protected)/chat/comp/PdfViewer";

type Comment = {
  _id: string;
  content: string;
  createdAt?: string;
  user?: {
    _id: string;
    name?: string;
    username?: string;
    profileImage?: string;
    avatar?: string;
  };
  author?: {
    _id: string;
    name?: string;
    username?: string;
    profileImage?: string;
    avatar?: string;
  };
};

export default function PostDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const postId = params?.postId as string;

  const {
    post,
    loadingPost,
    fetchPostById,
    clearPost,
    toggleLike,
    addComment,
    getComments,
    deleteComment,
    getPostVotes,
    toggleUpvote,
    toggleDownvote,
  } = dashboardStore();

  const [userId, setUserId] = useState("");

  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);

  const [commentText, setCommentText] = useState("");
  const [voteLoading, setVoteLoading] = useState(false);

  const [votes, setVotes] = useState({
    upvotesCount: 0,
    downvotesCount: 0,
    hasUpvoted: false,
    hasDownvoted: false,
  });

  const [mediaOpen, setMediaOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  const [pdfOpen, setPdfOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<any>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const parsedUser = JSON.parse(user);

        setUserId(parsedUser?._id || parsedUser?.id || "");
      } catch {
        setUserId("");
      }
    }
  }, []);

  useEffect(() => {
    if (!postId) return;

    fetchPostById(postId);

    return () => {
      clearPost();
    };
  }, [postId, fetchPostById, clearPost]);

  const isLiked =
    !!userId &&
    !!post?.likes?.some((id: any) => id?.toString() === userId.toString());

  const likesCount = post?.likes?.length || 0;
  const commentsCount = post?.commentsCount || 0;

  useEffect(() => {
    if (!postId || !post) return;

    const loadVotes = async () => {
      try {
        const res = await getPostVotes(postId);

        const data = res?.data;

        if (data) {
          setVotes({
            upvotesCount: data.upvotesCount || 0,
            downvotesCount: data.downvotesCount || 0,
            hasUpvoted: !!data.hasUpvoted,
            hasDownvoted: !!data.hasDownvoted,
          });
        }
      } catch (error) {
        console.error("Failed to load votes:", error);
      }
    };

    loadVotes();
  }, [postId, post]);

  const handleLike = async () => {
    if (!post || !userId) return;

    try {
      await toggleLike(post._id, userId);
    } catch (error) {
      console.error("Like failed:", error);
    }
  };

  const handleUpvote = async () => {
    if (!post || !userId || voteLoading) return;

    try {
      setVoteLoading(true);

      const res = await toggleUpvote(post._id);

      if (res?.success) {
        const data = res.data;

        setVotes({
          upvotesCount: data?.upvotesCount || 0,
          downvotesCount: data?.downvotesCount || 0,
          hasUpvoted: !!data?.upvoted,
          hasDownvoted: !!data?.downvoted,
        });
      }
    } catch (error) {
      console.error("Upvote failed:", error);
    } finally {
      setVoteLoading(false);
    }
  };

  const handleDownvote = async () => {
    if (!post || !userId || voteLoading) return;

    try {
      setVoteLoading(true);

      const res = await toggleDownvote(post._id);

      if (res?.success) {
        const data = res.data;

        setVotes({
          upvotesCount: data?.upvotesCount || 0,
          downvotesCount: data?.downvotesCount || 0,
          hasUpvoted: !!data?.upvoted,
          hasDownvoted: !!data?.downvoted,
        });
      }
    } catch (error) {
      console.error("Downvote failed:", error);
    } finally {
      setVoteLoading(false);
    }
  };

  const handleOpenComments = async () => {
    const nextState = !commentsOpen;

    setCommentsOpen(nextState);

    if (!nextState || !post) return;

    try {
      setCommentsLoading(true);

      const data = await getComments(post._id);

      setComments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load comments:", error);
      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!post || !commentText.trim()) return;

    try {
      setCommentLoading(true);

      const res = await addComment(post._id, commentText.trim());

      if (res?.success) {
        setCommentText("");

        const data = await getComments(post._id);

        setComments(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Comment failed:", error);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (comment: Comment) => {
    if (!post) return;

    const commentUserId = comment.user?._id || comment.author?._id || "";

    if (
      commentUserId &&
      userId &&
      commentUserId.toString() !== userId.toString()
    ) {
      return;
    }

    try {
      await deleteComment(comment._id, post._id);

      setComments((prev) => prev.filter((item) => item._id !== comment._id));
    } catch (error) {
      console.error("Delete comment failed:", error);
    }
  };

  const handleShare = async () => {
    if (!post) return;

    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Co-Finder Post",
          text: post.content || "Check out this post",
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const getCommentUser = (comment: Comment) => {
    return comment.user || comment.author;
  };

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

  const openMedia = (media: any) => {
    if (!media?.url) return;

    const type = media.type?.toLowerCase() || "";

    if (
      type.includes("pdf") ||
      type === "application/pdf" ||
      media.url.toLowerCase().endsWith(".pdf")
    ) {
      setPdfViewer({
        isOpen: true,
        url: media.url,
        name: media.name || "PDF Document",
      });

      return;
    }

    if (type.includes("video")) {
      setMediaViewer({
        isOpen: true,
        url: media.url,
        type: "video",
        name: media.name || "Video",
      });

      return;
    }

    setMediaViewer({
      isOpen: true,
      url: media.url,
      type: "image",
      name: media.name || "Image",
    });
  };

  if (loadingPost) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex items-center gap-2 text-zinc-500">
          <Loader2 size={18} className="animate-spin" />
          <span className="text-sm">Loading post...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
          <FileText size={24} className="text-zinc-500" />
        </div>

        <h1 className="mt-4 text-lg font-semibold text-zinc-900">
          Post not found
        </h1>

        <p className="mt-1 text-center text-sm text-zinc-500">
          This post may have been deleted or is no longer available.
        </p>

        <button
          type="button"
          onClick={() => router.back()}
          className="mt-5 rounded-full bg-zinc-950 px-5 py-2.5 text-xs font-medium text-white transition hover:bg-zinc-800"
        >
          Go Back
        </button>
      </div>
    );
  }

  const author = post.author;

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-100"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="text-center">
            <p className="text-sm font-semibold text-zinc-950">Post</p>

            <p className="text-[10px] text-zinc-400">Founder Network</p>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-zinc-100"
          >
            <MoreHorizontal size={20} />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-5">
        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push(`/profile/${author?._id}`)}
              className="overflow-hidden rounded-full"
            >
              {author?.profileImage || author?.avatar ? (
                <img
                  src={author.profileImage || author.avatar}
                  alt={author?.name || "User"}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-100">
                  <User size={19} className="text-zinc-500" />
                </div>
              )}
            </button>

            <div>
              <button
                type="button"
                onClick={() => router.push(`/profile/${author?._id}`)}
                className="block text-left"
              >
                <p className="text-sm font-semibold text-zinc-950">
                  {author?.name || "Unknown User"}
                </p>
              </button>

              {/* {author?.username && (
                <p className="text-[11px] text-zinc-400">
                  @{author.username}
                </p>
              )} */}
            </div>
          </div>

          <p className="text-[10px] text-zinc-400">
            {post.createdAt
              ? new Date(post.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : ""}
          </p>
        </div>

        {/* Post Text */}
        {post.content && (
          <div className="mt-5">
            <p className="whitespace-pre-wrap text-[15px] leading-7 text-zinc-800">
              {post.content}
            </p>
          </div>
        )}

        {/* Media */}
        {post.media?.length > 0 && (
          <div
            className={`mt-5 grid gap-2 ${
              post.media.length === 1 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {post.media.map((file: any, index: number) => {
              const type = file.type?.toLowerCase() || "";

              const isPdf =
                type.includes("pdf") ||
                type === "application/pdf" ||
                file.url?.toLowerCase().endsWith(".pdf");

              const isVideo = type.includes("video");

              return (
                <button
                  key={file._id || file.publicId || index}
                  type="button"
                  onClick={() => openMedia(file)}
                  className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 text-left"
                >
                  {isPdf ? (
                    <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 p-6">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-950 text-white">
                        <FileText size={25} />
                      </div>

                      <div className="max-w-full text-center">
                        <p className="truncate text-xs font-medium text-zinc-800">
                          {file.name || "PDF Document"}
                        </p>

                        <p className="mt-1 text-[10px] text-zinc-400">
                          Tap to view
                        </p>
                      </div>
                    </div>
                  ) : isVideo ? (
                    <video
                      src={file.url}
                      className="h-full min-h-[220px] w-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={file.url}
                      alt={file.name || "Post media"}
                      className="h-full min-h-[220px] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  )}

                  {isVideo && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm">
                        <span className="ml-0.5 text-lg">▶</span>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Actions */}
        <div className="mt-5 border-b border-zinc-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {/* Like */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.84 }}
                onClick={handleLike}
                disabled={!userId}
                className={`flex h-10 items-center gap-2 rounded-full px-3 transition ${
                  isLiked
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <Heart size={19} fill={isLiked ? "currentColor" : "none"} />

                <span className="text-xs font-medium">{likesCount}</span>
              </motion.button>

              {/* Upvote */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.84 }}
                onClick={handleUpvote}
                disabled={!userId || voteLoading}
                className={`flex h-10 items-center gap-2 rounded-full px-3 transition ${
                  votes.hasUpvoted
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <ThumbsUp
                  size={18}
                  fill={votes.hasUpvoted ? "currentColor" : "none"}
                />

                <span className="text-xs font-medium">
                  {votes.upvotesCount}
                </span>
              </motion.button>

              {/* Downvote */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.84 }}
                onClick={handleDownvote}
                disabled={!userId || voteLoading}
                className={`flex h-10 items-center gap-2 rounded-full px-3 transition ${
                  votes.hasDownvoted
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <ThumbsDown
                  size={18}
                  fill={votes.hasDownvoted ? "currentColor" : "none"}
                />

                <span className="text-xs font-medium">
                  {votes.downvotesCount}
                </span>
              </motion.button>

              {/* Comments */}
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={handleOpenComments}
                className={`flex h-10 items-center gap-2 rounded-full px-3 transition ${
                  commentsOpen
                    ? "bg-zinc-100 text-zinc-950"
                    : "text-zinc-700 hover:bg-zinc-100"
                }`}
              >
                <MessageCircle size={19} />

                <span className="text-xs font-medium">{commentsCount}</span>
              </motion.button>
            </div>

            {/* Share */}
            <motion.button
              type="button"
              whileTap={{ scale: 0.9 }}
              onClick={handleShare}
              className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-700 transition hover:bg-zinc-100"
            >
              <Share2 size={19} />
            </motion.button>
          </div>

          {likesCount > 0 && (
            <p className="mt-1 px-3 text-[11px] font-medium text-zinc-500">
              {likesCount} {likesCount === 1 ? "like" : "likes"}
            </p>
          )}
        </div>

        {/* Comments */}
        {commentsOpen && (
          <section className="pt-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-semibold text-zinc-950">
                  Comments
                </h2>

                <p className="mt-0.5 text-[10px] text-zinc-400">
                  Join the conversation
                </p>
              </div>

              {commentsCount > 0 && (
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-medium text-zinc-600">
                  {commentsCount}
                </span>
              )}
            </div>

            {/* Add Comment */}
            <div className="flex items-end gap-2">
              <div className="flex min-h-[42px] flex-1 items-center rounded-2xl border border-zinc-200 bg-zinc-50 px-4 transition focus-within:border-zinc-400">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                  placeholder="Write a comment..."
                  className="w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                />
              </div>

              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={handleAddComment}
                disabled={!commentText.trim() || commentLoading}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {commentLoading ? (
                  <Loader2 size={17} className="animate-spin" />
                ) : (
                  <Send size={17} />
                )}
              </motion.button>
            </div>

            {/* Comments List */}
            <div className="mt-5">
              {commentsLoading ? (
                <div className="flex items-center justify-center py-10">
                  <Loader2 size={18} className="animate-spin text-zinc-400" />
                </div>
              ) : comments.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-zinc-200 py-10 text-center">
                  <MessageCircle size={22} className="mx-auto text-zinc-300" />

                  <p className="mt-2 text-xs font-medium text-zinc-500">
                    No comments yet
                  </p>

                  <p className="mt-1 text-[10px] text-zinc-400">
                    Be the first to comment.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => {
                    const commentUser = getCommentUser(comment);

                    const commentUserId = commentUser?._id || "";

                    const isOwnComment =
                      !!userId &&
                      !!commentUserId &&
                      commentUserId.toString() === userId.toString();

                    return (
                      <div key={comment._id} className="flex gap-3">
                        {/* Avatar */}
                        <div className="shrink-0">
                          {commentUser?.profileImage || commentUser?.avatar ? (
                            <img
                              src={
                                commentUser.profileImage || commentUser.avatar
                              }
                              alt={commentUser.name || "User"}
                              className="h-9 w-9 rounded-full object-cover"
                            />
                          ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100">
                              <User size={16} className="text-zinc-400" />
                            </div>
                          )}
                        </div>

                        {/* Comment */}
                        <div className="min-w-0 flex-1">
                          <div className="rounded-2xl bg-zinc-50 px-4 py-3">
                            <div className="flex items-center justify-between gap-3">
                              <p className="truncate text-xs font-semibold text-zinc-900">
                                {commentUser?.name || "User"}
                              </p>

                              {comment.createdAt && (
                                <span className="shrink-0 text-[9px] text-zinc-400">
                                  {new Date(
                                    comment.createdAt,
                                  ).toLocaleDateString("en-IN", {
                                    day: "numeric",
                                    month: "short",
                                  })}
                                </span>
                              )}
                            </div>

                            <p className="mt-1 whitespace-pre-wrap break-words text-xs leading-5 text-zinc-600">
                              {comment.content}
                            </p>
                          </div>

                          {isOwnComment && (
                            <button
                              type="button"
                              onClick={() => handleDeleteComment(comment)}
                              className="mt-1.5 ml-3 flex items-center gap-1 text-[10px] text-red-500 transition hover:text-red-700"
                            >
                              <Trash2 size={11} />
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      <MediaViewer
        isOpen={mediaViewer.isOpen}
        onClose={() =>
          setMediaViewer({
            isOpen: false,
            url: "",
            type: "image",
          })
        }
        url={mediaViewer.url}
        type={mediaViewer.type}
        name={mediaViewer.name}
      />

      <PdfViewer
        isOpen={pdfViewer.isOpen}
        onClose={() =>
          setPdfViewer({
            isOpen: false,
            url: "",
          })
        }
        url={pdfViewer.url}
        name={pdfViewer.name}
      />
    </main>
  );
}
