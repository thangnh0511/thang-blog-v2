"use client"

import type React from "react"

import { useState } from "react"
import { submitComment } from "@/app/utils/comment"
import { toast } from "react-hot-toast"  // Import toast
import {Textarea} from "@heroui/react";
import {Input} from "@heroui/react";



interface CommentFormProps {
  postId: string
  locale?: string
  onCommentSubmitted?: () => void
}

export function CommentForm({ postId, locale = "en" , onCommentSubmitted}: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [formSuccess, setFormSuccess] = useState<string | null>(null)


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)
    setFormSuccess(null)
  
    const formData = new FormData(e.currentTarget)
    formData.append("postId", postId)
  
    try {
      const result = await submitComment(formData)
  
      if (result.success) {
        toast.success(locale === "en" ? "Comment submitted successfully!" : "Bình luận đã được gửi thành công!", {
          position: window.innerWidth < 640 ? "bottom-center" : "bottom-right",
        })
  
        // setFormSuccess(locale === "en"
        //   ? "Comment submitted successfully! It will appear shortly."
        //   : "Bình luận đã được gửi thành công! Nó sẽ xuất hiện trong thời gian ngắn."
        // )
        e.currentTarget.reset()
      } else {
        toast.error(result.message, {
          position: window.innerWidth < 640 ? "bottom-center" : "bottom-right",
        })
        // setFormError(result.message)
      }
    } catch (error) {
      toast.error(locale === "en" ? "An unexpected error occurred. Please try again." : "Đã xảy ra lỗi, vui lòng thử lại.", {
        position: window.innerWidth < 640 ? "bottom-center" : "bottom-right",
      })
      // setFormError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }
  

  return (
    <div className="w-full border rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">{locale === "en" ? "Leave a Comment" : "Để lại bình luận"}</h3>

      {formSuccess && (
        <div className="bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 p-4 rounded-lg mb-4">
          {formSuccess}
        </div>
      )}

      {formError && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg mb-4">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1">
          {/* <Input label={locale === "en" ? "Name" : "Tên"} type="text" variant="underlined" /> */}
          <Input id="name" name='name' label={locale === "en" ? "Name" : "Tên"} placeholder={locale === "en" ? "Your name" : "Tên của bạn"} type="text" variant="underlined" disabled={isSubmitting}/>
          {/* <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              {locale === "en" ? "Name" : "Tên"}
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={locale === "en" ? "Your name" : "Tên của bạn"}
              disabled={isSubmitting}
            />
          </div> */}

          {/* <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              {locale === "en" ? "Email" : "Email"}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={locale === "en" ? "Your email" : "Email của bạn"}
              disabled={isSubmitting}
            />
          </div> */}
        </div>

        <div className="space-y-2">
          <Textarea
            key="comment"
            name='comment'
            id="comment"
            className="col-span-12 md:col-span-6 mb-6 md:mb-0"
            label={locale === "en" ? "Comment" : "Bình luận"}
            labelPlacement="outside"
            placeholder={locale === "en" ? "Your comment" : "Nội dung bình luận"}
            variant="underlined"
            disabled={isSubmitting}
          />
          {/* <label htmlFor="comment" className="text-sm font-medium">
            {locale === "en" ? "Comment" : "Bình luận"}
          </label>
          <textarea
            id="comment"
            name="comment"
            rows={4}
            required
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder={locale === "en" ? "Your comment" : "Nội dung bình luận"}
            disabled={isSubmitting}
          /> */}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            "Submit Comment"
          ) : (
            "Gửi bình luận"
          )}
        </button>
      </form>
    </div>
  )
}

