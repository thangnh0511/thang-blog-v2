import { getPosts } from "@/lib/sanity"
import { PostCard } from "@/components/post-card"

interface BlogPageProps {
  searchParams: {
    locale?: string
  }
}

function counting(arr: any) {
  let objects = []
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "object") objects.push(arr[i])
  }
  return objects.length
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const locale = searchParams.locale || "en"
  const posts = await getPosts()
  const amountPosts = counting(posts)

  return (
    <div className="container py-12">
      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          {locale === "en" ? "Posts" : "Bài viết"}
        </h1>
        <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-white dark:text-black">
          {amountPosts}
        </span>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <PostCard key={post._id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  )
}
