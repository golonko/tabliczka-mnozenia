# Development Guide

## Prerequisites

- **Node.js**: Version 18+ recommended
- **npm**: Comes with Node.js
- **Modern Browser**: Chrome, Firefox, Safari, or Edge (latest versions)

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Development Server

```bash
# Start development server (runs on http://localhost:3000)
npm run dev
```

The development server includes:
- Hot Module Replacement (HMR) for instant updates
- TypeScript type checking
- Fast refresh for React components

### Building for Production

```bash
# Build production bundle
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
# Preview production build locally
npm run preview
```

## Project Structure

```
tabliczka-mnozenia/
├── docs/                    # Documentation (this folder)
├── components/              # React components
│   ├── SettingsPanel.tsx
│   ├── Worksheet.tsx
│   └── InteractiveExercise.tsx
├── services/                # Business logic
│   └── mathGenerator.ts
├── App.tsx                  # Main app component
├── index.tsx                # Entry point
├── index.html               # HTML template
├── types.ts                 # TypeScript types
├── locales.ts               # Translations
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

## Development Workflow

### Making Changes

1. **Edit Files**: Make changes to source files
2. **Auto-Reload**: Browser automatically refreshes (HMR)
3. **Type Checking**: TypeScript errors shown in terminal
4. **Test**: Verify changes in browser

### Code Style

- **TypeScript**: Strict mode enabled
- **React**: Functional components with hooks
- **Styling**: Tailwind CSS utility classes
- **Naming**: PascalCase for components, camelCase for functions

### Adding New Features

1. **Create Component**: Add new component in `components/`
2. **Add Types**: Update `types.ts` if needed
3. **Add Translations**: Update `locales.ts` for new UI text
4. **Update App**: Integrate new component in `App.tsx`
5. **Test**: Verify functionality and styling

### Debugging

- **Browser DevTools**: Use React DevTools extension
- **Console Logs**: Add `console.log()` for debugging
- **Type Errors**: Check terminal for TypeScript errors
- **Network**: Check Network tab for failed requests

## Configuration Files

### vite.config.ts

Vite configuration:
- Port: 3000
- Host: 0.0.0.0 (accessible on network)
- React plugin enabled
- Path alias: `@/*` → project root

### tsconfig.json

TypeScript configuration:
- Target: ES2022
- Module: ESNext
- JSX: react-jsx
- Strict type checking
- Path aliases configured

### package.json

Dependencies:
- React 19.2.3
- TypeScript 5.8.2
- Vite 6.2.0
- Tailwind CSS (via CDN)
- Lucide React (icons)
- Vercel Analytics & Speed Insights

## Common Tasks

### Adding a New Translation Key

1. Add key to both `pl` and `en` in `locales.ts`:
```typescript
export const translations = {
  pl: {
    // ... existing keys
    newKey: 'Polish translation',
  },
  en: {
    // ... existing keys
    newKey: 'English translation',
  },
} as const;
```

2. Use in component:
```typescript
const t = translations[language];
<span>{t.newKey}</span>
```

### Adding a New Operation Type

1. Update `types.ts`:
```typescript
operation: 'multiply' | 'divide' | 'add' | 'subtract' | 'power';
```

2. Update `mathGenerator.ts`:
   - Add to operations array
   - Implement generation logic
   - Add display format

3. Update `SettingsPanel.tsx`:
   - Add toggle switch
   - Add translation keys

4. Update `InteractiveExercise.tsx`:
   - Add case in `calculateExpectedAnswer`

### Modifying Problem Generation

Edit `services/mathGenerator.ts`:
- Adjust algorithm logic
- Modify constraints
- Change randomization
- Update display formats

### Styling Changes

- Use Tailwind classes in components
- Add custom styles in `index.html` if needed
- Test responsive breakpoints (sm, md, lg)
- Verify print styles (`@media print`)

## Testing

### Manual Testing Checklist

- [ ] Generate problems with different settings
- [ ] Print worksheet (verify layout)
- [ ] Interactive exercise (enter answers, check)
- [ ] Language switching (Polish/English)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Keyboard navigation (Tab, Enter)
- [ ] All operation types work
- [ ] Range constraints are respected

### Browser Testing

Test in:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

### Print Testing

- Test print preview
- Verify page breaks
- Check font sizes
- Ensure all content prints
- Test different paper sizes

## Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Change port in vite.config.ts or use different port
npm run dev -- --port 3001
```

**TypeScript Errors**
- Check `tsconfig.json` settings
- Verify type definitions
- Ensure all imports are correct

**Build Failures**
- Clear `node_modules` and reinstall
- Check Node.js version
- Verify all dependencies are installed

**Styling Issues**
- Verify Tailwind CDN is loaded
- Check class names are correct
- Inspect computed styles in DevTools

**Print Issues**
- Check print media queries
- Verify `.no-print` classes
- Test in different browsers

## Performance Optimization

### Current Optimizations

- React.memo (not currently used, but could be added)
- useCallback for expensive functions
- useMemo for computed values (not currently used)
- Code splitting (Vite handles automatically)

### Potential Optimizations

- Lazy load components
- Memoize expensive calculations
- Optimize re-renders with React.memo
- Reduce bundle size (tree shaking)

## Deployment

### Build Process

1. Run `npm run build`
2. Output in `dist/` directory
3. Deploy `dist/` contents to hosting service

### Vercel Deployment

If using Vercel:
- Connect GitHub repository
- Vercel auto-detects Vite
- Analytics and Speed Insights auto-configured

### Other Hosting

- Upload `dist/` to static hosting
- Configure redirects for SPA routing (if needed)
- Set up custom domain (optional)

## Contributing

### Code Review Checklist

- [ ] TypeScript types are correct
- [ ] All translations added
- [ ] Responsive design tested
- [ ] Print layout verified
- [ ] No console errors
- [ ] Code follows project patterns
- [ ] Documentation updated (if needed)

### Git Workflow

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Commit with descriptive message
5. Push and create pull request

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

## Future Development Ideas

- Unit tests (Jest, Vitest)
- E2E tests (Playwright, Cypress)
- State management (Zustand, Redux)
- Form validation library
- PDF export functionality
- Progress tracking
- User accounts
- Problem difficulty levels
- Custom problem templates
