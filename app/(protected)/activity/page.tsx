"use client";

import {
  Bell,
  Check,
  ChevronRight,
  Eye,
  MessageCircle,
  Sparkles,
  UserPlus,
  UserRound,
  X,
} from "lucide-react";

const activities = [
  {
    id: 1,
    type: "connection",
    title: "Rahul Sharma accepted your request",
    description: "You can now start a conversation with Rahul.",
    time: "2 hours ago",
    avatar: "RS",
    action: "Message",
    unread: true,
  },
  {
    id: 2,
    type: "request",
    title: "Priya Singh sent you a connection request",
    description: "Product Designer · Bangalore, India",
    time: "4 hours ago",
    avatar: "PS",
    action: "Review",
    unread: true,
  },
  {
    id: 3,
    type: "match",
    title: "You have a new potential match",
    description: "Arjun Mehta · Full Stack Developer",
    time: "5 hours ago",
    avatar: "AM",
    action: "View Match",
    match: "94% Match",
    unread: true,
  },
  {
    id: 4,
    type: "profile",
    title: "Karan Verma viewed your profile",
    description: "Backend Engineer · Hyderabad, India",
    time: "Yesterday",
    avatar: "KV",
    action: "View Profile",
    unread: false,
  },
  {
    id: 5,
    type: "message",
    title: "Ananya Verma sent you a message",
    description: `"Hey, I'd love to discuss the idea with you."`,
    time: "Yesterday",
    avatar: "AV",
    action: "Open Chat",
    unread: false,
  },
  {
    id: 6,
    type: "profile-update",
    title: "Your profile was updated",
    description: "You added 3 new skills to your profile.",
    time: "2 days ago",
    avatar: "ME",
    action: "View Profile",
    unread: false,
  },
  {
    id: 7,
    type: "completion",
    title: "Profile completion increased to 90%",
    description: "Add your pitch deck to reach 100% completion.",
    time: "3 days ago",
    avatar: "90%",
    action: "Complete",
    unread: false,
  },
];

const filters = [
  { label: "All", count: 7 },
  { label: "Connections", count: 2 },
  { label: "Messages", count: 1 },
  { label: "Matches", count: 1 },
];

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6 text-zinc-950 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500">
                <Bell size={13} />
                Your activity
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Activity
              </h1>

              <p className="mt-2 max-w-lg text-sm leading-6 text-zinc-500">
                Stay up to date with your connections, matches, messages and
                profile activity.
              </p>
            </div>

            <button className="self-start rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-xs font-semibold text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-950 sm:self-auto">
              Mark all as read
            </button>
          </div>
        </div>

        {/* ================= SUMMARY CARDS ================= */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <SummaryCard
            icon={<Bell size={17} />}
            label="Total Activity"
            value="7"
          />

          <SummaryCard
            icon={<UserPlus size={17} />}
            label="Connections"
            value="2"
          />

          <SummaryCard
            icon={<Sparkles size={17} />}
            label="New Matches"
            value="1"
          />

          <SummaryCard
            icon={<MessageCircle size={17} />}
            label="Messages"
            value="1"
          />
        </div>

        {/* ================= FILTERS ================= */}
        <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {filters.map((filter, index) => (
            <button
              key={filter.label}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition ${
                index === 0
                  ? "bg-zinc-950 text-white"
                  : "border border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400 hover:text-zinc-950"
              }`}
            >
              {filter.label}

              <span
                className={`rounded-full px-1.5 py-0.5 text-[9px] ${
                  index === 0
                    ? "bg-white/15 text-white"
                    : "bg-zinc-100 text-zinc-400"
                }`}
              >
                {filter.count}
              </span>
            </button>
          ))}
        </div>

        {/* ================= ACTIVITY ================= */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">

          {/* Today */}
          <ActivityGroupTitle title="Today" />

          <ActivityItem activity={activities[0]} />
          <ActivityItem activity={activities[1]} />
          <ActivityItem activity={activities[2]} />

          {/* Yesterday */}
          <ActivityGroupTitle title="Yesterday" />

          <ActivityItem activity={activities[3]} />
          <ActivityItem activity={activities[4]} />

          {/* Earlier */}
          <ActivityGroupTitle title="Earlier" />

          <ActivityItem activity={activities[5]} />
          <ActivityItem activity={activities[6]} />

        </div>

        {/* ================= BOTTOM ================= */}
        <div className="mt-6 flex items-center justify-center">
          <button className="flex items-center gap-2 text-xs font-semibold text-zinc-500 transition hover:text-zinc-950">
            Load more activity
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* SUMMARY CARD */
/* ================================================= */

function SummaryCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 transition hover:border-zinc-300">
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
        {icon}
      </div>

      <p className="text-2xl font-bold tracking-tight">{value}</p>

      <p className="mt-1 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
        {label}
      </p>
    </div>
  );
}

/* ================================================= */
/* GROUP TITLE */
/* ================================================= */

function ActivityGroupTitle({ title }: { title: string }) {
  return (
    <div className="border-b border-zinc-100 bg-zinc-50/70 px-5 py-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
        {title}
      </p>
    </div>
  );
}

/* ================================================= */
/* ACTIVITY ITEM */
/* ================================================= */

function ActivityItem({
  activity,
}: {
  activity: (typeof activities)[number];
}) {
  return (
    <div
      className={`group relative flex gap-4 border-b border-zinc-100 px-5 py-5 transition last:border-b-0 hover:bg-zinc-50 sm:px-6 ${
        activity.unread ? "bg-zinc-50/40" : "bg-white"
      }`}
    >
      {/* Unread indicator */}
      {activity.unread && (
        <span className="absolute left-2 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-zinc-950" />
      )}

      {/* Avatar / Icon */}
      <div className="relative shrink-0">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full text-xs font-bold ${
            activity.type === "completion"
              ? "bg-zinc-950 text-white"
              : "bg-zinc-100 text-zinc-700"
          }`}
        >
          {activity.avatar}
        </div>

        <ActivityIcon type={activity.type} />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3
              className={`text-sm ${
                activity.unread
                  ? "font-bold text-zinc-950"
                  : "font-semibold text-zinc-800"
              }`}
            >
              {activity.title}
            </h3>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-zinc-500">
              {activity.description}
            </p>
          </div>

          <span className="shrink-0 text-[10px] text-zinc-400">
            {activity.time}
          </span>
        </div>

        {/* Match */}
        {activity.match && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[10px] font-bold text-zinc-700">
            <Sparkles size={11} />
            {activity.match}
          </div>
        )}

        {/* Action */}
        <div className="mt-3">
          {activity.type === "request" ? (
            <div className="flex flex-wrap gap-2">
              <button className="flex items-center gap-1.5 rounded-lg bg-zinc-950 px-3.5 py-2 text-[10px] font-semibold text-white transition hover:bg-zinc-800">
                <Check size={13} />
                Accept
              </button>

              <button className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-[10px] font-semibold text-zinc-500 transition hover:border-zinc-400 hover:text-zinc-950">
                <X size={13} />
                Decline
              </button>
            </div>
          ) : (
            <button className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 transition hover:text-zinc-950">
              {activity.action}
              <ChevronRight size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ================================================= */
/* ACTIVITY ICON */
/* ================================================= */

function ActivityIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    connection: <UserPlus size={11} />,
    request: <UserPlus size={11} />,
    match: <Sparkles size={11} />,
    profile: <Eye size={11} />,
    message: <MessageCircle size={11} />,
    "profile-update": <UserRound size={11} />,
    completion: <Check size={11} />,
  };

  return (
    <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-zinc-950 text-white">
      {icons[type]}
    </div>
  );
}