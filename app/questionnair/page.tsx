"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  getProfileQuestions,
  submitProfileAnswer,
} from "../services/profile_questions.service";
import PremiumLoader from "../(protected)/dashboard/Dashboard-Components/PremiumLoader";

const setInfo = [
  {
    id: 1,
    title: "Part  1 of 3",
    subtitle: "Understanding Personality ",
    description:
      "Answer the following questions to establish your initial profile.",
  },
  {
    id: 2,
    title: "Part 2 of 3",
    subtitle: "Understanding Preference",
    description: "Let's continue evaluating your workflow and consistency.",
  },
  {
    id: 3,
    title: "Part 3 of 3 ",
    subtitle: "Understanding Importance",
    description: "Complete the final questions to finish your profile.",
  },
];

export default function QuestionnairePage() {
  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "warning";
    title: string;
    message: string;
    buttonText?: string;
  }>({
    isOpen: false,
    type: "warning",
    title: "",
    message: "",
  });

  const showModal = (
    type: "success" | "error" | "warning",
    title: string,
    message: string,
    buttonText = "Continue",
  ) => {
    setModal({
      isOpen: true,
      type,
      title,
      message,
      buttonText,
    });
  };
  const [currentSet, setCurrentSet] = useState(0);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [questions, setQuestions] = useState<any[][]>([[], [], []]);

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const activeSet = {
    ...setInfo[currentSet],
    questions: questions[currentSet],
  };
  const questionKey = `${currentSet}-${currentQuestion}`;

  const isFirstSet = currentSet === 0;
  const isLastSet = currentSet === setInfo.length - 1;
  const isFirstQuestion = currentQuestion === 0;
  const isLastQuestion = currentQuestion === activeSet.questions.length - 1;

  const fetchQuestions = async (setNumber: number) => {
    try {
      setLoading(true);

      const response = await getProfileQuestions(setNumber);

      const fetchedQuestions = response.data.questions;

      setQuestions((prev) => {
        const updated = [...prev];
        updated[setNumber - 1] = fetchedQuestions;
        return updated;
      });
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(1);
  }, []);

  const handleNext = async () => {
    const key = `${currentSet}-${currentQuestion}`;

    // Answer select kiya hai ya nahi
    if (!answers[key]) {
      showModal(
        "warning",
        "Answer Required",
        "Please select an answer before continuing.",
      );
      return;
    }

    setDirection("next");

    // More questions in current set
    if (!isLastQuestion) {
      setCurrentQuestion((prev) => prev + 1);
      return;
    }

    // Last question of current set
    try {
      setSubmitting(true);

      // Prepare answers according to backend model
      const setAnswers = activeSet.questions.map(
        (question: any, index: number) => {
          return {
            question: question._id,
            answer: answers[`${currentSet}-${index}`],
          };
        },
      );

      console.log("Answers sending:", setAnswers);

      const response = await submitProfileAnswer(currentSet + 1, setAnswers);

      console.log("Submit Response:", response.data);

      // Current set completed
      if (!isLastSet) {
        await fetchQuestions(currentSet + 2);

        setCurrentSet((prev) => prev + 1);
        setCurrentQuestion(0);
        setStarted(false);

        return;
      }

      // All sets completed
      showModal(
        "success",
        "Assessment Completed 🎉",
        `Your profile is now ${response.data.profileCompletion}% complete.`,
        "Done",
      );
    } catch (error: any) {
      console.error("Submit error:", error);

      showModal(
        "error",
        "Something went wrong",
        error?.response?.data?.message ||
          "We couldn't submit your answers. Please try again.",
        "Try Again",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handlePrev = () => {
    setDirection("prev");

    if (!isFirstQuestion) {
      setCurrentQuestion((prev) => prev - 1);
      return;
    }

    if (!isFirstSet) {
      const prevSetIdx = currentSet - 1;
      setCurrentSet(prevSetIdx);
      setCurrentQuestion(questions[prevSetIdx].length - 1);
      setStarted(true);
    }
  };

  const progressPercent =
    ((currentQuestion + 1) / activeSet.questions.length) * 100;

  const slideVariants = {
    enter: (dir: "next" | "prev") => ({
      x: dir === "next" ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: "next" | "prev") => ({
      x: dir === "next" ? -30 : 30,
      opacity: 0,
    }),
  };


  if(loading){
    return (
      <PremiumLoader/>
    )
  }

  return (
    <div className="relative min-h-screen bg-white text-zinc-900 flex flex-col justify-between p-6 md:p-12 overflow-hidden antialiased font-sans">
      {/* Structural Grid Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] -z-10 pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-3xl mx-auto flex justify-between items-center border-b border-zinc-200 pb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-black" />
          <span className="text-xs uppercase tracking-[0.2em] font-mono font-bold text-zinc-800">
            Assessment Portal
          </span>
        </div>
        <span className="text-xs font-mono tracking-widest text-zinc-600 bg-zinc-100 border border-zinc-300 px-3 py-1 rounded-full">
          0{currentSet + 1} / 0{setInfo.length}
        </span>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-2xl mx-auto my-auto py-8">
        <AnimatePresence mode="wait" custom={direction}>
          {!started ? (
            /* Intro Card */
            <motion.div
              key={`intro-${currentSet}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="bg-white border-2 border-black rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
            >
              <span className="inline-block text-xs uppercase tracking-widest font-mono font-semibold text-zinc-500 mb-3">
                {activeSet.subtitle}
              </span>

              <h1 className="text-4xl font-extrabold tracking-tight text-black mb-4">
                {activeSet.title}
              </h1>

              <p className="text-zinc-600 text-lg leading-relaxed mb-10">
                {activeSet.description}
              </p>

              <div className="flex gap-4">
                {!isFirstSet && (
                  <button
                    onClick={handlePrev}
                    className="px-6 py-4 cursor-pointer rounded-xl border-2 border-black font-semibold text-black hover:bg-zinc-100 transition active:translate-y-0.5"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => setStarted(true)}
                  className="flex-1 py-4 px-8 rounded-xl cursor-pointer bg-black text-white font-semibold hover:bg-zinc-800 transition shadow-md active:translate-y-0.5"
                >
                  Start Questions
                </button>
              </div>
            </motion.div>
          ) : (
            /* Question Card */
            <motion.div
              key={`q-${currentSet}-${currentQuestion}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="bg-white border-2 border-black rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative"
            >
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center text-xs font-mono font-semibold text-zinc-500 mb-2">
                  <span>{activeSet.title}</span>
                  <span>
                    QUESTION {currentQuestion + 1} OF{" "}
                    {activeSet.questions.length}
                  </span>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full border border-zinc-200 overflow-hidden">
                  <motion.div
                    className="bg-black h-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <h2 className="text-2xl md:text-3xl font-bold text-black leading-snug tracking-tight mb-10 min-h-[80px]">
                {activeSet.questions[currentQuestion]?.question}{" "}
              </h2>

              {/* Answer Options */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 mb-10">
                <div className="text-xs uppercase font-mono tracking-wider font-bold text-zinc-400 mb-4">
                  Select your answer
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeSet.questions[currentQuestion]?.options?.map(
                    (option: string, index: number) => {
                      const key = `${currentSet}-${currentQuestion}`;
                      const selected = answers[key] === option;

                      return (
                        <button
                          key={index}
                          onClick={() => {
                            setAnswers((prev) => ({
                              ...prev,
                              [key]: option,
                            }));
                          }}
                          className={` cursor-pointer
              w-full text-left p-5 rounded-xl border-2
              transition-all
              ${
                selected
                  ? "border-black bg-black text-white"
                  : "border-zinc-200 bg-white text-zinc-800 hover:border-black"
              }
            `}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${selected ? "border-white" : "border-zinc-400"}
                `}
                            >
                              {selected && (
                                <div className="w-2.5 h-2.5 rounded-full bg-white" />
                              )}
                            </div>

                            <span className="font-semibold">{option}</span>
                          </div>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4">
                {(!isFirstQuestion || !isFirstSet) && (
                  <button
                    onClick={handlePrev}
                    className="px-6 py-4 rounded-xl cursor-pointer border-2 border-black font-semibold text-black hover:bg-zinc-100 transition active:translate-y-0.5"
                  >
                    ← Previous
                  </button>
                )}

                <button
                  onClick={handleNext}
                  disabled={submitting}
                  className="flex-1 py-4 px-6 rounded-xl cursor-pointer bg-black text-white font-semibold hover:bg-zinc-800 transition shadow-md active:translate-y-0.5 disabled:opacity-60"
                >
                  {submitting
                    ? "Submitting..."
                    : isLastQuestion
                      ? isLastSet
                        ? "Complete Assessment 🎉"
                        : "Next Section →"
                      : "Next Question →"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-3xl mx-auto text-center text-xs text-zinc-400 font-mono tracking-widest pt-4 border-t border-zinc-200">
        QUESTIONNAIRE PORTAL • LIGHT GRID EDITION
      </footer>
    </div>
  );
}
