"use server";

import { db } from "@/src/libs/firebase-admin";
import { PostSchema } from "@/src/libs/schemas/post";
import { revalidatePath } from "next/cache";

const COLLECTION_NAME = "posts";

import { getAllPostsForAdmin } from "@/src/server/queries/post";
import { slugify } from "@/src/libs/utils";

export async function getPostsAction() {
  return await getAllPostsForAdmin();
}

export async function createPost(formData: any) {
  const validatedFields = PostSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: "Dữ liệu không hợp lệ",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const postData = {
    ...data,
    slug: slugify(data.title),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    await db.collection(COLLECTION_NAME).add(postData);

    revalidatePath("/admin/posts", "page");
    revalidatePath("/blogs", "page");
    return { success: true, message: "Thêm bài viết thành công" };
  } catch (error) {
    return { error: "Lỗi kết nối database" };
  }
}

export async function updatePost(id: string, formData: any) {
  const validatedFields = PostSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: "Dữ liệu không hợp lệ",
      details: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  const postData = {
    ...data,
    updatedAt: new Date(),
  };

  try {
    await db.collection(COLLECTION_NAME).doc(id).update(postData);

    revalidatePath("/admin/posts", "page");
    revalidatePath("/blogs", "page");
    return { success: true, message: "Cập nhật bài viết thành công" };
  } catch (error) {
    return { error: "Lỗi kết nối database" };
  }
}

export async function deletePost(id: string) {
  try {
    const postRef = db.collection(COLLECTION_NAME).doc(id);
    const postDoc = await postRef.get();

    if (!postDoc.exists) {
      return { error: "Bài viết không tồn tại" };
    }

    await postRef.delete();

    revalidatePath("/admin/posts", "page");
    revalidatePath("/blogs", "page");
    return { success: true, message: "Xóa bài viết thành công" };
  } catch (error) {
    return { error: "Lỗi kết nối database" };
  }
}
