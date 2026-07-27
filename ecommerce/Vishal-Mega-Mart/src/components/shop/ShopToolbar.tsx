import React from 'react';
import { Input } from '../ui/Input';
import { categories } from '../../data/categories';
import type { SortOption } from '../../utils/filterProducts';

interface ShopToolbarProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  sortBy: SortOption;
  setSortBy: (v: SortOption) => void;
}

export const ShopToolbar: React.FC<ShopToolbarProps> = ({
  searchTerm,
  setSearchTerm,
  category,
  setCategory,
  sortBy,
  setSortBy
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-ink p-4 md:p-6 shadow-brutal-lg">
      <div className="flex-1">
        <Input 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="!border-0 shadow-none focus:shadow-none bg-paper"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <select 
          className="border-3 border-ink bg-paper px-4 py-3 font-bold uppercase tracking-wide focus:outline-none focus:border-neon-blue cursor-pointer rounded-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All Categories">All Categories</option>
          {categories.map(c => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
        <select 
          className="border-3 border-ink bg-paper px-4 py-3 font-bold uppercase tracking-wide focus:outline-none focus:border-neon-blue cursor-pointer rounded-none"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
        >
          <option value="Featured">Sort: Featured</option>
          <option value="Price: Low to High">Price: Low to High</option>
          <option value="Price: High to Low">Price: High to Low</option>
          <option value="Rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
};
