"use client";

import { useRouter } from "next/navigation";
import {
  Plus,
  ArrowUpRight,
  Sparkles,
  UserCheck,
  Eye,
  MessageSquare,
  FolderKanban,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const appRouter = useRouter();

  const stats = [
    {
      title: "Matches",
      value: "28",
      trend: "+12% this week",
      icon: UserCheck,
      isPrimary: true,
    },
    {
      title: "Profile Views",
      value: "1.4K",
      trend: "+18% this month",
      icon: Eye,
      isPrimary: false,
    },
    {
      title: "Messages",
      value: "63",
      trend: "4 unread",
      icon: MessageSquare,
      isPrimary: false,
    },
    {
      title: "Projects",
      value: "4",
      trend: "2 active",
      icon: FolderKanban,
      isPrimary: false,
    },
  ];

  const cofounders = [
    {
      name: "Aarav Sharma",
      role: "Full Stack Developer",
      tags: ["React", "Node.js", "AI"],
      initials: "AS",
    },
    {
      name: "Priya Kapoor",
      role: "Product Designer",
      tags: ["UI/UX", "Figma", "Design Systems"],
      initials: "PK",
    },
    {
      name: "Rohan Gupta",
      role: "Growth Marketer",
      tags: ["SEO", "GTM", "Analytics"],
      initials: "RG",
    },
  ];

  const activities = [
    { text: "You matched with Alex.", time: "2 hours ago" },
    { text: "Your profile reached 120 views.", time: "5 hours ago" },
    { text: "New founder joined your startup.", time: "1 day ago" },
    { text: "Pitch deck uploaded.", time: "2 days ago" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 sm:p-8 md:p-10 font-sans text-zinc-900">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Dashboard Overview
              </p>
            </div>
            <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Welcome back, Aditya 👋
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Here is what is happening across your founder ecosystem today.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-black hover:shadow-md active:scale-95">
            <Plus className="h-4 w-4" />
            <span>Create Post</span>
          </button>
        </header>

        {/* Stats Grid */}
        <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 ${
                  item.isPrimary
                    ? "bg-zinc-900 text-white shadow-xl shadow-zinc-900/10"
                    : "border border-zinc-200/80 bg-white shadow-sm hover:border-zinc-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-medium uppercase tracking-wider ${
                      item.isPrimary ? "text-zinc-400" : "text-zinc-500"
                    }`}
                  >
                    {item.title}
                  </span>
                  <div
                    className={`rounded-xl p-2.5 ${
                      item.isPrimary
                        ? "bg-zinc-800 text-white"
                        : "bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4 flex items-baseline justify-between">
                  <h2 className="text-4xl font-extrabold tracking-tight">
                    {item.value}
                  </h2>
                </div>

                <p
                  className={`mt-3 text-xs font-medium ${
                    item.isPrimary ? "text-zinc-400" : "text-zinc-500"
                  }`}
                >
                  {item.trend}
                </p>
              </div>
            );
          })}
        </section>

        {/* Main Grid */}
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recommended Co-founders */}
            <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-7 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold">Recommended Co-founders</h2>
                  <p className="text-xs text-zinc-500">
                    Handpicked matches based on your tech stack & vision
                  </p>
                </div>
                <button className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 transition hover:text-black">
                  <span>View All</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {cofounders.map((person) => (
                  <div
                    key={person.name}
                    className="group flex flex-col gap-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 transition-all hover:border-zinc-300 hover:bg-white hover:shadow-sm sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-sm font-bold text-white shadow-sm transition group-hover:scale-105">
                        {person.initials}
                      </div>

                      <div>
                        <h3 className="font-semibold text-zinc-900">
                          {person.name}
                        </h3>
                        <p className="text-xs text-zinc-500">{person.role}</p>

                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {person.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-zinc-200/60 px-2 py-0.5 text-[10px] font-medium text-zinc-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-800 transition hover:bg-zinc-900 hover:text-white sm:w-auto">
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-7 shadow-sm">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold">Recent Activity</h2>
                <Clock className="h-4 w-4 text-zinc-400" />
              </div>

              <div className="relative space-y-6 pl-2 before:absolute before:left-3.5 before:top-2 before:h-[calc(100%-16px)] before:w-0.5 before:bg-zinc-100">
                {activities.map((item, i) => (
                  <div key={i} className="relative flex items-center gap-4">
                    <div className="z-10 flex h-3 w-3 shrink-0 items-center justify-center rounded-full border-2 border-white bg-zinc-900 ring-4 ring-zinc-50" />
                    <div className="flex flex-1 items-center justify-between text-xs sm:text-sm">
                      <p className="font-medium text-zinc-700">{item.text}</p>
                      <span className="text-xs text-zinc-400">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Profile Card */}
            <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-8 text-center shadow-sm">
              <div className="relative mx-auto h-24 w-24">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-900 text-2xl font-bold text-white shadow-md">
                  AS
                </div>
                <div className="absolute bottom-0 right-0 rounded-full border-2 border-white bg-emerald-500 p-1.5 text-white">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
              </div>

              <h2 className="mt-4 text-xl font-bold">Aditya Semalti</h2>
              <p className="text-xs font-medium text-zinc-500">Tech Innovator</p>

              <button
                onClick={() => appRouter.push("/profile")}
                className="mt-6 w-full rounded-2xl bg-zinc-900 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-black hover:shadow active:scale-98"
              >
                Edit Profile
              </button>
            </section>

            {/* Profile Progress */}
            <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold">Profile Completion</h2>
                <span className="text-xs font-extrabold text-zinc-900">72%</span>
              </div>

              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-zinc-100">
                <div className="h-full w-[72%] rounded-full bg-zinc-900 transition-all duration-500" />
              </div>

              <p className="mt-3 text-xs text-zinc-500">
                Add a pitch deck to reach 100% completion.
              </p>
            </section>

            {/* AI Suggestion Card */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-6 text-white shadow-xl shadow-zinc-900/10">
              <div className="flex items-center gap-2 text-zinc-400">
                <Sparkles className="h-4 w-4 text-white" />
                <p className="text-[10px] font-bold uppercase tracking-[0.25em]">
                  AI Suggestion
                </p>
              </div>

              <h2 className="mt-3 text-lg font-bold leading-snug">
                Complete your founder bio.
              </h2>

              <p className="mt-2 text-xs leading-relaxed text-zinc-300">
                Profiles with a detailed bio receive{" "}
                <span className="font-semibold text-white">2.4x more</span> founder
                matches.
              </p>

              <button className="mt-5 w-full rounded-xl bg-white py-2.5 text-xs font-bold text-zinc-900 transition hover:bg-zinc-100 active:scale-98">
                Improve Profile
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}