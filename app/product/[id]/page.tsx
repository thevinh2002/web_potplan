import ProductDetailClient from './ProductDetailClient'

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

export function generateStaticParams() {
  return productCategories.map((product) => ({
    id: product.id,
  }))
}

interface PageProps {
  params: { id: string }
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = productCategories.find(p => p.id === params.id)
  return <ProductDetailClient product={product} />
}
