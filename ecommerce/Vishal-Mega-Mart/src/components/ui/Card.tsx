import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'light' | 'dark';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'light', 
  hoverEffect = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = "border-4 border-ink shadow-brutal p-6";
  const variantStyles = {
    light: "bg-paper text-ink",
    dark: "bg-ink text-paper",
  };
  
  const hoverStyles = hoverEffect 
    ? "transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_#0D0D0D]"
    : "";

  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
