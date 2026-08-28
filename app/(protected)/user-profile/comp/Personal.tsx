"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  Camera,
  ExternalLink,
  Globe,
  Sparkles,
  User,
} from "lucide-react";

type Props = {
  user: any;
  isOwnProfile: boolean;
  userId: string;
  onProfileUpdate: () => Promise<void>;
};

export default function PersonalProfile({
  user,
  isOwnProfile,
  onProfileUpdate,
}: Props) {
  const socialLinks = user.socialLinks || {};

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.8fr)]">
        <div className="space-y-6">
          <Section title="Personal Information" icon={<User size={16} />}>
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoCard label="Full Name" value={user.name} />
              {user.username && (
                <InfoCard
                  label="Username"
                  value={user.username ? `@${user.username}` : "Not specified"}
                />
              )}

              {user.displayName && (
                <InfoCard
                  label="Display Name"
                  value={user.displayName || "Not specified"}
                />
              )}

              {user.location && (
                <InfoCard
                  label="Location"
                  value={user.location || "Not specified"}
                />
              )}

              {user.age && (
                <InfoCard
                  label="Age"
                  value={user.age ? `${user.age} years` : "Not specified"}
                />
              )}

              {user.gender && (
                <InfoCard
                  label="Gender"
                  value={user.gender || "Not specified"}
                />
              )}
            </div>
          </Section>

          <Section title="Profile" icon={<Sparkles size={16} />}>
            <div className="rounded-2xl bg-zinc-950 p-6 text-white">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                About this person
              </p>

              <h3 className="mt-3 text-2xl font-black tracking-tight">
                {user.displayName || user.name}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400">
                {user.bio || "This user has not added a personal bio yet."}
              </p>
            </div>
          </Section>
        </div>

        <aside className="space-y-6">
          <Section title="Connect" icon={<ExternalLink size={16} />}>
            <div className="space-y-2">
              {socialLinks.github && (
                <SocialLink label="GitHub" href={socialLinks.github} />
              )}

              {socialLinks.linkedin && (
                <SocialLink label="LinkedIn" href={socialLinks.linkedin} />
              )}

              {socialLinks.portfolio && (
                <SocialLink label="Portfolio" href={socialLinks.portfolio} />
              )}

              {socialLinks.twitter && (
                <SocialLink label="Twitter" href={socialLinks.twitter} />
              )}

              {!socialLinks.github &&
                !socialLinks.linkedin &&
                !socialLinks.portfolio &&
                !socialLinks.twitter && (
                  <p className="text-xs text-zinc-400">
                    No social links added.
                  </p>
                )}
            </div>
          </Section>

          <Section title="Profile Strength" icon={<Sparkles size={16} />}>
            <div className="flex items-center justify-between">
              <span className="text-xs text-zinc-500">Completion</span>

              <span className="text-lg font-black">
                {user.completionStatus}%
              </span>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-100">
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
          </Section>

          <Section title="Account" icon={<Award size={16} />}>
            <InfoCard label="Joined" value={formatDate(user.createdAt)} />
          </Section>
        </aside>
      </div>
    </>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.section className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-white">
          {icon}
        </div>

        <h2 className="text-sm font-bold">{title}</h2>
      </div>

      <div className="mt-6">{children}</div>
    </motion.section>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
      <p className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">
        {label}
      </p>

      <p className="mt-2 break-words text-xs font-semibold text-zinc-800">
        {value}
      </p>
    </div>
  );
}

function SocialLink({ label, href }: { label: string; href: string }) {
  return (
    <motion.a
      whileHover={{ x: 3 }}
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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date?: string | null) {
  if (!date) return "Not specified";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
