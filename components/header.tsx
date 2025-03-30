"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { HeaderLocale } from "./header-locale"
import { Logo } from "./_asset/logo"
import { LogoWhite } from "./_asset/logo-white"

// Import HeroUI Navbar components
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react"

const routes = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/note", label: "Note" },
]

// Component to handle logo switching based on theme
function LogoSwitcher() {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const currentTheme = theme === "system" ? systemTheme : theme

  if (!mounted) return null

  return currentTheme === "dark" ? (
    <LogoWhite width={120} height={50} className="hover:opacity-80 transition" />
  ) : (
    <Logo width={120} height={50} className="hover:opacity-80 transition" />
  )
}

// Fallback when LanguageSwitcher is loading
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

// Main Header component
export default function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <HeaderLocale>
      {(locale) => {
        const getHref = (path: string) => `${path}?locale=${locale}`

        return (
          <Navbar
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
            className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            {/* Logo/Brand - Left side */}
            <NavbarContent>
              <NavbarBrand>
                <Link href={getHref("/")} className="flex items-center">
                  <LogoSwitcher />
                </Link>
              </NavbarBrand>
            </NavbarContent>

            {/* Desktop Navigation - Center */}
            <NavbarContent className="hidden md:flex gap-4" justify="center">
              {routes.map((route) => (
                <NavbarItem key={route.href} isActive={pathname === route.href}>
                  <Link
                    href={getHref(route.href)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === route.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {locale === "en" ? route.label : translateLabel(route.label)}
                  </Link>
                </NavbarItem>
              ))}
            </NavbarContent>

            {/* Right side - Theme, Language, and Mobile Menu Toggle */}
            <NavbarContent justify="end">
              {/* Desktop Theme & Language */}
              <NavbarItem className="hidden md:flex">
                <LanguageSwitcherWithFallback />
              </NavbarItem>
              <NavbarItem className="hidden md:flex">
                <ModeToggle />
              </NavbarItem>

              {/* Mobile menu toggle - Now on the right */}
              <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="md:hidden" />
            </NavbarContent>

            {/* Mobile Menu */}
            <NavbarMenu className="pt-6 md:hidden">
              {/* Mobile Navigation */}
              {routes.map((route) => (
                <NavbarMenuItem key={route.href}>
                  <Link
                    href={getHref(route.href)}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 text-base font-medium ${
                      pathname === route.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    {locale === "en" ? route.label : translateLabel(route.label)}
                  </Link>
                </NavbarMenuItem>
              ))}

              {/* Mobile Theme & Language */}
              <div className="mt-8 border-t pt-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {locale === "en" ? "Theme" : "Giao diện"}
                    </span>
                    <ModeToggle />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      {locale === "en" ? "Language" : "Ngôn ngữ"}
                    </span>
                    <LanguageSwitcherWithFallback />
                  </div>
                </div>
              </div>
            </NavbarMenu>
          </Navbar>
        )
      }}
    </HeaderLocale>
  )
}

function translateLabel(label: string): string {
  switch (label) {
    case "Home":
      return "Trang chủ"
    case "Blog":
      return "Bài viết"
    case "Note":
      return "Ghi chú"
    case "About":
      return "Mình là ai?"
    default:
      return label
  }
}

