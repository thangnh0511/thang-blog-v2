"use client"

import type React from "react"

import { useState } from "react"
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

  const title = locale === "en" ? post.title_en : post.title_vi || post.title_en
  const content = locale === "en" ? post.content_en : post.content_vi || post.content_en
  const date = post.createdDate || post._createdAt

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate a slight delay for better UX
    setTimeout(() => {
      if (password === post.password) {
        setIsAuthenticated(true)
        setError("")
      } else {
        setError(
          locale === "en" ? "❌ Incorrect password. Please try again." : "❌ Mật khẩu không đúng. Vui lòng thử lại.",
        )
      }
      setIsLoading(false)
    }, 500)
  }

  // If not authenticated, show password input form
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 px-4">
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
            <form onSubmit={handleSubmit} className="space-y-4">
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
                autoFocus
              />
            </form>
          </CardBody>
          <CardFooter>
            <Button
              color="primary"
              className="w-full"
              onClick={handleSubmit}
              isLoading={isLoading}
              startContent={!isLoading && <LockFilledIcon />}
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

