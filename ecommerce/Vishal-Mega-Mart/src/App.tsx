import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Shop from './pages/Shop';
import About from './pages/About';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import UiPreview from './pages/UiPreview';
// Layout components
import MainLayout from './components/layout/MainLayout';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public / Guest Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={isAuthenticated ? <Navigate to="/home" replace /> : <Register />} 
      />
      
      {/* Dev Route */}
      <Route path="/ui-preview" element={<UiPreview />} />

      {/* Protected Routes inside MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
