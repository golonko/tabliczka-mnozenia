import { MathProblem } from '../types';

interface GenerateOptions {
  allowMultiplication: boolean;
  allowDivision: boolean;
  allowAddition: boolean;
  allowSubtraction: boolean;
}

export const generateProblems = (
  count: number, 
  options: GenerateOptions,
  minResult: number, 
  maxResult: number,
  minFactorLimit: number,
  maxFactorLimit: number
): MathProblem[] => {
  const problems: MathProblem[] = [];
  
  // Build operations list based on what's allowed
  const operations: ('multiply' | 'divide' | 'add' | 'subtract')[] = [];
  if (options.allowMultiplication) operations.push('multiply');
  if (options.allowDivision) operations.push('divide');
  if (options.allowAddition) operations.push('add');
  if (options.allowSubtraction) operations.push('subtract');
  
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
        // product : divisor = ?
        const divisor = Math.random() > 0.5 ? factorA : factorB;
        operandA = product;
        operandB = divisor;
        display = `${operandA} : ${operandB} =`;
      }
    } else if (operation === 'add') {
      // Addition: A + B = result (result should be in range)
      // Pick a target result first, then split it into two operands
      const targetResult = Math.floor(Math.random() * (maxResult - minResult + 1)) + minResult;
      
      // operandA can be from minFactorLimit to min(maxFactorLimit, targetResult - minFactorLimit)
      const maxA = Math.min(maxFactorLimit, targetResult - minFactorLimit);
      if (maxA < minFactorLimit) continue;
      
      operandA = Math.floor(Math.random() * (maxA - minFactorLimit + 1)) + minFactorLimit;
      operandB = targetResult - operandA;
      
      // Ensure operandB is within factor limits
      if (operandB < minFactorLimit || operandB > maxFactorLimit) continue;
      
      display = `${operandA} + ${operandB} =`;
    } else if (operation === 'subtract') {
      // Subtraction: A - B = result (result should be in range, and A > B for positive results)
      // Pick operandA (the larger number) and operandB such that A - B is in result range
      
      // Result = A - B, so A = Result + B
      // We want: minResult <= A - B <= maxResult
      // And: minFactorLimit <= A, B <= maxFactorLimit
      
      operandA = Math.floor(Math.random() * (maxFactorLimit - minFactorLimit + 1)) + minFactorLimit;
      
      // B must satisfy: A - maxResult <= B <= A - minResult
      // And: minFactorLimit <= B <= maxFactorLimit
      const minB = Math.max(minFactorLimit, operandA - maxResult);
      const maxB = Math.min(maxFactorLimit, operandA - minResult);
      
      if (maxB < minB || maxB < 0) continue;
      
      operandB = Math.floor(Math.random() * (maxB - minB + 1)) + minB;
      
      // Ensure result is non-negative and in range
      const result = operandA - operandB;
      if (result < minResult || result > maxResult) continue;
      
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