
export interface Product {
  id: string;
  name: string;

  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  stock: number;
  brand?: string;
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
  }[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
