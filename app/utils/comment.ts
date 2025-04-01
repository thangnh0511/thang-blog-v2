"use server";

import { createClient } from "@sanity/client";

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

    // Chuẩn bị dữ liệu comment với kiểu dữ liệu cụ thể
    const commentData: {
      _type: "comment";
      name: string;
      comment: string;
      post: { _type: "reference"; _ref: string };
      createdAt: string;
      isApproved: boolean;
      email?: string;
    } = {
      _type: "comment",
      name,
      comment,
      post: {
        _type: "reference",
        _ref: postId,
      },
      createdAt: new Date().toISOString(),
      isApproved: true, // Có thể đổi thành false nếu cần duyệt trước khi hiển thị
    };

    // Chỉ thêm email nếu nó không rỗng
    if (email) {
      commentData.email = email;
    }

    // Gửi comment lên Sanity
    const response = await client.create(commentData);

    // Kiểm tra response từ Sanity
    if (response && response._id) {
      return {
        success: true,
        message:
          "Comment submitted successfully! It will appear after approval.",
      };
    } else {
      throw new Error("Failed to create comment in Sanity.");
    }
  } catch (error: any) {
    console.error("Error submitting comment:", error.message);

    return {
      success: false,
      message: "Error submitting comment. Please try again.",
    };
  }
}
