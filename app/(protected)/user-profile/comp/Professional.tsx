"use client";

import { motion } from "framer-motion";
import {
  Award,
  BriefcaseBusiness,
  Building2,
  Code2,
  ExternalLink,
  GraduationCap,
  MapPin,
  Rocket,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function ProfessionalProfile({
  professionalProfile,
}: {
  professionalProfile: any;
}) {
  const skills = professionalProfile?.skills || [];
  const experience = professionalProfile?.experience || [];
  const education = professionalProfile?.education || [];
  const projects = professionalProfile?.projects || [];
  const certifications = professionalProfile?.certifications || [];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(300px,0.8fr)]">
      <div className="space-y-6">
        {professionalProfile?.about && (
          <Section title="About" icon={<BriefcaseBusiness size={16} />}>
            <p className="text-sm leading-7 text-zinc-500">
              {professionalProfile.about}
            </p>
          </Section>
        )}

        <Section title="Current Role" icon={<BriefcaseBusiness size={16} />}>
          <div className="relative overflow-hidden rounded-2xl bg-zinc-950 p-6 text-white">
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/[0.06] blur-2xl" />

            <div className="relative flex flex-col justify-between gap-6 sm:flex-row">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500">
                  Currently working as
                </p>

                <h2 className="mt-3 text-2xl font-black">
                  {professionalProfile?.currentRole || "Independent"}
                </h2>

                <p className="mt-2 text-sm text-zinc-400">
                  {professionalProfile?.currentCompany ||
                    "Building independently"}
                </p>

                {professionalProfile?.industry && (
                  <span className="mt-5 inline-flex rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-[9px] font-semibold text-zinc-300">
                    {professionalProfile.industry}
                  </span>
                )}
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-zinc-950">
                <Building2 size={22} />
              </div>
            </div>
          </div>
        </Section>

        {experience.length > 0 && (
          <Section title="Experience" icon={<BriefcaseBusiness size={16} />}>
            <div className="space-y-8">
              {experience.map((item: any, index: number) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="relative border-l border-zinc-200 pl-6"
                >
                  <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-950 ring-4 ring-white" />

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-sm font-bold">{item.role}</h3>

                      <p className="mt-1 text-xs font-semibold text-zinc-500">
                        {item.company}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-zinc-100 px-2.5 py-1 text-[9px] text-zinc-400">
                      {formatDate(item.startDate)} —{" "}
                      {item.endDate ? formatDate(item.endDate) : "Present"}
                    </span>
                  </div>

                  {item.location && (
                    <div className="mt-3 flex items-center gap-1.5 text-[10px] text-zinc-400">
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
          </Section>
        )}

        {projects.length > 0 && (
          <Section title="Projects" icon={<Rocket size={16} />}>
            <div className="grid gap-4 sm:grid-cols-2">
              {projects.map((project: any) => (
                <div
                  key={project._id}
                  className="rounded-2xl border border-zinc-200 p-5 transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white">
                      <Rocket size={16} />
                    </div>

                    <div className="flex gap-1.5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 hover:text-zinc-950"
                        >
                          <FaGithub size={13} />
                        </a>
                      )}

                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 hover:text-zinc-950"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="mt-5 text-sm font-bold">{project.title}</h3>

                  <p className="mt-2 line-clamp-3 text-xs leading-6 text-zinc-500">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {(project.technologies || []).map((technology: string) => (
                      <span
                        key={technology}
                        className="rounded-md bg-zinc-100 px-2 py-1 text-[9px] font-semibold text-zinc-500"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education" icon={<GraduationCap size={16} />}>
            <div className="grid gap-3">
              {education.map((item: any) => (
                <div
                  key={item._id}
                  className="flex gap-4 rounded-2xl border border-zinc-200 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100">
                    <GraduationCap size={17} />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold">{item.degree}</h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      {item.fieldOfStudy}
                    </p>

                    <p className="mt-3 text-xs font-semibold">
                      {item.institution}
                    </p>

                    {item.description && (
                      <p className="mt-2 text-xs leading-5 text-zinc-500">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications" icon={<Award size={16} />}>
            <div className="grid gap-3 sm:grid-cols-2">
              {certifications.map((cert: any) => (
                <div
                  key={cert._id}
                  className="rounded-2xl border border-zinc-200 p-4"
                >
                  <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
                      <Award size={15} />
                    </div>

                    <div>
                      <h3 className="text-xs font-bold">{cert.name}</h3>

                      <p className="mt-1 text-[10px] text-zinc-500">
                        {cert.issuingOrganization}
                      </p>

                      <p className="mt-1 text-[9px] text-zinc-400">
                        Issued {formatDate(cert.issueDate)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}
      </div>

      <aside>
        {skills.length > 0 && (
          <Section title="Skills" icon={<Code2 size={16} />}>
            <div className="space-y-2">
              {skills.map((skill: any) => (
                <div
                  key={skill._id}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50 p-3"
                >
                  <span className="text-xs font-semibold">{skill.name}</span>

                  <span className="rounded-full bg-zinc-950 px-2 py-1 text-[8px] font-bold text-white">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </Section>
        )}
      </aside>
    </div>
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

function formatDate(date?: string | null) {
  if (!date) return "Present";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
