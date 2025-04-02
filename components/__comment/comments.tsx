import { getComments } from "@/lib/sanity"
import { CommentForm } from "./comment-form"
import { CommentList } from "./comment-list"

interface CommentsProps {
  postId: string
  locale?: string
}

export async function Comments({ postId, locale = "en" }: CommentsProps) {
  const comments = await getComments(postId)

  return (
    <section className="mt-12 space-y-8">
      {/* <h2 className="text-2xl font-bold">{locale === "en" ? "Comments" : "Bình luận"}</h2> */}

      <CommentForm postId={postId} locale={locale} />

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">
          {locale === "en"
            ? `${comments.length} Comment${comments.length !== 1 ? "s" : ""}`
            : `${comments.length} Bình luận`}
        </h3>
        <CommentList comments={comments} locale={locale} />
      </div>
    </section>
  )
}

