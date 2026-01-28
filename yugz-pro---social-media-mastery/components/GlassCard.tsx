
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`glass rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 ${className}`}>
      {children}
    </div>
  );
};
