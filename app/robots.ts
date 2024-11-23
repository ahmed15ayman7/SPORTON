import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // allow: "/",
      },
    ],
    sitemap: "https://sporton.website/sitemap.xml",
    host: "https://sporton.website",
  };
}
