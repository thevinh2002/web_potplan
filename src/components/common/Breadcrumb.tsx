"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "framer-motion";

const pathNames: Record<string, string> = {
  introduction: "Introduction",
  production: "Products",
  contact: "Contact",
};

export default function Breadcrumb() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  // Build breadcrumbs array
  const breadcrumbs: { href: string; name: string; isLast: boolean }[] = [];

  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i];
    const isLast = i === segments.length - 1;

    // Handle product detail page: /product/[id]
    if (segment === "product") {
      // Add "Products" link pointing to /production
      breadcrumbs.push({
        href: "/production",
        name: "Products",
        isLast: false,
      });
      // Skip the 'product' segment itself in output
      continue;
    }

    // Handle product ID (number after 'product')
    if (i > 0 && segments[i - 1] === "product") {
      breadcrumbs.push({
        href: "/" + segments.slice(0, i + 1).join("/"),
        name: "Product Detail",
        isLast: true,
      });
      continue;
    }

    const href = "/" + segments.slice(0, i + 1).join("/");
    const name = pathNames[segment] || segment;

    breadcrumbs.push({ href, name, isLast });
  }

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-2 text-sm">
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-500 hover:text-[#8b6914] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>

          {breadcrumbs.map((crumb) => (
            <div key={crumb.href} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {crumb.isLast ? (
                <span className="text-[#8b6914] font-medium">{crumb.name}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-gray-500 hover:text-[#8b6914] transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
