import { NextResponse } from "next/server";
import { sitemap2 } from "@/lib/sitemap2"; // افترض أن هذه الدالة موجودة في مكتبة خاصة بك

export async function GET() {
  try {
    const sitemap = await sitemap2(); // الحصول على بيانات السايت ماب

    // توليد XML للسايت ماب
    const sitemapXML = generateXML(sitemap);

    // إرجاع السايت ماب مع تحديد نوع المحتوى بشكل صحيح
    return new Response(sitemapXML, {
      headers: {
        "Content-Type": "application/xml", // تحديد نوع المحتوى كـ XML
      },
    });
  } catch (error) {
    console.error("Error generating sitemap2:", error);
    return NextResponse.json("Error generating sitemap", { status: 500 });
  }
}

function generateXML(sitemap: any) {
  return `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${sitemap
          .map(
            (entry: any) => `
          <url>
            <loc>${entry.url}</loc>
            <lastmod>${entry.lastModified}</lastmod>
            <changefreq>${entry.changeFrequency || "weekly"}</changefreq>
            <priority>${entry.priority || 0.5}</priority>
             ${
               //entry.images
               //   ?.map(
               //     (img: string) =>
               //       img &&
               //       `
               //       <image:image>
               //         <image:loc>${img}</image:loc>
               //       </image:image>`
               //   )
               //   .join("")
               ""
             }
          </url>`
          )
          .join("")}
      </urlset>
    `;
}
