"use client";
import { io, Socket } from "socket.io-client";
import { useEffect, useRef, useState } from "react";
import {
  Search,
  MoreVertical,
  MessageCircle,
  Pin,
  Trash2,
  BellOff,
  Archive,
  X,
  Bell,
  Check,
  CheckCheck,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import { getConversation, Conversation } from "@/app/services/chat.service";
import { useChatStore } from "@/app/store/chatStore";

interface ChatListProps {
  activeConversationId?: string;
}

export default function ChatList({ activeConversationId }: ChatListProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const router = useRouter();

  const unreadCounts = useChatStore((state) => state.unreadCounts);
  const fetchUnreadCount = useChatStore((state) => state.fetchUnreadCount);
  const { deleteConversation, deleteLoading } = useChatStore();

  const conversations = useChatStore((state) => state.conversations);
  const fetchConversations = useChatStore((state) => state.fetchConversations);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [showOptions, setShowOptions] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isLongPressRef = useRef(false);

  const handlePressStart = (chat: Conversation) => {
    isLongPressRef.current = false;

    timerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      setSelectedChat(chat);
      setShowOptions(true);

      navigator.vibrate?.(20);
    }, 600);
  };

  const handlePressEnd = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  const userId = user._id || user.id;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchConversations();
      setLoading(false);
    };

    load();
  }, [fetchConversations]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      auth: {
        token,
      },
    });

    socket.on("connect", () => {
      console.log("ChatList socket connected:", socket.id);
    });

    const handleNewMessage = (message: any) => {
      console.log("ChatList new message:", message);

      useChatStore.setState((state) => {
        const conversationId = String(
          message.conversation?._id ||
            message.conversation ||
            message.conversationId,
        );

        if (!conversationId) return state;

        const existingConversation = state.conversations.find(
          (conversation) => String(conversation._id) === conversationId,
        );

        // Agar conversation list me already hai
        if (existingConversation) {
          const updatedConversation = {
            ...existingConversation,
            lastMessage: message,
            lastMessageAt: message.createdAt,
          };

          const updatedConversations = state.conversations
            .map((conversation) =>
              String(conversation._id) === conversationId
                ? updatedConversation
                : conversation,
            )
            .sort(
              (a, b) =>
                new Date(b.lastMessageAt || 0).getTime() -
                new Date(a.lastMessageAt || 0).getTime(),
            );

          return {
            ...state,
            conversations: updatedConversations,
          };
        }

        // Conversation list me nahi hai
        // Is case me next fetch se aa jayegi
        return state;
      });
    };

    socket.on("new_message", handleNewMessage);

    socket.on("connect_error", (error) => {
      console.error("ChatList socket error:", error.message);
    });

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.disconnect();
    };
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
      return parsed.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
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
    <aside className="relative flex h-full w-full shrink-0 flex-col border-r border-zinc-200 bg-white md:w-[340px] lg:w-[380px]">
      {/* HEADER */}
      <div className="shrink-0 border-b border-zinc-200 px-5 py-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-950">
              Messages
            </h1>

            <p className="mt-0.5 text-xs text-zinc-500">
              Stay connected with your people
            </p>
          </div>
        </div>
        <AnimatePresence>
          {showNotifications && (
            <>
              {/* OUTSIDE CLICK */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowNotifications(false)}
                className="fixed inset-0 z-30"
              />

              {/* NOTIFICATION PANEL */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.97,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.16,
                }}
                className="absolute left-4 right-4 top-[82px] z-40 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl md:left-auto md:right-5 md:w-[360px]"
              >
                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3">
                  <div>
                    <h2 className="text-sm font-bold text-zinc-950">
                      Notifications
                    </h2>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* SEARCH */}
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
          />
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
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl px-3 py-3"
              >
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
                {search
                  ? "Try a different name"
                  : "Start a chat to see it here"}
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

              const lastMessage =
                typeof chat?.lastMessage !== "string"
                  ? chat?.lastMessage
                  : null;

              const isLastMessageDeleted = Boolean(lastMessage?.isDeleted);

              const isOwnLastMessage =
                !isLastMessageDeleted &&
                lastMessage &&
                String(lastMessage.sender) === String(userId);

              const lastMessageText = isLastMessageDeleted
                ? String(lastMessage?.sender) === String(userId)
                  ? "You deleted this message"
                  : "This message was deleted"
                : lastMessage?.content || "";

              return (
                <button
                  key={chat._id}
                  onClick={() => {
                    if (!isLongPressRef.current) {
                      router.push(`/chat/${chat._id}`);
                    }

                    isLongPressRef.current = false;
                  }}
                  onPointerDown={() => handlePressStart(chat)}
                  onPointerUp={handlePressEnd}
                  onPointerCancel={handlePressEnd}
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
                          unread > 0
                            ? "font-bold text-zinc-950"
                            : "font-semibold text-zinc-900"
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
                        isLastMessageDeleted
                          ? "italic text-zinc-400"
                          : unread > 0
                            ? "font-medium text-zinc-700"
                            : "text-zinc-500"
                      }`}
                    >
                      {!isLastMessageDeleted && isOwnLastMessage && (
                        <span className="text-zinc-400">You: </span>
                      )}

                      {lastMessageText || (
                        <span className="italic text-zinc-300">
                          No messages yet
                        </span>
                      )}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <AnimatePresence>
        {showOptions && selectedChat && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOptions(false)}
              className="fixed inset-0 z-40 bg-black/35 backdrop-blur-[3px]"
            />

            {/* CENTER MODAL */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 28,
                mass: 0.8,
              }}
              className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-32px)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[26px] bg-white p-4 shadow-2xl"
            >
              {/* SELECTED CHAT */}
              <div className="mb-3 flex items-center gap-3 rounded-2xl bg-zinc-50 p-3">
                <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-zinc-900">
                  {(() => {
                    const user = getOtherParticipant(selectedChat);

                    return user?.profileImage || user?.avatar ? (
                      <img
                        src={user.profileImage || user.avatar}
                        alt={user.name || "User"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-white">
                        {user?.name?.slice(0, 2).toUpperCase() || "U"}
                      </div>
                    );
                  })()}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-zinc-950">
                    {getOtherParticipant(selectedChat)?.name || "User"}
                  </p>

                  <p className="text-xs text-zinc-400">Conversation options</p>
                </div>

                <button
                  onClick={() => setShowOptions(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition active:scale-90"
                >
                  <X size={16} />
                </button>
              </div>

              {/* OPTIONS */}
              <div className="space-y-1">
                <button
                  onClick={() => {
                    console.log("Pin chat", selectedChat._id);
                    setShowOptions(false);
                  }}
                  className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition active:scale-[0.98] active:bg-zinc-100"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
                    <Pin size={18} className="text-zinc-700" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      Pin chat
                    </p>
                    <p className="text-xs text-zinc-400">
                      Keep this conversation at the top
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    console.log("Mute chat", selectedChat._id);
                    setShowOptions(false);
                  }}
                  className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition active:scale-[0.98] active:bg-zinc-100"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
                    <BellOff size={18} className="text-zinc-700" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      Mute notifications
                    </p>
                    <p className="text-xs text-zinc-400">
                      Stop notifications for this chat
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => {
                    console.log("Archive chat", selectedChat._id);
                    setShowOptions(false);
                  }}
                  className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition active:scale-[0.98] active:bg-zinc-100"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
                    <Archive size={18} className="text-zinc-700" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      Archive chat
                    </p>
                    <p className="text-xs text-zinc-400">
                      Move this conversation out of your inbox
                    </p>
                  </div>
                </button>

                <button
                  disabled={deleteLoading}
                  onClick={async () => {
                    if (!selectedChat?._id || deleteLoading) return;

                    const deleted = await deleteConversation(selectedChat._id);

                    if (deleted) {
                      setShowOptions(false);
                      setSelectedChat(null);
                    }
                  }}
                  className="flex w-full items-center gap-4 rounded-2xl px-4 py-3.5 text-left transition active:scale-[0.98] active:bg-red-50 disabled:pointer-events-none disabled:opacity-60"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50">
                    {deleteLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="h-[18px] w-[18px] rounded-full border-2 border-red-200 border-t-red-500"
                      />
                    ) : (
                      <Trash2 size={18} className="text-red-500" />
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-red-600">
                      {deleteLoading ? "Deleting..." : "Delete chat"}
                    </p>

                    <p className="text-xs text-red-400">
                      {deleteLoading
                        ? "Removing conversation..."
                        : "Remove this conversation"}
                    </p>
                  </div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </aside>
  );
}
