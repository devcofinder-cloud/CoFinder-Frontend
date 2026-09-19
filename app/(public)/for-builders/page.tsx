"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  Palette,
  Rocket,
  Users,
  Lightbulb,
  Layers3,
  MessageCircle,
  Target,
  Sparkles,
  Check,
  Zap,
  BriefcaseBusiness,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BuilderType {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface BuildStep {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const builderTypes: BuilderType[] = [
  {
    icon: Code2,
    title: "Developers",
    description:
      "Find product thinkers, designers, marketers, and fellow engineers who can help turn your technical skills into something bigger.",
  },
  {
    icon: Palette,
    title: "Designers",
    description:
      "Meet builders who need your creative perspective to turn rough ideas into products people actually want to use.",
  },
  {
    icon: Lightbulb,
    title: "Idea Builders",
    description:
      "Have the vision but need the right people around you? Find the skills required to bring your idea to life.",
  },
  {
    icon: Rocket,
    title: "Startup Builders",
    description:
      "Already building something? Find people who can join the journey and help you move faster.",
  },
];

const buildSteps: BuildStep[] = [
  {
    number: "01",
    title: "Show what you build",
    description:
      "Create a profile that goes beyond a job title. Showcase your skills, experience, projects, interests, and what you're looking to build next.",
    icon: Layers3,
  },
  {
    number: "02",
    title: "Find complementary skills",
    description:
      "You don't need another version of yourself. Discover people whose strengths fill the gaps in your own skill set.",
    icon: Target,
  },
  {
    number: "03",
    title: "Start building together",
    description:
      "Connect, talk about ideas, share your vision, and find out whether there's something worth building together.",
    icon: MessageCircle,
  },
];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function ForBuildersPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-black">
      {/* HERO */}
      <section className="relative px-5 pb-28 pt-28 sm:px-8 lg:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-zinc-200/50 blur-[140px]" />

          <div className="absolute left-[8%] top-[35%] h-32 w-32 rounded-full border border-zinc-200 opacity-60" />

          <div className="absolute right-[8%] top-[25%] h-20 w-20 rounded-full border border-zinc-200 opacity-60" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            {/* LEFT */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-semibold tracking-wide text-zinc-600"
              >
                <Sparkles size={14} />
                FOR BUILDERS
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, delay: 0.1 }}
                className="max-w-4xl text-6xl font-semibold leading-[0.92] tracking-[-0.065em] sm:text-7xl lg:text-[6.8rem]"
              >
                Don't build
                <br />
                <span className="text-zinc-400">alone.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.2 }}
                className="mt-8 max-w-xl text-base leading-7 text-zinc-500 sm:text-lg"
              >
                You have the skills. You have the ideas. Now find the people who
                can help you turn them into something real.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Link
                  href="/register"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  Start building
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/explore"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 px-7 py-3.5 text-sm font-semibold transition hover:bg-zinc-50"
                >
                  Meet builders
                </Link>
              </motion.div>
            </div>

            {/* RIGHT BUILDER CARD */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative"
            >
              <div className="absolute -inset-5 rounded-[2.5rem] bg-zinc-100 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-[0_30px_100px_rgba(0,0,0,0.08)] sm:p-7">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                      AS
                    </div>

                    <div>
                      <p className="text-sm font-semibold">Builder Profile</p>
                      <p className="text-xs text-zinc-400">
                        Open to collaboration
                      </p>
                    </div>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-100">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                <div className="py-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
                    Building
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                    The next big thing.
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    Looking for ambitious people to build a product from zero to
                    one.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "Product", "SaaS"].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-7 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-zinc-50 p-4">
                    <p className="text-xs text-zinc-400">Looking for</p>
                    <p className="mt-2 text-sm font-semibold">
                      Product + Design
                    </p>
                  </div>

                  <div className="rounded-2xl bg-black p-4 text-white">
                    <p className="text-xs text-zinc-500">Status</p>
                    <p className="mt-2 text-sm font-semibold">
                      Actively building
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="border-y border-zinc-100 bg-zinc-50 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-5xl"
          >
            <p className="mb-7 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
              The builder mindset
            </p>

            <h2 className="text-4xl font-semibold leading-[1.05] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              Great products aren't built by
              <span className="text-zinc-400"> one skill.</span>
              <br />
              They're built by
              <span className="text-zinc-400">
                {" "}
                people who complement each other.
              </span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* BUILDER TYPES */}
      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16 max-w-2xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
              Who is this for?
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              If you build,
              <br />
              <span className="text-zinc-400">you belong here.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-4 md:grid-cols-2"
          >
            {builderTypes.map((builder: BuilderType, index: number) => {
              const Icon = builder.icon;

              return (
                <motion.div
                  key={builder.title}
                  variants={fadeUp}
                  className="group rounded-[1.75rem] border border-zinc-200 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-zinc-300 hover:bg-zinc-50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.05)] sm:p-9"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white transition-transform duration-500 group-hover:scale-110">
                      <Icon size={20} />
                    </div>

                    <span className="text-xs font-semibold text-zinc-300">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]">
                    {builder.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-7 text-zinc-500">
                    {builder.description}
                  </p>

                  <div className="mt-7 flex items-center gap-2 text-xs font-semibold text-zinc-400 transition-colors group-hover:text-black">
                    Find your people
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* BUILDING TOGETHER */}
      <section className="bg-black px-5 py-28 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                <Users size={20} />
              </div>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                Build together
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
                Find the missing
                <br />
                piece.
              </h2>

              <p className="mt-6 max-w-md leading-7 text-zinc-400">
                Your strongest advantage might not be another tool, another
                framework, or another late night. It might be the right person
                beside you.
              </p>

              <Link
                href="/explore"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Explore the network
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            <div className="space-y-5">
              {buildSteps.map((step: BuildStep, index: number) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.65,
                      delay: index * 0.1,
                    }}
                    className="group rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-zinc-700 sm:p-8"
                  >
                    <div className="flex gap-5 sm:gap-7">
                      <div className="shrink-0">
                        <span className="text-sm font-semibold text-zinc-600">
                          {step.number}
                        </span>

                        <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-zinc-300">
                          <Icon size={18} />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold tracking-[-0.02em]">
                          {step.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-zinc-500">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
                More than a profile
              </p>

              <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">
                Let people see
                <br />
                <span className="text-zinc-400">what you can build.</span>
              </h2>

              <p className="mt-6 max-w-lg leading-7 text-zinc-500">
                Your profile isn't just a digital resume. It's your builder
                identity — the skills you bring, the things you've built, and
                the direction you're heading.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  "Showcase your projects",
                  "Highlight your strongest skills",
                  "Share what you're currently building",
                  "Tell people what you're looking for",
                ].map((item: string) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-zinc-700"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100">
                      <Check size={13} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-5 sm:p-7">
                <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
                      <Code2 size={22} />
                    </div>

                    <div>
                      <p className="font-semibold">Builder identity</p>
                      <p className="mt-1 text-xs text-zinc-400">
                        What you bring to the table
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {[
                      ["Skills", "12"],
                      ["Projects", "06"],
                      ["Connections", "48"],
                      ["Ideas", "09"],
                    ].map((item) => (
                      <div key={item[0]} className="rounded-2xl bg-zinc-50 p-4">
                        <p className="text-xs text-zinc-400">{item[0]}</p>

                        <p className="mt-2 text-2xl font-semibold tracking-tight">
                          {item[1]}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-2xl bg-black p-5 text-white">
                    <div className="flex items-center gap-3">
                      <BriefcaseBusiness size={17} />
                      <p className="text-sm font-semibold">
                        Currently building
                      </p>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-zinc-400">
                      Looking for a product-minded designer and growth
                      collaborator.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-14 sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-zinc-100 px-6 py-20 text-center sm:px-12 sm:py-24"
        >
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[500px] -translate-x-1/2 rounded-full bg-white blur-3xl" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
              <Zap size={20} />
            </div>

            <h2 className="mx-auto mt-7 max-w-4xl text-4xl font-semibold leading-[1] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Stop looking for
              <br />
              <span className="text-zinc-400">the perfect time.</span>
              <br />
              Find the right people.
            </h2>

            <p className="mx-auto mt-6 max-w-xl leading-7 text-zinc-500">
              Create your builder profile and start meeting people who are ready
              to turn ideas into reality.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/register"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Join Co-Finder
                <ArrowRight
                  size={17}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/explore"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-7 py-3.5 text-sm font-semibold transition hover:bg-zinc-50"
              >
                Explore builders
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
