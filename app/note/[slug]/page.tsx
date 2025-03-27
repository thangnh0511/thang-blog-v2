import { getPrivateNoteItem } from "@/lib/sanity-getPrivateNote"
import { notFound } from "next/navigation"
import PostContent from "./post-content"

interface PostPageProps {
  params: { slug: string }
  searchParams: { locale?: string }
}

export async function generateMetadata({ params }: PostPageProps) {
  const post = await getPrivateNoteItem(params.slug)
  if (!post) return notFound()

  return {
    title: post.title_en,
    description: post.shortDescription_en || "Read this private post.",
    openGraph: {
      title: post.title_en,
      description: post.shortDescription_en || "Read this private post.",
      url: `https://thangnh.vercel.app/note/${post.slug}`,
      type: "article",
      images: [
        {
          url: post.mainImage || "https://thangnh.vercel.app/thangLogo.svg",
          width: 1200,
          height: 630,
          alt: post.title_en,
        },
      ],
    },
  }
}


export default async function PostPage({ params, searchParams }: PostPageProps) {
  const locale = searchParams.locale || "en"
  const post = await getPrivateNoteItem(params.slug)

  if (!post) notFound()

  return <PostContent post={post} locale={locale} />
}
