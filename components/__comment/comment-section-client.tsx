"use client"

import { useState } from "react"
import { CommentForm } from "./comment-form"
import { CommentList } from "./comment-list"

interface Comment {
  _id: string
  name: string
  email?: string
  comment: string
  avatar: string
  createdAt: string
}

interface CommentsSectionClientProps {
  postId: string
  initialComments: Comment[]
  locale?: string
}

export function CommentsSectionClient({ postId, initialComments, locale = "en" }: CommentsSectionClientProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [isLoading, setIsLoading] = useState(false)

  // Function to fetch the latest comments
  const fetchComments = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/comments?postId=${postId}`)

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      if (data.comments) {
        setComments(data.comments)
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle comment submission - directly add the new comment to the state
  const handleCommentSubmitted = (newComment: Comment) => {
    console.log("New comment received:", newComment)
    // Add the new comment to the beginning of the comments array
    setComments((prevComments) => [newComment, ...prevComments])
  }

  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">{locale === "en" ? "Comments" : "Bình luận"}</h2>

      <CommentForm postId={postId} locale={locale} onCommentSubmitted={handleCommentSubmitted} />

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            {locale === "en"
              ? `${comments.length} Comment${comments.length !== 1 ? "s" : ""}`
              : `${comments.length} Bình luận`}
          </h3>

          {isLoading ? (
            <span className="text-sm text-muted-foreground">{locale === "en" ? "Refreshing..." : "Đang tải..."}</span>
          ) : (
            <button onClick={fetchComments} className="text-sm text-primary hover:underline">
              {locale === "en" ? "Refresh" : "Làm mới"}
            </button>
          )}
        </div>

        <CommentList comments={comments} locale={locale} />
      </div>
    </div>
  )
}

