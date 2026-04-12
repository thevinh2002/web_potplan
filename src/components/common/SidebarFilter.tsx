import { Filter } from "lucide-react";
import { Categories } from "@/src/types/production";

interface SidebarFilterProps {
  categories: Categories[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isMobileFilterOpen: boolean;
}

export default function SidebarFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  isMobileFilterOpen,
}: SidebarFilterProps) {
  return (
    <aside
      className={`lg:w-64 shrink-0 ${isMobileFilterOpen ? "block" : "hidden lg:block"}`}
    >
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
                    ? "bg-[#8b6914] text-white"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <span>{category.name}</span>
                <span
                  className={`text-sm ${
                    selectedCategory === category.id
                      ? "text-white/80"
                      : "text-gray-400"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
