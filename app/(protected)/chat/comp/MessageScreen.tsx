"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

import {
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  ArrowLeft,
  X,
  Pencil,
  Trash2,
  Reply,
} from "lucide-react";

import { Message } from "@/app/services/chat.service";
import { useChatStore } from "@/app/store/chatStore";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

interface MessageScreenProps {
  conversationId: string;
  onBack?: () => void;
}

export default function MessageScreen({
  conversationId,
  onBack,
}: MessageScreenProps) {
  const {
    activeConversation,
    messages,
    loadingMessages,
    fetchConversation,
    fetchMessages,
    setMessages,
    addMessage,
  } = useChatStore();

  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const touchStartXRef = useRef<number | null>(null);

  const touchStartYRef = useRef<number | null>(null);

  const isLongPressRef = useRef(false);

  const socketRef = useRef<Socket | null>(null);

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  /*
  |--------------------------------------------------------------------------
  | CURRENT USER
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        console.error("User not found in localStorage");
        return;
      }

      const user = JSON.parse(storedUser);

      if (user?._id) {
        setCurrentUserId(String(user._id));
      }
    } catch (error) {
      console.error("Failed to read current user:", error);
    }
  }, []);

  /*
  |--------------------------------------------------------------------------
  | LOAD CONVERSATION + MESSAGES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!conversationId) return;

    let cancelled = false;

    const loadChat = async () => {
      try {
        setMessages([]);

        await fetchConversation(conversationId);

        if (cancelled) return;

        await fetchMessages(conversationId);
      } catch (error) {
        console.error("Failed to load chat:", error);
      }
    };

    loadChat();

    return () => {
      cancelled = true;
      setMessages([]);
    };
  }, [conversationId, fetchConversation, fetchMessages, setMessages]);

  /*
  |--------------------------------------------------------------------------
  | AUTO SCROLL
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [messages, typing]);

  /*
  |--------------------------------------------------------------------------
  | SOCKET CONNECTION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!conversationId || !currentUserId) {
      return;
    }

    if (!SOCKET_URL) {
      console.error("NEXT_PUBLIC_SOCKET_URL is not configured");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("JWT token not found. Socket cannot connect.");
      return;
    }

    /*
     * Create socket connection.
     *
     * IMPORTANT:
     * Backend expects:
     *
     * socket.handshake.auth.token
     *
     * Therefore token MUST be inside auth.
     */

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],

      auth: {
        token,
      },
    });

    socketRef.current = socket;

    /*
    |--------------------------------------------------------------------------
    | CONNECT
    |--------------------------------------------------------------------------
    */

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);

      setSocketConnected(true);

      /*
       * Join current conversation room
       */

      socket.emit("join_conversation", {
        conversationId,
      });
    });

    /*
    |--------------------------------------------------------------------------
    | CONNECT ERROR
    |--------------------------------------------------------------------------
    */

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);

      setSocketConnected(false);
    });

    /*
    |--------------------------------------------------------------------------
    | DISCONNECT
    |--------------------------------------------------------------------------
    */

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);

      setSocketConnected(false);
    });

    /*
    |--------------------------------------------------------------------------
    | NEW MESSAGE
    |--------------------------------------------------------------------------
    */
    socket.on("new_message", (newMessage) => {
      console.log("🔥 NEW MESSAGE RECEIVED:", newMessage);

      const incomingConversationId =
        newMessage.conversationId ||
        newMessage.conversation?._id ||
        newMessage.conversation;

      console.log("📌 Current conversation:", conversationId);

      console.log("📌 Incoming conversation:", incomingConversationId);

      if (!incomingConversationId) {
        console.error("❌ Conversation ID missing from socket message");
        return;
      }

      if (String(incomingConversationId) !== String(conversationId)) {
        console.log("❌ Different conversation");
        return;
      }

      const senderId = newMessage.senderId || newMessage.sender?._id;

      const normalizedMessage: Message = {
        ...newMessage,

        conversationId: String(incomingConversationId),

        senderId: String(senderId),

        receiverId:
          newMessage.receiverId || newMessage.receiver?._id || undefined,
      };

      console.log("✅ ADDING REALTIME MESSAGE:", normalizedMessage);

      addMessage(normalizedMessage);

      if (String(senderId) !== String(currentUserId)) {
        setTyping(false);
      }
    });
    /*
    |--------------------------------------------------------------------------
    | USER TYPING
    |--------------------------------------------------------------------------
    */

    socket.on(
      "user_typing",
      ({
        conversationId: id,
        userId,
      }: {
        conversationId: string;
        userId?: string;
      }) => {
        if (String(id) !== String(conversationId)) {
          return;
        }

        /*
         * Don't show own typing event.
         */

        if (userId && String(userId) === String(currentUserId)) {
          return;
        }

        setTyping(true);
      },
    );

    /*
    |--------------------------------------------------------------------------
    | USER STOP TYPING
    |--------------------------------------------------------------------------
    */

    socket.on(
      "user_stop_typing",
      ({
        conversationId: id,
        userId,
      }: {
        conversationId: string;
        userId?: string;
      }) => {
        if (String(id) !== String(conversationId)) {
          return;
        }

        if (userId && String(userId) === String(currentUserId)) {
          return;
        }

        setTyping(false);
      },
    );

    /*
    |--------------------------------------------------------------------------
    | MESSAGE ERROR
    |--------------------------------------------------------------------------
    */

    socket.on(
      "message_error",
      (error: { success?: boolean; message?: string }) => {
        console.error(
          "Message error:",
          error?.message || "Failed to send message",
        );
      },
    );

    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = null;
      }

      socket.emit("stop_typing", {
        conversationId,
      });

      socket.emit("leave_conversation", {
        conversationId,
      });

      socket.removeAllListeners();

      socket.disconnect();

      socketRef.current = null;

      setSocketConnected(false);
      setTyping(false);
    };
  }, [conversationId, currentUserId, addMessage]);
  /*
|--------------------------------------------------------------------------
| MESSAGE REPLY
|--------------------------------------------------------------------------
*/

  const handleReply = (msg: Message) => {
    setReplyingTo(msg);
    setSelectedMessage(null);
  };

  /*
|--------------------------------------------------------------------------
| LONG PRESS
|--------------------------------------------------------------------------
*/

  const handleMessageTouchStart = (e: React.TouchEvent, msg: Message) => {
    const touch = e.touches[0];

    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;

    isLongPressRef.current = false;

    longPressTimerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      setSelectedMessage(msg);

      // vibration on supported mobile devices
      if (navigator.vibrate) {
        navigator.vibrate(40);
      }
    }, 500);
  };

  /*
|--------------------------------------------------------------------------
| TOUCH MOVE
|--------------------------------------------------------------------------
*/

  const handleMessageTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) {
      return;
    }

    const touch = e.touches[0];

    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;

    /*
     * If user moves vertically/horizontally,
     * cancel long press.
     */

    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    }

    /*
     * Swipe right to reply
     */

    if (deltaX > 70 && Math.abs(deltaY) < 50) {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }

      if (touchStartXRef.current !== null) {
        touchStartXRef.current = null;
      }

      return;
    }
  };

  /*
|--------------------------------------------------------------------------
| TOUCH END
|--------------------------------------------------------------------------
*/

  const handleMessageTouchEnd = (e: React.TouchEvent, msg: Message) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (touchStartXRef.current === null || touchStartYRef.current === null) {
      return;
    }

    const touch = e.changedTouches[0];

    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;

    /*
     * Swipe right
     */

    if (deltaX > 70 && Math.abs(deltaY) < 50 && !isLongPressRef.current) {
      handleReply(msg);
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  /*
|--------------------------------------------------------------------------
| TOUCH CANCEL
|--------------------------------------------------------------------------
*/

  const handleMessageTouchCancel = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  /*
|--------------------------------------------------------------------------
| CANCEL REPLY
|--------------------------------------------------------------------------
*/

  const cancelReply = () => {
    setReplyingTo(null);
  };

  /*
  |--------------------------------------------------------------------------
  | SEND MESSAGE
  |--------------------------------------------------------------------------
  */

  const handleSend = () => {
    const text = message.trim();

    if (!text) return;

    if (!conversationId) {
      console.error("Conversation ID missing");
      return;
    }

    if (!currentUserId) {
      console.error("Current user ID missing");
      return;
    }

    const socket = socketRef.current;

    if (!socket) {
      console.error("Socket instance not available");
      return;
    }

    if (!socket.connected) {
      console.error("Socket is not connected");
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | FIND RECEIVER
    |--------------------------------------------------------------------------
    */

    const receiver = activeConversation?.participants?.find(
      (participant) => String(participant._id) !== String(currentUserId),
    );

    if (!receiver) {
      console.error("Receiver not found");
      return;
    }

    /*
    |--------------------------------------------------------------------------
    | STOP TYPING
    |--------------------------------------------------------------------------
    */

    socket.emit("stop_typing", {
      conversationId,
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);

      typingTimeoutRef.current = null;
    }

    setTyping(false);

    /*
    |--------------------------------------------------------------------------
    | SEND THROUGH SOCKET
    |--------------------------------------------------------------------------
    */

    socket.emit("sendMessage", {
      conversationId,
      receiverId: receiver._id,
      content: text,
      messageType: "text",

      ...(replyingTo?._id
        ? {
            replyTo: replyingTo._id,
          }
        : {}),
    });

    setMessage("");
    setReplyingTo(null);
  };

  /*
  |--------------------------------------------------------------------------
  | TYPING
  |--------------------------------------------------------------------------
  */

  const handleTyping = (value: string) => {
    setMessage(value);

    const socket = socketRef.current;

    if (!socket || !socket.connected) {
      return;
    }

    /*
     * Empty input
     */

    if (!value.trim()) {
      socket.emit("stop_typing", {
        conversationId,
      });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = null;
      }

      return;
    }

    /*
     * Tell other user
     */

    socket.emit("typing", {
      conversationId,
    });

    /*
     * Reset timeout
     */

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", {
        conversationId,
      });

      typingTimeoutRef.current = null;
    }, 1000);
  };

  const getOtherParticipant = () => {
    if (!activeConversation?.participants?.length) {
      return null;
    }

    return (
      activeConversation.participants.find(
        (participant) => String(participant._id) !== String(currentUserId),
      ) || activeConversation.participants[0]
    );
  };

  const user = getOtherParticipant();

  const formatTime = (date?: string) => {
    if (!date) return "";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!activeConversation) {
    return (
      <section className="flex min-w-0 flex-1 items-center justify-center bg-zinc-50">
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-full border-2 border-zinc-200" />

            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-zinc-950" />
          </div>

          <p className="text-sm font-medium text-zinc-500">
            Loading your chat...
          </p>
        </div>
      </section>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-zinc-50">
      {/* HEADER */}

      <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 md:hidden"
              type="button"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          {/* AVATAR */}

          <div className="relative shrink-0">
            {user?.profileImage || user?.avatar ? (
              <img
                src={user.profileImage || user.avatar}
                alt={user.name || "User"}
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                {user?.name?.slice(0, 2).toUpperCase() || "U"}
              </div>
            )}
          </div>

          {/* USER INFO */}

          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-zinc-950">
              {user?.name || "User"}
            </h2>

            <div className="mt-0.5 flex items-center gap-1.5">
              {typing ? (
                <span className="text-xs text-zinc-500">typing...</span>
              ) : (
                <>
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      socketConnected ? "bg-emerald-500" : "bg-zinc-300"
                    }`}
                  />

                  <span className="text-xs text-zinc-500">
                    {socketConnected ? "Online" : "Connecting..."}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ACTIONS */}

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950"
          >
            <Phone size={18} />
          </button>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950"
          >
            <Video size={19} />
          </button>

          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 sm:flex"
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      {/* MESSAGES */}

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-4 py-6 sm:px-8"
      >
        <div className="mx-auto max-w-3xl space-y-3">
          {/* TODAY */}

          <div className="mb-6 flex justify-center">
            <span className="rounded-full bg-white px-3 py-1 text-[10px] font-medium text-zinc-400 shadow-sm ring-1 ring-zinc-200">
              Today
            </span>
          </div>

          {/* LOADING */}

          {loadingMessages ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-3">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-full border-2 border-zinc-200" />

                <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-zinc-950" />
              </div>

              <p className="text-sm font-medium text-zinc-500">
                Loading your chats...
              </p>
            </div>
          ) : messages.length === 0 ? (
            /* EMPTY */

            <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
                <Send size={18} className="text-zinc-400" />
              </div>

              <p className="text-sm font-medium text-zinc-600">
                No messages yet
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Send a message to start the conversation.
              </p>
            </div>
          ) : (
            /* MESSAGE LIST */

            messages.map((msg) => {
              const isMe = String(msg.senderId) === String(currentUserId);

              const replyTo = (
                msg as Message & {
                  replyTo?: Message | string | null;
                }
              ).replyTo;

              const replyMessage =
                typeof replyTo === "object" && replyTo ? replyTo : null;

              return (
                <div
                  key={msg._id}
                  className={`relative flex ${
                    isMe ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* MESSAGE ACTION MENU */}

                  {selectedMessage?._id === msg._id && (
                    <div
                      className={`absolute bottom-full z-20 mb-2 flex items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl ${
                        isMe ? "right-0" : "left-0"
                      }`}
                    >
                      {/* REPLY */}

                      <button
                        type="button"
                        onClick={() => handleReply(msg)}
                        className="flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
                      >
                        <Reply size={15} />

                        <span>Reply</span>
                      </button>

                      {/* EDIT */}

                      {isMe && (
                        <button
                          type="button"
                          onClick={() => {
                            console.log("Edit message:", msg._id);

                            setSelectedMessage(null);
                          }}
                          className="flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
                        >
                          <Pencil size={14} />

                          <span>Edit</span>
                        </button>
                      )}

                      {/* DELETE */}

                      <button
                        type="button"
                        onClick={() => {
                          console.log("Delete message:", msg._id);

                          setSelectedMessage(null);
                        }}
                        className="flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={14} />

                        <span>Delete</span>
                      </button>
                    </div>
                  )}

                  {/* MESSAGE */}

                  <div
                    onTouchStart={(e) => handleMessageTouchStart(e, msg)}
                    onTouchMove={handleMessageTouchMove}
                    onTouchEnd={(e) => handleMessageTouchEnd(e, msg)}
                    onTouchCancel={handleMessageTouchCancel}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      setSelectedMessage(msg);
                    }}
                    className={`
          max-w-[80%]
          sm:max-w-[65%]
          px-4 py-3
          select-none
          touch-pan-y
          transition
          ${
            selectedMessage?._id === msg._id
              ? "ring-2 ring-zinc-400 ring-offset-2"
              : ""
          }
          ${
            isMe
              ? "rounded-2xl rounded-br-md bg-zinc-950 text-white"
              : "rounded-2xl rounded-bl-md border border-zinc-200 bg-white text-zinc-900"
          }
        `}
                  >
                    {/* REPLIED MESSAGE */}

                    {replyMessage && (
                      <div
                        className={`mb-2 rounded-lg border-l-2 px-3 py-2 ${
                          isMe
                            ? "border-zinc-400 bg-zinc-800"
                            : "border-zinc-950 bg-zinc-50"
                        }`}
                      >
                        <p
                          className={`text-[10px] font-semibold ${
                            isMe ? "text-zinc-300" : "text-zinc-600"
                          }`}
                        >
                          Replied message
                        </p>

                        <p
                          className={`mt-0.5 line-clamp-2 text-xs ${
                            isMe ? "text-zinc-300" : "text-zinc-500"
                          }`}
                        >
                          {replyMessage.content}
                        </p>
                      </div>
                    )}

                    {/* MESSAGE TEXT */}

                    <p className="text-sm leading-5">{msg.content}</p>

                    {/* TIME */}

                    <div
                      className={`mt-1.5 text-[10px] ${
                        isMe ? "text-zinc-400" : "text-zinc-400"
                      }`}
                    >
                      {formatTime(msg.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* TYPING */}

          {typing && !loadingMessages && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md border border-zinc-200 bg-white px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />

                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" />

                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* INPUT */}

      <div className="mb-20 border-t border-zinc-200 bg-white p-3 sm:mb-12 sm:p-4">
        <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 focus-within:border-zinc-400 focus-within:bg-white">
          {/* ATTACHMENT */}

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-950"
          >
            <Paperclip size={19} />
          </button>

          {replyingTo && (
            <div className="mx-auto mb-2 flex max-w-3xl items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 shadow-sm">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                <Reply size={15} className="text-zinc-600" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
                  Replying to message
                </p>

                <p className="mt-0.5 truncate text-xs text-zinc-700">
                  {replyingTo.content}
                </p>
              </div>

              <button
                type="button"
                onClick={cancelReply}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* INPUT */}

          <input
            value={message}
            onChange={(e) => handleTyping(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Write a message..."
            disabled={!socketConnected}
            className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 disabled:cursor-not-allowed disabled:opacity-60"
          />

          {/* EMOJI */}

          <button
            type="button"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-950 sm:flex"
          >
            <Smile size={19} />
          </button>

          {/* SEND */}

          <button
            type="button"
            onClick={handleSend}
            disabled={!message.trim() || !socketConnected}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Send size={17} />
          </button>
        </div>

        <p className="mt-2 hidden text-center text-[10px] text-zinc-400 sm:block">
          Press Enter to send
        </p>
      </div>
    </section>
  );
}
