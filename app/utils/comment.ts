"use server"

import { createClient } from "@sanity/client"

// Function to generate a random avatar URL
function getRandomAvatarUrl(): string {
  const baseUrl = "https://avatar.iran.liara.run/public/"
  const randomNumber = Math.floor(Math.random() * 100) + 1 // Generates a number from 1 to 100
  return `${baseUrl}${randomNumber}`
}

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
    const email = formData.get("email") as string | null
    const comment = formData.get("comment") as string
    const postId = formData.get("postId") as string

    if (!name || !comment || !postId) {
      return {
        success: false,
        message: "All fields are required",
      }
    }

    // Generate avatar URL
    const avatar = getRandomAvatarUrl()

    // Prepare the comment data
    const commentData = {
      _type: "comment",
      name,
      comment,
      post: {
        _type: "reference",
        _ref: postId,
      },
      createdAt: new Date().toISOString(),
      isApproved: true,
      avatar,
    }

    // Add email if provided
    // if (email) {
    //   commentData.email = email
    // }

    // Send the comment to Sanity
    const response = await client.create(commentData)

    if (response && response._id) {
      return {
        success: true,
        message: "Comment submitted successfully!",
        comment: {
          _id: response._id,
          name: commentData.name,
          comment: commentData.comment,
          avatar: commentData.avatar,
          createdAt: commentData.createdAt,
        },
      }
    } else {
      return {
        success: false,
        message: "Failed to create comment in Sanity.",
      }
    }
  } catch (error) {
    console.error("Error submitting comment:", error)

    return {
      success: false,
      message: "Error submitting comment. Please try again.",
    }
  }
}

