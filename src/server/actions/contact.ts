"use server";

import { db } from "@/src/libs/firebase-admin";
import { revalidatePath } from "next/cache";
import { subscribeNewsletter } from "./email";
const COLLECTION_NAME = "contacts";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate required fields
    if (!formData.name || !formData.email) {
      return { error: "Vui lòng điền đầy đủ thông tin bắt buộc" };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { error: "Email không hợp lệ" };
    }

    const contactData = {
      ...formData,
      status: "new", // new, read, replied
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await subscribeNewsletter(formData.email);
    await db.collection(COLLECTION_NAME).add(contactData);

    revalidatePath("/admin/contacts", "page");

    return { success: true, message: "Gửi tin nhắn thành công!" };
  } catch (error) {
    console.error("Error saving contact:", error);
    return { error: "Có lỗi xảy ra, vui lòng thử lại sau" };
  }
}

export async function getAllContacts() {
  try {
    const snapshot = await db
      .collection(COLLECTION_NAME)
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate
          ? data.createdAt.toDate().toISOString()
          : null,
        updatedAt: data.updatedAt?.toDate
          ? data.updatedAt.toDate().toISOString()
          : null,
      };
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return [];
  }
}

export async function updateContactStatus(id: string, status: "new" | "read" | "replied") {
  try {
    await db.collection(COLLECTION_NAME).doc(id).update({
      status,
      updatedAt: new Date(),
    });

    revalidatePath("/admin/contacts", "page");
    return { success: true };
  } catch (error) {
    console.error("Error updating contact:", error);
    return { error: "Cập nhật thất bại" };
  }
}

export async function deleteContact(id: string) {
  try {
    await db.collection(COLLECTION_NAME).doc(id).delete();
    revalidatePath("/admin/contacts", "page");
    return { success: true, message: "Xóa thành công" };
  } catch (error) {
    console.error("Error deleting contact:", error);
    return { error: "Xóa thất bại" };
  }
}
