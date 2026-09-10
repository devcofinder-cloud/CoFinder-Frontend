"use client";

import { useEffect } from "react";
import { MapPin, ArrowUpRight } from "lucide-react";
import { dashboardStore } from "@/app/store/dashboardStore";

const NearbyFounders = () => {
  const {
    nearbyUsers,
    loadingNearbyUsers,
    fetchNearbyUsers,
  } = dashboardStore();

  useEffect(() => {
    fetchNearbyUsers(10);
  }, [fetchNearbyUsers]);

  if (loadingNearbyUsers) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
        <div className="mb-4">
          <div className="h-5 w-40 animate-pulse rounded bg-zinc-200" />
          <div className="mt-2 h-3 w-56 animate-pulse rounded bg-zinc-100" />
        </div>

        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="min-w-[260px] rounded-xl border border-zinc-100 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 animate-pulse rounded-full bg-zinc-200" />
                <div className="flex-1">
                  <div className="h-4 w-28 animate-pulse rounded bg-zinc-200" />
                  <div className="mt-2 h-3 w-20 animate-pulse rounded bg-zinc-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!nearbyUsers?.length) {
    return (
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100">
            <MapPin className="h-5 w-5 text-zinc-600" />
          </div>

          <div>
            <h2 className="text-sm font-semibold text-zinc-900">
              Nearby Founders
            </h2>
            <p className="mt-1 text-xs text-zinc-500">
              No nearby founders found right now.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-zinc-700" />

            <h2 className="text-sm font-semibold text-zinc-900 sm:text-base">
              Nearby Founders
            </h2>
          </div>

          <p className="mt-1 text-xs text-zinc-500">
            People around your location
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

      <div className="flex snap-x gap-3 overflow-x-auto pb-1 scrollbar-hide sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {nearbyUsers.map((user) => {
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
              className="w-[270px] shrink-0 snap-start rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition hover:border-zinc-300 sm:w-auto"
            >
              <div className="flex items-center gap-3">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-11 w-11 rounded-full object-cover"
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

                  {user.archetype && (
                    <p className="mt-0.5 truncate text-xs text-zinc-500">
                      {user.archetype}
                    </p>
                  )}
                </div>
              </div>

              {user.location && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
                  <MapPin className="h-3.5 w-3.5" />
                  <span className="truncate">{user.location}</span>
                </div>
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

export default NearbyFounders;