# Architecture Documentation

## Overview

Tabliczka Mnożenia (Multiplication Table) is a React-based web application for generating and printing math worksheets, as well as providing interactive exercises for children. The application is built with modern web technologies and follows a component-based architecture.

## Technology Stack

- **Framework**: React 19.2.3
- **Language**: TypeScript 5.8.2
- **Build Tool**: Vite 6.2.0
- **Styling**: Tailwind CSS (via CDN)
- **Icons**: Lucide React 0.561.0
- **Analytics**: Vercel Analytics & Speed Insights
- **Font**: Inter (Google Fonts)

## Project Structure

```
tabliczka-mnozenia/
├── App.tsx                    # Main application component with routing
├── index.tsx                  # Application entry point
├── index.html                 # HTML template
├── types.ts                   # TypeScript type definitions
├── locales.ts                 # Internationalization strings
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
├── components/
│   ├── SettingsPanel.tsx     # Settings/configuration panel
│   ├── Worksheet.tsx          # Printable worksheet component
│   └── InteractiveExercise.tsx # Interactive exercise page
└── services/
    └── mathGenerator.ts      # Math problem generation logic
```

## Application Flow

### Page Navigation

The application uses a simple state-based routing system with two main pages:

1. **Generator Page** (`'generator'`): Default page for configuring and printing worksheets
2. **Exercise Page** (`'exercise'`): Interactive exercise page for kids to practice

Navigation is handled via the `currentPage` state in `App.tsx`.

### State Management

The application uses React's built-in state management:

- **App.tsx**: Manages global state including:
  - `currentPage`: Current page ('generator' | 'exercise')
  - `settings`: GeneratorSettings object with all configuration
  - `columnsData`: Generated math problems organized by columns
  - `language`: Current language ('pl' | 'en')

- **InteractiveExercise.tsx**: Manages local state for:
  - `problems`: Current set of math problems
  - `answers`: User answers with validation state
  - `hasChecked`: Whether answers have been validated

### Data Flow

1. **Settings Configuration**: User adjusts settings in `SettingsPanel`
2. **Problem Generation**: Settings trigger automatic regeneration via `useEffect` hooks
3. **Problem Display**: Generated problems are passed to `Worksheet` or `InteractiveExercise`
4. **User Interaction**: User can print worksheets or solve interactive exercises

## Key Design Decisions

### 1. Print-Optimized Layout

The worksheet component uses CSS container queries and dynamic font sizing to ensure problems fit perfectly on printed pages. The layout adapts to:
- Number of problems per column
- Number of columns
- Available space

### 2. Identical Copies Feature

The generator supports creating multiple identical columns (controlled by `copies` setting), useful for:
- Creating multiple worksheets for a class
- Generating practice sheets with the same problems

### 3. Responsive Design

- Desktop: Side-by-side layout with settings panel and worksheet preview
- Mobile: Stacked layout
- Print: Optimized single-column layout with all print-specific styles

### 4. Internationalization

Simple translation system using a `translations` object with language keys. Currently supports:
- Polish (pl) - default
- English (en)

### 5. Problem Generation Algorithm

The math generator ensures:
- Problems respect configured ranges (result range, factor range)
- No duplicate problems within a set
- Valid mathematical operations (e.g., division results in whole numbers)
- Safety limits to prevent infinite loops

## Component Hierarchy

```
App
├── SettingsPanel (Generator page only)
│   └── Language selector
├── Worksheet (Generator page only)
│   └── Problem columns with auto-scaling
└── InteractiveExercise (Exercise page only)
    ├── Language selector
    ├── Problem grid with inputs
    └── Answer validation UI
```

## Styling Approach

- **Tailwind CSS**: Utility-first CSS framework loaded via CDN
- **Print Styles**: Extensive use of `@media print` and `.no-print` classes
- **Responsive**: Mobile-first approach with breakpoints (sm, md, lg)
- **Dynamic Sizing**: CSS container queries for automatic font scaling

## Build Configuration

- **Vite**: Fast build tool with HMR (Hot Module Replacement)
- **TypeScript**: Strict type checking enabled
- **Path Aliases**: `@/*` maps to project root
- **Port**: Development server runs on port 3000

## Analytics Integration

- **Vercel Analytics**: Page view and user behavior tracking
- **Speed Insights**: Performance monitoring

Both are conditionally rendered on both pages.

## Browser Compatibility

- Modern browsers with ES2022 support
- CSS Container Queries support required for worksheet layout
- Print functionality tested in major browsers

## Future Considerations

Potential areas for enhancement:
- State persistence (localStorage)
- Export to PDF
- Problem difficulty levels
- Progress tracking for exercises
- Additional languages
- Custom problem templates
