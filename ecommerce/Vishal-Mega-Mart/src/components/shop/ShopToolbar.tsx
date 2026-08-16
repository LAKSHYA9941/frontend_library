import React from 'react';
import { Input } from '../ui/Input';
import type { SortOption } from '../../utils/filterProducts';
import { Search } from 'lucide-react';

interface ShopToolbarProps {
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  sortBy: SortOption;
  setSortBy: (v: SortOption) => void;
}

export const ShopToolbar: React.FC<ShopToolbarProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy
}) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 bg-gray-50 dark:bg-gray-900 border-2 border-ink p-4 md:p-6 shadow-brutal transition-colors">
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-ink/50" />
        </div>
        <Input 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="!pl-12 !border-2 !border-ink shadow-sm focus:shadow-brutal bg-white dark:bg-black transition-colors"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <select 
          className="border-2 border-ink bg-white dark:bg-black text-ink px-4 py-3 font-bold uppercase tracking-wide focus:outline-none focus:border-ink cursor-pointer rounded-none shadow-sm focus:shadow-brutal transition-all"
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
