"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  BarChart3,
  FileText,
  User,
  LogOut,
  Folder,
  Mail,
} from "lucide-react";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "dashboard" },
  { icon: Package, label: "Inventory", href: "inventory" },
  { icon: Folder, label: "Categories", href: "categories" },
  { icon: Mail, label: "Contacts", href: "contacts" },
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check for login, signup, and root admin page (to allow redirect)
      if (
        pathname.includes("/login") ||
        pathname.includes("/signup") ||
        pathname === "/admin"
      ) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/auth/session");
        const data = await response.json();

        if (!data.authenticated) {
          router.push(`/admin/login`);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        router.push(`/admin/login`);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Đang tải...</div>
      </div>
    );
  }

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        // Use window.location.replace to ensure full page reload and clear any client-side state
        window.location.replace("/admin/login");
      } else {
        console.error("Logout failed");
        alert("Không thể đăng xuất. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Không thể đăng xuất. Vui lòng thử lại.");
    }
  };

  const handleMenuClick = (href: string) => {
    router.push(`/admin/${href}`);
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
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
