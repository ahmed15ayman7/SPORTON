// lib/sitemap2.ts
import { fetchPostsSiteMap } from "@/lib/actions/post.actions";
import { fetchUsers } from "@/lib/actions/user.actions";

export async function sitemap2() {
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

    const postEntries = posts.map((post: any) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${post._id}`,
      lastModified: new Date(post.updatedAt || post.createdAt).toISOString(),
      changeFrequency: "weekly",
      images: [post?.image],
      priority: 0.5,
    }));

    const userEntries = users.map((user: any) => ({
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile/${user._id}`,
      lastModified: new Date(user.updatedAt || user.createdAt).toISOString(),
      changeFrequency: "weekly",
      images: [user?.image],
      priority: 0.5,
    }));

    return [
      ...postEntries,
      ...userEntries,
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
