import { MathProblem } from '../types';

export const generateProblems = (
  count: number, 
  allowDivision: boolean, 
  minResult: number, 
  maxResult: number,
  minFactorLimit: number,
  maxFactorLimit: number
): MathProblem[] => {
  const problems: MathProblem[] = [];
  const operations = allowDivision ? ['multiply', 'divide'] : ['multiply'];
  
  // Safety break to prevent infinite loops if range is impossible
  let attempts = 0;
  const MAX_ATTEMPTS = count * 100;

  while (problems.length < count && attempts < MAX_ATTEMPTS) {
    attempts++;
    
    // Strategy: 
    // 1. Pick Factor A randomly between minFactorLimit and maxFactorLimit
    // 2. Calculate valid range for Factor B so that product is within [minResult, maxResult]
    // 3. Ensure Factor B is also within [minFactorLimit, maxFactorLimit]

    const factorA = Math.floor(Math.random() * (maxFactorLimit - minFactorLimit + 1)) + minFactorLimit; 
    
    // Calculate bounds for Factor B based on A to stay within Result Range
    const minB_from_result = Math.ceil(minResult / factorA);
    const maxB_from_result = Math.floor(maxResult / factorA);

    // Factor B must also respect the global factor limits
    const minB = Math.max(minFactorLimit, minB_from_result);
    const maxB = Math.min(maxFactorLimit, maxB_from_result);

    // If range is invalid, retry with a new Factor A
    if (maxB < minB) continue; 

    const factorB = Math.floor(Math.random() * (maxB - minB + 1)) + minB;
    const product = factorA * factorB;

    // Double check constraints (redundant but safe)
    if (product < minResult || product > maxResult) continue;

    const operation = operations[Math.floor(Math.random() * operations.length)] as 'multiply' | 'divide';
    
    let display = '';
    let operandA = factorA;
    let operandB = factorB;

    if (operation === 'multiply') {
      // Randomize order of factors
      if (Math.random() > 0.5) {
         operandA = factorB;
         operandB = factorA;
      } else {
         operandA = factorA;
         operandB = factorB;
      }
      display = `${operandA} • ${operandB} =`;
    } else {
      // Division: Product / Factor = Factor
      // product : divisor = ?
      const divisor = Math.random() > 0.5 ? factorA : factorB;
      operandA = product;
      operandB = divisor;
      display = `${operandA} : ${operandB} =`;
    }

    problems.push({
      id: `prob-${Date.now()}-${problems.length}-${Math.random()}`,
      operandA,
      operandB,
      operation,
      display,
    });
  }

  return problems;
};