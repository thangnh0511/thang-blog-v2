import { getPost } from "@/lib/sanity"
import { notFound } from "next/navigation"
import { PortableText } from "@/components/portable-text"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { IoMdTime } from "react-icons/io";



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
      {/* Check */}
      <div className="text-sm text-black mb-6">
                <div className="flex text-black items-center space-x-4 rtl:space-x-reverse">
                  <Image
                    src={post.author.avatar}
                    alt={post.author.fullName}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                  <div className="space-y-1 font-semibold dark:text-white">
                    <div className="font-bold text-primary-black text-base font-mono">
                      {post.author.fullName}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-row content-center items-center">
                      <IoMdTime className="text-sm mr-1" />
                      <time dateTime={date} className='font-mono text-sm'>{formatDate(date)}</time>
                    </div>
                  </div>
                </div>
              </div>
      {/* End Check */}
      {/* {post.category.name && (
            <>
              <span className='font-mono'>{post.category.name}</span>
              <span>|</span>
            </>
          )}
        <time dateTime={date} className='font-mono'>{formatDate(date)}</time> */}
        {/* {post.author?.fullName && (
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
                <span className='font-mono'>{post.author.fullName}</span>
              </div>
            </>
          )} */}
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

