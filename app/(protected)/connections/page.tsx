"use client";

import { useEffect, useState } from "react";
import { UserPlus, Search, MapPin, ChartBar, MessageCircle, Badge, BadgeIcon, BadgeCheck } from "lucide-react";
import { getOtherUsers } from "@/app/services/dashboard.service";
import { useRouter } from "next/navigation";
import { useChatStore } from "@/app/store/chatStore";

interface User {
  _id: string;
  name: string;
  username?: string;
  displayName?: string;
  location?: string;
  archetype?: string;
  completionStatus?: number;
  profileImage?: string | null;
  role: string;
}

export default function ConnectionsPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [creatingChat, setCreatingChat] = useState<string | null>(null);

  const appRouter = useRouter();

  const { createNewConversation } = useChatStore();

  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await getOtherUsers();

        setUsers(response.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const query = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(query) ||
      user.archetype?.toLowerCase().includes(query) ||
      user.location?.toLowerCase().includes(query)
    );
  });

  const handleChat = async (user: User) => {
    try {
      setCreatingChat(user._id);

      // Backend expects:
      // participants: [currentUserId, otherUserId]

      const conversation = await createNewConversation([
        user._id,
      ]);

      console.log("Created Conversation:", conversation);

      if (!conversation?._id) {
        console.error("Conversation was not created");
        return;
      }

      appRouter.push(`/chat?conversationId=${conversation._id}`);
    } catch (error) {
      console.error("CREATE CONVERSATION ERROR:", error);
    } finally {
      setCreatingChat(null);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Network
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                Find your connections
              </h1>

              <p className="mt-2 max-w-xl text-sm text-zinc-500">
                Discover people and connect with potential co-founders,
                collaborators and teammates.
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-[280px]">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search people..."
                className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
              />
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[250px] animate-pulse rounded-2xl border border-zinc-200 bg-white"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && filteredUsers.length === 0 && (
          <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-white px-6 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-100">
              <UserPlus size={22} className="text-zinc-500" />
            </div>

            <h2 className="text-lg font-semibold text-zinc-900">
              No users found
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Try searching with a different name or role.
            </p>
          </div>
        )}

        {/* Users */}
        {!loading && filteredUsers.length > 0 && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredUsers.map((user) => (
              <div
              onClick={()=>appRouter.push(`/user-profile/${user._id}`)}
                key={user._id}
                className="group rounded-2xl border border-zinc-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/50"
              >
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div className="relative">
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.name}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white">
                        {user.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}

                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-zinc-700" />
                  </div>
{/* 
                  {user.completionStatus !== undefined && (
                    <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold text-zinc-500">
                      {user.completionStatus}% complete
                    </span>
                  )} */}

                  {user.archetype && (
                    <div className=" inline-flex items-center gap-3 rounded-lg bg-zinc-100 px-3 py-2 text-sm  font-semibold text-zinc-700">
                     <BadgeCheck size={20}/> {user.archetype}
                    </div>
                  )}
                </div>

                {/* User info */}
                <div className="mt-5">
                  <h2 className="truncate text-base font-bold text-zinc-950">
                    {user.displayName || user.name}
                  </h2>

                  {user.username && (
                    <p className="mt-0.5 text-xs text-zinc-400">
                      @{user.username}
                    </p>
                  )}

                  

                  {user.location && (
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-zinc-400">
                      <MapPin size={13} />
                      <span className="truncate">{user.location}</span>
                    </div>
                  )}
                </div>

                {/* Chat */}
                <button
                  onClick={() => handleChat(user)}
                  disabled={creatingChat === user._id}
                  className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 text-sm font-semibold text-white transition hover:bg-zinc-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <MessageCircle size={16} />

                  {creatingChat === user._id
                    ? "Starting..."
                    : "Chat"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}