// components/post-metadata.ts
import { Metadata } from "next"

interface PostMetadataProps {
  title: string
  description: string
  imageUrl: string
  postUrl: string
  author: string
  date: string
}

export default function createPostMetadata({
  title,
  description,
  imageUrl,
  postUrl,
  author,
  date,
}: PostMetadataProps): Metadata {
  return {
    title,
    description,
    authors: [{ name: author }],
    openGraph: {
      type: "article",
      url: postUrl,
      title,
      description,
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    metadataBase: new URL("https://thangnh.vercel.app"),
    alternates: {
      canonical: postUrl,
    },
    other: {
      publish_date: date,
    },
  }
}
