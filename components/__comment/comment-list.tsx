import { formatDate } from "@/lib/utils"
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@heroui/react";


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
        <>
        <Card key={comment._id} className="max-w-full">
      <CardHeader className="flex gap-3">
        <Image
          alt="avata"
          height={40}
          radius="sm"
          src={comment.avatar}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{comment.name}</p>
          <p className="text-small text-default-500">{formatDate(comment.createdAt)}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{comment.comment}</p>
      </CardBody>
      {/* <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href="https://github.com/heroui-inc/heroui">
          Visit source code on GitHub.
        </Link>
      </CardFooter> */}
    </Card>
        

    {/* <div key={comment._id} className="rounded-lg p-4 border-b-2 border-slate-300">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-mono">{comment.name}</h4>
            <time className="text-sm font-mono text-muted-foreground">{formatDate(comment.createdAt)}</time>
          </div>
          <p className="text-sm font-mono whitespace-pre-line">{comment.comment}</p>
        </div> */}
        </>
        
      ))}
    </div>
  )
}

