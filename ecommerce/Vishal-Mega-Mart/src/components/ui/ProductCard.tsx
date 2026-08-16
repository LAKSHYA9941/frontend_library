import React, { useState } from 'react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { Card } from './Card';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1000);
  };

  return (
    <Card 
      className="flex flex-col h-full hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-brutal-lg transition-all p-4 gap-4 bg-paper cursor-pointer group"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative border-2 border-ink overflow-hidden bg-white aspect-square">
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500" 
          loading="lazy"
        />
      </div>
      
      <div className="flex flex-col flex-grow justify-between gap-4">
        <div>
          <h3 className="font-bold uppercase tracking-wide text-lg line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            <div className="bg-ink px-2 py-1 text-paper text-xs font-bold flex items-center gap-1">
              <span>★ {product.rating}</span>
            </div>
            <span className="text-xs font-bold text-ink/70 uppercase">({product.reviewCount} reviews)</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto gap-4">
          <span className="text-2xl font-bold font-heading tracking-tighter">${product.price.toFixed(2)}</span>
          <Button 
            variant={isAdded ? 'secondary' : 'primary'} 
            className={`!px-4 !py-2 !text-sm transition-all ${isAdded ? 'bg-green-600 text-white hover:bg-green-600 border-green-600' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleAdd();
            }}
          >
            {isAdded ? 'Added!' : 'Add'}
          </Button>
        </div>
      </div>
    </Card>
  );
};
