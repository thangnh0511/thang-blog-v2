import { getComments } from "@/lib/sanity"
import { CommentSection } from "./comment-section"

interface CommentSectionWrapperProps {
  postId: string
  locale?: string
}

export async function CommentSectionWrapper({ postId, locale = "en" }: CommentSectionWrapperProps) {
  // Fetch initial comments server-side
  const initialComments = await getComments(postId)

  return <CommentSection postId={postId} initialComments={initialComments} locale={locale} />
}

