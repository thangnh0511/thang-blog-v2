import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

interface Post {
  _id: string
  title_en: string
  title_vi?: string
  slug: string
  mainImage?: string
  _createdAt: string
  createdDate?: string
  shortDescription_en?: string
  shortDescription_vi?: string
  author?: {
    name: string
  }
  category?: {
    title: string
  }
  postType?: string[]
}

interface PostCardProps {
  post: Post
  locale?: string
}

export function PostCard({ post, locale = "en" }: PostCardProps) {
  const title = locale === "en" ? post.title_en : post.title_vi || post.title_en
  const description = locale === "en" ? post.shortDescription_en : post.shortDescription_vi || post.shortDescription_en
  const date = post.createdDate || post._createdAt

  return (
    <Card className="overflow-hidden">
      <Link href={`/blog/${post.slug}`}>
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.mainImage || "/placeholder.svg?height=400&width=600"}
            alt={title}
            fill
            className="object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader className="p-4 pb-2">
        <Link href={`/blog/${post.slug}`} className="hover:underline">
          <h3 className="text-xl font-bold line-clamp-2">{title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        {description && <p className="text-muted-foreground line-clamp-2">{description}</p>}
      </CardContent>
      <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <time dateTime={date}>{formatDate(date)}</time>
          {post.author && (
            <>
              <span>•</span>
              <span>{post.author.name}</span>
            </>
          )}
          {post.category && (
            <>
              <span>•</span>
              <span>{post.category.title}</span>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

