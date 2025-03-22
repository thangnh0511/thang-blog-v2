import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getPosts } from "@/lib/sanity"
import { PostCard } from "@/components/post-card"

interface HomePageProps {
  searchParams: URLSearchParams
}

export default async function Home({ searchParams }: { searchParams?: Record<string, string | string[] | undefined> }) {
  const locale = typeof searchParams?.locale === "string" ? searchParams.locale : "en"
  const posts = await getPosts(3)

  return (
    <div className="container py-12 md:py-20">
      <section className="space-y-6 pb-12 pt-6 md:pb-16 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            {locale === "en" ? "Welcome to My Sandbox" : "Chào mừng đến với chiếc Sandbox của Thắng"}
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {locale === "en"
              ? "Sharing thoughts, ideas, and experiences about technology, design, and life."
              : "Chiếc Sandbox nhỏ xinh của Thắng"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href={`/blog?locale=${locale}`}>{locale === "en" ? "Read Blog" : "Đọc bài viết"}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={`/about?locale=${locale}`}>{locale === "en" ? "About Me" : "Về tôi"}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight mb-8">
            {locale === "en" ? "Latest Posts" : "Bài viết mới nhất"}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post:any) => (
              <PostCard key={post._id} post={post} locale={locale} />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild variant="outline">
              <Link href={`/blog?locale=${locale}`}>{locale === "en" ? "View All Posts" : "Xem tất cả bài viết"}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
