import { NextRequest, NextResponse } from "next/server";
import { deletePost } from "@/lib/actions/post.actions"; // Adjust the import path as needed

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const postId = params.id;

  try {
    // Parse request body or query parameters for additional details
    const { authorId, parentId, isComment, path } = await req.json();

    if (!authorId || !path) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Call the deletePost function
    const success = await deletePost(
      postId,
      authorId,
      parentId,
      isComment,
      path
    );

    if (success) {
      return NextResponse.json({ message: "Post deleted successfully" });
    } else {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
  } catch (error: any) {
    console.error("Error deleting post:", error.message);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
