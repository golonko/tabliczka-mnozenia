export type Language = 'pl' | 'en';

export const translations = {
  pl: {
    settings: 'Ustawienia',
    columns: 'Liczba kolumn',
    identicalCopies: 'Identyczne kopie',
    problemsPerColumn: 'Liczba działań na kolumnę',
    resultRange: 'Zakres wyników',
    factorRange: 'Zakres czynników',
    operations: 'Działania',
    multiplication: 'Mnożenie',
    division: 'Dzielenie',
    addition: 'Dodawanie',
    subtraction: 'Odejmowanie',
    generateNew: 'Generuj nowy zestaw',
    printWorksheet: 'Drukuj arkusz',
    generator: 'Generator',
    configureAndPrint: 'Skonfiguruj i wydrukuj zadania.',
  },
  en: {
    settings: 'Settings',
    columns: 'Number of columns',
    identicalCopies: 'Identical copies',
    problemsPerColumn: 'Problems per column',
    resultRange: 'Result range',
    factorRange: 'Factor range',
    operations: 'Operations',
    multiplication: 'Multiplication',
    division: 'Division',
    addition: 'Addition',
    subtraction: 'Subtraction',
    generateNew: 'Generate new set',
    printWorksheet: 'Print worksheet',
    generator: 'Generator',
    configureAndPrint: 'Configure and print problems.',
  },
} as const;

export type TranslationKey = keyof typeof translations.pl;

