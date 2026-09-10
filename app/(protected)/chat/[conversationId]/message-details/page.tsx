
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BellOff,
  ChevronRight,
  Image as ImageIcon,
  Video,
  FileText,
  Link2,
  Lock,
  Search,
  Ban,
  Flag,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";

import { useChatStore } from "@/app/store/chatStore";

import MediaViewer from "@/app/(protected)/chat/comp/MediaViewer";
import PdfViewer from "@/app/(protected)/chat/comp/PdfViewer";

export default function MessageDetails() {
  const router = useRouter();
  const params = useParams();

  const conversationId = params.conversationId as string;

  const {
    messageDetails,
    loadingMessageDetails,
    fetchMessageDetails,
  } = useChatStore();

  // =====================================================
  // VIEWER STATES
  // =====================================================

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

  // =====================================================
  // FETCH MESSAGE DETAILS
  // =====================================================

  useEffect(() => {
    if (!conversationId) return;

    fetchMessageDetails(conversationId);
  }, [conversationId, fetchMessageDetails]);

  // =====================================================
  // OPEN IMAGE
  // =====================================================

  const openImage = (url: string, name?: string) => {
    setMediaViewer({
      isOpen: true,
      url,
      type: "image",
      name,
    });
  };

  // =====================================================
  // OPEN VIDEO
  // =====================================================

  const openVideo = (url: string, name?: string) => {
    setMediaViewer({
      isOpen: true,
      url,
      type: "video",
      name,
    });
  };

  // =====================================================
  // OPEN PDF
  // =====================================================

  const openPdf = (url: string, name?: string) => {
    setPdfViewer({
      isOpen: true,
      url,
      name,
    });
  };

  // =====================================================
  // CLOSE MEDIA
  // =====================================================

  const closeMediaViewer = () => {
    setMediaViewer((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  // =====================================================
  // CLOSE PDF
  // =====================================================

  const closePdfViewer = () => {
    setPdfViewer((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loadingMessageDetails) {
    return (
      <main className="min-h-screen bg-zinc-50">
        <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-zinc-200 bg-white/95 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="ml-3">
            <h1 className="text-sm font-bold text-zinc-950">
              Contact info
            </h1>

            <p className="text-[11px] text-zinc-400">
              Message details
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-4 pb-12 pt-6 sm:px-6">
          <div className="animate-pulse rounded-3xl border border-zinc-200 bg-white p-6">
            <div className="mx-auto h-28 w-28 rounded-full bg-zinc-200" />

            <div className="mx-auto mt-4 h-5 w-32 rounded bg-zinc-200" />

            <div className="mx-auto mt-2 h-4 w-24 rounded bg-zinc-100" />

            <div className="mx-auto mt-5 h-4 w-64 rounded bg-zinc-100" />
          </div>

          <div className="mt-4 h-64 animate-pulse rounded-3xl border border-zinc-200 bg-white" />
        </div>
      </main>
    );
  }

  // =====================================================
  // NO DATA
  // =====================================================

  if (!messageDetails || !messageDetails.user) {
    return (
      <main className="min-h-screen bg-zinc-50">
        <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-zinc-200 bg-white/95 px-4 backdrop-blur sm:px-6">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 active:scale-95"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="ml-3">
            <h1 className="text-sm font-bold text-zinc-950">
              Contact info
            </h1>

            <p className="text-[11px] text-zinc-400">
              Message details
            </p>
          </div>
        </header>

        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
              <Search size={22} />
            </div>

            <h2 className="mt-4 text-sm font-bold text-zinc-950">
              Unable to load details
            </h2>

            <p className="mt-1 text-xs text-zinc-400">
              Conversation details could not be found.
            </p>

            <p className="mt-3 text-[10px] text-zinc-300">
              Conversation ID: {conversationId}
            </p>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // DATA
  // =====================================================

  const user = messageDetails.user;
  const mediaFiles = messageDetails.mediaFiles || [];

  const photos = mediaFiles.filter(
    (item) => item.messageType === "image"
  );

  const videos = mediaFiles.filter(
    (item) => item.messageType === "video"
  );

  const documents = mediaFiles.filter(
    (item) => item.messageType === "file"
  );

  const initials =
    user.displayName
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    user.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ||
    "U";

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-30 flex h-[72px] items-center border-b border-zinc-200 bg-white/95 px-4 backdrop-blur sm:px-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-950 active:scale-95"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="ml-3">
          <h1 className="text-sm font-bold text-zinc-950">
            Contact info
          </h1>

          <p className="text-[11px] text-zinc-400">
            Message details
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 pb-12 pt-6 sm:px-6">

        {/* =====================================================
            PROFILE
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm"
        >
          <div className="relative mx-auto w-fit">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.displayName || user.name}
                className="h-28 w-28 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-zinc-950 text-2xl font-bold text-white">
                {initials}
              </div>
            )}

            <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-[3px] border-white bg-emerald-500" />
          </div>

          <h2 className="mt-4 text-xl font-bold text-zinc-950">
            {user.displayName || user.name}
          </h2>

          {user.username && (
            <p className="mt-1 text-sm text-zinc-400">
              @{user.username.replace(/^@/, "")}
            </p>
          )}

          <p className="mt-2 text-xs text-zinc-400">
            {user.email}
          </p>

          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Active
            </span>
          </div>
        </motion.section>

        {/* =====================================================
            MEDIA
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-4 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <h3 className="text-sm font-bold text-zinc-950">
                Media, links & docs
              </h3>

              <p className="mt-0.5 text-xs text-zinc-400">
                {messageDetails.totalMedia} shared items
              </p>
            </div>

            <ChevronRight
              size={18}
              className="text-zinc-300"
            />
          </div>

          {photos.length > 0 ? (
            <div className="grid grid-cols-4 gap-1 border-t border-zinc-100 p-1">
              {photos.map((item, index) => (
                <motion.button
                  type="button"
                  key={item.messageId}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  transition={{
                    delay: 0.1 + index * 0.05,
                  }}
                  onClick={() =>
                    openImage(item.url, item.name)
                  }
                  className="group aspect-square overflow-hidden bg-zinc-100"
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </motion.button>
              ))}
            </div>
          ) : (
            <div className="border-t border-zinc-100 px-5 py-8 text-center">
              <ImageIcon
                size={24}
                className="mx-auto text-zinc-300"
              />

              <p className="mt-2 text-xs text-zinc-400">
                No photos shared
              </p>
            </div>
          )}
        </motion.section>

        {/* =====================================================
            CHAT SETTINGS
        ===================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.14 }}
          className="mt-4 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
        >
          <DetailRow
            icon={<BellOff size={18} />}
            title="Mute notifications"
            description="Turn off notifications for this chat"
            right={
              <div className="h-6 w-11 rounded-full bg-zinc-200 p-1">
                <div className="h-4 w-4 rounded-full bg-white shadow-sm" />
              </div>
            }
          />

          <DetailRow
            icon={<Search size={18} />}
            title="Search in conversation"
            description="Find messages from this chat"
          />

          <DetailRow
            icon={<ImageIcon size={18} />}
            title="Photos"
            description={`${photos.length} shared photos`}
          />

          <DetailRow
            icon={<Video size={18} />}
            title="Videos"
            description={`${videos.length} shared videos`}
          />

          <DetailRow
            icon={<FileText size={18} />}
            title="Documents"
            description={`${documents.length} shared files`}
          />

          <DetailRow
            icon={<Link2 size={18} />}
            title="Links"
            description="Links shared in conversation"
            last
          />
        </motion.section>

        {/* =====================================================
            VIDEOS
        ===================================================== */}

        {videos.length > 0 && (
          <motion.section
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.18,
            }}
            className="mt-4 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
          >
            <div className="px-5 py-4">
              <h3 className="text-sm font-bold text-zinc-950">
                Shared videos
              </h3>
            </div>

            <div className="space-y-2 border-t border-zinc-100 p-3">
              {videos.map((video) => (
                <button
                  type="button"
                  key={video.messageId}
                  onClick={() =>
                    openVideo(video.url, video.name)
                  }
                  className="flex w-full items-center gap-3 rounded-2xl bg-zinc-50 p-3 text-left transition hover:bg-zinc-100 active:scale-[0.99]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-200 text-zinc-600">
                    <Video size={18} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-900">
                      {video.name}
                    </p>

                    <p className="text-xs text-zinc-400">
                      {(video.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>

                  <ChevronRight
                    size={16}
                    className="text-zinc-300"
                  />
                </button>
              ))}
            </div>
          </motion.section>
        )}

        {/* =====================================================
            DOCUMENTS
        ===================================================== */}

        {documents.length > 0 && (
          <motion.section
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.22,
            }}
            className="mt-4 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
          >
            <div className="px-5 py-4">
              <h3 className="text-sm font-bold text-zinc-950">
                Shared documents
              </h3>
            </div>

            <div className="space-y-2 border-t border-zinc-100 p-3">
              {documents.map((file) => {
                const isPdf =
                  file.name?.toLowerCase().endsWith(".pdf") ||
                  file.type === "application/pdf";

                return (
                  <button
                    type="button"
                    key={file.messageId}
                    onClick={() => {
                      if (isPdf) {
                        openPdf(file.url, file.name);
                      } else {
                        window.open(
                          file.url,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }
                    }}
                    className="flex w-full items-center gap-3 rounded-2xl bg-zinc-50 p-3 text-left transition hover:bg-zinc-100 active:scale-[0.99]"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-200 text-zinc-600">
                      <FileText size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-zinc-900">
                        {file.name}
                      </p>

                      <p className="text-xs text-zinc-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    {isPdf ? (
                      <ChevronRight
                        size={16}
                        className="text-zinc-300"
                      />
                    ) : (
                      <ExternalLink
                        size={16}
                        className="text-zinc-300"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* =====================================================
            PRIVACY
        ===================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.26,
          }}
          className="mt-4 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
        >
          <div className="px-5 py-4">
            <h3 className="text-sm font-bold text-zinc-950">
              Privacy & security
            </h3>
          </div>

          <DetailRow
            icon={<Lock size={18} />}
            title="Encryption"
            description="Messages are protected with encryption"
            last
          />
        </motion.section>

        {/* =====================================================
            DANGER ZONE
        ===================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.3,
          }}
          className="mt-4 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
        >
          <button
            type="button"
            className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-zinc-50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <Ban size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-red-600">
                Block {user.displayName || user.name}
              </p>

              <p className="mt-0.5 text-xs text-zinc-400">
                Stop receiving messages from this person
              </p>
            </div>
          </button>

          <div className="mx-5 border-t border-zinc-100" />

          <button
            type="button"
            className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-red-50/50"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <Flag size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold text-red-600">
                Report {user.displayName || user.name}
              </p>

              <p className="mt-0.5 text-xs text-zinc-400">
                Report this account or conversation
              </p>
            </div>
          </button>
        </motion.section>

        <p className="mt-8 text-center text-[11px] text-zinc-400">
          Conversation details
        </p>
      </div>

      {/* =====================================================
          MEDIA VIEWER
      ===================================================== */}

      <MediaViewer
        isOpen={mediaViewer.isOpen}
        onClose={closeMediaViewer}
        url={mediaViewer.url}
        type={mediaViewer.type}
        name={mediaViewer.name}
      />

      {/* =====================================================
          PDF VIEWER
      ===================================================== */}

      <PdfViewer
        isOpen={pdfViewer.isOpen}
        onClose={closePdfViewer}
        url={pdfViewer.url}
        name={pdfViewer.name}
      />
    </main>
  );
}

// =====================================================
// DETAIL ROW
// =====================================================

function DetailRow({
  icon,
  title,
  description,
  right,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  right?: React.ReactNode;
  last?: boolean;
}) {
  return (
    <>
      <button
        type="button"
        className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-zinc-50"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600">
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-zinc-900">
            {title}
          </p>

          <p className="mt-0.5 truncate text-xs text-zinc-400">
            {description}
          </p>
        </div>

        {right || (
          <ChevronRight
            size={17}
            className="shrink-0 text-zinc-300"
          />
        )}
      </button>

      {!last && (
        <div className="mx-5 border-t border-zinc-100" />
      )}
    </>
  );
}
