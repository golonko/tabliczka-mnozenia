# Documentation Index

This directory contains comprehensive documentation for the Tabliczka Mnożenia project, designed to help AI agents and developers understand and work with the codebase.

## Documentation Files

### [ARCHITECTURE.md](./ARCHITECTURE.md)
Complete overview of the application architecture, technology stack, design decisions, and system structure. Essential reading for understanding how the application is organized.

### [COMPONENTS.md](./COMPONENTS.md)
Detailed documentation of all React components, their props, state, behavior, and interaction patterns. Use this to understand component APIs and relationships.

### [SERVICES.md](./SERVICES.md)
Documentation of the service layer, particularly the math problem generation algorithm. Includes algorithm details, constraints, and usage examples.

### [TYPES.md](./TYPES.md)
Complete reference of all TypeScript types and interfaces used throughout the application. Essential for understanding data structures and type safety.

### [LOCALIZATION.md](./LOCALIZATION.md)
Guide to the internationalization system, translation keys, and how to add new languages. Includes current translations and best practices.

### [DEVELOPMENT.md](./DEVELOPMENT.md)
Practical development guide covering setup, workflow, common tasks, troubleshooting, and deployment. Use this for day-to-day development work.

## Quick Reference

### For AI Agents

When working with this codebase, AI agents should:

1. **Start with ARCHITECTURE.md** to understand the overall system
2. **Reference COMPONENTS.md** when modifying or creating components
3. **Check TYPES.md** for type definitions and data structures
4. **Use SERVICES.md** when working with problem generation logic
5. **Consult LOCALIZATION.md** when adding or modifying UI text
6. **Follow DEVELOPMENT.md** for setup and workflow guidance

### Key Concepts

- **Two-Page Application**: Generator page (worksheets) and Exercise page (interactive practice)
- **State Management**: React hooks with state lifted to App.tsx
- **Problem Generation**: Constraint-based algorithm in `services/mathGenerator.ts`
- **Internationalization**: Simple object-based translation system
- **Print Optimization**: CSS container queries for automatic font scaling

### Common Patterns

- **Props Down, Events Up**: Parent components manage state, children receive props and callbacks
- **Auto-Regeneration**: Settings changes trigger automatic problem regeneration
- **Type Safety**: Strict TypeScript with explicit types for all data
- **Responsive Design**: Mobile-first with Tailwind CSS breakpoints
- **Print Styles**: Extensive use of `@media print` and `.no-print` classes

## Documentation Maintenance

When making significant changes:

1. Update relevant documentation files
2. Add new sections if introducing new concepts
3. Keep examples up to date
4. Document breaking changes
5. Update type definitions in TYPES.md

## Questions?

If documentation is unclear or missing information:
1. Check the source code (well-commented)
2. Review related documentation files
3. Check the main README.md for project overview
4. Examine example usage in components
