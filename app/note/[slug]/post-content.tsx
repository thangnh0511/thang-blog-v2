"use client"

import { useState } from "react"
import { PortableText } from "@/components/portable-text"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

export default function PostContent({ post, locale }: { post: any; locale: string }) {
  const [password, setPassword] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState("")

  const title = locale === "en" ? post.title_en : post.title_vi || post.title_en
  const content = locale === "en" ? post.content_en : post.content_vi || post.content_en
  const date = post.createdDate || post._createdAt

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === post.password) {
      setIsAuthenticated(true)
      setError("")
    } else {
      setError("❌ Incorrect password. Please try again.")
    }
  }

  // Nếu chưa nhập đúng mật khẩu, hiển thị input nhập mật khẩu
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full bg-white border-2 border-orange-500 dark:bg-gray-900 dark:border-white p-6 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold text-center mb-4">Enter Password</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary"
              placeholder="Enter password..."
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-slate-800 text-white py-2 rounded-md hover:opacity-90">
              Unlock
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Nếu nhập đúng mật khẩu, hiển thị nội dung bài viết
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
        <time dateTime={date} className="text-sm">{formatDate(date)}</time>
        {post.author?.fullName && (
          <>
            <span>|</span>
            <div className="flex items-center gap-2">
              {post.author.avatar && (
                <Image
                  src={post.author.avatar}
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
