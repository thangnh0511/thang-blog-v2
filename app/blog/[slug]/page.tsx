import { getPost } from "@/lib/sanity"
import { notFound } from "next/navigation"
import { PortableText } from "@/components/portable-text"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { IoMdTime } from "react-icons/io"
import MetadataModal from "@/components/metadata-modal"
import TravelRouteModal from "@/components/metadata-for-route"
import { Comments } from "@/components/__comment/comments"


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

  // For debugging - log the post data to see if location exists
  console.log("Post data:", {
    hasLocation: !!post.location,
    location: post.location,
    locationUrl: post.locationUrl,
  })

  const title = locale === "en" ? post.title_en : post.title_vi || post.title_en
  const content = locale === "en" ? post.content_en : post.content_vi || post.content_en
  const date = post.createdDate || post._createdAt

  // Force the TravelRouteModal to display for testing
  // by providing hardcoded values if post.location doesn't exist
  const locationData = {
    location: post.location || "Test Location",
    locationUrl: post.locationUrl || "#",
    travelRouteData: post.travelRoute?.routeData,
    metadata: post.metadata,
  }

  return (
    <article className="container py-12 max-w-3xl mx-auto gap-2">
      <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
      <div className="flex items-center gap-2 text-muted-foreground my-1">
        {/* Author and Date Information */}
        <div className="text-sm text-black my-1">
          <div className="flex text-black items-center space-x-4 rtl:space-x-reverse">
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.fullName}
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <div className="space-y-1 font-semibold dark:text-white">
              <div className="font-bold text-primary-black text-base font-mono">{post.author.fullName}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 flex flex-row content-center items-center">
                <IoMdTime className="text-sm mr-1" />
                <time dateTime={date} className="font-mono text-sm">
                  {formatDate(date)}
                </time>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Modal */}
      {post.metadata && <MetadataModal metadata={post.metadata} locale={locale} />}

      {/* Main Image */}
      {post.mainImage && (
        <div className="relative aspect-video my-1 overflow-hidden rounded-lg">
          <Image src={post.mainImage || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
        </div>
      )}

      {/* Post Content */}
      <div className="prose dark:prose-invert max-w-none">
        <PortableText value={content} />
      </div>


      {/* Add the Comments component */}
      <Comments postId={post._id} locale={locale} />


    </article>
  )
}

