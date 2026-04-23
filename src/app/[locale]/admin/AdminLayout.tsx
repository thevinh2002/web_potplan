"use client";

import { useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  BarChart3,
  FileText,
  User,
  LogOut,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "dashboard" },
  { icon: Package, label: "Inventory", href: "inventory" },
  { icon: PlusCircle, label: "Add Product", href: "add-product" },
];

const accountItems = [
  { icon: User, label: "Log in", href: "login" },
  { icon: PlusCircle, label: "Sign up", href: "signup" },
];

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as string) || "en";

  useEffect(() => {
    if (pathname.includes("/login") || pathname.includes("/signup")) return;
    
    const session = localStorage.getItem("admin_session");
    if (!session) {
      router.push(`/${locale}/admin/login`);
    }
  }, [router, locale, pathname]);

  const handleLogout = () => {
    localStorage.removeItem("admin_session");
    router.push(`/${locale}/admin/login`);
  };

  const handleMenuClick = (href: string) => {
    router.push(`/${locale}/admin/${href}`);
  };

  const isActive = (href: string) => pathname.includes(href);

  // Don't show sidebar on login/signup pages
  if (pathname.includes("/login") || pathname.includes("/signup")) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 flex-1 overflow-auto">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Main
          </span>
          <nav className="mt-4 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleMenuClick(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-[#fff5f0] text-[#e85d04]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
