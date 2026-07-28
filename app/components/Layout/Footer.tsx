// "use client";

// import { motion } from "framer-motion";
// import { FaLinkedinIn, FaTwitter, FaGithub, FaInstagram } from "react-icons/fa";
// import { MdArrowOutward, MdEmail } from "react-icons/md";

// const footerLinks = [
//   {
//     title: "Platform",
//     links: ["Find Founders", "Discover Projects", "Community", "Opportunities"],
//   },

//   {
//     title: "Company",
//     links: ["About Us", "How It Works", "Careers", "Contact"],
//   },

//   {
//     title: "Resources",
//     links: ["Blog", "Help Center", "Privacy Policy", "Terms"],
//   },
// ];

// const socialIcons = [FaLinkedinIn, FaTwitter, FaGithub, FaInstagram];

// export default function Footer() {
//   return (
//     <footer className="relative overflow-hidden bg-black text-white">
//       {/* Subtle Grid Background */}
//       <div
//         className="
//         absolute inset-0
//         opacity-[0.08]
//         bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
//         bg-[size:4rem_4rem]
//         "
//       />

//       {/* White Glow */}
//       <div
//         className="
//         absolute
//         top-[-200px]
//         left-1/2
//         -translate-x-1/2
//         w-[600px]
//         h-[600px]
//         bg-white/10
//         blur-[160px]
//         rounded-full
//         "
//       />

//       <div
//         className="
//         relative
//         max-w-7xl
//         mx-auto
//         px-6
//         py-24
//       "
//       >
//         {/* CTA CARD */}
//         <motion.div
//           initial={{
//             opacity: 0,
//             y: 40,
//           }}
//           whileInView={{
//             opacity: 1,
//             y: 0,
//           }}
//           viewport={{
//             once: true,
//           }}
//           transition={{
//             duration: 0.7,
//           }}
//           className="
//           relative
//           overflow-hidden
//           rounded-[32px]
//           border
//           border-white/10
//           bg-white/[0.03]
//           backdrop-blur-xl
//           p-8
//           md:p-14
//           flex
//           flex-col
//           md:flex-row
//           items-center
//           justify-between
//           gap-10
//           "
//         >
//           {/* Card Glow */}
//           <div
//             className="
//             absolute
//             -right-20
//             -top-20
//             w-72
//             h-72
//             bg-white/10
//             blur-3xl
//             rounded-full
//             "
//           />

//           <div className="relative">
//             <h2
//               className="
//               text-3xl
//               md:text-5xl
//               font-semibold
//               tracking-tight
//               leading-tight
//               "
//             >
//               Build with people
//               <br />
//               who think
//               <span className="text-white/50"> different.</span>
//             </h2>

//             <p
//               className="
//               mt-5
//               text-white/50
//               max-w-xl
//               text-lg
//               leading-relaxed
//               "
//             >
//               Connect with ambitious founders, developers and creators to turn
//               ideas into companies.
//             </p>
//           </div>

//           <button
//             className="
//             relative
//             group
//             flex
//             items-center
//             gap-3
//             bg-white
//             text-black
//             px-8
//             py-4
//             rounded-full
//             font-semibold
//             transition-all
//             duration-300
//             hover:scale-105
//             "
//           >
//             Get Started
//             <MdArrowOutward
//               size={22}
//               className="
//               transition-transform
//               group-hover:translate-x-1
//               group-hover:-translate-y-1
//               "
//             />
//           </button>
//         </motion.div>
//        {/* MAIN FOOTER CONTENT */}
//         <div
//           className="
//           grid
//           grid-cols-1
//           md:grid-cols-5
//           gap-12
//           mt-20
//           "
//         >
//           {/* BRAND */}

//           <div className="md:col-span-2">
//             <h3
//               className="
//               text-4xl
//               font-bold
//               tracking-tight
//               "
//             >
//               Co
//               <span className="text-white/40">Finder</span>
//             </h3>

//             <p
//               className="
//               mt-5
//               max-w-sm
//               text-white/50
//               leading-7
//               "
//             >
//               A platform where ambitious founders, developers and creators meet,
//               collaborate and build the future together.
//             </p>

//             {/* Social Icons */}

//             <div
//               className="
//               flex
//               gap-3
//               mt-8
//               "
//             >
//               {socialIcons.map((Icon, index) => (
//                 <button
//                   key={index}
//                   className="
//                   w-11
//                   h-11
//                   rounded-full
//                   border
//                   border-white/10
//                   flex
//                   items-center
//                   justify-center
//                   text-white/60
//                   hover:text-black
//                   hover:bg-white
//                   transition-all
//                   duration-300
//                   "
//                 >
//                   <Icon size={18} />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* LINKS */}

//           {footerLinks.map((section, index) => (
//             <div key={index}>
//               <h4
//                 className="
//                 text-sm
//                 uppercase
//                 tracking-widest
//                 text-white/40
//                 font-semibold
//                 mb-6
//                 "
//               >
//                 {section.title}
//               </h4>

//               <ul
//                 className="
//                 space-y-4
//                 "
//               >
//                 {section.links.map((item) => (
//                   <li
//                     key={item}
//                     className="
//                     group
//                     text-white/60
//                     hover:text-white
//                     cursor-pointer
//                     transition
//                     "
//                   >
//                     <span
//                       className="
//                       relative
//                       "
//                     >
//                       {item}

//                       <span
//                         className="
//                         absolute
//                         left-0
//                         -bottom-1
//                         h-[1px]
//                         w-0
//                         bg-white
//                         transition-all
//                         duration-300
//                         group-hover:w-full
//                         "
//                       />
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//         {/* BOTTOM BAR */}
//         <div
//           className="
//           mt-20
//           pt-8
//           border-t
//           border-white/10
//           flex
//           flex-col
//           md:flex-row
//           items-center
//           justify-between
//           gap-5
//           text-sm
//           "
//         >
//           <p
//             className="
//             text-white/40
//             "
//           >
//             © {new Date().getFullYear()} CoFinder. All rights reserved.
//           </p>

//           <div
//             className="
//             flex
//             items-center
//             gap-2
//             text-white/50
//             "
//           >
//             <MdEmail size={18} />
//             hello@cofinder.com
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

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
