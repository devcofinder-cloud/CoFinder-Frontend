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
    { label: "Home", href: "/home" },
    { label: "About Us", href: "/about-us" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Success Stories", href: "/success-stories" },
  ]

  return (
    <nav className="relative w-full bg-white z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:flex flex-col items-center pt-6 pb-5">

          {/* Logo + Cofinder */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Image
              src={logo}
              alt="Cofinder"
              width={34}
              height={34}
              className="object-contain"
            />

            <span className="text-2xl font-bold tracking-tight text-black">
              Cofinder
            </span>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
            }}
            className="flex items-center gap-10 mt-6"
          >
            {menuItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.15 + index * 0.06,
                }}
                className="relative text-sm font-medium text-gray-500 hover:text-black transition-colors duration-200 group"
              >
                {item.label}

                <span className="absolute -bottom-2 left-1/2 w-0 h-[1.5px] bg-black -translate-x-1/2 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="md:hidden flex items-center justify-between h-[72px]">

          {/* Logo */}
          <motion.a
            href="/home"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Image
              src={logo}
              alt="Cofinder"
              width={30}
              height={30}
              className="object-contain"
            />

            <span className="text-xl font-bold tracking-tight text-black">
              Cofinder
            </span>
          </motion.a>

          {/* Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="relative w-10 h-10 flex items-center justify-center text-black"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.6,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.6,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{
                    opacity: 0,
                    rotate: 90,
                    scale: 0.6,
                  }}
                  animate={{
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    rotate: -90,
                    scale: 0.6,
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMenuOpen(false)}
                className="md:hidden fixed inset-0 top-[72px] bg-black/10 backdrop-blur-[2px]"
              />

              {/* Menu */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: -15,
                  scale: 0.97,
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
                className="md:hidden absolute left-4 right-4 top-[68px] z-50"
              >
                <div className="bg-white rounded-3xl p-3">

                  {/* Links */}
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
                        transition={{
                          delay: 0.05 + index * 0.06,
                          duration: 0.3,
                        }}
                        className="flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-medium text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                      >
                        <span>{item.label}</span>

                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </motion.a>
                    ))}
                  </div>

                  {/* CTA */}
                  {/* <motion.button
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 0.3,
                      duration: 0.3,
                    }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      setIsMenuOpen(false)
                      appRouter.push("/login")
                    }}
                    className="w-full mt-2 bg-black text-white rounded-2xl py-4 text-sm font-semibold flex items-center justify-center gap-2"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </motion.button> */}

                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar