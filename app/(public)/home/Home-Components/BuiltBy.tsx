"use client";

import { Star } from "lucide-react";

export default function BuiltBy() {
  const data = [
    {
      name: "Maya Johnson",
      rating: 5,
      matchScore: 99,
      designation: "CEO • FinTech Startup",
      statement:
        "I found an incredible technical co-founder within two weeks. Our vision matched perfectly, and we're now building our MVP together.",
    },
    {
      name: "Alex Chen",
      rating: 5,
      matchScore: 97,
      designation: "Product Designer",
      statement:
        "The psychometric matching was surprisingly accurate. Instead of wasting months networking, I met someone who shared the same work ethic.",
    },
    {
      name: "Sophia Williams",
      rating: 5,
      matchScore: 98,
      designation: "AI Founder",
      statement:
        "CoFinder helped me connect with a machine learning engineer who truly believed in my idea. We've already secured our first pilot customer.",
    },
  ];
  return (
    <div className="mx-auto max-w-6xl mt-10">
      <h1 className="text-5xl text-center font-bold ">
        Built for Founders, By Founders
      </h1>
      <div className=" mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((item) => (
          <div
            key={item.name}
            className="rounded-3xl border border-gray-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Rating */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="h-4 w-4 fill-black text-black"
                  />
                ))}
              </div>

              <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
                {item.matchScore}% Match
              </span>
            </div>

            {/* Statement */}
            <p className="mt-6 text-gray-600 leading-7">"{item.statement}"</p>

            {/* Divider */}
            <div className="my-6 h-px w-full bg-gray-200" />

            {/* User */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                {item.name.charAt(0)}
              </div>

              <div>
                <h3 className="font-semibold text-black">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.designation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
