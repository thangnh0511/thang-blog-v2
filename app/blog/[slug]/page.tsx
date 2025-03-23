import { getPost } from "@/lib/sanity"
import { notFound } from "next/navigation"
import { PortableText } from "@/components/portable-text"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

interface PostPageProps {
  params: {
    slug: string
  }
  searchParams: {
    locale?: string
  }
}

export default async function PostPage({ params, searchParams }: PostPageProps) {
  const locale = searchParams.locale || "en"
  const post = await getPost(params.slug)

  if (!post) {
    notFound()
  }

  const title = locale === "en" ? post.title_en : post.title_vi || post.title_en
  const content = locale === "en" ? post.content_en : post.content_vi || post.content_en
  const date = post.createdDate || post._createdAt

  return (
    <article className="container py-12 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
      <div className="flex items-center gap-2 text-muted-foreground mb-8">
      {post.category.name && (
            <>
              <span className=''>{post.category.name}</span>
              <span>|</span>
            </>
          )}
        <time dateTime={date}>{formatDate(date)}</time>
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
                <span>{post.author.fullName}</span>
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

