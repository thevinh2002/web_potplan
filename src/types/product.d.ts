export interface ProductDetail {
  id: string;
  name: string;
  productCode: string;
  category: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  new?: string;
  images: string[];
  description?: string;
}
