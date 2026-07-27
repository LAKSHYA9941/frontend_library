import React from 'react';
import { Card } from '../components/ui/Card';

const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-16 pb-12">
      {/* Header */}
      <section className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter inline-block bg-neon-blue px-6 py-4 border-4 border-ink shadow-brutal-lg">
          About V-Mart
        </h1>
        <p className="text-xl md:text-2xl font-bold uppercase tracking-wide max-w-2xl mx-auto">
          We didn't just break the rules. We threw them away.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <Card className="bg-lemon text-center flex flex-col items-center justify-center py-8">
          <p className="text-4xl font-bold tracking-tighter">10K+</p>
          <p className="font-bold uppercase text-sm mt-2">Products</p>
        </Card>
        <Card className="bg-neon-pink text-center flex flex-col items-center justify-center py-8">
          <p className="text-4xl font-bold tracking-tighter">50K</p>
          <p className="font-bold uppercase text-sm mt-2">Customers</p>
        </Card>
        <Card className="bg-lime-green text-center flex flex-col items-center justify-center py-8">
          <p className="text-4xl font-bold tracking-tighter">4.9</p>
          <p className="font-bold uppercase text-sm mt-2">Rating</p>
        </Card>
        <Card className="bg-neon-blue text-center flex flex-col items-center justify-center py-8">
          <p className="text-4xl font-bold tracking-tighter">99%</p>
          <p className="font-bold uppercase text-sm mt-2">On-Time</p>
        </Card>
      </section>

      {/* Our Story */}
      <section className="bg-paper border-4 border-ink p-8 md:p-12 shadow-brutal-lg">
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-6 border-b-4 border-ink pb-2 inline-block">
          Our Story
        </h2>
        <div className="space-y-4 text-lg font-medium leading-relaxed">
          <p>
            V-Mart was born out of frustration with boring, cookie-cutter eCommerce experiences. 
            We believe shopping should be loud, exciting, and unapologetic. 
          </p>
          <p>
            Started in a small garage in 2026, we aimed to bring the bold aesthetics of 
            Neo-Brutalism to the world of retail. No soft shadows. No rounded corners. 
            Just raw, unfiltered design paired with high-quality products.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section>
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-8 text-center">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-ink text-paper p-8 border-4 border-ink shadow-brutal-lg flex flex-col items-center text-center hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-lime-green border-4 border-ink mb-6 flex items-center justify-center shadow-brutal-sm text-ink">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-wide mb-4">Fast Delivery</h3>
            <p className="font-bold">Lightning-fast shipping across the globe. No excuses.</p>
          </div>

          <div className="bg-ink text-paper p-8 border-4 border-ink shadow-brutal-lg flex flex-col items-center text-center hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-lemon border-4 border-ink mb-6 flex items-center justify-center shadow-brutal-sm text-ink">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-wide mb-4">Secure Payments</h3>
            <p className="font-bold">Your data is locked down tighter than a vault.</p>
          </div>

          <div className="bg-ink text-paper p-8 border-4 border-ink shadow-brutal-lg flex flex-col items-center text-center hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-neon-pink border-4 border-ink mb-6 flex items-center justify-center shadow-brutal-sm text-ink">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold uppercase tracking-wide mb-4">Best Prices</h3>
            <p className="font-bold">Premium quality without the premium price tag.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
