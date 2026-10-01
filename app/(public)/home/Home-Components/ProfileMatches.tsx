"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

type Profile = {
  name: string;
  role: string;
  image: string;
  match: number;
  bio: string;
  tags: string[];
};
const profiles: Profile[] = [
  {
    name: "Arjun Mehta",
    role: "Product Builder",
    image: "https://i.pravatar.cc/300?img=12",
    match: 92,
    bio: "Building a fintech product and looking for someone who loves turning ideas into scalable products.",
    tags: ["Fintech", "Product", "Startups"],
  },
  {
    name: "Sarah Kapoor",
    role: "Growth & Marketing",
    image: "https://i.pravatar.cc/300?img=47",
    match: 87,
    bio: "Growth-focused marketer looking to build something meaningful with a technical co-founder.",
    tags: ["Growth", "Marketing", "SaaS"],
  },
];

export default function ProfileMatches() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
            Find your match
          </p>

          <h2 className="text-4xl font-semibold tracking-[-0.05em] text-black sm:text-5xl">
            People worth
            <span className="text-neutral-400"> building with.</span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-neutral-500 sm:text-base">
            Discover people who match your goals, interests and way of
            thinking.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -5 }}
              className="group rounded-[28px] border border-neutral-200 bg-[#eeeeee] p-4 sm:p-5"
            >
              {/* Top */}
              <div className="flex items-start justify-between">
                {/* Profile */}
                <div className="relative">
                  <div className="h-16 w-16 overflow-hidden rounded-[20px] bg-neutral-300 sm:h-20 sm:w-20">
                    <img
                      src={profile.image}
                      alt={profile.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Online */}
                  <span className="absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-[3px] border-[#eeeeee] bg-black" />
                </div>

                {/* Match */}
                <div className="rounded-full bg-black px-3.5 py-2 text-xs font-semibold text-white">
                  {profile.match}%
                </div>
              </div>

              {/* Info */}
              <div className="mt-5">
                <h3 className="text-xl font-semibold tracking-tight text-black">
                  {profile.name}
                </h3>

                <p className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-neutral-400">
                  {profile.role}
                </p>

                <p className="mt-4 max-w-lg text-sm leading-6 text-neutral-600">
                  {profile.bio}
                </p>
              </div>

              {/* Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {profile.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-[10px] font-medium text-neutral-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-2">
                <button className="flex h-11 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white text-xs font-semibold text-black transition-all duration-300 hover:border-black hover:bg-black hover:text-white">
                  View Profile
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>

                <button className="flex h-11 items-center justify-center gap-2 rounded-full bg-black text-xs font-semibold text-white transition-all duration-300 hover:bg-neutral-800 hover:scale-[1.02]">
                  <MessageCircle size={14} />
                  Send Ice Breaker
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}