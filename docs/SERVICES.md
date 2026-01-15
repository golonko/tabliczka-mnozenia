# Services Documentation

## Overview

The services layer contains business logic for generating math problems. This is separated from UI components to maintain clean architecture and testability.

## mathGenerator.ts

**Purpose**: Generates random math problems based on configuration constraints.

### Function Signature

```typescript
export const generateProblems = (
  count: number,
  options: GenerateOptions,
  minResult: number,
  maxResult: number,
  minFactorLimit: number,
  maxFactorLimit: number
): MathProblem[]
```

### Parameters

- `count: number` - Number of problems to generate
- `options: GenerateOptions` - Allowed operation types
  ```typescript
  {
    allowMultiplication: boolean;
    allowDivision: boolean;
    allowAddition: boolean;
    allowSubtraction: boolean;
  }
  ```
- `minResult: number` - Minimum value for problem results
- `maxResult: number` - Maximum value for problem results
- `minFactorLimit: number` - Minimum value for operands/factors
- `maxFactorLimit: number` - Maximum value for operands/factors

### Return Value

Array of `MathProblem` objects, each containing:
- `id: string` - Unique identifier
- `operandA: number` - First operand
- `operandB: number` - Second operand
- `operation: 'multiply' | 'divide' | 'add' | 'subtract'` - Operation type
- `display: string` - Formatted string for display (e.g., "5 • 3 =")

### Algorithm Details

#### 1. Operation Selection

- Builds list of allowed operations from `options`
- Falls back to multiplication if no operations are enabled
- Randomly selects operation for each problem

#### 2. Multiplication Generation

```typescript
// Strategy:
// 1. Pick Factor A randomly between minFactorLimit and maxFactorLimit
// 2. Calculate valid range for Factor B so product is within [minResult, maxResult]
// 3. Ensure Factor B is also within [minFactorLimit, maxFactorLimit]

const factorA = random(minFactorLimit, maxFactorLimit);
const minB = max(minFactorLimit, ceil(minResult / factorA));
const maxB = min(maxFactorLimit, floor(maxResult / factorA));
const factorB = random(minB, maxB);
```

- Randomizes order of factors (50% chance to swap)
- Display format: `"operandA • operandB ="`

#### 3. Division Generation

```typescript
// Strategy: Use multiplication result, then divide
// product : divisor = quotient

const product = factorA * factorB;
const divisor = random(factorA, factorB);
operandA = product;
operandB = divisor;
```

- Ensures whole number results (product must be divisible by divisor)
- Display format: `"operandA : operandB ="`

#### 4. Addition Generation

```typescript
// Strategy:
// 1. Pick target result in [minResult, maxResult]
// 2. Split into two operands within factor limits

const targetResult = random(minResult, maxResult);
const operandA = random(minFactorLimit, min(maxFactorLimit, targetResult - minFactorLimit));
const operandB = targetResult - operandA;
```

- Ensures both operands are within factor limits
- Display format: `"operandA + operandB ="`

#### 5. Subtraction Generation

```typescript
// Strategy:
// 1. Pick operandA (larger number) in [minFactorLimit, maxFactorLimit]
// 2. Calculate valid range for operandB so result is in [minResult, maxResult]

const operandA = random(minFactorLimit, maxFactorLimit);
const minB = max(minFactorLimit, operandA - maxResult);
const maxB = min(maxFactorLimit, operandA - minResult);
const operandB = random(minB, maxB);
```

- Ensures non-negative results
- Ensures result is within specified range
- Display format: `"operandA − operandB ="` (uses minus sign)

### Duplicate Prevention

- Maintains `Set<string>` of used problem displays
- Skips problems that have already been generated
- Uses display string as uniqueness key

### Safety Mechanisms

1. **Maximum Attempts**: Prevents infinite loops
   ```typescript
   const MAX_ATTEMPTS = count * 100;
   ```

2. **Range Validation**: Checks if valid range exists before generating
   ```typescript
   if (maxB < minB) continue; // Retry with new values
   ```

3. **Constraint Verification**: Double-checks final values meet all constraints

### Error Handling

- Returns empty array if generation fails
- Gracefully handles impossible constraints (e.g., minResult > maxResult)
- Logs no errors (fails silently, but could be enhanced)

### Performance Considerations

- O(n) complexity where n is problem count
- Worst case: O(n * 100) if many retries needed
- Typically generates problems in < 100ms for 50 problems

### Usage Example

```typescript
import { generateProblems } from './services/mathGenerator';

const problems = generateProblems(
  20, // count
  {
    allowMultiplication: true,
    allowDivision: true,
    allowAddition: false,
    allowSubtraction: false,
  },
  1,   // minResult
  100, // maxResult
  1,   // minFactorLimit
  10   // maxFactorLimit
);
```

### Testing Considerations

The generator can be tested by:
1. Verifying all problems meet constraints
2. Checking for duplicates
3. Validating operation types match options
4. Ensuring results are within specified ranges
5. Testing edge cases (min/max values, single operation type)

### Future Enhancements

Potential improvements:
- Difficulty levels (easy/medium/hard)
- Problem templates (specific number families)
- Weighted random selection (favor certain operations)
- Progress tracking (avoid recently generated problems)
- Export/import problem sets
- Problem validation service (check if problem is solvable)
