import { formatDate } from "@/lib/utils"
import { Card, CardHeader, CardBody, Divider, Image } from "@heroui/react"

interface Comment {
  _id: string
  name: string
  comment: string
  avatar: string
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
        <Card key={comment._id} className="max-w-full">
          <CardHeader className="flex gap-3">
            <Image alt="avatar" height={40} radius="sm" src={comment.avatar || "/placeholder.svg"} width={40} />
            <div className="flex flex-col">
              <p className="text-md">{comment.name}</p>
              <p className="text-small text-default-500">{formatDate(comment.createdAt)}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>{comment.comment}</p>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}

