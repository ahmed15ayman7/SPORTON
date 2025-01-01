import { updateUser } from "@/lib/actions/user.actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      userId,
      email,
      username,
      sport,
      name,
      bio,
      image,
      path,
      type,
      phone,
    } = await req.json();

    await updateUser({
      userId,
      email,
      username,
      sport,
      name,
      bio,
      image,
      path,
      type,
      phone,
    });

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update user", message: error.message },
      { status: 500 }
    );
  }
}
