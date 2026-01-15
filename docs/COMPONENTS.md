# Components Documentation

## Component Overview

This document describes all React components in the application, their props, state, and behavior.

## App.tsx

**Purpose**: Main application component that handles routing and global state management.

### State

- `currentPage: 'generator' | 'exercise'` - Current active page
- `settings: GeneratorSettings` - Configuration for problem generation
- `columnsData: MathProblem[][]` - Generated problems organized by columns
- `language: 'pl' | 'en'` - Current UI language

### Key Functions

- `generate()`: Generates new problems based on current settings
- `handlePrint()`: Triggers browser print dialog
- `handleStartExercise()`: Navigates to exercise page
- `handleBackToGenerator()`: Returns to generator page

### Effects

- Initial generation on mount
- Auto-regeneration when relevant settings change

### Props

None (root component)

---

## SettingsPanel.tsx

**Purpose**: Configuration panel for worksheet generation settings.

### Props

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

### Features

1. **Columns Selection**: Range slider (2-8 columns)
2. **Identical Copies**: Button group (1 to current column count)
3. **Problems Per Column**: Range slider (10-50)
4. **Result Range**: Min/max number inputs
5. **Factor Range**: Min/max number inputs
6. **Operations**: Toggle switches for:
   - Multiplication
   - Division
   - Addition
   - Subtraction
7. **Actions**:
   - Start Exercise (green button)
   - Generate New Set (indigo button)
   - Print Worksheet (indigo button)
8. **Language Selector**: Polish/English flags

### Behavior

- Automatically adjusts `copies` when `columns` changes to prevent invalid state
- Validates number inputs (min/max constraints)
- All changes trigger parent component updates

---

## Worksheet.tsx

**Purpose**: Displays printable math problems in a columnar layout.

### Props

```typescript
interface WorksheetProps {
  columnsData: MathProblem[][];
}
```

### Features

1. **Auto-Scaling Font**: Uses CSS container queries to scale font size based on:
   - Vertical space (75% of container height / problem count)
   - Horizontal space (8% of container width)
   - Clamped between 9px and 28px

2. **Column Layout**: 
   - Flexbox layout with equal-width columns
   - Vertical dividers with scissor icons between columns
   - Score box at bottom of each column

3. **Problem Display**:
   - Numbered problems (1., 2., 3., ...)
   - Monospace font for equations
   - Dotted answer lines

4. **Print Optimization**:
   - Removes shadows and borders in print mode
   - Ensures proper page breaks
   - Full-width layout for printing

### Styling

- Uses CSS Grid for even row distribution
- Container queries for responsive font sizing
- Print-specific styles via `@media print`

---

## InteractiveExercise.tsx

**Purpose**: Interactive exercise page where kids can solve math problems.

### Props

```typescript
interface InteractiveExerciseProps {
  settings: GeneratorSettings;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onBackToGenerator: () => void;
}
```

### State

- `problems: MathProblem[]` - Current set of problems
- `answers: ProblemAnswer[]` - User answers with validation state
- `hasChecked: boolean` - Whether validation has been performed
- `inputRefs: RefObject<HTMLInputElement>[]` - Refs for keyboard navigation

### Features

1. **Problem Generation**: 
   - Generates problems on mount
   - Uses same settings as generator page
   - Can regenerate new sets

2. **Answer Input**:
   - Number input for each problem
   - Enter key moves to next input (Tab-like behavior)
   - Input refs managed for keyboard navigation

3. **Answer Validation**:
   - "Check Answers" button validates all answers
   - Incorrect answers highlighted in red
   - Summary shows correct/total count

4. **Visual Feedback**:
   - Red border and background for incorrect answers
   - Summary box appears after checking
   - Disabled state for check button when no answers entered

5. **Navigation**:
   - Language selector (Polish/English flags)
   - Back to Generator button
   - Generate New Set button (clears all state)

### Answer Validation Logic

```typescript
const checkAnswers = () => {
  setAnswers(prev => prev.map(ans => {
    const numericAnswer = parseFloat(ans.answer);
    const isCorrect = !isNaN(numericAnswer) && numericAnswer === ans.expectedAnswer;
    return { ...ans, isCorrect };
  }));
  setHasChecked(true);
};
```

### Keyboard Navigation

- Enter key moves focus to next input field
- Uses refs array to manage input focus
- Resets refs when generating new problem set

### Layout

- Scrollable page container
- Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Header with actions and summary
- Problem cards with input fields

---

## Component Communication Patterns

### Parent-Child Communication

1. **App → SettingsPanel**: Passes settings and callbacks
2. **App → Worksheet**: Passes generated problems
3. **App → InteractiveExercise**: Passes settings and navigation callbacks

### State Lifting

- All configuration state lives in `App.tsx`
- Child components receive props and callbacks
- Changes bubble up via callback functions

### Event Flow

```
User Action → Component Handler → Parent Callback → State Update → Re-render
```

## Styling Conventions

All components use:
- Tailwind CSS utility classes
- Consistent color scheme (indigo primary, gray neutrals)
- Responsive breakpoints (sm, md, lg)
- Print-specific classes (`.no-print`, print media queries)

## Accessibility Considerations

- Semantic HTML elements
- Keyboard navigation support
- Focus states on interactive elements
- ARIA labels where appropriate (via title attributes)
- Color contrast for readability
