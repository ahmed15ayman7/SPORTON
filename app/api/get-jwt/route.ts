import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { userId, getToken } = getAuth(req);

  if (!userId) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  // استرداد JWT
  const token = await getToken({ template: "customToken" });

  if (!token) {
    return new Response(JSON.stringify({ error: "Failed to generate token" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ token }), { status: 200 });
}
