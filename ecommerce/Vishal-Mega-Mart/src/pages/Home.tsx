import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { getGreeting } from '../utils/greeting';
import { products } from '../data/products';
import { categories } from '../data/categories';
import { Product } from '../types';

const Home: React.FC = () => {
  const { user } = useAuth();
  const { cartCount, cartTotal, addToCart } = useCart();
  const navigate = useNavigate();

  const greeting = getGreeting();
  const userName = user?.name || 'Guest';

  const accentColors = ['bg-neon-pink', 'bg-neon-blue', 'bg-lemon', 'bg-lime-green'];

  const topRated = [...products].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const newArrivals = [...products].reverse().slice(0, 5);

  const handleQuickAdd = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-12">
      
      {/* 1. Welcome Hero Banner */}
      <section className="flex flex-col lg:flex-row gap-8 items-stretch">
        {/* Left: Text & Buttons */}
        <div className="flex-1 bg-ink text-paper p-8 md:p-12 border-4 border-ink shadow-[8px_8px_0px_0px_#0D0D0D] flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-bold uppercase mb-4 tracking-tighter">
            Good {greeting},<br />
            <span className="text-neon-blue">{userName}!</span>
          </h1>
          <p className="text-lg md:text-xl font-bold uppercase tracking-wide mb-8 max-w-lg">
            Ready to break the rules? Check out the latest trends and upgrade your style today.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" onClick={() => navigate('/shop')}>
              Shop Now
            </Button>
            <Button variant="outline" className="border-paper text-paper hover:bg-paper hover:text-ink" onClick={() => navigate('/shop')}>
              View All Products
            </Button>
          </div>
        </div>

        {/* Right: Stat Cards */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <Card className="bg-lemon flex-1 flex flex-col justify-center shadow-[6px_6px_0px_0px_#0D0D0D]">
            <h3 className="text-5xl font-bold mb-2 tracking-tighter">{products.length}</h3>
            <p className="text-xl font-bold uppercase tracking-wide">Products Available</p>
          </Card>
          <Card className="bg-lime-green flex-1 flex flex-col justify-center shadow-[6px_6px_0px_0px_#0D0D0D]">
            <h3 className="text-5xl font-bold mb-2 tracking-tighter">$50</h3>
            <p className="text-xl font-bold uppercase tracking-wide">Free Delivery Threshold</p>
          </Card>
        </div>
      </section>

      {/* 2. Four small live stat cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <Card className="flex flex-col items-center justify-center p-6 text-center hover:-translate-y-1 transition-transform cursor-default">
          <p className="text-sm font-bold uppercase tracking-wide mb-2 text-ink/70">Cart Items</p>
          <p className="text-3xl font-bold">{cartCount}</p>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 text-center hover:-translate-y-1 transition-transform cursor-default">
          <p className="text-sm font-bold uppercase tracking-wide mb-2 text-ink/70">Cart Value</p>
          <p className="text-3xl font-bold">${cartTotal.toFixed(2)}</p>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 text-center hover:-translate-y-1 transition-transform cursor-default">
          <p className="text-sm font-bold uppercase tracking-wide mb-2 text-ink/70">Top Products</p>
          <p className="text-3xl font-bold">{products.filter(p => p.rating >= 4.5).length}</p>
        </Card>
        <Card className="flex flex-col items-center justify-center p-6 text-center hover:-translate-y-1 transition-transform cursor-default">
          <p className="text-sm font-bold uppercase tracking-wide mb-2 text-ink/70">Categories</p>
          <p className="text-3xl font-bold">{categories.length}</p>
        </Card>
      </section>

      {/* 3. Shop by Category */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-8 border-b-4 border-ink pb-2 inline-block">
          Shop by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <div 
              key={cat.name}
              className={`border-4 border-ink p-6 shadow-brutal flex items-center justify-between cursor-pointer hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#0D0D0D] transition-all ${accentColors[index % accentColors.length]}`}
              onClick={() => navigate('/shop')}
            >
              <div>
                <h3 className="text-2xl font-bold uppercase tracking-wide mb-1 text-ink">{cat.name}</h3>
                <p className="font-bold text-ink/80">{cat.count} items</p>
              </div>
              <div className="w-12 h-12 border-2 border-ink bg-paper flex items-center justify-center shadow-brutal-sm">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
                  <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
                  <polyline points="9 9 15 15"></polyline>
                  <polyline points="15 9 9 15"></polyline>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Top Rated & New Arrivals */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Top Rated */}
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-tighter mb-6 border-b-4 border-ink pb-2 inline-block">
            Top Rated
          </h2>
          <div className="flex flex-col gap-4">
            {topRated.map(product => (
              <div key={`tr-${product.id}`} className="flex items-center gap-4 bg-paper border-4 border-ink p-3 shadow-brutal-sm hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal transition-all">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover border-2 border-ink" />
                <div className="flex-1">
                  <h4 className="font-bold uppercase tracking-wide text-sm md:text-base line-clamp-1">{product.name}</h4>
                  <p className="font-bold text-neon-blue">${product.price.toFixed(2)}</p>
                </div>
                <Button variant="primary" className="!px-3 !py-2 text-xs" onClick={() => handleQuickAdd(product)}>
                  + Add
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* New Arrivals */}
        <div>
          <h2 className="text-3xl font-bold uppercase tracking-tighter mb-6 border-b-4 border-ink pb-2 inline-block">
            New Arrivals
          </h2>
          <div className="flex flex-col gap-4">
            {newArrivals.map(product => (
              <div key={`na-${product.id}`} className="flex items-center gap-4 bg-paper border-4 border-ink p-3 shadow-brutal-sm hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal transition-all">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover border-2 border-ink" />
                <div className="flex-1">
                  <h4 className="font-bold uppercase tracking-wide text-sm md:text-base line-clamp-1">{product.name}</h4>
                  <p className="font-bold text-neon-pink">${product.price.toFixed(2)}</p>
                </div>
                <Button variant="secondary" className="!px-3 !py-2 text-xs" onClick={() => handleQuickAdd(product)}>
                  + Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
