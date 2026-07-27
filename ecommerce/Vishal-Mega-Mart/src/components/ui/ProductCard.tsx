import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Badge, BadgeCategory } from './Badge';
import { Button } from './Button';
import { Card } from './Card';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  let badgeCat = product.category.toLowerCase() as BadgeCategory;
  if (badgeCat === ('furniture' as any)) badgeCat = 'home';
  if (!['electronics', 'clothing', 'home', 'sports', 'accessories'].includes(badgeCat)) {
    badgeCat = 'accessories';
  }

  return (
    <Card className="flex flex-col h-full hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#0D0D0D] transition-all p-4 gap-4 bg-paper !border-4 !shadow-brutal-sm">
      <div className="relative border-4 border-ink overflow-hidden bg-white aspect-square">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover" 
          loading="lazy"
        />
        <div className="absolute top-2 left-2">
          <Badge category={badgeCat} label={product.category} />
        </div>
      </div>
      
      <div className="flex flex-col flex-grow justify-between gap-4">
        <div>
          <h3 className="font-bold uppercase tracking-wide text-lg line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <div className="bg-lemon px-2 py-1 border-2 border-ink text-xs font-bold flex items-center gap-1 shadow-[2px_2px_0px_0px_#0D0D0D]">
              <span className="text-ink">★ {product.rating}</span>
            </div>
            <span className="text-xs font-bold text-ink/70 uppercase">({product.reviewCount} reviews)</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold font-heading tracking-tighter">${product.price.toFixed(2)}</span>
          <Button 
            variant={isAdded ? 'secondary' : 'primary'} 
            className={`!px-4 !py-2 !text-sm transition-all ${isAdded ? 'bg-lime-green' : ''}`}
            onClick={handleAdd}
          >
            {isAdded ? 'Added!' : 'Add'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
