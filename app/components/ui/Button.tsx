"use client";

import { Loader2 } from "lucide-react";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  loading,
  icon,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
    >
      {loading ? (
        <Loader2
          className="animate-spin"
          size={18}
        />
      ) : (
        <>
          {children}
          {icon}
        </>
      )}
    </button>
  );
}