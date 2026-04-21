"use server";

import { getTranslatedSlug } from "@/src/server/queries/product";

export async function translateSlugAction(
  currentSlug: string,
  currentLocale: string,
  targetLocale: string,
): Promise<string | null> {
  return getTranslatedSlug(currentSlug, currentLocale, targetLocale);
}
