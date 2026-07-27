export default function Login() {
  return (
    <div className="max-w-md mx-auto mt-12 p-8 border-4 border-ink bg-lemon shadow-brutal">
      <h1 className="text-4xl mb-6">Login</h1>
      <form className="flex flex-col gap-4">
        <input type="email" placeholder="Email" className="border-2 border-ink p-3 w-full font-bold focus:outline-none focus:bg-neon-blue focus:text-ink transition-colors" />
        <input type="password" placeholder="Password" className="border-2 border-ink p-3 w-full font-bold focus:outline-none focus:bg-neon-blue focus:text-ink transition-colors" />
        <button type="submit" className="border-2 border-ink p-3 bg-ink text-paper font-heading text-xl mt-4 hover:bg-neon-pink hover:text-ink shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">Sign In</button>
      </form>
    </div>
  );
}
