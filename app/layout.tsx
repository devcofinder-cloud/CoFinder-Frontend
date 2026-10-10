
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://cofinder.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "CoFinder – Find Your Co-Founder & Build Together",
    template: "%s | CoFinder",
  },

  description:
    "Find the right co-founder, connect with ambitious builders, discover collaborators, and turn your startup ideas into reality with CoFinder.",

  applicationName: "CoFinder",

  keywords: [
    "CoFinder",
    "co-founder platform",
    "find a co-founder",
    "startup co-founder",
    "find startup partners",
    "startup collaboration",
    "founders community",
    "connect with developers",
    "find technical co-founder",
    "startup networking",
    "builders community",
    "startup team building",
    "startups",
    "start ups ",
    "jobs",
    "hirings",
    "new job vacancies"
  ],

  authors: [{ name: "CoFinder", url: siteUrl }],
  creator: "CoFinder",
  publisher: "CoFinder",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "CoFinder",
    title: "CoFinder – Find Your Co-Founder & Build Together",
    description:
      "Connect with ambitious founders and builders, find collaborators, and build meaningful projects together.",
    locale: "en_IN",
    images: [
      {
        url: "/images/img1.png",
        width: 900,
        height: 700,
        alt: "CoFinder – Find Your Co-Founder",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CoFinder – Find Your Co-Founder & Build Together",
    description:
      "Meet ambitious founders, find collaborators, and turn your startup ideas into reality.",
    images: ["/images/img1.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },

  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full w-full">
        <main className="flex-1 w-full">{children}</main>
      </body>
    </html>
  );
}
