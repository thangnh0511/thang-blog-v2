"use client"

import type React from "react"
import { useState } from "react"
import { Form, Input, Textarea, Button, CardHeader } from "@heroui/react"
import { toast } from "react-hot-toast"
import { submitComment } from "@/app/utils/comment"
import { Card, CardBody } from "@heroui/react"
import { BsFillSendPlusFill } from "react-icons/bs"
import { IoChatboxEllipsesOutline } from "react-icons/io5"

interface CommentFormProps {
  postId: string
  locale?: string
  onCommentSubmitted?: (newComment: any) => void
}

export function CommentForm({ postId, locale = "en", onCommentSubmitted }: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Prevent multiple submissions
    if (isSubmitting) return

    setIsSubmitting(true)

    // Clear any existing toasts to prevent duplicates
    toast.dismiss()

    const formData = new FormData(event.currentTarget)
    formData.append("postId", postId)

    try {
      const result = await submitComment(formData)

      if (result.success) {
        // Show success toast
        toast.success(locale === "en" ? "Comment submitted successfully!" : "Bình luận đã được gửi thành công!", {
          position: window.innerWidth < 640 ? "bottom-center" : "bottom-right",
          duration: 3000,
        })

        // Reset the form
        event.currentTarget.reset()

        // Create a temporary comment object to add to the UI immediately
        const tempComment = {
          _id: result.comment?._id || `temp-${Date.now()}`,
          name: formData.get("name") as string,
          comment: formData.get("comment") as string,
          avatar: result.comment?.avatar || "/placeholder.svg",
          createdAt: new Date().toISOString(),
        }

        // Update the UI with the new comment
        if (onCommentSubmitted) {
          onCommentSubmitted(tempComment)
        }
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
    <Card className="w-full dark:border-2 dark:border-white">
      <CardHeader>
        <IoChatboxEllipsesOutline size="28" className="font-bold" />
        <div className="text-xl ml-4 font-semibold">{locale === "en" ? "Leave a Comment" : "Để lại bình luận"}</div>
      </CardHeader>
      <CardBody>
        <Form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            name="name"
            label={locale === "en" ? "Name" : "Tên"}
            type="text"
            variant="bordered"
            key="outside"
            isDisabled={isSubmitting}
            isRequired
          />

          <Textarea
            id="comment"
            name="comment"
            label={locale === "en" ? "Comment" : "Bình luận"}
            variant="bordered"
            isDisabled={isSubmitting}
            isRequired
          />

          <Button type="submit" disabled={isSubmitting} className="w-full" startContent={<BsFillSendPlusFill />}>
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
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
  )
}

