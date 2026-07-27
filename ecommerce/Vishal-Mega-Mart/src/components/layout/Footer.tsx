import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t-4 border-ink bg-paper p-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h2 className="font-heading text-2xl uppercase font-bold tracking-tighter">V-Mart</h2>
          <p className="font-bold uppercase text-sm mt-1">Break the rules. Buy the trends.</p>
        </div>
        <div className="border-2 border-ink bg-lemon px-4 py-2 shadow-[2px_2px_0px_0px_#0D0D0D]">
          <p className="font-bold uppercase text-xs tracking-wide text-ink">
            Built with React + Context API + Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
