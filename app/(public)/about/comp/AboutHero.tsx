"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Users, Rocket, ArrowRight } from "lucide-react";
import about_hero from '@/public/images/about_hero.jpg'


const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function AboutHero() {
  return (
    <section
      className="
      relative
      overflow-hidden
      bg-white
      "
    >
      {/* Background Grid */}

      <div
        className="
        absolute
        inset-0
        opacity-40
        bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)]
        bg-[size:4rem_4rem]
        [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent)]
        "
      />

      {/* Glow */}

      <div
        className="
        absolute
        top-[-200px]
        right-[20%]
        w-[400px]
        h-[400px]
        rounded-full
        bg-slate-200
        blur-[130px]
        "
      />

      <div
        className="
        relative
        max-w-7xl
        mx-auto
        px-6
        py-24
        grid
        lg:grid-cols-2
        gap-16
        items-center
        "
      >
        {/* LEFT CONTENT */}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{
            duration: 0.7,
          }}
        >
          {/* Badge */}

          <div
            className="
            inline-flex
            items-center
            gap-2
            px-3
            py-1
            rounded-full
            bg-slate-100
            text-xs
            font-medium
            text-slate-600
            mb-6
            "
          >
            <span
              className="
              w-2
              h-2
              bg-black
              rounded-full
              "
            />
            About CoFinder
          </div>

          <h1
            className="
            text-5xl
            md:text-7xl
            font-bold
            tracking-tight
            leading-[1.05]
            text-black
            "
          >
            Building the future,
            <br />
            <span
              className="
              italic
              font-serif
              text-slate-400
              "
            >
              together.
            </span>
          </h1>

          <p
            className="
            mt-6
            max-w-lg
            text-slate-500
            text-lg
            leading-relaxed
            "
          >
            CoFinder is the go-to platform for founders and builders to connect,
            collaborate, and create companies that make a difference.
          </p>

          <button
            className="
            mt-8
            group
            flex
            items-center
            gap-3
            bg-black
            text-white
            px-6
            py-3.5
            rounded-xl
            font-medium
            hover:bg-slate-800
            transition
            "
          >
            Join Our Mission
            <ArrowRight
              size={18}
              className="
              group-hover:translate-x-1
              transition
              "
            />
          </button>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 40,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          className="
          relative
          flex
          justify-center
          "
        >
          {/* Circle Background */}

          <div
            className="
            absolute
            w-[420px]
            h-[420px]
            rounded-full
            border
            border-slate-200
            "
          />

          <div
            className="
            absolute
            w-[500px]
            h-[500px]
            rounded-full
            border
            border-dashed
            border-slate-200
            "
          />

          {/* Main Image */}

          <div
            className="
            relative
            z-10
            w-[350px]
            md:w-[430px]
            h-[430px]
            rounded-[32px]
            overflow-hidden
            border
            border-slate-200
            shadow-2xl
            "
          >
            <Image
              src={about_hero}
              alt="Founders collaborating"
              fill
              className="
              object-cover
              "
              priority
            />
          </div>

          {/* Top Floating Card */}

          <motion.div
            initial={{
              opacity: 0,
              y: -20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.6,
            }}
            className="
            absolute
            top-8
            left-0
            md:left-[-30px]
            z-20
            bg-white
            border
            border-slate-200
            shadow-xl
            rounded-2xl
            p-4
            w-44
            "
          >
            <div
              className="
              w-9
              h-9
              rounded-lg
              bg-slate-100
              flex
              items-center
              justify-center
              mb-3
              "
            >
              <Users size={18} className="text-black" />
            </div>

            <h3
              className="
              text-xl
              font-bold
              "
            >
              10,000+
            </h3>

            <p
              className="
              text-xs
              text-slate-500
              "
            >
              Founders & Builders
              <br />
              on the platform
            </p>
          </motion.div>

          {/* Bottom Floating Card */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.8,
            }}
            className="
            absolute
            bottom-10
            right-0
            md:right-[-40px]
            z-20
            bg-white
            border
            border-slate-200
            shadow-xl
            rounded-2xl
            p-4
            w-48
            "
          >
            <div
              className="
              flex
              items-center
              gap-3
              "
            >
              <div
                className="
                w-10
                h-10
                rounded-xl
                bg-black
                text-white
                flex
                items-center
                justify-center
                "
              >
                <Rocket size={18} />
              </div>

              <div>
                <h3
                  className="
                  font-bold
                  "
                >
                  1500+
                </h3>

                <p
                  className="
                  text-xs
                  text-slate-500
                  "
                >
                  Successful
                  <br />
                  Connections
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
