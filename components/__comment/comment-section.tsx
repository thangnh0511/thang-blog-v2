import { getComments } from "@/lib/sanity"
import { CommentsSectionClient } from "./comments-section-client"

interface CommentsSectionProps {
  postId: string
  locale?: string
}

export async function CommentsSection({ postId, locale = "en" }: CommentsSectionProps) {
  // Fetch initial comments server-side
  const initialComments = await getComments(postId)

  return <CommentsSectionClient postId={postId} initialComments={initialComments} locale={locale} />
}

