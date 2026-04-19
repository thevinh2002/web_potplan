"use server";

import { db } from "@/src/libs/firebase-admin";
import { slugify } from "@/src/libs/utils";
import { ProductSchema } from "@/src/libs/schemas/product";
import { revalidatePath } from "next/cache";

const COLLECTION_NAME = "products";

//CREATE
export async function createProduct(formData: any) {
  const validatedFields = ProductSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: "Dữ liệu không hợp lệ",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const productData = {
    ...data,
    translations: {
      vi: { ...data.translations.vi, slug: slugify(data.translations.vi.name) },
      en: { ...data.translations.en, slug: slugify(data.translations.en.name) },
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    await db.collection(COLLECTION_NAME).add(productData);

    revalidatePath("/dashboard/products", "page");
    revalidatePath("/production", "page");

    return { success: true, message: "Thêm sản phẩm thành công" };
  } catch (error) {
    return { error: "Lỗi kết nối database" };
  }
}

//UPDATE
export async function updateProduct(id: string, formData: any) {
  const validatedFields = ProductSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: "Dữ liệu không hợp lệ",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const productData = {
    ...data,
    translations: {
      vi: { ...data.translations.vi, slug: slugify(data.translations.vi.name) },
      en: { ...data.translations.en, slug: slugify(data.translations.en.name) },
    },
    updatedAt: new Date(),
  };

  try {
    await db.collection(COLLECTION_NAME).doc(id).update(productData);

    revalidatePath("/dashboard/products", "page");
    revalidatePath("/[locale]/production", "page");
    revalidatePath("/[locale]product/[slug]", "page");

    return { success: true, message: "Cập nhật thành công" };
  } catch (error) {
    return { error: "Lỗi kết nối database" };
  }
}

//DELETE
export async function deleteProduct(id: string) {
  try {
    await db.collection(COLLECTION_NAME).doc(id).delete();

    revalidatePath("/(admin)/(dashboard)/products", "page");
    revalidatePath("/(public)/production", "page");

    return { success: true, message: "Xóa sản phẩm thành công" };
  } catch (error) {
    return { error: "Lỗi khi xóa sản phẩm" };
  }
}
