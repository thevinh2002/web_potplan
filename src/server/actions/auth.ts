"use server";

import { cookies } from "next/headers";
import { adminAuth } from "@/src/libs/firebase-admin";

export async function loginWithToken(idToken: string) {
  try {
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });
    cookies().set("__session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return { success: true };
  } catch (error) {
    console.error("Lỗi tạo session:", error);
    return { success: false, error: "Xác thực thất bại ở máy chủ." };
  }
}

export async function logout() {
  cookies().delete("__session");
}
