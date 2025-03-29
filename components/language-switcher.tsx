"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@heroui/react";




export function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLocale = searchParams.get("locale") || "en"

  const switchLocale = (locale: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("locale", locale)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Dropdown>
    <DropdownTrigger asChild>
      <Button variant="light" size="sm">
        <Globe className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Switch language</span>
      </Button>
    </DropdownTrigger>
    <DropdownMenu aria-label="Language Selection">
      <DropdownItem 
        key="en" 
        onClick={() => switchLocale("en")}
        className={currentLocale === "en" ? "bg-muted" : ""}
      >
        English
      </DropdownItem>
      <DropdownItem 
        key="vi" 
        onClick={() => switchLocale("vi")}
        className={currentLocale === "vi" ? "bg-muted" : ""}
      >
        Tiếng Việt
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
  )
}

