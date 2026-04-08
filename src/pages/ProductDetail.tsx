import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const productCategories = [
  {
    id: 'fiberglass-planter',
    name: 'Fiberglass planters VAD 1019',
    productCode: 'VAD 1019',
    ingredient: 'Poly Fiberglass',
    color: 'Freedom, available, etc.',
    size: 'Freedom, available, etc.',
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&blur=100',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&sat=-100',
    ],
    description: 'For fiberglass planters, we manufacture them in a variety of standard sizes and colors. You can also request custom colors, specifications, and other details to suit your needs',
  },
  {
    id: 'fiberstone-planter',
    name: 'Fiberstone Planter',
    productCode: 'FIBERSTONE001',
    ingredient: 'Fiberstone',
    color: 'Grey, Black, White',
    size: 'Small, Medium, Large',
    images: [
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400',
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&blur=100',
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&sat=-100',
    ],
    description: 'Durable and lightweight fiberstone planters, perfect for modern outdoor spaces. Available in various finishes.',
  },
  {
    id: 'fibercement-planter',
    name: 'Fibercement Planter',
    productCode: 'FIBERCEMENT001',
    ingredient: 'Fibercement',
    color: 'Natural Grey',
    size: 'Customizable',
    images: [
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400',
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&blur=100',
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&sat=-100',
    ],
    description: 'Eco-friendly fibercement planters with a minimalist design. Ideal for both indoor and outdoor use.',
  },
  {
    id: 'basic-outdoor-pottery',
    name: 'Basic Outdoor Pottery',
    productCode: 'BASICPOT001',
    ingredient: 'Terracotta',
    color: 'Brown, Red',
    size: 'Assorted',
    images: [
      'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400',
      'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&blur=100',
      'https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&sat=-100',
    ],
    description: 'Traditional outdoor pottery, offering a classic look for any garden. Hand-crafted with natural materials.',
  },
  {
    id: 'premium-outdoor-pottery',
    name: 'Premium Outdoor Pottery',
    productCode: 'PREMIUMPOT001',
    ingredient: 'High-grade Ceramic',
    color: 'Hand-painted designs',
    size: 'Various sizes',
    images: [
      'https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=400',
      'https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=400&blur=100',
      'https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=400&sat=-100',
    ],
    description: 'Premium quality outdoor pottery with exquisite craftsmanship and design.',
  },
  {
    id: 'indoor-ceramic-planter',
    name: 'Indoor Ceramic Planter',
    productCode: 'INDOORCER001',
    ingredient: 'Ceramic',
    color: 'Modern pastel colors',
    size: 'Small, Medium',
    images: [
      'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400',
      'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&blur=100',
      'https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&sat=-100',
    ],
    description: 'Beautiful ceramic planters designed specifically for indoor spaces and home decor.',
  },
]

export default function ProductDetail() {
  const { id } = useParams()
  const product = productCategories.find(p => p.id === id)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!product) {
    return (
      <div className="min-h-screen bg-[#faf8f5] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#5c4a3d] mb-8">Product Not Found</h1>
          <p className="text-lg text-[#5c4a3d]">The product you are looking for does not exist.</p>
        </div>
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
    <div className="min-h-screen bg-[#faf8f5] py-20">
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
  )
}
