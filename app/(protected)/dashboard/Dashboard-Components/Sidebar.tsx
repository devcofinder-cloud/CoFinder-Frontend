"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Search,
  MessageCircle,
  Bell,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Find Founders",
    icon: Search,
  },
  {
    name: "Connections",
    icon: Users,
  },
  {
    name: "Messages",
    icon: MessageCircle,
  },
  {
    name: "Notifications",
    icon: Bell,
  },
  {
    name: "Subscription",
    icon: CreditCard,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

  return (
    <aside className="flex h-screen w-72 flex-col bg-black p-6">
      {/* Logo */}

      <div className="mb-12">
        <h1 className="text-3xl font-black tracking-tight text-white">
          CoFinder
        </h1>

        <p className="mt-1 text-sm text-gray-400">
          Build together.
        </p>
      </div>

      {/* Menu */}

      <nav className="flex flex-1 flex-col gap-3">
        {menu.map((item) => {
          const Icon = item.icon;

          const selected = active === item.name;

          return (
            <button
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                selected
                  ? "bg-white text-black shadow-xl"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Icon
                size={selected ? 28 : 22}
                className={`transition-all duration-300 ${
                  selected ? "scale-110" : "group-hover:scale-110"
                }`}
              />

              <span
                className={`font-medium transition-all duration-300 ${
                  selected ? "text-lg" : "text-base"
                }`}
              >
                {item.name}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom */}

      <button className="mt-8 flex items-center gap-4 rounded-2xl px-5 py-4 text-white transition hover:bg-red-500 hover:text-white">
        <LogOut size={22} />
        <span className="font-medium">Logout</span>
      </button>
    </aside>
  );
}