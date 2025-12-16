export type Language = 'pl' | 'en';

export interface Translations {
  // App
  generator: string;
  configureAndPrint: string;
  
  // Settings Panel
  settings: string;
  columns: string;
  identicalCopies: string;
  problemsPerColumn: string;
  resultRange: string;
  factorRange: string;
  division: string;
  generateNew: string;
  pagesAbbr: string;
  eachPageDifferent: string;
  
  // Worksheet
  page: string;
  columnsLabel: string;
  score: string;
}

export const translations: Record<Language, Translations> = {
  pl: {
    // App
    generator: 'Generator',
    configureAndPrint: 'Skonfiguruj i wydrukuj zadania.',
    
    // Settings Panel
    settings: 'Ustawienia',
    columns: 'Liczba kolumn',
    identicalCopies: 'Identyczne kopie',
    problemsPerColumn: 'Liczba działań na kolumnę',
    resultRange: 'Zakres wyników',
    factorRange: 'Zakres czynników',
    division: 'Dzielenie',
    generateNew: 'Generuj nowy zestaw',
    pagesAbbr: 'str.',
    eachPageDifferent: 'Każda strona będzie miała inne działania',
    
    // Worksheet
    page: 'Strona',
    columnsLabel: 'kolumn',
    score: 'Wynik:',
  },
  en: {
    // App
    generator: 'Generator',
    configureAndPrint: 'Configure and print worksheets.',
    
    // Settings Panel
    settings: 'Settings',
    columns: 'Columns',
    identicalCopies: 'Identical copies',
    problemsPerColumn: 'Problems per column',
    resultRange: 'Result range',
    factorRange: 'Factor range',
    division: 'Division',
    generateNew: 'Generate new set',
    pagesAbbr: 'pgs',
    eachPageDifferent: 'Each page will have different problems',
    
    // Worksheet
    page: 'Page',
    columnsLabel: 'columns',
    score: 'Score:',
  },
};

