"use client"
import React, { useState, ChangeEvent } from 'react';

// ---------- Types ----------

type QuestionType =
  | "choice_single"
  | "choice_single_list"
  | "text_area"
  | "chips"
  | "checkbox_multi";

interface QuestionOption {
  value: string;
  label: string;
  desc?: string;
  icon?: string;
  sub?: string;
}

interface Answers {
  superpower: string;
  stage: string;
  vision: string;
  commitment: string;
  cofounder_traits: string[];
}

type AnswerKey = keyof Answers;
type AnswerValue = string | string[];

interface Question {
  id: AnswerKey;
  step: number;
  type: QuestionType;
  question: string;
  subtext: string;
  options?: QuestionOption[];
  placeholder?: string;
  maxLength?: number;
  required: boolean;
  minChoices?: number;
}

// Dynamic mock data coming from backend or local configuration
const QUESTIONS_DATA: Question[] = [
  {
    id: "superpower",
    step: 1,
    type: "choice_single",
    question: "What is your primary superpower?",
    subtext: "Select the option that best describes your core operational strength.",
    options: [
      { value: "technical", label: "Technical Architect", desc: "CTO, Lead Engineer, AI/ML Specialist", icon: "Code" },
      { value: "growth", label: "Growth & Sales Catalyst", desc: "CMO, Product-Led Growth, Acquisition", icon: "TrendingUp" },
      { value: "product", label: "Product & UX Visionary", desc: "Product Manager, UI Designer, UX Lead", icon: "Compass" },
      { value: "operations", label: "Strategic Operator", desc: "CEO, Legal, Business Ops, Venture Builder", icon: "Cpu" }
    ],
    required: true
  },
  {
    id: "stage",
    step: 2,
    type: "choice_single_list",
    question: "Where is your current venture standing?",
    subtext: "Choose the milestone that aligns with your current validation progress.",
    options: [
      { value: "napkin", label: "The Napkin Stage", desc: "Fleshing out conceptual logic and initial target metrics." },
      { value: "mvp", label: "MVP Built & Ready", desc: "Core prototype complete and validating initial user testing." },
      { value: "traction", label: "Early Traction / Revenue", desc: "Securing active, consistent organic users or early MRR." },
      { value: "scaling", label: "Scaling Up & Expanding", desc: "Raising a formal round or executing aggressive market expansions." }
    ],
    required: true
  },
  {
    id: "vision",
    step: 3,
    type: "text_area",
    question: "Describe your visionary product idea.",
    subtext: "Explain the grand thesis of what you want to construct in under 180 characters.",
    placeholder: "We are reinventing collaborative networks with localized matching tools to secure cofounders within 48 hours...",
    maxLength: 180,
    required: true
  },
  {
    id: "commitment",
    step: 4,
    type: "chips",
    question: "What is your desired weekly commitment?",
    subtext: "Be realistic with your current bandwidth limits to ensure a perfect matches.",
    options: [
      { value: "weekend", label: "Side Hustle", sub: "< 15 hrs/wk" },
      { value: "part_time", label: "Part-Time Focus", sub: "15 - 30 hrs/wk" },
      { value: "full_time", label: "Full-Time Passion", sub: "40+ hrs/wk" },
      { value: "hyper", label: "Hyper-Obsessive", sub: "24/7 startup sprint" }
    ],
    required: true
  },
  {
    id: "cofounder_traits",
    step: 5,
    type: "checkbox_multi",
    question: "What core traits do you seek in a cofounder?",
    subtext: "Choose at least 2 characteristics that will balance your operational skillset.",
    options: [
      { value: "technical_depth", label: "Technical Execution Depth", desc: "Able to prototype and iterate lightning-fast under code sprints." },
      { value: "fundraising_pull", label: "Rainmaking & Fundraising Power", desc: "Proven background of secure pitches and global venture networks." },
      { value: "obsession", label: "Extreme Unreasonable Obsession", desc: "Willingness to risk comfortable zones to build the grand dream." },
      { value: "design_elegance", label: "High Fidelity UI Designer", desc: "Obsessed with premium user interfaces and world-class brand aesthetic." },
      { value: "sales_network", label: "B2B Enterprise Rolodex", desc: "Direct warm access to Fortune 500 company decision makers." }
    ],
    required: true,
    minChoices: 2
  }
];

interface DynamicIconProps {
  name?: string;
  className?: string;
}

// Simple lightweight dynamic SVG icon mapping to bypass package restrictions while remaining fully functional
const DynamicIcon = ({ name, className }: DynamicIconProps) => {
  switch (name) {
    case 'Code':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      );
    case 'TrendingUp':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      );
    case 'Compass':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
        </svg>
      );
    case 'Cpu':
      return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
          <rect x="9" y="9" width="6" height="6"></rect>
          <line x1="9" y1="1" x2="9" y2="4"></line>
          <line x1="15" y1="1" x2="15" y2="4"></line>
          <line x1="9" y1="20" x2="9" y2="23"></line>
          <line x1="15" y1="20" x2="15" y2="23"></line>
          <line x1="20" y1="9" x2="23" y2="9"></line>
          <line x1="20" y1="15" x2="23" y2="15"></line>
          <line x1="1" y1="9" x2="4" y2="9"></line>
          <line x1="1" y1="15" x2="4" y2="15"></line>
        </svg>
      );
    default:
      return null;
  }
};

export default function CofinderOnboarding() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answers>({
    superpower: "",
    stage: "",
    vision: "",
    commitment: "",
    cofounder_traits: []
  });

  // Navigation & animation states
  const [slideDirection, setSlideDirection] = useState<"in" | "out">("in");
  const [validationError, setValidationError] = useState<string>("");
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(false);
  const [isSimulatingLoad, setIsSimulatingLoad] = useState<boolean>(false);

  const activeQuestion: Question = QUESTIONS_DATA[currentIndex];
  const progressPercent = ((currentIndex + 1) / QUESTIONS_DATA.length) * 100;

  const triggerNavigation = (directionCallback: () => void) => {
    setSlideDirection("out");
    setTimeout(() => {
      directionCallback();
      setSlideDirection("in");
    }, 150);
  };

  const validateCurrentStep = (): boolean => {
    const currentAnswer: AnswerValue = answers[activeQuestion.id];

    if (activeQuestion.required) {
      if (activeQuestion.type === "checkbox_multi") {
        const selected = Array.isArray(currentAnswer) ? currentAnswer : [];
        if (selected.length < (activeQuestion.minChoices || 1)) {
          setValidationError(`Please select at least ${activeQuestion.minChoices} traits to continue.`);
          return false;
        }
      } else if (!currentAnswer || (typeof currentAnswer === "string" && currentAnswer.trim() === "")) {
        setValidationError("This operational response is required to proceed.");
        return false;
      }
    }
    setValidationError("");
    return true;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;

    if (currentIndex < QUESTIONS_DATA.length - 1) {
      triggerNavigation(() => {
        setCurrentIndex(prev => prev + 1);
      });
    } else {
      // Simulate backend matchmaking logic
      triggerNavigation(() => {
        setIsSimulatingLoad(true);
        setTimeout(() => {
          setIsSimulatingLoad(false);
          setIsOnboardingCompleted(true);
        }, 1800);
      });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setValidationError("");
      triggerNavigation(() => {
        setCurrentIndex(prev => prev - 1);
      });
    }
  };

  const selectSingleOption = (val: string) => {
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: val }));
    setValidationError("");
  };

  const toggleMultiOption = (val: string) => {
    const currentSelection = (answers[activeQuestion.id] as string[]) || [];
    let updatedSelection: string[];
    if (currentSelection.includes(val)) {
      updatedSelection = currentSelection.filter((item) => item !== val);
    } else {
      updatedSelection = [...currentSelection, val];
    }
    setAnswers(prev => ({ ...prev, [activeQuestion.id]: updatedSelection }));
    setValidationError("");
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    const maxLength = activeQuestion.maxLength ?? Infinity;
    if (text.length <= maxLength) {
      setAnswers(prev => ({ ...prev, [activeQuestion.id]: text }));
      setValidationError("");
    }
  };

  const handleRestart = () => {
    setAnswers({
      superpower: "",
      stage: "",
      vision: "",
      commitment: "",
      cofounder_traits: []
    });
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
              <svg className="w-3.5 h-3.5 text-zinc-500 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
              </svg>
              <span className="font-medium">Active Matchmaking Network</span>
            </div>

            <h2 className="text-5xl font-light tracking-tight text-zinc-900 leading-[1.15]">
              Find your <br />
              <span className="font-serif italic text-zinc-600 font-normal">perfect</span> <br />
              co-founder.
            </h2>

            <p className="mt-6 text-zinc-500 text-base leading-relaxed max-w-sm">
              Meet builders, technical visionaries, global growth hackers, and operators ready to execute at venture velocity.
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
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-600">
                Step {isOnboardingCompleted ? 5 : currentIndex + 1} of 5
              </span>
            </div>

            {/* Premium Micro Progress Bar Indicator */}
            {!isOnboardingCompleted && !isSimulatingLoad && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-zinc-400 font-mono tracking-wider">
                  <span>ONBOARDING CALIBRATION</span>
                  <span className="text-zinc-700 font-semibold">{Math.round(progressPercent)}%</span>
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
            {isSimulatingLoad ? (
              <div className="flex flex-col items-center justify-center text-center space-y-6 py-12 animate-pulse">
                <div className="relative">
                  <div className="h-16 w-16 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-zinc-800 text-xs font-bold font-mono">AI</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-zinc-900">Calibrating Match Profiles...</h3>
                  <p className="text-zinc-400 text-sm max-w-xs mx-auto">Evaluating compatible venture stages, skill gaps, and active commitments.</p>
                </div>
              </div>
            ) : isOnboardingCompleted ? (
              <div className="space-y-8 animate-fadeIn">
                <div className="space-y-3">
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h2 className="text-3xl font-semibold tracking-tight text-zinc-900">
                    Onboarding Completed
                  </h2>
                  <p className="text-zinc-500 text-sm">
                    We've synthesized your persona model. Here is your matching footprint:
                  </p>
                </div>

                {/* Simulated Match Summary Telemetry Card */}
                <div className="rounded-2xl border border-zinc-200 bg-zinc-50/50 p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase block mb-1">Your Role</span>
                      <span className="text-zinc-800 font-semibold text-sm capitalize">
                        {answers.superpower ? answers.superpower.replace('_', ' ') : 'Not selected'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase block mb-1">Venture Stage</span>
                      <span className="text-zinc-800 font-semibold text-sm capitalize">
                        {answers.stage ? answers.stage.replace('_', ' ') : 'Not selected'}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-zinc-100 pt-3">
                    <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase block mb-1">Weekly Commitment</span>
                    <span className="text-zinc-800 font-semibold text-sm capitalize">
                      {answers.commitment ? answers.commitment.replace('_', ' ') : 'Not selected'}
                    </span>
                  </div>

                  <div className="border-t border-zinc-100 pt-3">
                    <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase block mb-1">Core Desired Traits</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {answers.cofounder_traits.length > 0 ? (
                        answers.cofounder_traits.map(trait => (
                          <span key={trait} className="px-2.5 py-1 text-[11px] font-medium bg-zinc-100 text-zinc-700 rounded-full capitalize">
                            {trait.replace('_', ' ')}
                          </span>
                        ))
                      ) : (
                        <span className="text-zinc-400 text-xs italic">No traits selected</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                    onClick={() => alert("Redirecting back to your newly generated matching space...")}
                    className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white font-medium text-sm hover:bg-black transition-all duration-200 active:scale-[0.98] shadow-sm"
                  >
                    <span>Launch Matchmaking Hub</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
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
              <div className={`transition-all duration-200 ease-in-out ${slideDirection === "in" ? "opacity-100 transform translate-x-0" : "opacity-0 transform -translate-x-4"}`}>
                <div className="space-y-2 mb-8">
                  <span className="text-[10px] font-mono tracking-wider text-zinc-400 font-bold uppercase block">
                    QUESTION 0{activeQuestion.step} OF 05
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-normal tracking-tight text-zinc-900 leading-tight">
                    {activeQuestion.question}
                  </h2>
                  <p className="text-sm text-zinc-500">
                    {activeQuestion.subtext}
                  </p>
                </div>

                {/* Validation Error Banner */}
                {validationError && (
                  <div className="mb-6 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium flex items-center gap-2 animate-shake">
                    <svg className="w-4 h-4 shrink-0 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                    <span>{validationError}</span>
                  </div>
                )}

                {/* Render corresponding input field component */}
                <div className="space-y-4">

                  {/* CASE 1: Single Choice Card Grid */}
                  {activeQuestion.type === "choice_single" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(activeQuestion.options ?? []).map((opt) => {
                        const isSelected = answers[activeQuestion.id] === opt.value;
                        return (
                          <div
                            key={opt.value}
                            onClick={() => selectSingleOption(opt.value)}
                            className={`p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between h-32 ${
                              isSelected
                                ? "border-zinc-900 bg-zinc-50/50 text-zinc-900 shadow-sm"
                                : "border-zinc-150 hover:border-zinc-300 hover:bg-zinc-50/20 text-zinc-700 bg-white"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <DynamicIcon name={opt.icon} className={`h-5 w-5 ${isSelected ? "text-zinc-900" : "text-zinc-400"}`} />
                              <div className={`h-4 w-4 rounded-full border flex items-center justify-center ${isSelected ? "border-zinc-900 bg-zinc-900" : "border-zinc-300"}`}>
                                {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-sm text-zinc-900">{opt.label}</h4>
                              <p className="text-xs text-zinc-400 mt-1 line-clamp-1">{opt.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* CASE 2: Single Choice Detailed List Layout */}
                  {activeQuestion.type === "choice_single_list" && (
                    <div className="space-y-3">
                      {(activeQuestion.options ?? []).map((opt) => {
                        const isSelected = answers[activeQuestion.id] === opt.value;
                        return (
                          <div
                            key={opt.value}
                            onClick={() => selectSingleOption(opt.value)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? "border-zinc-900 bg-zinc-50/30 text-zinc-900"
                                : "border-zinc-150 hover:border-zinc-300 hover:bg-zinc-50/10 text-zinc-700 bg-white"
                            }`}
                          >
                            <div className="flex flex-col pr-4">
                              <span className="font-semibold text-sm text-zinc-900">{opt.label}</span>
                              <span className="text-xs text-zinc-400 mt-0.5">{opt.desc}</span>
                            </div>
                            <div className={`h-4 w-4 shrink-0 rounded-full border flex items-center justify-center ${isSelected ? "border-zinc-900 bg-zinc-900" : "border-zinc-300"}`}>
                              {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* CASE 3: Dynamic Rich Text Area Fields with Character limits */}
                  {activeQuestion.type === "text_area" && (
                    <div className="space-y-2">
                      <div className="relative">
                        <textarea
                          rows={4}
                          value={(answers[activeQuestion.id] as string) || ""}
                          onChange={handleTextAreaChange}
                          placeholder={activeQuestion.placeholder}
                          className="w-full p-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 focus:bg-white transition-all duration-200 resize-none leading-relaxed"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
                        <span>Min limit details recommended</span>
                        <span className="font-mono">
                          {((answers[activeQuestion.id] as string) || "").length} / {activeQuestion.maxLength}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* CASE 4: Compact Horizontal/Vertical Select Chips */}
                  {activeQuestion.type === "chips" && (
                    <div className="grid grid-cols-2 gap-3">
                      {(activeQuestion.options ?? []).map((opt) => {
                        const isSelected = answers[activeQuestion.id] === opt.value;
                        return (
                          <div
                            key={opt.value}
                            onClick={() => selectSingleOption(opt.value)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 text-center ${
                              isSelected
                                ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                                : "border-zinc-150 hover:border-zinc-300 text-zinc-700 hover:text-zinc-900 bg-white"
                            }`}
                          >
                            <span className="block text-sm font-semibold">{opt.label}</span>
                            <span className={`text-[10px] uppercase font-mono tracking-wide block mt-1 ${isSelected ? "text-zinc-300" : "text-zinc-400"}`}>
                              {opt.sub}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* CASE 5: Multi Selection Checkbox Card Layout */}
                  {activeQuestion.type === "checkbox_multi" && (
                    <div className="space-y-3">
                      {(activeQuestion.options ?? []).map((opt) => {
                        const isSelected = ((answers[activeQuestion.id] as string[]) || []).includes(opt.value);
                        return (
                          <div
                            key={opt.value}
                            onClick={() => toggleMultiOption(opt.value)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? "border-zinc-900 bg-zinc-50/30 text-zinc-900"
                                : "border-zinc-150 hover:border-zinc-300 hover:bg-zinc-50/10 text-zinc-700 bg-white"
                            }`}
                          >
                            <div className="flex flex-col pr-4">
                              <span className="font-semibold text-sm text-zinc-900">{opt.label}</span>
                              <span className="text-xs text-zinc-400 mt-0.5">{opt.desc}</span>
                            </div>
                            <div className={`h-5 w-5 shrink-0 rounded-md border flex items-center justify-center transition-colors ${isSelected ? "border-zinc-900 bg-zinc-900 text-white" : "border-zinc-300"}`}>
                              {isSelected && (
                                <svg className="w-3.5 h-3.5 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                </svg>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              </div>
            )}
          </div>

          {/* Bottom Dynamic Actions Bar */}
          {!isOnboardingCompleted && !isSimulatingLoad && (
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
                className={`relative group h-12 flex-1 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white font-medium text-sm hover:bg-black transition-all duration-150 active:scale-[0.98] shadow-sm`}
              >
                <span>{currentIndex === QUESTIONS_DATA.length - 1 ? "Complete Calibration" : "Continue"}</span>
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}