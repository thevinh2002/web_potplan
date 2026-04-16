export interface Categories {
  id: string;
  name: string;
  count: number;
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
  image: string;
  isNew: boolean;
  new: string;
  rating: number;
  reviews: number;
}
