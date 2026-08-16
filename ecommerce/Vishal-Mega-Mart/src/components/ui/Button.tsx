import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';

interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'ref'> {
  variant?: ButtonVariant;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}, ref) => {
  const baseStyles = "uppercase font-bold tracking-wide border-2 border-ink px-6 py-3 transition-colors duration-200 flex items-center justify-center";
  
  const variantStyles = {
    primary: "bg-ink text-paper hover:bg-paper hover:text-ink shadow-brutal",
    secondary: "bg-gray-200 dark:bg-gray-800 text-ink hover:bg-ink hover:text-paper shadow-brutal",
    outline: "bg-transparent text-ink hover:bg-ink hover:text-paper shadow-brutal",
    danger: "bg-red-600 text-white hover:bg-white hover:text-red-600 shadow-brutal border-red-600 hover:border-red-600",
  };

  return (
    <motion.button 
      ref={ref}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
});
Button.displayName = 'Button';
