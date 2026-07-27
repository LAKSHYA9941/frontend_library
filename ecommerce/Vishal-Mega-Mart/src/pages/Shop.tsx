import React, { useState, useMemo, useEffect } from 'react';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { ProductCard } from '../components/ui/ProductCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useDebounce } from '../hooks/useDebounce';
import { filterAndSortProducts, SortOption } from '../utils/filterProducts';

const ITEMS_PER_PAGE = 20;

const Shop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string>('All Categories');
  const [sortBy, setSortBy] = useState<SortOption>('Featured');
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, debouncedSearchTerm, category, sortBy);
  }, [debouncedSearchTerm, category, sortBy]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredProducts, page]);

  const hasMore = displayedProducts.length < filteredProducts.length;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, category, sortBy]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="border-b-4 border-ink pb-4">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter inline-block bg-lemon px-4 py-2 border-4 border-ink shadow-[4px_4px_0px_0px_#0D0D0D] mb-2">
          All Products
        </h1>
        <p className="font-bold uppercase tracking-wide mt-2 text-ink">
          Showing {filteredProducts.length} results
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 bg-ink p-4 md:p-6 shadow-[8px_8px_0px_0px_#0D0D0D]">
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

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {displayedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {/* Pagination / Load More */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <Button variant="primary" onClick={() => setPage(p => p + 1)} className="!px-8">
                Load More Products
              </Button>
            </div>
          )}
        </>
      ) : (
        /* Empty State */
        <div className="bg-neon-pink text-ink border-4 border-ink p-12 text-center shadow-[8px_8px_0px_0px_#0D0D0D] mt-12">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
            Nothing Found!
          </h2>
          <p className="font-bold uppercase tracking-wide text-lg mb-8 max-w-2xl mx-auto">
            Your search for "{searchTerm}" in {category} didn't match any brutal deals. Let's start fresh.
          </p>
          <Button variant="outline" className="bg-paper text-ink" onClick={() => {
            setSearchTerm('');
            setCategory('All Categories');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default Shop;
