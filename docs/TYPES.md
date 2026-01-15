# Type Definitions Documentation

## Overview

This document describes all TypeScript types and interfaces used throughout the application.

## Core Types

### MathProblem

Represents a single math problem.

```typescript
interface MathProblem {
  id: string;                    // Unique identifier (e.g., "prob-1234567890-0-0.123")
  operandA: number;               // First operand
  operandB: number;               // Second operand
  operation: 'multiply' | 'divide' | 'add' | 'subtract';  // Operation type
  display: string;                // Formatted display string (e.g., "5 • 3 =")
}
```

**Properties**:
- `id`: Generated using timestamp, index, and random number for uniqueness
- `operandA`, `operandB`: The two numbers in the problem
- `operation`: One of four supported operation types
- `display`: Human-readable string with proper symbols (•, :, +, −)

**Example**:
```typescript
{
  id: "prob-1704067200000-5-0.456",
  operandA: 7,
  operandB: 8,
  operation: "multiply",
  display: "7 • 8 ="
}
```

---

### GeneratorSettings

Configuration object for problem generation.

```typescript
interface GeneratorSettings {
  problemCount: number;          // Problems per column (10-50)
  columns: number;                // Number of columns (2-8)
  copies: number;                 // Number of identical column copies (1 to columns)
  allowMultiplication: boolean;   // Enable multiplication problems
  allowDivision: boolean;         // Enable division problems
  allowAddition: boolean;         // Enable addition problems
  allowSubtraction: boolean;       // Enable subtraction problems
  minResult: number;              // Minimum result value
  maxResult: number;              // Maximum result value
  minFactor: number;               // Minimum operand/factor value
  maxFactor: number;               // Maximum operand/factor value
}
```

**Constraints**:
- `problemCount`: Typically 10-50, but no hard limit
- `columns`: 2-8 (enforced in UI)
- `copies`: 1 to `columns` (automatically adjusted)
- `minResult` ≤ `maxResult`
- `minFactor` ≤ `maxFactor`
- At least one operation type should be enabled (falls back to multiplication)

**Default Values**:
```typescript
{
  problemCount: 20,
  columns: 4,
  copies: 2,
  allowMultiplication: true,
  allowDivision: true,
  allowAddition: false,
  allowSubtraction: false,
  minResult: 1,
  maxResult: 100,
  minFactor: 1,
  maxFactor: 10,
}
```

---

### Language

UI language identifier.

```typescript
type Language = 'pl' | 'en';
```

**Values**:
- `'pl'`: Polish (default)
- `'en'`: English

---

### Page

Application page identifier.

```typescript
type Page = 'generator' | 'exercise';
```

**Values**:
- `'generator'`: Worksheet generator page (default)
- `'exercise'`: Interactive exercise page

---

## Component Props Types

### SettingsPanelProps

```typescript
interface SettingsPanelProps {
  settings: GeneratorSettings;
  onSettingsChange: (newSettings: GeneratorSettings) => void;
  onGenerate: () => void;
  onPrint: () => void;
  onStartExercise: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}
```

---

### WorksheetProps

```typescript
interface WorksheetProps {
  columnsData: MathProblem[][];
}
```

**Note**: `columnsData` is a 2D array where:
- Outer array represents columns
- Inner arrays contain problems for each column
- All columns have the same length (same `problemCount`)

---

### InteractiveExerciseProps

```typescript
interface InteractiveExerciseProps {
  settings: GeneratorSettings;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBackToGenerator: () => void;
}
```

---

## Internal Types

### ProblemAnswer

Used in `InteractiveExercise` to track user answers.

```typescript
interface ProblemAnswer {
  id: string;                    // Matches MathProblem.id
  answer: string;                // User's input (as string)
  isCorrect?: boolean;            // Validation result (undefined until checked)
  expectedAnswer?: number;        // Calculated correct answer
}
```

**Lifecycle**:
1. Initialized with empty `answer` and `expectedAnswer` calculated
2. `answer` updated as user types
3. `isCorrect` set when "Check Answers" is clicked
4. Reset when new problem set is generated

---

### GenerateOptions

Options for math problem generation service.

```typescript
interface GenerateOptions {
  allowMultiplication: boolean;
  allowDivision: boolean;
  allowAddition: boolean;
  allowSubtraction: boolean;
}
```

---

### TranslationKey

Type-safe key for translation strings.

```typescript
type TranslationKey = keyof typeof translations.pl;
```

**Available Keys**:
- `settings`
- `columns`
- `identicalCopies`
- `problemsPerColumn`
- `resultRange`
- `factorRange`
- `operations`
- `multiplication`
- `division`
- `addition`
- `subtraction`
- `generateNew`
- `printWorksheet`
- `generator`
- `configureAndPrint`
- `interactiveExercise`
- `startExercise`
- `backToGenerator`
- `checkAnswers`
- `generateNewSet`
- `correctAnswers`
- `totalProblems`

---

## Type Utilities

### Type Guards

Currently no custom type guards, but could be added for:
- Validating `GeneratorSettings`
- Checking if `MathProblem` is valid
- Ensuring `Language` is supported

### Type Assertions

Used sparingly, primarily for:
- DOM element refs
- Event handlers
- API responses (if any)

---

## Type Safety Best Practices

1. **Strict Null Checks**: TypeScript strict mode enabled
2. **No `any` Types**: All types are explicitly defined
3. **Union Types**: Used for limited value sets (Language, Page, operation)
4. **Optional Properties**: Marked with `?` where appropriate
5. **Readonly**: Could be used for immutable data structures

---

## Future Type Enhancements

Potential additions:
- `DifficultyLevel: 'easy' | 'medium' | 'hard'`
- `ProblemTemplate` for predefined problem sets
- `UserProgress` for tracking exercise history
- `ExportFormat` for different output types
- `ValidationResult` for more detailed answer checking
