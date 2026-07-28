"use client";

// import { Github } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

interface Props {
  provider: "google" | "github";
}

export default function SocialButton({
  provider,
}: Props) {
  return (
    <button
      className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900 py-3 text-white transition hover:bg-zinc-800"
    >
      {provider === "google" ? (
        <>
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="h-5 w-5"
            alt=""
          />
          Continue with Google
        </>
      ) : (
        <>
          <FaGithub size={20} />
          Continue with GitHub
        </>
      )}
    </button>
  );
}