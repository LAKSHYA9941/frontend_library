export default function Cart() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl mb-8 border-b-4 border-ink inline-block pb-2 bg-lemon px-4 shadow-brutal-sm">Your Cart</h1>
      <div className="border-4 border-ink p-8 bg-paper shadow-brutal">
        <p className="text-xl font-bold">Your cart is currently empty.</p>
        <button className="mt-8 border-2 border-ink p-3 bg-neon-blue font-bold shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}
