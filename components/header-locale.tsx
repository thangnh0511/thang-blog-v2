"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export function HeaderLocale({
  children,
}: {
  children: (locale: string) => React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const locale = searchParams?.get("locale") || "en";
  return <>{children(locale)}</>;
}
