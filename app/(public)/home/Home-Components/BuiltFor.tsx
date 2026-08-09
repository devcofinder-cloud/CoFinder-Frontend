"use client";

import { LucideIcon, Brain, Shield, ScanSearch, Layers3, Lock, Globe } from "lucide-react";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Brain,
    title: "AI-Powered Matching",
    description:
      "Our model analyzes compatibility vectors across skills, personality, vision, and work style to surface your ideal co-founder.",
  },
  {
    icon: Shield,
    title: "Identity-Blind Discovery",
    description:
      "Names, photos, and social profiles stay hidden until both people opt in. Build relationships through ideas and skills first.",
  },
  {
    icon: ScanSearch,
    title: "Psychometric Analysis",
    description:
      "Our assessment maps your working style, decision making, communication, and leadership profile.",
  },
  {
    icon: Layers3,
    title: "Founder Workspace",
    description:
      "Shared Kanban boards, roadmap planning, documents, meeting notes, and collaboration tools built-in.",
  },
  {
    icon: Lock,
    title: "Secure Collaboration",
    description:
      "End-to-end encrypted messaging with NDA-like protection so sensitive startup ideas stay private.",
  },
  {
    icon: Globe,
    title: "Startup Discovery",
    description:
      "Discover vetted startups looking for co-founders. Filter by skills, industry, funding stage, and location.",
  },
];

export default function BuiltFor() {
  return (
    <section className="w-full bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-gray-300 px-4 py-1 text-sm font-medium text-gray-700">
            Features
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-black md:text-6xl">
            Built for the
            <br />
            serious builder.
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Every feature is designed to remove friction from the hardest part
            of startups — finding the right person to build with.
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-black hover:shadow-2xl"
              >
                {/* Top Gradient */}

                <div className="absolute left-0 top-0 h-1 w-0 bg-black transition-all duration-500 group-hover:w-full" />

                {/* Icon */}

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 transition-all duration-300 group-hover:bg-black group-hover:text-white">
                  <Icon size={26} strokeWidth={2} />
                </div>

                {/* Title */}

                <h3 className="mb-4 text-2xl font-bold text-black">
                  {feature.title}
                </h3>

                {/* Description */}

                <p className="leading-8 text-gray-600">
                  {feature.description}
                </p>

                {/* Hover Background */}

                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white via-white to-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}