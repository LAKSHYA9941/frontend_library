import { useState, useEffect } from 'react';
import type { Product } from '../types';

const STORAGE_KEY = 'vmm_recently_viewed';
const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading recently viewed from local storage', e);
    }
  }, []);

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      // Filter out the product if it already exists to move it to the front
      const filtered = prev.filter(p => p.id !== product.id);
      
      // Add to front and slice to max length
      const updated = [product, ...filtered].slice(0, MAX_ITEMS);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving recently viewed to local storage', e);
      }
      
      return updated;
    });
  };

  return { recentlyViewed, addRecentlyViewed };
};
