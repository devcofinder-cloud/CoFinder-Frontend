
"use client";

import { useEffect } from "react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { dashboardStore } from "@/app/store/dashboardStore";

const SameArchetype = () => {
  const {
    sameArchetypeUsers,
    loadingSameArchetypeUsers,
    fetchSameArchetypeUsers,
  } = dashboardStore();

  useEffect(() => {
    fetchSameArchetypeUsers(10);
  }, [fetchSameArchetypeUsers]);

  if (loadingSameArchetypeUsers) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
        <div className="mb-4">
          <div className="h-5 w-40 animate-pulse rounded bg-zinc-200" />
          <div className="mt-2 h-3 w-56 animate-pulse rounded bg-zinc-100" />
        </div>

        {/* Mobile skeleton */}
        <div className="space-y-2 sm:hidden">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-xl border border-zinc-100 p-3"
            >
              <div className="h-11 w-11 shrink-0 animate-pulse rounded-full bg-zinc-200" />

              <div className="min-w-0 flex-1">
                <div className="h-3.5 w-28 animate-pulse rounded bg-zinc-200" />
                <div className="mt-2 h-3 w-36 animate-pulse rounded bg-zinc-100" />
              </div>

              <div className="h-8 w-20 animate-pulse rounded-lg bg-zinc-100" />
            </div>
          ))}
        </div>

        {/* Desktop skeleton */}
        <div className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-zinc-100 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 animate-pulse rounded-full bg-zinc-200" />

                <div className="flex-1">
                  <div className="h-4 w-28 animate-pulse rounded bg-zinc-200" />
                  <div className="mt-2 h-3 w-20 animate-pulse rounded bg-zinc-100" />
                </div>
              </div>

              <div className="mt-4 h-8 animate-pulse rounded-lg bg-zinc-100" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!sameArchetypeUsers?.length) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100">
            <Sparkles className="h-5 w-5 text-zinc-600" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-zinc-900">
              Same Archetype
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              No matching founders found right now.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-zinc-700" />

            <h2 className="text-sm font-semibold text-zinc-900 sm:text-base">
              Same Archetype
            </h2>
          </div>

          <p className="mt-1 text-xs text-zinc-500">
            Founders with a similar mindset
          </p>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center gap-1 text-xs font-medium text-zinc-600 transition hover:text-black"
        >
          View all
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* ================= MOBILE LIST ================= */}
      <div className="space-y-2 sm:hidden">
        {sameArchetypeUsers.map((user) => {
          const initials =
            user.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "U";

          return (
            <div
              key={user._id}
              className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 p-3 transition active:scale-[0.99]"
            >
              {/* Profile Image */}
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name}
                  className="h-11 w-11 shrink-0 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                  {initials}
                </div>
              )}

              {/* Name + Email */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold text-zinc-900">
                  {user.name}
                </h3>

                <p className="mt-0.5 truncate text-xs text-zinc-500">
                  {user.email || user.archetype || "Founder"}
                </p>
              </div>

              {/* View Profile */}
              <button
                type="button"
                className="shrink-0 rounded-lg bg-black px-3 py-2 text-[11px] font-medium text-white transition active:scale-95"
              >
                View Profile
              </button>
            </div>
          );
        })}
      </div>

      {/* ================= DESKTOP CARDS ================= */}
      <div className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {sameArchetypeUsers.map((user) => {
          const initials =
            user.name
              ?.split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "U";

          return (
            <div
              key={user._id}
              className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition hover:border-zinc-300"
            >
              <div className="flex items-center gap-3">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-11 w-11 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                    {initials}
                  </div>
                )}

                <div className="min-w-0">
                  <h3 className="truncate text-sm font-semibold text-zinc-900">
                    {user.name}
                  </h3>

                  <p className="mt-0.5 truncate text-xs text-zinc-500">
                    {user.archetype || "Founder"}
                  </p>
                </div>
              </div>

              {user.location && (
                <p className="mt-3 truncate text-xs text-zinc-500">
                  {user.location}
                </p>
              )}

              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center rounded-lg bg-black px-3 py-2 text-xs font-medium text-white transition hover:bg-zinc-800"
              >
                View Profile
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SameArchetype;
