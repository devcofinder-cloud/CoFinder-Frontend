import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/dashboard/",
          "/login",
          "/register",
        ],
      },
    ],
    sitemap: "https://cofinder.app/sitemap.xml",
    host: "https://cofinder.app",
  };
}