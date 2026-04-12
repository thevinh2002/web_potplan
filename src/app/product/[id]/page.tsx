import { ProductDetail } from "@/src/types/product";
import ProductDetailClient from "./ProductDetailClient";
import Breadcrumb from "@/src/components/common/Breadcrumb";

const productCategories: ProductDetail[] = [
  {
    id: "1",
    name: "Antique Ceramic Amphora Planter",
    productCode: "AUV114",
    category: "planters",
    rating: 4.8,
    reviews: 24,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&blur=100",
    ],
    description:
      "A beautifully crafted antique-style ceramic amphora planter, perfect for adding a touch of classical elegance to your garden or indoor space.",
  },
  {
    id: "2",
    name: "Bubble Cylinder Atlantic Planter",
    productCode: "AUV026",
    category: "planters",
    rating: 4.6,
    reviews: 18,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&blur=100",
    ],
    description:
      "Modern bubble cylinder design with an Atlantic blue finish. Ideal for contemporary home decor and outdoor spaces.",
  },
  {
    id: "3",
    name: "Big Round Brown Rustic Bowl",
    productCode: "AUP051",
    category: "bowls",
    rating: 4.9,
    reviews: 32,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400",
      "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&blur=100",
    ],
    description:
      "Handcrafted rustic bowl with a beautiful brown finish. Perfect for serving or as a decorative centerpiece.",
  },
  {
    id: "4",
    name: "Bamboo Pendant Lampshade",
    productCode: "AUW038",
    category: "lamps",
    rating: 4.5,
    reviews: 15,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&blur=100",
    ],
    description:
      "Eco-friendly bamboo pendant lampshade that brings natural warmth and soft ambient lighting to any room.",
  },
  {
    id: "5",
    name: "Big Round Brown Rustic Jar",
    productCode: "AUP050",
    category: "vases",
    rating: 4.7,
    reviews: 28,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400",
      "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=400&blur=100",
    ],
    description:
      "Large rustic jar with a timeless brown finish. A versatile piece for storage or decorative display.",
  },
  {
    id: "6",
    name: "Brushed Stainless Steel Planter",
    productCode: "AUM007",
    category: "planters",
    rating: 4.8,
    reviews: 21,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=400",
      "https://images.unsplash.com/photo-1518882605630-8eb565f5e673?w=400&blur=100",
    ],
    description:
      "Sleek brushed stainless steel planter for a modern industrial look. Durable and weather-resistant.",
  },
  {
    id: "7",
    name: "Ceramic Decorative Stool",
    productCode: "AUD079",
    category: "stools",
    rating: 4.9,
    reviews: 45,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400",
      "https://images.unsplash.com/photo-1459156212016-c812468e2115?w=400&blur=100",
    ],
    description:
      "Unique ceramic stool that doubles as a decorative piece. Handcrafted with intricate details.",
  },
  {
    id: "8",
    name: "Classic Terracotta Pots",
    productCode: "AUT022",
    category: "planters",
    rating: 4.4,
    reviews: 56,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400",
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&blur=100",
    ],
    description:
      "Traditional terracotta pots for the classic gardening enthusiast. Breathable and perfect for plant health.",
  },
  {
    id: "9",
    name: "Handwoven Bamboo Storage Basket",
    productCode: "AUB092",
    category: "bowls",
    rating: 4.7,
    reviews: 19,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1595265677860-9a316d8457d6?w=400",
      "https://images.unsplash.com/photo-1595265677860-9a316d8457d6?w=400&blur=100",
    ],
    description:
      "Sustainable handwoven bamboo basket for stylish storage solutions in any room.",
  },
  {
    id: "10",
    name: "Rustic Clay Flower Vase",
    productCode: "AUV203",
    category: "vases",
    rating: 4.6,
    reviews: 23,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400",
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&blur=100",
    ],
    description:
      "Charming rustic clay vase with natural textures. Perfect for fresh or dried flower arrangements.",
  },
  {
    id: "11",
    name: "Modern Geometric Planter Set",
    productCode: "AUP167",
    category: "planters",
    rating: 4.8,
    reviews: 12,
    isNew: true,
    images: [
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400",
      "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400&blur=100",
    ],
    description:
      "Contemporary geometric planter set featuring clean lines and modern aesthetics.",
  },
  {
    id: "12",
    name: "Vintage Woven Pendant Light",
    productCode: "AUW089",
    category: "lamps",
    rating: 4.9,
    reviews: 34,
    isNew: false,
    images: [
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400",
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&blur=100",
    ],
    description:
      "Vintage-inspired woven pendant light that adds character and warm ambiance to your space.",
  },
];

export function generateStaticParams() {
  return productCategories.map((product) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: { id: string };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = productCategories.find((p) => p.id === params.id);
  return (
    <>
      <Breadcrumb />
      <ProductDetailClient product={product} />
    </>
  );
}
