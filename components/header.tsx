"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, Suspense } from "react"
import { LanguageSwitcher } from "@/components/language-switcher"

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/about",
    label: "About",
  },
]

function LanguageSwitcherWithFallback() {
  return (
    <Suspense
      fallback={
        <Button variant="ghost" size="icon" disabled>
          <span className="sr-only">Loading</span>
        </Button>
      }
    >
      <LanguageSwitcher />
    </Suspense>
  )
}

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Get the current search params to preserve them in navigation
  const searchParams = useSearchParams()
  const locale = searchParams?.get("locale") || "en"

  // Function to append current search params to links
  const getHref = (path: string) => {
    return `${path}${searchParams?.toString() ? `?${searchParams.toString()}` : ""}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="lg:hidden">
              <nav className="flex flex-col gap-4 mt-8">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={getHref(route.href)}
                    onClick={() => setOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      pathname === route.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {locale === "en" ? route.label : translateLabel(route.label)}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href={getHref("/")} className="font-bold text-xl">
            {locale === "en" ? "Personal Blog" : "Blog Cá Nhân"}
          </Link>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={getHref(route.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === route.href ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {locale === "en" ? route.label : translateLabel(route.label)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcherWithFallback />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

// Helper function to translate navigation labels
function translateLabel(label: string): string {
  switch (label) {
    case "Home":
      return "Trang chủ"
    case "Blog":
      return "Bài viết"
    case "About":
      return "Về tôi"
    default:
      return label
  }
}

