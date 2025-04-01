import { getComments } from "@/lib/sanity"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const postId = searchParams.get("postId")

  if (!postId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 })
  }

  try {
    const comments = await getComments(postId)
    return NextResponse.json({ comments })
  } catch (error) {
    console.error("Error fetching comments:", error)
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 })
  }
}
