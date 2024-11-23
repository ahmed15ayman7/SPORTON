// app/api/sitemap2/route.ts
import { NextResponse } from "next/server";
import { sitemap2 } from "@/lib/sitemap2"; // Assuming this function is defined in your lib

export async function GET() {
  try {
    const sitemap = await sitemap2(); // Fetch your sitemap data

    // Generate XML for the sitemap
    const sitemapXML = generateXML(sitemap);

    // Return the sitemap XML response
    return NextResponse.json(sitemapXML, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap2:", error);
    return NextResponse.json("Error generating sitemap", { status: 500 });
  }
}

// Helper function to generate the sitemap XML
function generateXML(sitemap: any) {
  return `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemap
        .map(
          (entry: any) => `
        <url>
          <loc>${entry.url}</loc>
          <lastmod>${entry.lastModified}</lastmod>
          <changefreq>${entry.changeFrequency || "weekly"}</changefreq>
          <priority>${entry.priority || 0.5}</priority>
          ${entry.images
            .map(
              (img: string) =>
                `<image:image><image:loc>${img}</image:loc></image:image>`
            )
            .join("")}
        </url>`
        )
        .join("")}
    </urlset>
  `;
}
