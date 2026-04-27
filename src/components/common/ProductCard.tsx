import { Link } from "@/src/i18n/routing";
import { Product } from "@/src/types/production";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
  newLabel?: string;
}

export default function ProductCard({
  product,
  viewMode,
  newLabel,
}: ProductCardProps) {
  return (
    <Link
      href={`/product/${String(product.slug)}`}
      className={`group overflow-hidden rounded-xl transition-all duration-300 ${
        viewMode === "list" 
          ? "flex bg-white shadow-md hover:shadow-xl border border-gray-100" 
          : "bg-white shadow-lg hover:shadow-2xl border border-gray-100 hover:border-[#8b6914]"
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#faf8f5] to-[#f0ebe0] flex items-center justify-center ${
          viewMode === "list" ? "w-48 h-48 shrink-0" : "aspect-square"
        }`}
      >
        <img
          src={product.image_cover}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 p-3"
        />
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-[#8b6914] to-[#a67c1e] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
            {newLabel}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-100 px-2.5 py-1 rounded-md">
              {product.code}
            </p>
            {product.rating > 0 && (
              <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md">
                <span className="text-yellow-500 text-sm">★</span>
                <span className="text-gray-700 font-semibold text-sm">{product.rating}</span>
                <span className="text-gray-400 text-xs">({product.reviews})</span>
              </div>
            )}
          </div>
          <h3 className="font-bold text-[#5c4a3d] mb-2 line-clamp-2 group-hover:text-[#8b6914] transition-colors text-sm">
            {product.name}
          </h3>
        </div>
        
        {/* Hover action indicator */}
        <div className="mt-2 text-xs text-[#8b6914] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
          View Details →
        </div>
      </div>
    </Link>
  );
}
