"use server";

import { createClient } from "@sanity/client";

// Function to generate a random avatar URL
function getRandomAvatarUrl(): string {
  const baseUrl = "https://avatar.iran.liara.run/public/";
  const randomNumber = Math.floor(Math.random() * 100) + 1; // Generates a number from 1 to 100
  return `${baseUrl}${randomNumber}`;
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  token: process.env.SANITY_API_TOKEN, // You'll need to add this to your environment variables
  useCdn: false,
});

export async function submitComment(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string | null;
    const comment = formData.get("comment") as string;
    const postId = formData.get("postId") as string;

    if (!name || !comment || !postId) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    // Prepare the comment data
    const commentData: {
      _type: "comment";
      name: string;
      comment: string;
      post: { _type: "reference"; _ref: string };
      createdAt: string;
      isApproved: boolean;
      email?: string;
      avatar: string;
    } = {
      _type: "comment",
      name,
      comment,
      post: {
        _type: "reference",
        _ref: postId,
      },
      createdAt: new Date().toISOString(),
      isApproved: true, // Can change to false if approval is needed
      avatar: getRandomAvatarUrl(), // Adding random avatar URL
    };

    // Only add email if it is provided
    if (email) {
      commentData.email = email;
    }

    // Send the comment to Sanity
    const response = await client.create(commentData);

    // Check the response from Sanity
    if (response && response._id) {
      return {
        success: true,
        message: "Comment submitted successfully! It will appear after approval.",
      };
    } else {
      throw new Error("Failed to create comment in Sanity.");
    }
  } catch (error: any) {
    console.error("Error submitting comment:", error);

    // If the error is related to Sanity, log the response for debugging
    if (error.response) {
      console.error("Sanity API Error:", error.response);
    }

    return {
      success: false,
      message: "Error submitting comment. Please try again.",
    };
  }
}
