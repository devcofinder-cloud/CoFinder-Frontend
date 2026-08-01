export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-zinc-400">
            Dashboard
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-zinc-900">
            Welcome Back 👋
          </h1>
          <p className="mt-2 text-zinc-500">
            Your founder ecosystem at a glance.
          </p>
        </div>

        <button className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:scale-105">
          + New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Matches",
            value: "28",
            color: "bg-zinc-900 text-white",
          },
          {
            title: "Profile Views",
            value: "1.4K",
            color: "bg-white",
          },
          {
            title: "Messages",
            value: "63",
            color: "bg-white",
          },
          {
            title: "Projects",
            value: "4",
            color: "bg-white",
          },
        ].map((item) => (
          <div
            key={item.title}
            className={`rounded-3xl border border-zinc-200 p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${item.color}`}
          >
            <p
              className={`text-sm ${
                item.color.includes("zinc-900")
                  ? "text-zinc-300"
                  : "text-zinc-500"
              }`}
            >
              {item.title}
            </p>

            <h2 className="mt-4 text-4xl font-bold">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="mt-8 grid gap-8 xl:grid-cols-3">
        {/* Left */}
        <div className="xl:col-span-2 space-y-8">
          {/* Recommended */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Recommended Co-founders
              </h2>

              <button className="text-sm text-zinc-500 hover:text-black">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {[
                "Aarav Sharma",
                "Priya Kapoor",
                "Rohan Gupta",
              ].map((name, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-2xl border border-zinc-100 p-4 transition hover:border-black"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-zinc-200 animate-pulse" />

                    <div>
                      <h3 className="font-semibold">{name}</h3>
                      <p className="text-sm text-zinc-500">
                        Full Stack Developer
                      </p>
                    </div>
                  </div>

                  <button className="rounded-xl border border-zinc-200 px-4 py-2 text-sm hover:bg-black hover:text-white">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold">
              Recent Activity
            </h2>

            <div className="space-y-5">
              {[
                "You matched with Alex.",
                "Your profile reached 120 views.",
                "New founder joined your startup.",
                "Pitch deck uploaded.",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4"
                >
                  <div className="h-3 w-3 rounded-full bg-black" />

                  <p className="text-zinc-600">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-8">
          {/* Profile */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto h-28 w-28 rounded-full bg-zinc-200 animate-pulse" />

            <h2 className="mt-5 text-2xl font-bold">
              Aditya Semalti
            </h2>

            <p className="mt-2 text-zinc-500">
              Tech Innovator
            </p>

            <button className="mt-6 w-full rounded-xl bg-black py-3 text-white">
              Edit Profile
            </button>
          </div>

          {/* Progress */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Profile Completion
            </h2>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-zinc-200">
              <div className="h-full w-[72%] rounded-full bg-black" />
            </div>

            <p className="mt-4 text-sm text-zinc-500">
              72% Completed
            </p>
          </div>

          {/* AI Card */}
          <div className="rounded-3xl bg-gradient-to-br from-black via-zinc-900 to-zinc-800 p-8 text-white shadow-xl">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-400">
              AI Suggestion
            </p>

            <h2 className="mt-4 text-2xl font-bold">
              Complete your founder bio.
            </h2>

            <p className="mt-3 text-zinc-300">
              Profiles with a detailed bio receive 2.4x more founder matches.
            </p>

            <button className="mt-6 rounded-xl bg-white px-5 py-3 text-black">
              Improve Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}