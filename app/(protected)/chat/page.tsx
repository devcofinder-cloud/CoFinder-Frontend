"use client";

import ChatList from "./comp/ChatList";

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-0px)] w-full bg-zinc-50 sm:p-5">
      <div className="mx-auto flex h-full max-w-[1500px] overflow-hidden border border-zinc-200 bg-white shadow-sm sm:rounded">
        <ChatList />
      </div>
    </div>
  );
}