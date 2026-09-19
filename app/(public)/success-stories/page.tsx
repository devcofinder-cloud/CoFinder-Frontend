
"use client"

import React from "react"
import { motion, type Variants } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Quote,
  Sparkles,
  Users,
  Rocket,
  Layers3,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface Story {
  name: string
  role: string
  company: string
  initials: string
  story: string
  result: string
  tag: string
}

const stories: Story[] = [
  {
    name: "Arjun Mehta",
    role: "Founder",
    company: "BuildFlow",
    initials: "AM",
    story:
      "I had the product idea and technical vision, but needed someone who could own the growth side. Co-Finder helped me find that missing piece.",
    result: "Built a 3-person founding team",
    tag: "Founder Match",
  },
  {
    name: "Riya Sharma",
    role: "Product Designer",
    company: "Independent Builder",
    initials: "RS",
    story:
      "Instead of endlessly networking, I found builders who were actually working on things I cared about. One conversation turned into a real product.",
    result: "Joined a startup as founding designer",
    tag: "Builder Match",
  },
  {
    name: "Kabir Kapoor",
    role: "Developer",
    company: "Tech Founder",
    initials: "KK",
    story:
      "Co-Finder made finding the right people feel much more intentional. I connected with someone whose skills complemented mine instead of duplicated them.",
    result: "Launched first MVP together",
    tag: "Collaboration",
  },
]

const stats = [
  {
    value: "1.2K+",
    label: "Builders",
    icon: Users,
  },
  {
    value: "340+",
    label: "Connections",
    icon: Layers3,
  },
  {
    value: "85+",
    label: "Projects Started",
    icon: Rocket,
  },
]

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}





const SuccessStories = () => {
  const router = useRouter()

  return (
    <main className="min-h-screen bg-white text-slate-900 overflow-hidden">

      <section className="relative px-5 pt-10 pb-16 sm:px-8 sm:pt-16 md:px-12 md:pt-24 lg:pt-28">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-slate-100/80 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex items-center justify-center gap-2"
          >
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              <Sparkles className="w-3.5 h-3.5" />
              Success Stories
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-7 text-center text-[42px] leading-[0.98] tracking-[-0.045em] font-semibold sm:text-6xl md:text-7xl"
          >
            Real people.
            <br />
            <span className="text-slate-400">Real things built.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.6,
            }}
            className="mt-6 max-w-xl mx-auto text-center text-[15px] leading-7 text-slate-500 sm:text-base"
          >
            Ideas become much more powerful when the right people
            come together. See how builders are turning connections
            into actual products and teams.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={() => router.push("/register")}
              className="group flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition-all hover:scale-[1.03] active:scale-95"
            >
              Start your story
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>

      <section className="px-5 pb-16 sm:px-8 md:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-5xl mx-auto grid grid-cols-3 gap-2 sm:gap-4"
        >
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <motion.div
                key={stat.label}
                variants={item}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-center sm:rounded-3xl sm:p-6"
              >
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 sm:h-10 sm:w-10">
                  <Icon className="w-4 h-4 text-slate-700" />
                </div>

                <p className="mt-3 text-xl font-semibold tracking-tight sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-[10px] leading-4 text-slate-400 sm:text-xs">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-20 md:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              From the community
            </p>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
              The right connection can change what you build.
            </h2>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-10 grid gap-4 md:grid-cols-3"
          >
            {stories.map((story) => (
              <motion.article
                key={story.name}
                variants={item}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.25 },
                }}
                className="group rounded-[26px] border border-white/10 bg-white/[0.045] p-5 sm:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-slate-400">
                    {story.tag}
                  </span>

                  <ArrowUpRight className="w-4 h-4 text-slate-600 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                </div>

                <Quote className="mt-7 w-7 h-7 text-slate-600" />

                <p className="mt-4 text-[14px] leading-6 text-slate-300">
                  "{story.story}"
                </p>

                <div className="mt-7 border-t border-white/10 pt-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-bold text-slate-900">
                      {story.initials}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        {story.name}
                      </p>

                      <p className="text-[11px] text-slate-500">
                        {story.role} · {story.company}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-white/[0.05] px-3 py-2.5">
                    <p className="text-[11px] text-slate-500">
                      Outcome
                    </p>

                    <p className="mt-1 text-xs font-medium text-slate-200">
                      {story.result}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="px-5 py-16 sm:px-8 sm:py-24 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid items-center gap-10 md:grid-cols-2">

            <motion.div
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                It starts with one conversation
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Your next chapter could start with the right person.
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
                You don't need hundreds of connections. You need a few
                people who understand what you're trying to build and
                bring something meaningful to the table.
              </p>

              <button
                onClick={() => router.push("/explore")}
                className="group mt-7 flex items-center gap-2 text-sm font-semibold text-slate-900"
              >
                Explore the network
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div className="rounded-[30px] bg-slate-950 p-6 shadow-2xl sm:p-8">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
                      Founding Protocol
                    </p>

                    <p className="mt-2 text-lg font-semibold text-white">
                      Active Matchmaking
                    </p>
                  </div>

                  <div className="h-3 w-3 rounded-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]" />
                </div>

                <div className="mt-8 space-y-3">
                  {[
                    ["Your Idea", "Product"],
                    ["Your Strength", "Engineering"],
                    ["Missing Piece", "Growth"],
                  ].map(([label, value], index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.15 + index * 0.1,
                        duration: 0.4,
                      }}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5"
                    >
                      <span className="text-xs text-slate-500">
                        {label}
                      </span>

                      <span className="text-xs font-medium text-white">
                        {value}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3">
                  <div className="flex -space-x-2">
                    {["AK", "RS", "KM"].map((initials) => (
                      <div
                        key={initials}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-900 text-[9px] font-bold text-white"
                      >
                        {initials}
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-[11px] font-semibold text-slate-900">
                      New connection found
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Strong skill complement
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-5xl overflow-hidden rounded-[30px] bg-slate-100 px-6 py-12 text-center sm:rounded-[40px] sm:px-10 sm:py-16"
        >
          <div className="absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-white blur-3xl" />

          <div className="relative">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Your story is next
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Stop building alone.
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate-500">
              Find people who bring the skills, energy and perspective
              your idea needs.
            </p>

            <button
              onClick={() => router.push("/register")}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-slate-900/10 transition-all hover:scale-[1.03] active:scale-95"
            >
              Create your profile
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </section>

    </main>
  )
}

export default SuccessStories
