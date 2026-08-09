"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Loader2 } from "lucide-react";

type ModalType = "success" | "error" | "warning" | "loading";

interface Props {
  open: boolean;
  type: ModalType;
  title: string;
  message: string;
  onClose?: () => void;
}

const config = {
  success: {
    icon: CheckCircle2,
  },
  error: {
    icon: XCircle,
  },
  warning: {
    icon: AlertTriangle,
  },
  loading: {
    icon: Loader2,
  },
};

export default function ResponseModal({
  open,
  type,
  title,
  message,
  onClose,
}: Props) {
  const Icon = config[type].icon;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={type !== "loading" ? onClose : undefined}
            className="fixed inset-0 z-50 bg-white/60 backdrop-blur-xl m-5"
          />

          {/* Card */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 22,
            }}
            className="fixed left-1/2 top-1/2 z-50 w-[380px] sm:w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white border border-zinc-200 shadow-[0_40px_120px_rgba(0,0,0,.15)] p-8"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50">
                {type === "loading" ? (
                  <Loader2 size={42} className="animate-spin text-zinc-900" />
                ) : (
                  <Icon size={42} className="text-zinc-900" />
                )}
              </div>

              <h2 className="mt-8 text-[30px] font-semibold tracking-tight text-zinc-950">
                {title}
              </h2>

              <p className="mt-3 max-w-[320px] text-[15px] leading-7 text-zinc-500">
                {message}
              </p>

              {type !== "loading" && (
                <button
                  onClick={onClose}
                  className=" mt-9 h-12 w-full rounded-2xl bg-zinc-950 text-sm font-medium text-white transition-all duration-300 hover:scale-[1.02] hover:bg-black active:scale-[0.98]"
                >
                  Continue
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
