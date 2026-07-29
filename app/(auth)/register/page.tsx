"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Mail, Lock, User, MapPin, Calendar, Users, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PremiumRegister() {

  const appRouter = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    displayName: '',
    location: '',
    age: '',
    gender: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    // Yahan par Step 1 ki validation logics add kar sakte ho
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Final registration API call goes here
    console.log("Registering user with data:", formData);
  };



const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0,
  }),

  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },

  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  }),
};

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden selection:bg-zinc-900 selection:text-white">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-zinc-200/50 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-4 w-96 h-96 bg-zinc-100/60 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Main Grid Wrapper */}
      <div className="grid h-[90vh] min-h-[750px] w-full max-w-7xl overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white lg:grid-cols-12 shadow-[0_32px_100px_-20px_rgba(0,0,0,0.06)] relative z-10">
        
        {/* LEFT COLUMN (The Brand Side) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-16 relative overflow-hidden border-r border-zinc-100 bg-[#fbfbfb]">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
          
          <div className="relative z-10">
            <Link href="/" className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-zinc-900 animate-pulse" />
              <span className="text-2xl font-semibold tracking-tight text-zinc-900 font-sans">
                Cofinder
              </span>
            </Link>

            <div className="mt-12 space-y-2">
              <p className="text-xs font-bold tracking-[0.25em] text-zinc-400 uppercase">
                Step {step} of 2
              </p>
              <div className="h-[2px] w-12 bg-zinc-800 transition-all duration-300" style={{ width: step === 1 ? '50%' : '100%' }} />
              <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px] pt-2">
                {step === 1 
                  ? "Let's start with your basic details to set up your profile." 
                  : "Now, customize your founder persona so others can find you easily."}
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-light tracking-tight text-zinc-900 leading-[1.2]">
              Join the elite circle of <br />
              <span className="font-serif italic text-zinc-600">builders</span> & <br />
              founders.
            </h2>
          </div>
        </div>

        {/* RIGHT COLUMN (The Registration Form) */}
        <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-white overflow-y-auto">
          <div className="w-full max-w-[460px]">
            
            {/* Header info */}
            <div className="space-y-2 mb-8">
              <h2 className="text-3xl font-normal tracking-tight text-zinc-900">
                Create your account
              </h2>
              <p className="text-sm text-zinc-400">
                {step === 1 ? "Step 1: Credentials & Identity" : "Step 2: Profile Persona Details"}
              </p>
            </div>

            <AnimatePresence mode="wait" custom={step}>
              <motion.div
                key={step}
                custom={step}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {step === 1 ? (
                  /* STEP 1 FORM */
                  <form onSubmit={nextStep} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-500">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="w-full h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 focus:bg-white transition-all duration-200"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-500">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="w-full h-11 px-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 focus:bg-white transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-500">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400">
                          <Mail size={16} />
                        </div>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@company.com"
                          className="w-full h-11 pl-11 pr-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 focus:bg-white transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-500">Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400">
                          <Lock size={16} />
                        </div>
                        <input
                          type="password"
                          name="password"
                          required
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full h-11 pl-11 pr-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 focus:bg-white transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-500">Confirm Password</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400">
                          <Lock size={16} />
                        </div>
                        <input
                          type="password"
                          name="confirmPassword"
                          required
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full h-11 pl-11 pr-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 focus:bg-white transition-all duration-200"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="group w-full h-11 mt-4 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white font-medium text-sm hover:bg-black transition-all duration-200 active:scale-[0.98] shadow-sm"
                    >
                      <span>Continue to Profile Details</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                ) : (
                  /* STEP 2 FORM */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-500">Username</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-zinc-400 text-xs font-medium">
                            @
                          </div>
                          <input
                            type="text"
                            name="username"
                            required
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="johndoe"
                            className="w-full h-11 pl-8 pr-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 focus:bg-white transition-all duration-200"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-500">Display Name</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400">
                            <User size={15} />
                          </div>
                          <input
                            type="text"
                            name="displayName"
                            required
                            value={formData.displayName}
                            onChange={handleInputChange}
                            placeholder="John D."
                            className="w-full h-11 pl-10 pr-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 focus:bg-white transition-all duration-200"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-zinc-500">Location / City</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400">
                          <MapPin size={16} />
                        </div>
                        <input
                          type="text"
                          name="location"
                          required
                          value={formData.location}
                          onChange={handleInputChange}
                          placeholder="San Francisco, CA"
                          className="w-full h-11 pl-11 pr-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 focus:bg-white transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-500">Age</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400">
                            <Calendar size={16} />
                          </div>
                          <input
                            type="number"
                            name="age"
                            required
                            min="18"
                            max="100"
                            value={formData.age}
                            onChange={handleInputChange}
                            placeholder="25"
                            className="w-full h-11 pl-11 pr-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 focus:bg-white transition-all duration-200"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-500">Gender</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400">
                            <Users size={16} />
                          </div>
                          <select
                            name="gender"
                            required
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full h-11 pl-11 pr-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 focus:bg-white transition-all duration-200 appearance-none"
                          >
                            <option value="" disabled className="text-zinc-400">Select</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Non-binary</option>
                            <option value="prefer-not">Prefer not to say</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Step Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="w-1/3 h-11 flex items-center justify-center gap-1.5 rounded-xl border border-zinc-200 text-zinc-700 font-medium text-sm hover:bg-zinc-50 hover:text-black transition-all duration-200 active:scale-[0.98]"
                      >
                        <ArrowLeft size={16} />
                        <span>Back</span>
                      </button>

                      <button
                      onClick={()=>{appRouter.push('/onboarding')}}
                        type="submit"
                        className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white font-medium text-sm hover:bg-black transition-all duration-200 active:scale-[0.98] shadow-sm"
                      >
                        <CheckCircle2 size={16} />
                       
                          <span>Register & Create Profile</span>
                        
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </AnimatePresence>

            <p className="mt-8 text-center text-xs text-zinc-500">
              Already have an account?
              <Link
                href="/login"
                className="ml-1.5 font-semibold text-zinc-800 hover:text-black hover:underline underline-offset-4 transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}