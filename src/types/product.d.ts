export interface ProductDetail {
  id: string;
  name: string;
  productCode: string;
  category: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  images: string[];
  description?: string;
}
