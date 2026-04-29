import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface CyberpunkCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'magenta' | 'purple';
  hover?: boolean;
}

export function CyberpunkCard({ children, className = '', glowColor = 'cyan', hover = true }: CyberpunkCardProps) {
  const glowColors = {
    cyan: 'rgba(0, 255, 255, 0.1)',
    magenta: 'rgba(255, 0, 255, 0.1)',
    purple: 'rgba(106, 13, 173, 0.1)',
  };

  const borderColors = {
    cyan: '#00FFFF',
    magenta: '#FF00FF',
    purple: '#6A0DAD',
  };

  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      className={`relative bg-[#1F2833]/40 backdrop-blur-sm border rounded-lg overflow-hidden ${className}`}
      style={{
        borderColor: `${borderColors[glowColor]}40`,
      }}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColors[glowColor]} 0%, transparent 70%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
