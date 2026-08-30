"use client";

import { useEffect, useRef, useState } from "react";
import {
  MoreVertical,
  Trash2,
  Ban,
  Flag,
  Eraser,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface ChatOptionsProps {
  onClearChat?: () => void;
  onBlock?: () => void;
  onReport?: () => void;
}

export default function ChatOptions({
  onClearChat,
  onBlock,
  onReport,
}: ChatOptionsProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAction = (action?: () => void) => {
    action?.();
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* TRIGGER */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Chat options"
        className={`flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-200 ${
          open
            ? "border-zinc-950 bg-zinc-950 text-white"
            : "border-zinc-200 text-zinc-500 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
        }`}
      >
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <MoreVertical size={17} />
        </motion.div>
      </motion.button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: -8,
              filter: "blur(4px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: -8,
              filter: "blur(4px)",
            }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 28,
              mass: 0.7,
            }}
            className="absolute right-0 top-12 z-50 w-[220px] overflow-hidden rounded-2xl border border-zinc-200 bg-white p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
          >
            {/* HEADER */}
            <div className="px-3 pb-2 pt-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                Chat options
              </p>
            </div>

            {/* CLEAR CHAT */}
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAction(onClearChat)}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-zinc-50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 transition-colors group-hover:bg-zinc-200">
                <Eraser size={16} className="text-zinc-700" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-900">
                  Clear chat
                </p>
                <p className="text-[11px] text-zinc-400">
                  Remove all messages
                </p>
              </div>
            </motion.button>

            {/* DIVIDER */}
            <div className="mx-2 my-1 h-px bg-zinc-100" />

            {/* BLOCK */}
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAction(onBlock)}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-zinc-50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-100 transition-colors group-hover:bg-zinc-200">
                <Ban size={16} className="text-zinc-700" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-900">
                  Block
                </p>
                <p className="text-[11px] text-zinc-400">
                  Stop receiving messages
                </p>
              </div>
            </motion.button>

            {/* REPORT */}
            <motion.button
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAction(onReport)}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-red-50"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 transition-colors group-hover:bg-red-100">
                <Flag size={16} className="text-red-500" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium text-red-600">
                  Report
                </p>
                <p className="text-[11px] text-red-400">
                  Report this conversation
                </p>
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}