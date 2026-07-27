import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-ink/20 border-4 border-ink shadow-brutal ${className}`} />
  );
};
