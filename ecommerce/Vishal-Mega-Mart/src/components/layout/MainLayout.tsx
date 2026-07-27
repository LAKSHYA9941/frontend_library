import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';

const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col font-body bg-paper text-ink">
      <Navbar />
      <main className="flex-grow p-4 md:p-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
