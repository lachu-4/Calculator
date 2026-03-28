import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface DisplayProps {
  expression: string;
  display: string;
  hasMemory: boolean;
}

export const Display: React.FC<DisplayProps> = ({ expression, display, hasMemory }) => {
  return (
    <div className="flex flex-col items-end justify-end p-6 h-40 bg-transparent overflow-hidden relative">
      {hasMemory && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute top-6 left-6 text-[10px] font-bold px-1.5 py-0.5 rounded bg-calc-light-accent/10 dark:bg-calc-accent/10 text-calc-light-accent dark:text-calc-accent border border-calc-light-accent/20 dark:border-calc-accent/20"
        >
          M
        </motion.div>
      )}
      <div className="text-gray-500 dark:text-gray-400 text-lg font-medium h-8 mb-1 overflow-hidden text-ellipsis whitespace-nowrap w-full text-right">
        {expression}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={display}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.15 }}
          className="text-calc-light-text dark:text-calc-text text-5xl md:text-6xl font-bold tracking-tight overflow-hidden text-ellipsis whitespace-nowrap w-full text-right"
        >
          {display}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
