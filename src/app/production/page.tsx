"use client";

import { useState } from "react";
import Breadcrumb from "@/src/components/common/Breadcrumb";
import Pagination from "@/src/components/common/Pagination";
import ProductCard from "@/src/components/common/ProductCard";
import SidebarFilter from "@/src/components/common/SidebarFilter";
import SearchInput from "@/src/components/common/SearchInput";
import SortAndToggleBar from "@/src/components/common/SortAndToggleBar";
import { usePagination } from "@/src/hooks/usePagination";
import { Search } from "lucide-react";
import { Categories, Product, Sort } from "@/src/types/production";

const categories: Categories[] = [
  { id: "all", name: "All Products", count: 48 },
  { id: "planters", name: "Planters & Pots", count: 16 },
  { id: "vases", name: "Vases & Jars", count: 12 },
  { id: "lamps", name: "Lamps & Lighting", count: 8 },
  { id: "bowls", name: "Bowls & Dishes", count: 7 },
  { id: "stools", name: "Stools & Seats", count: 5 },
];

const sortOptions: Sort[] = [
  { id: "newest", name: "Newest First" },
  { id: "name", name: "Name: A to Z" },
];

const products: Product[] = [
  {
    id: 1,
    name: "Antique Ceramic Amphora Planter",
    code: "AUV114",
    category: "planters",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400",
    isNew: true,
    rating: 4.8,
    reviews: 24,
  },
  {
    id: 2,
    name: "Bubble Cylinder Atlantic Planter",
    code: "AUV026",
    category: "planters",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
    isNew: true,
    rating: 4.6,
    reviews: 18,
  },
  {
    id: 3,
    name: "Big Round Brown Rustic Bowl",
    code: "AUP051",
    category: "bowls",
    image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400",
    isNew: false,
    rating: 4.9,
    reviews: 32,
  },
  {
    id: 4,
    name: "Bamboo Pendant Lampshade",
    code: "AUW038",
    category: "lamps",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400",
    isNew: true,
    rating: 4.5,
    reviews: 15,
  },
  {
    id: 5,
    name: "Big Round Brown Rustic Jar",
    code: "AUP050",
    category: "vases",
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400",
    isNew: false,
    rating: 4.7,
    reviews: 28,
  },
  {
    id: 6,
    name: "Brushed Stainless Steel Planter",
    code: "AUM007",
    category: "planters",
    image: "https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=400",
    isNew: false,
    rating: 4.8,
    reviews: 21,
  },
  {
    id: 7,
    name: "Ceramic Decorative Stool",
    code: "AUD079",
    category: "stools",
    image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400",
    isNew: false,
    rating: 4.9,
    reviews: 45,
  },
  {
    id: 8,
    name: "Classic Terracotta Pots",
    code: "AUT022",
    category: "planters",
    image: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400",
    isNew: false,
    rating: 4.4,
    reviews: 56,
  },
  {
    id: 9,
    name: "Handwoven Bamboo Storage Basket",
    code: "AUB092",
    category: "bowls",
    image: "https://images.unsplash.com/photo-1595265677860-9a316d8457d6?w=400",
    isNew: true,
    rating: 4.7,
    reviews: 19,
  },
  {
    id: 10,
    name: "Rustic Clay Flower Vase",
    code: "AUV203",
    category: "vases",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400",
    isNew: false,
    rating: 4.6,
    reviews: 23,
  },
  {
    id: 11,
    name: "Modern Geometric Planter Set",
    code: "AUP167",
    category: "planters",
    image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400",
    isNew: true,
    rating: 4.8,
    reviews: 12,
  },
  {
    id: 12,
    name: "Vintage Woven Pendant Light",
    code: "AUW089",
    category: "lamps",
    image: "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400",
    isNew: false,
    rating: 4.9,
    reviews: 34,
  },
];

export default function Production() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return b.id - a.id;
    }
  });

  const { currentPage, totalPages, currentData, goToPage, nextPage, prevPage } =
    usePagination({ data: sortedProducts, itemsPerPage: 6 });

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Breadcrumb />

      {/* Hero Section */}
      <div className="bg-[#5c4a3d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover our handcrafted collection of ceramic planters, vases, and
            home decor items made with love and tradition.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          {/* Sort & View Toggle */}
          <SortAndToggleBar
            isMobileFilterOpen={isMobileFilterOpen}
            setIsMobileFilterOpen={setIsMobileFilterOpen}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOptions={sortOptions}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <SidebarFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isMobileFilterOpen={isMobileFilterOpen}
          />

          {/* Product Grid/List */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-4 text-gray-600">
              Showing {(currentPage - 1) * 6 + 1} to{" "}
              {Math.min(currentPage * 6, sortedProducts.length)} of{" "}
              {sortedProducts.length} products
            </div>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-[#5c4a3d] mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {currentData.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                onNext={nextPage}
                onPrev={prevPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
