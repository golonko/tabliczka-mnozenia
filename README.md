# Tabliczka Mnożenia

> A modern web application for generating and printing math worksheets, plus interactive exercises for children to practice multiplication, division, addition, and subtraction.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.2-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.2-purple.svg)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

- **📄 Worksheet Generator**: Create printable math worksheets with customizable settings
- **🎮 Interactive Exercises**: Practice mode with real-time answer validation
- **🌍 Bilingual Support**: Polish and English interface
- **⚙️ Flexible Configuration**:
  - Adjustable number of columns (2-8)
  - Configurable problems per column (10-50)
  - Identical column copies for class distribution
  - Customizable result and factor ranges
  - Select operation types (multiplication, division, addition, subtraction)
- **🖨️ Print-Optimized**: Automatic font scaling and layout optimization for printing
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices
- **⌨️ Keyboard Navigation**: Enter key moves between input fields in exercises

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (recommended)
- **npm** (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd tabliczka-mnozenia

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📖 Usage

### Worksheet Generator

1. Configure your settings:
   - Select number of columns
   - Choose problems per column
   - Set result and factor ranges
   - Enable desired operation types
2. Click **"Print Worksheet"** to print or save as PDF
3. Use **"Generate New Set"** to create different problems

### Interactive Exercise

1. Click **"Start Exercise"** from the main page
2. Enter answers in the input fields
3. Press **Enter** to move to the next problem
4. Click **"Check Answers"** to validate your solutions
5. Incorrect answers will be highlighted in red
6. View your score summary

## 🏗️ Project Structure

```
tabliczka-mnozenia/
├── components/          # React components
│   ├── SettingsPanel.tsx
│   ├── Worksheet.tsx
│   └── InteractiveExercise.tsx
├── services/           # Business logic
│   └── mathGenerator.ts
├── docs/              # Documentation
├── App.tsx            # Main application
├── index.tsx          # Entry point
└── types.ts           # TypeScript definitions
```

## 🛠️ Technology Stack

- **React 19.2** - UI framework
- **TypeScript 5.8** - Type safety
- **Vite 6.2** - Build tool
- **Tailwind CSS** - Styling (via CDN)
- **Lucide React** - Icons
- **Vercel Analytics** - Analytics

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) directory:

- **[Architecture](./docs/ARCHITECTURE.md)** - System design and architecture
- **[Components](./docs/COMPONENTS.md)** - Component API reference
- **[Services](./docs/SERVICES.md)** - Problem generation algorithm
- **[Types](./docs/TYPES.md)** - TypeScript type definitions
- **[Localization](./docs/LOCALIZATION.md)** - Internationalization guide
- **[Development](./docs/DEVELOPMENT.md)** - Development guide

## 🎯 Key Features Explained

### Smart Problem Generation

The algorithm ensures:
- All problems respect configured ranges
- No duplicate problems in a set
- Valid mathematical operations (whole number results for division)
- Automatic constraint validation

### Print Optimization

- Dynamic font sizing based on problem count
- CSS container queries for automatic scaling
- Optimized layout for A4 paper
- Print-specific styling

### Interactive Exercises

- Real-time answer validation
- Visual feedback (red highlighting for incorrect answers)
- Score tracking
- Keyboard-friendly navigation

## 🌐 Internationalization

Currently supported languages:
- 🇵🇱 Polish (default)
- 🇬🇧 English

Language can be switched using flag buttons in the UI.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Wojciech Gołowkow**

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

Made with ❤️ for helping children learn math
