import React from 'react';
import { MathProblem, GeneratorSettings } from '../types';
import { Scissors } from 'lucide-react';

interface WorksheetProps {
  columnsData: MathProblem[][];
  layout: GeneratorSettings['layout'];
}

const Worksheet: React.FC<WorksheetProps> = ({ columnsData, layout }) => {
  const problemCount = columnsData[0]?.length || 0;
  const isLandscape = layout === 'landscape';

  // Helper to determine styles based on problem count and layout
  const getDynamicStyles = (count: number, landscape: boolean) => {
    // Determine height limit based on orientation
    // Landscape A4 Height: ~210mm (~793px at 96dpi, but actual print is ~793px)
    // Portrait A4 Height: ~297mm (~1122px at 96dpi, but actual print is ~1122px)
    
    // We reserve space for padding (top/bottom ~10-20px) and the score footer (~40px)
    // Usable height approx:
    // Landscape: ~740px (210mm - padding - score box)
    // Portrait: ~1050px (297mm - padding - score box)
    // We need to ensure each problem + gap fits within available height / count

    if (landscape) {
         if (count <= 10) return { containerGap: 'gap-5', problemFont: 'text-xl', numberFont: 'text-sm', lineMargin: 'ml-2', padding: 'py-2', lineHeight: 'leading-tight', scorePadding: 'p-1' };
         if (count <= 15) return { containerGap: 'gap-3', problemFont: 'text-lg', numberFont: 'text-xs', lineMargin: 'ml-2', padding: 'py-1.5', lineHeight: 'leading-tight', scorePadding: 'p-1' };
         if (count <= 20) return { containerGap: 'gap-2', problemFont: 'text-base', numberFont: 'text-[10px]', lineMargin: 'ml-2', padding: 'py-1', lineHeight: 'leading-tight', scorePadding: 'p-1' };
         if (count <= 28) return { containerGap: 'gap-1', problemFont: 'text-sm', numberFont: 'text-[9px]', lineMargin: 'ml-1', padding: 'py-1', lineHeight: 'leading-tight', scorePadding: 'p-1' };
         if (count <= 36) return { containerGap: 'gap-0.5', problemFont: 'text-xs', numberFont: 'text-[8px]', lineMargin: 'ml-1', padding: 'py-0.5', lineHeight: 'leading-[1.2]', scorePadding: 'p-0.5' };
         if (count <= 48) return { containerGap: 'gap-0', problemFont: 'text-[11px]', numberFont: 'text-[7px]', lineMargin: 'ml-1', padding: 'py-0.5', lineHeight: 'leading-[1.1]', scorePadding: 'p-0.5' };
         // High density for max 60
         return { containerGap: 'gap-0', problemFont: 'text-[10px]', numberFont: 'text-[7px]', lineMargin: 'ml-1', padding: 'py-0', lineHeight: 'leading-[1.1]', scorePadding: 'p-0.5' };
    } else {
         if (count <= 15) return { containerGap: 'gap-7', problemFont: 'text-2xl', numberFont: 'text-base', lineMargin: 'ml-3', padding: 'py-3', lineHeight: 'leading-tight', scorePadding: 'p-1' };
         if (count <= 25) return { containerGap: 'gap-4', problemFont: 'text-xl', numberFont: 'text-sm', lineMargin: 'ml-2', padding: 'py-2', lineHeight: 'leading-tight', scorePadding: 'p-1' };
         if (count <= 35) return { containerGap: 'gap-2', problemFont: 'text-lg', numberFont: 'text-xs', lineMargin: 'ml-2', padding: 'py-1.5', lineHeight: 'leading-tight', scorePadding: 'p-1' };
         if (count <= 45) return { containerGap: 'gap-1', problemFont: 'text-base', numberFont: 'text-[10px]', lineMargin: 'ml-2', padding: 'py-1', lineHeight: 'leading-tight', scorePadding: 'p-1' };
         if (count <= 55) return { containerGap: 'gap-0.5', problemFont: 'text-sm', numberFont: 'text-[9px]', lineMargin: 'ml-1', padding: 'py-0.5', lineHeight: 'leading-[1.2]', scorePadding: 'p-0.5' };
         return { containerGap: 'gap-0', problemFont: 'text-xs', numberFont: 'text-[8px]', lineMargin: 'ml-1', padding: 'py-0.5', lineHeight: 'leading-[1.1]', scorePadding: 'p-0.5' };
    }
  };

  const styles = getDynamicStyles(problemCount, isLandscape);

  // A4 Dimensions in CSS pixels (approx at 96dpi, but using mm is safer for print)
  // Portrait: 210mm x 297mm
  // Landscape: 297mm x 210mm
  // We use max-w and min-h for screen preview, but exact sizes for print.
  const containerClass = isLandscape
    ? "w-full max-w-[297mm] h-[210mm]"
    : "w-full max-w-[210mm] h-[297mm]";

  return (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-6 print:p-0 relative flex flex-col ${containerClass}`}>
      {/* Visual aid for screen only */}
      <div className="absolute top-0 right-0 p-2 bg-yellow-100 text-yellow-800 text-xs rounded-bl-lg print:hidden font-medium z-10">
        Podgląd A4 ({isLandscape ? 'Poziomo' : 'Pionowo'})
      </div>

      <div className="flex-1 flex w-full min-h-0">
        {columnsData.map((problems, colIndex) => (
          <React.Fragment key={colIndex}>
            {/* Column */}
            <div className={`flex-1 flex flex-col min-h-0 relative px-3 ${styles.padding}`}>
              
              {/* Header Removed as requested */}

              {/* Problems List - ensure all problems fit by using tight spacing and proper flex behavior */}
              <div className={`flex flex-col w-full flex-1 min-h-0 ${styles.containerGap} ${problemCount > 30 ? 'justify-between' : 'justify-start'}`}>
                {problems.map((problem, index) => (
                  <div
                    key={`${colIndex}-${problem.id}`}
                    className="flex items-baseline w-full"
                    style={{ 
                      flexShrink: 0,
                      lineHeight: problemCount > 30 ? '1.1' : '1.2',
                      margin: 0,
                      padding: 0,
                      height: 'auto'
                    }}
                  >
                    {/* Number */}
                    <span className={`
                      font-sans font-medium text-gray-400 text-right w-6 mr-2 flex-shrink-0 select-none
                      ${styles.numberFont} ${styles.lineHeight}
                    `} style={{ lineHeight: problemCount > 30 ? '1.1' : '1.2' }}>
                      {index + 1}.
                    </span>
                    
                    {/* Equation */}
                    <span className={`
                      font-mono font-bold text-gray-800 whitespace-nowrap flex-shrink-0
                      ${styles.problemFont} ${styles.lineHeight}
                    `} style={{ lineHeight: problemCount > 30 ? '1.1' : '1.2' }}>
                        {problem.display}
                    </span>

                    {/* Answer Line */}
                    <div className={`flex-1 border-b-2 border-dotted border-gray-300 print:border-gray-400 relative ${styles.lineMargin}`} style={{ minHeight: '0.8em', top: '-2px' }}></div>
                  </div>
                ))}
              </div>

              {/* Score Box at bottom - always visible */}
              <div className="mt-auto pt-1 flex-shrink-0">
                 <div className={`border-2 border-gray-800 rounded-lg ${styles.scorePadding || 'p-1'} flex justify-between items-center`}>
                    <span className="text-[9px] font-bold uppercase">Wynik:</span>
                    <span className={`font-mono text-gray-300 ${styles.numberFont}`}>___ / {problems.length}</span>
                 </div>
              </div>
            </div>

            {/* Vertical Divider */}
            {colIndex < columnsData.length - 1 && (
              <div className="w-px relative border-l border-dashed border-gray-300 print:border-gray-400 h-full mx-1 flex flex-col items-center justify-center flex-shrink-0">
                 <div className="bg-white p-1 absolute top-10">
                    <Scissors className="w-3 h-3 text-gray-400" />
                 </div>
                 <div className="bg-white p-1 absolute bottom-10">
                    <Scissors className="w-3 h-3 text-gray-400 transform rotate-180" />
                 </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Worksheet;