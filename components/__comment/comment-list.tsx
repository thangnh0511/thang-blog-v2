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
        <div key={comment._id} className="p-4 border-b-2 border-slate-300">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-mono">{comment.name}</h4>
            <time className="text-sm font-mono text-muted-foreground">{formatDate(comment.createdAt)}</time>
          </div>
          <p className="text-sm font-mono whitespace-pre-line">{comment.comment}</p>
        </div>
      ))}
    </div>
  )
}

