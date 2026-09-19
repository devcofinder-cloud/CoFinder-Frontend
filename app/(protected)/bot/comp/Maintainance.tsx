"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface MaintenanceStateProps {
  onRetry?: () => void;
}

export default function MaintenanceState({
  onRetry,
}: MaintenanceStateProps) {
  const router = useRouter();

  return (
    <div className="flex min-h-[calc(100vh-210px)] items-center justify-center px-2 py-10">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full max-w-md"
      >
        <div className="relative overflow-hidden rounded-[30px] border border-zinc-200 bg-white px-6 py-10 text-center shadow-[0_20px_70px_rgba(0,0,0,0.07)] sm:px-10">

          {/* Glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-zinc-100 blur-3xl" />

          {/* Bot */}
          <div className="relative mx-auto h-32 w-32">

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.25, 0.5, 0.25],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full border border-zinc-200"
            />

            <motion.div
              animate={{
                scale: [1, 1.14, 1],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-3 rounded-full bg-zinc-100"
            />

            <div className="absolute inset-6 overflow-hidden rounded-[24px] bg-zinc-950 shadow-2xl shadow-zinc-950/20">
              <Image
                src="/images/bot1.png"
                alt="Nova AI"
                fill
                className="object-contain p-2"
              />
            </div>

            {/* Status */}
            <div className="absolute -right-1 bottom-3 flex h-7 w-7 items-center justify-center rounded-full border-4 border-white bg-zinc-100">
              <motion.span
                animate={{
                  scale: [1, 1.35, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                }}
                className="h-2 w-2 rounded-full bg-amber-500"
              />
            </div>
          </div>

          {/* Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-7 flex items-center justify-center gap-2"
          >
            <Sparkles className="h-3.5 w-3.5 text-zinc-400" />

            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Nova Assistant
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-[27px] font-semibold leading-tight tracking-[-0.035em] text-zinc-950 sm:text-3xl"
          >
            I&apos;m currently
            <br />
            under maintenance.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mt-4 max-w-sm text-[13px] leading-6 text-zinc-400"
          >
            I&apos;m getting a few things ready behind the scenes.
            I&apos;ll be back soon and ready to help you build,
            connect and move your ideas forward.
          </motion.p>

          {/* Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-amber-400/40" />
              <span className="relative h-2 w-2 rounded-full bg-amber-500" />
            </span>

            <span className="text-[10px] font-medium text-zinc-500">
              Temporarily unavailable
            </span>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center"
          >
            <button
              onClick={onRetry}
              className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-5 text-xs font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.97]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Try Again
            </button>

            <button
              onClick={() => router.push("/contact")}
              className="group flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 text-xs font-semibold text-white shadow-lg shadow-zinc-950/10 transition-all hover:bg-zinc-800 active:scale-[0.97]"
            >
              Contact Support

              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </motion.div>

          {/* Bottom message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 border-t border-zinc-100 pt-5"
          >
            <p className="text-[10px] leading-5 text-zinc-400">
              Need help right now?
              <span className="ml-1 font-medium text-zinc-600">
                Our team is here for you.
              </span>
            </p>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
