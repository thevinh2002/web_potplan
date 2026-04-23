import { z } from "zod";

const TranslationSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên sản phẩm"),
  description: z.string().min(1, "Vui lòng nhập mô tả"),
  new: z.string().optional(),
  slug: z.string().optional(),
});

export const ProductSchema = z.object({
  category: z.string().min(1, "Vui lòng chọn danh mục"),
  code: z.string().min(1, "Vui lòng nhập mã sản phẩm"),
  image_cover: z.string().url("URL ảnh cover không hợp lệ"),
  images: z.array(z.string().url("URL không hợp lệ")).default([]),
  is_new: z.boolean().default(false),
  rating: z.number().default(0),
  review: z.number().default(0),
  translations: z.object({
    en: TranslationSchema,
    vi: TranslationSchema,
  }),
});

export type ProductInput = z.input<typeof ProductSchema>;
export type ProductFormSchema = z.input<typeof ProductSchema>;
