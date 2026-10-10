
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About CoFinder – Our Mission & Community",
  description:
    "Learn about CoFinder, a platform connecting ambitious founders and builders to find co-founders, collaborate on startup ideas, and build meaningful products together.",

  alternates: {
    canonical: "https://cofinder.app/about",
  },

  openGraph: {
    title: "About CoFinder – Our Mission & Community",
    description:
      "Discover CoFinder's mission to connect founders, developers, and creators to build the next generation of startups together.",
    url: "https://cofinder.app/about",
    siteName: "CoFinder",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/img1.png",
        width: 900,
        height: 700,
        alt: "About CoFinder",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About CoFinder – Our Mission & Community",
    description:
      "Learn how CoFinder helps founders and builders find collaborators and bring startup ideas to life.",
    images: ["/images/img1.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
