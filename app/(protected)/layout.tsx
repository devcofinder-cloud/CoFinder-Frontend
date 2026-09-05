"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "../components/Layout/Navbar";
import Footer from "./dashboard/Dashboard-Components/Footer";
import NotificationProvider from "../components/ui/NotificationProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/home");
      return;
    }

    setChecking(false);
  }, [router]);

  // Token check hone tak kuch render nahi hoga
  if (checking) {
    return null;
  }

  return (
    <div className="">
      {/* <Navbar /> */}

      <main className="">
        <NotificationProvider />
        {children}
      </main>

      <Footer />
    </div>
  );
}