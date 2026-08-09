import {
  HiOutlineUsers,
  HiOutlineBadgeCheck,
  HiOutlineShieldCheck,
  HiOutlineLink,
  HiOutlineGlobeAlt,
} from "react-icons/hi";
import { FiTarget, FiZap } from "react-icons/fi";

import { FiBriefcase } from "react-icons/fi";

const stats = [
  {
    icon: HiOutlineUsers,
    number: "10,000+",
    label: "Founders & Builders",
  },
  {
    icon: HiOutlineLink,
    number: "1,500+",
    label: "Connections Made",
  },
  {
    icon: FiBriefcase,
    number: "800+",
    label: "Projects Launched",
  },
  {
    icon: HiOutlineGlobeAlt,
    number: "80+",
    label: "Countries Represented",
  },
];

const timeline = [
  {
    year: "2022",
    text: "The idea for Cofinder was born.",
  },
  {
    year: "2023",
    text: "We launched the platform and onboarded our early community.",
  },
  {
    year: "2024 & Beyond",
    text: "Continuing to build the world's most valuable network for founders and builders.",
  },
];

function StorySection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Stats */}
        <div
          className="
            bg-[#0b0b0d]
            rounded-3xl
            px-8
            py-10
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-8
            mb-16
          "
        >
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  flex
                  items-center
                  gap-5
                  lg:border-r
                  last:border-none
                  border-white/10
                "
              >
                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-white/10
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Icon className="text-white text-2xl" />
                </div>

                <div>
                  <h3
                    className="
                      text-3xl
                      font-bold
                      text-white
                    "
                  >
                    {item.number}
                  </h3>

                  <p
                    className="
                      text-sm
                      text-slate-400
                      mt-1
                    "
                  >
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Story */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-14
            items-center
          "
        >
          {/* Image */}
          <div className="relative">
            <img
              src="/images/hero_2.jpg"
              alt="Founder team"
              className="
                w-full
                h-[420px]
                object-cover
                rounded-3xl
              "
            />

            {/* Floating Card */}
            <div
              className="
                absolute
                bottom-6
                left-6
                bg-white
                rounded-2xl
                shadow-xl
                px-6
                py-5
                flex
                items-center
                gap-4
              "
            >
              <div
                className="
                  w-12
                  h-12
                  rounded-xl
                  bg-indigo-50
                  flex
                  items-center
                  justify-center
                "
              >
                ❤️
              </div>

              <p
                className="
                  font-semibold
                  text-slate-900
                  text-sm
                  max-w-[150px]
                "
              >
                Built by builders,
                <br />
                for builders.
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p
              className="
                text-xs
                uppercase
                tracking-[0.3em]
                text-gray-500
                font-semibold
                mb-5
              "
            >
              Our Story
            </p>

            <h2
              className="
                text-4xl
                font-bold
                text-slate-900
                mb-5
              "
            >
              It started with a simple belief.
            </h2>

            <p
              className="
                text-slate-500
                leading-7
                mb-5
              "
            >
              Cofinder was born out of frustration—founders couldn't find the
              right people, and talented builders struggled to find meaningful
              opportunities.
            </p>

            <p
              className="
                text-slate-500
                leading-7
                mb-10
              "
            >
              So we built Cofinder: a platform where ideas meet talent, and
              collaborations turn into companies that shape the future.
            </p>

            {/* Timeline */}
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className="
                    flex
                    gap-6
                  "
                >
                  <div className="flex flex-col items-center">
                    <div
                      className="
                        w-3
                        h-3
                        rounded-full
                        bg-gray-500
                      "
                    />

                    {index !== timeline.length - 1 && (
                      <div
                        className="
                          w-px
                          h-full
                          bg-indigo-100
                          mt-2
                        "
                      />
                    )}
                  </div>

                  <div>
                    <h4
                      className="
                        font-semibold
                        text-slate-900
                      "
                    >
                      {item.year}
                    </h4>

                    <p
                      className="
                        text-sm
                        text-slate-500
                        mt-2
                      "
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



import {
  FaLightbulb,
  FaCode,
  FaUser,
  FaArrowRight,
  FaPlayCircle,
} from "react-icons/fa";

 function FounderCTA() {
  return (
    <div className="max-w-7xl mx-auto space-y-5">

      {/* Top Founder / Builder Card */}
      <div className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-sm
        grid
        md:grid-cols-2
      ">

        {/* Founder */}
        <div className="
          p-8
          md:p-10
          bg-gradient-to-br
          from-indigo-50
          to-white
          flex
          gap-6
          items-start
        ">
          <div className="
            w-12 h-12
            rounded-full
            bg-white
            shadow-md
            flex
            items-center
            justify-center
            text-gray-500
          ">
            <FaLightbulb size={20}/>
          </div>

          <div>
            <h3 className="
              text-lg
              font-semibold
              text-slate-900
            ">
              For Founders
            </h3>

            <p className="
              mt-2
              text-sm
              leading-6
              text-slate-500
              max-w-xs
            ">
              Find cofounders, validate ideas, and build your dream team to launch faster.
            </p>

            <button className="
              mt-5
              px-5
              py-2.5
              rounded-lg
              bg-black
              text-white
              text-sm
              font-medium
              flex
              items-center
              gap-2
              hover:opacity-90
              transition
            ">
              I'm a Founder
              <FaUser size={12}/>
            </button>
          </div>
        </div>


        {/* Center Logo */}
        <div className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          hidden
          md:flex
          w-16
          h-16
          rounded-full
          bg-black
          items-center
          justify-center
          shadow-xl
        ">
          <div className="grid grid-cols-2 gap-2">
            <span className="w-2 h-2 bg-white rounded-full"/>
            <span className="w-2 h-2 bg-white rounded-full"/>
            <span className="w-2 h-2 bg-white rounded-full"/>
          </div>
        </div>


        {/* Builder */}
        <div className="
          p-8
          md:p-10
          flex
          gap-6
          items-start
        ">
          <div className="
            w-12 h-12
            rounded-full
            bg-white
            border
            border-slate-100
            shadow-md
            flex
            items-center
            justify-center
            text-slate-700
          ">
            <FaCode size={18}/>
          </div>

          <div>
            <h3 className="
              text-lg
              font-semibold
              text-slate-900
            ">
              For Builders
            </h3>

            <p className="
              mt-2
              text-sm
              leading-6
              text-slate-500
              max-w-xs
            ">
              Discover exciting projects, connect with founders, and build something impactful.
            </p>


            <button className="
              mt-5
              px-5
              py-2.5
              rounded-lg
              border
              border-slate-200
              text-sm
              font-medium
              flex
              items-center
              gap-2
              hover:bg-slate-50
              transition
            ">
              I'm a Builder
              <FaCode size={12}/>
            </button>

          </div>

        </div>

      </div>



      {/* Bottom CTA */}
      <div className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        md:p-10
        flex
        flex-col
        md:flex-row
        items-center
        justify-between
        gap-8
        overflow-hidden
      ">


        {/* Illustration Placeholder */}
        <div className="
          w-full
          md:w-1/3
          h-40
          flex
          items-center
          justify-center
        ">
          <div className="
            text-7xl
            opacity-70
          ">
            🤝
          </div>
        </div>



        <div className="flex-1">

          <h2 className="
            text-3xl
            md:text-4xl
            font-bold
            tracking-tight
            text-slate-900
          ">
            Let's build the future
            <span className="
              text-indigo-500
              italic
              font-medium
            ">
              —together.
            </span>
          </h2>


          <p className="
            mt-3
            text-sm
            md:text-base
            text-slate-500
            max-w-xl
          ">
            Join thousands of ambitious founders and builders already building,
            collaborating, and creating impact on Cofinder.
          </p>


          <div className="
            mt-6
            flex
            flex-wrap
            gap-4
          ">

            <button className="
              px-6
              py-3
              rounded-xl
              bg-black
              text-white
              text-sm
              font-medium
              flex
              items-center
              gap-3
            ">
              Create Your Account
              <FaArrowRight/>
            </button>


            <button className="
              px-6
              py-3
              rounded-xl
              border
              border-slate-200
              text-sm
              font-medium
              flex
              items-center
              gap-3
            ">
              Learn How It Works
              <FaPlayCircle/>
            </button>

          </div>


        </div>


      </div>


    </div>
  );
}

const missionCards = [
  {
    icon: HiOutlineUsers,
    title: "People First",
    description:
      "We put people at the center of everything we do. Real connections drive real impact.",
  },
  {
    icon: FiTarget,
    title: "Purpose Driven",
    description:
      "We're here to empower builders and founders to create meaningful solutions.",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Trust & Safety",
    description:
      "We ensure a safe, respectful, and transparent environment for every member.",
  },
  {
    icon: FiZap,
    title: "Move Fast",
    description:
      "We embrace speed and agility to help you go from idea to impact faster.",
  },
];

export default function MissionSection() {
  return (
    <>
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-gray-500
              font-semibold
              mb-4
            "
          >
            Our Mission
          </p>

          <h2
            className="
              text-4xl
              md:text-5xl
              font-bold
              text-slate-900
              tracking-tight
            "
          >
            Empowering collaboration.
            <br />
            Fueling innovation.
          </h2>

          <p
            className="
              mt-5
              text-slate-500
              text-base
              md:text-lg
              leading-relaxed
            "
          >
            We believe that the right connection can change everything. Cofinder
            exists to break down barriers, bring people together, and turn bold
            ideas into real-world impact.
          </p>
        </div>

        {/* Cards */}
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-5
          "
        >
          {missionCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="
                  group
                  border
                  border-slate-200
                  rounded-3xl
                  p-7
                  bg-white
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                {/* Icon */}
                <div
                  className="
                    w-16
                    h-16
                    rounded-2xl
                    bg-indigo-50
                    flex
                    items-center
                    justify-center
                    mb-7
                    group-hover:bg-indigo-100
                    transition
                  "
                >
                  <Icon
                    className="
                      text-gray-500
                      text-3xl
                    "
                  />
                </div>

                <h3
                  className="
                    text-xl
                    font-semibold
                    text-slate-900
                    mb-4
                  "
                >
                  {item.title}
                </h3>

                <p
                  className="
                    text-sm
                    leading-7
                    text-slate-500
                  "
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    <StorySection/>
    <FounderCTA/>
    </>
  );
}
