import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-9xl bg-neon-pink text-paper border-4 border-ink p-4 shadow-brutal transform rotate-2">404</h1>
      <p className="text-3xl font-bold mt-8 mb-8 bg-lemon p-2 border-2 border-ink">Page Not Found</p>
      <Link to="/" className="border-4 border-ink p-4 text-2xl font-bold hover:bg-ink hover:text-paper shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
        Go Back Home
      </Link>
    </div>
  );
}
