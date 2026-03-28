export type Operation = '+' | '-' | '*' | '/' | '^';

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface CalculatorState {
  display: string;
  expression: string;
  result: string | null;
  history: HistoryItem[];
  memory: number;
  isScientific: boolean;
  theme: 'dark' | 'light';
}
