"use client";

import { Check } from "lucide-react";

type Plan = {
  name: string;
  subtitle: string;
  price: string;
  points: string[];
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Explorer",
    subtitle: "Perfect for aspiring founders getting started.",
    price: "Free",
    points: [
      "Create your founder profile",
      "Basic AI compatibility matching",
      "Browse startup opportunities",
      "Limited connection requests",
      "Community access",
    ],
  },
  {
    name: "Builder",
    subtitle: "Everything you need to find your ideal co-founder.",
    price: "₹499",
    popular: true,
    points: [
      "Unlimited AI matches",
      "Advanced psychometric insights",
      "Unlimited connection requests",
      "Priority profile visibility",
      "Private messaging",
      "Founder workspace",
      "Priority support",
    ],
  },
  {
    name: "Studio",
    subtitle: "For funded startups and growing founding teams.",
    price: "₹999",
    points: [
      "Everything in Builder",
      "Invite team members",
      "Advanced collaboration tools",
      "Investor-ready workspace",
      "Dedicated onboarding",
      "Early access to new features",
    ],
  },
];

export default function PricePlan() {
  return (
    <section className="mx-auto mt-28 max-w-7xl px-6">
      <div className="text-center">
        <span className="rounded-full border px-4 py-2 text-sm font-medium">
          Pricing
        </span>

        <h1 className="mt-6 text-5xl font-bold tracking-tight">
          Simple, Founder-friendly Pricing
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
          Start for free and upgrade whenever you're ready to build with the
          perfect co-founder.
        </p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-3 mb-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
              plan.popular
                ? "border-black bg-black text-white scale-105"
                : "border-gray-200 bg-white"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-sm font-semibold text-black">
                Most Popular
              </span>
            )}

            <h2 className="text-3xl font-bold">{plan.name}</h2>

            <p
              className={`mt-3 ${
                plan.popular ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {plan.subtitle}
            </p>

            <div className="mt-8 flex items-end gap-2">
              <h3 className="text-5xl font-bold">{plan.price}</h3>

              {plan.price !== "Free" && (
                <span
                  className={
                    plan.popular ? "text-gray-300" : "text-gray-500"
                  }
                >
                  /month
                </span>
              )}
            </div>

            <div className="my-8 h-px bg-gray-300/30" />

            <div className="space-y-4">
              {plan.points.map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full ${
                      plan.popular
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    }`}
                  >
                    <Check size={14} />
                  </div>

                  <p
                    className={
                      plan.popular ? "text-gray-200" : "text-gray-700"
                    }
                  >
                    {point}
                  </p>
                </div>
              ))}
            </div>

            <button
              className={`mt-10 w-full rounded-xl py-3 font-semibold transition ${
                plan.popular
                  ? "bg-white text-black hover:bg-gray-200"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              {plan.price === "Free"
                ? "Get Started"
                : "Choose " + plan.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}