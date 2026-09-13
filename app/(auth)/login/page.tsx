"use client";

import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/app/services/firebase";

import { useRouter } from "next/navigation";

import { googleLogin, login } from "@/app/services/auth.service";
import ResponseModal from "../components/ResponseModal";
import { useState } from "react";
import { authStore } from "@/app/store/authStore";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [popup, setPopup] = useState({
    open: false,
    type: "loading",
    title: "",
    message: "",
  });

  const setUser = authStore((state) => state.setUser);

  const onSubmit = async (data: LoginForm) => {
    setPopup({
      open: true,
      type: "loading",
      title: "Logging in",
      message: "Please wait while we log in your profile...",
    });

    try {
      const res = await login(data);
      if (res.success) {
        setUser(res.data.user);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setPopup({
          open: true,
          type: "success",
          title: "Login Succesfull !!",
          message: "Your account has been logged in successfully.",
        });

        setTimeout(() => {
          appRouter.push("/dashboard");
        }, 2000);
      } else {
        setPopup({
          open: true,
          type: "error",
          title: "Login Failed",
          message: res.message || "Something went wrong.",
        });
      }
    } catch (error: any) {
      setPopup({
        open: true,
        type: "error",
        title: "Login Failed",
        message: error?.response?.data?.message || "Something went wrong.",
      });
    }
  };

  const appRouter = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const handleGoogleLogin = async () => {
    setPopup({
      open: true,
      type: "loading",
      title: "Signing in with Google",
      message: "Please wait while we authenticate your account...",
    });

    try {
      const result = await signInWithPopup(auth, googleProvider);

      const firebaseUser = result.user;
      const firebaseToken = await firebaseUser.getIdToken();

      // Only LOGIN existing Google account
      const res = await googleLogin(firebaseToken);

      if (res.success) {
        setUser(res.data.user);

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setPopup({
          open: true,
          type: "success",
          title: "Login Successful!",
          message: "Welcome back to Cofinder.",
        });

        setTimeout(() => {
          appRouter.push("/dashboard");
        }, 1500);

        return;
      }

      setPopup({
        open: true,
        type: "error",
        title: "Login Failed",
        message: res.message || "Something went wrong.",
      });
    } catch (error: any) {
      console.error("Google Login Error:", error);

      const errorCode = error?.response?.data?.code;
      const errorMessage = error?.response?.data?.message;

      // Google account does not exist
      if (errorCode === "ACCOUNT_NOT_FOUND") {
        setPopup({
          open: true,
          type: "error",
          title: "Account Not Found",
          message:
            "This Google account is not registered on Cofinder. Please create an account first.",
        });

        return;
      }

      setPopup({
        open: true,
        type: "error",
        title: "Google Login Failed",
        message:
          errorMessage || error?.message || "Unable to sign in with Google.",
      });
    }
  };
  return (
    // <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden selection:bg-zinc-800 selection:text-white">
    //   {/* Background Ambient Glows */}
    //   <div className="absolute top-0 -left-4 w-96 h-96 bg-zinc-800 rounded-full filter blur-[120px] opacity-20 animate-pulse pointer-events-none" />
    //   <div className="absolute bottom-0 right-4 w-96 h-96 bg-zinc-700 rounded-full filter blur-[120px] opacity-15 pointer-events-none" />

    //   <div className="grid h-[90vh] min-h-[750px] w-full max-w-7xl overflow-hidden rounded-[24px] border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md lg:grid-cols-12 shadow-[0_32px_100px_-20px_rgba(0,0,0,0.8)] relative z-10">

    //     {/* LEFT COLUMN (Brand & Teaser) - 5 Cols wide */}
    //     <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-16 relative overflow-hidden border-r border-zinc-900/80">
    //       {/* Subtle grid pattern background */}
    //       <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f23_1px,transparent_1px),linear-gradient(to_bottom,#1f1f23_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />

    //       <div className="relative z-10">
    //         <div className="flex items-center gap-2">
    //           <span className="h-2 w-2 rounded-full bg-white animate-ping" />
    //           <h1 className="text-2xl font-semibold tracking-tight text-white font-sans">
    //             Cofinder
    //           </h1>
    //         </div>

    //         <div className="mt-12 space-y-2">
    //           <p className="text-sm font-medium tracking-[0.2em] text-zinc-500 uppercase">
    //             The Network
    //           </p>
    //           <div className="h-[2px] w-8 bg-zinc-800" />
    //           <p className="text-zinc-400 text-sm leading-relaxed max-w-[240px] pt-2">
    //             Connect founders. Build startups. Change the world.
    //           </p>
    //         </div>
    //       </div>

    //       <div className="relative z-10">
    //         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm text-xs text-zinc-300 mb-6">
    //           <Sparkles size={12} className="text-zinc-400" />
    //           <span>Now live globally</span>
    //         </div>

    //         <h2 className="text-5xl font-light tracking-tight text-white leading-[1.15]">
    //           Find your <br />
    //           <span className="font-serif italic text-zinc-300">perfect</span> <br />
    //           co-founder.
    //         </h2>

    //         <p className="mt-6 text-zinc-400 text-base leading-relaxed max-w-sm">
    //           Meet ambitious entrepreneurs, developers, designers, and investors ready to scale.
    //         </p>
    //       </div>
    //     </div>

    //     {/* RIGHT COLUMN (The Auth Interface) - 7 Cols wide */}
    //     <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-[#0c0c0e]">
    //       <motion.div
    //         initial={{ opacity: 0, y: 15 }}
    //         animate={{ opacity: 1, y: 0 }}
    //         transition={{ duration: 0.5, ease: 'easeOut' }}
    //         className="w-full max-w-[420px]"
    //       >
    //         {/* Logo for mobile view */}
    //         <div className="lg:hidden flex items-center gap-2 mb-8">
    //           <span className="h-2 w-2 rounded-full bg-white" />
    //           <h1 className="text-xl font-semibold tracking-tight text-white">
    //             Cofinder
    //           </h1>
    //         </div>

    //         <div className="space-y-2">
    //           <h2 className="text-3xl font-normal tracking-tight text-white">
    //             Welcome back
    //           </h2>
    //           <p className="text-sm text-zinc-400">
    //             Enter your credentials to access your dashboard.
    //           </p>
    //         </div>

    //         <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
    //           {/* Refined Premium Inputs */}
    //           <div className="space-y-1.5">
    //             <label className="text-xs font-medium text-zinc-400">Email Address</label>
    //             <div className="relative">
    //               <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500">
    //                 <Mail size={16} />
    //               </div>
    //               <input
    //                 type="email"
    //                 placeholder="name@company.com"
    //                 {...register("email")}
    //                 className="w-full h-12 pl-11 pr-4 rounded-xl border border-zinc-800 bg-zinc-900/30 text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 transition-all duration-200"
    //               />
    //             </div>
    //             {errors.email?.message && (
    //               <p className="text-xs text-red-400 mt-1">{errors.email?.message}</p>
    //             )}
    //           </div>

    //           <div className="space-y-1.5">
    //             <div className="flex items-center justify-between">
    //               <label className="text-xs font-medium text-zinc-400">Password</label>
    //               <Link
    //                 href="/forgot-password"
    //                 className="text-xs text-zinc-400 hover:text-white transition-colors"
    //               >
    //                 Forgot?
    //               </Link>
    //             </div>
    //             <div className="relative">
    //               <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500">
    //                 <Lock size={16} />
    //               </div>
    //               <input
    //                 type="password"
    //                 placeholder="••••••••"
    //                 {...register("password")}
    //                 className="w-full h-12 pl-11 pr-4 rounded-xl border border-zinc-800 bg-zinc-900/30 text-white placeholder-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-500 transition-all duration-200"
    //               />
    //             </div>
    //             {errors.password?.message && (
    //               <p className="text-xs text-red-400 mt-1">{errors.password?.message}</p>
    //             )}
    //           </div>

    //           <button
    //             type="submit"
    //             disabled={isSubmitting}
    //             className="relative group w-full h-12 mt-2 flex items-center justify-center gap-2 rounded-xl bg-white text-black font-medium text-sm hover:bg-zinc-100 transition-all duration-200 overflow-hidden active:scale-[0.98]"
    //           >
    //             {isSubmitting ? (
    //               <span className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
    //             ) : (
    //               <>
    //                 <span>Sign in to Dashboard</span>
    //                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
    //               </>
    //             )}
    //           </button>
    //         </form>

    //         <div className="my-8 flex items-center gap-4">
    //           <div className="h-px flex-1 bg-zinc-800/80" />
    //           <span className="text-[10px] font-medium tracking-[0.3em] text-zinc-600 uppercase">
    //             Or continue with
    //           </span>
    //           <div className="h-px flex-1 bg-zinc-800/80" />
    //         </div>

    //         <div className="space-y-3">
    //           {/* Premium style OAuth buttons */}
    //           <button className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/20 hover:bg-zinc-900/50 text-zinc-300 hover:text-white text-sm font-medium transition-all duration-200 active:scale-[0.99]">
    //             {/* Custom inline vector SVG for Google */}
    //             <svg className="h-5 w-5" viewBox="0 0 24 24">
    //               <path
    //                 fill="currentColor"
    //                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    //               />
    //               <path
    //                 fill="currentColor"
    //                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    //               />
    //               <path
    //                 fill="currentColor"
    //                 d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    //               />
    //               <path
    //                 fill="currentColor"
    //                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    //               />
    //             </svg>
    //             <span>Google</span>
    //           </button>
    //         </div>

    //         <p className="mt-8 text-center text-xs text-zinc-500">
    //           New to Cofinder?
    //           <Link
    //             href="/register"
    //             className="ml-1.5 font-medium text-zinc-300 hover:text-white hover:underline underline-offset-4 transition-colors"
    //           >
    //             Create an account
    //           </Link>
    //         </p>
    //       </motion.div>
    //     </div>

    //   </div>
    // </div>
    <div className="min-h-screen hide-scrollbar p-5 bg-[#fafafa] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden selection:bg-zinc-900 selection:text-white">
      {/* Background Ambient Glows (Very subtle warm light) */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-zinc-200/50 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-4 w-96 h-96 bg-zinc-100/60 rounded-full filter blur-[120px] pointer-events-none" />

      {/* Main Container: Shifted from absolute black to elegant soft zinc-200 and deep charcoal shadow */}
      <div className="grid h-[90vh] min-h-[750px] w-full max-w-7xl overflow-hidden rounded-[24px] border border-zinc-200/80 bg-white lg:grid-cols-12 shadow-[0_32px_100px_-20px_rgba(0,0,0,0.06)] relative z-10">
        {/* LEFT COLUMN (Brand & Teaser) - 5 Cols wide */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-16 relative overflow-hidden border-r border-zinc-100 bg-[#fbfbfb]">
          {/* Subtle grid pattern background in light gray */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />

          <div className="relative z-10">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-zinc-900 animate-pulse" />
              <h1
                onClick={() => appRouter.push("/")}
                className="text-2xl font-semibold tracking-tight cursor-pointer text-zinc-900 font-sans"
              >
                Cofinder
              </h1>
            </div>

            <div className="mt-12 space-y-2">
              <p className="text-xs font-bold tracking-[0.2em] text-zinc-400 uppercase">
                The Network
              </p>
              <div className="h-[2px] w-8 bg-zinc-200" />
              <p className="text-zinc-500 text-sm leading-relaxed max-w-[240px] pt-2">
                Connect founders. Build startups. Change the world.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 bg-white text-xs text-zinc-600 mb-6 shadow-sm">
              <Sparkles size={12} className="text-zinc-500" />
              <span className="font-medium">Now live globally</span>
            </div>

            <h2 className="text-5xl font-light tracking-tight text-zinc-900 leading-[1.15]">
              Find your <br />
              <span className="font-serif italic text-zinc-600">
                perfect
              </span>{" "}
              <br />
              co-founder.
            </h2>

            <p className="mt-6 text-zinc-500 text-base leading-relaxed max-w-sm">
              Meet ambitious entrepreneurs, developers, designers, and investors
              ready to scale.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN (The Auth Interface) - 7 Cols wide */}
        <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-[420px]"
          >
            {/* Logo for mobile view */}
            <div className="lg:hidden flex items-center gap-2 mb-8">
              <span className="h-2 w-2 rounded-full bg-zinc-900" />
              <h1 className="text-xl font-semibold tracking-tight text-zinc-900">
                Cofinder
              </h1>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-normal tracking-tight text-zinc-900">
                Welcome back
              </h2>
              <p className="text-sm text-zinc-500">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
              {/* Premium style light Inputs */}
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
                    placeholder="name@company.com"
                    {...register("email")}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 focus:bg-white transition-all duration-200"
                  />
                </div>
                {errors.email?.message && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-500">
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-zinc-500 hover:text-zinc-900 transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className="w-full h-12 pl-11 pr-4 rounded-xl border border-zinc-200 bg-zinc-50/50 text-zinc-900 placeholder-zinc-400 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 focus:bg-white transition-all duration-200"
                  />
                </div>
                {errors.password?.message && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="relative group w-full h-12 mt-2 flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white font-medium text-sm hover:bg-black transition-all duration-200 active:scale-[0.98] shadow-sm"
              >
                {isSubmitting ? (
                  <span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign in to Dashboard</span>
                  </>
                )}
              </button>
            </form>

            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-zinc-200" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-zinc-400 uppercase">
                Or continue with
              </span>
              <div className="h-px flex-1 bg-zinc-200" />
            </div>

            <div className="space-y-3">
              {/* Premium Light style OAuth button */}
              <button
                type="submit"
                onClick={handleGoogleLogin}
                className="w-full h-12 flex items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-zinc-700 hover:text-zinc-900 text-sm font-medium transition-all duration-200 active:scale-[0.99] shadow-sm"
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
                <span>Google</span>
              </button>
            </div>

            <p className="mt-8 text-center text-xs text-zinc-500">
              New to Cofinder?
              <Link
                href="/register"
                className="ml-1.5 font-semibold text-zinc-800 hover:text-black hover:underline underline-offset-4 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </motion.div>
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
