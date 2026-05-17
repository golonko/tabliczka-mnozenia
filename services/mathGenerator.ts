import { MathProblem } from '../types';

interface GenerateOptions {
  allowMultiplication: boolean;
  allowDivision: boolean;
  allowAddition: boolean;
  allowSubtraction: boolean;
}

const normalizeRange = (first: number, second: number): [number, number] => [
  Math.min(first, second),
  Math.max(first, second),
];

export const generateProblems = (
  count: number, 
  options: GenerateOptions,
  minResult: number, 
  maxResult: number,
  minFactorLimit: number,
  maxFactorLimit: number
): MathProblem[] => {
  const problems: MathProblem[] = [];
  const [effectiveMinResult, effectiveMaxResult] = normalizeRange(minResult, maxResult);
  const [effectiveMinFactorLimit, effectiveMaxFactorLimit] = normalizeRange(
    minFactorLimit,
    maxFactorLimit
  );
  
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
      // 1. Pick Factor A randomly between effectiveMinFactorLimit and effectiveMaxFactorLimit
      // 2. Calculate valid range for Factor B so that product is within [effectiveMinResult, effectiveMaxResult]
      // 3. Ensure Factor B is also within [effectiveMinFactorLimit, effectiveMaxFactorLimit]

      const factorA = Math.floor(Math.random() * (effectiveMaxFactorLimit - effectiveMinFactorLimit + 1)) + effectiveMinFactorLimit; 
      
      // Calculate bounds for Factor B based on A to stay within Result Range
      const minB_from_result = Math.ceil(effectiveMinResult / factorA);
      const maxB_from_result = Math.floor(effectiveMaxResult / factorA);

      // Factor B must also respect the global factor limits
      const minB = Math.max(effectiveMinFactorLimit, minB_from_result);
      const maxB = Math.min(effectiveMaxFactorLimit, maxB_from_result);

      // If range is invalid, retry with a new Factor A
      if (maxB < minB) continue; 

      const factorB = Math.floor(Math.random() * (maxB - minB + 1)) + minB;
      const product = factorA * factorB;

      // Double check constraints (redundant but safe)
      if (product < effectiveMinResult || product > effectiveMaxResult) continue;

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
      const targetResult = Math.floor(Math.random() * (effectiveMaxResult - effectiveMinResult + 1)) + effectiveMinResult;
      
      // operandA can be from effectiveMinFactorLimit to min(effectiveMaxFactorLimit, targetResult - effectiveMinFactorLimit)
      const maxA = Math.min(effectiveMaxFactorLimit, targetResult - effectiveMinFactorLimit);
      if (maxA < effectiveMinFactorLimit) continue;
      
      operandA = Math.floor(Math.random() * (maxA - effectiveMinFactorLimit + 1)) + effectiveMinFactorLimit;
      operandB = targetResult - operandA;
      
      // Ensure operandB is within factor limits
      if (operandB < effectiveMinFactorLimit || operandB > effectiveMaxFactorLimit) continue;
      
      display = `${operandA} + ${operandB} =`;
    } else if (operation === 'subtract') {
      // Subtraction: A - B = result (result should be in range, and A > B for positive results)
      // Pick operandA (the larger number) and operandB such that A - B is in result range
      
      // Result = A - B, so A = Result + B
      // We want: effectiveMinResult <= A - B <= effectiveMaxResult
      // And: effectiveMinFactorLimit <= A, B <= effectiveMaxFactorLimit
      
      operandA = Math.floor(Math.random() * (effectiveMaxFactorLimit - effectiveMinFactorLimit + 1)) + effectiveMinFactorLimit;
      
      // B must satisfy: A - effectiveMaxResult <= B <= A - effectiveMinResult
      // And: effectiveMinFactorLimit <= B <= effectiveMaxFactorLimit
      const minB = Math.max(effectiveMinFactorLimit, operandA - effectiveMaxResult);
      const maxB = Math.min(effectiveMaxFactorLimit, operandA - effectiveMinResult);
      
      if (maxB < minB || maxB < 0) continue;
      
      operandB = Math.floor(Math.random() * (maxB - minB + 1)) + minB;
      
      // Ensure result is non-negative and in range
      const result = operandA - operandB;
      if (result < effectiveMinResult || result > effectiveMaxResult) continue;
      
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
