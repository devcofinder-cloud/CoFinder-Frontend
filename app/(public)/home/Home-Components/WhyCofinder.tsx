
"use client";

import React from "react";
import { Check, X, Minus } from "lucide-react";

type StatusValue = boolean | "partial";

type ComparisonRow = {
  aspect: string;
  cofinder: StatusValue;
  networking: StatusValue;
  accelerators: StatusValue;
};

const comparisonData: ComparisonRow[] = [
  { aspect: "Zero Barrier to Entry", cofinder: true, networking: false, accelerators: false },
  { aspect: "Idea-First Matching", cofinder: true, networking: false, accelerators: "partial" },
  { aspect: "Incognito Matching", cofinder: true, networking: false, accelerators: true },
  { aspect: "Zero Pedigree Bias", cofinder: true, networking: false, accelerators: false },
  { aspect: "Psychometric Vetting", cofinder: true, networking: false, accelerators: false },
  { aspect: "No Cold Pitching", cofinder: true, networking: false, accelerators: false },
  { aspect: "First-Time Founder Friendly", cofinder: true, networking: false, accelerators: "partial" },
  { aspect: "High Signal, Low Spam", cofinder: true, networking: false, accelerators: true },
];

function Status({ value, featured = false }: { value: StatusValue; featured?: boolean }) {
  if (value === "partial") {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        featured ? "bg-white/10 text-white/70" : "bg-neutral-200/70 text-neutral-500"
      }`}>
        
        Partial
      </span>
    );
  }

  if (value) {
    return (
      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${
        featured ? "bg-white text-black" : "bg-neutral-900 text-white"
      }`}>
        <Check size={19} strokeWidth={2.5} />
      </span>
    );
  }

  return (
    <span className={`flex h-9 w-9 items-center justify-center rounded-full ${
      featured ? "bg-white/10 text-white/35" : "bg-neutral-200/70 text-neutral-400"
    }`}>
      <X size={18} strokeWidth={2.2} />
    </span>
  );
}

export default function WhyCoFinder() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-600">
            <span className="h-2 w-2 rounded-full bg-black" />
            The CoFinder Difference
          </span>

          <h2 className="text-4xl font-semibold leading-[1.08] tracking-[-0.055em] text-black sm:text-5xl lg:text-7xl">
            Why choose others?
            <span className="mt-2 block text-neutral-400">
              When the right fit matters.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-neutral-500 sm:text-base sm:leading-8">
            Most networking is built around who you know. CoFinder is built
            around what you want to build — and who can build it with you.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white sm:rounded-3xl">
          <div className="grid grid-cols-[minmax(130px,1.5fr)_repeat(3,minmax(0,1fr))] sm:grid-cols-[minmax(220px,1.5fr)_repeat(3,minmax(0,1fr))]">
            <div className="flex min-h-[90px] items-end bg-neutral-50 px-3 pb-5 sm:px-7 lg:px-9">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 sm:text-xs sm:tracking-[0.16em]">
                What matters
              </span>
            </div>

            <div className="flex min-h-[90px] flex-col items-center justify-center gap-2 border-l border-neutral-200 bg-black px-1 py-4 text-white sm:gap-3 sm:px-3">
              <img
                src="/images/logo.png"
                alt="CoFinder"
                className="h-7 w-7 object-contain brightness-0 invert sm:h-10 sm:w-10"
              />
              <span className="text-xs font-semibold tracking-tight sm:text-base">CoFinder</span>
              <span className="rounded-full bg-white px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-black sm:px-3 sm:text-[10px]">
                Built different
              </span>
            </div>

            <div className="flex min-h-[90px] items-center justify-center px-1 py-3 text-center sm:px-4">
              <h3 className="text-[10px] font-semibold leading-tight text-neutral-700 sm:text-sm lg:text-base">
                Informal
                <span className="block">Networking</span>
              </h3>
            </div>

            <div className="flex min-h-[90px] items-center justify-center border-l border-neutral-100 px-1 py-3 text-center sm:px-4">
              <h3 className="text-[10px] font-semibold leading-tight text-neutral-700 sm:text-sm lg:text-base">
                Elite
                <span className="block">Accelerators</span>
              </h3>
            </div>

            {comparisonData.map((row, index) => (
              <React.Fragment key={row.aspect}>
                <div className={`flex min-h-[64px] items-center border-t border-neutral-200 px-3 py-3 sm:min-h-[72px] sm:px-7 lg:px-9 ${
                  index % 2 === 0 ? "bg-neutral-50/70" : "bg-white"
                }`}>
                  <span className="text-[11px] font-medium leading-snug text-neutral-800 sm:text-sm lg:text-[15px]">
                    {row.aspect}
                  </span>
                </div>

                <div className={`flex min-h-[64px] items-center justify-center border-t border-white/10 px-1 py-3 sm:min-h-[72px] ${
                  index % 2 === 0 ? "bg-neutral-900" : "bg-black"
                }`}>
                  <Status value={row.cofinder} featured />
                </div>

                <div className={`flex min-h-[64px] items-center justify-center border-l border-t border-neutral-200 px-1 py-3 sm:min-h-[72px] sm:px-2 ${
                  index % 2 === 0 ? "bg-white" : "bg-neutral-50/70"
                }`}>
                  <Status value={row.networking} />
                </div>

                <div className={`flex min-h-[64px] items-center justify-center border-l border-t border-neutral-200 px-1 py-3 sm:min-h-[72px] sm:px-2 ${
                  index % 2 === 0 ? "bg-white" : "bg-neutral-50/70"
                }`}>
                  <Status value={row.accelerators} />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-neutral-500 sm:mt-6">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-black" />
            Available
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
            Not available
          </span>
          <span className="flex items-center gap-2">
            <Minus size={13} />
            Partially available
          </span>
        </div>

        <div className="mt-14 border-t border-neutral-200 pt-8 sm:mt-20 sm:pt-10 lg:flex lg:items-end lg:justify-between">
          <div>
            <p className="text-2xl font-semibold leading-tight tracking-[-0.04em] text-black sm:text-3xl lg:text-4xl">
              You don't need another networking event.
            </p>
            <p className="mt-3 text-xl font-medium tracking-tight text-neutral-400 sm:text-2xl lg:text-3xl">
              You need the right person to build with.
            </p>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-black lg:mb-1 lg:mt-0">
            <span className="h-2 w-2 rounded-full bg-black" />
            Built for what comes next.
          </div>
        </div>
      </div>
    </section>
  );
}