"use client";

import Image from "next/image";

export default function NovaSplash() {
  return (
    <div className="fixed inset-0 z-[999] flex min-h-screen items-center justify-center overflow-hidden bg-white">
      <div className="flex flex-col items-center">
        {/* Bot */}
        <div className="relative h-[260px] w-[260px] flex items-center justify-center ">
          {/* Ring center */}
          <div className="absolute  left-1/2 top-1/2 z-0 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2">
            {/* Ring 1 */}
            <span className="absolute right-1 rounded-full border border-zinc-300 animate-nova-ring" />

            {/* Ring 2 */}
            <span
              className="absolute inset-0 rounded-full border border-zinc-300/70 animate-nova-ring"
              style={{ animationDelay: "0.7s" }}
            />

            {/* Ring 3 */}
            <span
              className="absolute inset-0 rounded-full border border-zinc-300/50 animate-nova-ring"
              style={{ animationDelay: "1.4s" }}
            />
          </div>

          {/* Bot */}
          <div className="relative z-10 h-[220px] w-[220px] ">
            <Image
              src="/images/bot1.png"
              alt="Nova AI"
              fill
              priority
              className="object-contain"
            />
          </div>

          {/* Shadow */}
          <div className="absolute bottom-4 left-1/2 z-0 h-7 w-32 -translate-x-1/2 rounded-full bg-zinc-300/40 blur-2xl" />
        </div>

        {/* Identity */}
        <div className="mt-3 flex flex-col items-center">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/40" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>

            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-zinc-400">
              AI Assistant
            </span>
          </div>

          <h1 className="mt-3 text-[40px] font-semibold tracking-[-0.045em] text-zinc-950">
            Co-Finfer AI
          </h1>

          <p className="mt-2 text-[11px] tracking-[0.16em] text-zinc-400">
            YOUR FOUNDER COPILOT
          </p>
        </div>

        {/* Footer */}
        <div className="fixed bottom-7 flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-zinc-300" />

          <span className="text-[10px] font-medium tracking-[0.12em] text-zinc-400">
            COFINDER AI
          </span>

          <span className="h-1 w-1 rounded-full bg-zinc-300" />
        </div>
      </div>

      {/* Ring animation */}
      <style jsx>{`
        @keyframes nova-ring {
          0% {
            transform: scale(0.35);
            opacity: 0;
          }

          15% {
            opacity: 0.65;
          }

          70% {
            opacity: 0.25;
          }

          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }

        .animate-nova-ring {
          animation: nova-ring 2.1s ease-out infinite;
        }
      `}</style>
    </div>
  );
}
