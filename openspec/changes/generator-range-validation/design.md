## Context

The settings panel currently stores range boundaries as numbers and clamps them inside each input `onChange`. That keeps settings internally valid, but it turns intermediate typing states into destructive edits. The generator itself already accepts numeric boundaries, so the change can keep the same public data shape while moving validation from input-time mutation to generation-time normalization.

## Goals / Non-Goals

**Goals:**

- Preserve what the user types into result and factor range fields during editing.
- Treat reversed ranges as valid input by normalizing them when generating problems.
- Give users clear localized feedback when a reversed range will be interpreted in sorted order.
- Keep worksheet and exercise generation behavior consistent.

**Non-Goals:**

- Add a new form library or validation dependency.
- Persist draft settings to storage.
- Redesign the settings panel beyond the range validation feedback.
- Change the supported arithmetic operation types.

## Decisions

### Keep numeric settings as the source of truth

Continue storing `GeneratorSettings` range fields as numbers, but stop comparing one boundary to the other inside the input `onChange` handlers. This is the smallest compatible change for `App.tsx`, `SettingsPanel.tsx`, and existing generator calls.

Alternative considered: store range inputs as strings and commit parsed values on blur. That better represents empty/transient input states, but it requires a broader type change and extra commit logic. The current issue can be solved by avoiding cross-boundary clamping and treating unparsable input with existing numeric fallbacks.

### Normalize ranges at generation boundaries

Add a small normalization path before arithmetic generation uses the ranges. Effective min/max values should be `Math.min(a, b)` and `Math.max(a, b)` after applying hard lower safeguards. Both worksheet generation and interactive exercises call `generateProblems`, so centralizing this in or immediately before `services/mathGenerator.ts` keeps behavior consistent.

Alternative considered: normalize only in `App.tsx` before calling the service. That would leave `InteractiveExercise.tsx` and any future direct callers responsible for duplicating the same logic.

### Warn instead of blocking reversed ranges

Show localized helper/warning text when result or factor boundaries are reversed. This preserves user control while making the effective behavior visible.

Alternative considered: silently normalize without UI feedback. That is convenient but can be surprising when the worksheet uses `20-30` after the fields display `30-20`.

## Risks / Trade-offs

- Reversed ranges may generate automatically while the user is mid-editing -> the warning makes this visible, and generation remains valid rather than failing or clamping.
- Empty input handling is limited by controlled number inputs backed by numeric settings -> keep the existing fallback behavior for blank/unparsable values unless a broader string-draft change is requested later.
- Warning copy adds translation maintenance -> update both Polish and English keys in `locales.ts`.

## Migration Plan

1. Update range input handlers to stop cross-clamping min/max pairs during typing.
2. Add centralized effective range normalization in the problem generation path.
3. Add localized warning/helper text for reversed result and factor ranges.
4. Verify with `npm run build` and manual range-entry flows on `/` and generated problems on `/test`.

Rollback is limited to reverting the range input handler, warning copy, and normalization changes.

## Open Questions

- Should empty range fields be allowed as true temporary draft strings in a future change, or is preserving non-destructive numeric edits enough for now?
