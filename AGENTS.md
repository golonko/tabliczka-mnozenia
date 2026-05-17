# Agent Notes

## Project Summary

This is a small React 19 + TypeScript + Vite app for generating printable math worksheets and running interactive arithmetic exercises for children. The UI is bilingual, with Polish as the default language and English as the secondary language.

## Important Files

- `App.tsx`: Main app shell, routes (`/` generator, `/test` exercise), shared settings, worksheet generation, print action.
- `components/SettingsPanel.tsx`: Generator controls, operation toggles, language selector, print/exercise actions.
- `components/Worksheet.tsx`: Print-focused worksheet layout with dynamic font sizing and column dividers.
- `components/InteractiveExercise.tsx`: Interactive practice page, answer checking, keyboard flow.
- `services/mathGenerator.ts`: Core arithmetic problem generation logic and constraints.
- `types.ts`: Shared problem/settings types.
- `locales.ts`: All UI strings; add every new label in both `pl` and `en`.
- `index.html`: Tailwind CDN, global print CSS, external widget script, app mount.
- `docs/`: Existing architecture, component, service, type, localization, and development docs.

## Commands

- `npm run dev`: Start Vite dev server on port `3000`.
- `npm run build`: Production build and TypeScript validation.
- `npm run preview`: Preview the built app.

There is no automated test suite in this repo. Use `npm run build` as the minimum verification step, then manually check the affected generator/exercise/print flow in a browser when UI or layout changes are made.

## Implementation Guidelines

- Keep the app dependency-light and follow the existing functional React component style.
- Use TypeScript types from `types.ts` for shared data structures.
- Keep problem generation rules centralized in `services/mathGenerator.ts`.
- When adding UI text, update `locales.ts` for both languages.
- Preserve the print behavior in `Worksheet.tsx` and `index.html`; check print preview after layout changes.
- Prefer existing Tailwind utility styling and lucide-react icons.
- Treat `dist/` as build output. Do not edit it by hand unless the task explicitly targets generated artifacts.

## Manual QA Checklist

- Generator creates problems for selected operation types and ranges.
- Identical copies still duplicate columns in the intended groups.
- `/test` generates exercises, accepts answers, and checks results correctly.
- Language switching works on both pages.
- Worksheet remains readable on screen and in print preview.
