"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/src/i18n/routing";
import { useParams } from "next/navigation";

export function useLanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const switchLanguage = async (newLocale: string) => {
    if (newLocale === currentLocale) return;

    const productSlug = params?.slug as string | undefined;
    const isProductPage = pathname.startsWith("/products/") && productSlug;

    if (isProductPage) {
      try {
        const res = await fetch(
          `/api/translate-slug?slug=${productSlug}&fromLocale=${currentLocale}&toLocale=${newLocale}`,
        );
        const { slug } = await res.json();

        startTransition(() => {
          router.replace(`/products/${slug}`, { locale: newLocale });
        });
      } catch {
        startTransition(() => {
          router.replace(pathname, { locale: newLocale });
        });
      }
      return;
    }

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return {
    currentLocale,
    switchLanguage,
    isPending,
  };
}
