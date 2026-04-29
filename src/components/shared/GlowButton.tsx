import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'cyan' | 'magenta' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function GlowButton({ 
  children, 
  onClick, 
  variant = 'cyan', 
  className = '',
  type = 'button',
  disabled = false 
}: GlowButtonProps) {
  const variants = {
    cyan: {
      background: 'linear-gradient(135deg, #00FFFF 0%, #00D9FF 100%)',
      color: '#0B0C10',
    },
    magenta: {
      background: 'linear-gradient(135deg, #FF00FF 0%, #FF1493 100%)',
      color: '#fff',
    },
    outline: {
      background: 'transparent',
      color: '#00FFFF',
      border: '2px solid #00FFFF',
    },
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={`relative overflow-hidden ${className}`}
        style={variants[variant]}
      >
        {children}
      </Button>
    </motion.div>
  );
}
