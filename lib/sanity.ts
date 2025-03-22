import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
})

const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source).url()
}

// Update the getPosts function to handle bilingual content
export async function getPosts(limit?: number) {
  const query = `*[_type == "post"] | order(publishedAt desc) ${limit ? `[0...${limit}]` : ""} {
    _id,
    title_en,
    title_vi,
    "slug": slug.current,
    "mainImage": image.asset->url,
    _createdAt,
    createdDate,
    shortDescription_en,
    shortDescription_vi,
    "author": author->{
      name
    },
    "category": category->{
      title
    },
    postType
  }`

  return client.fetch(query)
}

// Update the getPost function to handle bilingual content
export async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title_en,
    title_vi,
    "slug": slug.current,
    "mainImage": image.asset->url,
    _createdAt,
    createdDate,
    content_en,
    content_vi,
    shortDescription_en,
    shortDescription_vi,
    "author": author->{
      name,
      "image": image.asset->url
    },
    "category": category->{
      title
    },
    postType
  }`

  return client.fetch(query, { slug })
}

