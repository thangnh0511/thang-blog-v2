"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { PortableText } from "@/components/portable-text"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Card, CardHeader, CardBody, CardFooter, Input, Button, Divider } from "@heroui/react"
import { LockFilledIcon } from "@heroui/shared-icons"

export default function PostContent({ post, locale }: { post: any; locale: string }) {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Check if we're in a browser environment
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const title = locale === "en" ? post.title_en : post.title_vi || post.title_en
  const content = locale === "en" ? post.content_en : post.content_vi || post.content_en
  const date = post.createdDate || post._createdAt

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitPassword()
  }

  // Separate function for button click
  const handleButtonClick = () => {
    submitPassword()
  }

  // Common password submission logic
  const submitPassword = () => {
    if (isLoading) return // Prevent multiple submissions

    setIsLoading(true)
    console.log("Password submission attempted:", password) // Debug log

    // Simulate a slight delay for better UX
    setTimeout(() => {
      if (password === post.password) {
        setIsAuthenticated(true)
        setError("")
        console.log("Authentication successful") // Debug log
      } else {
        setError(
          locale === "en" ? "❌ Incorrect password. Please try again." : "❌ Mật khẩu không đúng. Vui lòng thử lại.",
        )
        console.log("Authentication failed") // Debug log
      }
      setIsLoading(false)
    }, 500)
  }

  // If not authenticated, show password input form
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 px-4 py-8">
        <Card className="max-w-md w-full">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-lg font-semibold">{locale === "en" ? "Protected Content" : "Nội dung được bảo vệ"}</p>
              <p className="text-small text-default-500">
                {locale === "en" ? "Enter the password to view this content" : "Nhập mật khẩu để xem nội dung này"}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <form onSubmit={handleSubmit} id="password-form" className="space-y-4">
              <Input
                type="password"
                label={locale === "en" ? "Password" : "Mật khẩu"}
                placeholder={locale === "en" ? "Enter password..." : "Nhập mật khẩu..."}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                startContent={
                  <LockFilledIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isInvalid={!!error}
                errorMessage={error}
                autoFocus={isBrowser}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    submitPassword()
                  }
                }}
              />
            </form>
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              form="password-form"
              color="primary"
              className="w-full touch-manipulation"
              onClick={handleButtonClick}
              isLoading={isLoading}
              startContent={!isLoading && <LockFilledIcon />}
              style={{ touchAction: "manipulation" }}
            >
              {locale === "en" ? "Unlock" : "Mở khóa"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // If authenticated, show post content
  return (
    <article className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
      <div className="flex items-center gap-2 text-muted-foreground mb-8">
        {post.category?.name && (
          <>
            <span className="text-sm">{post.category.name}</span>
            <span>|</span>
          </>
        )}
        <time dateTime={date} className="text-sm">
          {formatDate(date)}
        </time>
        {post.author?.fullName && (
          <>
            <span>|</span>
            <div className="flex items-center gap-2">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar || "/placeholder.svg"}
                  alt={post.author.fullName}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
              )}
              <span className="text-sm">{post.author.fullName}</span>
            </div>
          </>
        )}
      </div>

      {post.mainImage && (
        <div className="relative aspect-video mb-8 overflow-hidden rounded-lg">
          <Image src={post.mainImage || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none">
        <PortableText value={content} />
      </div>

    </article>
  )
}

