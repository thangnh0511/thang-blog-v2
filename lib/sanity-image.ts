/**
 * Alternative implementation using @sanity/image-url
 * This file is optional if you prefer to use the simpler imageUrlBuilder function in the component
 */

import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
})

export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

