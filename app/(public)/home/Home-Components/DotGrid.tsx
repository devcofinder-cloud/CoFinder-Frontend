"use client";

import React from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const cards = [
  {
    title: "100 People, 100 Great Ideas",
    subtitle:
      "Late-night eureka moment. A fresh Notion page. Group chats buzzing with “bro, what if we made...” Everyone thinks they’re about to quit their job.",
    pattern: [
      1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1,
      1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
      1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1,
      0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1,
    ],
  },
  {
    title: "2/3 Never Make It Past The Brainstorm.",
    subtitle:
      "Life gets busy. The hype cools off. Without anyone pushing them forward, the idea gets buried under everyday routine and ",
    pattern: [
      0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0,
      1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1,
      0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1,
      1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
    ],
  },
  {
    title: "27 crash headfirst into the messy middle.",
    subtitle:
      "You actually started. But handling design, code, marketing, and strategy solo is exhausting. When you carry the entire weight by yourself, friction wins.",
    pattern: [
      1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1,
      1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0,
      1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1,
      0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1,
    ],
  },
  {
    title: "The build is live. The tank is empty.",
    subtitle:
      "You launched. You survived the messy middle. But now the real roadblocks hit bugs, distribution, and you’re running the entire circus solo. Burnout creeps in and whispers ‘Time to give up!!’",
    pattern: [
      1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1,
      0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0,
      1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0,
      1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0,
    ],
  },
  {
    title: "You Did It, But Realized Something. ",
    subtitle:
      "You weathered the storm and crossed the line. But here’s the truth: it was never a solo sprint. It’s a relay marathon.",
    pattern: [
      0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0,
      1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1,
      1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1,
      1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0,
    ],
  },
];

export default function DotGridSlider() {
  return (
    <section className="w-full bg-white py-20 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="max-w-2xl mx-auto text-center px-6 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black">
            Build something meaningful
          </h2>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-500">
            Find people who share your ambition, complement your skills and want
            to build something extraordinary together.
          </p>
        </div>

        {/* Slider */}
        <Swiper
          modules={[Autoplay, EffectCoverflow, Pagination]}
          effect="coverflow"
          centeredSlides
          grabCursor
          loop
          speed={900}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 180,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1.08,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1.35,
              spaceBetween: 22,
            },
            1024: {
              slidesPerView: 1.55,
              spaceBetween: 28,
            },
          }}
          className="!pb-14"
        >
          {cards.map((card, cardIndex) => (
            <SwiperSlide key={card.title}>
              <div className="bg-gray-50 rounded-[32px] px-6 py-8 sm:px-10 sm:py-10 min-h-[440px] sm:min-h-[500px] flex flex-col">
                {/* Card content */}
                <div>
                  {/* <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
                    0{cardIndex + 1} / 05
                  </span> */}
                </div>

                {/* Dots */}
                <div className="flex-1 flex items-end mt-10">
                  <div className="w-full grid grid-cols-8 gap-x-3 sm:gap-x-5 gap-y-4 sm:gap-y-5 place-items-center">
                    {card.pattern.map((isBlack, index) => (
                      <div
                        key={index}
                        className={`
                          w-6 h-6
                          sm:w-5 sm:h-5
                          rounded-full
                          transition-all duration-500
                          ${
                            isBlack
                              ? "bg-black scale-100"
                              : "bg-gray-300 scale-90"
                          }
                        `}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="mt-10 text-2xl sm:text-4xl font-bold tracking-tight text-black">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-500 max-w-xl">
                  {card.subtitle}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center mt-10">
        <button className="inline-flex items-center justify-center gap-2 rounded-full cursor-pointer hover:scale-105 duration-300 active:scale-95 bg-black px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-gray-800">
          Join Waitlist
        </button>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          bottom: 0 !important;
        }

        .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: #000;
          opacity: 0.2;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          width: 28px;
          border-radius: 999px;
          opacity: 1;
        }

        .swiper-slide {
          transition:
            transform 0.9s ease,
            opacity 0.9s ease;
        }

        .swiper-slide:not(.swiper-slide-active) {
          opacity: 0.55;
        }

        .swiper-slide-active {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
