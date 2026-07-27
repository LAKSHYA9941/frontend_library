import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/home');
    } catch (err: any) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-100px)] w-full -m-4 md:-m-8">
      {/* Left Side */}
      <div className="md:w-1/2 bg-ink p-8 md:p-16 flex flex-col justify-center">
        <h1 className="text-paper text-5xl md:text-7xl font-bold uppercase mb-12">
          Hustle Hard.<br />Dress Loud.
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="bg-neon-blue !text-ink border-paper hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#FFFFFF] transition-all">
            <h3 className="text-4xl font-bold mb-2">1,000+</h3>
            <p className="uppercase font-bold tracking-wide">Products</p>
          </Card>
          <Card className="bg-lemon !text-ink border-paper hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#FFFFFF] transition-all">
            <h3 className="text-4xl font-bold mb-2">50K</h3>
            <p className="uppercase font-bold tracking-wide">Users</p>
          </Card>
          <Card className="bg-lime-green !text-ink border-paper sm:col-span-2 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#FFFFFF] transition-all">
            <h3 className="text-4xl font-bold mb-2">4.9 / 5</h3>
            <p className="uppercase font-bold tracking-wide">Average Rating</p>
          </Card>
        </div>
      </div>
      
      {/* Right Side */}
      <div className="md:w-1/2 bg-paper p-8 md:p-16 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-brutal">
          <h2 className="text-3xl font-bold uppercase mb-6 tracking-wide">Sign In</h2>
          {error && <p className="text-neon-pink font-bold uppercase mb-4 tracking-wide">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
              label="Email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div>
              <Input 
                label="Password" 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="mt-2 text-right">
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs font-bold uppercase tracking-wide hover:underline text-ink"
                >
                  {showPassword ? "Hide Password" : "Show Password"}
                </button>
              </div>
            </div>
            <Button 
              type="submit" 
              variant="primary" 
              className="w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Sign In'}
            </Button>
          </form>
          <div className="mt-6 text-center border-t-4 border-ink pt-6">
            <p className="font-bold tracking-wide text-sm">
              DON'T HAVE AN ACCOUNT?{' '}
              <Link to="/register" className="text-neon-blue uppercase hover:underline ml-1">
                Register Here
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
