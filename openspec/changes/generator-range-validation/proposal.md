## Why

Range fields currently clamp values during every keystroke, which makes ordinary edits frustrating. For example, changing a maximum from `30` to `150` can be forced back to `20` as soon as the user types the first digit.

## What Changes

- Allow result range and factor range inputs to preserve the value the user is actively typing instead of immediately overwriting it.
- Normalize reversed bounds when generating problems, so `30` to `20` is treated as the effective range `20` to `30`.
- Keep hard minimum safety rules for generation, but apply them to the effective range rather than destructively rewriting the input mid-edit.
- Add localized warning/help text when range values are reversed or otherwise interpreted differently from their raw order.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `worksheet-generator`: Range input controls become non-destructive while typing and surface warnings/help instead of clamping raw typed values.
- `problem-generation`: Generation consumes normalized effective ranges so reversed bounds still produce valid arithmetic problems.

## Impact

- Affected code: `components/SettingsPanel.tsx`, `App.tsx`, `services/mathGenerator.ts`, `types.ts`, and `locales.ts`.
- No API, routing, dependency, or build-system changes.
- Verification should include `npm run build` plus manual checks for typing into min/max result and factor fields, reversed ranges, normal ranges, and generator/exercise output.
