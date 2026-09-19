
"use client"

import { ArrowRight, Menu, X } from "lucide-react"
import Image from "next/image"
import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import logo from "../../../public/images/logo.png"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const appRouter = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { label: "For Founders", href: "#founders" },
    { label: "For Builders", href: "for-builders" },
    { label: "How It Works", href: "how-it-works" },
    { label: "Success Stories", href: "success-stories" },
    // { label: "Pricing", href: "#pricing" },
  ]

  return (
    <nav className="relative max-w-7xl mx-auto px-6 py-6 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold">
            <Image
              src={logo}
              alt="logo image"
            />
          </div>

          <span className="text-xl font-bold tracking-tight text-slate-900">
            Cofinder
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a
            href="#founders"
            className="hover:text-gray-700 duration-200 transition-colors"
          >
            For Founders
          </a>

          <a
            href="for-builders"
            className="hover:text-gray-700 duration-200 transition-colors"
          >
            For Builders
          </a>

          <a
            href="how-it-works"
            className="hover:text-gray-700 duration-200 transition-colors"
          >
            How It Works
          </a>

          <a
            href="success-stories"
            className="hover:text-gray-700 duration-200 transition-colors"
          >
            Success Stories
          </a>

          {/* <a
            href="#pricing"
            className="hover:text-gray-700 duration-200 transition-colors"
          >
            Pricing
          </a> */}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => appRouter.push("/login")}
            className="hidden sm:flex bg-slate-900 hover:scale-105 duration-300 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all active:scale-95 cursor-pointer shadow-md hover:shadow-indigo-500/25 items-center gap-2 group"
          >
            Get Started
          </button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden relative w-11 h-11 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-900 shadow-sm"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 top-[76px] bg-black/5 backdrop-blur-[2px] -z-10"
            />

            <motion.div
              initial={{
                opacity: 0,
                y: -15,
                scale: 0.96,
                transformOrigin: "top right",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -10,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="md:hidden absolute left-4 right-4 top-[76px] overflow-hidden"
            >
              <div className="rounded-[24px] border border-slate-200/80 bg-white/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] p-3">
                <div className="space-y-1">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      initial={{
                        opacity: 0,
                        x: -12,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -8,
                      }}
                      transition={{
                        delay: 0.05 + index * 0.045,
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileTap={{
                        scale: 0.98,
                      }}
                      className="flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-950 transition-colors"
                    >
                      <span>{item.label}</span>

                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 0.35, x: 0 }}
                        transition={{
                          delay: 0.1 + index * 0.045,
                          duration: 0.25,
                        }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </motion.a>
                  ))}
                </div>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.28,
                    duration: 0.35,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="pt-2"
                >
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => {
                      setIsMenuOpen(false)
                      appRouter.push("/login")
                    }}
                    className="w-full bg-slate-900 text-white text-sm font-semibold px-5 py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-slate-900/10"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
