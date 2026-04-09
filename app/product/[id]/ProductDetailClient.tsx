'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import TopBar from '../../../src/components/TopBar'
import Navigation from '../../../src/components/Navigation'
import Footer from '../../../src/components/Footer'

interface Product {
  id: string
  name: string
  productCode: string
  ingredient: string
  color: string
  size: string
  images: string[]
  description: string
}

interface ProductDetailClientProps {
  product: Product | undefined
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <TopBar />
        <Navigation />
        <div className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-[#5c4a3d] mb-8">Product Not Found</h1>
            <p className="text-lg text-[#5c4a3d]">The product you are looking for does not exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <TopBar />
      <Navigation />
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="relative">
              <div className="relative overflow-hidden rounded-lg aspect-square bg-white">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
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
                      className={`w-3 h-3 rounded-full ${idx === currentImageIndex ? 'bg-[#8b6914]' : 'bg-gray-300'}`}
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
              <h1 className="text-4xl font-bold text-[#5c4a3d] mb-4">{product.name}</h1>

              <div className="space-y-3 mb-6">
                <div className="flex">
                  <span className="w-40 font-semibold text-[#5c4a3d]">Product Code:</span>
                  <span className="text-[#5c4a3d]">{product.productCode}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-semibold text-[#5c4a3d]">Ingredient:</span>
                  <span className="text-[#5c4a3d]">{product.ingredient}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-semibold text-[#5c4a3d]">Color:</span>
                  <span className="text-red-600">{product.color}</span>
                </div>
                <div className="flex">
                  <span className="w-40 font-semibold text-[#5c4a3d]">Size:</span>
                  <span className="text-red-600">{product.size}</span>
                </div>
              </div>

              <button className="bg-[#8b6914] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#7a5c12] transition-colors mb-6 w-fit">
                Contact us
              </button>

              <p className="text-lg text-[#5c4a3d] leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
