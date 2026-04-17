"use client";

import { useState } from "react";
import { Link } from "@/src/i18n/routing";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("common.navigation");

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/introduction", label: t("introduction") },
    {
      href: "/production",
      label: t("production"),
      subItems: [
        { href: "/production", label: "Production" },
        { href: "/production/colors-surface", label: "Colors/Surface" },
      ],
    },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/pictures/logo/logo.png"
              alt="VIETANHDUNG POTTERY Logo"
              width={32}
              height={32}
              className="w-8 h-8 object-contain"
            />
            <span className="text-2xl font-bold text-[#5c4a3d] lg:block hidden">
              VIETANHDUNGPOTTERY
            </span>
            <span className="text-2xl font-bold text-[#5c4a3d] lg:hidden block">
              VAD POTTERY
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-[#5c4a3d] hover:text-[#8b6914] font-medium transition-colors py-2"
                >
                  {link.label}
                  {link.subItems && <ChevronDown className="w-4 h-4" />}
                </Link>
                {link.subItems && (
                  <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-white border rounded-lg shadow-lg w-48 py-2">
                      {link.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-[#5c4a3d] hover:text-[#8b6914] hover:bg-[#faf8f5] transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-[#5c4a3d]" />
            ) : (
              <Menu className="w-6 h-6 text-[#5c4a3d]" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden absolute left-0 right-0 top-full bg-white border-t shadow-lg z-40"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center justify-between text-[#5c4a3d] hover:text-[#8b6914] hover:bg-[#faf8f5] py-3 px-2 rounded-lg font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    {link.subItems && <ChevronDown className="w-4 h-4" />}
                  </Link>
                  {link.subItems && (
                    <div className="pl-6 space-y-1 mt-1">
                      {link.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block text-sm text-[#5c4a3d] hover:text-[#8b6914] hover:bg-[#faf8f5] py-2 px-2 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
