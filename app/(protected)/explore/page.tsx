"use client";

import { useState } from "react";
import {
  Search,
  MapPin,
  ArrowUpRight,
  SlidersHorizontal,
  X,
  Sparkles,
  BriefcaseBusiness,
  Clock3,
} from "lucide-react";

const founders = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "Full Stack Developer",
    initials: "AM",
    location: "Delhi, India",
    stage: "MVP",
    lookingFor: "Product Co-Founder",
    building: "AI-powered productivity platform",
    bio: "Building tools that help small teams work smarter and move faster.",
    skills: ["React", "Node.js", "MongoDB"],
    match: 94,
    availability: "Full-time",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Product Designer",
    initials: "PS",
    location: "Bangalore, India",
    stage: "Idea",
    lookingFor: "Technical Co-Founder",
    building: "Next-gen creator marketplace",
    bio: "Designer focused on building simple products people genuinely love.",
    skills: ["Figma", "UX", "Product"],
    match: 91,
    availability: "Full-time",
  },
  {
    id: 3,
    name: "Rahul Kapoor",
    role: "Product Manager",
    initials: "RK",
    location: "Mumbai, India",
    stage: "MVP",
    lookingFor: "Technical Co-Founder",
    building: "Fintech platform for freelancers",
    bio: "Product person with a strong background in fintech and growth.",
    skills: ["Product", "Growth", "Strategy"],
    match: 88,
    availability: "Part-time",
  },
  {
    id: 4,
    name: "Ananya Verma",
    role: "Marketing Founder",
    initials: "AV",
    location: "Pune, India",
    stage: "Growth",
    lookingFor: "Tech Co-Founder",
    building: "Community platform for creators",
    bio: "Helping ambitious creators build sustainable online businesses.",
    skills: ["Marketing", "Growth", "Brand"],
    match: 86,
    availability: "Full-time",
  },
  {
    id: 5,
    name: "Karan Singh",
    role: "Backend Engineer",
    initials: "KS",
    location: "Hyderabad, India",
    stage: "Idea",
    lookingFor: "Business Co-Founder",
    building: "Developer infrastructure startup",
    bio: "Backend engineer exploring ideas around developer productivity.",
    skills: ["Node.js", "AWS", "PostgreSQL"],
    match: 84,
    availability: "Full-time",
  },
  {
    id: 6,
    name: "Neha Agarwal",
    role: "Business Strategist",
    initials: "NA",
    location: "Gurgaon, India",
    stage: "MVP",
    lookingFor: "Technical Co-Founder",
    building: "AI solution for local businesses",
    bio: "Strategy and operations professional looking for a technical partner.",
    skills: ["Strategy", "Sales", "Operations"],
    match: 81,
    availability: "Part-time",
  },
];

const categories = [
  "All",
  "Technology",
  "Design",
  "Product",
  "Marketing",
  "Business",
];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredFounders = founders.filter((founder) => {
    const matchesSearch =
      founder.name.toLowerCase().includes(search.toLowerCase()) ||
      founder.role.toLowerCase().includes(search.toLowerCase()) ||
      founder.building.toLowerCase().includes(search.toLowerCase()) ||
      founder.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      {/* ================= HEADER ================= */}
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600">
                <Sparkles size={13} />
                Discover your next co-founder
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Find someone worth
                <span className="block text-zinc-400">
                  building with.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-500 sm:text-base">
                Discover ambitious founders, explore their ideas, and connect
                with people whose skills complement yours.
              </p>
            </div>

            <div className="text-left lg:text-right">
              <p className="text-3xl font-bold tracking-tight">
                {founders.length * 40}+
              </p>
              <p className="text-xs text-zinc-500">
                founders looking to connect
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SEARCH + FILTERS ================= */}
      <section className="sticky top-0 z-20 border-b border-zinc-200 bg-zinc-50/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-3 lg:flex-row">
            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search founders, skills, ideas..."
                className="h-12 w-full rounded-xl border border-zinc-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium transition hover:border-zinc-400"
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>
          </div>

          {/* Categories */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition ${
                  activeCategory === category
                    ? "bg-zinc-950 text-white"
                    : "border border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400 hover:text-zinc-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">
                  Refine your search
                </h3>

                <button
                  onClick={() => setShowFilters(false)}
                  className="text-zinc-400 hover:text-zinc-950"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                <Filter
                  title="Startup Stage"
                  options={["Idea", "MVP", "Growth"]}
                />

                <Filter
                  title="Availability"
                  options={["Full-time", "Part-time"]}
                />

                <Filter
                  title="Location"
                  options={["Remote", "Delhi", "Bangalore"]}
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {/* Recommended */}
        <div className="mb-10">
          <div className="mb-5 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold tracking-tight">
                  Recommended for you
                </h2>

                <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-[10px] font-bold text-white">
                  AI
                </span>
              </div>

              <p className="mt-1 text-xs text-zinc-500">
                Founders who could complement your skills
              </p>
            </div>

            <button className="hidden text-xs font-semibold text-zinc-500 hover:text-zinc-950 sm:block">
              View all
            </button>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredFounders.map((founder) => (
              <FounderCard key={founder.id} founder={founder} />
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredFounders.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-300 bg-white py-20 text-center">
            <Search className="mx-auto text-zinc-300" size={35} />

            <h3 className="mt-4 text-sm font-semibold">
              No founders found
            </h3>

            <p className="mt-1 text-xs text-zinc-500">
              Try searching for another skill, role or startup idea.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

/* ================= FOUNDER CARD ================= */

function FounderCard({
  founder,
}: {
  founder: (typeof founders)[number];
}) {
  return (
    <article className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-200/50">
      {/* Match */}
      <div className="absolute right-5 top-5">
        <div className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[10px] font-bold text-zinc-700">
          {founder.match}% match
        </div>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-950 text-sm font-bold text-white">
          {founder.initials}
        </div>

        <div className="min-w-0 pr-20">
          <h3 className="truncate text-sm font-bold">
            {founder.name}
          </h3>

          <p className="mt-0.5 truncate text-xs text-zinc-500">
            {founder.role}
          </p>

          <div className="mt-1 flex items-center gap-1 text-[10px] text-zinc-400">
            <MapPin size={11} />
            {founder.location}
          </div>
        </div>
      </div>

      {/* Building */}
      <div className="mt-5 rounded-xl bg-zinc-50 p-4">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          <BriefcaseBusiness size={12} />
          Building
        </div>

        <p className="mt-2 text-sm font-semibold text-zinc-900">
          {founder.building}
        </p>

        <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-500">
          {founder.bio}
        </p>
      </div>

      {/* Looking For */}
      <div className="mt-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
          Looking for
        </p>

        <p className="mt-1 text-xs font-semibold text-zinc-800">
          {founder.lookingFor}
        </p>
      </div>

      {/* Skills */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {founder.skills.map((skill) => (
          <span
            key={skill}
            className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-[10px] font-medium text-zinc-500"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4">
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
          <Clock3 size={12} />
          {founder.availability}
        </div>

        <button className="flex items-center gap-1.5 rounded-lg bg-zinc-950 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800">
          View profile
          <ArrowUpRight size={14} />
        </button>
      </div>
    </article>
  );
}

/* ================= FILTER ================= */

function Filter({
  title,
  options,
}: {
  title: string;
  options: string[];
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-zinc-700">
        {title}
      </p>

      <select className="h-10 w-full rounded-lg border border-zinc-200 bg-white px-3 text-xs text-zinc-600 outline-none focus:border-zinc-400">
        <option>Any</option>

        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}