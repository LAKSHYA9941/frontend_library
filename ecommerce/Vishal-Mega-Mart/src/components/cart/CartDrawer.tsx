import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

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
          className="fixed inset-0 bg-ink/50 z-50 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-paper border-l-4 border-ink shadow-brutal-left z-50 transform transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b-4 border-ink bg-lemon">
          <h2 className="text-2xl font-bold uppercase tracking-tighter">Your Cart</h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border-2 border-ink bg-paper hover:bg-neon-pink hover:text-white transition-colors font-bold shadow-brutal-sm"
          >
            X
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-ink/70">
              <h3 className="text-xl font-bold uppercase tracking-wide">Cart is empty</h3>
              <p className="font-bold">Add some brutal styles to get started.</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.product.id} className="flex gap-4 border-2 border-ink p-2 shadow-brutal-sm">
                <img 
                  src={item.product.image} 
                  alt={item.product.name} 
                  className="w-20 h-20 object-cover border-2 border-ink"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start gap-2">
                    <h4 className="font-bold uppercase tracking-wide text-sm line-clamp-2">
                      {item.product.name}
                    </h4>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-neon-pink font-bold hover:underline text-xs uppercase"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold">${item.product.price.toFixed(2)}</span>
                    <div className="flex items-center border-2 border-ink">
                      <button 
                        className="px-2 py-1 bg-paper hover:bg-lemon font-bold border-r-2 border-ink"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="px-3 font-bold">{item.quantity}</span>
                      <button 
                        className="px-2 py-1 bg-paper hover:bg-lime-green font-bold border-l-2 border-ink"
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
        <div className="border-t-4 border-ink p-6 bg-paper">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-bold uppercase tracking-wide">Subtotal</span>
            <span className="text-2xl font-bold tracking-tighter">${cartTotal.toFixed(2)}</span>
          </div>
          <Button 
            variant="primary" 
            className="w-full text-lg !py-4"
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
        <div className="space-y-6 text-center pt-4">
          <div className="w-16 h-16 bg-lime-green border-4 border-ink shadow-brutal mx-auto flex items-center justify-center mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 className="text-2xl font-bold uppercase tracking-tighter">You're all set!</h3>
          <div className="bg-paper border-2 border-ink p-4 text-left shadow-brutal">
            <p className="font-bold uppercase tracking-wide text-sm mb-2">
              Order #: <span className="text-neon-blue">VM-{Math.floor(Math.random() * 90000) + 10000}</span>
            </p>
            <p className="font-bold uppercase tracking-wide text-sm mb-2">
              Items: {items.reduce((acc, curr) => acc + curr.quantity, 0)}
            </p>
            <p className="font-bold uppercase tracking-wide text-sm">
              Total Paid: <span className="text-xl tracking-tighter ml-2">${cartTotal.toFixed(2)}</span>
            </p>
          </div>
          <Button variant="secondary" className="w-full mt-4" onClick={handleConfirmOrder}>
            Clear Cart & Return Home
          </Button>
        </div>
      </Modal>
    </>
  );
};
