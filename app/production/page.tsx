'use client'

import { useState } from 'react'
import TopBar from '../../src/components/TopBar'
import Navigation from '../../src/components/Navigation'
import Footer from '../../src/components/Footer'
import Breadcrumb from '../../src/components/Breadcrumb'
import Link from 'next/link'
import { Search, Filter, Grid3X3, List, ChevronDown, SlidersHorizontal } from 'lucide-react'

const categories = [
  { id: 'all', name: 'All Products', count: 48 },
  { id: 'planters', name: 'Planters & Pots', count: 16 },
  { id: 'vases', name: 'Vases & Jars', count: 12 },
  { id: 'lamps', name: 'Lamps & Lighting', count: 8 },
  { id: 'bowls', name: 'Bowls & Dishes', count: 7 },
  { id: 'stools', name: 'Stools & Seats', count: 5 },
]

const sortOptions = [
  { id: 'newest', name: 'Newest First' },
  { id: 'name', name: 'Name: A to Z' },
]

const products = [
  {
    id: 1,
    name: 'Antique Ceramic Amphora Planter',
    code: 'AUV114',
    category: 'planters',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400',
    isNew: true,
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 2,
    name: 'Bubble Cylinder Atlantic Planter',
    code: 'AUV026',
    category: 'planters',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
    isNew: true,
    rating: 4.6,
    reviews: 18,
  },
  {
    id: 3,
    name: 'Big Round Brown Rustic Bowl',
    code: 'AUP051',
    category: 'bowls',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400',
    isNew: false,
    rating: 4.9,
    reviews: 32,
  },
  {
    id: 4,
    name: 'Bamboo Pendant Lampshade',
    code: 'AUW038',
    category: 'lamps',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400',
    isNew: true,
    rating: 4.5,
    reviews: 15,
  },
  {
    id: 5,
    name: 'Big Round Brown Rustic Jar',
    code: 'AUP050',
    category: 'vases',
    image: 'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400',
    isNew: false,
    rating: 4.7,
    reviews: 28,
  },
  {
    id: 6,
    name: 'Brushed Stainless Steel Planter',
    code: 'AUM007',
    category: 'planters',
    image: 'https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=400',
    isNew: false,
    rating: 4.8,
    reviews: 21,
  },
  {
    id: 7,
    name: 'Ceramic Decorative Stool',
    code: 'AUD079',
    category: 'stools',
    image: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400',
    isNew: false,
    rating: 4.9,
    reviews: 45,
  },
  {
    id: 8,
    name: 'Classic Terracotta Pots',
    code: 'AUT022',
    category: 'planters',
    image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400',
    isNew: false,
    rating: 4.4,
    reviews: 56,
  },
  {
    id: 9,
    name: 'Handwoven Bamboo Storage Basket',
    code: 'AUB092',
    category: 'bowls',
    image: 'https://images.unsplash.com/photo-1595265677860-9a316d8457d6?w=400',
    isNew: true,
    rating: 4.7,
    reviews: 19,
  },
  {
    id: 10,
    name: 'Rustic Clay Flower Vase',
    code: 'AUV203',
    category: 'vases',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400',
    isNew: false,
    rating: 4.6,
    reviews: 23,
  },
  {
    id: 11,
    name: 'Modern Geometric Planter Set',
    code: 'AUP167',
    category: 'planters',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400',
    isNew: true,
    rating: 4.8,
    reviews: 12,
  },
  {
    id: 12,
    name: 'Vintage Woven Pendant Light',
    code: 'AUW089',
    category: 'lamps',
    image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400',
    isNew: false,
    rating: 4.9,
    reviews: 34,
  },
]

export default function Production() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.code.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name)
      default: return b.id - a.id
    }
  })

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TopBar />
      <Navigation />
      <Breadcrumb />

      {/* Hero Section */}
      <div className="bg-[#5c4a3d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Products</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover our handcrafted collection of ceramic planters, vases, and home decor items made with love and tradition.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8b6914] text-[#5c4a3d]"
            />
          </div>

          {/* Sort & View Toggle */}
          <div className="flex gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white border rounded-lg hover:bg-gray-50"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort products"
                className="appearance-none bg-white border rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#8b6914] text-[#5c4a3d] cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* View Toggle */}
            <div className="flex bg-white border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-[#8b6914] text-white' : 'hover:bg-gray-50'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-[#8b6914] text-white' : 'hover:bg-gray-50'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 ${isMobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-bold text-[#5c4a3d] mb-4 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      type="button"
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between py-2 px-3 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-[#8b6914] text-white'
                          : 'hover:bg-gray-100 text-gray-600'
                      }`}
                    >
                      <span>{category.name}</span>
                      <span className={`text-sm ${selectedCategory === category.id ? 'text-white/80' : 'text-gray-400'}`}>
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </aside>

          {/* Product Grid/List */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-4 text-gray-600">
              Showing {sortedProducts.length} of {products.length} products
            </div>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-[#5c4a3d] mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {sortedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${String(product.id)}`}
                    className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative overflow-hidden bg-gray-100 ${
                      viewMode === 'list' ? 'w-48 h-48 shrink-0' : 'aspect-square'
                    }`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.isNew && (
                        <span className="absolute top-3 left-3 bg-[#8b6914] text-white text-xs font-bold px-3 py-1 rounded-full">
                          NEW
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-xs text-gray-500">{product.code}</p>
                        {product.rating > 0 && (
                          <div className="flex items-center gap-1 text-sm">
                            <span className="text-yellow-500">★</span>
                            <span className="text-gray-600">{product.rating}</span>
                            <span className="text-gray-400">({product.reviews})</span>
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium text-[#5c4a3d] mb-2 line-clamp-2 group-hover:text-[#8b6914] transition-colors">
                        {product.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <div className="mt-12 flex justify-center">
                <div className="flex items-center gap-2">
                  <button 
                    type="button"
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-600 disabled:opacity-50"
                    disabled
                  >
                    Previous
                  </button>
                  <button 
                    type="button"
                    className="w-10 h-10 rounded-lg bg-[#8b6914] text-white font-medium"
                  >
                    1
                  </button>
                  <button 
                    type="button"
                    className="w-10 h-10 rounded-lg border hover:bg-gray-50 text-gray-600"
                  >
                    2
                  </button>
                  <button 
                    type="button"
                    className="w-10 h-10 rounded-lg border hover:bg-gray-50 text-gray-600"
                  >
                    3
                  </button>
                  <span className="text-gray-400">...</span>
                  <button 
                    type="button"
                    className="w-10 h-10 rounded-lg border hover:bg-gray-50 text-gray-600"
                  >
                    8
                  </button>
                  <button 
                    type="button"
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-600"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
