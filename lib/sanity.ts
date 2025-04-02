import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
  token: process.env.SANITY_API_TOKEN, // Only needed for comment submission
})

const builder = imageUrlBuilder(client)

export function urlForImage(source: any) {
  return builder.image(source).url()
}

// Update the getPosts function to handle bilingual content
export async function getPosts(limit?: number) {
  const query = `*[_type == "post"] | order(createdDate desc) ${limit ? `[0...${limit}]` : ""} {
    _id,
    title_en,
    title_vi,
    "slug": slug.current,
    "type": "blog",
    "mainImage": image.asset->url,
    _createdAt,
    createdDate,
    shortDescription_en,
    shortDescription_vi,
    "author": author->{
      fullName,
      "avatar": avatar.asset -> url
    },
    "category": category->{
      name
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
      fullName,
      bio,
      "avatar": avatar.asset->url
    },
    "category": category->{
      name
    },
    postType,
    "metadata": metadata->{
      meta_title_en,
      meta_title_vi,
      type,
      cover_image,
      metadata_en,
      metadata_vi,
      gallery_metadata
    }
  }`

  return client.fetch(query, { slug })
}



// Add a function to get approved comments for a post
export async function getComments(postId: string) {
  const query = `*[_type == "comment" && post._ref == $postId && isApproved == true] | order(createdAt desc) {
    _id,
    name,
    comment,
    avatar,
    createdAt
  }`

  return client.fetch(query, { postId })
}

// Add function to submit a comment
export async function submitComment(data: {
  name: string
  // email: string
  comment: string
  postId: string
}) {
  try {
    return await client.create({
      _type: "comment",
      name: data.name,
      // email: data.email,
      comment: data.comment,
      post: {
        _type: "reference",
        _ref: data.postId,
      },
      createdAt: new Date().toISOString(),
      isApproved: true, // Set to true by default so comments appear immediately
    })
  } catch (error) {
    console.error("Error submitting comment:", error)
    throw new Error("Could not submit comment")
  }
}

