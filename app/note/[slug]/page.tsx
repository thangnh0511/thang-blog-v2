import { getPrivateNoteItem } from "@/lib/sanity-getPrivateNote"
import { notFound } from "next/navigation"
import PostContent from "./post-content"

interface PostPageProps {
  params: { slug: string }
  searchParams: { locale?: string }
}

export default async function PostPage({ params, searchParams }: PostPageProps) {
  const locale = searchParams.locale || "en"
  const post = await getPrivateNoteItem(params.slug)

  if (!post) notFound()

  return <PostContent post={post} locale={locale} />
}
