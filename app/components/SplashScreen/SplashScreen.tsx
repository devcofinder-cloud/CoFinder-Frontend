"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const appRouter = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);

      setTimeout(() => {
        appRouter.replace("/home");
      }, 600); // exit animation
    }, 2200);

    return () => clearTimeout(timer);
  }, [appRouter]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(10px)",
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#fafafa]"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />

          <div className="relative z-10 flex flex-col items-center">
            {/* The Premium "C" Logo Container */}
            <motion.div
              initial={{ scale: 0.82, opacity: 0, y: 15 }}
              animate={{ scale: 2, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative mb-6 h-24 w-24 flex items-center justify-center rounded-3xl border border-zinc-200/80 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
            >
              {/* Dynamic Glow behind the icon */}
              <div className="absolute inset-0 rounded-3xl bg-zinc-100 blur-xl opacity-50 -z-10" />

              {/* Elegant Serif Logo */}

              <Image
                src="/images/logo.png"
                alt="Logo"
                width={70}
                height={70}
                className="object-contain select-none"
              />
              {/* Subtle pulsing scale ring */}
              <motion.div
                animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0.15, 0.4] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-1 rounded-[28px] border border-zinc-200 pointer-events-none"
              />
            </motion.div>

            {/* Typography Entrance */}
            <div className="text-center space-y-4F">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-2xl font-semibold tracking-tight text-zinc-900 mt-10"
              >
                Cofinder
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase"
              >
                The Network
              </motion.p>
            </div>
          </div>

          {/* Minimalist Premium Loading Line */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-zinc-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{
                repeat: Infinity,
                duration: 1.4,
                ease: "easeInOut",
              }}
              className="absolute top-0 bottom-0 w-1/2 bg-zinc-900 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
