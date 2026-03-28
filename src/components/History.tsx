import React from 'react';
import { HistoryItem } from '../types';
import { Trash2, Clock, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HistoryProps {
  history: HistoryItem[];
  onClear: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export const History: React.FC<HistoryProps> = ({ history, onClear, onClose, isOpen }) => {
  const exportHistory = () => {
    if (history.length === 0) return;
    const text = history
      .map((item) => `${item.expression} = ${item.result} (${new Date(item.timestamp).toLocaleString()})`)
      .join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'calculator-history.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-y-0 right-0 w-full md:w-80 bg-calc-light-surface dark:bg-calc-surface shadow-2xl z-50 flex flex-col border-l border-gray-200 dark:border-gray-800"
        >
          <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 font-semibold text-calc-light-text dark:text-calc-text">
              <Clock size={20} />
              History
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={exportHistory}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-blue-500 transition-colors"
                title="Export History"
                disabled={history.length === 0}
              >
                <Download size={18} />
              </button>
              <button
                onClick={onClear}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-red-500 transition-colors"
                title="Clear History"
              >
                <Trash2 size={18} />
              </button>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {history.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-2">
                <Clock size={48} strokeWidth={1} />
                <p>No history yet</p>
              </div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="group p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 break-all">
                    {item.expression} =
                  </div>
                  <div className="text-lg font-bold text-calc-light-text dark:text-calc-text break-all">
                    {item.result}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-2">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
