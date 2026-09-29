
"use client";

import React, { useState, useEffect } from "react";
import {
  animate,
  useMotionValue,
  useTransform,
  motion,
  type Variants,
} from "framer-motion";
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
  X,
  Mail,
  Loader2,
} from "lucide-react";
import HowItWorks from "./Home-Components/HowItWorks";
import BuiltFor from "./Home-Components/BuiltFor";
import BuiltBy from "./Home-Components/BuiltBy";
import Image from "next/image";
import hero from "../../../public/images/img1.png";
import why from "../../../public/images/why.png";
import img2 from "../../../public/images/img2.png";
import img3 from "../../../public/images/img3.png";
import img4 from "../../../public/images/img4.png";
import DotGrid from "./Home-Components/DotGrid";
import { joinWaitlist } from "@/app/services/auth.service";

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

function ProgressCircle() {
  const progress = 80;

  const circumference = 2 * Math.PI * 38;
  const motionValue = useMotionValue(0);

  const dashOffset = useTransform(
    motionValue,
    (value) => circumference - (value / 100) * circumference,
  );

  const percentage = useTransform(motionValue, (value) => Math.round(value));

  useEffect(() => {
    const controls = animate(motionValue, progress, {
      duration: 2,
      delay: 1,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [motionValue]);

  return (
    <div className="relative flex h-24 w-24 items-center justify-center">
      <svg className="h-full w-full -rotate-90">
        <circle
          cx="48"
          cy="48"
          r="38"
          stroke="currentColor"
          strokeWidth="8"
          className="text-slate-200"
          fill="transparent"
        />

        <motion.circle
          cx="48"
          cy="48"
          r="38"
          stroke="currentColor"
          strokeWidth="8"
          className="text-black"
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={circumference}
          style={{
            strokeDashoffset: dashOffset,
          }}
        />
      </svg>

      <div className="absolute flex items-end">
        <motion.span className="text-xl font-bold text-black">
          {percentage}
        </motion.span>

        <span className="mb-1 text-xs font-semibold">%</span>
      </div>
    </div>
  );
}

export default function CofinderLanding() {
  const [activeTab, setActiveTab] = useState<"founder" | "builder">("founder");

  const [count, setCount] = useState(() =>
    Math.floor(10000 + Math.random() * 90000),
  );

  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => {
      setToast(null);
    }, 3500);

    return () => clearTimeout(timeout);
  }, [toast]);

  const handleJoinWaitlist = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setToast({
        type: "error",
        message: "Please enter your email address.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await joinWaitlist(trimmedEmail);

      if (response?.success) {
        setToast({
          type: "success",
          message: "You're on the waitlist! We'll keep you posted.",
        });

        setEmail("");
        setIsWaitlistOpen(false);
      } else {
        setToast({
          type: "error",
          message: response?.message || "Something went wrong.",
        });
      }
    } catch (error: any) {
      setToast({
        type: "error",
        message:
          error?.response?.data?.message ||
          "Unable to join the waitlist. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans antialiased overflow-hidden">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-200/40 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[15%] w-[400px] h-[400px] bg-purple-200/30 rounded-full blur-[100px]" />
      </div>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-24 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[620px]">
          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="flex flex-col justify-center space-y-7"
          >
            <motion.div variants={fadeInUp}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-black">
                Start the sprint.
                <br />
                Pass the Baton.
              </h1>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-gray-500 text-base sm:text-lg max-w-lg leading-relaxed"
            >
              Building isn’t a solo marathon. Connect with high-conviction
              creators, share the weight, and ship what matters.
            </motion.p>

            {/* Join Waitlist Button */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <button
                type="button"
                onClick={() => setIsWaitlistOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full cursor-pointer hover:scale-105 duration-300 active:scale-95 bg-black px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800"
              >
                Join Waitlist
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="flex items-center justify-center lg:justify-end"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-full max-w-[620px]"
            >
              <Image
                src={hero}
                alt="Cofinder platform"
                width={900}
                height={700}
                priority
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </motion.div>
        </div>
      </main>

      <div className="bg-black text-white text-center px-6 py-4 rounded-2xl w-[250px] sm:w-[400px] mx-auto">
        <motion.span className="text-3xl font-bold tracking-wider tabular-nums">
          {count.toLocaleString()}
        </motion.span>

        <p className="pt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
        </p>
      </div>

      <DotGrid />

      {/* FEATURES SECTION */}
      <section className="w-full bg-white px-4 sm:px-6 py-16 sm:py-20 lg:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="w-full flex justify-center"
            >
              <Image
                src={why}
                alt="Why Cofinder"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full flex justify-center"
            >
              <Image
                src={img2}
                alt="Cofinder feature"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="w-full flex justify-center"
            >
              <Image
                src={img3}
                alt="Cofinder feature"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full flex justify-center"
            >
              <Image
                src={img4}
                alt="Cofinder feature"
                width={800}
                height={800}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <HowItWorks />
      <BuiltFor />
      <BuiltBy />

      {/* WAITLIST MODAL */}
      {isWaitlistOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setIsWaitlistOpen(false);
            }
          }}
        >
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 20,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            {/* Decorative gradient */}
            <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-indigo-200/50 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-purple-200/40 blur-3xl" />

            <div className="relative p-6 sm:p-8">
              {/* Close */}
              <button
                type="button"
                onClick={() => setIsWaitlistOpen(false)}
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-black"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
                className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white"
              >
                <Mail className="h-6 w-6" />
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-black">
                Get early access.
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
                Cofinder is getting ready. Join the waitlist and we’ll let you
                know when we’re live.
              </p>

              <form
                onSubmit={handleJoinWaitlist}
                className="mt-7 space-y-4"
              >
                <div>
                  <label
                    htmlFor="waitlist-email"
                    className="mb-2 block text-sm font-semibold text-black"
                  >
                    Email address
                  </label>

                  <input
                    id="waitlist-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={isSubmitting}
                    className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black focus:bg-white focus:ring-2 focus:ring-black/5 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join the Waitlist
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <p className="mt-4 text-center text-[11px] text-gray-400">
                No spam. Just a notification when Cofinder is ready.
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <motion.div
          initial={{
            opacity: 0,
            y: -20,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: -20,
            scale: 0.95,
          }}
          className="fixed right-4 top-5 z-[200] w-[calc(100%-2rem)] max-w-sm"
        >
          <div
            className={`flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-xl ${
              toast.type === "success"
                ? "border-green-100"
                : "border-red-100"
            }`}
          >
            <div
              className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                toast.type === "success"
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {toast.type === "success" ? (
                <Check className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-black">
                {toast.type === "success" ? "You're in!" : "Something went wrong"}
              </p>

              <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-gray-400 transition hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
