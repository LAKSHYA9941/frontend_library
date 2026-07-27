import { products } from './products';
import type { Category } from '../types';

export interface CategoryInfo {
  name: Category;
  count: number;
}

export const categories: CategoryInfo[] = [
  'Electronics',
  'Clothing',
  'Furniture',
  'Home',
  'Sports',
  'Accessories'
].map((name) => ({
  name: name as Category,
  count: products.filter(p => p.category === name).length
}));
