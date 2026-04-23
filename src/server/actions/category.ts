"use server";

import { db } from "@/src/libs/firebase-admin";
import { CategorySchema } from "@/src/libs/schemas/categories";
import { slugify } from "@/src/libs/utils";
import { revalidatePath } from "next/cache";

const COLLECTION_NAME = "categories";

export async function createCategory(formData: any) {
  const validatedFields = CategorySchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: "Dữ liệu không hợp lệ",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const existingCode = await db
    .collection(COLLECTION_NAME)
    .where("code", "==", data.code)
    .get();
  if (!existingCode.empty) {
    return { error: "Mã danh mục này đã tồn tại!" };
  }

  const categoryData = {
    ...data,
    translations: {
      vi: { ...data.translations.vi, slug: slugify(data.translations.vi.name) },
      en: { ...data.translations.en, slug: slugify(data.translations.en.name) },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    await db.collection(COLLECTION_NAME).add(categoryData);

    revalidatePath("/admin/dashboard", "page");
    return { success: true, message: "Thêm danh mục thành công" };
  } catch (error) {
    return { error: "Lỗi kết nối database" };
  }
}
