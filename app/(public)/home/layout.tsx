
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CoFinder – Find Your Co-Founder & Build Together",

  description:
    "Find your ideal co-founder, connect with ambitious founders and builders, discover startup collaborators, and turn your ideas into reality with CoFinder.",

  keywords: [
    "CoFinder",
    "find a co-founder",
    "startup co-founder platform",
    "startup collaboration",
    "find startup partners",
    "founders community",
    "connect with developers",
    "technical co-founder",
    "startup networking",
    "builders community",
  ],

  alternates: {
    canonical: "https://cofinder.app/",
  },

  openGraph: {
    title: "CoFinder – Find Your Co-Founder & Build Together",
    description:
      "Connect with ambitious founders and builders, discover collaborators, and build meaningful projects together.",
    url: "https://cofinder.app/",
    siteName: "CoFinder",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/img1.png",
        width: 900,
        height: 700,
        alt: "CoFinder – Connect, Collaborate, Build",
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
    },
  },
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
