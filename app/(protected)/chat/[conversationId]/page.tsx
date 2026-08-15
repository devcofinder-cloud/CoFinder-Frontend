"use client";

import { useRouter, useParams } from "next/navigation";

import ChatList from "../comp/ChatList";
import MessageScreen from "../comp/MessageScreen";

export default function ConversationPage() {
  const params = useParams();
  const router = useRouter();

  const conversationId =
    params.conversationId as string;

  return (
    <div className="h-[calc(100vh-0px)] w-full bg-zinc-50 sm:p-5">
      <div className="mx-auto flex h-full max-w-[1500px] overflow-hidden border border-zinc-200 bg-white shadow-sm sm:rounded">

        {/* CHAT LIST */}

        <div className="hidden md:block">
          <ChatList
            activeConversationId={
              conversationId
            }
          />
        </div>

        {/* MESSAGE SCREEN */}

        <MessageScreen
          conversationId={conversationId}
          onBack={() =>
            router.push("/chat")
          }
        />
      </div>
    </div>

 
  );
}