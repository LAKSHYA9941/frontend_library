import React from 'react';

export type BadgeCategory = 'electronics' | 'clothing' | 'home' | 'sports' | 'accessories';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  category: BadgeCategory;
  label?: string;
}

export const Badge: React.FC<BadgeProps> = ({ 
  category, 
  label, 
  className = '', 
  ...props 
}) => {
  const baseStyles = "px-3 py-1 text-xs font-bold uppercase rounded-none border-2 border-ink inline-block tracking-wide";
  
  const categoryStyles = {
    electronics: "bg-neon-blue text-ink",
    clothing: "bg-neon-pink text-ink",
    home: "bg-lime-green text-ink",
    sports: "bg-lemon text-ink",
    accessories: "bg-paper text-ink",
  };

  return (
    <span 
      className={`${baseStyles} ${categoryStyles[category]} ${className}`}
      {...props}
    >
      {label || category}
    </span>
  );
};
