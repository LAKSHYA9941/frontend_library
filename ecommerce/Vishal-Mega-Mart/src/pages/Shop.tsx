import React, { useState, useMemo, useEffect } from 'react';
import { products } from '../data/products';
import { useDebounce } from '../hooks/useDebounce';
import { filterAndSortProducts } from '../utils/filterProducts';
import type { SortOption } from '../utils/filterProducts';
import { ShopToolbar } from '../components/shop/ShopToolbar';
import { ProductGrid } from '../components/shop/ProductGrid';
import { Skeleton } from '../components/ui/Skeleton';

const ITEMS_PER_PAGE = 20;

const Shop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string>('All Categories');
  const [sortBy, setSortBy] = useState<SortOption>('Featured');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load for skeleton demonstration
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

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
      <div className="border-b-4 border-ink pb-4">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter inline-block bg-lemon px-4 py-2 border-4 border-ink shadow-brutal mb-2">
          All Products
        </h1>
        <p className="font-bold uppercase tracking-wide mt-2 text-ink">
          Showing {filteredProducts.length} results
        </p>
      </div>

      <ShopToolbar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      ) : (
        <ProductGrid 
          products={displayedProducts}
          hasMore={hasMore}
          onLoadMore={() => setPage(p => p + 1)}
          onClearFilters={() => {
            setSearchTerm('');
            setCategory('All Categories');
          }}
          searchTerm={searchTerm}
          category={category}
        />
      )}
    </div>
  );
};

export default Shop;
