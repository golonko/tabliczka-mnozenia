import React, { useState, useEffect, useCallback } from 'react';
import SettingsPanel from './components/SettingsPanel';
import Worksheet from './components/Worksheet';
import { GeneratorSettings, MathProblem } from './types';
import { generateProblems } from './services/mathGenerator';

const App: React.FC = () => {
  const [settings, setSettings] = useState<GeneratorSettings>({
    problemCount: 20,
    copies: 4, 
    allowDivision: true,
    minResult: 2,
    maxResult: 100,
    maxFactor: 10,
    layout: 'landscape', // Default
  });

  const [columnsData, setColumnsData] = useState<MathProblem[][]>([]);

  // Inject print styles based on layout preference
  useEffect(() => {
    const styleId = 'print-layout-style';
    let styleEl = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    
    // We set specific margin to 0 to maximize paper usage, 
    // letting the Worksheet container define the boundaries.
    styleEl.innerHTML = `
      @media print { 
        @page { 
          size: A4 ${settings.layout}; 
          margin: 0;
        } 
      }
    `;
  }, [settings.layout]);

  const generate = useCallback(() => {
    // 3 columns for Portrait, 4 for Landscape
    const COLUMNS_ON_PAGE = settings.layout === 'landscape' ? 4 : 3;
    const newColumns: MathProblem[][] = [];

    // Generate sets in groups of 'copies'
    // Each group will have 'copies' number of identical columns
    for (let i = 0; i < COLUMNS_ON_PAGE; i += settings.copies) {
      // Generate one set for this group
      const groupSet = generateProblems(
        settings.problemCount, 
        settings.allowDivision,
        settings.minResult,
        settings.maxResult,
        settings.maxFactor
      );
      
      // Fill the columns in this group with the same set
      const remainingColumns = COLUMNS_ON_PAGE - i;
      const columnsInThisGroup = Math.min(settings.copies, remainingColumns);
      
      for (let j = 0; j < columnsInThisGroup; j++) {
        newColumns.push(groupSet);
      }
    }

    setColumnsData(newColumns);
  }, [settings]);

  // Generate initial problems on mount
  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-generate problems when any relevant setting changes
  useEffect(() => {
    // Skip initial mount (already handled above)
    if (columnsData.length > 0) {
      generate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    settings.problemCount,
    settings.copies,
    settings.allowDivision,
    settings.minResult,
    settings.maxResult,
    settings.maxFactor,
    settings.layout
  ]); 

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header removed as requested */}

      {/* Main Content */}
      <main className="flex-1 max-w-screen-2xl mx-auto w-full p-4 sm:p-6 flex flex-col lg:flex-row gap-6">
        
        {/* Sidebar Controls - Hidden on Print */}
        <aside className="w-full lg:w-80 flex-shrink-0 no-print">
            <div className="mb-4 lg:mb-0">
               <h1 className="text-2xl font-bold text-gray-800 mb-2">Generator</h1>
               <p className="text-gray-500 text-sm">Skonfiguruj i wydrukuj zadania.</p>
            </div>
          <SettingsPanel
            settings={settings}
            onSettingsChange={setSettings}
            onGenerate={generate}
            onPrint={handlePrint}
          />
        </aside>

        {/* Printable Area Wrapper */}
        <div className="flex-1 flex justify-center items-start overflow-auto bg-gray-200/50 p-4 lg:p-8 rounded-xl border-2 border-dashed border-gray-300 print:border-none print:p-0 print:bg-white print:block">
           <Worksheet columnsData={columnsData} layout={settings.layout} />
        </div>
      </main>
      
      {/* Footer - Hidden on Print */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-sm text-gray-500 no-print">
        <p>&copy; {new Date().getFullYear()} Generator Matematyczny.</p>
      </footer>
    </div>
  );
};

export default App;