"use client";

import { useRouter } from "next/navigation";
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
} from "lucide-react";
import { motion } from "framer-motion";

export default function MessageDetails() {
  const router = useRouter();

  // Static data for now
  const user = {
    name: "Rahul Sharma",
    username: "@rahulsharma",
    profileImage: "",
    bio: "Building things. Learning every day.",
    online: true,
  };

  const media = [
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    },
    {
      type: "image",
      url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b",
    },
  ];

  return (
    <main className="min-h-screen bg-zinc-50">
      {/* HEADER */}
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
        {/* PROFILE */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm"
        >
          <div className="relative mx-auto w-fit">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.name}
                className="h-28 w-28 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-zinc-950 text-2xl font-bold text-white">
                RS
              </div>
            )}

            {user.online && (
              <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-[3px] border-white bg-emerald-500" />
            )}
          </div>

          <h2 className="mt-4 text-xl font-bold text-zinc-950">
            {user.name}
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            {user.username}
          </p>

          <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-zinc-600">
            {user.bio}
          </p>

          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Online
            </span>
          </div>
        </motion.section>

        {/* MEDIA */}
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
                Shared in this conversation
              </p>
            </div>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-950"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-4 gap-1 border-t border-zinc-100 p-1">
            {media.map((item, index) => (
              <motion.div
                key={item.url}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className="aspect-square overflow-hidden bg-zinc-100"
              >
                <img
                  src={item.url}
                  alt="Shared media"
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CHAT SETTINGS */}
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
            description={`${media.length} shared photos`}
          />

          <DetailRow
            icon={<Video size={18} />}
            title="Videos"
            description="Shared videos"
          />

          <DetailRow
            icon={<FileText size={18} />}
            title="Documents"
            description="Shared files and documents"
          />

          <DetailRow
            icon={<Link2 size={18} />}
            title="Links"
            description="Links shared in conversation"
            last
          />
        </motion.section>

        {/* PRIVACY */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
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

        {/* DANGER ZONE */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
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
                Block {user.name}
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
                Report {user.name}
              </p>
              <p className="mt-0.5 text-xs text-zinc-400">
                Report this account or conversation
              </p>
            </div>
          </button>
        </motion.section>

        {/* FOOTER */}
        <p className="mt-8 text-center text-[11px] text-zinc-400">
          This information is currently static
        </p>
      </div>
    </main>
  );
}

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