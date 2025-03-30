"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Card, CardBody, CardFooter } from "@heroui/card"

interface GalleryItem {
  _key: string
  _type: string
  image: {
    _type: string
    asset: {
      _ref: string
      _type: string
    }
  }
  description_en: string
  description_vi: string
  alt?: string
}

interface GalleryProps {
  data: {
    gallery_title_en: string
    gallery_title_vi: string
    gallery_images: GalleryItem[]
  }
  locale?: "en" | "vi"
  title?: string
}

// Function to convert Sanity image reference to URL
function imageUrlBuilder(ref: string) {
  // Extract dimensions and format from the reference
  const parts = ref.split("-")
  const format = parts.pop()?.split(".")[0] || "png"
  const dimensions = parts.pop() || "1024x682"
  const id = parts.join("-").replace("image-", "")

  return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${id}-${dimensions}.${format}`
}

export default function Gallery({ data, locale = "en", title }: GalleryProps) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to access theme
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? systemTheme : theme
  const isDark = currentTheme === "dark"

  const description = locale === "en" ? data.gallery_title_en : data.gallery_title_vi

  return (
    <div className="container mx-auto py-4 px-4">
      {(title || description) && (
        <div className="mb-8">
          {title && <h1 className="text-3xl font-bold mb-4">{title}</h1>}
          {description && <p className="text-muted-foreground dark:p-4 dark:border-2 dark:rounded-xl dark:border-[#ffe700]">{description}</p>}
        </div>
      )}

      <div className="space-y-6">
        {data.gallery_images.map((item) => (
          <Card key={item._key} className={`overflow-hidden ${isDark ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <CardBody className="overflow-visible p-0">
              <div className="relative w-full aspect-[3/2] overflow-hidden">
                <Image
                  src={imageUrlBuilder(item.image.asset._ref) || "/placeholder.svg"}
                  alt={item.alt || (locale === "en" ? item.description_en : item.description_vi)}
                  fill
                  className="object-cover w-full"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority={false}
                  loading="lazy"
                />
              </div>
            </CardBody>
            <CardFooter className="p-4">
              <p className="text-lg">{locale === "en" ? item.description_en : item.description_vi}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

