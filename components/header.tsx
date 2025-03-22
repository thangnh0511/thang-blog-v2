"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState, Suspense } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "./_asset/logo";
import { HeaderLocale } from "./header-locale";

const routes = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

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

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <HeaderLocale>
      {(locale) => {
        const getHref = (path: string) => `${path}?locale=${locale}`;

        return (
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
              {/* Left: Logo */}
              <div className="flex items-center gap-2">
                <Link href={getHref("/")} className="font-bold text-xl">
                  <Logo
                    width={150}
                    height={50}
                    className="hover:opacity-80 transition"
                  />
                </Link>
              </div>

              {/* Center: Nav on Desktop */}
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
                    {locale === "en"
                      ? route.label
                      : translateLabel(route.label)}
                  </Link>
                ))}
              </nav>

              {/* Right: Language, DarkMode, Mobile Menu */}
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
    case "About":
      return "Mình là ai?";
    default:
      return label;
  }
}
