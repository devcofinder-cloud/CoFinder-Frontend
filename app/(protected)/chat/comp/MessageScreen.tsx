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
  FileText,
} from "lucide-react";

import { Message } from "@/app/services/chat.service";
import { useChatStore } from "@/app/store/chatStore";
import MediaViewer from "./MediaViewer";
import PdfViewer from "./PdfViewer";

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
    editExistingMessage,
    deleteExistingMessage,
    sendNewMessage,
  } = useChatStore();

  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [editModal, setEditModal] = useState(false);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [editText, setEditText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSendingFile, setIsSendingFile] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const longPressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isLongPressRef = useRef(false);
  const socketRef = useRef<Socket | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  const [mediaViewer, setMediaViewer] = useState<{
    url: string;
    type: "image" | "video";
    name?: string;
  } | null>(null);

  const [pdfViewer, setPdfViewer] = useState<{
    url: string;
    name?: string;
  } | null>(null);

  useEffect(() => {
    if (!selectedFile || !selectedFile.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile]);

  // Load current user from localStorage
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

  // Load conversation + messages
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

  // Auto scroll to bottom on new messages / typing indicator
  useEffect(() => {
    const container = messagesContainerRef.current;

    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [messages, typing]);

  // Socket connection lifecycle
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

    const socket = io(SOCKET_URL, {
      transports: ["websocket"],
      auth: { token },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setSocketConnected(true);
      socket.emit("join_conversation", { conversationId });
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection error:", error.message);
      setSocketConnected(false);
    });

    socket.on("disconnect", () => {
      setSocketConnected(false);
    });

    socket.on("new_message", (newMessage) => {
      console.log("🔥 SOCKET MESSAGE:", newMessage);
      console.log("📎 ATTACHMENT:", newMessage.attachment);
      console.log("📦 MESSAGE TYPE:", newMessage.messageType);
      const incomingConversationId =
        newMessage.conversationId ||
        newMessage.conversation?._id ||
        newMessage.conversation;

      if (!incomingConversationId) {
        console.error("Conversation ID missing from socket message");
        return;
      }

      if (String(incomingConversationId) !== String(conversationId)) {
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

      addMessage(normalizedMessage);

      if (String(senderId) !== String(currentUserId)) {
        setTyping(false);
      }
    });

    socket.on(
      "user_typing",
      ({
        conversationId: id,
        userId,
      }: {
        conversationId: string;
        userId?: string;
      }) => {
        if (String(id) !== String(conversationId)) return;
        if (userId && String(userId) === String(currentUserId)) return;

        setTyping(true);
      },
    );

    socket.on(
      "user_stop_typing",
      ({
        conversationId: id,
        userId,
      }: {
        conversationId: string;
        userId?: string;
      }) => {
        if (String(id) !== String(conversationId)) return;
        if (userId && String(userId) === String(currentUserId)) return;

        setTyping(false);
      },
    );

    socket.on("message_edited", (updatedMessage) => {
      const incomingConversationId =
        updatedMessage.conversationId ||
        updatedMessage.conversation?._id ||
        updatedMessage.conversation;

      if (!incomingConversationId) {
        console.error("Conversation ID missing in edited message");
        return;
      }

      if (String(incomingConversationId) !== String(conversationId)) {
        return;
      }

      const messageId = updatedMessage._id;

      if (!messageId) {
        console.error("Edited message ID missing");
        return;
      }

      const content = updatedMessage.content;

      if (typeof content !== "string") {
        console.error("Edited message content missing");
        return;
      }

      editExistingMessage(String(messageId), content);
    });

    socket.on(
      "message_error",
      (error: { success?: boolean; message?: string }) => {
        console.error(
          "Message error:",
          error?.message || "Failed to send message",
        );
      },
    );

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }

      socket.emit("stop_typing", { conversationId });
      socket.emit("leave_conversation", { conversationId });

      socket.removeAllListeners();
      socket.disconnect();

      socketRef.current = null;

      setSocketConnected(false);
      setTyping(false);
    };
  }, [conversationId, currentUserId, addMessage, editExistingMessage]);

  const handleReply = (msg: Message) => {
    setReplyingTo(msg);
    setSelectedMessage(null);
  };

  const handleEdit = (msg: Message) => {
    if (String(msg.senderId) !== String(currentUserId)) return;
    if (msg.messageType !== "text") return;
    if (msg.isDeleted) return;

    setEditingMessage(msg);
    setEditText(msg.content || "");
    setSelectedMessage(null);
    setEditModal(true);
  };

  const closeEditModal = () => {
    if (isEditing) return;

    setEditModal(false);
    setEditingMessage(null);
    setEditText("");
  };

  const handleSaveEdit = async () => {
    const text = editText.trim();

    if (!text) return;
    if (!editingMessage?._id) return;

    if (text === editingMessage.content) {
      closeEditModal();
      return;
    }

    try {
      setIsEditing(true);

      const updatedMessage = await editExistingMessage(
        editingMessage._id,
        text,
      );

      if (!updatedMessage) {
        console.error("Message edit failed");
        return;
      }

      closeEditModal();
    } catch (error) {
      console.error("Failed to edit message:", error);
    } finally {
      setIsEditing(false);
    }
  };

  // Long press to open the message action menu (mobile)
  const handleMessageTouchStart = (e: React.TouchEvent, msg: Message) => {
    const touch = e.touches[0];

    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    isLongPressRef.current = false;

    longPressTimerRef.current = setTimeout(() => {
      isLongPressRef.current = true;
      setSelectedMessage(msg);

      if (navigator.vibrate) {
        navigator.vibrate(40);
      }
    }, 500);
  };

  const handleMessageTouchMove = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) {
      return;
    }

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartXRef.current;
    const deltaY = touch.clientY - touchStartYRef.current;

    // Cancel long press once the finger moves too far
    if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
    }

    // Swipe right to reply
    if (deltaX > 70 && Math.abs(deltaY) < 50) {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }

      touchStartXRef.current = null;
    }
  };

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

    if (deltaX > 70 && Math.abs(deltaY) < 50 && !isLongPressRef.current) {
      handleReply(msg);
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleMessageTouchCancel = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const cancelReply = () => {
    setReplyingTo(null);
  };

  const getReceiver = () => {
    return activeConversation?.participants?.find(
      (participant) => String(participant._id) !== String(currentUserId),
    );
  };

  const getMessageType = (file: File) => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    return "file";
  };

  // Uploads the currently selected attachment
  const sendAttachment = async (file: File) => {
    if (!conversationId) {
      console.error("Conversation ID missing");
      return;
    }

    if (!currentUserId) {
      console.error("Current user ID missing");
      return;
    }

    const receiver = getReceiver();

    if (!receiver?._id) {
      console.error("Receiver not found");
      return;
    }

    const socket = socketRef.current;

    if (!socket || !socket.connected) {
      console.error("Socket is not connected");
      return;
    }

    try {
      setIsSendingFile(true);

      const arrayBuffer = await file.arrayBuffer();

      const payload = {
        conversationId: String(conversationId),
        receiverId: String(receiver._id),
        content: "",
        messageType: getMessageType(file),

        replyTo: replyingTo?._id ? String(replyingTo._id) : null,

        attachment: {
          name: file.name,
          type: file.type,
          size: file.size,

          // ArrayBuffer socket.io se transmit ho jayega
          buffer: arrayBuffer,
        },
      };

      socket.emit("sendMessage", payload);

      setSelectedFile(null);
      setReplyingTo(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Failed to send attachment:", error);
    } finally {
      setIsSendingFile(false);
    }
  };

  const handleSend = () => {
    // Sending an attachment takes priority over the text field
    if (selectedFile) {
      sendAttachment(selectedFile);
      return;
    }

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

    const receiver = getReceiver();

    if (!receiver?._id) {
      console.error("Receiver not found");
      return;
    }

    socket.emit("stop_typing", { conversationId, userId: currentUserId });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    setTyping(false);

    const payload = {
      conversationId: String(conversationId),
      receiverId: String(receiver._id),
      content: text,
      messageType: "text",
      ...(replyingTo?._id ? { replyTo: String(replyingTo._id) } : {}),
    };

    socket.emit("sendMessage", payload);

    setMessage("");
    setReplyingTo(null);
  };

  const handleTyping = (value: string) => {
    setMessage(value);

    const socket = socketRef.current;

    if (!socket || !socket.connected) return;

    if (!value.trim()) {
      socket.emit("stop_typing", { conversationId });

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }

      return;
    }

    socket.emit("typing", { conversationId });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", { conversationId });
      typingTimeoutRef.current = null;
    }, 1000);
  };

  const getOtherParticipant = () => {
    if (!activeConversation?.participants?.length) return null;

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

  // if (!activeConversation) {
  //   return (
  //     <section className="flex min-w-0 flex-1 items-center justify-center bg-zinc-50">
  //       <div className="flex flex-col items-center gap-3">
  //         <div className="relative h-8 w-8">
  //           <div className="absolute inset-0 rounded-full border-2 border-zinc-200" />
  //           <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-zinc-950" />
  //         </div>

  //         <p className="text-sm font-medium text-zinc-500">
  //           Loading your chat...
  //         </p>
  //       </div>
  //     </section>
  //   );
  // }

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
          <div className="mb-6 flex justify-center">
            <span className="rounded-full bg-white px-3 py-1 text-[10px] font-medium text-zinc-400 shadow-sm ring-1 ring-zinc-200">
              Today
            </span>
          </div>

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
            messages.map((msg) => {
              const isMe = String(msg.senderId) === String(currentUserId);

              const replyTo = (
                msg as Message & { replyTo?: Message | string | null }
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
                  {selectedMessage?._id === msg._id && (
                    <div
                      className={`absolute bottom-full z-20 mb-2 flex items-center gap-1 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-xl ${
                        isMe ? "right-0" : "left-0"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleReply(msg)}
                        className="flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
                      >
                        <Reply size={15} />
                        <span>Reply</span>
                      </button>

                      {isMe && msg.messageType === "text" && !msg.isDeleted && (
                        <button
                          type="button"
                          onClick={() => handleEdit(msg)}
                          className="flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100"
                        >
                          <Pencil size={14} />
                          <span>Edit</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          deleteExistingMessage(msg._id);
                          setSelectedMessage(null);
                        }}
                        className="flex h-9 items-center gap-2 rounded-lg px-3 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}

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

                    {/* REPLY */}
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
                          {replyMessage.content ||
                            replyMessage.attachment?.name ||
                            "Attachment"}
                        </p>
                      </div>
                    )}

                    {/* ATTACHMENT */}
                    {msg.attachment && (
                      <div className="mb-2">
                        {msg.messageType === "image" ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();

                              setMediaViewer({
                                url: msg.attachment!.url,
                                type: "image",
                                name: msg.attachment!.name,
                              });
                            }}
                            className="block overflow-hidden rounded-xl"
                          >
                            <img
                              src={msg.attachment.url}
                              alt={msg.attachment.name || "Image"}
                              className="max-h-72 max-w-full rounded-xl object-cover transition duration-200 active:scale-[0.98]"
                            />
                          </button>
                        ) : msg.messageType === "video" ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();

                              setMediaViewer({
                                url: msg.attachment!.url,
                                type: "video",
                                name: msg.attachment!.name,
                              });
                            }}
                            className="block overflow-hidden rounded-xl"
                          >
                            <video
                              src={msg.attachment.url}
                              muted
                              playsInline
                              className="max-h-72 max-w-full rounded-xl object-cover"
                            />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();

                              if (
                                msg.attachment!.type === "application/pdf" ||
                                msg
                                  .attachment!.name?.toLowerCase()
                                  .endsWith(".pdf")
                              ) {
                                setPdfViewer({
                                  url: msg.attachment!.url,
                                  name: msg.attachment!.name,
                                });

                                return;
                              }

                              window.open(
                                msg.attachment!.url,
                                "_blank",
                                "noopener,noreferrer",
                              );
                            }}
                            className={`flex min-w-[220px] max-w-[300px] items-center gap-3 rounded-xl p-3 text-left transition ${
                              isMe
                                ? "bg-zinc-800 hover:bg-zinc-700"
                                : "bg-zinc-100 hover:bg-zinc-200"
                            }`}
                          >
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                                isMe ? "bg-zinc-700" : "bg-white"
                              }`}
                            >
                              <FileText
                                size={19}
                                className={
                                  isMe ? "text-white" : "text-zinc-700"
                                }
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <p
                                className={`truncate text-xs font-semibold ${
                                  isMe ? "text-white" : "text-zinc-900"
                                }`}
                              >
                                {msg.attachment.name}
                              </p>

                              <p
                                className={`mt-0.5 text-[10px] ${
                                  isMe ? "text-zinc-400" : "text-zinc-500"
                                }`}
                              >
                                {msg.attachment.type
                                  ?.split("/")?.[1]
                                  ?.toUpperCase() || "FILE"}
                                {" • "}
                                {(msg.attachment.size / 1024 / 1024).toFixed(
                                  2,
                                )}{" "}
                                MB
                              </p>
                            </div>
                          </button>
                        )}
                      </div>
                    )}

                    {/* TEXT */}
                    {msg.content && (
                      <p className="text-sm leading-5">
                        {msg.content}

                        {msg.isEdited && !msg.isDeleted && (
                          <span className="ml-1.5 text-[10px] text-zinc-400">
                            (edited)
                          </span>
                        )}
                      </p>
                    )}

                    <div className="mt-1.5 text-[10px] text-zinc-400">
                      {formatTime(msg.createdAt)}
                    </div>
                  </div>
                </div>
              );
            })
          )}

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

        {selectedFile && (
          <div className="mx-auto mb-2 max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
            {selectedFile.type.startsWith("image/") && previewUrl ? (
              <div className="relative bg-zinc-950">
                <img
                  src={previewUrl}
                  alt={selectedFile.name}
                  className="mx-auto max-h-[280px] w-full object-contain"
                />

                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);

                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  disabled={isSendingFile}
                  className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition active:scale-90 disabled:opacity-40"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
                  <FileText size={19} className="text-zinc-600" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-zinc-900">
                    {selectedFile.name}
                  </p>

                  <p className="mt-0.5 text-[10px] text-zinc-400">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);

                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }
                  }}
                  disabled={isSendingFile}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 transition active:scale-90 hover:bg-zinc-100 hover:text-zinc-900"
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 focus-within:border-zinc-400 focus-within:bg-white">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              if (file.size > 50 * 1024 * 1024) {
                alert("Maximum file size is 50MB");
                e.target.value = "";
                return;
              }

              setSelectedFile(file);
            }}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-950"
          >
            <Paperclip size={19} />
          </button>

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

          <button
            type="button"
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-950 sm:flex"
          >
            <Smile size={19} />
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={
              (!message.trim() && !selectedFile) ||
              (!socketConnected && !selectedFile) ||
              isSendingFile
            }
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Send size={17} />
          </button>
        </div>

        <p className="mt-2 hidden text-center text-[10px] text-zinc-400 sm:block">
          Press Enter to send
        </p>
      </div>

      {editModal && editingMessage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !isEditing) {
              closeEditModal();
            }
          }}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-4">
              <div>
                <h3 className="text-base font-bold text-zinc-950">
                  Edit message
                </h3>

                <p className="mt-0.5 text-xs text-zinc-500">
                  Update your message
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={isEditing}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-950 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <X size={17} />
              </button>
            </div>

            <div className="p-5">
              <textarea
                autoFocus
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                disabled={isEditing}
                rows={4}
                maxLength={5000}
                placeholder="Edit your message..."
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    closeEditModal();
                  }

                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSaveEdit();
                  }
                }}
                className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-3 text-sm leading-5 text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
              />

              <div className="mt-2 flex items-center justify-between">
                <span className="text-[10px] text-zinc-400">
                  Press Enter to save
                </span>

                <span className="text-[10px] text-zinc-400">
                  {editText.length}/5000
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-zinc-100 bg-zinc-50 px-5 py-3">
              <button
                type="button"
                onClick={closeEditModal}
                disabled={isEditing}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={
                  isEditing ||
                  !editText.trim() ||
                  editText.trim() === editingMessage.content
                }
                className="flex min-w-[110px] items-center justify-center rounded-xl bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isEditing ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-white" />
                ) : (
                  "Save changes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <MediaViewer
        isOpen={!!mediaViewer}
        onClose={() => setMediaViewer(null)}
        url={mediaViewer?.url || ""}
        type={mediaViewer?.type || "image"}
        name={mediaViewer?.name}
      />

      <PdfViewer
        isOpen={!!pdfViewer}
        onClose={() => setPdfViewer(null)}
        url={pdfViewer?.url || ""}
        name={pdfViewer?.name}
      />
    </section>
  );
}
