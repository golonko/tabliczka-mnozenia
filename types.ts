export interface MathProblem {
  id: string;
  operandA: number;
  operandB: number;
  operation: 'multiply' | 'divide';
  display: string;
}

export interface GeneratorSettings {
  problemCount: number;
  columns: number; // Number of columns (2-8)
  copies: number; // Number of identical copies
  allowDivision: boolean;
  minResult: number;
  maxResult: number;
  minFactor: number; // Minimum value for operands/divisors
  maxFactor: number; // Maximum value for operands/divisors
}