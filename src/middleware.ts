import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

const adminRoutes = [
  "/admin",
  "/admin/dashboard",
  "/admin/login",
  "/admin/products",
];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  if (isAdminRoute) {
    const session = request.cookies.get("__session")?.value;

    if (pathname.startsWith("/admin/*") && !session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    if (pathname.startsWith("/admin/login") && session) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

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
