import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/src/libs/firebase-admin";

export async function GET() {
  try {
    const sessionCookie = cookies().get("__session");
    
    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false });
    }

    // Verify the session cookie
    await adminAuth.verifySessionCookie(sessionCookie.value);
    
    return NextResponse.json({ authenticated: true });
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json({ authenticated: false });
  }
}
