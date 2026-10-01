"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  Check,
  Loader2,
  Mail,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { joinWaitlist } from "@/app/services/auth.service";

gsap.registerPlugin(ScrollTrigger);

type Card = {
  title: string;
  subtitle: string;
  activeDots: number;
};

const cards: Card[] = [
  {
    title: "100 People, 100 Great Ideas",
    subtitle:
      "Late-night eureka moment. A fresh Notion page. Group chats buzzing with “bro, what if we made...” Everyone thinks they’re about to quit their job.",
    activeDots: 100,
  },
  {
    title: "2/3 Never Make It Past The Brainstorm.",
    subtitle:
      "Life gets busy. The hype cools off. Without anyone pushing them forward, the idea gets buried under everyday routine and",
    activeDots: 67,
  },
  {
    title: "27 crash headfirst into the messy middle.",
    subtitle:
      "You actually started. But handling design, code, marketing, and strategy solo is exhausting. When you carry the entire weight by yourself, friction wins.",
    activeDots: 27,
  },
  {
    title: "The build is live. The tank is empty.",
    subtitle:
      "You launched. You survived the messy middle. But now the real roadblocks hit bugs, distribution, and you’re running the entire circus solo. Burnout creeps in and whispers ‘Time to give up!!’",
    activeDots: 12,
  },
  {
    title: "You Did It, But Realized Something.",
    subtitle:
      "You weathered the storm and crossed the line. But here’s the truth: it was never a solo sprint. It’s a relay marathon.",
    activeDots: 1,
  },
];

export default function DotGridSlider() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardStageRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  /* =========================
     TOAST AUTO CLOSE
  ========================= */

  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => {
      setToast(null);
    }, 3500);

    return () => clearTimeout(timeout);
  }, [toast]);

  /* =========================
     WAITLIST SUBMIT
  ========================= */

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

  /* =========================
     GSAP
  ========================= */

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const cardStage = cardStageRef.current;

    const cardElements = cardsRef.current.filter(
      (card): card is HTMLDivElement => card !== null,
    );

    if (!section || !cardStage || !cardElements.length) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
        },
        (context) => {
          const conditions = context.conditions as {
            desktop?: boolean;
            mobile?: boolean;
          };

          const isMobile = Boolean(conditions.mobile);

          const enterY = isMobile ? 100 : 125;
          const exitY = isMobile ? -100 : -125;

          const enterTilt = isMobile ? 5 : 6;
          const exitTilt = isMobile ? -3 : -4;

          const totalScroll = isMobile ? 2200 : 2700;

          gsap.set(cardElements, {
            x: 0,
            y: enterY,
            rotateX: enterTilt,
            rotateY: 0,
            rotateZ: 0,
            scale: 0.95,
            opacity: 0,
            transformPerspective: 1400,
            transformOrigin: "50% 100%",
            force3D: true,
          });

          gsap.set(cardElements[0], {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            opacity: 1,
          });

          const timeline = gsap.timeline({
            defaults: {
              ease: "power3.inOut",
            },

            scrollTrigger: {
              trigger: cardStage,
              start: "top 25%",
              end: `+=${totalScroll}`,
              scrub: 0.8,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          for (let i = 1; i < cardElements.length; i++) {
            const previous = cardElements[i - 1];
            const current = cardElements[i];

            timeline.to({}, { duration: 0.35 });

            timeline.to(previous, {
              x: 0,
              y: exitY,
              rotateX: exitTilt,
              rotateY: 0,
              rotateZ: 0,
              scale: 0.97,
              opacity: 0,
              duration: 0.65,
              ease: "power2.in",
            });

            timeline.fromTo(
              current,
              {
                x: 0,
                y: enterY,
                rotateX: enterTilt,
                rotateY: 0,
                rotateZ: 0,
                scale: 0.95,
                opacity: 0,
              },
              {
                x: 0,
                y: 0,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 1,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
              },
              "<0.12",
            );
          }

          timeline.to({}, { duration: 0.5 });

          return () => {
            timeline.kill();
          };
        },
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full overflow-hidden bg-white"
    >
      {/* HEADING */}
      <div className="mx-auto w-full max-w-7xl px-5 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
            Build something meaningful
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-gray-500 sm:text-base">
            Find people who share your ambition, complement your skills and
            want to build something extraordinary together.
          </p>
        </div>
      </div>

      {/* PINNED CARD AREA */}
      <div
        ref={cardStageRef}
        className="relative mx-auto mt-6 flex h-[560px] w-full max-w-7xl items-center justify-center px-5 sm:mt-8 sm:h-[590px] sm:px-8"
        style={{ perspective: "1400px" }}
      >
        {/* CARD */}
        <div className="relative h-[440px] w-full max-w-4xl sm:h-[480px]">
          {cards.map((card, cardIndex) => (
            <div
              key={card.title}
              ref={(el) => {
                cardsRef.current[cardIndex] = el;
              }}
              className="absolute inset-0"
              style={{
                zIndex: cardIndex + 1,
                willChange: "transform, opacity",
              }}
            >
              <div className="flex h-full w-full flex-col rounded-[28px] bg-gray-50 px-5 py-6 sm:rounded-[32px] sm:px-8 sm:py-8">
                {/* 100 DOT MATRIX */}
                <div className="flex min-h-0 flex-1 items-end">
                  <div className="grid w-full grid-cols-8 place-items-center gap-2 sm:gap-3.5">
                    {Array.from({ length: 100 }).map((_, index) => {
                      const isActive = index < card.activeDots;

                      return (
                        <div
                          key={index}
                          className={`h-5 w-5 rounded-full transition-colors sm:h-4 sm:w-4 ${
                            isActive ? "bg-black" : "bg-gray-300"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* TEXT */}
                <div className="shrink-0">
                  <h3 className="mt-6 max-w-3xl text-xl font-bold leading-[1.08] tracking-tight text-black sm:mt-8 sm:text-3xl lg:text-[38px]">
                    {card.title}
                  </h3>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 sm:mt-4 sm:text-[15px] sm:leading-6">
                    {card.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PROGRESS DOTS */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 sm:bottom-5">
          {cards.map((_, index) => (
            <div
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-black/20 sm:h-2 sm:w-2"
            />
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center bg-white px-5 pb-20 pt-10 sm:pb-28 sm:pt-14">
        <button
          type="button"
          onClick={() => setIsWaitlistOpen(true)}
          className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-800 active:scale-95"
        >
          Join Waitlist

          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </div>

      {/* =========================
          WAITLIST MODAL
      ========================= */}

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
            {/* Decorative gradients */}
            <div className="absolute -right-24 -top-24 h-48 w-48 rounded-full bg-indigo-200/50 blur-3xl" />

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

              <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
                Get early access.
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
                Cofinder is getting ready. Join the waitlist and we’ll let you
                know when we’re live.
              </p>

              {/* Form */}
              <form
                onSubmit={handleJoinWaitlist}
                className="mt-7 space-y-4"
              >
                <div>
                  <label
                    htmlFor="dotgrid-waitlist-email"
                    className="mb-2 block text-sm font-semibold text-black"
                  >
                    Email address
                  </label>

                  <input
                    id="dotgrid-waitlist-email"
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

      {/* =========================
          TOAST
      ========================= */}

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
                {toast.type === "success"
                  ? "You're in!"
                  : "Something went wrong"}
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
    </section>
  );
}