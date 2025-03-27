"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/language-switcher";
import { HeaderLocale } from "./header-locale";
import { Logo } from "./_asset/logo";
import { LogoWhite } from "./_asset/logo-white";

const routes = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/note", label: "Note" },
];

// Component nhỏ để xử lý đổi logo theo theme
function LogoSwitcher() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!mounted) return null;

  return currentTheme === "dark" ? (
    <LogoWhite width={120} height={50} className="hover:opacity-80 transition" />
  ) : (
    <Logo width={120} height={50} className="hover:opacity-80 transition" />
  );
}

// Fallback khi LanguageSwitcher đang load
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
  );
}

// Header chính
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <HeaderLocale>
      {(locale) => {
        const getHref = (path: string) => `${path}?locale=${locale}`;

        return (
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-hidden">
            <div className="container flex h-16 items-center justify-between">
              {/* Left: Logo */}
              <div className="flex items-center gap-2">
                <Link href={getHref("/")} className="font-bold text-xl">
                  <LogoSwitcher />
                </Link>
              </div>

              {/* Center: Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-6">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={getHref(route.href)}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === route.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {locale === "en" ? route.label : translateLabel(route.label)}
                  </Link>
                ))}
              </nav>

              {/* Right: Language, DarkMode, Mobile Nav */}
              <div className="flex items-center gap-2">
                <LanguageSwitcherWithFallback />
                <ModeToggle />
                <Sheet open={open} onOpenChange={setOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                      <Menu className="h-5 w-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="lg:hidden">
                    <nav className="flex flex-col gap-4 mt-8">
                      {routes.map((route) => (
                        <Link
                          key={route.href}
                          href={getHref(route.href)}
                          onClick={() => setOpen(false)}
                          className={`text-lg font-medium transition-colors hover:text-primary ${
                            pathname === route.href
                              ? "text-primary"
                              : "text-muted-foreground"
                          }`}
                        >
                          {locale === "en"
                            ? route.label
                            : translateLabel(route.label)}
                        </Link>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </header>
        );
      }}
    </HeaderLocale>
  );
}

function translateLabel(label: string): string {
  switch (label) {
    case "Home":
      return "Trang chủ";
    case "Blog":
      return "Bài viết";
    case "Note":
        return "Ghi chú";
    case "About":
      return "Mình là ai?";
    default:
      return label;
  }
}
