import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../app/store';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { getGreeting } from '../utils/greeting';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api/productsApi';
import type { Product } from '../types';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { cartCount, cartTotal, addToCart } = useCart();
  const navigate = useNavigate();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const greeting = getGreeting();
  const userName = user?.name || 'Guest';

  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const newArrivals = [...products].reverse().slice(0, 5);

  const handleQuickAdd = (product: Product) => {
    addToCart(product);
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-12 h-12 border-2 border-gray-200 dark:border-gray-800 border-t-ink rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-24 pb-24 px-4 sm:px-6 lg:px-8 mt-12">
      
      {/* 1. Welcome Hero Banner */}
      <section className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Left: Text & Buttons */}
        <div className="flex-1 bg-ink text-paper p-10 md:p-16 border-2 border-ink shadow-brutal-lg flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-paper/5 rounded-full blur-3xl group-hover:bg-paper/10 transition-colors duration-1000"></div>
          
          <h1 className="text-5xl md:text-7xl font-bold uppercase mb-6 tracking-tighter leading-[1.1] relative z-10">
            Good {greeting},<br />
            <span className="text-gray-300 dark:text-gray-400">{userName}.</span>
          </h1>
          <p className="text-lg md:text-xl font-medium tracking-wide mb-10 max-w-xl text-paper/80 relative z-10">
            Elevate your lifestyle. Discover curated collections designed for those who appreciate the details.
          </p>
          <div className="flex flex-wrap gap-4 relative z-10">
            <Button variant="outline" className="bg-paper text-ink border-paper hover:bg-transparent hover:text-paper shadow-none hover:shadow-none" onClick={() => navigate('/shop')}>
              Explore Collection
            </Button>
          </div>
        </div>

        {/* Right: Stat Cards */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <Card className="bg-gray-100 dark:bg-gray-900 flex-1 flex flex-col justify-center border-2 border-ink shadow-brutal transition-colors">
            <h3 className="text-5xl font-bold mb-2 tracking-tighter">{products.length}</h3>
            <p className="text-sm font-bold uppercase tracking-widest text-ink/60">Curated Pieces</p>
          </Card>
          <Card className="bg-gray-50 dark:bg-gray-800 flex-1 flex flex-col justify-center border-2 border-ink shadow-brutal transition-colors">
            <h3 className="text-5xl font-bold mb-2 tracking-tighter">$50</h3>
            <p className="text-sm font-bold uppercase tracking-widest text-ink/60">Complimentary Shipping Over</p>
          </Card>
        </div>
      </section>

      {/* 2. Four small live stat cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="flex flex-col items-center justify-center p-8 text-center hover:-translate-y-1 transition-transform cursor-default group">
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-ink/50 group-hover:text-ink transition-colors">Cart Items</p>
          <p className="text-4xl font-bold tracking-tighter">{cartCount}</p>
        </Card>
        <Card className="flex flex-col items-center justify-center p-8 text-center hover:-translate-y-1 transition-transform cursor-default group">
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-ink/50 group-hover:text-ink transition-colors">Cart Value</p>
          <p className="text-4xl font-bold tracking-tighter">${cartTotal.toFixed(2)}</p>
        </Card>
        <Card className="flex flex-col items-center justify-center p-8 text-center hover:-translate-y-1 transition-transform cursor-default group">
          <p className="text-xs font-bold uppercase tracking-widest mb-3 text-ink/50 group-hover:text-ink transition-colors">Top Products</p>
          <p className="text-4xl font-bold tracking-tighter">{products.filter(p => p.rating >= 4.5).length}</p>
        </Card>
      </section>

      {/* 3. Top Rated & New Arrivals */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Top Rated */}
        <div>
          <div className="flex items-end justify-between mb-8 border-b-2 border-ink pb-4">
            <h2 className="text-2xl font-bold uppercase tracking-widest">Top Rated</h2>
            <button onClick={() => navigate('/shop')} className="text-sm font-bold uppercase tracking-widest text-ink/60 hover:text-ink flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {topRated.map(product => (
              <motion.div 
                whileHover={{ x: 4 }}
                key={`tr-${product.id}`} 
                className="flex items-center gap-6 bg-paper border-2 border-ink p-4 hover:shadow-brutal transition-all cursor-pointer group"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="w-20 h-20 bg-white border border-gray-100 dark:border-gray-800 p-2 shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold uppercase tracking-wide text-sm truncate mb-1">{product.name}</h4>
                  <p className="font-medium text-ink/70">${product.price.toFixed(2)}</p>
                </div>
                <button 
                  className="w-10 h-10 border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-paper transition-colors shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickAdd(product);
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* New Arrivals */}
        <div>
          <div className="flex items-end justify-between mb-8 border-b-2 border-ink pb-4">
            <h2 className="text-2xl font-bold uppercase tracking-widest">New Arrivals</h2>
            <button onClick={() => navigate('/shop')} className="text-sm font-bold uppercase tracking-widest text-ink/60 hover:text-ink flex items-center gap-1 transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {newArrivals.map(product => (
              <motion.div 
                whileHover={{ x: 4 }}
                key={`na-${product.id}`} 
                className="flex items-center gap-6 bg-paper border-2 border-ink p-4 hover:shadow-brutal transition-all cursor-pointer group"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="w-20 h-20 bg-white border border-gray-100 dark:border-gray-800 p-2 shrink-0">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold uppercase tracking-wide text-sm truncate mb-1">{product.name}</h4>
                  <p className="font-medium text-ink/70">${product.price.toFixed(2)}</p>
                </div>
                <button 
                  className="w-10 h-10 border-2 border-ink flex items-center justify-center hover:bg-ink hover:text-paper transition-colors shrink-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleQuickAdd(product);
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
