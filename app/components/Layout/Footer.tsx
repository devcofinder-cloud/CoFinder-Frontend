"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaLinkedinIn, FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";
import { MdArrowOutward, MdEmail } from "react-icons/md";



const footerLinks = [
  {
    title: "Platform",
    links: [
      {
        name: "Find Founders",
        path: "/find-founders",
      },
      {
        name: "Discover Projects",
        path: "/projects",
      },
      {
        name: "Community",
        path: "/community",
      },
      {
        name: "Opportunities",
        path: "/opportunities",
      },
    ],
  },

  {
    title: "Company",
    links: [
      {
        name: "About Us",
        path: "/about",
      },
      {
        name: "How It Works",
        path: "/how-it-works",
      },
      {
        name: "Careers",
        path: "/careers",
      },
      {
        name: "Contact",
        path: "/contact",
      },
    ],
  },

  {
    title: "Resources",
    links: [
      {
        name: "Blog",
        path: "/blog",
      },
      {
        name: "Help Center",
        path: "/help",
      },
      {
        name: "Privacy Policy",
        path: "/privacy-policy",
      },
      {
        name: "Terms",
        path: "/terms",
      },
    ],
  },
];

const socialIcons = [FaLinkedinIn, FaTwitter, FaGithub, FaInstagram];

export default function Footer() {

  const appRouter = useRouter()
  return (
    <footer className="relative overflow-hidden bg-white text-black">
      {/* Grid Background */}

      <div
        className="absolute inset-0 opacity-[0.35]
        bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem]
        [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000,transparent)] "
      />

      {/* Soft Glow */}

      <div
        className=" absolute top-[-200px] left-1/2  -translate-x-1/2 w-[500px] h-[500px] bg-slate-200 blur-[140px] rounded-full "
      />

      <div
        className="
        relative
        max-w-7xl
        mx-auto
        px-6
        py-24
        "
      >
        {/* CTA */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
          rounded-[32px]
          border
          border-slate-200
          bg-white
          shadow-[0_20px_60px_rgba(0,0,0,0.08)]
          p-8
          md:p-14
          flex
          flex-col
          md:flex-row
          justify-between
          items-center
          gap-10
          "
        >
          <div>
            <h2
              className="
              text-3xl
              md:text-5xl
              font-semibold
              tracking-tight
              leading-tight
              "
            >
              Build something
              <br />
              <span className="text-slate-400">extraordinary.</span>
            </h2>

            <p
              className="
              mt-5
              max-w-xl
              text-slate-500
              text-lg
              leading-relaxed
              "
            >
              Connect with ambitious founders, developers and creators to
              transform ideas into impactful startups.
            </p>
          </div>

          <button
            className="
            group
            flex
            items-center
            gap-3
            bg-black
            text-white
            px-8
            py-4
            rounded-full
            font-semibold
            hover:bg-slate-800
            transition-all
            duration-300
            hover:scale-105
            "
          >
            Get Started
            <MdArrowOutward
              size={22}
              className="
              transition-transform
              group-hover:translate-x-1
              group-hover:-translate-y-1
              "
            />
          </button>
        </motion.div>

        {/* MAIN CONTENT */}

        <div
          className="
          grid
          grid-cols-1
          md:grid-cols-5
          gap-12
          mt-20
          "
        >
          {/* BRAND */}

          <div className="md:col-span-2">
            <h3
              className="
              text-4xl
              font-bold
              tracking-tight
              "
            >
              Co
              <span className="text-slate-400">Finder</span>
            </h3>

            <p
              className="
              mt-5
              max-w-sm
              text-slate-500
              leading-7
              "
            >
              A modern platform where founders, builders and creators connect,
              collaborate and build the future.
            </p>

            {/* Social */}

            <div
              className="
              flex
              gap-3
              mt-8
              "
            >
              {socialIcons.map((Icon, index) => (
                <button
                  key={index}
                  className="
                    w-11
                    h-11
                    rounded-full
                    border
                    border-slate-200
                    flex
                    items-center
                    justify-center
                    text-slate-600
                    hover:bg-black
                    hover:text-white
                    transition
                    "
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* LINKS */}

        {footerLinks.map((section, index) => (
  <div key={index}>
    <h4
      className="
        text-sm
        uppercase
        tracking-widest
        text-slate-400
        font-semibold
        mb-6
      "
    >
      {section.title}
    </h4>

    <ul className="space-y-4">
      {section.links.map((item) => (
        <li key={item.name}>
          <p
            onClick={()=>appRouter.push(item.path)}
            className="
              text-slate-600
              hover:text-black
              cursor-pointer
              transition
              duration-300
            "
          >
            {item.name}
          </p>
        </li>
      ))}
    </ul>
  </div>
))}
        </div>

        {/* Bottom */}

        <div
          className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-5 text-sm">
          <p className="text-slate-400">
            © {new Date().getFullYear()} CoFinder. All rights reserved.
          </p>

          <div
            className="
            flex
            items-center
            gap-2
            text-slate-500
            "
          >
            <MdEmail size={18} />
            hello@cofinder.com
          </div>
        </div>
      </div>
    </footer>
  );
}
