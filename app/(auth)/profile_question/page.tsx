// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   ArrowLeft, 
//   ArrowRight, 
//   Check, 
//   Sparkles, 
//   Trophy, 
//   RotateCcw 
// } from "lucide-react";

// // Sample Question Dataset Structure
// const QUIZ_ROUNDS = [
//   {
//     round: 1,
//     title: "Core Work Style & Speed",
//     description: "Understand how you make decisions and execute under pressure.",
//     questions: [
//       {
//         id: 1,
//         question: "How do you typically handle project roadmaps?",
//         options: [
//           "Ship fast, iterate based on real feedback",
//           "Create detailed systems and plans first",
//           "Focus on deep user research before writing code",
//           "Align with the team and build consensus"
//         ]
//       },
//       {
//         id: 2,
//         question: "When faced with an unexpected bug on production, you:",
//         options: [
//           "Hotfix immediately directly on production",
//           "Isolate in staging, test thoroughly, then deploy",
//           "Gather user reports to measure total impact first",
//           "Sync with the engineering lead to assign priority"
//         ]
//       },
//       // ... Add questions 3-10 here
//     ]
//   },
//   {
//     round: 2,
//     title: "Cofounder Dynamics",
//     description: "Identify how you collaborate and balance team dynamics.",
//     questions: [
//       {
//         id: 11,
//         question: "What qualities do you look for most in a cofounder?",
//         options: [
//           "Complements my technical or domain weaknesses",
//           "Matches my execution speed and energy level",
//           "Brings operational discipline and structure",
//           "Has strong industry network and fundraising ability"
//         ]
//       },
//       // ... Add questions 12-20 here
//     ]
//   },
//   {
//     round: 3,
//     title: "Vision & Long-Term Strategy",
//     description: "Determine how you view market trends and company scale.",
//     questions: [
//       {
//         id: 21,
//         question: "What is your primary goal for building a startup?",
//         options: [
//           "Build a hyper-growth venture-backed unicorn",
//           "Create a highly profitable bootstrapped business",
//           "Solve a massive technical problem",
//           "Build an iconic brand with long-term culture"
//         ]
//       },
//       // ... Add questions 22-30 here
//     ]
//   }
// ];

// export default function QuestionnaireFlow() {
//   const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState<Record<number, string>>({});
//   const [isCompleted, setIsCompleted] = useState(false);

//   const currentRound = QUIZ_ROUNDS[currentRoundIndex];
//   const currentQuestion = currentRound.questions[currentQuestionIndex];

//   // Overall Progress Calculations
//   const totalQuestions = QUIZ_ROUNDS.reduce((acc, r) => acc + r.questions.length, 0);
//   const answeredCount = Object.keys(answers).length;
//   const overallProgress = Math.round((answeredCount / totalQuestions) * 100);

//   const selectedOption = answers[currentQuestion.id];

//   const handleSelectOption = (option: string) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [currentQuestion.id]: option,
//     }));
//   };

//   const handleNext = () => {
//     if (currentQuestionIndex < currentRound.questions.length - 1) {
//       setCurrentQuestionIndex((prev) => prev + 1);
//     } else if (currentRoundIndex < QUIZ_ROUNDS.length - 1) {
//       setCurrentRoundIndex((prev) => prev + 1);
//       setCurrentQuestionIndex(0);
//     } else {
//       setIsCompleted(true);
//     }
//   };

//   const handleBack = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex((prev) => prev - 1);
//     } else if (currentRoundIndex > 0) {
//       setCurrentRoundIndex((prev) => prev - 1);
//       const prevRoundQuestions = QUIZ_ROUNDS[currentRoundIndex - 1].questions;
//       setCurrentQuestionIndex(prevRoundQuestions.length - 1);
//     }
//   };

//   if (isCompleted) {
//     return (
//       <div className="min-h-screen bg-[#fafafa] text-zinc-900 flex items-center justify-center p-4 sm:px-6 relative overflow-hidden selection:bg-zinc-900 selection:text-white font-sans">
//         {/* Background Ambient Glows */}
//         <div className="absolute top-0 -left-4 w-96 h-96 bg-zinc-200/50 rounded-full filter blur-[120px] pointer-events-none" />
//         <div className="absolute bottom-0 right-4 w-96 h-96 bg-zinc-100/60 rounded-full filter blur-[120px] pointer-events-none" />

//         <motion.div 
//           initial={{ opacity: 0, y: 15 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, ease: 'easeOut' }}
//           className="max-w-xl w-full bg-white border border-zinc-200/80 rounded-[24px] p-8 sm:p-12 shadow-[0_32px_100px_-20px_rgba(0,0,0,0.06)] relative z-10 text-center"
//         >
//           <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white flex items-center justify-center mx-auto mb-6 shadow-sm">
//             <Trophy size={28} />
//           </div>
          
//           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-600 mb-4 font-medium">
//             <Sparkles size={12} className="text-zinc-500" />
//             <span>Assessment Complete</span>
//           </div>

//           <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-zinc-900 mb-3">
//             All 3 Rounds Cleared!
//           </h1>
//           <p className="text-zinc-500 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
//             We’ve analyzed your responses across all 30 questions. Your custom archetype and cofounder compatibility profile are ready.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-3">
//             <button 
//               onClick={() => setIsCompleted(false)}
//               className="flex-1 h-12 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white font-medium text-sm hover:bg-black transition-all duration-200 active:scale-[0.98] shadow-sm group"
//             >
//               <span>View Your Archetype</span>
//               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//             </button>
            
//             <button 
//               onClick={() => {
//                 setAnswers({});
//                 setCurrentRoundIndex(0);
//                 setCurrentQuestionIndex(0);
//                 setIsCompleted(false);
//               }}
//               className="h-12 px-5 flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-sm font-medium transition-all duration-200 active:scale-[0.99]"
//             >
//               <RotateCcw size={16} />
//               <span>Retake</span>
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white flex flex-col justify-between relative overflow-hidden">
//       {/* Background Ambient Glows */}
//       <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-200/40 rounded-full filter blur-[120px] pointer-events-none" />
//       <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-100/50 rounded-full filter blur-[120px] pointer-events-none" />

//       {/* --- TOP NAVBAR & PROGRESS BAR --- */}
//       <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 px-4 sm:px-8 py-4">
//         <div className="max-w-4xl mx-auto flex flex-col gap-3">
//           <div className="flex justify-between items-center">
            
//             {/* Back Button */}
//             <button
//               onClick={handleBack}
//               disabled={currentRoundIndex === 0 && currentQuestionIndex === 0}
//               className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-500 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
//             >
//               <ArrowLeft size={16} />
//               <span>Previous</span>
//             </button>

//             {/* Round Badge */}
//             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-700">
//               <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
//               <span>Round {currentRound.round} of {QUIZ_ROUNDS.length}</span>
//             </div>

//             {/* Progress Count */}
//             <span className="text-xs sm:text-sm font-semibold text-zinc-400">
//               <span className="text-zinc-900 font-bold">{answeredCount}</span> / {totalQuestions} Answered
//             </span>
//           </div>

//           {/* Progress Bar */}
//           <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden relative">
//             <motion.div 
//               className="h-full bg-zinc-900"
//               initial={{ width: 0 }}
//               animate={{ width: `${overallProgress}%` }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//             />
//           </div>
//         </div>
//       </header>

//       {/* --- QUESTION CARD SECTION --- */}
//       <main className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col justify-center relative z-10">
        
//         {/* ROUND HEADER */}
//         <div className="mb-6">
//           <div className="flex items-center gap-2 mb-1">
//             <Sparkles size={14} className="text-zinc-400" />
//             <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
//               {currentRound.title}
//             </p>
//           </div>
//           <p className="text-xs text-zinc-500">
//             {currentRound.description}
//           </p>
//         </div>

//         {/* MAIN QUESTION CARD WITH GRID BACKGROUND */}
//         <div className="relative overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-[0_32px_100px_-20px_rgba(0,0,0,0.06)]">
//           {/* Subtle grid pattern background in light gray */}
//           <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

//           <AnimatePresence mode="wait">
//             <motion.div
//               key={currentQuestion.id}
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -12 }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               className="relative z-10"
//             >
//               <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-900 mb-8">
//                 <span className="text-zinc-400 font-serif italic mr-2">Q{currentQuestion.id}.</span>
//                 {currentQuestion.question}
//               </h2>

//               {/* OPTIONS */}
//               <div className="space-y-3">
//                 {currentQuestion.options.map((option, idx) => {
//                   const isSelected = selectedOption === option;
//                   return (
//                     <button
//                       key={idx}
//                       onClick={() => handleSelectOption(option)}
//                       className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between gap-4 group ${
//                         isSelected
//                           ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
//                           : "border-zinc-200 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 text-zinc-800"
//                       }`}
//                     >
//                       <div className="flex items-center gap-3.5">
//                         <span 
//                           className={`w-7 h-7 rounded-lg border flex items-center justify-center font-medium text-xs shrink-0 transition-colors ${
//                             isSelected 
//                               ? "border-zinc-700 bg-zinc-800 text-white" 
//                               : "border-zinc-200 bg-white text-zinc-500 group-hover:border-zinc-300 group-hover:text-zinc-900"
//                           }`}
//                         >
//                           {String.fromCharCode(65 + idx)}
//                         </span>
//                         <span className="text-sm font-medium leading-relaxed">
//                           {option}
//                         </span>
//                       </div>

//                       <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-all ${
//                         isSelected 
//                           ? "border-white bg-white text-zinc-900" 
//                           : "border-zinc-300 opacity-0 group-hover:opacity-100"
//                       }`}>
//                         {isSelected && <Check size={12} strokeWidth={3} />}
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//       </main>

//       {/* --- FOOTER ACTION BAR --- */}
//       <footer className="border-t border-zinc-200/80 bg-white/80 backdrop-blur-md py-4 px-4 sm:px-8 relative z-10">
//         <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          
//           <div className="text-xs font-medium text-zinc-400">
//             Question <span className="text-zinc-900 font-bold">{currentQuestionIndex + 1}</span> of {currentRound.questions.length} in this round
//           </div>

//           <button
//             onClick={handleNext}
//             disabled={!selectedOption}
//             className="h-11 px-6 rounded-xl bg-zinc-900 hover:bg-black disabled:bg-zinc-100 disabled:text-zinc-400 disabled:border-zinc-200 text-white font-medium text-sm border border-transparent transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center gap-2 group"
//           >
//             <span>
//               {currentQuestionIndex === currentRound.questions.length - 1 && currentRoundIndex === QUIZ_ROUNDS.length - 1
//                 ? "Finish Assessment"
//                 : currentQuestionIndex === currentRound.questions.length - 1
//                 ? "Complete Round"
//                 : "Next Question"}
//             </span>
//             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//           </button>

//         </div>
//       </footer>

//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  RotateCcw,
  SlidersHorizontal
} from "lucide-react";

// Spectrum Question Dataset (2 Options per question)
const QUIZ_ROUNDS = [
  {
    round: 1,
    title: "Core Work Style & Speed",
    description: "Understand how you make decisions and execute under pressure.",
    questions: [
      {
        id: 1,
        question: "How do you typically handle project roadmaps?",
        optionA: "Ship fast, iterate based on real feedback",
        optionB: "Create detailed systems and plans first"
      },
      {
        id: 2,
        question: "When faced with an unexpected production bug, you prefer to:",
        optionA: "Hotfix immediately directly on production",
        optionB: "Isolate in staging, test thoroughly, then deploy"
      }
    ]
  },
  {
    round: 2,
    title: "Cofounder Dynamics",
    description: "Identify how you collaborate and balance team dynamics.",
    questions: [
      {
        id: 11,
        question: "What qualities do you value most in a cofounder?",
        optionA: "Execution speed & matching energy levels",
        optionB: "Operational discipline & long-term structure"
      }
    ]
  },
  {
    round: 3,
    title: "Vision & Long-Term Strategy",
    description: "Determine how you view market trends and company scale.",
    questions: [
      {
        id: 21,
        question: "What is your primary startup goal?",
        optionA: "Build a hyper-growth venture-backed unicorn",
        optionB: "Create a highly profitable bootstrapped business"
      }
    ]
  }
];

export default function QuestionnaireFlow() {
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Store numerical slider answers (1 to 5)
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const currentRound = QUIZ_ROUNDS[currentRoundIndex];
  const currentQuestion = currentRound.questions[currentQuestionIndex];

  // Overall Progress Calculations
  const totalQuestions = QUIZ_ROUNDS.reduce((acc, r) => acc + r.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const overallProgress = Math.round((answeredCount / totalQuestions) * 100);

  // Current slider value defaults to 3 (Neutral) if not yet touched
  const currentSliderValue = answers[currentQuestion.id] ?? 3;
  const hasAnsweredCurrent = answers[currentQuestion.id] !== undefined;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: val,
    }));
  };

  const handleNext = () => {
    // If user hasn't moved the slider, set default to 3 (Neutral) on Next
    if (!hasAnsweredCurrent) {
      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: 3,
      }));
    }

    if (currentQuestionIndex < currentRound.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentRoundIndex < QUIZ_ROUNDS.length - 1) {
      setCurrentRoundIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      setIsCompleted(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else if (currentRoundIndex > 0) {
      setCurrentRoundIndex((prev) => prev - 1);
      const prevRoundQuestions = QUIZ_ROUNDS[currentRoundIndex - 1].questions;
      setCurrentQuestionIndex(prevRoundQuestions.length - 1);
    }
  };

  // Helper text to describe inclination based on 1-5 scale
  const getSpectrumLabel = (val: number, optionA: string, optionB: string) => {
    switch (val) {
      case 1:
        return { text: `Strongly Leaning: "${optionA}"`, side: "A", intensity: 5 };
      case 2:
        return { text: `Moderately Leaning: "${optionA}"`, side: "A", intensity: 3 };
      case 3:
        return { text: "Balanced / Neutral (Equal mix of both)", side: "Center", intensity: 0 };
      case 4:
        return { text: `Moderately Leaning: "${optionB}"`, side: "B", intensity: 3 };
      case 5:
        return { text: `Strongly Leaning: "${optionB}"`, side: "B", intensity: 5 };
      default:
        return { text: "Select your preference", side: "Center", intensity: 0 };
    }
  };

  const spectrumState = getSpectrumLabel(currentSliderValue, currentQuestion.optionA, currentQuestion.optionB);

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-[#fafafa] text-zinc-900 flex items-center justify-center p-4 sm:px-6 relative overflow-hidden selection:bg-zinc-900 selection:text-white font-sans">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-zinc-200/50 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-4 w-96 h-96 bg-zinc-100/60 rounded-full filter blur-[120px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-xl w-full bg-white border border-zinc-200/80 rounded-[24px] p-8 sm:p-12 shadow-[0_32px_100px_-20px_rgba(0,0,0,0.06)] relative z-10 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 text-white flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Trophy size={28} />
          </div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-600 mb-4 font-medium">
            <Sparkles size={12} className="text-zinc-500" />
            <span>Assessment Complete</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-zinc-900 mb-3">
            All Spectrum Rounds Cleared!
          </h1>
          <p className="text-zinc-500 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
            We’ve analyzed your spectrum placements across all questions. Your decision-making profile is ready.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setIsCompleted(false)}
              className="flex-1 h-12 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white font-medium text-sm hover:bg-black transition-all duration-200 active:scale-[0.98] shadow-sm group"
            >
              <span>View Results</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button 
              onClick={() => {
                setAnswers({});
                setCurrentRoundIndex(0);
                setCurrentQuestionIndex(0);
                setIsCompleted(false);
              }}
              className="h-12 px-5 flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-sm font-medium transition-all duration-200 active:scale-[0.99]"
            >
              <RotateCcw size={16} />
              <span>Retake</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-zinc-900 selection:text-white flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-zinc-200/40 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-100/50 rounded-full filter blur-[120px] pointer-events-none" />

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/80 px-4 sm:px-8 py-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          <div className="flex justify-between items-center">
            
            <button
              onClick={handleBack}
              disabled={currentRoundIndex === 0 && currentQuestionIndex === 0}
              className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-500 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Previous</span>
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-zinc-50 text-xs font-semibold text-zinc-700">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-900" />
              <span>Round {currentRound.round} of {QUIZ_ROUNDS.length}</span>
            </div>

            <span className="text-xs sm:text-sm font-semibold text-zinc-400">
              <span className="text-zinc-900 font-bold">{answeredCount}</span> / {totalQuestions} Answered
            </span>
          </div>

          <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden relative">
            <motion.div 
              className="h-full bg-zinc-900"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>
      </header>

      {/* --- QUESTION CARD SECTION --- */}
      <main className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col justify-center relative z-10">
        
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={14} className="text-zinc-400" />
            <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
              {currentRound.title}
            </p>
          </div>
          <p className="text-xs text-zinc-500">
            {currentRound.description}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white p-6 sm:p-10 shadow-[0_32px_100px_-20px_rgba(0,0,0,0.06)]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative z-10"
            >
              <h2 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-900 mb-8">
                <span className="text-zinc-400 font-serif italic mr-2">Q{currentQuestionIndex + 1}.</span>
                {currentQuestion.question}
              </h2>

              {/* TWO OPTIONS CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {/* Option A */}
                <div 
                  onClick={() => handleSliderChange({ target: { value: "1" } } as any)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    currentSliderValue <= 2
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                      : "border-zinc-200 bg-zinc-50/50 hover:border-zinc-300 text-zinc-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold uppercase tracking-wider ${currentSliderValue <= 2 ? "text-zinc-300" : "text-zinc-400"}`}>
                      Option A
                    </span>
                    {currentSliderValue <= 2 && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
                        {currentSliderValue === 1 ? "Strongly Preferred" : "Leaning"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    {currentQuestion.optionA}
                  </p>
                </div>

                {/* Option B */}
                <div 
                  onClick={() => handleSliderChange({ target: { value: "5" } } as any)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    currentSliderValue >= 4
                      ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                      : "border-zinc-200 bg-zinc-50/50 hover:border-zinc-300 text-zinc-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-bold uppercase tracking-wider ${currentSliderValue >= 4 ? "text-zinc-300" : "text-zinc-400"}`}>
                      Option B
                    </span>
                    {currentSliderValue >= 4 && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-200 border border-zinc-700">
                        {currentSliderValue === 5 ? "Strongly Preferred" : "Leaning"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium leading-relaxed">
                    {currentQuestion.optionB}
                  </p>
                </div>
              </div>

              {/* SLIDER CONTROL SECTION */}
              <div className="bg-zinc-50 border border-zinc-200/80 rounded-2xl p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                    <SlidersHorizontal size={14} />
                    <span>Spectrum Position</span>
                  </div>
                  <span className="text-xs font-bold text-zinc-900 bg-white border border-zinc-200 rounded-lg px-2.5 py-1 shadow-2xs">
                    Score: {currentSliderValue} / 5
                  </span>
                </div>

                {/* Range Slider */}
                <div className="relative py-2">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={currentSliderValue}
                    onChange={handleSliderChange}
                    className="w-full h-2.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900 focus:outline-none"
                  />
                  {/* Step Markers */}
                  <div className="flex justify-between text-[11px] font-semibold text-zinc-400 mt-3 px-1">
                    <span className={currentSliderValue === 1 ? "text-zinc-900 font-bold" : ""}>1 (Strong A)</span>
                    <span className={currentSliderValue === 2 ? "text-zinc-900 font-bold" : ""}>2</span>
                    <span className={currentSliderValue === 3 ? "text-zinc-900 font-bold" : ""}>3 (Neutral)</span>
                    <span className={currentSliderValue === 4 ? "text-zinc-900 font-bold" : ""}>4</span>
                    <span className={currentSliderValue === 5 ? "text-zinc-900 font-bold" : ""}>5 (Strong B)</span>
                  </div>
                </div>

                {/* Live Stance Explanation Box */}
                <div className="mt-5 pt-4 border-t border-zinc-200/60 flex items-center justify-center text-center">
                  <p className="text-xs font-medium text-zinc-600 bg-white border border-zinc-200/80 rounded-xl px-4 py-2.5 shadow-2xs w-full">
                    {spectrumState.text}
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-zinc-200/80 bg-white/80 backdrop-blur-md py-4 px-4 sm:px-8 relative z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          
          <div className="text-xs font-medium text-zinc-400">
            Question <span className="text-zinc-900 font-bold">{currentQuestionIndex + 1}</span> of {currentRound.questions.length} in this round
          </div>

          <button
            onClick={handleNext}
            className="h-11 px-6 rounded-xl bg-zinc-900 hover:bg-black text-white font-medium text-sm border border-transparent transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center gap-2 group"
          >
            <span>
              {currentQuestionIndex === currentRound.questions.length - 1 && currentRoundIndex === QUIZ_ROUNDS.length - 1
                ? "Finish Assessment"
                : currentQuestionIndex === currentRound.questions.length - 1
                ? "Complete Round"
                : "Next Question"}
            </span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

        </div>
      </footer>

    </div>
  );
}