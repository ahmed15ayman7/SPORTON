// lib/sitemap3.ts

export async function sitemap3() {
  try {
    return [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/activity`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/search`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/new-post`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/store`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact-us`,
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
    ];
  } catch (error) {
    console.error("Error generating sitemap2:", error);
    return [];
  }
}
