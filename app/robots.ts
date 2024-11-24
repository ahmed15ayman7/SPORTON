import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // allow: "/",
        disallow: ["/sitmap_index.xml", "/api/sitemap2", "/api/sitemap3"],
      },
    ],
    sitemap: [
      "https://www.sporton.website/api/sitemap2",
      "https://www.sporton.website/api/sitemap3",
      "https://www.sporton.website/sitemap.xml",
      "https://www.sporton.website/sitmap_index.xml",
    ],
  };
}
