import React, { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/productsApi';
import { useDebounce } from '../hooks/useDebounce';
import { filterAndSortProducts } from '../utils/filterProducts';
import type { SortOption } from '../utils/filterProducts';
import { ShopToolbar } from '../components/shop/ShopToolbar';
import { ProductGrid } from '../components/shop/ProductGrid';
import { Skeleton } from '../components/ui/Skeleton';

const ITEMS_PER_PAGE = 20;

const Shop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [sortBy, setSortBy] = useState<SortOption>('Featured');
  const [page, setPage] = useState(1);
  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredProducts = useMemo(() => {
    return filterAndSortProducts(products, debouncedSearchTerm, sortBy);
  }, [products, debouncedSearchTerm, sortBy]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, page * ITEMS_PER_PAGE);
  }, [filteredProducts, page]);

  const hasMore = displayedProducts.length < filteredProducts.length;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, sortBy]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="border-b-2 border-ink pb-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-2">
          All Products
        </h1>
        <p className="font-medium uppercase tracking-widest mt-2 text-ink/60 text-sm">
          Showing {filteredProducts.length} results
        </p>
      </div>

      <ShopToolbar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mt-8">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-none" />
          ))}
        </div>
      ) : isError ? (
        <div className="bg-red-50 text-red-600 border-2 border-red-600 p-12 text-center mt-12">
          <h2 className="text-2xl font-bold uppercase tracking-widest">Error loading products</h2>
        </div>
      ) : (
        <div className="mt-8">
          <ProductGrid 
            products={displayedProducts}
            hasMore={hasMore}
            onLoadMore={() => setPage(p => p + 1)}
            onClearFilters={() => {
              setSearchTerm('');
            }}
            searchTerm={searchTerm}
          />
        </div>
      )}
    </div>
  );
};

export default Shop;
