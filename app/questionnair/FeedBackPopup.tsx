"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, AlertTriangle, X } from "lucide-react";

type ModalType = "success" | "error" | "warning";

interface FeedbackModalProps {
  isOpen: boolean;
  type: ModalType;
  title: string;
  message: string;
  buttonText?: string;
  onClose: () => void;
}

export default function FeedbackPopup({
  isOpen,
  type,
  title,
  message,
  buttonText = "Continue",
  onClose,
}: FeedbackModalProps) {
  const config = {
    success: {
      icon: Check,
      iconWrapper: "bg-black text-white",
      button: "bg-black hover:bg-zinc-800",
    },
    error: {
      icon: X,
      iconWrapper: "bg-red-100 text-red-600",
      button: "bg-red-600 hover:bg-red-700",
    },
    warning: {
      icon: AlertTriangle,
      iconWrapper: "bg-zinc-100 text-black",
      button: "bg-black hover:bg-zinc-800",
    },
  };

  const current = config[type];
  const Icon = current.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 22,
            }}
            className="relative w-full max-w-md bg-white border-2 border-black rounded-3xl p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                delay: 0.1,
                type: "spring",
                stiffness: 300,
              }}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${current.iconWrapper}`}
            >
              <Icon size={30} strokeWidth={2.5} />
            </motion.div>

            {/* Content */}
            <div className="mb-8">
              <h2 className="text-2xl font-extrabold text-black tracking-tight mb-2">
                {title}
              </h2>

              <p className="text-zinc-600 leading-relaxed">
                {message}
              </p>
            </div>

            {/* Button */}
            <button
              onClick={onClose}
              className={`w-full py-4 rounded-xl text-white font-semibold transition cursor-pointer ${current.button}`}
            >
              {buttonText}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}