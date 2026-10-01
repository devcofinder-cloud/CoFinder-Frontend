"use client";

import React from "react";
import { Check, X } from "lucide-react";

type StatusValue = boolean | "partial";

type ComparisonRow = {
  aspect: string;
  cofinder: StatusValue;
  networking: StatusValue;
  accelerators: StatusValue;
};

const comparisonData: ComparisonRow[] = [
  {
    aspect: "0 Barrier to Entry",
    cofinder: true,
    networking: false,
    accelerators: false,
  },
  {
    aspect: "Idea First Matching",
    cofinder: true,
    networking: false,
    accelerators: "partial",
  },
  {
    aspect: "Incognito matching",
    cofinder: true,
    networking: false,
    accelerators: true,
  },
  {
    aspect: "Zero Pedigree Bias",
    cofinder: true,
    networking: false,
    accelerators: false,
  },
  {
    aspect: "Psychometric Vetting",
    cofinder: true,
    networking: false,
    accelerators: false,
  },
  {
    aspect: "No Cold Pitching",
    cofinder: true,
    networking: false,
    accelerators: false,
  },
  {
    aspect: "First Time Founder Friendly",
    cofinder: true,
    networking: false,
    accelerators: "partial",
  },
  {
    aspect: "High signal/ Low Spam",
    cofinder: true,
    networking: false,
    accelerators: true,
  },
];

export default function WhyCoFinder() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 max-w-3xl sm:mb-14 mx-auto">
          
          <h2 className="text-4xl text-center font-semibold tracking-[-0.04em] text-black sm:text-5xl lg:text-6xl">
            Why choose others
            <br />
            <span className="text-neutral-400">When math is mathing</span>
          </h2>

          <p className="mt-4 max-w-xl text-center text-sm leading-7 text-neutral-500 sm:text-base">
            Most networking is built around who you know. CoFinder is built
            around what you want to build.
          </p>
        </div>

        {/* Comparison */}
        <div className="flex items-start justify-center gap-1 overflow-x-auto pb-2 sm:gap-2 lg:gap-3">
          {/* 1. ASPECTS */}
          <div className="mt-7 h-[500px] w-[80px] shrink-0 overflow-hidden rounded-l-[22px] border border-neutral-200 bg-[#eeeeee] p-2 sm:w-[220px] lg:w-[240px]">
            {/* Header */}
            <div className="flex h-[68px] items-center border-b border-black/5 px-4 sm:px-6">
              <div className="h-5" />
            </div>

            {/* Rows */}
            <div>
              {comparisonData.map((row, index) => (
                <div
                  key={row.aspect}
                  className={`flex h-[53px] items-center ${
                    index !== comparisonData.length - 1
                      ? "border-b border-black/5"
                      : ""
                  }`}
                >
                  <span className="text-[11px] font-medium leading-tight text-neutral-700 sm:text-[13px]">
                    {row.aspect}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. COFINDER */}
          <div className="h-[540px] w-[80px] shrink-0 overflow-hidden rounded-[22px] bg-black text-white sm:w-[300px] lg:w-[360px]">
            {/* Header */}
            <div className="flex h-[78px] items-center border-b border-white/10 bg-gray-200 px-4 sm:px-6">
              <div className="flex items-center gap-3">
                <img
                  src="/images/logo.png"
                  alt="CoFinder"
                  className="h-8 w-8 object-contain sm:h-9 sm:w-9"
                />
              </div>
            </div>

            {/* Rows */}
            <div>
              {comparisonData.map((row, index) => (
                <div
                  key={row.aspect}
                  className={`flex h-[53px] items-center px-4 sm:px-6 ${
                    index !== comparisonData.length - 1
                      ? "border-b border-white/10"
                      : ""
                  }`}
                >
                  {row.cofinder === "partial" ? (
                    <span className="text-xs font-semibold text-white mx-auto">
                      Partial
                    </span>
                  ) : row.cofinder ? (
                    <span className="flex h-7 w-7 items-center justify-center text-white mx-auto">
                      <Check size={25} strokeWidth={2.8} />
                    </span>
                  ) : (
                    <span className="flex h-14 w-14 items-center mx-auto justify-center rounded-full bg-white/10 text-white/50">
                      <X size={24} strokeWidth={2.5} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 3. INFORMAL NETWORKING */}
          <div className="mt-7 h-[500px] w-[80px] shrink-0 overflow-hidden  bg-[#eeeeee] sm:w-[270px] lg:w-[310px]">
            {/* Header */}
            <div className="flex h-[68px] items-center justify-center  bg-white px-2">
              <h3 className="text-center text-[11px] font-semibold tracking-tight text-neutral-900 sm:text-base">
                Informal Networking
              </h3>
            </div>

            {/* Rows */}
            <div>
              {comparisonData.map((row, index) => (
                <div
                  key={row.aspect}
                  className={`flex h-[53px] items-center px-4 sm:px-6 ${
                    index !== comparisonData.length - 1
                      ? "border-b border-black/5"
                      : ""
                  }`}
                >
                  {row.networking === "partial" ? (
                    <span className="text-xs font-semibold text-neutral-500 mx-auto">
                      Partial
                    </span>
                  ) : row.networking ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full mx-auto bg-neutral-200 text-neutral-700">
                      <Check size={20} strokeWidth={2.8} />
                    </span>
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full mx-auto bg-neutral-200/70 text-neutral-400">
                      <X size={20} strokeWidth={2.5} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 4. ELITE ACCELERATORS */}
          <div className="mt-7 h-[500px] w-[80px] shrink-0 overflow-hidden rounded-r-[22px] bg-[#eeeeee] sm:w-[270px] lg:w-[310px]">
            {/* Header */}
            <div className="flex h-[68px] items-center justify-center border-b border-black/5 bg-white px-2">
              <h3 className="text-center text-[11px] font-semibold tracking-tight text-neutral-900 sm:text-base">
                Elite Accelerators
              </h3>
            </div>

            {/* Rows */}
            <div>
              {comparisonData.map((row, index) => (
                <div
                  key={row.aspect}
                  className={`flex h-[53px] items-center px-4 sm:px-6 ${
                    index !== comparisonData.length - 1
                      ? "border-b border-black/5"
                      : ""
                  }`}
                >
                  {row.accelerators === "partial" ? (
                    <span className="text-xs font-semibold text-neutral-500">
                      Partial
                    </span>
                  ) : row.accelerators ? (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 mx-auto">
                      <Check size={20} strokeWidth={2.8} />
                    </span>
                  ) : (
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200/70 text-neutral-400 mx-auto">
                      <X size={20} strokeWidth={2.5} />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom statement */}
        <div className="mt-12 border-t border-neutral-200 pt-8 sm:mt-14 sm:pt-9">
          <p className="text-xl font-medium tracking-tight text-black sm:text-2xl">
            You don't need another networking event.
          </p>

          <p className="mt-2 text-xl font-medium tracking-tight text-neutral-400 sm:text-2xl">
            You need the right person to build with.
          </p>
        </div>
      </div>
    </section>
  );
}