import React from 'react';
import { ArrowRight, CheckCircle2, ShieldAlert, Sparkles, Users } from 'lucide-react';

export default function ArchetypeResultWeb() {
  return (
    <div className="min-h-screen bg-white text-black py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-black selection:text-white">
      <div className="max-w-5xl mx-auto flex flex-col gap-12">
        
        {/* --- HERO / ILLUSTRATION SECTION --- */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          
          {/* Image Placeholder */}
          <div className="w-56 h-56 rounded-3xl bg-neutral-50 border-2 border-black flex flex-col items-center justify-center p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-8">
            {/* REPLACE THIS DIV WITH YOUR IMAGE */}
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs text-neutral-500 font-semibold tracking-wide uppercase">
              Image Placeholder
            </span>
          </div>

          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-black text-white mb-4">
            Archetype Result
          </span>
          
          <h1 className="text-4xl sm:text-5xl font-black text-black tracking-tight mb-3">
            You're a Bold Executor
          </h1>
          <p className="text-lg text-neutral-600 font-medium">
            Moves fast, bets big, ships relentlessly.
          </p>
        </div>

        {/* --- GRID SECTION (DESKTOP LAYOUT) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          
          {/* CARD 1: WHO YOU WOULD BUILD BEST WITH */}
          <div className="bg-white border-2 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b-2 border-neutral-200 pb-4 mb-6">
                <div className="p-2 rounded-xl bg-black text-white">
                  <Users className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-black">
                  Who You Would Build Best With?
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-bold text-black mb-1">
                    The Systematic Founder
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Brings structure and process to your rapid execution. They’ll turn your bold moves into repeatable systems and catch details you might miss in the rush.
                  </p>
                </div>

                <div>
                  <h3 className="text-base font-bold text-black mb-1">
                    The Collaborative Realist
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Balances your conviction with team input and reduces blind spots. They’ll push back constructively when you need to slow down and validate.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: SUPERPOWER & SHADOW SIDE */}
          <div className="bg-neutral-100 border-2 border-black rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 border-b-2 border-neutral-300 pb-4 mb-6">
                <div className="p-2 rounded-xl bg-black text-white">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-black">
                  Superpower & Shadow Side
                </h2>
              </div>
              
              <div className="bg-white border border-neutral-300 rounded-2xl p-6 shadow-sm">
                <p className="text-sm text-neutral-700 leading-relaxed">
                  <strong className="text-black font-extrabold block mb-2 text-base">
                    Every archetype has a superpower and a shadow side. Here's yours:
                  </strong>
                  Moving too fast without validation. You might skip important research or ignore warning signs in your rush to ship. Your speed is your superpower, but it can lead to building the wrong thing quickly. Look for cofounders who push back constructively and help you slow down when needed.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* --- CARD 3: READY TO FIND YOUR COFOUNDER (FULL WIDTH BANNER) --- */}
        <div className="bg-black text-white border-2 border-black rounded-3xl p-8 sm:p-10 shadow-[10px_10px_0px_0px_rgba(163,163,163,0.3)]">
          <div className="max-w-3xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 tracking-tight">
              Ready to Find Your Cofounder?
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                "Check out your matches—see who's actively looking.",
                "Fill out your full profile so matches can learn about you.",
                "Start messaging other users when you're ready.",
                "You can explore now and finish your profile anytime."
              ].map((text, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <span className="text-sm text-neutral-300 font-medium leading-normal">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-neutral-800 text-xs sm:text-sm text-neutral-400 font-medium">
              💡 <strong className="text-white">Heads up:</strong> complete profiles get <span className="underline underline-offset-4 text-white font-bold">3x more responses</span>.
            </div>
          </div>
        </div>

        {/* --- ACTION BUTTONS --- */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto w-full pt-4">
          <button className="w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-black hover:bg-neutral-800 text-white font-bold text-sm transition-all shadow-[4px_4px_0px_0px_rgba(163,163,163,0.5)] active:translate-x-0.5 active:translate-y-0.5 flex items-center justify-center gap-2 group">
            <span>Continue To Full Questionnaire</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="w-full sm:w-1/2 py-4 px-6 rounded-2xl bg-white hover:bg-neutral-100 text-black font-bold text-sm border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5">
            Skip To Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}