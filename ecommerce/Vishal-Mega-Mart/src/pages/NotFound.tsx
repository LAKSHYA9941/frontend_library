import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
      <div className="bg-neon-pink text-ink border-4 border-ink p-12 shadow-brutal-lg max-w-2xl w-full">
        <h1 className="text-8xl md:text-9xl font-bold uppercase tracking-tighter mb-6">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-6">
          Page Not Found
        </h2>
        <p className="font-bold text-lg mb-8 max-w-md mx-auto">
          You wandered off the map. This page doesn't exist or has been moved.
        </p>
        <Button variant="primary" onClick={() => navigate('/home')} className="!text-lg !px-8">
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
