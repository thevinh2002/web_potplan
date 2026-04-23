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
      className={`bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-gray-100 ${
          viewMode === "list" ? "w-48 h-48 shrink-0" : "aspect-square"
        }`}
      >
        <img
          src={product.image_cover}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-[#8b6914] text-white text-xs font-bold px-3 py-1 rounded-full">
            {newLabel}
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
  );
}
