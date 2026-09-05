"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUp,
  Award,
  Bookmark,
  Briefcase,
  CheckCircle2,
  Clock,
  Heart,
  HelpCircle,
  MessageCircle,
  MessageSquare,
  Rocket,
  Send,
  Users,
  VolumeX,
  Wallet,
  Zap,
} from "lucide-react";

import { dashboardStore } from "@/app/store/dashboardStore";
import { useChatStore } from "@/app/store/chatStore";
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const TABS = ["Personal", "Professional", "Ideas"] as const;

type Tab = (typeof TABS)[number];

const personalTraits = [
  {
    icon: Zap,
    label: "Early Bird",
    detail: "Sharpest before 9am",
  },
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
  {
    icon: Wallet,
    label: "Bootstrapping",
    detail: "No outside capital, yet",
  },
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
    body: "A CRM that solo consultants talk to instead of type into. Every call gets summarized, logged, and turned into a follow-up draft automatically.",
    likes: 172,
    comments: 24,
    votes: 51,
  },
  {
    id: "harbor",
    title: "Harbor",
    tag: "Freelancer marketplace",
    body: "A waiting room for freelancers between contracts. Harbor matches idle capacity with short, paid diagnostic gigs.",
    likes: 96,
    comments: 11,
    votes: 33,
  },
];

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();

  const userId = typeof params?.userId === "string" ? params.userId : "";

  const {
    userData,
    loadingProfile,
    fetchProfileById,
    professionalProfile,
    fetchProfessionalProfileById,
  } = dashboardStore();

  const { createNewConversation } = useChatStore();

  const [activeTab, setActiveTab] = useState<Tab>("Personal");

  const [ideas, setIdeas] = useState(initialIdeas);

  const [likedIdeas, setLikedIdeas] = useState<Record<string, boolean>>({});

  const [votedIdeas, setVotedIdeas] = useState<Record<string, boolean>>({});

  const [bookmarkedIdeas, setBookmarkedIdeas] = useState<
    Record<string, boolean>
  >({});

  const [isSendingMessage, setIsSendingMessage] = useState(false);

  useEffect(() => {
    if (!userId) return;

    fetchProfileById(userId);
    fetchProfessionalProfileById(userId);
  }, [userId, fetchProfileById]);

  const links = [
    {
      icon: FaTwitter,
      label: "X",
      href: professionalProfile?.socialLinks.twitter,
    },
    {
      icon: FaGithub,
      label: "GitHub",
      href: professionalProfile?.socialLinks.github,
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: professionalProfile?.socialLinks.linkedin,
    },
    {
      icon: FaDiscord,
      label: "Website",
      href: professionalProfile?.socialLinks.portfolio,
    },
  ];

  const handleSendMessage = async () => {
    if (!userId || isSendingMessage) return;

    try {
      setIsSendingMessage(true);

      const res = await createNewConversation(userId);

      router.push(`/chat/${res?._id}`);
    } catch (error) {
      console.error("Failed to create conversation:", error);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const toggleLike = (id: string) => {
    setLikedIdeas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id
          ? {
              ...idea,
              likes: idea.likes + (likedIdeas[id] ? -1 : 1),
            }
          : idea,
      ),
    );
  };

  const toggleVote = (id: string) => {
    setVotedIdeas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id
          ? {
              ...idea,
              votes: idea.votes + (votedIdeas[id] ? -1 : 1),
            }
          : idea,
      ),
    );
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIdeas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loadingProfile || !userData) {
    return <ProfileSkeleton />;
  }

  const { user } = userData;

  return (
    <main className="min-h-screen overflow-x-hidden bg-white font-sans text-black antialiased selection:bg-black selection:text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-12 lg:grid-cols-[360px_1fr] lg:py-20">
        {/* ===================================================== */}
        {/* PROFILE SIDEBAR                                      */}
        {/* ===================================================== */}

        <motion.aside
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="sticky top-12 h-fit"
        >
          <div className="relative flex flex-col items-center rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
            {/* Avatar */}

            <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-neutral-100 text-4xl">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user?.name || "User"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span>{user?.name?.charAt(0)?.toUpperCase() || "👤"}</span>
              )}
            </div>

            {/* User Details */}

            <div className="mt-6 w-full text-center">
              <div className="inline-block rounded-full bg-black px-6 py-2 text-sm font-semibold text-white">
                {user?.name || "Username"}
              </div>

              {user?.email && (
                <p className="mt-3 text-xs text-neutral-500">{user.email}</p>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                <span className="rounded-full bg-neutral-200 px-4 py-1.5 text-xs font-semibold text-neutral-700">
                  {user?.role || "Member"}
                </span>

                <span className="rounded-full bg-neutral-200 px-4 py-1.5 text-xs font-semibold text-neutral-700">
                  {user?.provider || "Email"}
                </span>
              </div>

              {/* Profile Completion */}

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-neutral-600">
                    Profile Completion
                  </span>

                  <span className="font-bold text-black">
                    {user?.completionStatus || 0}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                  <motion.div
                    initial={{
                      width: 0,
                    }}
                    animate={{
                      width: `${user?.completionStatus || 0}%`,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-black"
                  />
                </div>
              </div>
            </div>

            {professionalProfile && (
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
            )}

            {/* Tabs */}

            <div className="mt-8 flex w-full justify-between rounded-full bg-neutral-100 p-1.5">
              {TABS.map((tab) => {
                const isActive = activeTab === tab;

                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="relative flex-1 rounded-full py-2 text-xs font-bold transition-colors focus:outline-none"
                    style={{
                      color: isActive ? "#ffffff" : "#000000",
                    }}
                  >
                    <span className="relative z-10">{tab}</span>

                    {isActive && (
                      <motion.div
                        layoutId="user-profile-tab"
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

            {/* Send Message */}

            <button
              onClick={handleSendMessage}
              disabled={isSendingMessage}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-black py-3 text-xs font-bold tracking-wide text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSendingMessage ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Opening Chat...
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

        {/* ===================================================== */}
        {/* MAIN CONTENT                                         */}
        {/* ===================================================== */}

        <div className="relative mb-10 sm:m-0">
          <AnimatePresence mode="wait">
            {/* ================================================= */}
            {/* PERSONAL                                          */}
            {/* ================================================= */}

            {activeTab === "Personal" && (
              <TabPanel key="personal">
                <SectionHeader
                  title="Personal Blueprint"
                  subtitle="Working style & personal dynamics"
                />

                <TraitList traits={personalTraits} />

                <BioBlocks
                  a={{
                    title: "About Me",
                    body: "Build meaningful connections by understanding how this person works, communicates, and collaborates with others.",
                  }}
                  b={{
                    title: "Working Style",
                    body: "A collaborative builder who values direct communication, consistent progress, and solving problems instead of letting them pile up.",
                  }}
                />
              </TabPanel>
            )}

            {/* ================================================= */}
            {/* PROFESSIONAL                                      */}
            {/* ================================================= */}

            {activeTab === "Professional" && (
              <TabPanel key="professional">
                <SectionHeader
                  title="Professional Track Record"
                  subtitle="Experience, execution & core competencies"
                />

                <TraitList traits={professionalTraits} />

                <BioBlocks
                  a={{
                    title: "Professional Focus",
                    body: "Focused on turning ideas into practical products and moving quickly from concept to execution.",
                  }}
                  b={{
                    title: "Looking For",
                    body: "Interested in connecting with people who bring complementary skills, strong communication, and a builder mindset.",
                  }}
                />
              </TabPanel>
            )}

            {/* ================================================= */}
            {/* IDEAS                                             */}
            {/* ================================================= */}

            {activeTab === "Ideas" && (
              <TabPanel key="ideas">
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-3xl font-bold tracking-tight text-black">
                      Idea Showcase
                    </h2>

                    <p className="mt-1 text-sm text-neutral-500">
                      Active concepts & ongoing venture explorations
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  {ideas.map((idea, index) => {
                    const isLiked = likedIdeas[idea.id];
                    const isVoted = votedIdeas[idea.id];
                    const isBookmarked = bookmarkedIdeas[idea.id];

                    return (
                      <motion.article
                        key={idea.id}
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: 0.05 * index,
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
                            {/* Like */}

                            <button
                              onClick={() => toggleLike(idea.id)}
                              className="flex items-center gap-2 transition-colors hover:text-black"
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  isLiked ? "fill-black text-black" : ""
                                }`}
                              />

                              <span>{idea.likes}</span>
                            </button>

                            {/* Comments */}

                            <span className="flex cursor-pointer items-center gap-2 hover:text-black">
                              <MessageSquare className="h-4 w-4" />
                              {idea.comments}
                            </span>

                            {/* Vote */}

                            <button
                              onClick={() => toggleVote(idea.id)}
                              className="flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1 transition-colors hover:bg-neutral-200"
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

/* ================================================================ */
/* Section Header                                                    */
/* ================================================================ */

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

/* ================================================================ */
/* Tab Panel                                                         */
/* ================================================================ */

function TabPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -10,
      }}
      transition={{
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================ */
/* Trait List                                                        */
/* ================================================================ */

function TraitList({
  traits,
}: {
  traits: {
    icon: React.ElementType;
    label: string;
    detail: string;
  }[];
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <div className="divide-y divide-black/10">
        {traits.map(({ icon: Icon, label }, index) => (
          <div
            key={index}
            className="flex items-center gap-4 py-3.5 first:pt-0 last:pb-0"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-neutral-100">
              <Icon className="h-4 w-4 text-black" />
            </div>

            <span className="text-sm font-semibold text-black">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================ */
/* Bio Blocks                                                        */
/* ================================================================ */

function BioBlocks({
  a,
  b,
}: {
  a: {
    title: string;
    body: string;
  };
  b: {
    title: string;
    body: string;
  };
}) {
  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="rounded-3xl bg-neutral-100 p-8 text-black">
        <p className="text-xs font-bold tracking-tight text-neutral-600">
          {a.title}
        </p>

        <p className="mt-3 text-lg font-bold leading-snug">{a.body}</p>
      </div>

      <div className="rounded-3xl bg-black p-8 text-white">
        <p className="text-xs font-bold tracking-tight text-neutral-400">
          {b.title}
        </p>

        <p className="mt-3 text-lg font-bold leading-snug">{b.body}</p>
      </div>
    </div>
  );
}

/* ================================================================ */
/* Loading Skeleton                                                  */
/* ================================================================ */

function ProfileSkeleton() {
  return (
    <main className="min-h-screen bg-white px-6 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[360px_1fr]">
        <div className="rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
          <div className="mx-auto h-28 w-28 animate-pulse rounded-full bg-neutral-200" />

          <div className="mx-auto mt-6 h-9 w-32 animate-pulse rounded-full bg-neutral-200" />

          <div className="mx-auto mt-3 h-3 w-40 animate-pulse rounded-full bg-neutral-100" />

          <div className="mt-6 flex justify-center gap-2">
            <div className="h-7 w-20 animate-pulse rounded-full bg-neutral-200" />
            <div className="h-7 w-20 animate-pulse rounded-full bg-neutral-200" />
          </div>

          <div className="mt-8 h-10 animate-pulse rounded-full bg-neutral-100" />

          <div className="mt-6 h-11 animate-pulse rounded-full bg-neutral-200" />
        </div>

        <div>
          <div className="h-10 w-64 animate-pulse rounded-xl bg-neutral-200" />

          <div className="mt-2 h-4 w-80 animate-pulse rounded-full bg-neutral-100" />

          <div className="mt-6 rounded-3xl border border-black/10 p-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 border-b border-black/5 py-4 last:border-none"
              >
                <div className="h-9 w-9 animate-pulse rounded-xl bg-neutral-100" />
                <div className="h-4 w-48 animate-pulse rounded-full bg-neutral-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
