export default function Footer() {
  return (
    <footer className="border-t-4 border-ink p-6 bg-ink text-paper text-center">
      <p className="font-heading uppercase text-xl text-lemon">Vishal Mega Mart</p>
      <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} Neo-Brutalism Store. No Rights Reserved.</p>
    </footer>
  );
}
