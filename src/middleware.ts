import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for admin routes - let AdminLayout handle auth with localStorage
  if (pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(vi|en)/:path*",
    "/((?!api|_next/static|_next/image|images|pictures|favicon.ico).*)",
  ],
};
