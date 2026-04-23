import { z } from "zod";

const CategoryTranslationSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên danh mục"),
  slug: z.string().optional(),
});

export const CategorySchema = z.object({
  code: z.string().min(1, "Vui lòng nhập mã danh mục (VD: CHAU_DAT)"),
  count: z.number().default(0),
  translations: z.object({
    vi: CategoryTranslationSchema,
    en: CategoryTranslationSchema,
  }),
});

export type CategoryInput = z.input<typeof CategorySchema>;
