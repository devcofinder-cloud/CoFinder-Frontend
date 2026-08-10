"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
      return;
    }

    setChecking(false);
  }, [router]);

  if (checking) {
    return null;
  }

  return (
    <div className="">
      <Navbar />

      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>

      <Footer />
    </div>
  );
}