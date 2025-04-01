import { formatDate } from "@/lib/utils"

interface Comment {
  _id: string
  name: string
  comment: string
  createdAt: string
}

interface CommentListProps {
  comments: Comment[]
  locale?: string
}

export function CommentList({ comments, locale = "en" }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {locale === "en"
          ? "No comments yet. Be the first to comment!"
          : "Chưa có bình luận nào. Hãy là người đầu tiên bình luận!"}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <div key={comment._id} className="bg-card rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">{comment.name}</h4>
            <time className="text-sm text-muted-foreground">{formatDate(comment.createdAt)}</time>
          </div>
          <p className="text-sm whitespace-pre-line">{comment.comment}</p>
        </div>
      ))}
    </div>
  )
}

