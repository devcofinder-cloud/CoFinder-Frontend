"use client";

import { ArrowUpRight, MapPin, Sparkles, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { dashboardStore } from "@/app/store/dashboardStore";

export default function RecommendedFounders() {
    const router = useRouter();

    const {
        recommendedUsers,
        loadingRecommendedUsers,
        fetchRecommendedUsers,
    } = dashboardStore();

    useEffect(() => {
        fetchRecommendedUsers(10);
    }, [fetchRecommendedUsers]);

    return (
        <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm sm:rounded-3xl">
            <div className="flex items-center justify-between gap-4 border-b border-zinc-100 px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-zinc-900 text-white">
                        <Sparkles className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">
                        <h2 className="truncate text-sm font-bold tracking-tight text-zinc-950 sm:text-base">
                            Recommended Founders
                        </h2>

                        <p className="mt-0.5 truncate text-[10px] text-zinc-500 sm:text-xs">
                            People who align with your founder profile
                        </p>
                    </div>
                </div>

                <button
                    onClick={() => router.push("/connections")}
                    className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-semibold text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 sm:text-xs"
                >
                    View all
                    <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
            </div>

            {loadingRecommendedUsers ? (
                <div className="divide-y divide-zinc-100">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="flex animate-pulse items-center gap-3 px-4 py-4 sm:px-6"
                        >
                            <div className="h-11 w-11 shrink-0 rounded-full bg-zinc-200" />

                            <div className="min-w-0 flex-1 space-y-2">
                                <div className="h-3 w-28 rounded bg-zinc-200" />
                                <div className="h-2.5 w-40 rounded bg-zinc-200" />
                            </div>

                            <div className="h-8 w-20 rounded-lg bg-zinc-200" />
                        </div>
                    ))}
                </div>
            ) : recommendedUsers.length === 0 ? (
                <div className="px-4 py-10 text-center sm:px-6">
                    <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-100">
                        <Sparkles className="h-4 w-4 text-zinc-400" />
                    </div>

                    <p className="mt-3 text-xs font-semibold text-zinc-700">
                        No recommendations available yet
                    </p>

                    <p className="mx-auto mt-1 max-w-xs text-[10px] leading-5 text-zinc-400">
                        Complete your profile to get better founder matches.
                    </p>
                </div>
            ) : (
                <div className="divide-y divide-zinc-100">
                    {recommendedUsers.slice(0,4 ).map((person) => (
                        <div
                            key={person._id}
                            onClick={() =>
                                router.push(`/user-profile/${person._id}`)
                            }
                            className="group flex cursor-pointer items-center gap-3 px-4 py-4 transition-colors hover:bg-zinc-50 sm:gap-4 sm:px-6"
                        >
                            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-zinc-200 bg-zinc-900 sm:h-12 sm:w-12">
                                {person.profileImage ? (
                                    <img
                                        src={person.profileImage}
                                        alt={person.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                                        {person.name
                                            ?.charAt(0)
                                            .toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex min-w-0 items-center gap-2">
                                    <h3 className="truncate text-xs font-bold text-zinc-950 sm:text-sm">
                                        {person.displayName || person.name}
                                    </h3>

                                    {person.recommendationScore !==
                                        undefined && (
                                        <span className="hidden shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-[8px] font-bold text-zinc-700 sm:inline-flex">
                                            {Math.min(
                                                person.recommendationScore,
                                                99
                                            )}
                                            % match
                                        </span>
                                    )}
                                </div>

                                <p className="mt-0.5 truncate text-[10px] text-zinc-500 sm:text-xs">
                                    @{person.username}
                                </p>

                                <div className="mt-1.5 flex min-w-0 items-center gap-1.5">
                                    {person.archetype && (
                                        <span className="max-w-[110px] truncate rounded-md bg-zinc-100 px-1.5 py-0.5 text-[8px] font-semibold text-zinc-600 sm:text-[9px]">
                                            {person.archetype}
                                        </span>
                                    )}

                                    {person.location && (
                                        <span className="flex min-w-0 max-w-[130px] items-center gap-1 truncate text-[8px] text-zinc-400 sm:max-w-[180px] sm:text-[9px]">
                                            <MapPin className="h-2.5 w-2.5 shrink-0" />
                                            <span className="truncate">
                                                {person.location}
                                            </span>
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                                {person.recommendationScore !== undefined && (
                                    <span className="flex h-8 min-w-8 items-center justify-center rounded-full bg-zinc-100 px-2 text-[9px] font-bold text-zinc-700 sm:hidden">
                                        {Math.min(
                                            person.recommendationScore,
                                            99
                                        )}
                                        %
                                    </span>
                                )}

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                    }}
                                    className="flex h-8 items-center justify-center gap-1.5 rounded-lg bg-zinc-900 px-3 text-[9px] font-bold text-white transition hover:bg-zinc-800 active:scale-95 sm:h-9 sm:rounded-xl sm:px-4 sm:text-[10px]"
                                >
                                    <UserPlus className="h-3 w-3" />
                                    <span className="hidden sm:inline">
                                        Connect
                                    </span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}