"use server"

import { createClient } from "@sanity/client"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to your environment variables
  useCdn: false,
})

export async function submitComment(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const comment = formData.get("comment") as string
    const postId = formData.get("postId") as string

    if (!name || !email || !comment || !postId) {
      return {
        success: false,
        message: "All fields are required",
      }
    }

    // Create the comment document in Sanity
    await client.create({
      _type: "comment",
      name,
      email,
      comment,
      post: {
        _type: "reference",
        _ref: postId,
      },
      createdAt: new Date().toISOString(),
      isApproved: true, // Set to false by default, requiring approval
    })

    return {
      success: true,
      message: "Comment submitted successfully! It will appear after approval.",
    }
  } catch (error) {
    console.error("Error submitting comment:", error)
    return {
      success: false,
      message: "Error submitting comment. Please try again.",
    }
  }
}

