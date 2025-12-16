import React, { useState, useEffect, useCallback } from 'react';
import SettingsPanel from './components/SettingsPanel';
import Worksheet from './components/Worksheet';
import { GeneratorSettings, MathProblem } from './types';
import { generateProblems } from './services/mathGenerator';

const App: React.FC = () => {
  const [settings, setSettings] = useState<GeneratorSettings>({
    problemCount: 20,
    columns: 4,
    copies: 2, 
    allowDivision: true,
    minResult: 1,
    maxResult: 100,
    minFactor: 1,
    maxFactor: 10,
    pageCount: 1,
  });

  // Each page has its own array of columns (MathProblem[][])
  const [pagesData, setPagesData] = useState<MathProblem[][][]>([]);

  const generate = useCallback(() => {
    const newPages: MathProblem[][][] = [];

    // Generate data for each page
    for (let pageIndex = 0; pageIndex < settings.pageCount; pageIndex++) {
      const pageColumns: MathProblem[][] = [];

      // Generate sets in groups of 'copies'
      // Each group will have 'copies' number of identical columns
      for (let i = 0; i < settings.columns; i += settings.copies) {
        // Generate one set for this group
        const groupSet = generateProblems(
          settings.problemCount, 
          settings.allowDivision,
          settings.minResult,
          settings.maxResult,
          settings.minFactor,
          settings.maxFactor
        );
        
        // Fill the columns in this group with the same set
        const remainingColumns = settings.columns - i;
        const columnsInThisGroup = Math.min(settings.copies, remainingColumns);
        
        for (let j = 0; j < columnsInThisGroup; j++) {
          pageColumns.push(groupSet);
        }
      }

      newPages.push(pageColumns);
    }

    setPagesData(newPages);
  }, [settings]);

  // Generate initial problems on mount
  useEffect(() => {
    generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-generate problems when any relevant setting changes
  useEffect(() => {
    // Skip initial mount (already handled above)
    if (pagesData.length > 0) {
      generate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    settings.problemCount,
    settings.columns,
    settings.copies,
    settings.allowDivision,
    settings.minResult,
    settings.maxResult,
    settings.minFactor,
    settings.maxFactor,
    settings.pageCount
  ]); 

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden print:h-full print:overflow-visible print:block">
      {/* Main Content - takes all available space */}
      <main className="flex-1 min-h-0 max-w-screen-2xl mx-auto w-full p-4 sm:p-6 flex flex-col lg:flex-row gap-4 print:max-w-none print:p-0 print:m-0 print:block print:h-full">
        
        {/* Sidebar Controls - Hidden on Print */}
        <aside className="w-full lg:w-80 flex-shrink-0 no-print flex flex-col min-h-0 lg:max-h-full">
            <div className="flex-shrink-0 mb-2">
               <h1 className="text-xl font-bold text-gray-800">Generator</h1>
               <p className="text-gray-500 text-xs">Skonfiguruj i wydrukuj zadania.</p>
            </div>
            <div className="flex-1 min-h-0 overflow-auto">
              <SettingsPanel
                settings={settings}
                onSettingsChange={setSettings}
                onGenerate={generate}
                onPrint={handlePrint}
              />
            </div>
        </aside>

        {/* Printable Area Wrapper */}
        <div className="flex-1 min-h-0 flex justify-center items-start overflow-auto bg-gray-200/50 p-4 lg:p-6 rounded-xl border-2 border-dashed border-gray-300 print:border-none print:p-0 print:bg-white print:block print:w-full print:h-full print:overflow-visible">
           <Worksheet pagesData={pagesData} />
        </div>
      </main>
      
      {/* Footer - Hidden on Print */}
      <footer className="flex-shrink-0 bg-white border-t border-gray-200 py-3 text-center text-sm text-gray-500 no-print print:hidden print:!p-0 print:!m-0 print:!h-0 print:!border-0">
        <p>&copy; {new Date().getFullYear()} Wojciech Gołowkow.</p>
      </footer>
    </div>
  );
};

export default App;