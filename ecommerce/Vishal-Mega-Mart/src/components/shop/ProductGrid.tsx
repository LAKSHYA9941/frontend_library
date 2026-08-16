import React from 'react';
import type { Product } from '../../types';
import { ProductCard } from '../ui/ProductCard';
import { Button } from '../ui/Button';

interface ProductGridProps {
  products: Product[];
  hasMore: boolean;
  onLoadMore: () => void;
  onClearFilters: () => void;
  searchTerm: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  hasMore,
  onLoadMore,
  onClearFilters,
  searchTerm
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-neon-pink text-ink border-4 border-ink p-12 text-center shadow-brutal-lg mt-12">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">
          Nothing Found!
        </h2>
        <p className="font-bold uppercase tracking-wide text-lg mb-8 max-w-2xl mx-auto">
          Your search for "{searchTerm}" didn't match any brutal deals. Let's start fresh.
        </p>
        <Button variant="outline" className="bg-paper text-ink hover:bg-ink hover:text-paper border-ink" onClick={onClearFilters}>
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-12">
          <Button variant="primary" onClick={onLoadMore} className="!px-8">
            Load More Products
          </Button>
        </div>
      )}
    </>
  );
};
