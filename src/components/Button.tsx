import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'accent' | 'secondary' | 'scientific';
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className, variant = 'default' }) => {
  const variants = {
    default: 'bg-calc-secondary dark:bg-calc-secondary text-calc-light-text dark:text-calc-text hover:bg-opacity-80',
    accent: 'bg-calc-light-accent dark:bg-calc-accent text-white hover:bg-opacity-90',
    secondary: 'bg-gray-300 dark:bg-gray-600 text-calc-light-text dark:text-calc-text hover:bg-opacity-80',
    scientific: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-sm hover:bg-opacity-80',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className={cn(
        'h-14 md:h-16 rounded-2xl font-medium text-xl flex items-center justify-center transition-all shadow-sm',
        variants[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
};
