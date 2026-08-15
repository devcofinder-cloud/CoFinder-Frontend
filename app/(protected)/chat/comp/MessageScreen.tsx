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
    sendingMessage,
    fetchConversation,
    fetchMessages,
    sendNewMessage,
    setMessages,
    addMessage,
  } = useChatStore();

  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [currentUserId, setCurrentUserId] =
    useState<string | null>(null);

  const socketRef = useRef<Socket | null>(null);

  const typingTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
  |--------------------------------------------------------------------------
  | CURRENT USER
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("user");

      if (!storedUser) return;

      const user = JSON.parse(storedUser);

      if (user?._id) {
        setCurrentUserId(String(user._id));
      }
    } catch (error) {
      console.error(
        "Failed to read current user:",
        error,
      );
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
        if (cancelled) return;

        /*
         * Clear old messages immediately.
         * This prevents old conversation messages
         * from flashing while new conversation loads.
         */
        setMessages([]);

        await fetchConversation(
          conversationId,
        );

        if (cancelled) return;

        await fetchMessages(
          conversationId,
        );
      } catch (error) {
        console.error(
          "Failed to load chat:",
          error,
        );
      }
    };

    loadChat();

    return () => {
      cancelled = true;

      /*
       * Stop typing when leaving chat.
       */
      socketRef.current?.emit(
        "stop_typing",
        {
          conversationId,
        },
      );

      /*
       * Clear typing timeout.
       */
      if (typingTimeoutRef.current) {
        clearTimeout(
          typingTimeoutRef.current,
        );

        typingTimeoutRef.current = null;
      }

      setTyping(false);

      setMessages([]);
    };
  }, [
    conversationId,
    fetchConversation,
    fetchMessages,
    setMessages,
  ]);

  /*
  |--------------------------------------------------------------------------
  | SOCKET CONNECTION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!conversationId) return;

    if (!SOCKET_URL) {
      console.error(
        "NEXT_PUBLIC_SOCKET_URL is not configured",
      );

      return;
    }

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    socketRef.current = socket;

    /*
    |--------------------------------------------------------------------------
    | CONNECT
    |--------------------------------------------------------------------------
    */

    socket.on("connect", () => {
      console.log(
        "Socket connected:",
        socket.id,
      );

      socket.emit(
        "join_conversation",
        {
          conversationId,
        },
      );
    });

    /*
    |--------------------------------------------------------------------------
    | NEW MESSAGE
    |--------------------------------------------------------------------------
    */

    socket.on(
      "new_message",
      (newMessage: Message) => {
        /*
         * Ignore messages from other conversations.
         */
        if (
          newMessage.conversationId !==
          conversationId
        ) {
          return;
        }

        /*
         * Store handles duplicate prevention.
         */
        addMessage(newMessage);

        /*
         * If the other person sent a message,
         * stop typing indicator.
         */
        if (
          newMessage.senderId !==
          currentUserId
        ) {
          setTyping(false);
        }
      },
    );

    /*
    |--------------------------------------------------------------------------
    | TYPING
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
        if (id !== conversationId) {
          return;
        }

        /*
         * Don't show our own typing event.
         */
        if (
          userId &&
          currentUserId &&
          String(userId) ===
            String(currentUserId)
        ) {
          return;
        }

        setTyping(true);
      },
    );

    /*
    |--------------------------------------------------------------------------
    | STOP TYPING
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
        if (id !== conversationId) {
          return;
        }

        if (
          userId &&
          currentUserId &&
          String(userId) ===
            String(currentUserId)
        ) {
          return;
        }

        setTyping(false);
      },
    );

    /*
    |--------------------------------------------------------------------------
    | SOCKET ERROR
    |--------------------------------------------------------------------------
    */

    socket.on(
      "connect_error",
      (error) => {
        console.error(
          "Socket connection error:",
          error,
        );
      },
    );

    /*
    |--------------------------------------------------------------------------
    | MESSAGE ERROR
    |--------------------------------------------------------------------------
    */

    socket.on(
      "message_error",
      (error: {
        success?: boolean;
        message?: string;
      }) => {
        console.error(
          "Socket message error:",
          error?.message ||
            "Failed to send message",
        );
      },
    );

    /*
    |--------------------------------------------------------------------------
    | CLEANUP
    |--------------------------------------------------------------------------
    */

    return () => {
      socket.emit(
        "stop_typing",
        {
          conversationId,
        },
      );

      socket.emit(
        "leave_conversation",
        {
          conversationId,
        },
      );

      socket.disconnect();

      socketRef.current = null;

      setTyping(false);
    };
  }, [
    conversationId,
    addMessage,
    currentUserId,
  ]);

  /*
  |--------------------------------------------------------------------------
  | SEND MESSAGE
  |--------------------------------------------------------------------------
  */

  const handleSend = async () => {
    const text = message.trim();

    if (!text) return;

    if (!activeConversation) {
      return;
    }

    if (!currentUserId) {
      console.error(
        "Current user not found",
      );

      return;
    }

    if (sendingMessage) {
      return;
    }

    /*
     * Find receiver.
     */
    const receiver =
      activeConversation.participants.find(
        (participant) =>
          String(participant._id) !==
          String(currentUserId),
      );

    if (!receiver) {
      console.error(
        "Receiver not found",
      );

      return;
    }

    try {
      /*
       * Clear input immediately.
       */
      setMessage("");

      /*
       * Stop typing.
       */
      socketRef.current?.emit(
        "stop_typing",
        {
          conversationId,
        },
      );

      if (typingTimeoutRef.current) {
        clearTimeout(
          typingTimeoutRef.current,
        );

        typingTimeoutRef.current = null;
      }

      setTyping(false);

      /*
       * REST API saves the message.
       *
       * Socket will handle realtime
       * incoming messages.
       */
      const newMessage =
        await sendNewMessage({
          conversationId,
          receiverId: receiver._id,
          content: text,
          messageType: "text",
        });

      /*
       * If API failed, restore input.
       */
      if (!newMessage) {
        setMessage(text);
      }
    } catch (error) {
      console.error(
        "Failed to send message:",
        error,
      );

      setMessage(text);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | TYPING
  |--------------------------------------------------------------------------
  */

  const handleTyping = (
    value: string,
  ) => {
    setMessage(value);

    if (!conversationId) {
      return;
    }

    /*
     * Empty input means stop typing.
     */
    if (!value.trim()) {
      socketRef.current?.emit(
        "stop_typing",
        {
          conversationId,
        },
      );

      if (typingTimeoutRef.current) {
        clearTimeout(
          typingTimeoutRef.current,
        );

        typingTimeoutRef.current = null;
      }

      return;
    }

    /*
     * Tell other participant
     * that current user is typing.
     */
    socketRef.current?.emit(
      "typing",
      {
        conversationId,
      },
    );

    /*
     * Reset previous timeout.
     */
    if (typingTimeoutRef.current) {
      clearTimeout(
        typingTimeoutRef.current,
      );
    }

    /*
     * Automatically stop typing
     * after 1 second.
     */
    typingTimeoutRef.current =
      setTimeout(() => {
        socketRef.current?.emit(
          "stop_typing",
          {
            conversationId,
          },
        );

        typingTimeoutRef.current =
          null;
      }, 1000);
  };

  /*
  |--------------------------------------------------------------------------
  | OTHER PARTICIPANT
  |--------------------------------------------------------------------------
  */

  const getOtherParticipant = () => {
    if (
      !activeConversation?.participants
        ?.length
    ) {
      return null;
    }

    return (
      activeConversation.participants.find(
        (participant) =>
          String(participant._id) !==
          String(currentUserId),
      ) ||
      activeConversation
        .participants[0]
    );
  };

  const user =
    getOtherParticipant();

  /*
  |--------------------------------------------------------------------------
  | FORMAT TIME
  |--------------------------------------------------------------------------
  */

  const formatTime = (
    date?: string,
  ) => {
    if (!date) return "";

    return new Date(
      date,
    ).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  /*
  |--------------------------------------------------------------------------
  | INITIAL LOADING
  |--------------------------------------------------------------------------
  */

  if (!activeConversation) {
    return (
      <section
        className="
          flex min-w-0 flex-1
          items-center justify-center
          bg-zinc-50
        "
      >
        <div className="flex flex-col items-center gap-3">
          <div className="relative h-8 w-8">
            <div
              className="
                absolute inset-0
                rounded-full
                border-2 border-zinc-200
              "
            />

            <div
              className="
                absolute inset-0
                animate-spin
                rounded-full
                border-2 border-transparent
                border-t-zinc-950
              "
            />
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

      <header
        className="
          flex h-[76px] shrink-0
          items-center justify-between
          border-b border-zinc-200
          bg-white px-4 sm:px-6
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-lg text-zinc-600
                hover:bg-zinc-100
                md:hidden
              "
              type="button"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          {/* AVATAR */}

          <div className="relative shrink-0">
            {user?.profileImage ||
            user?.avatar ? (
              <img
                src={
                  user.profileImage ||
                  user.avatar
                }
                alt={
                  user.name ||
                  "User"
                }
                className="
                  h-11 w-11
                  rounded-full
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-full bg-zinc-950
                  text-sm font-semibold
                  text-white
                "
              >
                {user?.name
                  ?.slice(0, 2)
                  .toUpperCase() ||
                  "U"}
              </div>
            )}
          </div>

          {/* USER INFO */}

          <div className="min-w-0">
            <h2
              className="
                truncate text-sm
                font-bold text-zinc-950
              "
            >
              {user?.name ||
                "User"}
            </h2>

            <div className="mt-0.5 flex items-center gap-1.5">
              {typing ? (
                <span className="text-xs text-zinc-500">
                  typing...
                </span>
              ) : (
                <>
                  <span
                    className="
                      h-1.5 w-1.5
                      rounded-full
                      bg-zinc-300
                    "
                  />

                  <span className="text-xs text-zinc-500">
                    Online
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
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg text-zinc-500
              transition hover:bg-zinc-100
              hover:text-zinc-950
            "
          >
            <Phone size={18} />
          </button>

          <button
            type="button"
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg text-zinc-500
              transition hover:bg-zinc-100
              hover:text-zinc-950
            "
          >
            <Video size={19} />
          </button>

          <button
            type="button"
            className="
              hidden h-9 w-9
              items-center justify-center
              rounded-lg text-zinc-500
              transition hover:bg-zinc-100
              hover:text-zinc-950
              sm:flex
            "
          >
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      {/* MESSAGES */}

      <div
        className="
          flex-1 overflow-y-auto
          px-4 py-6 sm:px-8
        "
      >
        <div className="mx-auto max-w-3xl space-y-3">
          {/* TODAY */}

          <div className="mb-6 flex justify-center">
            <span
              className="
                rounded-full bg-white
                px-3 py-1
                text-[10px] font-medium
                text-zinc-400
                shadow-sm
                ring-1 ring-zinc-200
              "
            >
              Today
            </span>
          </div>

          {/* LOADING */}

          {loadingMessages ? (
            <div
              className="
                flex min-h-[300px]
                flex-col
                items-center
                justify-center
                gap-3
              "
            >
              <div className="relative h-8 w-8">
                <div
                  className="
                    absolute inset-0
                    rounded-full
                    border-2 border-zinc-200
                  "
                />

                <div
                  className="
                    absolute inset-0
                    animate-spin
                    rounded-full
                    border-2
                    border-transparent
                    border-t-zinc-950
                  "
                />
              </div>

              <p
                className="
                  text-sm font-medium
                  text-zinc-500
                "
              >
                Loading your chats...
              </p>
            </div>
          ) : messages.length === 0 ? (
            /* EMPTY STATE */

            <div
              className="
                flex min-h-[300px]
                flex-col
                items-center
                justify-center
                text-center
              "
            >
              <div
                className="
                  mb-3 flex h-12 w-12
                  items-center justify-center
                  rounded-full
                  bg-zinc-100
                "
              >
                <Send
                  size={18}
                  className="text-zinc-400"
                />
              </div>

              <p className="text-sm font-medium text-zinc-600">
                No messages yet
              </p>

              <p className="mt-1 text-xs text-zinc-400">
                Send a message to start
                the conversation.
              </p>
            </div>
          ) : (
            /* MESSAGE LIST */

            messages.map((msg) => {
              const isMe =
                String(
                  msg.senderId,
                ) ===
                String(
                  currentUserId,
                );

              return (
                <div
                  key={msg._id}
                  className={`flex ${
                    isMe
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`
                      max-w-[80%]
                      sm:max-w-[65%]
                      ${
                        isMe
                          ? `
                            rounded-2xl
                            rounded-br-md
                            bg-zinc-950
                            text-white
                          `
                          : `
                            rounded-2xl
                            rounded-bl-md
                            border
                            border-zinc-200
                            bg-white
                            text-zinc-900
                          `
                      }
                      px-4 py-3
                    `}
                  >
                    <p className="text-sm leading-5">
                      {msg.content}
                    </p>

                    <div
                      className={`
                        mt-1.5
                        text-[10px]
                        ${
                          isMe
                            ? "text-zinc-400"
                            : "text-zinc-400"
                        }
                      `}
                    >
                      {formatTime(
                        msg.createdAt,
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* TYPING INDICATOR */}

          {typing &&
            !loadingMessages && (
              <div className="flex justify-start">
                <div
                  className="
                    rounded-2xl
                    rounded-bl-md
                    border border-zinc-200
                    bg-white
                    px-4 py-3
                  "
                >
                  <div className="flex gap-1">
                    <span
                      className="
                        h-1.5 w-1.5
                        animate-bounce
                        rounded-full
                        bg-zinc-400
                      "
                    />

                    <span
                      className="
                        h-1.5 w-1.5
                        animate-bounce
                        rounded-full
                        bg-zinc-400
                        [animation-delay:150ms]
                      "
                    />

                    <span
                      className="
                        h-1.5 w-1.5
                        animate-bounce
                        rounded-full
                        bg-zinc-400
                        [animation-delay:300ms]
                      "
                    />
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

      {/* INPUT */}

      <div
        className="
          mb-20 border-t border-zinc-200
          bg-white p-3
          sm:mb-12 sm:p-4
        "
      >
        <div
          className="
            mx-auto flex max-w-3xl
            items-end gap-2
            rounded-2xl
            border border-zinc-200
            bg-zinc-50 p-2
            focus-within:border-zinc-400
            focus-within:bg-white
          "
        >
          {/* ATTACHMENT */}

          <button
            type="button"
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl text-zinc-500
              transition hover:bg-zinc-200
              hover:text-zinc-950
            "
          >
            <Paperclip size={19} />
          </button>

          {/* INPUT */}

          <input
            value={message}
            onChange={(e) =>
              handleTyping(
                e.target.value,
              )
            }
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {
                e.preventDefault();

                handleSend();
              }
            }}
            placeholder="Write a message..."
            disabled={sendingMessage}
            className="
              min-w-0 flex-1
              bg-transparent
              px-2 py-2.5
              text-sm text-zinc-900
              outline-none
              placeholder:text-zinc-400
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          />

          {/* EMOJI */}

          <button
            type="button"
            className="
              hidden h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl text-zinc-500
              transition hover:bg-zinc-200
              hover:text-zinc-950
              sm:flex
            "
          >
            <Smile size={19} />
          </button>

          {/* SEND */}

          <button
            type="button"
            onClick={handleSend}
            disabled={
              !message.trim() ||
              sendingMessage
            }
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              bg-zinc-950
              text-white
              transition
              hover:bg-zinc-800
              disabled:cursor-not-allowed
              disabled:opacity-30
            "
          >
            {sendingMessage ? (
              <div
                className="
                  h-4 w-4
                  animate-spin
                  rounded-full
                  border-2
                  border-white/30
                  border-t-white
                "
              />
            ) : (
              <Send size={17} />
            )}
          </button>
        </div>

        <p
          className="
            mt-2 hidden
            text-center
            text-[10px]
            text-zinc-400
            sm:block
          "
        >
          Press Enter to send
        </p>
      </div>
    </section>
  );
}