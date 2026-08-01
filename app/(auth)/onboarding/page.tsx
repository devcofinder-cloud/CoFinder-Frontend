"use client";
import {
  getQuestions,
  submitQuestionnaire,
} from "@/app/services/questianair.service";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import ArchetypeCard from "./ArchetypeCard";
import { AnimatePresence } from "framer-motion";


// ---------- Types ----------
// NOTE: The backend returns slider-style questions, so the shape below
// matches that (not the old choice_single/chips/checkbox_multi model).
interface BackendQuestion {
  _id: string;
  question: string;
  type: string;
  options: [string, string];
  required: boolean;
  order: number;
}
type Answers = Record<string, number>;

export default function CofinderOnboarding() {
  const appRouter = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [archetype, setArchetype] = useState('')
  
const [showArchetype, setShowArchetype] = useState(false);

  // Navigation & animation states
  const [slideDirection, setSlideDirection] = useState<"in" | "out">("in");
  const [validationError, setValidationError] = useState<string>("");
  const [isOnboardingCompleted, setIsOnboardingCompleted] =
    useState<boolean>(false);
  const [isSimulatingLoad, setIsSimulatingLoad] = useState<boolean>(false);

  const [questions, setQuestions] = useState<BackendQuestion[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string>("");

  const [answers, setAnswers] = useState<Answers>({});

  const fetchQuestions = async () => {
    setIsLoadingQuestions(true);
    setLoadError("");
    try {
      const res = await getQuestions();
      setQuestions(res.data ?? []);
    } catch (error) {
      console.log(error);
      setLoadError("We couldn't load your questions. Please try again.");
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmitQuestionnaire = async () => {
  try {
    const payload = {
      answers: questions.map((q) => ({
        question: q._id,
        answer: answers[q._id],
      })),
    };

    const res = await submitQuestionnaire(payload);

   if (res.success) {
  setArchetype(res.data.archetype);

  setShowArchetype(true);

  setTimeout(() => {
    setShowArchetype(false);
    setIsOnboardingCompleted(true);
  }, 3000);
}
  } catch (err) {
    console.log(err);
  }
};

  const activeQuestion = questions[currentIndex];
  const sliderValue = activeQuestion ? (answers[activeQuestion._id] ?? 3) : 3;

  const progressPercent =
    questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const handleSliderChange = (value: number) => {
    if (!activeQuestion) return;
    setAnswers((prev) => ({
      ...prev,
      [activeQuestion._id]: value,
    }));
    setValidationError("");
  };

  const triggerNavigation = (directionCallback: () => void) => {
    setSlideDirection("out");
    setTimeout(() => {
      directionCallback();
      setSlideDirection("in");
    }, 150);
  };

  const validateCurrentStep = (): boolean => {
    if (!activeQuestion) return false;

    if (
      activeQuestion.required !== false &&
      answers[activeQuestion._id] === undefined
    ) {
      setValidationError("Please choose your preference to continue.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) return;

    if (currentIndex === questions.length - 1) {
      await handleSubmitQuestionnaire();
      return;
    }

    triggerNavigation(() => {
      setCurrentIndex((prev) => prev + 1);
    });
  };


  const handlePrev = () => {
    if (currentIndex > 0) {
      setValidationError("");
      triggerNavigation(() => {
        setCurrentIndex((prev) => prev - 1);
      });
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsOnboardingCompleted(false);
    setValidationError("");
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden selection:bg-zinc-900 selection:text-white">
      {/* Background Ambient Glows (Very subtle warm & soft neutral lights) */}
      <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-zinc-200/50 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-4 w-[500px] h-[500px] bg-zinc-100/60 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Main Container: Elegant soft borders and deep premium charcoal shadow */}
      <div className="grid h-[90vh] min-h-[750px] w-full max-w-7xl overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white lg:grid-cols-12 shadow-[0_32px_100px_-20px_rgba(0,0,0,0.06)] relative z-10">
        {/* LEFT COLUMN (Brand & Teaser) - 5 Cols wide */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-16 relative overflow-hidden border-r border-zinc-100 bg-[#fbfbfb]">
          {/* Subtle grid pattern background in light gray */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-zinc-900 animate-pulse" />
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 font-sans cursor-default">
                Cofinder
              </h1>
            </div>

            <div className="mt-12 space-y-2">
              <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
                The Founder Protocol
              </p>
              <div className="h-[2px] w-8 bg-zinc-200" />
              <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px] pt-2">
                Accelerating matching speed through operational telemetry.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white text-xs text-zinc-600 mb-6 shadow-sm">
              <svg
                className="w-3.5 h-3.5 text-zinc-500 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                ></path>
              </svg>
              <span className="font-medium">Active Matchmaking Network</span>
            </div>

            <h2 className="text-5xl font-light tracking-tight text-zinc-900 leading-[1.15]">
              Find your <br />
              <span className="font-serif italic text-zinc-600 font-normal">
                perfect
              </span>{" "}
              <br />
              co-founder.
            </h2>

            <p className="mt-6 text-zinc-500 text-base leading-relaxed max-w-sm">
              Meet builders, technical visionaries, global growth hackers, and
              operators ready to execute at venture velocity.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN (The Dynamic Slide Interface) - 7 Cols wide */}
        <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-12 lg:p-16 bg-white overflow-y-auto hide-scrollbar">
          {/* Top Progress Tracker */}
          <div className="w-full">
            {/* Mobile View Header Title */}
            <div className="lg:hidden flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-zinc-900" />
                <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
                  Cofinder
                </h1>
              </div>
              {questions.length > 0 && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600">
                  Step{" "}
                  {isOnboardingCompleted ? questions.length : currentIndex + 1}{" "}
                  of {questions.length}
                </span>
              )}
            </div>

            {/* Premium Micro Progress Bar Indicator */}
            {!isOnboardingCompleted &&
              !isSimulatingLoad &&
              questions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-mono tracking-wider">
                    <span>ONBOARDING CALIBRATION</span>
                    <span className="text-zinc-700 font-semibold">
                      {Math.round(progressPercent)}%
                    </span>
                  </div>
                  <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-zinc-900 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
          </div>

          {/* Core Questionnaire Slider Component Container */}
          <div className="my-auto py-8">
            {isLoadingQuestions ? (
              <div className="flex flex-col items-center justify-center text-center space-y-6 py-12">
                <div className="h-16 w-16 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin" />
                <p className="text-zinc-400 text-sm">
                  Loading your questions...
                </p>
              </div>
            ) : loadError ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
                <p className="text-zinc-600 text-sm">{loadError}</p>
                <button
                  onClick={fetchQuestions}
                  className="h-10 px-5 rounded-xl bg-zinc-900 text-white text-sm font-medium hover:bg-black transition-all"
                >
                  Retry
                </button>
              </div>
            ) : questions.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center py-12">
                <p className="text-zinc-400 text-sm">
                  No questions available right now.
                </p>
              </div>
            ) : isSimulatingLoad ? (
              <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 animate-pulse">
                <div className="relative">
                  <div className="h-16 w-16 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-zinc-800 text-xs font-bold font-mono">
                    AI
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-zinc-900">
                    Calibrating Match Profiles...
                  </h3>
                  <p className="text-zinc-400 text-sm max-w-xs mx-auto">
                    Evaluating compatible venture stages, skill gaps, and active
                    commitments.
                  </p>
                </div>
              </div>
            ) : isOnboardingCompleted ? (
              <div className="space-y-8 animate-fadeIn">
                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 mb-2">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
                    Onboarding Completed
                  </h2>
                  <p className="text-zinc-500 text-sm">
                    We've synthesized your persona model. Here is your matching
                    footprint:
                  </p>
                </div>

                {/* Match Summary Telemetry Card - built from the actual answered questions */}
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 space-y-4">
                  {questions.map((q, i) => (
                    <div
                      key={q._id}
                      className={i > 0 ? "border-t border-zinc-100 pt-3" : ""}
                    >
                      <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase block mb-1">
                        {q.question}
                      </span>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-zinc-500">{q.options[0]}</span>
                        <span className="text-zinc-900 font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-xs">
                          {answers[q._id] ?? "—"}
                        </span>
                        <span className="text-zinc-500">{q.options[1]}</span>
                      </div>
                    </div>
                  ))}
                </div>

               

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() =>
                      appRouter.push('/dashboard')
                    }
                    className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white font-medium text-sm hover:bg-black transition-all duration-200 active:scale-[0.98] shadow-sm"
                  >
                    <span>DashBoard</span>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>

                  <button
                    onClick={handleRestart}
                    className="w-full h-12 flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-200 active:scale-[0.98] text-sm"
                  >
                    <span>Recalibrate Answers</span>
                  </button>
                </div>
              </div>
            ) : (
              <div
                className={`transition-all duration-200 ease-in-out ${slideDirection === "in" ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-4"}`}
              >
                <div className="space-y-2 mb-8">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-400 font-bold uppercase block">
                    QUESTION {String(currentIndex + 1).padStart(2, "0")} OF{" "}
                    {String(questions.length).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-zinc-900 leading-tight">
                    {activeQuestion.question}
                  </h2>
                  <p className="text-sm text-zinc-500">{activeQuestion.type}</p>
                </div>

                {/* Validation Error Banner */}
                {validationError && (
                  <div className="mb-6 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium flex items-center gap-2 animate-shake">
                    <svg
                      className="w-4 h-4 shrink-0 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      ></path>
                    </svg>
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Slider input for the current question */}
                <div className="space-y-4">
                  <div className="space-y-12">
                    <div className="flex items-center justify-between">
                      <div className="max-w-[180px]">
                        <p className="text-lg font-semibold text-zinc-900">
                          {activeQuestion.options[0]}
                        </p>
                        <p className="mt-2 text-sm text-zinc-500">
                          Strongly Agree
                        </p>
                      </div>

                      <div className="h-14 w-14 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-center justify-center">
                        <span className="text-xl font-bold">{sliderValue}</span>
                      </div>

                      <div className="max-w-[180px] text-right">
                        <p className="text-lg font-semibold text-zinc-900">
                          {activeQuestion.options[1]}
                        </p>
                        <p className="mt-2 text-sm text-zinc-500">
                          Strongly Agree
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <input
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={sliderValue}
                        onChange={(e) =>
                          handleSliderChange(Number(e.target.value))
                        }
                        className="w-full accent-black cursor-pointer"
                      />

                      <div className="flex justify-between text-xs text-zinc-400 font-medium">
                        <span>1</span>
                        <span>2</span>
                        <span>3</span>
                        <span>4</span>
                        <span>5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Dynamic Actions Bar */}
          {!isOnboardingCompleted &&
            !isSimulatingLoad &&
            !isLoadingQuestions &&
            !loadError &&
            questions.length > 0 && (
              <div className="flex items-center gap-3 pt-6 border-t border-zinc-100">
                {currentIndex > 0 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="h-12 px-6 rounded-xl border border-zinc-200 text-zinc-600 font-medium text-sm hover:bg-zinc-50 hover:border-zinc-300 hover:text-zinc-950 transition-all duration-150 active:scale-[0.98]"
                  >
                    Back
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="relative group h-12 flex-1 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white font-medium text-sm hover:bg-black transition-all duration-150 active:scale-[0.98] shadow-sm"
                >
                  <span>
                    {currentIndex === questions.length - 1
                      ? "Complete Calibration"
                      : "Continue"}
                  </span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    ></path>
                  </svg>
                </button>
              </div>
            )}
        </div>
      </div>
      <AnimatePresence>
  {showArchetype && (
    <ArchetypeCard archetype={archetype} />
  )}
</AnimatePresence>
    </div>
  );
}
