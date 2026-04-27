export interface ProductDetail {
  id: string;
  name: string;
  code: string;
  category: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  newLabel?: string;
  images: string[];
  description?: string;
  slug: string;
  colors?: string;
  sizes?: string;
  ingredients?: string;
}
