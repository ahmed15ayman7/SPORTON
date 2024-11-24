import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

// export async function middleware(req: NextRequest) {
//   const { userId, getToken } = getAuth(req);

//   if (!userId) {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   const token = getToken({ template: "userAuth" });

//   if (!token) {
//     return NextResponse.redirect(new URL("/sign-in", req.url));
//   }

//   console.log("Generated JWT:", token);

//   return NextResponse.next();
// }
export default clerkMiddleware();
export const config = {
  matcher: [
    "/",
    "/messaging/:path*",
    "/about/:path*",
    "/activity/:path*",
    "/boosting/:path*",
    "/contact-us/:path*",
    "/new-post/:path*",
    "/payment/:path*",
    "/post/:path*",
    "/profile/:path*",
    "/search/:path*",
    "/settings/:path*",
    "/store/:path*",
  ],
};
