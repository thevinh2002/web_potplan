"use server";

import { db } from "@/src/libs/firebase-admin";
import { CategorySchema } from "@/src/libs/schemas/categories";
import { slugify } from "@/src/libs/utils";
import { revalidatePath } from "next/cache";

const COLLECTION_NAME = "categories";

import { getAllCategoriesForAdmin } from "@/src/server/queries/category";

export async function getCategoriesAction() {
  return await getAllCategoriesForAdmin();
}

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

export async function updateCategory(id: string, formData: any) {
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
  
  const isDuplicate = !existingCode.empty && existingCode.docs.some(doc => doc.id !== id);
  if (isDuplicate) {
    return { error: "Mã danh mục này đã tồn tại!" };
  }

  const categoryData = {
    ...data,
    translations: {
      vi: { ...data.translations.vi, slug: slugify(data.translations.vi.name) },
      en: { ...data.translations.en, slug: slugify(data.translations.en.name) },
    },
    updatedAt: new Date(),
  };

  try {
    await db.collection(COLLECTION_NAME).doc(id).update(categoryData);

    revalidatePath("/admin/dashboard", "page");
    return { success: true, message: "Cập nhật danh mục thành công" };
  } catch (error) {
    return { error: "Lỗi kết nối database" };
  }
}

export async function deleteCategory(id: string) {
  try {
    const categoryRef = db.collection(COLLECTION_NAME).doc(id);
    const categoryDoc = await categoryRef.get();

    if (!categoryDoc.exists) {
      return { error: "Danh mục không tồn tại" };
    }

    const categoryCode = categoryDoc.data()?.code;

    // Đếm số sản phẩm thực tế thuộc category này
    const productsSnapshot = await db
      .collection("products")
      .where("category", "==", categoryCode)
      .limit(1)
      .get();

    if (!productsSnapshot.empty) {
      return { error: "Không thể xóa danh mục đang có sản phẩm" };
    }

    await categoryRef.delete();

    revalidatePath("/admin/dashboard", "page");
    revalidatePath("/admin/categories", "page");
    return { success: true, message: "Xóa danh mục thành công" };
  } catch (error) {
    return { error: "Lỗi kết nối database" };
  }
}

