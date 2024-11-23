import { MetadataRoute } from "next";
import { fetchPostsSiteMap } from "@/lib/actions/post.actions";
import { fetchUsers } from "@/lib/actions/user.actions";
type Sitemap = Array<{
  url: string;
  images: string[];
  lastModified?: string | Date;
  changeFrequency?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}>;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts = await fetchPostsSiteMap();
    const users = await fetchUsers();

    if (!Array.isArray(posts)) {
      console.error("Posts data is not an array:", posts);
      return [];
    }

    if (!Array.isArray(users)) {
      console.error("Users data is not an array:", users);
      return [];
    }

    const postEntries: Sitemap = posts.map((post: any) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${post._id}`,
      lastModified: post.updatedAt || post.createdAt,
      changeFrequency: "weekly",
      images: [post?.image],
      priority: 0.5,
    }));

    const userEntries: Sitemap = users.map((user: any) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile/${user._id}`,
      lastModified: user.updatedAt || user.createdAt,
      changeFrequency: "weekly",
      images: [user?.image],
      priority: 0.5,
    }));

    return [
      ...postEntries,
      ...userEntries,
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/activity`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/search`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/new-post`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/store`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact-us`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.5,
      },
      //   {
      //   url: `${process.env.NEXT_PUBLIC_SITE_URL}/messaging`,
      //   lastModified: new Date(),
      // },
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [];
  }
}
