"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Zap,
  Users,
  Clock,
  MessageCircle,
  VolumeX,
  Rocket,
  Briefcase,
  Wallet,
  Award,
  HelpCircle,
  Plus,
  Heart,
  MessageSquare,
  ArrowUp,
  Bookmark,
  Send,
  CheckCircle2,
  Globe,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Static Data                                                        */
/* ------------------------------------------------------------------ */

const TABS = ["Personal", "Professional", "Ideas"] as const;
type Tab = (typeof TABS)[number];

const personalTraits = [
  { icon: Zap, label: "Early Bird", detail: "Sharpest before 9am" },
  {
    icon: Users,
    label: "Constant Collaboration",
    detail: "Thinks out loud, with others",
  },
  {
    icon: Clock,
    label: "20-40 hrs/wk",
    detail: "Sustainable pace by design",
  },
  {
    icon: MessageCircle,
    label: "Address Immediately",
    detail: "No letting it fester",
  },
  {
    icon: VolumeX,
    label: "Go Quiet & Solve",
    detail: "Disappears, returns with answers",
  },
];

const professionalTraits = [
  {
    icon: Rocket,
    label: "Makes fast, breaks faster",
    detail: "Bias toward shipping",
  },
  {
    icon: Briefcase,
    label: "Consultant background",
    detail: "6 years client-side",
  },
  { icon: Wallet, label: "Bootstrapping", detail: "No outside capital, yet" },
  {
    icon: Award,
    label: "Third build",
    detail: "Two prior exits, one shutdown",
  },
  {
    icon: HelpCircle,
    label: "No prior co-founder",
    detail: "First time sharing the wheel",
  },
];

const initialIdeas = [
  {
    id: "fieldnote",
    title: "Fieldnote",
    tag: "Voice-first CRM",
    body: "A CRM that solo consultants talk to instead of type into. Every call gets summarized, logged, and turned into a follow-up draft automatically — no more Sunday-night data entry.",
    likes: 172,
    comments: 24,
    votes: 51,
  },
  {
    id: "harbor",
    title: "Harbor",
    tag: "Freelancer marketplace",
    body: "A waiting room for freelancers between contracts. Instead of another job board, Harbor matches idle capacity with short, paid diagnostic gigs — a way to stay sharp and paid while you look.",
    likes: 96,
    comments: 11,
    votes: 33,
  },
];

const links = [
  { icon: Globe, label: "X", href: "#" },
  { icon: Globe, label: "GitHub", href: "#" },
  { icon: Globe, label: "LinkedIn", href: "#" },
  { icon: Globe, label: "Website", href: "#" },
];

/* ------------------------------------------------------------------ */
/* Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Personal");
  const [ideas, setIdeas] = useState(initialIdeas);
  const [likedIdeas, setLikedIdeas] = useState<Record<string, boolean>>({});
  const [votedIdeas, setVotedIdeas] = useState<Record<string, boolean>>({});
  const [bookmarkedIdeas, setBookmarkedIdeas] = useState<
    Record<string, boolean>
  >({});
  const [isMessageSent, setIsMessageSent] = useState(false);

  const toggleLike = (id: string) => {
    setLikedIdeas((prev) => ({ ...prev, [id]: !prev[id] }));
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id
          ? { ...idea, likes: idea.likes + (likedIdeas[id] ? -1 : 1) }
          : idea,
      ),
    );
  };

  const toggleVote = (id: string) => {
    setVotedIdeas((prev) => ({ ...prev, [id]: !prev[id] }));
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id
          ? { ...idea, votes: idea.votes + (votedIdeas[id] ? -1 : 1) }
          : idea,
      ),
    );
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIdeas((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSendMessage = () => {
    setIsMessageSent(true);
    setTimeout(() => setIsMessageSent(false), 3000);
  };

  return (
    <main className="relative min-h-screen bg-white text-black font-sans antialiased overflow-x-hidden selection:bg-black selection:text-white">
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 lg:grid-cols-[360px_1fr] gap-10 px-6 py-12 lg:py-20">
        {/* ---------------------------------------------------- */}
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="sticky top-12 h-fit"
        >
          <div className="flex flex-col items-center rounded-3xl border border-black/10 bg-white p-8 text-black shadow-sm">
            {/* Minimalist Avatar */}
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-neutral-100 border border-black/10 text-4xl">
              <span>👤</span>
            </div>

            {/* User Details */}
            <div className="mt-6 text-center w-full">
              <div className="inline-block rounded-full bg-black px-6 py-2 text-sm font-semibold text-white">
                @Username
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full bg-neutral-200 px-4 py-1.5 text-xs font-semibold text-neutral-700">
                  Toronto
                </span>
                <span className="rounded-full bg-neutral-200 px-4 py-1.5 text-xs font-semibold text-neutral-700">
                  Ideation
                </span>
              </div>
            </div>

            {/* Tab Pill Selector */}
            <div className="mt-8 flex w-full justify-between rounded-full bg-neutral-100 p-1.5">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="relative flex-1 rounded-full py-2 text-xs font-bold transition-colors duration-200 focus:outline-none"
                    style={{ color: isActive ? "#ffffff" : "#000000" }}
                  >
                    <span className="relative z-10">{tab}</span>
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-indicator"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                        className="absolute inset-0 z-0 rounded-full bg-black"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Social Links Row */}
            <div className="mt-6 flex items-center justify-center gap-3">
              {links.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-neutral-50 text-black transition-colors hover:bg-black hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleSendMessage}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black py-3 text-xs font-bold tracking-wide text-white transition-opacity hover:opacity-90"
            >
              {isMessageSent ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Message Sent
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </motion.aside>

        {/* ---------------------------------------------------- */}
                            
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeTab === "Personal" && (
              <TabPanel key="personal">
                <SectionHeader
                  title="Personal Blueprint"
                  subtitle="Working style & personal dynamics"
                />
                <TraitList traits={personalTraits} />
                <BioBlocks
                  a={{
                    title: "Lorem Ipsum",
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .",
                  }}
                  b={{
                    title: "Lorem Ipsum",
                    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor .",
                  }}
                />
              </TabPanel>
            )}

            {activeTab === "Professional" && (
              <TabPanel key="professional">
                <SectionHeader
                  title="Professional Track Record"
                  subtitle="Proven execution & core competencies"
                />
                <TraitList traits={professionalTraits} />
                <BioBlocks
                  a={{
                    title: "My Superpower",
                    body: "Turning a shaky MVP into something that ships. Bootstrapped two products from zero to first revenue.",
                  }}
                  b={{
                    title: "What I'm Looking For",
                    body: "A technical counterpart who trusts the numbers as much as the vision.",
                  }}
                />
              </TabPanel>
            )}

            {activeTab === "Ideas" && (
              <TabPanel key="ideas">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-black">
                      Idea Showcase
                    </h2>
                    <p className="mt-1 text-sm text-neutral-500">
                      Active concepts & ongoing venture explorations
                    </p>
                  </div>

                  <button className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-xs font-bold text-white transition-opacity hover:opacity-90">
                    <Plus className="h-4 w-4" />
                    Post New Idea
                  </button>
                </div>

                <div className="space-y-6">
                  {ideas.map((idea, i) => {
                    const isLiked = likedIdeas[idea.id];
                    const isVoted = votedIdeas[idea.id];
                    const isBookmarked = bookmarkedIdeas[idea.id];

                    return (
                      <motion.article
                        key={idea.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.05 * i,
                        }}
                        className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="rounded-full bg-neutral-100 px-3.5 py-1 text-xs font-bold text-black">
                            {idea.tag}
                          </span>
                          <button
                            onClick={() => toggleBookmark(idea.id)}
                            className="text-neutral-400 transition-colors hover:text-black"
                          >
                            <Bookmark
                              className={`h-4 w-4 ${
                                isBookmarked ? "fill-black text-black" : ""
                              }`}
                            />
                          </button>
                        </div>

                        <h3 className="mt-4 text-2xl font-bold text-black">
                          {idea.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                          {idea.body}
                        </p>

                        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6">
                          <div className="flex items-center gap-6 text-xs font-semibold text-neutral-600">
                            <button
                              onClick={() => toggleLike(idea.id)}
                              className="flex items-center gap-2 hover:text-black"
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  isLiked ? "fill-black text-black" : ""
                                }`}
                              />
                              <span>{idea.likes}</span>
                            </button>

                            <span className="flex items-center gap-2 hover:text-black cursor-pointer">
                              <MessageSquare className="h-4 w-4" />
                              {idea.comments}
                            </span>

                            <button
                              onClick={() => toggleVote(idea.id)}
                              className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 hover:bg-neutral-200"
                            >
                              <ArrowUp
                                className={`h-4 w-4 ${
                                  isVoted ? "stroke-[3]" : ""
                                }`}
                              />
                              <span>{idea.votes}</span>
                            </button>
                          </div>

                          <button className="rounded-full bg-black px-4 py-2 text-xs font-bold text-white transition-opacity hover:opacity-90">
                            Interested
                          </button>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              </TabPanel>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-components                                                     */
/* ------------------------------------------------------------------ */

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold tracking-tight text-black">{title}</h2>
      <p className="mt-1 text-sm text-neutral-500">{subtitle}</p>
    </div>
  );
}

function TabPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

function TraitList({
  traits,
}: {
  traits: { icon: React.ElementType; label: string; detail: string }[];
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="divide-y divide-black/10">
        {traits.map(({ icon: Icon, label }, i) => (
          <div key={i} className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0">
            <Icon className="h-5 w-5 shrink-0 text-black" />
            <span className="text-sm font-semibold text-black">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BioBlocks({
  a,
  b,
}: {
  a: { title: string; body: string };
  b: { title: string; body: string };
}) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      {/* Light Card */}
      <div className="rounded-3xl bg-neutral-100 p-8 text-black">
        <p className="text-xs font-bold tracking-tight text-neutral-600">
          {a.title}
        </p>
        <p className="mt-3 text-lg font-bold leading-snug">{a.body}</p>
      </div>

      {/* Dark Card */}
      <div className="rounded-3xl bg-black p-8 text-white">
        <p className="text-xs font-bold tracking-tight text-neutral-400">
          {b.title}
        </p>
        <p className="mt-3 text-lg font-bold leading-snug">{b.body}</p>
      </div>
    </div>
  );
}