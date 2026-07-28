"use client"
import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import logo from "../../../public/images/logo.png"
import { useRouter } from 'next/navigation'

const Navbar = () => {
    const appRouter = useRouter();
  return (
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xlflex items-center justify-center text-white font-bold ">
          <Image
          src={logo}
          alt='logo image'
          />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Cofinder
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#founders" className="hover:text-indigo-600 transition-colors">
            For Founders
          </a>
          <a href="#builders" className="hover:text-indigo-600 transition-colors">
            For Builders
          </a>
          <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">
            How It Works
          </a>
          <a href="#stories" className="hover:text-indigo-600 transition-colors">
            Success Stories
          </a>
          <a href="#pricing" className="hover:text-indigo-600 transition-colors">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-4">
          {/* <button className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors">
            Log in
          </button> */}
          <button
          onClick={()=>appRouter.push('/login')}
          className="bg-slate-900 hover:bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-indigo-500/25 flex items-center gap-2 group">
            Get Started
            {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
          </button>
        </div>
      </nav>
  )
}

export default Navbar
