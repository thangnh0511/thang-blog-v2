"use client";

import type React from "react";
import { useState } from "react";
import { Form, Input, Textarea, Button, CardHeader } from "@heroui/react"; // Import Hero UI components
import { toast } from "react-hot-toast";
import { submitComment } from "@/app/utils/comment";
import { Card, CardBody } from "@heroui/react";
import { BsFillSendPlusFill } from "react-icons/bs";
import { IoChatboxEllipsesOutline } from "react-icons/io5";


interface CommentFormProps {
  postId: string;
  locale?: string;
  onCommentSubmitted?: () => void;
}

export function CommentForm({
  postId,
  locale = "en",
  onCommentSubmitted,
}: CommentFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    setFormSuccess(null);

    const formData = new FormData(event.currentTarget); // Extract form data
    formData.append("postId", postId);

    try {
      const result = await submitComment(formData);

      if (result.success) {
        toast.success(
          locale === "en"
            ? "Comment submitted successfully!"
            : "Bình luận đã được gửi thành công!",
          {
            position:
              window.innerWidth < 640 ? "bottom-center" : "bottom-right",
          }
        );

        event.currentTarget.reset(); // Reset form after submission

        if (onCommentSubmitted) {
          onCommentSubmitted(); // Trigger re-fetch of comments
        }
      } else {
        toast.error(result.message, {
          position: window.innerWidth < 640 ? "bottom-center" : "bottom-right",
        });
      }
    } catch (error) {
      toast.error(
        locale === "en"
          ? "An unexpected error occurred. Please try again."
          : "Đã xảy ra lỗi, vui lòng thử lại.",
        {
          position: window.innerWidth < 640 ? "bottom-center" : "bottom-right",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="w-full dark:border-2 dark:border-white">
      <CardHeader>
        <IoChatboxEllipsesOutline size='28' className='font-bold'/>
        <div className="text-xl ml-4 font-semibold">
          {locale === "en" ? "Leave a Comment" : "Để lại bình luận"}
        </div>

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
      </CardHeader>
      <CardBody>
        {/* Hero UI Form */}
        <Form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <Input
            id="name"
            name="name"
            label={locale === "en" ? "Name" : "Tên"}
            // placeholder={locale === "en" ? "Your name" : "Tên của bạn"}
            type="text"
            // variant="underlined"
            // labelPlacement="outside"
            variant="bordered"
            key='outside'
            isDisabled={isSubmitting}
            isRequired
          />

          {/* Email Input (Optional) */}
          {/* <Input
          id="email"
          name="email"
          label={locale === "en" ? "Email (Optional)" : "Email (Không bắt buộc)"}
          placeholder={locale === "en" ? "Your email" : "Email của bạn"}
          type="email"
          // variant="underlined"
          labelPlacement='outside'
          disabled={isSubmitting}
        /> */}

          {/* Comment Textarea */}
          <Textarea
            id="comment"
            name="comment"
            label={locale === "en" ? "Comment" : "Bình luận"}
            // placeholder={locale === "en" ? "Your comment" : "Nội dung bình luận"}
            // labelPlacement="outside"
            variant="bordered"
            isDisabled={isSubmitting}
            isRequired
          />

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full " startContent={<BsFillSendPlusFill />}>
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
  );
}
