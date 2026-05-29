export interface Categories {
  id: string;
  name: string;
  count?: number;
}

export interface Sort {
  id: string;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  code: string;
  category: string;
  categoryCode: string;
  image_cover: string;
  isNew: boolean;
  new: string;
  rating: number;
  reviews: number;
  slug: string;
}

// interface Product {
//   id: string;
//   code: string;
//   category: string;
//   image_cover: string;
//   images: string[];
//   colors: string;
//   sizes: string;
//   ingredients: string;
//   is_new: boolean;
//   rating: number;
//   review: number;
//   translations: {
//     vi: { name: string; description: string; new?: string; slug?: string };
//     en: { name: string; description: string; new?: string; slug?: string };
//   };
//   createdAt: string;
//   updatedAt: string;
// }