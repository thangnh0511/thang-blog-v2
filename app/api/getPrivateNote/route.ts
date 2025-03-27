import { NextResponse } from "next/server"
import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: process.env.NODE_ENV === "production",
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")
  const password = searchParams.get("password")

  if (!slug || !password) {
    return NextResponse.json({ message: "Thiếu thông tin" }, { status: 400 })
  }

  const query = `*[_type == "postPrivate" && slug.current == $slug][0] {
    _id,
    title_en,
    title_vi,
    password,
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
    postType
  }`

  const post = await client.fetch(query, { slug })

  if (!post) {
    return NextResponse.json({ message: "Bài viết không tồn tại" }, { status: 404 })
  }

  if (post.password !== password) {
    return NextResponse.json({ message: "Mật khẩu không đúng" }, { status: 401 })
  }

  delete post.password // Xóa mật khẩu trước khi trả về client
  return NextResponse.json(post, { status: 200 })
}
