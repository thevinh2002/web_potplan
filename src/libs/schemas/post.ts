import { z } from "zod";

export const PostSchema = z.object({
  slug: z.string().min(1, "Vui lòng nhập slug"),
  title: z.string().min(1, "Vui lòng nhập tiêu đề"),
  excerpt: z.string().min(1, "Vui lòng nhập tóm tắt"),
  content: z.string().min(1, "Vui lòng nhập nội dung"),
  image: z.string().url("URL ảnh không hợp lệ"),
  date: z.string().min(1, "Vui lòng chọn ngày"),
  category: z.string().min(1, "Vui lòng nhập danh mục"),
});

export type PostInput = z.input<typeof PostSchema>;
export type PostFormSchema = z.input<typeof PostSchema>;
