export default function Shop() {
  return (
    <div>
      <h1 className="text-5xl mb-8 border-b-4 border-ink inline-block pb-2">Shop All Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="border-4 border-ink p-4 bg-paper shadow-brutal flex flex-col hover:-translate-y-2 transition-transform">
            <div className="h-48 bg-lime-green border-2 border-ink mb-4 flex items-center justify-center">
              <span className="font-heading text-3xl">IMG {item}</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Product {item}</h2>
            <p className="mb-4 flex-grow font-bold">$99.99</p>
            <button className="border-2 border-ink p-2 bg-neon-pink font-bold hover:bg-ink hover:text-paper transition-colors">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
