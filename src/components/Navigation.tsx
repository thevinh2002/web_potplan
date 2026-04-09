'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Search, User, ShoppingBag, Leaf } from 'lucide-react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/introduction', label: 'INTRODUCTION' },
    { href: '/production', label: 'PRODUCTION' },
    { href: '/contact', label: 'CONTACT' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="w-8 h-8 text-[#8b6914]" />
            <span className="text-2xl font-bold text-[#5c4a3d]">AURORA POTS</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#5c4a3d] hover:text-[#8b6914] font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <button type="button" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-[#5c4a3d]" />
            </button>
            <button type="button" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <User className="w-5 h-5 text-[#5c4a3d]" />
            </button>
            <button type="button" className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
              <ShoppingBag className="w-5 h-5 text-[#5c4a3d]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8b6914] text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>
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

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[#5c4a3d] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
