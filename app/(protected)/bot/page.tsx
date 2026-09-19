"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUp,
  Plus,
  Sparkles,
  Mic,
  MoreHorizontal,
  RotateCcw,
  Lightbulb,
  Users,
  Rocket,
  UserRound,
} from "lucide-react";

import NovaSplash from "./comp/BotSplash";
import { chatWithAI } from "@/app/services/chatBot.service";
import MaintenanceState from "./comp/Maintainance";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  {
    icon: UserRound,
    title: "Improve my profile",
    text: "Make my founder profile stronger",
  },
  {
    icon: Users,
    title: "Find my co-founder",
    text: "Help me find the right match",
  },
  {
    icon: Rocket,
    title: "Validate my idea",
    text: "Let's evaluate my startup idea",
  },
  {
    icon: Lightbulb,
    title: "What should I do next?",
    text: "Give me my next best move",
  },
];

export default function AIPage() {
  const [showSplash, setShowSplash] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);

  const sendMessage = async (text?: string) => {
    const message = (text ?? input).trim();

    if (!message || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: message,
    };

    const history = messages.map((item) => ({
      role: item.role,
      content: item.content,
    }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await chatWithAI({
        message,
        history,
      });

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.reply || "I couldn't generate a response right now.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMaintenanceMode(true);
      console.error("AI Chat Error:", error);

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Sorry, I'm unable to connect to the Co-Finder AI right now.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
    setIsTyping(false);
  };

  if (showSplash) {
    return <NovaSplash />;
  }

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      {/* ================================================= */}
      {/* DESKTOP FRAME */}
      {/* ================================================= */}

      <div className="mx-auto flex min-h-screen w-full max-w-[1500px]">
        {/* ================================================= */}
        {/* LEFT SIDE — DESKTOP ONLY */}
        {/* ================================================= */}

        <aside className="hidden w-[250px] shrink-0 border-r border-zinc-100 px-5 py-6 lg:flex lg:flex-col">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-zinc-950">
              <Image
                src="/images/bot1.png"
                alt="Nova"
                fill
                className="object-contain"
              />
            </div>

            <div>
              <p className="text-sm font-semibold tracking-tight">NOVA</p>

              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-zinc-400">Online</span>
              </div>
            </div>
          </div>

          {/* New chat */}
          <button
            onClick={resetChat}
            className="mt-9 flex h-11 items-center gap-3 rounded-xl border border-zinc-200 px-3.5 text-sm text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50"
          >
            <Plus className="h-4 w-4" />
            New conversation
          </button>

          {/* Navigation */}
          <div className="mt-8">
            <p className="mb-3 px-2 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-400">
              Explore
            </p>

            <div className="space-y-1">
              <button className="flex w-full items-center gap-3 rounded-xl bg-zinc-950 px-3 py-2.5 text-left text-sm text-white">
                <Sparkles className="h-4 w-4" />
                Co-Finder AI
              </button>

              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900">
                <Users className="h-4 w-4" />
                Co-founder matching
              </button>

              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-900">
                <Rocket className="h-4 w-4" />
                Startup ideas
              </button>
            </div>
          </div>

          {/* Bottom info */}
          <div className="mt-auto rounded-2xl bg-zinc-50 p-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-zinc-500" />

              <span className="text-[11px] font-medium text-zinc-600">
                Founder Copilot
              </span>
            </div>

            <p className="mt-2 text-[11px] leading-5 text-zinc-400">
              Ask Nova about your profile, startup, co-founder search or next
              move.
            </p>
          </div>
        </aside>

        {/* ================================================= */}
        {/* MAIN */}
        {/* ================================================= */}

        <section className="relative flex min-h-screen min-w-0 flex-1 flex-col">
          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-zinc-100 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              {/* Mobile bot */}
              <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-zinc-950 lg:hidden">
                <Image
                  src="/images/bot1.png"
                  alt="Nova"
                  fill
                  className="object-contain"
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-[15px] font-semibold tracking-tight">
                    Co-Finder
                  </h1>

                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-zinc-500">
                    AI
                  </span>
                </div>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                  <span className="text-[10px] text-zinc-400">
                    Your founder copilot
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={resetChat}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
                aria-label="New conversation"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              <button
                className="flex h-9 w-9 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
                aria-label="More"
              >
                <MoreHorizontal className="h-5 w-5" />
              </button>
            </div>
          </header>

          {/* ================================================= */}
          {/* CHAT AREA */}
          {/* ================================================= */}

          {maintenanceMode ? (
            <MaintenanceState
              onRetry={() => {
                setMaintenanceMode(false);
                setMessages([]);
                setInput("");
              }}
            />
          ) : (
            <div className="flex-1 overflow-y-auto">
              <div className="mx-auto w-full max-w-3xl px-4 pb-36 pt-8 sm:px-6 sm:pt-12">
                {/* ================================================= */}
                {/* EMPTY STATE */}
                {/* ================================================= */}

                {messages.length === 0 && (
                  <div className="flex min-h-[calc(100vh-210px)] flex-col">
                    {/* Bot Hero */}
                    <div className="flex flex-col items-center text-center">
                      <div className="relative h-[125px] w-[125px] sm:h-[145px] sm:w-[145px]">
                        <div className="absolute inset-4 rounded-full bg-zinc-100 blur-2xl" />

                        <Image
                          src="/images/bot1.png"
                          alt="Nova AI"
                          fill
                          className="relative z-10 object-contain"
                        />
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/40" />
                          <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </span>

                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-400">
                          Co-Finder is ready
                        </span>
                      </div>

                      <h2 className="mt-5 max-w-[500px] text-[30px] font-semibold leading-[1.08] tracking-[-0.04em] text-zinc-950 sm:text-[42px]">
                        What are we building today?
                      </h2>

                      <p className="mt-4 max-w-[440px] text-[13px] leading-6 text-zinc-400 sm:text-sm">
                        Think of me as your founder copilot. I can help you find
                        the right co-founder, improve your profile and make
                        smarter startup decisions.
                      </p>
                    </div>

                    {/* ================================================= */}
                    {/* SUGGESTIONS */}
                    {/* ================================================= */}

                    <div className="mt-10 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {suggestions.map((item) => {
                        const Icon = item.icon;

                        return (
                          <button
                            key={item.title}
                            onClick={() => sendMessage(item.title)}
                            className="group flex min-h-[82px] items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-4 text-left transition duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] active:scale-[0.99]"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-white transition group-hover:scale-105">
                              <Icon className="h-4 w-4" />
                            </div>

                            <div className="min-w-0">
                              <p className="text-sm font-medium text-zinc-800">
                                {item.title}
                              </p>

                              <p className="mt-1 truncate text-[11px] text-zinc-400">
                                {item.text}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ================================================= */}
                {/* MESSAGES */}
                {/* ================================================= */}

                {messages.length > 0 && (
                  <div className="space-y-7">
                    {messages.map((message) => {
                      const isUser = message.role === "user";

                      return (
                        <div
                          key={message.id}
                          className={`flex ${
                            isUser ? "justify-end" : "justify-start"
                          }`}
                        >
                          {!isUser && (
                            <div className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-950">
                              <Image
                                src="/images/bot1.png"
                                alt="Nova"
                                width={32}
                                height={32}
                                className="object-contain"
                              />
                            </div>
                          )}

                          <div
                            className={
                              isUser
                                ? "max-w-[82%] rounded-[20px] rounded-br-md bg-zinc-950 px-4 py-3 text-[13px] leading-6 text-white sm:max-w-[70%]"
                                : "max-w-[88%] pt-1 text-[13px] leading-6 text-zinc-700 sm:max-w-[75%]"
                            }
                          >
                            {message.content}
                          </div>
                        </div>
                      );
                    })}

                    {/* Typing */}
                    {isTyping && (
                      <div className="flex items-start">
                        <div className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-950">
                          <Image
                            src="/images/bot1.png"
                            alt="Nova"
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>

                        <div className="flex h-8 items-center gap-1.5">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-300" />

                          <span
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400"
                            style={{ animationDelay: "100ms" }}
                          />

                          <span
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500"
                            style={{ animationDelay: "200ms" }}
                          />
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================= */}
          {/* INPUT AREA */}
          {/* ================================================= */}

          <div className="pointer-events-none  absolute inset-x-0 bottom-0 bg-gradient-to-t from-white via-white/95 to-transparent px-3 pb-3 pt-12 sm:px-6 sm:pb-5 mb-20 ">
            <div className="pointer-events-auto mx-auto w-full max-w-3xl">
              <div className="rounded-[24px] border border-zinc-200 bg-white p-2 shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition focus-within:border-zinc-300 focus-within:shadow-[0_12px_45px_rgba(0,0,0,0.1)]">
                <div className="flex items-end gap-2">
                  {/* Plus */}
                  <button
                    className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
                    aria-label="Add"
                  >
                    <Plus className="h-4 w-4" />
                  </button>

                  {/* Textarea */}
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder="Ask Nova anything..."
                    className="max-h-32 min-h-[38px] flex-1 resize-none bg-transparent px-1 py-2 text-[13px] leading-5 text-zinc-900 outline-none placeholder:text-zinc-400"
                  />

                  {/* Mic */}
                  {!input.trim() && (
                    <button
                      className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
                      aria-label="Voice input"
                    >
                      <Mic className="h-4 w-4" />
                    </button>
                  )}

                  {/* Send */}
                  <button
                    onClick={() => sendMessage()}
                    disabled={!input.trim() || isTyping}
                    className={`mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                      input.trim() && !isTyping
                        ? "bg-zinc-950 text-white hover:bg-zinc-800"
                        : "bg-zinc-100 text-zinc-300"
                    }`}
                    aria-label="Send message"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="mt-2 text-center text-[9px] text-zinc-400">
                Nova can make mistakes. Verify important information.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
