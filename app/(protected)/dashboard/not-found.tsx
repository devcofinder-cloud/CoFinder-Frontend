import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-2xl text-center">

        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-black" />
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em]">
              Co-Finder
            </span>
          </div>
        </div>

        <h1 className="text-[120px] md:text-[160px] font-black leading-none tracking-[-0.08em] text-black">
          404
        </h1>

        <div className="mt-8 border-t border-zinc-200 pt-8">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400">
            Page Not Found
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            This page doesn't exist.
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-zinc-500">
            The page you're looking for may have been moved,
            deleted, or doesn't exist anymore.
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-flex items-center rounded-xl bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            ← Back to Dashboard
          </Link>
        </div>

      </div>
    </main>
  );
}