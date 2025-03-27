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
export async function getPrivateNotes(limit?: number) {
  const query = `*[_type == "postPrivate"] | order(createdDate desc) {
    _id,
    title_en,
    title_vi,
    password,
    "slug": slug.current,
    "type": "note",
    "mainImage": image.asset->url,
    _createdAt,
    createdDate,
    shortDescription_en,
    shortDescription_vi,
    "author": author->{
      fullName,
      "avatar": avatar.asset->url
    },
    "category": category->{
      name
    },
    postType
  }`

  return client.fetch(query)
}


export async function getPrivateNoteItem(slug:any) {
  if (!slug) return null;

  const query = `*[_type == "postPrivate" && slug.current == $slug][0] {
    _id,
    title_en,
    title_vi,
    password,
    "slug": slug.current,
    "mainImage": image.asset->url, // Kiểm tra image có tồn tại
    _createdAt,
    createdDate,
    content_en,
    content_vi,
    shortDescription_en,
    shortDescription_vi,
    "author": author->{
      fullName,
      bio,
      "avatar": avatar.asset->url // Kiểm tra author có avatar không
    },
    "category": category->{
      name
    },
    postType
  }`

  try {
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Sanity Fetch Error:", error);
    return null;
  }
}



