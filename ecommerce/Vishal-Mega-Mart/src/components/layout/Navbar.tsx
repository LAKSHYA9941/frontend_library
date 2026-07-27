import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="border-b-4 border-ink p-4 flex justify-between items-center bg-lime-green">
      <Link to="/" className="text-2xl font-heading tracking-tight hover:text-paper hover:bg-ink p-2 transition-colors border-2 border-transparent hover:border-ink">
        Vishal Mega Mart
      </Link>
      <div className="flex gap-4">
        <Link to="/shop" className="font-bold border-2 border-ink px-4 py-2 hover:bg-neon-pink hover:text-paper shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">Shop</Link>
        <Link to="/cart" className="font-bold border-2 border-ink px-4 py-2 hover:bg-neon-blue shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">Cart</Link>
        <Link to="/login" className="font-bold border-2 border-ink px-4 py-2 bg-paper hover:bg-lemon shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">Login</Link>
      </div>
    </nav>
  );
}
