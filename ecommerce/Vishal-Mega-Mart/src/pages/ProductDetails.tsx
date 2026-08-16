import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingBag, Truck, ShieldCheck, ArrowLeft, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { fetchProductById, fetchProducts } from '../api/productsApi';
import { useCart } from '../context/CartContext';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import type { Product } from '../types';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { recentlyViewed, addRecentlyViewed } = useRecentlyViewed();

  const [activeImage, setActiveImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  const [isAdding, setIsAdding] = useState(false);

  // Fetch current product
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  // Fetch products for "You May Also Like"
  const { data: allProducts } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0] || product.image);
      addRecentlyViewed(product);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product, id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 flex items-center justify-center transition-colors">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          className="w-12 h-12 border-4 border-gray-200 dark:border-gray-800 border-t-black dark:border-t-white rounded-full"
        />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 flex flex-col items-center justify-center transition-colors text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Product not found</h2>
        <button onClick={() => navigate('/shop')} className="text-blue-600 dark:text-blue-400 hover:underline">
          Return to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setTimeout(() => setIsAdding(false), 1000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // navigate('/checkout'); // Placeholder for buy now flow
  };

  const youMayAlsoLike = allProducts
    ? allProducts.filter(p => p.id !== product.id).slice(0, 8)
    : [];

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-gray-950 text-gray-900 dark:text-gray-100 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black pb-24 transition-colors">
      
      {/* Header/Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-6 h-full">
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-24 flex-shrink-0">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 md:w-full md:h-24 flex-shrink-0 rounded-xl overflow-hidden bg-white dark:bg-gray-900 border-2 transition-all ${
                    activeImage === img ? 'border-black dark:border-white' : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden aspect-square relative shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] group transition-colors">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            {product.brand && (
              <span className="text-sm font-semibold tracking-wider text-gray-400 dark:text-gray-500 uppercase mb-3">
                {product.brand}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.round(product.rating) ? 'text-black dark:text-white fill-black dark:fill-white' : 'text-gray-200 dark:text-gray-700'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400 underline decoration-gray-300 dark:decoration-gray-700 underline-offset-4 hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                {product.reviewCount} Reviews
              </span>
            </div>

            <div className="text-3xl font-medium tracking-tight mb-8">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-10 max-w-lg">
              {product.description}
            </p>

            <div className="h-px w-full bg-gradient-to-r from-gray-200 dark:from-gray-800 to-transparent mb-10"></div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded-2xl h-14 bg-white dark:bg-gray-900 shadow-sm transition-colors">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-14 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-l-2xl"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-14 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-r-2xl"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className={`flex-1 h-14 rounded-2xl font-medium text-lg flex items-center justify-center gap-2 transition-all ${
                  isAdding 
                    ? 'bg-green-500 text-white border-green-500' 
                    : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-black dark:text-white hover:border-black dark:hover:border-white shadow-sm hover:shadow-md'
                }`}
              >
                {isAdding ? <ShieldCheck className="w-5 h-5" /> : <ShoppingBag className="w-5 h-5" />}
                {isAdding ? 'Added to Cart' : 'Add to Cart'}
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                className="flex-1 h-14 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-medium text-lg hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors shadow-lg shadow-black/20 dark:shadow-white/10"
              >
                Buy Now
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-gray-100 dark:border-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-400" />
                <span>Free shipping and returns</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <span>2-year extended warranty</span>
              </div>
              <div className="flex items-center gap-3 col-span-2 mt-2">
                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span>{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Details Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex gap-8 border-b border-gray-200 dark:border-gray-800 mb-10 overflow-x-auto no-scrollbar transition-colors">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-4 text-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white"
                />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'description' && (
                <div className="prose prose-lg dark:prose-invert max-w-3xl text-gray-600 dark:text-gray-300">
                  <p>{product.description}</p>
                  <p className="mt-4">
                    Experience the perfect blend of form and function. Designed with meticulous attention to detail, 
                    this product sets a new standard for quality. Whether you're upgrading your daily routine or 
                    looking for the ultimate statement piece, it delivers unparalleled performance.
                  </p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="max-w-3xl">
                  <dl className="divide-y divide-gray-100 dark:divide-gray-800">
                    <div className="py-4 flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">Brand</dt>
                      <dd className="font-medium text-black dark:text-white">{product.brand || 'Generic'}</dd>
                    </div>
                    <div className="py-4 flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">Stock Status</dt>
                      <dd className="font-medium text-black dark:text-white">{product.stock > 0 ? 'Available' : 'Unavailable'}</dd>
                    </div>
                    <div className="py-4 flex justify-between">
                      <dt className="text-gray-500 dark:text-gray-400">Product ID</dt>
                      <dd className="font-medium text-gray-400 dark:text-gray-500">{product.id}</dd>
                    </div>
                  </dl>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, idx) => (
                      <div key={idx} className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-[0_4px_20px_rgb(0,0,0,0.2)] border border-gray-50 dark:border-gray-800 transition-colors">
                        <div className="flex items-center justify-between mb-4">
                          <div className="font-medium text-black dark:text-white">{review.reviewerName}</div>
                          <div className="text-sm text-gray-400 dark:text-gray-500">
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-black dark:text-white fill-black dark:fill-white' : 'text-gray-200 dark:text-gray-700'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-gray-500 dark:text-gray-400 italic py-8">
                      No reviews yet for this product.
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* You May Also Like Carousel */}
      {youMayAlsoLike.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-100 dark:border-gray-800 transition-colors">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white">You May Also Like</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            {youMayAlsoLike.map(p => (
              <div 
                key={p.id} 
                onClick={() => navigate(`/product/${p.id}`)}
                className="w-64 flex-shrink-0 snap-start cursor-pointer group"
              >
                <div className="bg-white dark:bg-gray-900 rounded-3xl aspect-square p-6 mb-4 relative overflow-hidden shadow-sm dark:shadow-none border border-gray-100 dark:border-gray-800 group-hover:shadow-md dark:group-hover:border-gray-600 transition-all">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-medium text-black dark:text-white text-sm line-clamp-1 mb-1">{p.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">${p.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed Carousel */}
      {recentlyViewed.filter(p => p.id !== product.id).length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white dark:bg-gray-900 rounded-[3rem] transition-colors shadow-sm dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
          <h2 className="text-2xl font-semibold tracking-tight text-black dark:text-white mb-8">Recently Viewed</h2>
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-8">
            {recentlyViewed.filter(p => p.id !== product.id).map(p => (
              <div 
                key={p.id} 
                onClick={() => navigate(`/product/${p.id}`)}
                className="w-48 flex-shrink-0 snap-start cursor-pointer group"
              >
                <div className="bg-[#fafafa] dark:bg-gray-800 rounded-2xl aspect-square p-4 mb-3 relative overflow-hidden transition-all group-hover:bg-gray-100 dark:group-hover:bg-gray-700">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal" />
                </div>
                <h3 className="font-medium text-black dark:text-white text-xs line-clamp-1 mb-1">{p.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">${p.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductDetails;
