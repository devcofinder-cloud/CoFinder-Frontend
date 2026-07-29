"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  UserCheck,
  Code2,
  Search,
  SlidersHorizontal,
  Bookmark,
  Home,
  Users,
  MessageSquare,
  Globe,
  Settings,
  ShieldCheck,
  Rocket,
  Check,
} from "lucide-react";
import Navbar from "../components/Layout/Navbar";
import HowItWorks from "../components/Home-Components/HowItWorks";
import Footer from "../components/Layout/Footer";

// Animation Variants
const fadeInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function CofinderLanding() {
  const [activeTab, setActiveTab] = useState<"founder" | "builder">("founder");

  return (
    <div className="min-h-screen  bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 font-sans antialiased overflow-hidden">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-[100px]" />
      </div>
      {/* --- NAVIGATION BAR --- */}
      {/* <Navbar /> */}

      {/* --- HERO SECTION --- */}
      <main className="max-w-8xl  mx-auto px-6 pt-12 pb-20">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content Left */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-5 space-y-6"
          >
            {/* Pill Badge */}
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-black border border-indigo-100 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Where Ideas Meet Talent
              </span>
            </motion.div>

            <div className="relative z-10">
              <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
              <div className="z-100 relative">
                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] text-slate-900"
                >
                  Find your cofounder. <br />
                  Build something <br />
                  <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 bg-clip-text text-gray-5 italic font-serif font-normal">
                    extraordinary.
                  </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  variants={fadeInUp}
                  className="text-slate-600 text-lg max-w-md leading-relaxed"
                >
                  Cofinder connects ambitious founders and talented builders to
                  turn ideas into impactful startups.
                </motion.p>
              </div>
              {/* Main Headline */}
            </div>

            {/* Toggle CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-3 pt-2"
            >
              <button
                onClick={() => setActiveTab("founder")}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === "founder"
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-[1.02]"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <UserCheck className="w-4 h-4" />
                I'm a Founder
              </button>
              <button
                onClick={() => setActiveTab("builder")}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                  activeTab === "builder"
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-[1.02]"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Code2 className="w-4 h-4" />
                I'm a Builder
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4 pt-4 border-t border-slate-200/60"
            >
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                  alt="User"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
                  alt="User"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
                  alt="User"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
                  alt="User"
                />
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Join <span className="font-bold text-slate-800">10,000+</span>{" "}
                founders & builders building the future together.
              </p>
            </motion.div>
          </motion.div>

          {/* Hero Visual Right Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

            {/* Soft backdrop glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl -z-10" />

            <div className="flex items-center justify-center gap-4 py-4">
              {/* Vertical Sidebar */}
              <div className="bg-white/80 backdrop-blur-xl border border-slate-200/80 p-3 rounded-2xl shadow-xl flex flex-col gap-6 items-center text-slate-400">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-black flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shadow-md">
                  <Home className="w-4 h-4" />
                </div>
                <Users className="w-4 h-4 hover:text-slate-600 cursor-pointer transition-colors" />
                <MessageSquare className="w-4 h-4 hover:text-slate-600 cursor-pointer transition-colors" />
                <Bookmark className="w-4 h-4 hover:text-slate-600 cursor-pointer transition-colors" />
                <Globe className="w-4 h-4 hover:text-slate-600 cursor-pointer transition-colors" />
                <Settings className="w-4 h-4 hover:text-slate-600 cursor-pointer transition-colors" />
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"
                  alt="Profile"
                  className="w-7 h-7 rounded-full object-cover mt-4"
                />
              </div>

              {/* Main App Cards Stack */}
              <div className="flex-1 space-y-4 max-w-md">
                {/* Search Bar Header inside mockup */}
                <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-lg flex items-center justify-between">
                  <h3 className="font-bold text-slate-800 text-sm">
                    Discover Matches
                  </h3>
                  <div className="flex gap-2 text-slate-400">
                    <Search className="w-4 h-4 cursor-pointer hover:text-slate-600" />
                    <SlidersHorizontal className="w-4 h-4 cursor-pointer hover:text-slate-600" />
                  </div>
                </div>

                {/* Profile Card 1 */}
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-md space-y-3 relative group"
                >
                  <Bookmark className="w-4 h-4 absolute top-4 right-4 text-slate-300 hover:text-indigo-600 cursor-pointer" />
                  <div className="flex gap-3 items-center">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150"
                      alt="Sarah Chen"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Sarah Chen
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Product Designer
                      </p>
                      <p className="text-[10px] text-slate-400">
                        📍 San Francisco, CA
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {["UI/UX", "Figma", "Product Design"].map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Profile Card 2 */}
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-md space-y-3 relative group"
                >
                  <Bookmark className="w-4 h-4 absolute top-4 right-4 text-slate-300 hover:text-indigo-600 cursor-pointer" />
                  <div className="flex gap-3 items-center">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
                      alt="Alex Rodriguez"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Alex Rodriguez
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Full Stack Developer
                      </p>
                      <p className="text-[10px] text-slate-400">
                        📍 New York, NY
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {["React", "Node.js", "TypeScript"].map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Profile Card 3 */}
                <motion.div
                  whileHover={{ y: -3 }}
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-md space-y-3 relative group opacity-90"
                >
                  <Bookmark className="w-4 h-4 absolute top-4 right-4 text-slate-300 hover:text-indigo-600 cursor-pointer" />
                  <div className="flex gap-3 items-center">
                    <img
                      src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150"
                      alt="Maya Patel"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Maya Patel
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        Marketing Strategist
                      </p>
                      <p className="text-[10px] text-slate-400">
                        📍 Austin, TX
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {["Growth", "SEO", "Analytics"].map((skill) => (
                      <span
                        key={skill}
                        className="text-[10px] font-medium px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Floating Match Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden xl:flex flex-col items-center justify-between bg-white/95 backdrop-blur-xl p-5 rounded-3xl border border-indigo-100 shadow-2xl w-56 text-center space-y-4"
              >
                <span className="text-xs font-semibold text-slate-600">
                  Your Match Score
                </span>

                {/* Radial Gauge Visual */}
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="38"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-slate-100"
                      fill="transparent"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="38"
                      stroke="currentColor"
                      strokeWidth="8"
                      className="text-black"
                      strokeDasharray="238"
                      strokeDashoffset="24"
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <span className="absolute text-xl font-bold text-slate-900">
                    96%
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold text-slate-800">
                    Great Match!
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5 leading-tight">
                    You share similar goals and complementary skills.
                  </p>
                </div>

                <button className="w-full bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold py-2.5 rounded-xl transition-colors shadow-md">
                  Send Connection Request
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* --- FEATURES SECTION --- */}
      <section className="bg-slate-50/50 border-t border-slate-200/60 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-3 max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">
              Why Cofinder?
            </h2>
            <p className="text-slate-600 text-sm">
              Everything you need to build your dream team
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Feature Card 1 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-black flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Smart Matching
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Our algorithm matches you with compatible cofounders based on
                  skills, goals, and values.
                </p>
              </div>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-black flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Collaborate Seamlessly
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Built-in tools to chat, share ideas, and build strong
                  partnerships from day one.
                </p>
              </div>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-black flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Safe & Secure
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Verified profiles and secure messaging to ensure a safe and
                  professional environment.
                </p>
              </div>
            </motion.div>

            {/* Feature Card 4 */}
            <motion.div
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-black flex items-center justify-center">
                  <Rocket className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Build the Future
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Join a community of innovators and build something that
                  matters.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <HowItWorks />
    </div>
  );
}
