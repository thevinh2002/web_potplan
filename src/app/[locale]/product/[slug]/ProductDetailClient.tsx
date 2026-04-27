"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductDetail } from "@/src/types/product";
import ContactButton from "@/src/components/ui/ContactButton";

interface ProductDetailClientProps {
  codeText: string;
  reviewText: string;
  categoryText: string;
  contactText: string;
  colorText:String;
  SizeText:String;
  ingredientText: string;
  product: ProductDetail | undefined;
}

export default function ProductDetailClient({
  codeText,
  reviewText,
  categoryText,
  contactText,
  colorText,
  SizeText,
  ingredientText,
  product,
}: ProductDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!product || product.images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Chuyển hình mỗi 5 giây

    return () => clearInterval(interval);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-[#5c4a3d] mb-8">
              Product Not Found
            </h1>
            <p className="text-lg text-[#5c4a3d]">
              The product you are looking for does not exist.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg aspect-[4/5] bg-[#faf8f5] flex items-center justify-center">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain transition-opacity duration-300"
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={handlePrevImage}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-[#5c4a3d]" />
                </button>
                <div className="flex gap-2">
                  {product.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-3 h-3 rounded-full ${idx === currentImageIndex ? "bg-[#8b6914]" : "bg-gray-300"}`}
                    ></div>
                  ))}
                </div>
                <button
                  onClick={handleNextImage}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-[#5c4a3d]" />
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                {product.isNew && (
                  <span className="bg-[#8b6914] text-white text-xs font-bold px-3 py-1 rounded-full">
                    {product.newLabel}
                  </span>
                )}
                <span className="text-sm text-gray-500 uppercase tracking-wide">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-[#5c4a3d] mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="font-semibold text-[#5c4a3d]">
                    {product.rating}
                  </span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-500">
                  {product.reviews} {reviewText}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex">
                  <span className="w-32 font-semibold text-[#5c4a3d]">
                    {codeText}
                  </span>
                  <span className="text-[#5c4a3d]">{product.code}</span>
                </div>
                {/* <div className="flex">
                  <span className="w-32 font-semibold text-[#5c4a3d]">
                    {categoryText}
                  </span>
                  <span className="text-[#5c4a3d] capitalize">
                    {product.category}
                  </span>
                </div> */}
                {product.ingredients && (
                  <div className="flex">
                    <span className="w-32 font-semibold text-[#5c4a3d] ">
                      {ingredientText}
                    </span>
                    <span className="text-[#5c4a3d]">
                      {product.ingredients}
                    </span>
                  </div>
                )}
                {product.colors && (
                  <div className="flex">
                    <span className="w-32 font-semibold text-[#5c3d3d]">
                      {colorText}
                    </span>
                    <span className="text-[#f30000]">{product.colors}</span>
                  </div>
                )}
                {product.sizes && (
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#5c4a3d] mb-1">
                      {SizeText}
                    </span>
                    <span className="text-[#f30000] text-sm whitespace-pre-wrap">
                      {product.sizes}
                    </span>
                  </div>
                )}
                
              </div>

              <ContactButton text={contactText} className="mb-6 w-fit px-8" />

              <p className="text-lg text-[#5c4a3d] leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
