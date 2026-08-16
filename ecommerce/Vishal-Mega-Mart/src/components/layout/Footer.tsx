import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t-2 border-ink bg-paper p-6 mt-auto transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h2 className="font-heading text-2xl uppercase font-bold tracking-tighter">V-Mart</h2>
          <p className="font-medium uppercase tracking-widest text-xs mt-1 text-ink/70">Break the rules. Buy the trends.</p>
        </div>
        <div className="border-2 border-ink bg-gray-50 dark:bg-gray-900 px-4 py-2 shadow-brutal transition-colors">
          <p className="font-bold uppercase text-[10px] tracking-widest text-ink">
            Built with React + Tanstack + Tailwind + Redux Toolkit
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
