export interface MathProblem {
  id: string;
  operandA: number;
  operandB: number;
  operation: 'multiply' | 'divide';
  display: string;
}

export interface GeneratorSettings {
  problemCount: number;
  copies: number; // Number of identical copies
  allowDivision: boolean;
  minResult: number;
  maxResult: number;
  maxFactor: number; // Maximum value for operands/divisors
  layout: 'portrait' | 'landscape'; // New layout setting
}