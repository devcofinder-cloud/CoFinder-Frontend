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
import { authStore } from "@/app/store/authStore";

export default function DashboardPage() {
  const appRouter = useRouter();

  const user = authStore((state) => state.user);

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
    {
      id: 1,
      type: "connection",
      title: "Rahul Sharma accepted your request",
      description: "You can now start a conversation with Rahul.",
      time: "2 hours ago",
      avatar: "RS",
      unread: true,
    },
    {
      id: 2,
      type: "request",
      title: "Priya Singh sent you a connection request",
      description: "Product Designer · Bangalore, India",
      time: "4 hours ago",
      avatar: "PS",
      unread: true,
    },
    {
      id: 3,
      type: "match",
      title: "You have a new potential match",
      description: "Arjun Mehta · Full Stack Developer",
      time: "5 hours ago",
      avatar: "AM",
      match: "94% Match",
      unread: true,
    },
    {
      id: 4,
      type: "message",
      title: "Ananya Verma sent you a message",
      description: `"Hey, I'd love to discuss the idea with you."`,
      time: "Yesterday",
      avatar: "AV",
      unread: false,
    },
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
              Welcome back, {user?.name}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Here is what is happening across your founder ecosystem today.
            </p>
          </div>

          <button
          onClick={()=>appRouter.push('/create-post')}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-black hover:shadow-md active:scale-95">
            {/* <Plus className="h-4 w-4" /> */}
            <span>My Posts</span>
          </button>
        </header>
        {/* Profile Progress--- hidden in desktop screen  */}
        <div className="mt-4 block sm:hidden  rounded-2xl border border-zinc-200 bg-white p-4">
          {/* Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-zinc-900" />
              </span>

              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                Profile Incomplete
              </span>
            </div>

            <span className="text-sm font-bold tracking-tight text-zinc-900">
              {user?.completionStatus || 0}%
            </span>
          </div>

          {/* Progress */}
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-zinc-900 transition-all duration-700 ease-out"
              style={{ width: "72%" }}
            />
          </div>

          {/* Bottom */}
          <div className="mt-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs leading-relaxed text-zinc-500">
                Complete your profile to unlock{" "}
                <span className="font-medium text-zinc-800">
                  better matches.
                </span>
              </p>

              <p className="mt-1 text-[11px] font-medium text-zinc-400">
                25% remaining
              </p>
            </div>

            <button
              onClick={() => appRouter.push("/questionnair")}
              className="
        shrink-0 rounded-xl
        border border-zinc-900
        bg-zinc-900
        px-4 py-2.5
        text-xs font-semibold text-white
        transition-all duration-200
        hover:-translate-y-0.5
        hover:bg-zinc-800
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]
        active:translate-y-0 cursor-pointer hover:scale-105 
      "
            >
              Complete Profile
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <section className="grid gap-5 grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`relative overflow-hidden rounded-3xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 ${
                  item.isPrimary
                    ? "bg-zinc-900 text-white shadow-xl shadow-zinc-900/10"
                    : "border border-zinc-200/80 bg-white shadow-sm hover:border-zinc-300 hover:shadow-md"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-medium uppercase tracking-wider sm:text-xs ${
                      item.isPrimary ? "text-zinc-400" : "text-zinc-500"
                    }`}
                  >
                    {item.title}
                  </span>

                  <div
                    className={`shrink-0 rounded-lg p-2 sm:rounded-xl sm:p-2.5 ${
                      item.isPrimary
                        ? "bg-zinc-800 text-white"
                        : "bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>

                <div className="mt-3 flex items-baseline justify-between sm:mt-4">
                  <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                    {item.value}
                  </h2>
                </div>

                <p
                  className={`mt-2 text-[10px] font-medium sm:mt-3 sm:text-xs ${
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
            {/* Recent Activity */}
            <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm sm:rounded-3xl sm:p-6 lg:p-7">
              {/* ================= HEADER ================= */}
              <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6 sm:items-center">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold tracking-tight text-zinc-900 sm:text-lg">
                      Recent Activity
                    </h2>

                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[9px] font-bold text-zinc-500">
                      4
                    </span>
                  </div>

                  <p className="mt-1 text-[11px] leading-4 text-zinc-500 sm:text-xs">
                    Latest updates from your founder network
                  </p>
                </div>

                <button
                  onClick={() => appRouter.push("/activity")}
                  className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-semibold text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 sm:text-xs"
                >
                  <span>View all</span>
                  <ArrowUpRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 hidden sm:block" />
                </button>
              </div>

              {/* ================= ACTIVITIES ================= */}
              <div className="space-y-1">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`group relative flex gap-3 rounded-xl p-3 transition-all sm:gap-4 sm:p-4 ${
                      activity.unread ? "bg-zinc-50" : "hover:bg-zinc-50/70"
                    }`}
                  >
                    {/* Unread indicator */}
                    {activity.unread && (
                      <span className="absolute left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-zinc-950 sm:left-1.5" />
                    )}

                    {/* ================= AVATAR ================= */}
                    <div className="relative shrink-0">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-[10px] font-bold sm:h-11 sm:w-11 sm:text-xs ${
                          activity.unread
                            ? "bg-zinc-900 text-white"
                            : "bg-zinc-100 text-zinc-700"
                        }`}
                      >
                        {activity.avatar}
                      </div>

                      {/* Activity type icon */}
                      <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-zinc-900 text-white shadow-sm">
                        {activity.type === "connection" && (
                          <UserCheck className="h-2.5 w-2.5" />
                        )}

                        {activity.type === "request" && (
                          <UserCheck className="h-2.5 w-2.5" />
                        )}

                        {activity.type === "match" && (
                          <Sparkles className="h-2.5 w-2.5" />
                        )}

                        {activity.type === "message" && (
                          <MessageSquare className="h-2.5 w-2.5" />
                        )}
                      </div>
                    </div>

                    {/* ================= CONTENT ================= */}
                    <div className="min-w-0 flex-1">
                      {/* Title + Time */}
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className={`min-w-0 text-xs leading-5 sm:text-sm ${
                            activity.unread
                              ? "font-bold text-zinc-950"
                              : "font-semibold text-zinc-800"
                          }`}
                        >
                          {activity.title}
                        </h3>

                        <span className="shrink-0 pt-0.5 text-[9px] font-medium text-zinc-400 sm:text-[10px]">
                          {activity.time}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mt-1 line-clamp-2 text-[10px] leading-4 text-zinc-500 sm:text-xs sm:leading-5">
                        {activity.description}
                      </p>

                      {/* Match */}
                      {activity.match && (
                        <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[9px] font-bold text-zinc-600 shadow-sm">
                          <Sparkles className="h-2.5 w-2.5" />
                          {activity.match}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* ================= FOOTER ================= */}
              <div className="mt-4 border-t border-zinc-100 pt-4 sm:mt-5 sm:pt-5">
                <button
                  onClick={() => appRouter.push("/activity")}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 py-3 text-[10px] font-bold text-zinc-600 transition-all hover:border-zinc-300 hover:bg-zinc-900 hover:text-white active:scale-[0.98] sm:text-xs"
                >
                  View all activity
                  <ArrowUpRight className="h-3.5 w-3.5 hidden sm:block" />
                </button>
              </div>
            </section>

            {/* Recommended Co-founders */}
            <section className="rounded-3xl border border-zinc-200/80 bg-white p-6 sm:p-7 shadow-sm">
              <div className="mb-6 flex  justify-between">
                <div className="w-1/2">
                  <h2 className="text-lg font-bold">Recommended Co-founders</h2>
                  <p className="text-xs text-zinc-500">
                    Handpicked matches based on your tech stack & vision
                  </p>
                </div>
                <button className="flex  gap-1   text-xs font-semibold text-zinc-600 transition hover:text-black">
                  <span>View All</span>
                  <ArrowUpRight className="h-3.5 w-3.5 hidden sm:block" />
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
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Profile Progress--- hidden in mobile screen  */}
            <div className="mt-4  hidden sm:block rounded-2xl border border-zinc-200 bg-white p-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-400 opacity-40" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-zinc-900" />
                  </span>

                  <span className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                    Profile Incomplete
                  </span>
                </div>

                <span className="text-sm font-bold tracking-tight text-zinc-900">
                  {user?.completionStatus || 0}%
                </span>
              </div>

              {/* Progress */}
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full rounded-full bg-zinc-900 transition-all duration-700 ease-out"
                  style={{ width: "72%" }}
                />
              </div>

              {/* Bottom */}
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs leading-relaxed text-zinc-500">
                    Complete your profile to unlock{" "}
                    <span className="font-medium text-zinc-800">
                      better matches.
                    </span>
                  </p>

                  <p className="mt-1 text-[11px] font-medium text-zinc-400">
                    28% remaining
                  </p>
                </div>

                <button
                  onClick={() => appRouter.push("/questionnair")}
                  className="
        shrink-0 rounded-xl
        border border-zinc-900
        bg-zinc-900
        px-4 py-2.5
        text-xs font-semibold text-white
        transition-all duration-200
        hover:-translate-y-0.5
        hover:bg-zinc-800
        hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]
        active:translate-y-0 cursor-pointer hover:scale-105 
      "
                >
                  Complete Profile
                </button>
              </div>
            </div>
            {/* AI Suggestion Card */}
            <section className="relative overflow-hidden mb-20 sm:mb-0 rounded-3xl bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-6 text-white shadow-xl shadow-zinc-900/10">
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
                <span className="font-semibold text-white">2.4x more</span>{" "}
                founder matches.
              </p>

              <button
                onClick={() => appRouter.push("/profile")}
                className="mt-5 w-full cursor-pointer rounded-xl bg-white py-2.5 text-xs font-bold text-zinc-900 transition hover:bg-zinc-100 active:scale-98"
              >
                Improve Profile
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
