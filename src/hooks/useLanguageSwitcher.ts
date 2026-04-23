"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/src/i18n/routing";
import { translateSlugAction } from "@/src/server/actions/translate-slug";

export function useLanguageSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const switchLanguage = async (newLocale: string) => {
    if (newLocale === currentLocale) return;

    if (pathname.startsWith("/product/")) {
      const currentSlug = pathname.split("/").pop();

      if (currentSlug) {
        const newSlug = await translateSlugAction(
          currentSlug,
          currentLocale,
          newLocale,
        );

        if (newSlug) {
          startTransition(() => {
            router.replace(`/product/${newSlug}`, { locale: newLocale });
          });
          return;
        }
      }
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
