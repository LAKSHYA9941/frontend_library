import type { Product } from '../types';

export type SortOption = 'Featured' | 'Price: Low to High' | 'Price: High to Low' | 'Rating';

export const filterAndSortProducts = (
  products: Product[],
  searchQuery: string,
  sortBy: SortOption
): Product[] => {
  let filtered = [...products];

  // 1. Filter by search query
  if (searchQuery.trim()) {
    const lowerQuery = searchQuery.toLowerCase();
    filtered = filtered.filter((p) => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.description.toLowerCase().includes(lowerQuery)
    );
  }

  // 3. Sort
  switch (sortBy) {
    case 'Price: Low to High':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'Price: High to Low':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'Rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'Featured':
    default:
      // Leave in original generated order
      break;
  }

  return filtered;
};
