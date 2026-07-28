"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Props {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  last?: boolean;
}

export default function StepCard({
  number,
  title,
  description,
  icon,
  last,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .6 }}
      className="relative flex flex-col items-center text-center"
    >
      {/* Number */}

      <div className="relative mb-8">

        <div className="absolute inset-0 blur-3xl bg-gray-300 rounded-full opacity-40"/>

        <div className="relative w-20 h-20 rounded-3xl border bg-white flex items-center justify-center shadow-xl">

          {icon}

        </div>

        <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
          {number}
        </span>

      </div>

      <h3 className="text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-4 text-gray-500 leading-7 max-w-xs">
        {description}
      </p>

      {!last && (

        <ArrowRight
          className="hidden lg:block absolute top-10 -right-20 text-gray-300"
          size={40}
        />

      )}
    </motion.div>
  );
}