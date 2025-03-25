"use client"

import { type PortableTextComponents, PortableText as PortableTextReact } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"
import { urlForImage } from "@/lib/sanity"

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null
      }
      return (
        <div className="relative w-full my-6 rounded-lg overflow-hidden">
          <Image 
            src={urlForImage(value) || "/placeholder.svg"} 
            alt={value.alt || ""} 
            width={800} // hoặc thay bằng giá trị phù hợp
            height={600} // hoặc thay bằng giá trị phù hợp
            className="w-full h-auto object-cover rounded-lg" // Cho phép chiều cao tự động
          />
          {value.caption && <div className="text-center text-sm text-muted-foreground mt-2">{value.caption}</div>}
        </div>
      )
    },
    code: ({ value }) => {
      return (
        <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
          <code>{value.code}</code>
        </pre>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined
      const target = !value.href.startsWith("/") ? "_blank" : undefined
      return (
        <Link href={value.href} rel={rel} target={target} className="underline text-primary">
          {children}
        </Link>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-bold mt-6 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 my-4">{children}</ol>,
  },
}

export function PortableText({ value }: { value: any }) {
  return <PortableTextReact value={value} components={components} />
}
