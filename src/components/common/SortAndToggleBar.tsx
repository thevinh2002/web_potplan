import { SlidersHorizontal, ChevronDown, Grid3X3, List } from "lucide-react";
import { Sort } from "@/src/types/production";

interface SortAndToggleBarProps {
  isMobileFilterOpen: boolean;
  setIsMobileFilterOpen: (open: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  sortOptions: Sort[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export default function SortAndToggleBar({
  isMobileFilterOpen,
  setIsMobileFilterOpen,
  sortBy,
  setSortBy,
  sortOptions,
  viewMode,
  setViewMode,
}: SortAndToggleBarProps) {
  return (
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
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      {/* View Toggle */}
      <div className="flex bg-white border rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setViewMode("grid")}
          className={`p-3  ${viewMode === "grid" ? "bg-[#8b6914] text-white" : "hover:bg-gray-50 text-[#8b6914]"}`}
        >
          <Grid3X3 className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={() => setViewMode("list")}
          className={`p-3 ${viewMode === "list" ? "bg-[#8b6914] text-white" : "hover:bg-gray-50 text-[#8b6914]"}`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
