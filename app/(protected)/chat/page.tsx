"use client";

import { useState } from "react";
import {
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  ArrowLeft,
} from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Rahul Sharma",
    message: "Bro project complete ho gaya?",
    time: "10:42 PM",
    unread: 2,
    online: true,
    initials: "RS",
  },
  {
    id: 2,
    name: "Priya Singh",
    message: "Okay, kal discuss karte hain.",
    time: "9:18 PM",
    unread: 0,
    online: true,
    initials: "PS",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    message: "Thanks bro!",
    time: "8:45 PM",
    unread: 0,
    online: false,
    initials: "AM",
  },
  {
    id: 4,
    name: "Karan Verma",
    message: "Can you send me the files?",
    time: "Yesterday",
    unread: 0,
    online: false,
    initials: "KV",
  },
];

const messages = [
  {
    id: 1,
    sender: "other",
    text: "Bhai kya scene hai?",
    time: "10:35 PM",
  },
  {
    id: 2,
    sender: "me",
    text: "Bas bhai project pe laga hua hu.",
    time: "10:36 PM",
  },
  {
    id: 3,
    sender: "other",
    text: "Bro project complete ho gaya?",
    time: "10:40 PM",
  },
  {
    id: 4,
    sender: "me",
    text: "Almost. Bas chat wala section complete kar raha hu.",
    time: "10:41 PM",
  },
  {
    id: 5,
    sender: "other",
    text: "Perfect 🔥",
    time: "10:42 PM",
  },
];

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState(conversations[0]);
  const [message, setMessage] = useState("");
  const [mobileChat, setMobileChat] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;

    console.log("Message:", message);
    setMessage("");
  };

  return (
    <div className="h-[calc(100vh-0px)] w-full bg-zinc-50 sm:p-5 ">
      <div className="mx-auto flex h-full max-w-[1500px] overflow-hidden sm:rounded  border border-zinc-200 bg-white shadow-sm">

        {/* ================= SIDEBAR ================= */}
        <aside
          className={`
            w-full shrink-0 border-r border-zinc-200 bg-white
            md:w-[340px] lg:w-[380px]
            ${mobileChat ? "hidden md:block" : "block"}
          `}
        >
          {/* Sidebar Header */}
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

              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 text-zinc-600 transition hover:bg-zinc-950 hover:text-white">
                <MoreVertical size={18} />
              </button>
            </div>

            {/* Search */}
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                type="text"
                placeholder="Search conversations..."
                className="h-11 w-full rounded-xl border border-zinc-200 bg-zinc-50 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="h-[calc(100%-145px)] overflow-y-auto">
            {conversations.map((chat) => (
              <button
                key={chat.id}
                onClick={() => {
                  setActiveChat(chat);
                  setMobileChat(true);
                }}
                className={`
                  flex w-full items-center gap-3 border-b border-zinc-100 px-4 py-4 text-left transition
                  ${
                    activeChat.id === chat.id
                      ? "bg-zinc-100"
                      : "hover:bg-zinc-50"
                  }
                `}
              >
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
                    {chat.initials}
                  </div>

                  {chat.online && (
                    <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-zinc-700" />
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-semibold text-zinc-900">
                      {chat.name}
                    </h3>

                    <span className="shrink-0 text-[11px] text-zinc-400">
                      {chat.time}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between gap-2">
                    <p className="truncate text-xs text-zinc-500">
                      {chat.message}
                    </p>

                    {chat.unread > 0 && (
                      <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-zinc-950 px-1.5 text-[10px] font-bold text-white">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* ================= CHAT AREA ================= */}
        <section
          className={`
            min-w-0 flex-1 flex-col bg-zinc-50
            ${mobileChat ? "flex" : "hidden md:flex"}
          `}
        >
          {/* Chat Header */}
          <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-zinc-200 bg-white px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              {/* Mobile Back */}
              <button
                onClick={() => setMobileChat(false)}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 md:hidden"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="relative shrink-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                  {activeChat.initials}
                </div>

                {activeChat.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-zinc-700" />
                )}
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-sm font-bold text-zinc-950">
                  {activeChat.name}
                </h2>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      activeChat.online ? "bg-zinc-700" : "bg-zinc-300"
                    }`}
                  />

                  <span className="text-xs text-zinc-500">
                    {activeChat.online ? "Online" : "Offline"}
                  </span>
                </div>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              <button className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950">
                <Phone size={18} />
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950">
                <Video size={19} />
              </button>

              <button className="hidden h-9 w-9 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-950 sm:flex">
                <MoreVertical size={18} />
              </button>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
            <div className="mx-auto max-w-3xl space-y-3">
              
              {/* Date */}
              <div className="mb-6 flex justify-center">
                <span className="rounded-full bg-white px-3 py-1 text-[10px] font-medium text-zinc-400 shadow-sm ring-1 ring-zinc-200">
                  Today
                </span>
              </div>

              {messages.map((msg) => {
                const isMe = msg.sender === "me";

                return (
                  <div
                    key={msg.id}
                    className={`flex ${
                      isMe ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                        max-w-[80%] sm:max-w-[65%]
                        ${
                          isMe
                            ? "rounded-2xl rounded-br-md bg-zinc-950 text-white"
                            : "rounded-2xl rounded-bl-md border border-zinc-200 bg-white text-zinc-900"
                        }
                        px-4 py-3
                      `}
                    >
                      <p className="text-sm leading-5">{msg.text}</p>

                      <div
                        className={`mt-1.5 text-[10px] ${
                          isMe ? "text-zinc-400" : "text-zinc-400"
                        }`}
                      >
                        {msg.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-zinc-200 bg-white p-3 sm:p-4 b-20 mb-20 sm:mb-12">
            <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-2 focus-within:border-zinc-400 focus-within:bg-white">
              <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-950">
                <Paperclip size={19} />
              </button>

              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                placeholder="Write a message..."
                className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
              />

              <button className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl text-zinc-500 transition hover:bg-zinc-200 hover:text-zinc-950 sm:flex">
                <Smile size={19} />
              </button>

              <button
                onClick={handleSend}
                disabled={!message.trim()}
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
      </div>
    </div>
  );
}