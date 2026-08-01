"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ArchetypeCard({
  archetype,
}: {
  archetype: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.4,
        rotate: -180,
        y: 150,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate: 0,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.4,
        rotate: 180,
        y: -150,
      }}
      transition={{
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/70 backdrop-blur-xl px-5"
    >
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-10 shadow-[0_30px_80px_rgba(0,0,0,0.08)] max-w-2xl w-full">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-32 -right-32 h-72 w-72 rounded-full bg-gradient-to-br from-zinc-300/30 via-zinc-100/20 to-transparent blur-3xl"
        />

        <div className="relative z-10 flex flex-col items-center text-center">

          <motion.div
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-900 text-white"
          >
            <Sparkles size={35} />
          </motion.div>

          <p className="text-xs uppercase tracking-[0.4em] text-zinc-500 font-semibold">
            Your Founder Archetype
          </p>

          <h1 className="mt-6 text-6xl font-bold">
            {archetype}
          </h1>

          <p className="mt-6 text-zinc-500">
            AI has successfully analyzed your personality and generated your
            founder profile.
          </p>
        </div>
      </div>
    </motion.div>
  );
}