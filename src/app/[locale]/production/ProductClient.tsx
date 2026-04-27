"use client";

import { useState, useMemo } from "react";
import Pagination from "@/src/components/common/Pagination";
import ProductCard from "@/src/components/common/ProductCard";
import SidebarFilter from "@/src/components/common/SidebarFilter";
import SearchInput from "@/src/components/common/SearchInput";
import SortAndToggleBar from "@/src/components/common/SortAndToggleBar";
import { Search } from "lucide-react";
import { Categories, Product, Sort } from "@/src/types/production";
import { useTranslations } from "next-intl";

export default function ProductionClient({
  initialProducts,
  initialCategories,
}: {
  initialProducts: Product[];
  initialCategories: Categories[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const t = useTranslations("production");
  const sortOptions: Sort[] = t.raw("sort.options");
  const formattedCategories: Categories[] = [
    {
      id: "all",
      name:
        t.raw("filter.categories")[0].id === "all"
          ? "All Products"
          : "Tất cả sản phẩm",
      count: initialCategories.length,
    },
    ...initialCategories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      count: cat.count,
    })),
  ];

  const filteredProducts = initialProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.categoryCode === selectedCategory;
    const matchesSearch =
      (product.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.code || "").toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return (a.name || "").localeCompare(b.name || "");
      default:
        return 0;
    }
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedProducts.slice(startIndex, endIndex);
  }, [sortedProducts, currentPage]);

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Hero Section */}
      <div className="bg-[#5c4a3d] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {t("hero.description")}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder={t("search.placeholder")}
          />

          <SortAndToggleBar
            isMobileFilterOpen={isMobileFilterOpen}
            setIsMobileFilterOpen={setIsMobileFilterOpen}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOptions={sortOptions}
            viewMode={viewMode}
            setViewMode={setViewMode}
            titleMobile={t("sort.filter")}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <SidebarFilter
            categories={formattedCategories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isMobileFilterOpen={isMobileFilterOpen}
            title={t("filter.title")}
          />

          <div className="flex-1">
            <div className="mb-4 text-gray-600">
              {t("results.showing")} {(currentPage - 1) * 6 + 1}{" "}
              {t("results.to")}{" "}
              {Math.min(currentPage * 6, sortedProducts.length)}{" "}
              {t("results.of")} {sortedProducts.length} {t("results.products")}
            </div>

            {sortedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-lg">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-[#5c4a3d] mb-2">
                  {t("empty.title")}
                </h3>
                <p className="text-gray-500">{t("empty.desc")}</p>
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
                    newLabel={product.new}
                  />
                ))}
              </div>
            )}

            {sortedProducts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={goToPage}
                onNext={nextPage}
                onPrev={prevPage}
                previousText={t("pagination.pre")}
                nextText={t("pagination.next")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
