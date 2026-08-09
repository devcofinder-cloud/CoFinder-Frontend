"use client";

import { motion } from "framer-motion";

export default function PremiumLoader({
  text = "Loading",
}: {
  text?: string;
}) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">

        {/* Loader */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-zinc-200"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Progress ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-[2px] border-transparent border-t-black border-r-black"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Center */}
          <motion.div
            className="h-3 w-3 rounded-full bg-black"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.6, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Text */}
        <div className="mt-6 flex items-center gap-1">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-900">
            {text}
          </span>

          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            .
          </motion.span>

          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            .
          </motion.span>

          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
          >
            .
          </motion.span>
        </div>

        <p className="mt-2 text-[11px] font-mono tracking-wider text-zinc-400">
          PLEASE WAIT
        </p>
      </div>
    </div>
  );
}