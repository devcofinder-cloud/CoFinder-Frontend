"use client";

import { useEffect, useState } from "react";
import { Search, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

import { getConversation, Conversation } from "@/app/services/chat.service";

interface ChatListProps {
  activeConversationId?: string;
}

export default function ChatList({ activeConversationId }: ChatListProps) {
  const router = useRouter();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoading(true);

        const response = await getConversation();

        const data = response.data?.data || response.data || [];

        setConversations(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, []);

  const currentUser =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;

  const getOtherParticipant = (conversation: Conversation) => {
    return (
      conversation.participants?.find(
        (participant) => participant._id !== currentUser?._id,
      ) || conversation.participants?.[0]
    );
  };

  const formatTime = (date?: string | null) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredConversations = conversations.filter((conversation) => {
    const user = getOtherParticipant(conversation);

    return user?.name?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <aside
      className="
        w-full shrink-0 border-r border-zinc-200 bg-white
        md:w-[340px] lg:w-[380px]
      "
    >
      {/* HEADER */}

      <div className="border-b border-zinc-200 px-5 py-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-950">
              Messages
            </h1>

            <p className="mt-1 text-xs text-zinc-500">
              Stay connected with your people
            </p>
          </div>

          <button
            className="
              flex h-9 w-9 items-center justify-center
              rounded-xl border border-zinc-200
              text-zinc-600 transition
              hover:bg-zinc-950 hover:text-white
            "
          >
            <MoreVertical size={18} />
          </button>
        </div>

        {/* SEARCH */}

        <div className="relative">
          <Search
            size={17}
            className="
              absolute left-3.5 top-1/2
              -translate-y-1/2 text-zinc-400
            "
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="
              h-11 w-full rounded-xl
              border border-zinc-200
              bg-zinc-50 pl-10 pr-4
              text-sm text-zinc-900
              outline-none transition
              placeholder:text-zinc-400
              focus:border-zinc-400
              focus:bg-white
            "
          />
        </div>
      </div>

      {/* CONVERSATIONS */}

      <div className="h-[calc(100%-145px)] overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-3 p-8">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full border-2 border-zinc-200" />
              <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-black" />
            </div>

            <span className="text-sm font-medium text-zinc-500">
              Loading your chats...
            </span>
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="p-5 text-center text-sm text-zinc-400">
            No conversations yet
          </div>
        ) : (
          filteredConversations.map((chat) => {
            const user = getOtherParticipant(chat);

            const isActive = activeConversationId === chat._id;

            return (
              <button
                key={chat._id}
                onClick={() => {
                  router.push(`/chat/${chat._id}`);
                }}
                className={`
                  flex w-full items-center gap-3
                  border-b border-zinc-100
                  px-4 py-4 text-left
                  transition

                  ${isActive ? "bg-zinc-100" : "hover:bg-zinc-50"}
                `}
              >
                {/* AVATAR */}

                <div className="relative shrink-0">
                  {user?.profileImage || user?.avatar ? (
                    <img
                      src={user.profileImage || user.avatar}
                      alt={user.name || "User"}
                      className="
                        h-12 w-12 rounded-full
                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex h-12 w-12
                        items-center justify-center
                        rounded-full bg-zinc-900
                        text-sm font-semibold
                        text-white
                      "
                    >
                      {user?.name?.slice(0, 2).toUpperCase() || "U"}
                    </div>
                  )}
                </div>

                {/* INFO */}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className="
                        truncate text-sm
                        font-semibold text-zinc-900
                      "
                    >
                      {user?.name || "User"}
                    </h3>

                    {/* <span
                      className="
                        shrink-0 text-[11px]
                        text-zinc-400
                      "
                    >
                      {formatTime(
                        chat.lastMessageAt
                      )}
                    </span> */}
                  </div>

                  {/* <p
                    className="
                      mt-1 truncate text-xs
                      text-zinc-500
                    "
                  >
                    {chat.lastMessage ||
                      "No messages yet"}
                  </p> */}
                </div>
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
}
