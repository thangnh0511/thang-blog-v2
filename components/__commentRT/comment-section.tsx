"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardHeader, CardBody, Divider, Image, Form, Input, Textarea, Button } from "@heroui/react"
import { toast } from "react-hot-toast"
import { IoChatboxEllipsesOutline } from "react-icons/io5"
import { BsFillSendPlusFill } from "react-icons/bs"
import { formatDate } from "@/lib/utils"
import { submitComment } from "@/app/utils/comment" // Import the server action

interface Comment {
  _id: string
  name: string
  email?: string
  comment: string
  avatar: string
  createdAt: string
}

interface CommentSectionProps {
  postId: string
  initialComments: Comment[]
  locale?: string
}

export function CommentSection({ postId, initialComments, locale = "en" }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");



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

  // Function to check if both inputs are filled
  const isFormFilled = name.trim() !== "" && comment.trim() !== "";
  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "comment") setComment(value);
  };


  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setIsSubmitting(true)

    // Clear any existing toasts to prevent duplicates
    toast.dismiss()

    const formData = new FormData(event.currentTarget)
    formData.append("postId", postId)

    try {
      // Get the values before submitting
      const name = formData.get("name") as string
      const commentText = formData.get("comment") as string

      // Use the submitComment server action
      const result = await submitComment(formData)

      console.log("Submit result:", result) // Debug log

      setName('')
      setComment('')

      if (result.success) {
        // Show success toast
        toast.success(locale === "en" ? "Comment submitted successfully!" : "Bình luận đã được gửi thành công!", {
          position: window.innerWidth < 640 ? "bottom-center" : "bottom-right",
          duration: 3000,
        })

        // Reset the form
        if (formRef.current) {
          formRef.current.reset()
        }

        // Create a new comment object with the returned data or fallback to form data
        const newComment = {
          _id: result.comment?._id || `temp-${Date.now()}`,
          name: name,
          comment: commentText,
          avatar: result.comment?.avatar || "/placeholder.svg",
          createdAt: new Date().toISOString(),
        }

        // Add the new comment to the beginning of the comments array
        setComments((prevComments) => [newComment, ...prevComments])

        // Fetch the latest comments from the server
        setTimeout(() => {
          fetchComments()
        }, 500) // Small delay to ensure the server has processed the comment
      } else {
        // Show error toast
        toast.error(result.message || "Error submitting comment", {
          position: window.innerWidth < 640 ? "bottom-center" : "bottom-right",
          duration: 3000,
        })
      }
    } catch (error) {
      console.error("Error submitting comment:", error)

      // Show error toast
      toast.error(
        locale === "en" ? "An unexpected error occurred. Please try again." : "Đã xảy ra lỗi, vui lòng thử lại.",
        {
          position: window.innerWidth < 640 ? "bottom-center" : "bottom-right",
          duration: 3000,
        },
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-12 pt-8 border-t space-y-8">
      {/* <h2 className="text-2xl font-bold">{locale === "en" ? "Comments" : "Bình luận"}</h2> */}

      {/* Comment Form */}
      <Card className="w-full dark:border-2 dark:border-white">
        <CardHeader>
          <IoChatboxEllipsesOutline size="28" className="font-bold" />
          <div className="text-xl ml-4 font-semibold">{locale === "en" ? "Leave a Comment" : "Để lại bình luận"}</div>
        </CardHeader>
        <CardBody>
          <Form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="name"
              name="name"
              label={locale === "en" ? "Name" : "Tên"}
              type="text"
              variant="bordered"
              key="outside"
              isDisabled={isSubmitting}
              value={name}
              onChange={handleInputChange}
              isRequired
            />

            <Textarea
              id="comment"
              name="comment"
              label={locale === "en" ? "Comment" : "Bình luận"}
              variant="bordered"
              isDisabled={isSubmitting}
              value={comment}
              onChange={handleInputChange}
              isRequired
            />

            <Button type="submit" disabled={isSubmitting} 
                     color={isFormFilled ? "success" : "default"}
                    className="w-full" startContent={<BsFillSendPlusFill />}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {locale === "en" ? "Submitting..." : "Đang gửi..."}
                </span>
              ) : locale === "en" ? (
                "Send Comment"
              ) : (
                "Gửi bình luận"
              )}
            </Button>
          </Form>
        </CardBody>
      </Card>

      {/* Comments List */}
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

        {/* Comment List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {locale === "en"
                ? "No comments yet. Be the first to comment!"
                : "Chưa có bình luận nào. Hãy là người đầu tiên bình luận!"}
            </div>
          ) : (
            comments.map((comment) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  )
}

