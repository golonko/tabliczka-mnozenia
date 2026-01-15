# Localization Documentation

## Overview

The application supports internationalization (i18n) through a simple translation system. Currently supports Polish (default) and English.

## Implementation

### Translation System

Located in `locales.ts`, the translation system uses a simple object-based approach:

```typescript
export type Language = 'pl' | 'en';

export const translations = {
  pl: { /* Polish translations */ },
  en: { /* English translations */ },
} as const;
```

### Usage Pattern

```typescript
import { Language, translations } from './locales';

const [language, setLanguage] = useState<Language>('pl');
const t = translations[language];

// Use in component
<h1>{t.generator}</h1>
```

## Translation Keys

### Generator Page

| Key | Polish | English |
|-----|--------|---------|
| `generator` | Generator | Generator |
| `configureAndPrint` | Skonfiguruj i wydrukuj zadania. | Configure and print problems. |
| `settings` | Ustawienia | Settings |
| `columns` | Liczba kolumn | Number of columns |
| `identicalCopies` | Identyczne kopie | Identical copies |
| `problemsPerColumn` | Liczba działań na kolumnę | Problems per column |
| `resultRange` | Zakres wyników | Result range |
| `factorRange` | Zakres czynników | Factor range |
| `operations` | Działania | Operations |
| `multiplication` | Mnożenie | Multiplication |
| `division` | Dzielenie | Division |
| `addition` | Dodawanie | Addition |
| `subtraction` | Odejmowanie | Subtraction |
| `generateNew` | Generuj nowy zestaw | Generate new set |
| `printWorksheet` | Drukuj arkusz | Print worksheet |

### Interactive Exercise Page

| Key | Polish | English |
|-----|--------|---------|
| `interactiveExercise` | Ćwiczenie interaktywne | Interactive Exercise |
| `startExercise` | Rozpocznij ćwiczenie | Start Exercise |
| `backToGenerator` | Powrót do generatora | Back to Generator |
| `checkAnswers` | Sprawdź odpowiedzi | Check Answers |
| `generateNewSet` | Generuj nowy zestaw | Generate New Set |
| `correctAnswers` | Poprawne odpowiedzi | Correct answers |
| `totalProblems` | Razem problemów | Total problems |

## Language Selection

### UI Components

Language selection is available in:
1. **SettingsPanel**: Flag buttons in header (🇵🇱 🇬🇧)
2. **InteractiveExercise**: Flag buttons in header (🇵🇱 🇬🇧)

### Implementation

```typescript
<button
  onClick={() => onLanguageChange('pl')}
  className={`... ${language === 'pl' ? 'opacity-100' : 'opacity-40'}`}
  title="Polski"
>
  🇵🇱
</button>
```

### State Management

- Language state is managed in `App.tsx`
- Passed down to components that need translations
- Persists during navigation (not stored in localStorage currently)

## Adding New Languages

### Step 1: Update Type Definition

```typescript
export type Language = 'pl' | 'en' | 'de'; // Add new language
```

### Step 2: Add Translations

```typescript
export const translations = {
  pl: { /* ... */ },
  en: { /* ... */ },
  de: {  // Add new language block
    generator: 'Generator',
    settings: 'Einstellungen',
    // ... all other keys
  },
} as const;
```

### Step 3: Add Language Selector

Add flag button in `SettingsPanel.tsx` and `InteractiveExercise.tsx`:

```typescript
<button
  onClick={() => onLanguageChange('de')}
  className={`... ${language === 'de' ? 'opacity-100' : 'opacity-40'}`}
  title="Deutsch"
>
  🇩🇪
</button>
```

### Step 4: Update Default

Optionally change default language in `App.tsx`:

```typescript
const [language, setLanguage] = useState<Language>('de');
```

## Translation Best Practices

1. **Consistency**: Use same terminology across all keys
2. **Completeness**: Ensure all keys exist in all languages
3. **Context**: Some translations may need context (e.g., "Od" vs "From")
4. **Length**: Consider UI space (Polish text is often longer)
5. **Formatting**: Keep formatting consistent (punctuation, capitalization)

## Missing Translations

If a translation key is missing:
- TypeScript will show an error (type-safe)
- Application will show `undefined` or crash
- Always add translations for all keys in all languages

## Future Enhancements

Potential improvements:
- **Localization Storage**: Save language preference in localStorage
- **Browser Detection**: Auto-detect user's preferred language
- **Pluralization**: Support plural forms (e.g., "1 problem" vs "2 problems")
- **Date/Number Formatting**: Locale-specific formatting
- **RTL Support**: Right-to-left languages
- **Translation Management**: External translation files (JSON)
- **i18n Library**: Use library like `react-i18next` for advanced features

## Current Limitations

1. **No Pluralization**: Hard-coded singular/plural forms
2. **No Context**: Same translation used everywhere
3. **No Formatting**: Numbers and dates not localized
4. **No Persistence**: Language choice not saved
5. **Manual Management**: All translations in single file

## Testing Translations

To test translations:
1. Switch language using flag buttons
2. Verify all UI text changes
3. Check for missing translations (undefined values)
4. Test with different screen sizes (text length varies)
5. Verify print layout (some languages use more space)
