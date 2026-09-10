"use client";

import {
    ArrowUpRight,
    FileText,
    MapPin,
    Search,
    Sparkles,
    User,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { dashboardStore } from "@/app/store/dashboardStore";

export default function DashboardSearch() {
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    const {
        searchResults,
        loadingSearch,
        search,
        clearSearch,
    } = dashboardStore();

    const [query, setQuery] = useState("");
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            search(query, 6);
        }, 300);

        return () => clearTimeout(timer);
    }, [query, search]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setFocused(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const handleClear = () => {
        setQuery("");
        clearSearch();
    };

    const hasResults =
        (searchResults?.users?.length || 0) > 0 ||
        (searchResults?.posts?.length || 0) > 0;

    return (
        <section
            ref={searchRef}
            className="relative z-20"
        >
            <div
                className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 sm:rounded-3xl ${
                    focused
                        ? "border-zinc-300 shadow-lg shadow-zinc-200/50"
                        : "border-zinc-200 shadow-sm"
                }`}
            >
                <div className="flex items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4">
                    <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all ${
                            focused
                                ? "bg-zinc-900 text-white"
                                : "bg-zinc-100 text-zinc-500"
                        }`}
                    >
                        <Search className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <input
                            value={query}
                            onChange={(e) =>
                                setQuery(e.target.value)
                            }
                            onFocus={() => setFocused(true)}
                            onKeyDown={(e) => {
                                if (e.key === "Escape") {
                                    setFocused(false);
                                    handleClear();
                                }
                            }}
                            placeholder="Search founders, ideas, skills..."
                            className="w-full bg-transparent text-sm font-medium text-zinc-950 outline-none placeholder:text-zinc-400 sm:text-[15px]"
                        />

                        <p className="mt-0.5 hidden text-[9px] text-zinc-400 sm:block">
                            Discover people and ideas across Co-Finder
                        </p>
                    </div>

                    {loadingSearch && (
                        <div className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />
                    )}

                    {query && !loadingSearch && (
                        <button
                            onClick={handleClear}
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    )}
                </div>

                {focused && (
                    <div className="border-t border-zinc-100">
                        {loadingSearch ? (
                            <div className="space-y-3 p-4 sm:p-5">
                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className="flex animate-pulse items-center gap-3"
                                    >
                                        <div className="h-10 w-10 rounded-full bg-zinc-100" />

                                        <div className="flex-1 space-y-2">
                                            <div className="h-2.5 w-28 rounded bg-zinc-100" />
                                            <div className="h-2 w-40 rounded bg-zinc-100" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : !hasResults ? (
                            <div className="px-5 py-8 text-center">
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100">
                                    <Search className="h-4 w-4 text-zinc-400" />
                                </div>

                                <p className="mt-3 text-xs font-semibold text-zinc-700">
                                    No results found
                                </p>

                                <p className="mt-1 text-[10px] text-zinc-400">
                                    Try searching for a founder, skill or idea.
                                </p>
                            </div>
                        ) : (
                            <div className="max-h-[430px] overflow-y-auto">
                                {searchResults?.users &&
                                    searchResults.users.length > 0 && (
                                        <div className="p-3 sm:p-4">
                                            <div className="mb-2 flex items-center justify-between px-1">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-3.5 w-3.5 text-zinc-500" />

                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                                        Founders
                                                    </span>
                                                </div>

                                                <span className="text-[9px] font-semibold text-zinc-400">
                                                    {searchResults.counts.users}
                                                </span>
                                            </div>

                                            <div className="space-y-1">
                                                {searchResults.users
                                                    .slice(0, 4)
                                                    .map((person) => (
                                                        <button
                                                            key={person._id}
                                                            onClick={() =>
                                                                router.push(
                                                                    `/user-profile/${person._id}`
                                                                )
                                                            }
                                                            className="flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition hover:bg-zinc-50"
                                                        >
                                                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-zinc-200 bg-zinc-900">
                                                                {person.profileImage ? (
                                                                    <img
                                                                        src={
                                                                            person.profileImage
                                                                        }
                                                                        alt={
                                                                            person.name
                                                                        }
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="flex h-full w-full items-center justify-center text-xs font-bold text-white">
                                                                        {person.name
                                                                            ?.charAt(
                                                                                0
                                                                            )
                                                                            .toUpperCase()}
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="min-w-0 flex-1">
                                                                <p className="truncate text-xs font-bold text-zinc-900">
                                                                    {person.displayName ||
                                                                        person.name}
                                                                </p>

                                                                <p className="mt-0.5 truncate text-[10px] text-zinc-400">
                                                                    @{person.username}
                                                                </p>

                                                                <div className="mt-1 flex items-center gap-2">
                                                                    {person.archetype && (
                                                                        <span className="truncate rounded-md bg-zinc-100 px-1.5 py-0.5 text-[8px] font-semibold text-zinc-500">
                                                                            {
                                                                                person.archetype
                                                                            }
                                                                        </span>
                                                                    )}

                                                                    {person.location && (
                                                                        <span className="flex min-w-0 items-center gap-1 truncate text-[8px] text-zinc-400">
                                                                            <MapPin className="h-2.5 w-2.5 shrink-0" />
                                                                            {
                                                                                person.location
                                                                            }
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-zinc-300 transition group-hover:text-zinc-900" />
                                                        </button>
                                                    ))}
                                            </div>
                                        </div>
                                    )}

                                {searchResults?.posts &&
                                    searchResults.posts.length > 0 && (
                                        <div className="border-t border-zinc-100 p-3 sm:p-4">
                                            <div className="mb-2 flex items-center justify-between px-1">
                                                <div className="flex items-center gap-2">
                                                    <Sparkles className="h-3.5 w-3.5 text-zinc-500" />

                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                                        Ideas
                                                    </span>
                                                </div>

                                                <span className="text-[9px] font-semibold text-zinc-400">
                                                    {searchResults.counts.posts}
                                                </span>
                                            </div>

                                            <div className="space-y-1">
                                                {searchResults.posts
                                                    .slice(0, 3)
                                                    .map((post) => (
                                                        <button
                                                            key={post._id}
                                                            onClick={() =>
                                                                router.push(
                                                                    `/posts/${post._id}`
                                                                )
                                                            }
                                                            className="flex w-full gap-3 rounded-xl p-2.5 text-left transition hover:bg-zinc-50"
                                                        >
                                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
                                                                <FileText className="h-4 w-4 text-zinc-500" />
                                                            </div>

                                                            <div className="min-w-0 flex-1">
                                                                <p className="line-clamp-2 text-xs font-semibold leading-5 text-zinc-800">
                                                                    {
                                                                        post.content
                                                                    }
                                                                </p>

                                                                <div className="mt-1.5 flex items-center gap-2">
                                                                    {post.author && (
                                                                        <span className="truncate text-[9px] font-medium text-zinc-400">
                                                                            by{" "}
                                                                            {post
                                                                                .author.name
                                                                            }
                                                                        </span>
                                                                    )}

                                                                    <span className="text-[9px] text-zinc-300">
                                                                        •
                                                                    </span>

                                                                    <span className="text-[9px] text-zinc-400">
                                                                        {
                                                                            post.commentsCount
                                                                        }{" "}
                                                                        comments
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            <ArrowUpRight className="mt-1 h-3.5 w-3.5 shrink-0 text-zinc-300" />
                                                        </button>
                                                    ))}
                                            </div>
                                        </div>
                                    )}

                                <div className="border-t border-zinc-100 bg-zinc-50/70 px-4 py-3">
                                    <button
                                        onClick={() =>
                                            router.push(
                                                `/search?q=${encodeURIComponent(
                                                    query
                                                )}`
                                            )
                                        }
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-900 py-2.5 text-[10px] font-bold text-white transition hover:bg-zinc-800 active:scale-[0.99]"
                                    >
                                        <Search className="h-3.5 w-3.5" />
                                        View all results
                                        <ArrowUpRight className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}