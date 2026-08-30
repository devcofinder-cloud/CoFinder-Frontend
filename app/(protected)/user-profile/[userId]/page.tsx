"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Layers3,
  MapPin,
  Sparkles,
  User,
  Zap,
} from "lucide-react";

import { dashboardStore } from "@/app/store/dashboardStore";
import { authStore } from "@/app/store/authStore";

import PersonalProfile from "../comp/Personal";
import ProfessionalProfile from "../comp/Professional";
import Posts from "../comp/Posts";
import { useChatStore } from "@/app/store/chatStore";

type Tab = "personal" | "professional" | "posts";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();

  const userId = typeof params?.userId === "string" ? params.userId : "";

  const { userData, loadingProfile, fetchProfileById } = dashboardStore();
  const { user: currentUser } = authStore();

  const [activeTab, setActiveTab] = useState<Tab>("personal");




  const {createNewConversation} = useChatStore()

  useEffect(() => {
    if (!userId) return;
    fetchProfileById(userId);
  }, [userId, fetchProfileById]);

  if (loadingProfile || !userData) {
    return <ProfileSkeleton />;
  }

  const { user, professionalProfile } = userData;

  const isOwnProfile = currentUser?._id === user._id;

  const skills = professionalProfile?.skills || [];
  const experience = professionalProfile?.experience || [];
  const projects = professionalProfile?.projects || [];
  const education = professionalProfile?.education || [];

  const handelSendMessage =async ()=>{
    try {
      const res = await createNewConversation(userId)
      console.log("convo created:", res)

      router.push(`/chat/${res?._id}`)
    } catch (error) {
      console.log(error)
    }
  }




  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-950">
      <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-[#fafafa]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-xs font-semibold text-zinc-500 transition hover:text-zinc-950"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back
          </button>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-zinc-500 sm:flex">
              <Sparkles size={12} />
              Founder Profile
            </div>
          </div>
        </div>
      </header>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12"
      >
        <motion.section
          variants={itemVariants}
          className="relative overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-[0_20px_70px_-35px_rgba(0,0,0,0.18)]"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-32 -top-40 h-[30rem] w-[30rem] rounded-full bg-zinc-100 blur-3xl" />
            <div className="absolute -bottom-40 left-1/3 h-72 w-72 rounded-full bg-zinc-50 blur-3xl" />

            <div className="absolute right-10 top-10 hidden h-32 w-32 rounded-full border border-zinc-100 lg:block" />
            <div className="absolute right-16 top-16 hidden h-20 w-20 rounded-full border border-zinc-100 lg:block" />
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative shrink-0">
                  {user.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="h-28 w-28 rounded-[1.75rem] object-cover ring-8 ring-zinc-50 sm:h-36 sm:w-36"
                    />
                  ) : (
                    <div className="flex h-28 w-28 items-center justify-center rounded-[1.75rem] bg-zinc-950 text-3xl font-bold text-white shadow-2xl shadow-zinc-300 sm:h-36 sm:w-36 sm:text-4xl">
                      {getInitials(user.name)}
                    </div>
                  )}

                  {user.completionStatus === 100 && (
                    <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-zinc-950 text-white shadow-lg">
                      <CheckCircle2 size={15} />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  {user.archetype && (
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-500">
                      <Zap size={10} />
                      {user.archetype}
                    </div>
                  )}

                  <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-5xl">
                    {user.displayName || user.name}
                  </h1>

                  {user.username && (
                    <p className="mt-2 text-xs font-medium text-zinc-400">
                      @{user.username}
                    </p>
                  )}

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
                    {professionalProfile?.headline ||
                      "Building something meaningful."}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {user.location && (
                      <Meta icon={<MapPin size={12} />} text={user.location} />
                    )}

                    {professionalProfile?.currentRole && (
                      <Meta
                        icon={<BriefcaseBusiness size={12} />}
                        text={professionalProfile.currentRole}
                      />
                    )}

                    {professionalProfile?.industry && (
                      <Meta
                        icon={<Layers3 size={12} />}
                        text={professionalProfile.industry}
                      />
                    )}

                    {professionalProfile?.experienceLevel && (
                      <Meta
                        icon={<Clock3 size={12} />}
                        text={professionalProfile.experienceLevel}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-6 flex w-full max-w-xl rounded-2xl bg-white p-1.5"
        >
          {[
            {
              id: "personal" as const,
              label: "Personal",
              icon: User,
            },
            {
              id: "professional" as const,
              label: "Professional",
              icon: BriefcaseBusiness,
            },
            {
              id: "posts" as const,
              label: "Posts",
              icon: Layers3,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex h-11 flex-1 items-center justify-center gap-2 rounded-full text-xs font-bold text-zinc-400 transition-colors duration-300 hover:text-zinc-950"
              >
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-zinc-950 shadow-md"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      mass: 0.7,
                    }}
                  />
                )}

                <motion.div
                  className="relative z-10 flex items-center gap-2"
                  animate={{
                    color: active ? "#ffffff" : "#a1a1aa",
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon size={14} />
                  {tab.label}
                </motion.div>
              </button>
            );
          })}
        </motion.div>

        <div className="bg-white w-full h-14 pt-2">
          <button
          onClick={handelSendMessage}
          className="bg-black text-white text-lg font-semibold w-full h-full rounded-2xl">
            Send Message
          </button>

        </div>

        <div className="mt-6">
          {activeTab === "personal" && (
            <PersonalProfile
              user={user}
              isOwnProfile={isOwnProfile}
              userId={userId}
              onProfileUpdate={() => fetchProfileById(userId)}
            />
          )}

          {activeTab === "professional" && (
            <ProfessionalProfile professionalProfile={professionalProfile} />
          )}

          {activeTab === "posts" && <Posts />}
        </div>
      </motion.main>
    </div>
  );
}

function Meta({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[10px] font-medium text-zinc-500">
      {icon}
      {text}
    </div>
  );
}

function ProfileStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 py-4 text-center">
      <p className="text-sm font-bold text-zinc-950 sm:text-base">{value}</p>
      <p className="mt-1 text-[9px] font-medium uppercase tracking-wider text-zinc-400 sm:text-[10px]">
        {label}
      </p>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
          <div className="h-4 w-16 animate-pulse rounded bg-zinc-200" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div className="animate-pulse">
          <div className="h-72 rounded-3xl bg-zinc-200" />

          <div className="mx-auto mt-6 h-14 max-w-xl rounded-2xl bg-zinc-200" />

          <div className="mt-6 h-[500px] rounded-2xl bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}
