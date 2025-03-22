import { getPosts } from "@/lib/sanity"
import { PostCard } from "@/components/post-card"

interface BlogPageProps {
  searchParams: {
    locale?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const locale = searchParams.locale || "en"
  const posts = await getPosts()

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold tracking-tight mb-8">{locale === "en" ? "Blog" : "Bài viết"}</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post:any) => (
          <PostCard key={post._id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  )
}

