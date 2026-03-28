import { create, all } from 'mathjs';

const math = create(all);

export const evaluateExpression = (expression: string): string => {
  try {
    // Replace visual operators with mathjs compatible ones
    const sanitizedExpression = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'pi')
      .replace(/e/g, 'e');

    const result = math.evaluate(sanitizedExpression);
    
    if (typeof result === 'number') {
      if (!isFinite(result)) return 'Error';
      // Handle precision issues
      return parseFloat(result.toFixed(10)).toString();
    }
    
    return result.toString();
  } catch (error) {
    console.error('Math evaluation error:', error);
    return 'Error';
  }
};

export const factorial = (n: number): number => {
  if (n < 0) return NaN;
  if (n === 0) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) res *= i;
  return res;
};
