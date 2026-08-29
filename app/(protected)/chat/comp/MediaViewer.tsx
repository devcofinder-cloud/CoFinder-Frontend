"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, X } from "lucide-react";
import { useEffect } from "react";

interface MediaViewerProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  type: "image" | "video";
  name?: string;
}

export default function MediaViewer({
  isOpen,
  onClose,
  url,
  type,
  name,
}: MediaViewerProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* TOP BAR */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-4 py-4 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="max-w-[70%] truncate text-sm font-medium text-white">
              {name || "Media"}
            </p>

            <div className="flex items-center gap-2">
              <a
                href={url}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 active:scale-90"
              >
                <Download size={18} />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 active:scale-90"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>

          {/* MEDIA */}
          <motion.div
            initial={{
              scale: 0.82,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.82,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 380,
              damping: 30,
              mass: 0.7,
            }}
            className="flex max-h-full max-w-full items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {type === "image" ? (
              <img
                src={url}
                alt={name || "Image"}
                className="max-h-[88vh] max-w-[95vw] rounded-lg object-contain sm:max-h-[90vh] sm:max-w-[92vw]"
              />
            ) : (
              <video
                src={url}
                controls
                autoPlay
                playsInline
                className="max-h-[88vh] max-w-[95vw] rounded-lg object-contain sm:max-h-[90vh] sm:max-w-[92vw]"
              />
            )}
          </motion.div>

          {/* BOTTOM HINT */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.15 }}
            className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-white/40"
          >
            Tap outside to close
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
