"use client"

import { Toaster } from "react-hot-toast"

export function ToastProvider() {
  return (
    <Toaster
      position={typeof window !== "undefined" && window.innerWidth < 640 ? "bottom-center" : "bottom-right"}
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#333",
          color: "#fff",
          padding: "12px",
          borderRadius: "8px",
        },
      }}
    />
  )
}
