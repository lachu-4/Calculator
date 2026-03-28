import { useState, useEffect, useCallback } from 'react';
import { evaluateExpression } from '../utils/mathUtils';
import { HistoryItem, CalculatorState } from '../types';

export const useCalculator = () => {
  const [state, setState] = useState<CalculatorState>(() => {
    const savedHistory = localStorage.getItem('calc-history');
    const savedTheme = localStorage.getItem('calc-theme') as 'dark' | 'light';
    return {
      display: '0',
      expression: '',
      result: null,
      history: savedHistory ? JSON.parse(savedHistory) : [],
      memory: 0,
      isScientific: false,
      theme: savedTheme || 'dark',
    };
  });

  useEffect(() => {
    localStorage.setItem('calc-history', JSON.stringify(state.history));
  }, [state.history]);

  useEffect(() => {
    localStorage.setItem('calc-theme', state.theme);
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  const handleNumber = useCallback((num: string) => {
    setState(prev => {
      if (prev.result !== null) {
        return { ...prev, display: num, expression: num, result: null };
      }
      const newDisplay = prev.display === '0' ? num : prev.display + num;
      const newExpression = prev.expression + num;
      return { ...prev, display: newDisplay, expression: newExpression };
    });
  }, []);

  const handleOperator = useCallback((op: string) => {
    setState(prev => {
      let baseExpression = prev.expression;
      if (prev.result !== null) {
        baseExpression = prev.result;
      }
      
      // Prevent multiple operators
      const lastChar = baseExpression.slice(-1);
      if (['+', '-', '×', '÷', '^'].includes(lastChar)) {
        return { ...prev, expression: baseExpression.slice(0, -1) + op, display: '0', result: null };
      }

      return { ...prev, expression: baseExpression + op, display: '0', result: null };
    });
  }, []);

  const calculate = useCallback(() => {
    setState(prev => {
      if (!prev.expression) return prev;
      
      const result = evaluateExpression(prev.expression);
      
      if (result === 'Error') {
        return { ...prev, display: 'Error', result: 'Error' };
      }

      const newHistoryItem: HistoryItem = {
        id: crypto.randomUUID(),
        expression: prev.expression,
        result,
        timestamp: Date.now(),
      };

      return {
        ...prev,
        display: result,
        result,
        history: [newHistoryItem, ...prev.history].slice(0, 50),
      };
    });
  }, []);

  const clear = useCallback(() => {
    setState(prev => ({ ...prev, display: '0', expression: '', result: null }));
  }, []);

  const allClear = useCallback(() => {
    setState(prev => ({ ...prev, display: '0', expression: '', result: null, memory: 0 }));
  }, []);

  const deleteLast = useCallback(() => {
    setState(prev => {
      if (prev.result !== null) return prev;
      const newExpression = prev.expression.slice(0, -1);
      const newDisplay = prev.display.length > 1 ? prev.display.slice(0, -1) : '0';
      return { ...prev, expression: newExpression, display: newDisplay };
    });
  }, []);

  const toggleScientific = useCallback(() => {
    setState(prev => ({ ...prev, isScientific: !prev.isScientific }));
  }, []);

  const toggleTheme = useCallback(() => {
    setState(prev => ({ ...prev, theme: prev.theme === 'dark' ? 'light' : 'dark' }));
  }, []);

  const handleScientific = useCallback((func: string) => {
    setState(prev => {
      let newExpression = prev.expression;
      if (prev.result !== null) {
        newExpression = prev.result;
      }

      switch (func) {
        case 'sin':
        case 'cos':
        case 'tan':
        case 'log':
        case 'sqrt':
          newExpression = `${func}(${newExpression || '0'})`;
          break;
        case 'square':
          newExpression = `(${newExpression || '0'})^2`;
          break;
        case 'factorial':
          newExpression = `(${newExpression || '0'})!`;
          break;
        case 'pi':
          newExpression += 'π';
          break;
        case 'e':
          newExpression += 'e';
          break;
      }

      const result = evaluateExpression(newExpression);
      return { ...prev, expression: newExpression, display: result, result: result === 'Error' ? 'Error' : null };
    });
  }, []);

  const handleMemory = useCallback((action: 'M+' | 'M-' | 'MR' | 'MC') => {
    setState(prev => {
      const currentVal = parseFloat(prev.display);
      const safeVal = isNaN(currentVal) ? 0 : currentVal;
      
      switch (action) {
        case 'M+':
          return { ...prev, memory: prev.memory + safeVal };
        case 'M-':
          return { ...prev, memory: prev.memory - safeVal };
        case 'MR':
          const memoryStr = prev.memory.toString();
          return { 
            ...prev, 
            display: memoryStr, 
            expression: memoryStr, 
            result: memoryStr // Setting result to memoryStr makes next number replace it
          };
        case 'MC':
          return { ...prev, memory: 0 };
        default:
          return prev;
      }
    });
  }, []);

  const clearHistory = useCallback(() => {
    setState(prev => ({ ...prev, history: [] }));
  }, []);

  return {
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
  };
};
