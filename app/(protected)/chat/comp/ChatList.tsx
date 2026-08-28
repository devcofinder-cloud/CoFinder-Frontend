"use client";

import { useEffect, useState } from "react";
import { Search, MoreVertical, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

import { getConversation, Conversation } from "@/app/services/chat.service";
import { useChatStore } from "@/app/store/chatStore";

interface ChatListProps {
  activeConversationId?: string;
}

export default function ChatList({ activeConversationId }: ChatListProps) {
  const router = useRouter();

  const unreadCounts = useChatStore((state) => state.unreadCounts);
  const fetchUnreadCount = useChatStore((state) => state.fetchUnreadCount);

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const userId = user._id || user.id;

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

  useEffect(() => {
    if (!conversations.length) return;

    conversations.forEach((conversation) => {
      if (!conversation._id) return;
      fetchUnreadCount(conversation._id);
    });
  }, [conversations, fetchUnreadCount]);

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

    const parsed = new Date(date);
    const now = new Date();
    const isToday = parsed.toDateString() === now.toDateString();

    if (isToday) {
      return parsed.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (parsed.toDateString() === yesterday.toDateString()) return "Yesterday";

    return parsed.toLocaleDateString([], { day: "numeric", month: "short" });
  };

  const filteredConversations = conversations.filter((conversation) => {
    const user = getOtherParticipant(conversation);
    return user?.name?.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <aside className="flex h-full w-full shrink-0 flex-col border-r border-zinc-200 bg-white md:w-[340px] lg:w-[380px]">
      {/* HEADER */}
      <div className="shrink-0 border-b border-zinc-200 px-5 py-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-950">Messages</h1>
            <p className="mt-0.5 text-xs text-zinc-500">Stay connected with your people</p>
          </div>

          <button
            aria-label="More options"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
          >
            <MoreVertical size={17} />
          </button>
        </div>

        {/* SEARCH */}
        <div className="relative">
          <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
          />
        </div>
      </div>

      {/* CONVERSATIONS */}
      <div className="flex-1 overflow-y-auto p-2">
        {loading ? (
          <div className="space-y-1 p-1">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-3 py-3">
                <div className="h-12 w-12 shrink-0 animate-pulse rounded-full bg-zinc-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-2/5 animate-pulse rounded bg-zinc-100" />
                  <div className="h-2.5 w-3/5 animate-pulse rounded bg-zinc-100" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 text-zinc-400">
              <MessageCircle size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-700">
                {search ? "No matches found" : "No conversations yet"}
              </p>
              <p className="mt-1 text-xs text-zinc-400">
                {search ? "Try a different name" : "Start a chat to see it here"}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-0.5">
            {filteredConversations.map((chat) => {
              if (!chat._id) return null;

              const user = getOtherParticipant(chat);
              const isActive = activeConversationId === chat._id;
              const unread = unreadCounts[chat._id] || 0;

              const isOwnLastMessage =
                typeof chat?.lastMessage !== "string" &&
                String(chat?.lastMessage?.sender) === String(userId);

              const lastMessageText =
                typeof chat?.lastMessage !== "string" ? chat?.lastMessage?.content : "";

              return (
                <button
                  key={chat._id}
                  onClick={() => router.push(`/chat/${chat._id}`)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    isActive ? "bg-zinc-100" : "hover:bg-zinc-50"
                  }`}
                >
                  {/* AVATAR */}
                  <div className="relative shrink-0">
                    {user?.profileImage || user?.avatar ? (
                      <img
                        src={user.profileImage || user.avatar}
                        alt={user.name || "User"}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
                        {user?.name?.slice(0, 2).toUpperCase() || "U"}
                      </div>
                    )}
                  </div>

                  {/* INFO */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3
                        className={`truncate text-sm ${
                          unread > 0 ? "font-bold text-zinc-950" : "font-semibold text-zinc-900"
                        }`}
                      >
                        {user?.name || "User"}
                      </h3>

                      <div className="flex shrink-0 flex-col items-end gap-1.5">
                        <span className="text-[11px] text-zinc-400">
                          {formatTime(chat.lastMessageAt)}
                        </span>

                        {unread > 0 && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-950 px-1.5 text-[10px] font-bold text-white">
                            {unread > 99 ? "99+" : unread}
                          </span>
                        )}
                      </div>
                    </div>

                    <p
                      className={`mt-1 truncate text-xs ${
                        unread > 0 ? "font-medium text-zinc-700" : "text-zinc-500"
                      }`}
                    >
                      {isOwnLastMessage && <span className="text-zinc-400">You: </span>}
                      {lastMessageText || <span className="italic text-zinc-300">No messages yet</span>}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}