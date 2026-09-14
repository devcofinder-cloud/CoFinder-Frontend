"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useEffect } from "react";

interface CustomToastProps {
  message: string;
  type?: "success" | "error";
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomToast({
  message,
  type = "success",
  isOpen,
  onClose,
}: CustomToastProps) {
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 28,
          }}
          className="fixed right-4 top-5 z-[9999] w-[calc(100vw-2rem)] max-w-sm"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 px-4 py-3.5 text-white shadow-2xl shadow-black/20">
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                type === "success"
                  ? "bg-white text-zinc-950"
                  : "bg-zinc-800 text-white"
              }`}
            >
              {type === "success" ? (
                <Check size={18} strokeWidth={2.5} />
              ) : (
                <X size={18} strokeWidth={2.5} />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white">
                {type === "success" ? "Success" : "Something went wrong"}
              </p>

              <p className="mt-0.5 truncate text-[11px] text-zinc-400">
                {message}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-white/10 hover:text-white"
            >
              <X size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}