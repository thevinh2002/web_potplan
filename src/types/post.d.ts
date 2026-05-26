export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
  size:string;
}

export interface PostInput {
  slug?: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
  size:string;
}
