"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  UserPlus,
  Search,
  MessageCircle,
  Handshake,
  Rocket,
  ArrowRight,
  Check,
  Sparkles,
  Target,
  Users,
  ShieldCheck,
  Zap,
  LucideIcon,
} from "lucide-react";

interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
}

interface Benefit {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface FlowItem {
  number: string;
  title: string;
  icon: LucideIcon;
}

const steps: Step[] = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create your profile",
    description:
      "Tell the network who you are, what you do, what you're building, and the kind of people you want to meet.",
    points: [
      "Build your professional profile",
      "Add your skills & experience",
      "Share your interests and goals",
    ],
  },
  {
    number: "02",
    icon: Target,
    title: "Define what you're looking for",
    description:
      "Set your founder preferences and tell us what kind of co-founder, collaborator, or teammate you're looking for.",
    points: [
      "Choose your ideal collaboration",
      "Define skills you need",
      "Share your project vision",
    ],
  },
  {
    number: "03",
    icon: Search,
    title: "Discover the right people",
    description:
      "Explore people based on skills, experience, interests, goals, and compatibility.",
    points: [
      "Discover relevant profiles",
      "Explore similar founders",
      "Find people aligned with your vision",
    ],
  },
  {
    number: "04",
    icon: MessageCircle,
    title: "Start a conversation",
    description:
      "Found someone interesting? Connect with them and start a conversation without the awkward cold approach.",
    points: [
      "Send connection requests",
      "Chat in real time",
      "Discuss ideas and opportunities",
    ],
  },
  {
    number: "05",
    icon: Handshake,
    title: "Build something together",
    description:
      "Move beyond profiles and conversations. Turn the right connection into a real collaboration.",
    points: [
      "Validate your ideas together",
      "Work on projects",
      "Build long-term partnerships",
    ],
  },
];

const flowItems: FlowItem[] = [
  {
    number: "01",
    title: "Create",
    icon: UserPlus,
  },
  {
    number: "02",
    title: "Discover",
    icon: Search,
  },
  {
    number: "03",
    title: "Connect",
    icon: MessageCircle,
  },
  {
    number: "04",
    title: "Build",
    icon: Rocket,
  },
];

const benefits: Benefit[] = [
  {
    icon: Users,
    title: "Built around people",
    text: "Find people based on who they are and what they want to build.",
  },
  {
    icon: Zap,
    title: "Less searching",
    text: "Spend less time looking through random profiles and more time connecting.",
  },
  {
    icon: ShieldCheck,
    title: "Meaningful connections",
    text: "Profiles give you context before you start a conversation.",
  },
];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
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

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-black">
      {/* HERO */}
      <section className="relative px-5 pb-24 pt-28 sm:px-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-zinc-200/50 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-2 text-xs font-semibold tracking-wide text-zinc-600"
          >
            <Sparkles size={14} />
            FOUNDING PROTOCOL
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mx-auto max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl lg:text-8xl"
          >
            Find the right people.
            <br />
            <span className="text-zinc-400">Build together.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mx-auto mt-8 max-w-2xl text-base leading-7 text-zinc-500 sm:text-lg"
          >
            Co-Finder helps you discover people who match your skills,
            ambitions, and ideas — so you can spend less time searching and more
            time building.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <Link
              href="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
            >
              Create your profile
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-7 py-3.5 text-sm font-semibold transition hover:bg-zinc-50"
            >
              Explore founders
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SIMPLE FLOW */}
      <section className="px-5 pb-24 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 lg:grid-cols-4"
        >
          {flowItems.map((item: FlowItem) => {
            const Icon = item.icon;

            return (
              <motion.div
                variants={fadeUp}
                key={item.number}
                className="group bg-white p-6 transition-colors hover:bg-zinc-50 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-400">
                    {item.number}
                  </span>

                  <Icon
                    size={20}
                    className="text-zinc-400 transition-colors group-hover:text-black"
                  />
                </div>

                <p className="mt-10 text-lg font-semibold">{item.title}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* STEPS */}
      <section className="border-y border-zinc-100 bg-zinc-50 px-5 py-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-20 max-w-2xl"
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
              How it works
            </p>

            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              From profile to
              <span className="text-zinc-400"> partnership.</span>
            </h2>

            <p className="mt-5 leading-7 text-zinc-500">
              A simple process designed to help you find people worth building
              with.
            </p>
          </motion.div>

          <div className="space-y-5">
            {steps.map((step: Step, index: number) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.65,
                    delay: index * 0.05,
                  }}
                  className="group relative rounded-3xl border border-zinc-200 bg-white p-6 transition-all duration-500 hover:border-zinc-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-9 lg:p-10"
                >
                  <div className="grid gap-7 lg:grid-cols-[120px_1fr_1fr] lg:gap-12">
                    <div className="flex items-center justify-between lg:flex-col lg:items-start">
                      <span className="text-5xl font-semibold tracking-[-0.06em] text-zinc-200 transition-colors group-hover:text-zinc-300 sm:text-6xl">
                        {step.number}
                      </span>

                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black text-white transition-transform duration-500 group-hover:scale-110">
                        <Icon size={19} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                        {step.title}
                      </h3>

                      <p className="mt-4 max-w-xl leading-7 text-zinc-500">
                        {step.description}
                      </p>
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                      {step.points.map((point: string) => (
                        <div
                          key={point}
                          className="flex items-center gap-3 text-sm text-zinc-600"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-100">
                            <Check size={13} />
                          </span>

                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DISCOVERY VISUAL */}
      <section className="px-5 py-28 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-black text-white">
            <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-zinc-700/20 blur-[100px]" />

            <div className="relative grid items-center gap-14 p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="mb-7 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black">
                  <Search size={19} />
                </div>

                <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
                  Discover differently
                </p>

                <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
                  Your next great
                  <br />
                  connection is out there.
                </h2>

                <p className="mt-6 max-w-lg leading-7 text-zinc-400">
                  Explore a network of founders, builders, designers,
                  developers, marketers, and ambitious people looking for the
                  right person to build with.
                </p>

                <Link
                  href="/explore"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  Start exploring
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-4 shadow-2xl sm:p-5">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div>
                      <p className="text-sm font-semibold">Recommended</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        People aligned with you
                      </p>
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900">
                      <Sparkles size={14} className="text-zinc-400" />
                    </div>
                  </div>

                  {[
                    ["AR", "Alex Rivera", "Product · SaaS"],
                    ["SM", "Sam Morgan", "Engineering · AI"],
                    ["JK", "Jordan Kim", "Design · Startup"],
                  ].map(([initials, name, role], index) => (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, x: 15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.35 + index * 0.12,
                        duration: 0.5,
                      }}
                      className="flex items-center gap-4 border-b border-zinc-900 py-4 last:border-0"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800 text-xs font-semibold">
                        {initials}
                      </div>

                      <div className="flex-1">
                        <p className="text-sm font-medium">{name}</p>
                        <p className="mt-1 text-xs text-zinc-500">{role}</p>
                      </div>

                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-800">
                        <ArrowRight size={13} className="text-zinc-500" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="px-5 pb-28 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
              Why Co-Finder
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
              Built for people who
              <span className="text-zinc-400"> build.</span>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-5 md:grid-cols-3"
          >
            {benefits.map((item: Benefit) => {
              const Icon = item.icon;

              return (
                <motion.div
                  variants={fadeUp}
                  key={item.title}
                  className="rounded-3xl border border-zinc-200 p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-50 sm:p-8"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100">
                    <Icon size={19} />
                  </div>

                  <h3 className="mt-7 text-xl font-semibold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-500">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-12 sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-6xl rounded-[2rem] border border-zinc-200 bg-zinc-100 px-6 py-16 text-center sm:px-12 sm:py-20"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
            <Rocket size={20} />
          </div>

          <h2 className="mt-7 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
            Ready to find your people?
          </h2>

          <p className="mx-auto mt-5 max-w-xl leading-7 text-zinc-500">
            Create your profile, explore the network, and start building
            connections that can turn ideas into something real.
          </p>

          <Link
            href="/register"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Join Co-Finder
            <ArrowRight
              size={17}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
