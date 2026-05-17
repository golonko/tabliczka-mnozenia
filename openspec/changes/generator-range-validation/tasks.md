## 1. Range Input Behavior

- [x] 1.1 Update result range input handlers so they preserve typed numeric values without clamping against the opposite boundary during `onChange`
- [x] 1.2 Update factor range input handlers so they preserve typed numeric values without clamping against the opposite boundary during `onChange`
- [x] 1.3 Keep existing hard lower fallback behavior for unparsable or empty number input values unless a broader string-draft model is introduced

## 2. Effective Range Normalization

- [x] 2.1 Add centralized normalization for result and factor ranges before arithmetic generation uses them
- [x] 2.2 Ensure reversed result bounds generate problems using the smaller value as effective minimum and larger value as effective maximum
- [x] 2.3 Ensure reversed factor bounds generate problems using the smaller value as effective minimum and larger value as effective maximum
- [x] 2.4 Verify worksheet generation and interactive exercise generation both use the same normalized range behavior

## 3. User Feedback and Localization

- [x] 3.1 Add Polish and English translation keys for reversed result range feedback
- [x] 3.2 Add Polish and English translation keys for reversed factor range feedback
- [x] 3.3 Display concise helper or warning text below affected range controls when boundaries are reversed
- [x] 3.4 Keep warning layout compact so the settings panel remains usable on narrow screens

## 4. Verification

- [x] 4.1 Run `npm run build`
- [x] 4.2 Manually verify editing max result from `30` to `150` does not get overwritten after typing `1`
- [x] 4.3 Manually verify reversed result and factor ranges show localized feedback and still generate worksheet problems
- [x] 4.4 Manually verify `/test` exercises use normalized reversed ranges consistently
