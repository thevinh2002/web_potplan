"use server";

import * as admin from "firebase-admin"; // Bắt buộc import admin để dùng FieldValue.increment
import { db } from "@/src/libs/firebase-admin";
import { slugify } from "@/src/libs/utils";
import { ProductSchema } from "@/src/libs/schemas/product";
import { revalidatePath } from "next/cache";

const COLLECTION_NAME = "products";
const CAT_COLLECTION = "categories";

import { getAllProductsForAdmin } from "@/src/server/queries/product";

export async function getProductsAction() {
  return await getAllProductsForAdmin();
}

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

    if (data.category) {
      const catQuery = await db
        .collection(CAT_COLLECTION)
        .where("code", "==", data.category)
        .get();
      if (!catQuery.empty) {
        await catQuery.docs[0].ref.update({
          count: admin.firestore.FieldValue.increment(1),
        });
      }
    }

    revalidatePath("/admin/dashboard", "page");
    revalidatePath("/admin/categories", "page");
    revalidatePath("/[locale]/production", "page");

    return { success: true, message: "Thêm sản phẩm thành công" };
  } catch (error) {
    return { error: "Lỗi kết nối database" };
  }
}

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
    const oldProductSnap = await db.collection(COLLECTION_NAME).doc(id).get();
    const oldCategoryCode = oldProductSnap.data()?.category;
    const newCategoryCode = data.category;

    await db.collection(COLLECTION_NAME).doc(id).update(productData);

    if (oldCategoryCode !== newCategoryCode) {
      if (oldCategoryCode) {
        const oldCatQuery = await db
          .collection(CAT_COLLECTION)
          .where("code", "==", oldCategoryCode)
          .get();
        if (!oldCatQuery.empty) {
          await oldCatQuery.docs[0].ref.update({
            count: admin.firestore.FieldValue.increment(-1),
          });
        }
      }
      if (newCategoryCode) {
        const newCatQuery = await db
          .collection(CAT_COLLECTION)
          .where("code", "==", newCategoryCode)
          .get();
        if (!newCatQuery.empty) {
          await newCatQuery.docs[0].ref.update({
            count: admin.firestore.FieldValue.increment(1),
          });
        }
      }
    }

    revalidatePath("/admin/dashboard", "page");
    revalidatePath("/admin/categories", "page");
    revalidatePath("/[locale]/production", "page");
    revalidatePath("/[locale]/product/[slug]", "page");

    return { success: true, message: "Cập nhật thành công" };
  } catch (error) {
    return { error: "Lỗi kết nối database" };
  }
}

export async function deleteProduct(id: string) {
  try {
    const productSnap = await db.collection(COLLECTION_NAME).doc(id).get();
    if (!productSnap.exists) {
      return { error: "Không tìm thấy sản phẩm" };
    }
    const categoryCode = productSnap.data()?.category;

    await db.collection(COLLECTION_NAME).doc(id).delete();

    if (categoryCode) {
      const catQuery = await db
        .collection(CAT_COLLECTION)
        .where("code", "==", categoryCode)
        .get();
      if (!catQuery.empty) {
        await catQuery.docs[0].ref.update({
          count: admin.firestore.FieldValue.increment(-1),
        });
      }
    }

    revalidatePath("/admin/dashboard", "page");
    revalidatePath("/admin/categories", "page");
    revalidatePath("/[locale]/production", "page");

    return { success: true, message: "Xóa sản phẩm thành công" };
  } catch (error) {
    return { error: "Lỗi khi xóa sản phẩm" };
  }
}
