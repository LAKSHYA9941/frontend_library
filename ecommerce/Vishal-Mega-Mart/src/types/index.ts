export type Category = 'Electronics' | 'Clothing' | 'Furniture' | 'Home' | 'Sports' | 'Accessories';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
