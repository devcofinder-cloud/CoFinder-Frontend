"use client";

import { useState } from "react";
import {
  Grid2X2,
  Compass,
  Bot,
  MessageCircle,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tabs = [
  { id: "home", icon: Grid2X2 },
  { id: "explore", icon: Compass },
  { id: "bot", icon: Bot },
  { id: "chat", icon: MessageCircle },
  { id: "profile", icon: User },
];

export default function Footer() {
  const [active, setActive] = useState("home");
  const appRouter = useRouter()

  return (
    <footer className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2">
      <nav
        className="
          flex h-[62px] w-[360px]
          items-center justify-between
          rounded-full
          border border-gray-200
          bg-white
          px-2
          shadow-[0_4px_15px_rgba(0,0,0,0.18)]
          
          sm:w-[500px]
          md:h-[64px]
        "
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() =>{ setActive(tab.id); appRouter.push(tab.id)}}
              className={`
                flex h-[48px] w-[48px]
                items-center justify-center
                rounded-full
                transition-all duration-200
                active:scale-90
                ${
                  isActive
                    ? "bg-black text-white shadow-md"
                    : "bg-transparent text-black hover:bg-gray-100"
                }
              `}
            >
              <Icon
                size={isActive ? 23 : 22}
                strokeWidth={isActive ? 2.8 : 2.5}
                fill={
                  tab.id === "activity" && isActive
                    ? "white"
                    : "none"
                }
              />
            </button>
          );
        })}
      </nav>
    </footer>
  );
}