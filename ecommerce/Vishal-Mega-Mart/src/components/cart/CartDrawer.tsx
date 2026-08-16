import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { X, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, cartTotal, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length > 0) {
      setIsCheckoutModalOpen(true);
    }
  };

  const handleConfirmOrder = () => {
    setIsCheckoutModalOpen(false);
    clearCart();
    onClose();
    navigate('/home');
  };

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-paper border-l-2 border-ink shadow-brutal-left z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-2 border-ink bg-gray-50 dark:bg-gray-900 transition-colors">
          <h2 className="text-xl font-bold uppercase tracking-widest">Your Cart</h2>
          <button 
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border-2 border-ink bg-paper hover:bg-ink hover:text-paper transition-colors rounded-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-ink/50">
              <h3 className="text-xl font-bold uppercase tracking-widest">Cart is empty</h3>
              <p className="font-medium text-sm">Add some premium items to get started.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 border-2 border-ink p-3 shadow-brutal bg-white dark:bg-black transition-colors">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-20 h-20 object-contain p-2 border border-gray-100 dark:border-gray-800"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold uppercase tracking-wide text-sm line-clamp-2">
                      {item.product.name}
                    </h4>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-600 font-bold hover:underline text-xs uppercase tracking-widest"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">${item.product.price.toFixed(2)}</span>
                    <div className="flex items-center border-2 border-ink bg-paper">
                      <button 
                        className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold border-r-2 border-ink transition-colors"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="px-3 font-bold text-sm">{item.quantity}</span>
                      <button 
                        className="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-800 font-bold border-l-2 border-ink transition-colors"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-ink p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm font-bold uppercase tracking-widest text-ink/70">Subtotal</span>
            <span className="text-2xl font-bold tracking-tighter">${cartTotal.toFixed(2)}</span>
          </div>
          <Button 
            variant="primary" 
            className="w-full text-sm tracking-widest !py-4"
            disabled={items.length === 0}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>

      {/* Checkout Modal */}
      <Modal 
        isOpen={isCheckoutModalOpen} 
        onClose={() => setIsCheckoutModalOpen(false)}
        title="Order Confirmed"
      >
        <div className="space-y-8 text-center pt-4">
          <div className="w-16 h-16 bg-ink text-paper border-2 border-ink shadow-brutal mx-auto flex items-center justify-center mb-6">
            <Check className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold uppercase tracking-tighter">You're all set!</h3>
          <div className="bg-gray-50 dark:bg-gray-900 border-2 border-ink p-6 text-left shadow-brutal transition-colors">
            <p className="font-bold uppercase tracking-widest text-xs mb-3 text-ink/70">
              Order #: <span className="text-ink text-sm ml-2">VM-{Math.floor(Math.random() * 90000) + 10000}</span>
            </p>
            <p className="font-bold uppercase tracking-widest text-xs mb-3 text-ink/70">
              Items: <span className="text-ink text-sm ml-2">{items.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
            </p>
            <p className="font-bold uppercase tracking-widest text-xs text-ink/70">
              Total Paid: <span className="text-xl tracking-tighter ml-2 text-ink">${cartTotal.toFixed(2)}</span>
            </p>
          </div>
          <Button variant="secondary" className="w-full mt-4 text-xs tracking-widest" onClick={handleConfirmOrder}>
            Clear Cart & Return Home
          </Button>
        </div>
      </Modal>
    </>
  );
};
