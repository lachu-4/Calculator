import React from 'react';
import { Button } from './Button';

interface ScientificKeysProps {
  onScientific: (func: string) => void;
}

export const ScientificKeys: React.FC<ScientificKeysProps> = ({ onScientific }) => {
  const keys = [
    { label: 'sin', func: 'sin' },
    { label: 'cos', func: 'cos' },
    { label: 'tan', func: 'tan' },
    { label: 'log', func: 'log' },
    { label: '√', func: 'sqrt' },
    { label: 'x²', func: 'square' },
    { label: 'x!', func: 'factorial' },
    { label: 'π', func: 'pi' },
    { label: 'e', func: 'e' },
    { label: '^', func: 'pow' },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 mb-4">
      {keys.map((key) => (
        <Button
          key={key.label}
          onClick={() => onScientific(key.func)}
          variant="scientific"
          className="h-10 md:h-12 text-sm"
        >
          {key.label}
        </Button>
      ))}
    </div>
  );
};
