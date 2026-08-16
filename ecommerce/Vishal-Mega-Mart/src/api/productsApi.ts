import axios from 'axios';
import type { Product } from '../types';

const API_URL = 'https://dummyjson.com/products';

interface DummyJsonProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews: any[];
}

interface DummyJsonResponse {
  products: DummyJsonProduct[];
  total: number;
  skip: number;
  limit: number;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get<DummyJsonResponse>(`${API_URL}?limit=100`);
    
    return response.data.products.map((product) => ({
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      rating: product.rating,
      reviewCount: product.reviews?.length || Math.floor(Math.random() * 500) + 10,
      image: product.thumbnail,
      images: product.images || [],
      description: product.description,
      stock: product.stock || 0,
      brand: product.brand,
      reviews: product.reviews
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<Product> => {
  try {
    const response = await axios.get<DummyJsonProduct>(`${API_URL}/${id}`);
    const product = response.data;
    
    return {
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      rating: product.rating,
      reviewCount: product.reviews?.length || 0,
      image: product.thumbnail,
      images: product.images || [],
      description: product.description,
      stock: product.stock || 0,
      brand: product.brand,
      reviews: product.reviews
    };
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};
