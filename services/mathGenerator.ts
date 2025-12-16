import { MathProblem, Operation } from '../types';

interface OperationFlags {
  multiply: boolean;
  divide: boolean;
  add: boolean;
  subtract: boolean;
}

export const generateProblems = (
  count: number, 
  operationFlags: OperationFlags, 
  minResult: number, 
  maxResult: number,
  minFactorLimit: number,
  maxFactorLimit: number
): MathProblem[] => {
  const problems: MathProblem[] = [];
  
  // Build list of enabled operations
  const operations: Operation[] = [];
  if (operationFlags.multiply) operations.push('multiply');
  if (operationFlags.divide) operations.push('divide');
  if (operationFlags.add) operations.push('add');
  if (operationFlags.subtract) operations.push('subtract');
  
  // Fallback to multiplication if nothing is selected
  if (operations.length === 0) operations.push('multiply');
  
  // Track used problems to avoid duplicates within the set
  const usedProblems = new Set<string>();
  
  // Safety break to prevent infinite loops if range is impossible
  let attempts = 0;
  const MAX_ATTEMPTS = count * 100;

  while (problems.length < count && attempts < MAX_ATTEMPTS) {
    attempts++;
    
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let display = '';
    let operandA = 0;
    let operandB = 0;

    if (operation === 'multiply' || operation === 'divide') {
      // Strategy for multiplication/division:
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
        const divisor = Math.random() > 0.5 ? factorA : factorB;
        operandA = product;
        operandB = divisor;
        display = `${operandA} : ${operandB} =`;
      }
    } else if (operation === 'add') {
      // Addition: A + B = Result (within minResult to maxResult)
      // Pick result first, then split it
      const result = Math.floor(Math.random() * (maxResult - minResult + 1)) + minResult;
      
      // Pick operandA between minFactorLimit and min(maxFactorLimit, result - minFactorLimit)
      const maxA = Math.min(maxFactorLimit, result - minFactorLimit);
      if (maxA < minFactorLimit) continue;
      
      operandA = Math.floor(Math.random() * (maxA - minFactorLimit + 1)) + minFactorLimit;
      operandB = result - operandA;
      
      // Ensure operandB is also within factor limits
      if (operandB < minFactorLimit || operandB > maxFactorLimit) continue;
      
      display = `${operandA} + ${operandB} =`;
    } else if (operation === 'subtract') {
      // Subtraction: A - B = Result (within minResult to maxResult, result >= 0)
      // Pick result first, then determine A and B
      const result = Math.floor(Math.random() * (maxResult - minResult + 1)) + minResult;
      
      // Pick operandB (what we subtract) within factor limits
      operandB = Math.floor(Math.random() * (maxFactorLimit - minFactorLimit + 1)) + minFactorLimit;
      operandA = result + operandB;
      
      // Ensure operandA is reasonable (not too large)
      if (operandA > maxResult + maxFactorLimit) continue;
      
      display = `${operandA} − ${operandB} =`;
    }

    // Skip if this exact problem was already generated
    if (usedProblems.has(display)) continue;
    usedProblems.add(display);

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