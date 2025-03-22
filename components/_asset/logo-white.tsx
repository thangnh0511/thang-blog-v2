// components/ui/logo.tsx
import Image from "next/image"
import Link from "next/link"

interface LogoProps {
  width?: number
  height?: number
  className?: string
}

export const LogoWhite = ({ width = 120, height = 40, className = "" }: LogoProps) => {
  return (
    <Link href="/" className="inline-flex items-center space-x-2">
      <Image
        src="/2.png"
        alt="Logo"
        width={width}
        height={height}
        className={className}
        priority
      />
    </Link>
  )
}
