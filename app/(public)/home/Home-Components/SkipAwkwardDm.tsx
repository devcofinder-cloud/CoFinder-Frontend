"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowUp,
  CheckCheck,
  MoreHorizontal,
  Paperclip,
  Phone,
  Video,
} from "lucide-react";

const messages = [
  {
    id: 1,
    text: "Hey! I saw your profile 👋",
    sender: "them",
    time: "10:41 AM",
  },
  {
    id: 2,
    text: "Hey, thanks!",
    sender: "me",
    time: "10:42 AM",
  },
  {
    id: 3,
    text: "What are you working on these days?",
    sender: "them",
    time: "10:42 AM",
  },
  {
    id: 4,
    text: "Actually, I'm building a marketplace for creators.",
    sender: "me",
    time: "10:43 AM",
  },
  {
    id: 5,
    text: "That's exactly the kind of thing I'd love to work on.",
    sender: "them",
    time: "10:43 AM",
  },
];

export default function SkipAwkwardDM() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
      {/* Background details */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-neutral-100/70 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-400">
            Start with context
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-black sm:text-5xl lg:text-6xl">
            Skip the awkward DM.
            <br />
            <span className="text-neutral-400">
              Start with something real.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base">
            No “hey”, no cold pitches, no wondering what to say next.
            CoFinder gives you a reason to connect before you ever send
            the first message.
          </p>
        </motion.div>

        {/* Chat */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-14 max-w-[430px] sm:mt-16"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-neutral-200 bg-[#f5f5f5] shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
            {/* Top bar */}
            <div className="flex h-[76px] items-center justify-between border-b border-neutral-200 bg-white px-5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                    AR
                  </div>

                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-black" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-black">
                    Alex Rodriguez
                  </p>
                  <p className="mt-0.5 text-[11px] text-neutral-400">
                    Online · Building in public
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-neutral-400">
                <button className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-neutral-100 hover:text-black">
                  <Phone size={16} />
                </button>

                <button className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-neutral-100 hover:text-black">
                  <Video size={17} />
                </button>

                <button className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-neutral-100 hover:text-black">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>

            {/* Match context */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="border-b border-neutral-200 bg-white px-5 py-4"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-black px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-white">
                  Matched
                </span>

                <span className="text-[11px] text-neutral-400">
                  Shared interest
                </span>
              </div>

              <p className="mt-2 text-xs font-medium leading-5 text-neutral-700">
                Both looking for a technical co-founder for a creator
                marketplace.
              </p>
            </motion.div>

            {/* Chat area */}
            <div className="space-y-3 px-4 py-5 sm:px-5">
              <div className="mb-5 text-center">
                <span className="rounded-full bg-white px-3 py-1.5 text-[10px] font-medium text-neutral-400 shadow-sm">
                  Today
                </span>
              </div>

              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{
                    opacity: 0,
                    x: message.sender === "me" ? 25 : -25,
                    y: 8,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.55 + index * 0.13,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`flex ${
                    message.sender === "me"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[78%] ${
                      message.sender === "me"
                        ? "items-end"
                        : "items-start"
                    }`}
                  >
                    <div
                      className={`rounded-[18px] px-4 py-3 text-[12px] leading-5 ${
                        message.sender === "me"
                          ? "rounded-br-[5px] bg-black text-white"
                          : "rounded-bl-[5px] border border-neutral-200 bg-white text-neutral-700"
                      }`}
                    >
                      {message.text}
                    </div>

                    <div
                      className={`mt-1 flex items-center gap-1 px-1 text-[9px] text-neutral-400 ${
                        message.sender === "me"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.time}

                      {message.sender === "me" && (
                        <CheckCheck size={11} />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.4 }}
                className="flex items-center gap-2 pt-1"
              >
                <div className="rounded-[16px] rounded-bl-[5px] border border-neutral-200 bg-white px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        animate={{
                          y: [0, -3, 0],
                          opacity: [0.35, 1, 0.35],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: dot * 0.15,
                        }}
                        className="h-1.5 w-1.5 rounded-full bg-neutral-400"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Input */}
            <div className="border-t border-neutral-200 bg-white p-4">
              <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-[#f7f7f7] p-1.5 pl-4">
                <span className="flex-1 text-xs text-neutral-400">
                  Write a message...
                </span>

                <button className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition hover:text-black">
                  <Paperclip size={15} />
                </button>

                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:scale-105">
                  <ArrowUp size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-2"
        >
          {[
            "Shared context",
            "Intent-first",
            "No cold pitch",
            "Built to connect",
          ].map((item, index) => (
            <motion.span
              key={item}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-[10px] font-medium text-neutral-500 shadow-sm sm:text-xs"
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}