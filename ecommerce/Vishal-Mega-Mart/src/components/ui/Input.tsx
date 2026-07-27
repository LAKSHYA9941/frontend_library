import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <label className="font-bold uppercase tracking-wide text-ink text-sm">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full border-3 border-ink bg-paper px-4 py-3 text-ink rounded-none 
            focus:outline-none focus:ring-0 focus:border-neon-blue focus:shadow-brutal 
            transition-all duration-200 ${error ? 'border-neon-pink' : ''} ${className}`}
          {...props}
        />
        {error && <span className="text-neon-pink font-bold text-sm uppercase">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
