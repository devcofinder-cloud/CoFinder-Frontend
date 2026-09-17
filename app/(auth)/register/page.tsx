"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  MapPin,
  Calendar,
  Users,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register, googleRegister } from "@/app/services/auth.service";
import { z } from "zod";
import ResponseModal from "../components/ResponseModal";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/app/services/firebase";

export default function PremiumRegister() {
  const appRouter = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    displayName: "",
    location: "",
    age: "",
    gender: "",
  });

  const [popup, setPopup] = useState({
    open: false,
    type: "loading",
    title: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = (e: React.FormEvent) => {
    e.preventDefault();
    // Yahan par Step 1 ki validation logics add kar sakte ho
    setStep(2);
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setPopup({
      open: true,
      type: "loading",
      title: "Creating Account",
      message: "Please wait while we create your profile...",
    });

    try {
      const payload = {
        ...formData,
        name: `${formData.firstName} ${formData.lastName}`,
      };

      const res = await register(payload);

      if (res.success) {
        localStorage.setItem("token", res.data.token);

        setPopup({
          open: true,
          type: "success",
          title: "Welcome to Cofinder",
          message: "Your account has been created successfully.",
        });

        setTimeout(() => {
          appRouter.push("/onboarding");
        }, 2000);
      } else {
        setPopup({
          open: true,
          type: "error",
          title: "Registration Failed",
          message: res.message || "Something went wrong.",
        });
      }
    } catch (err: any) {
      setPopup({
        open: true,
        type: "error",
        title: "Registration Failed",
        message:
          err?.response?.data?.message ||
          err?.message ||
          "Something went wrong.",
      });
    }
  };

  const handleGoogleRegister = async () => {
    setPopup({
      open: true,
      type: "loading",
      title: "Connecting with Google",
      message: "Please wait while we create your account...",
    });

    try {
      // Open Google authentication
      const result = await signInWithPopup(auth, googleProvider);

      const firebaseUser = result.user;

      const firebaseToken = await firebaseUser.getIdToken();

      // Register Google account
      const res = await googleRegister(firebaseToken);

      if (res.success) {
        localStorage.setItem("token", res.data.token);

        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
        }

        setPopup({
          open: true,
          type: "success",
          title: "Welcome to Cofinder!",
          message:
            "Your Google account has been created. Let's complete your profile.",
        });

        setTimeout(() => {
          appRouter.push("/onboarding");
        }, 1500);

        return;
      }

      setPopup({
        open: true,
        type: "error",
        title: "Registration Failed",
        message: res.message || "Something went wrong.",
      });
    } catch (error: any) {
      console.error("Google Registration Error:", error);

      const errorCode = error?.response?.data?.code;
      const errorMessage = error?.response?.data?.message;

      if (errorCode === "ACCOUNT_EXISTS") {
        setPopup({
          open: true,
          type: "error",
          title: "Account Already Exists",
          message:
            "This Google account is already registered. Please sign in instead.",
        });

        return;
      }

      setPopup({
        open: true,
        type: "error",
        title: "Google Registration Failed",
        message:
          errorMessage ||
          error?.message ||
          "Unable to create your account with Google.",
      });
    }
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
              <div
                className="h-[2px] w-12 bg-zinc-800 transition-all duration-300"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
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
              <span className="font-serif italic text-zinc-600">
                builders
              </span>{" "}
              & <br />
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
                {step === 1
                  ? "Step 1: Credentials & Identity"
                  : "Step 2: Profile Persona Details"}
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
                    {/* Google Register */}
                    {/* <button
                      type="button"
                      onClick={handleGoogleRegister}
                      className="w-full h-11 flex items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-zinc-700 hover:text-zinc-900 text-sm font-medium transition-all duration-200 active:scale-[0.99] shadow-sm"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>

                      <span>Continue with Google</span>
                    </button> */}

                    {/* Divider */}
                    <div className="flex items-center gap-4 py-2">
                      <div className="h-px flex-1 bg-zinc-200" />

                      <span className="text-[10px] font-bold tracking-[0.25em] text-zinc-400 uppercase">
                        Or continue with email
                      </span>

                      <div className="h-px flex-1 bg-zinc-200" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-500">
                          First Name
                        </label>
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
                        <label className="text-xs font-semibold text-zinc-500">
                          Last Name
                        </label>
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
                      <label className="text-xs font-semibold text-zinc-500">
                        Email Address
                      </label>
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
                      <label className="text-xs font-semibold text-zinc-500">
                        Password
                      </label>
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
                      <label className="text-xs font-semibold text-zinc-500">
                        Confirm Password
                      </label>
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
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </form>
                ) : (
                  /* STEP 2 FORM */
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-500">
                          Username
                        </label>
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
                        <label className="text-xs font-semibold text-zinc-500">
                          Display Name
                        </label>
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
                      <label className="text-xs font-semibold text-zinc-500">
                        Location / City
                      </label>
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
                        <label className="text-xs font-semibold text-zinc-500">
                          Age
                        </label>
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
                        <label className="text-xs font-semibold text-zinc-500">
                          Gender
                        </label>
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
                            <option value="" disabled className="text-zinc-400">
                              Select
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Non-binary</option>
                            <option value="prefer-not">
                              Prefer not to say
                            </option>
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

      <ResponseModal
        open={popup.open}
        type={popup.type as any}
        title={popup.title}
        message={popup.message}
        onClose={() =>
          setPopup((p) => ({
            ...p,
            open: false,
          }))
        }
      />
    </div>
  );
}
