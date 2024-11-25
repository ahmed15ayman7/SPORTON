import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// export const config = {
//   matcher: [
//     "/",
//     "/messaging/:path*",
//     "/about/:path*",
//     "/activity/:path*",
//     "/boosting/:path*",
//     "/contact-us/:path*",
//     "/new-post/:path*",
//     "/payment/:path*",
//     "/post/:path*",
//     "/profile/:path*",
//     "/search/:path*",
//     "/settings/:path*",
//     "/store/:path*",
//   ],
// };
