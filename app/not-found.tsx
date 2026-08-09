"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-zinc-900 flex items-center justify-center px-6 py-12 antialiased">
      {/* Grid Background */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
          bg-[size:3rem_3rem]
          [mask-image:radial-gradient(ellipse_70%_65%_at_50%_50%,#000_55%,transparent_100%)]
          pointer-events-none
        "
      />

      {/* Decorative Blur */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="
          absolute
          left-1/2
          top-1/2
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-zinc-100
          blur-3xl
          opacity-60
          pointer-events-none
        "
      />

      {/* Main */}
      <div className="relative z-10 w-full max-w-3xl">
        {/* Top Label */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between border-b border-zinc-200 pb-5"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-3 w-3 rounded-full bg-black" />

            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-zinc-800">
              Co-Finder
            </span>
          </div>

          <span className="rounded-full border border-zinc-300 bg-white px-3 py-1 text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-500">
            Error 404
          </span>
        </motion.div>

        {/* Content */}
        <div className="py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            {/* 404 */}
            <div className="relative select-none">
              <h1
                className="
                  text-[clamp(7rem,25vw,15rem)]
                  font-black
                  leading-[0.75]
                  tracking-[-0.08em]
                  text-black
                "
              >
                404
              </h1>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 3 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="
                  absolute
                  right-[5%]
                  top-[10%]
                  hidden
                  md:block
                  rounded-full
                  border-2
                  border-black
                  bg-white
                  px-5
                  py-2
                  text-xs
                  font-mono
                  font-bold
                  uppercase
                  tracking-widest
                  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
                "
              >
                Lost Route
              </motion.div>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-12 h-px origin-left bg-zinc-200"
          />

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-8 max-w-xl"
          >
            <p className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.25em] text-zinc-400">
              Page Not Found
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
              Looks like you've taken a wrong turn.
            </h2>

            <p className="mt-4 text-sm leading-7 text-zinc-500 md:text-base">
              The page you're looking for doesn't exist, has been moved,
              or the link you followed is no longer available.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-black
                px-6
                py-4
                text-sm
                font-semibold
                text-white
                shadow-[4px_4px_0px_0px_rgba(161,161,170,1)]
                transition-all
                hover:-translate-y-0.5
                hover:bg-zinc-800
                hover:shadow-[6px_6px_0px_0px_rgba(161,161,170,1)]
                active:translate-y-0
              "
            >
              <ArrowLeft
                size={17}
                className="transition-transform duration-200 group-hover:-translate-x-1"
              />

              Back to Home
            </Link>

            {/* <Link
              href="/dashboard"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border-2
                border-black
                bg-white
                px-6
                py-4
                text-sm
                font-semibold
                text-black
                transition-all
                hover:-translate-y-0.5
                hover:bg-zinc-50
                active:translate-y-0
              "
            >
              

              <ArrowUpRight
                size={17}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link> */}
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="
            flex
            items-center
            justify-between
            border-t
            border-zinc-200
            pt-5
            text-[10px]
            font-mono
            uppercase
            tracking-[0.2em]
            text-zinc-400
          "
        >
          <span>Co-Founder Discovery Platform</span>

          <span>404 / Not Found</span>
        </motion.div>
      </div>
    </main>
  );
}