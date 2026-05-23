import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/src/libs/firebase-admin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("__session");

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false });
    }

    await adminAuth.verifySessionCookie(sessionCookie.value);

    return NextResponse.json({
      authenticated: true,
    });
  } catch (error) {
    console.error("Session verification error:", error);

    return NextResponse.json({
      authenticated: false,
    });
  }
}