import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Valid email is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      await register(name, email, password);
      navigate('/home');
    } catch (err) {
      setErrors({ form: err instanceof Error ? err.message : 'Registration failed' });
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <h1 className="text-3xl font-bold uppercase mb-6 text-center tracking-wide">Join the club</h1>
        {errors.form && (
          <p className="text-neon-pink font-bold uppercase mb-4 text-center tracking-wide">
            {errors.form}
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            label="Full Name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
          />
          <Input 
            label="Email Address" 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
          />
          <Input 
            label="Password" 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <Input 
            label="Confirm Password" 
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
          />
          
          <Button 
            type="submit" 
            variant="secondary" 
            className="w-full mt-6"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Account'}
          </Button>
        </form>
        
        <div className="mt-6 text-center border-t-4 border-ink pt-6">
          <p className="font-bold tracking-wide text-sm">
            ALREADY HAVE AN ACCOUNT?{' '}
            <Link to="/login" className="text-neon-pink uppercase hover:underline ml-1">
              Log In Here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
