import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { CartDrawer } from '../cart/CartDrawer';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const colors = ['bg-neon-pink', 'bg-neon-blue', 'bg-lemon', 'bg-lime-green'];
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  const colorClass = colors[(user?.name.length || 0) % colors.length];

  return (
    <>
    <header className="sticky top-0 z-40 bg-paper border-b-4 border-ink flex items-center justify-between px-6 py-4">
      {/* Left: Logo */}
      <Link to="/home" className="flex items-center gap-2 group">
        <div className="w-8 h-8 bg-neon-blue border-2 border-ink flex items-center justify-center transform group-hover:-rotate-12 transition-transform shadow-brutal-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
        </div>
        <span className="font-heading text-2xl uppercase font-bold tracking-tighter">
          V-Mart
        </span>
      </Link>

      {/* Center: Nav Links */}
      <nav className="hidden md:flex gap-8">
        {[
          { name: 'Home', path: '/home' },
          { name: 'Shop', path: '/shop' },
          { name: 'About', path: '/about' },
        ].map((link) => (
          <NavLink
            key={link.name}
            to={link.path}
            className={({ isActive }) => 
              `font-bold uppercase tracking-wide px-2 py-1 transition-all ${
                isActive 
                  ? 'border-b-4 border-lemon' 
                  : 'border-b-4 border-transparent hover:border-ink'
              }`
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      {/* Right: User / Cart / Logout */}
      <div className="flex items-center gap-4">
        {/* User Avatar */}
        <div className={`w-10 h-10 border-2 border-ink ${colorClass} flex items-center justify-center font-bold text-ink shadow-brutal-sm uppercase`}>
          {userInitial}
        </div>

        {/* Theme Toggle Button */}
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 border-2 border-ink bg-paper flex items-center justify-center hover:-translate-y-1 hover:shadow-brutal hover:bg-lemon transition-all"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>

        {/* Cart Button */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative w-10 h-10 border-2 border-ink bg-paper flex items-center justify-center hover:-translate-y-1 hover:shadow-brutal transition-all"
          aria-label="Cart"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span className="absolute -top-2 -right-2 bg-neon-pink border-2 border-ink text-ink text-xs font-bold w-5 h-5 flex items-center justify-center rounded-none shadow-brutal-sm">
            {cartCount}
          </span>
        </button>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-10 h-10 border-2 border-ink bg-paper flex items-center justify-center hover:-translate-y-1 hover:shadow-brutal hover:bg-neon-pink group transition-all"
          aria-label="Logout"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink group-hover:text-paper">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </button>
      </div>
    </header>
    <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
