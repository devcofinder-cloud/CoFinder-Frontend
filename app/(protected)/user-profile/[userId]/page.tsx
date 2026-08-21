"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  ExternalLink,
  GraduationCap,
  MapPin,
  MessageCircle,
  Rocket,
  Sparkles,
  User,
  Users,
  Zap,
  Award,
  Building2,
  Globe,
} from "lucide-react";

import { dashboardStore } from "@/app/store/dashboardStore";
import { useChatStore } from "@/app/store/chatStore";

/* =========================================================
   ANIMATION
========================================================= */

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
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

/* =========================================================
   PAGE
========================================================= */

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();

  const userId = typeof params?.userId === "string" ? params.userId : "";

  const { userData, loadingProfile, fetchProfileById } = dashboardStore();
  const {createConversation} = useChatStore()

  /* =======================================================
     FETCH PROFILE
  ======================================================= */

  useEffect(() => {
    if (!userId) return;

    fetchProfileById(userId);
  }, [userId, fetchProfileById]);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loadingProfile || !userData) {
    return <ProfileSkeleton />;
  }

  const { user, professionalProfile } = userData;

  /* =======================================================
     CHAT
  ======================================================= */

  const handleChat = () => {
    router.push(`/chat?userId=${user._id}`);
  };

  /* =======================================================
     DATA
  ======================================================= */

  const skills = professionalProfile?.skills || [];

  const experience = professionalProfile?.experience || [];

  const education = professionalProfile?.education || [];

  const projects = professionalProfile?.projects || [];

  const certifications = professionalProfile?.certifications || [];

  const socialLinks = professionalProfile?.socialLinks || {};

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      {/* ===================================================
          TOP NAV
      =================================================== */}

      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-xs font-semibold text-zinc-500 transition hover:text-zinc-950"
          >
            <ArrowLeft
              size={16}
              className="transition-transform group-hover:-translate-x-1"
            />
            Back
          </button>

          <div className="hidden items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[10px] font-semibold text-zinc-500 sm:flex">
            <Sparkles size={12} />
            Founder Profile
          </div>
        </div>
      </div>

      {/* ===================================================
          MAIN
      =================================================== */}

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-10"
      >
        {/* =================================================
            HERO
        ================================================= */}

        <motion.section
          variants={itemVariants}
          className="relative overflow-hidden rounded-3xl border border-zinc-200 bg-white"
        >
          {/* Background */}

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-zinc-100 blur-3xl" />

            <div className="absolute -bottom-32 left-20 h-64 w-64 rounded-full bg-zinc-50 blur-3xl" />
          </div>

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              {/* Profile */}

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {/* Avatar */}

                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="h-28 w-28 rounded-3xl object-cover ring-4 ring-zinc-50 sm:h-32 sm:w-32"
                  />
                ) : (
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-3xl bg-zinc-950 text-3xl font-bold text-white shadow-xl shadow-zinc-300 sm:h-32 sm:w-32">
                    {getInitials(user.name)}
                  </div>
                )}

                <div>
                  {/* Archetype */}

                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    <Zap size={11} />

                    {user.archetype}
                  </div>

                  {/* Name */}

                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                      {user.displayName || user.name}
                    </h1>

                    {user.completionStatus === 100 && (
                      <CheckCircle2
                        size={19}
                        className="fill-zinc-950 text-white"
                      />
                    )}
                  </div>

                  {/* Username */}

                  <p className="mt-1 text-xs text-zinc-400">@{user.username}</p>

                  {/* Headline */}

                  <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
                    {professionalProfile?.headline ||
                      "Building something meaningful."}
                  </p>

                  {/* Meta */}

                  <div className="mt-4 flex flex-wrap gap-3">
                    {user.location && (
                      <Meta icon={<MapPin size={13} />} text={user.location} />
                    )}

                    {professionalProfile?.experienceLevel && (
                      <Meta
                        icon={<Clock3 size={13} />}
                        text={professionalProfile.experienceLevel}
                      />
                    )}

                    {professionalProfile?.industry && (
                      <Meta
                        icon={<BriefcaseBusiness size={13} />}
                        text={professionalProfile.industry}
                      />
                    )}

                    <Meta
                      icon={<CalendarDays size={13} />}
                      text={`Joined ${formatDate(user.createdAt)}`}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleChat}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 text-xs font-bold text-white shadow-lg shadow-zinc-200 transition hover:bg-zinc-800"
                >
                  <MessageCircle size={16} />
                  Chat with {user.name.split(" ")[0]}
                </motion.button>

                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-xs font-bold text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-950"
                >
                  <Users size={15} />
                  Connect
                </motion.button>
              </div>
            </div>

            {/* Stats */}

            <div className="mt-8 grid grid-cols-3 divide-x divide-zinc-200 rounded-2xl border border-zinc-200 bg-zinc-50">
              <ProfileStat
                value={experience.length > 0 ? `${experience.length}` : "0"}
                label="Experience"
              />

              <ProfileStat value={`${skills.length}`} label="Skills" />

              <ProfileStat value={`${projects.length}`} label="Projects" />
            </div>
          </div>
        </motion.section>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6">
            {/* =================================================
                ABOUT
            ================================================= */}

            {professionalProfile?.about && (
              <motion.section
                variants={itemVariants}
                className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7"
              >
                <SectionHeading icon={<User size={16} />} title="About" />

                <p className="mt-5 text-sm leading-7 text-zinc-500">
                  {professionalProfile.about}
                </p>
              </motion.section>
            )}

            {/* =================================================
                CURRENT ROLE
            ================================================= */}

            <motion.section
              variants={itemVariants}
              className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7"
            >
              <SectionHeading
                icon={<BriefcaseBusiness size={16} />}
                title="Current role"
              />

              <div className="mt-5 rounded-2xl bg-zinc-950 p-6 text-white">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                      Currently working as
                    </p>

                    <h2 className="mt-2 text-xl font-bold">
                      {professionalProfile?.currentRole || "Not specified"}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-400">
                      {professionalProfile?.currentCompany || "Independent"}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-zinc-950">
                    <Building2 size={19} />
                  </div>
                </div>

                {professionalProfile?.industry && (
                  <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[10px] font-medium text-zinc-300">
                    {professionalProfile.industry}
                  </div>
                )}
              </div>
            </motion.section>

            {/* =================================================
                EXPERIENCE
            ================================================= */}

            {experience.length > 0 && (
              <motion.section
                variants={itemVariants}
                className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7"
              >
                <SectionHeading
                  icon={<BriefcaseBusiness size={16} />}
                  title="Experience"
                />

                <div className="mt-6 space-y-6">
                  {experience.map((item, index) => (
                    <motion.div
                      key={item._id}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: 0.15 + index * 0.08,
                      }}
                      className="relative border-l border-zinc-200 pl-6"
                    >
                      {/* Timeline dot */}

                      <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-zinc-950 ring-4 ring-white" />

                      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <h3 className="text-sm font-bold">{item.role}</h3>

                          <p className="mt-1 text-xs font-medium text-zinc-500">
                            {item.company}
                          </p>
                        </div>

                        <span className="text-[10px] text-zinc-400">
                          {formatDate(item.startDate)} -{" "}
                          {item.endDate ? formatDate(item.endDate) : "Present"}
                        </span>
                      </div>

                      {item.location && (
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-zinc-400">
                          <MapPin size={11} />

                          {item.location}
                        </div>
                      )}

                      {item.description && (
                        <p className="mt-3 text-xs leading-6 text-zinc-500">
                          {item.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* =================================================
                EDUCATION
            ================================================= */}

            {education.length > 0 && (
              <motion.section
                variants={itemVariants}
                className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7"
              >
                <SectionHeading
                  icon={<GraduationCap size={16} />}
                  title="Education"
                />

                <div className="mt-5 space-y-3">
                  {education.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-xl border border-zinc-200 p-4 transition hover:border-zinc-300 hover:bg-zinc-50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-sm font-bold">{item.degree}</h3>

                          <p className="mt-1 text-xs text-zinc-500">
                            {item.fieldOfStudy}
                          </p>

                          <p className="mt-2 text-xs font-medium text-zinc-700">
                            {item.institution}
                          </p>
                        </div>

                        <GraduationCap
                          size={18}
                          className="shrink-0 text-zinc-400"
                        />
                      </div>

                      <div className="mt-3 flex items-center gap-1 text-[10px] text-zinc-400">
                        <CalendarDays size={11} />
                        {formatDate(item.startDate)} -{" "}
                        {item.endDate ? formatDate(item.endDate) : "Present"}
                      </div>

                      {item.description && (
                        <p className="mt-3 text-xs leading-5 text-zinc-500">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* =================================================
                PROJECTS
            ================================================= */}

            {projects.length > 0 && (
              <motion.section
                variants={itemVariants}
                className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7"
              >
                <SectionHeading icon={<Rocket size={16} />} title="Projects" />

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  {projects.map((project) => (
                    <motion.div
                      key={project._id}
                      whileHover={{
                        y: -3,
                      }}
                      className="group rounded-xl border border-zinc-200 p-5 transition hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-100"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-950 text-white">
                          <Rocket size={15} />
                        </div>

                        <div className="flex gap-1">
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition hover:border-zinc-400 hover:text-zinc-950"
                            >
                              <Globe size={14} />
                            </a>
                          )}

                          {project.projectUrl && (
                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition hover:border-zinc-400 hover:text-zinc-950"
                            >
                              <ExternalLink size={14} />
                            </a>
                          )}
                        </div>
                      </div>

                      <h3 className="mt-4 text-sm font-bold">
                        {project.title}
                      </h3>

                      <p className="mt-2 line-clamp-3 text-xs leading-5 text-zinc-500">
                        {project.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-md bg-zinc-100 px-2 py-1 text-[9px] font-medium text-zinc-500"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* =================================================
                CERTIFICATIONS
            ================================================= */}

            {certifications.length > 0 && (
              <motion.section
                variants={itemVariants}
                className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-7"
              >
                <SectionHeading
                  icon={<Award size={16} />}
                  title="Certifications"
                />

                <div className="mt-5 space-y-3">
                  {certifications.map((certification) => (
                    <div
                      key={certification._id}
                      className="flex items-start justify-between gap-4 rounded-xl border border-zinc-200 p-4"
                    >
                      <div className="flex gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                          <Award size={15} className="text-zinc-600" />
                        </div>

                        <div>
                          <h3 className="text-xs font-bold">
                            {certification.name}
                          </h3>

                          <p className="mt-1 text-[10px] text-zinc-500">
                            {certification.issuingOrganization}
                          </p>

                          <p className="mt-1 text-[9px] text-zinc-400">
                            {formatDate(certification.issueDate)}
                          </p>
                        </div>
                      </div>

                      {certification.credentialUrl && (
                        <a
                          href={certification.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 transition hover:border-zinc-400 hover:text-zinc-950"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <div className="space-y-6">
            {/* =================================================
                SKILLS
            ================================================= */}

            {skills.length > 0 && (
              <motion.section
                variants={itemVariants}
                className="rounded-2xl border border-zinc-200 bg-white p-6"
              >
                <SectionHeading icon={<Code2 size={16} />} title="Skills" />

                <div className="mt-5 space-y-2">
                  {skills.map((skill) => (
                    <motion.div
                      key={skill._id}
                      whileHover={{
                        x: 3,
                      }}
                      className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-3"
                    >
                      <span className="text-xs font-semibold text-zinc-700">
                        {skill.name}
                      </span>

                      <span className="rounded-full bg-zinc-950 px-2 py-1 text-[9px] font-bold text-white">
                        {skill.level}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* =================================================
                SOCIAL LINKS
            ================================================= */}

            {(socialLinks.linkedin ||
              socialLinks.github ||
              socialLinks.portfolio ||
              socialLinks.twitter) && (
              <motion.section
                variants={itemVariants}
                className="rounded-2xl border border-zinc-200 bg-white p-6"
              >
                <SectionHeading
                  icon={<ExternalLink size={16} />}
                  title="Find me online"
                />

                <div className="mt-5 space-y-2">
                  {socialLinks.github && (
                    <SocialLink label="GitHub" href={socialLinks.github} />
                  )}

                  {socialLinks.linkedin && (
                    <SocialLink label="LinkedIn" href={socialLinks.linkedin} />
                  )}

                  {socialLinks.portfolio && (
                    <SocialLink
                      label="Portfolio"
                      href={socialLinks.portfolio}
                    />
                  )}

                  {socialLinks.twitter && (
                    <SocialLink label="Twitter" href={socialLinks.twitter} />
                  )}
                </div>
              </motion.section>
            )}

            {/* =================================================
                PROFILE INFO
            ================================================= */}

            <motion.section
              variants={itemVariants}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <SectionHeading icon={<Sparkles size={16} />} title="Profile" />

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Experience"
                  value={
                    professionalProfile?.experienceLevel || "Not specified"
                  }
                />

                <InfoRow
                  label="Industry"
                  value={professionalProfile?.industry || "Not specified"}
                />

                <InfoRow
                  label="Location"
                  value={user.location || "Not specified"}
                />

                <InfoRow
                  label="Profile completion"
                  value={`${user.completionStatus}%`}
                />
              </div>

              {/* Completion */}

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[10px] font-medium text-zinc-400">
                    Profile completeness
                  </span>

                  <span className="text-[10px] font-bold">
                    {user.completionStatus}%
                  </span>
                </div>

                <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{
                      width: `${user.completionStatus}%`,
                    }}
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                    }}
                    className="h-full rounded-full bg-zinc-950"
                  />
                </div>
              </div>
            </motion.section>

            {/* =================================================
                CHAT CARD
            ================================================= */}

            <motion.section
              variants={itemVariants}
              className="relative overflow-hidden rounded-2xl bg-zinc-950 p-6 text-white"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-zinc-950">
                  <MessageCircle size={18} />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  Think you could build together?
                </h3>

                <p className="mt-2 text-xs leading-5 text-zinc-400">
                  Start a conversation and see if your skills and vision are a
                  good match.
                </p>

                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={handleChat}
                  className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-bold text-zinc-950 transition hover:bg-zinc-100"
                >
                  Start conversation
                  <ArrowUpRight size={15} />
                </motion.button>
              </div>
            </motion.section>

            {/* =================================================
                PROFILE ID
            ================================================= */}

            <motion.div
              variants={itemVariants}
              className="rounded-xl border border-zinc-200 bg-white p-4"
            >
              <p className="text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
                Profile ID
              </p>

              <p className="mt-2 break-all font-mono text-[10px] text-zinc-500">
                {user._id}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.main>
    </div>
  );
}

/* =========================================================
   META
========================================================= */

function Meta({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-[10px] font-medium text-zinc-500">
      {icon}

      {text}
    </div>
  );
}

/* =========================================================
   PROFILE STAT
========================================================= */

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

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white">
        {icon}
      </div>

      <h2 className="text-sm font-bold tracking-tight">{title}</h2>
    </div>
  );
}

/* =========================================================
   SOCIAL LINK
========================================================= */

function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      whileHover={{
        x: 3,
      }}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-semibold text-zinc-600 transition hover:border-zinc-300 hover:bg-white hover:text-zinc-950"
    >
      {label}

      <ExternalLink size={13} />
    </motion.a>
  );
}

/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-zinc-100 pb-3 last:border-0 last:pb-0">
      <span className="text-[10px] font-medium text-zinc-400">{label}</span>

      <span className="text-right text-xs font-semibold text-zinc-700">
        {value}
      </span>
    </div>
  );
}

/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(date?: string | null) {
  if (!date) return "Present";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/* =========================================================
   INITIALS
========================================================= */

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/* =========================================================
   PROFILE SKELETON
========================================================= */

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
          {/* Hero */}

          <div className="h-72 rounded-3xl bg-zinc-200" />

          {/* Content */}

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
            <div className="space-y-6">
              <div className="h-52 rounded-2xl bg-zinc-200" />

              <div className="h-72 rounded-2xl bg-zinc-200" />

              <div className="h-80 rounded-2xl bg-zinc-200" />
            </div>

            <div className="space-y-6">
              <div className="h-72 rounded-2xl bg-zinc-200" />

              <div className="h-52 rounded-2xl bg-zinc-200" />

              <div className="h-56 rounded-2xl bg-zinc-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
