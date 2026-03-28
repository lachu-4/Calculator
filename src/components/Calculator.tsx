import React, { useState, useEffect } from 'react';
import { useCalculator } from '../hooks/useCalculator';
import { Display } from './Display';
import { Button } from './Button';
import { History } from './History';
import { ScientificKeys } from './ScientificKeys';
import { 
  History as HistoryIcon, 
  Moon, 
  Sun, 
  Delete, 
  Settings2,
  Copy,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

export const Calculator: React.FC = () => {
  const {
    state,
    handleNumber,
    handleOperator,
    calculate,
    clear,
    allClear,
    deleteLast,
    toggleScientific,
    toggleTheme,
    handleScientific,
    handleMemory,
    clearHistory,
  } = useCalculator();

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
      if (['+', '-', '*', '/'].includes(e.key)) {
        const opMap: Record<string, string> = { '*': '×', '/': '÷' };
        handleOperator(opMap[e.key] || e.key);
      }
      if (e.key === 'Enter' || e.key === '=') calculate();
      if (e.key === 'Backspace') deleteLast();
      if (e.key === 'Escape') allClear();
      if (e.key === '.') handleNumber('.');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNumber, handleOperator, calculate, deleteLast, allClear]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(state.display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-calc-light-bg dark:bg-calc-bg flex items-center justify-center p-4 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-calc-light-surface dark:bg-calc-surface rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800 relative"
      >
        {/* Header Controls */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {state.theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleScientific}
              className={`p-2 rounded-xl transition-colors ${
                state.isScientific 
                  ? 'bg-calc-light-accent dark:bg-calc-accent text-white' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Settings2 size={20} />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Copy result"
            >
              {copied ? <Check size={20} className="text-green-500" /> : <Copy size={20} />}
            </button>
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <HistoryIcon size={20} />
            </button>
          </div>
        </div>

        <Display 
          expression={state.expression} 
          display={state.display} 
          hasMemory={state.memory !== 0} 
        />

        <div className="p-6 pt-2">
          {/* Memory Keys */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {['MC', 'MR', 'M+', 'M-'].map((m) => (
              <button
                key={m}
                onClick={() => handleMemory(m as any)}
                className="text-xs font-bold text-gray-400 hover:text-calc-light-accent dark:hover:text-calc-accent transition-colors py-1"
              >
                {m}
              </button>
            ))}
          </div>

          {state.isScientific && <ScientificKeys onScientific={handleScientific} />}

          {/* Main Keypad */}
          <div className="grid grid-cols-4 gap-3 md:gap-4">
            <Button onClick={allClear} variant="secondary">AC</Button>
            <Button onClick={clear} variant="secondary">C</Button>
            <Button onClick={deleteLast} variant="secondary">
              <Delete size={24} />
            </Button>
            <Button onClick={() => handleOperator('÷')} variant="accent">÷</Button>

            <Button onClick={() => handleNumber('7')}>7</Button>
            <Button onClick={() => handleNumber('8')}>8</Button>
            <Button onClick={() => handleNumber('9')}>9</Button>
            <Button onClick={() => handleOperator('×')} variant="accent">×</Button>

            <Button onClick={() => handleNumber('4')}>4</Button>
            <Button onClick={() => handleNumber('5')}>5</Button>
            <Button onClick={() => handleNumber('6')}>6</Button>
            <Button onClick={() => handleOperator('-')} variant="accent">-</Button>

            <Button onClick={() => handleNumber('1')}>1</Button>
            <Button onClick={() => handleNumber('2')}>2</Button>
            <Button onClick={() => handleNumber('3')}>3</Button>
            <Button onClick={() => handleOperator('+')} variant="accent">+</Button>

            <Button onClick={() => handleNumber('0')} className="col-span-2">0</Button>
            <Button onClick={() => handleNumber('.')}>.</Button>
            <Button onClick={calculate} variant="accent">=</Button>
          </div>
        </div>

        <History
          history={state.history}
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
          onClear={clearHistory}
        />
      </motion.div>
    </div>
  );
};
