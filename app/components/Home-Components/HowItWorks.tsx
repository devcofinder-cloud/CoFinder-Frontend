"use client";

import { motion } from "framer-motion";
import { UserPlus, ClipboardList, Sparkles, Rocket } from "lucide-react";

import StepCard from "./StepCard";

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Tell us about yourself, your skills, experience, and what kind of founders or opportunities you are looking for.",
    icon: <UserPlus size={32} className="text-black" />,
  },

  {
    number: "02",
    title: "Complete Smart Assessment",
    description:
      "Answer a few questions that help us understand your personality, strengths, and working style.",
    icon: <ClipboardList size={32} className="text-black" />,
  },

  {
    number: "03",
    title: "Get Matched",
    description:
      "Our intelligent matching system connects you with founders and teams where you can create real impact.",
    icon: <Sparkles size={32} className="text-black" />,
  },

  {
    number: "04",
    title: "Start Building",
    description:
      "Collaborate, grow your network, and work with ambitious people building the future.",
    icon: <Rocket size={32} className="text-black" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Background Glow */}

      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gray-100 blur-[120px] rounded-full opacity-40" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="inline-flex px-4 py-2 rounded-full bg-indigo-50 text-black text-sm font-medium">
            How It Works
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold tracking-tight">
            Find the right people.
            <br />
            Build something amazing.
          </h2>

          <p className="mt-6 text-gray-500 text-lg leading-8">
            Our platform makes it simple to discover opportunities, connect with
            founders, and start meaningful collaborations.
          </p>
        </motion.div>

        {/* Steps */}

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} last={index === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
