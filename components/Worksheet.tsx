import React from 'react';
import { MathProblem } from '../types';
import { Scissors } from 'lucide-react';

interface WorksheetProps {
  pagesData: MathProblem[][][]; // Array of pages, each page has columnsData
}

interface SinglePageProps {
  columnsData: MathProblem[][];
  pageIndex: number;
  totalPages: number;
  isScreenPreview: boolean;
}

const SinglePage: React.FC<SinglePageProps> = ({ columnsData, pageIndex, totalPages, isScreenPreview }) => {
  const problemCount = columnsData[0]?.length || 0;
  const columnCount = columnsData.length;

  // For screen preview: use container query units for auto-scaling
  // For print: use viewport-based calculation since container queries don't work well in print
  const screenVerticalFontSize = `calc(75cqh / ${problemCount})`;
  const screenHorizontalFontSize = `8cqw`;
  const screenFontSize = `min(${screenVerticalFontSize}, ${screenHorizontalFontSize})`;
  const screenClampedFontSize = `clamp(9px, ${screenFontSize}, 28px)`;
  
  // For print: calculate based on page dimensions (A4 ~297mm height, minus margins)
  // ~260mm usable height, divided by problem count, converted to reasonable font size
  const printFontSize = `clamp(9px, calc(240mm / ${problemCount}), 18px)`;
  
  const clampedFontSize = isScreenPreview ? screenClampedFontSize : printFontSize;

  return (
    <div 
      className={`bg-white mx-auto relative flex flex-col w-full ${
        isScreenPreview 
          ? 'shadow-2xl p-4 h-full' 
          : 'p-2'
      }`}
      style={{ 
        pageBreakAfter: pageIndex < totalPages - 1 ? 'always' : 'auto',
        breakAfter: pageIndex < totalPages - 1 ? 'page' : 'auto',
        pageBreakInside: 'avoid', 
        breakInside: 'avoid',
        // For print: use fixed page height
        ...(!isScreenPreview && { height: '100vh', maxHeight: '100vh' })
      }}
    >
      {/* Visual aid for screen only */}
      {isScreenPreview && (
        <div className="absolute top-0 right-0 p-2 bg-yellow-100 text-yellow-800 text-xs rounded-bl-lg font-medium z-10">
          Strona {pageIndex + 1}/{totalPages} ({columnCount} kolumn)
        </div>
      )}

      <div className="flex-1 flex w-full min-h-0 overflow-hidden">
        {columnsData.map((problems, colIndex) => (
          <React.Fragment key={colIndex}>
            {/* Column */}
            <div className="flex-1 flex flex-col min-h-0 relative px-2">
              
              {/* Problems container */}
              <div 
                className="flex-1 min-h-0"
                style={isScreenPreview ? { containerType: 'size' } : {}}
              >
                {/* CSS Grid distributes rows evenly - browser handles all spacing */}
                <div 
                  className="h-full grid"
                  style={{ 
                    gridTemplateRows: `repeat(${problems.length}, 1fr)`,
                  }}
                >
                  {problems.map((problem, index) => (
                    <div
                      key={`${colIndex}-${problem.id}`}
                      className="flex items-center min-h-0 overflow-hidden"
                      style={{ 
                        fontSize: clampedFontSize,
                      }}
                    >
                      {/* Number - sized relative to problem font */}
                      <span 
                        className="font-sans font-medium text-gray-400 text-right flex-shrink-0 select-none"
                        style={{ 
                          fontSize: '0.65em',
                          width: '2.5em',
                          marginRight: '0.4em',
                        }}
                      >
                        {index + 1}.
                      </span>
                      
                      {/* Equation */}
                      <span className="font-mono font-bold text-gray-800 whitespace-nowrap flex-shrink-0">
                        {problem.display}
                      </span>

                      {/* Answer Line - uses em units to scale with font */}
                      <div 
                        className={`flex-1 border-b-2 border-dotted ${isScreenPreview ? 'border-gray-300' : 'border-gray-400'}`}
                        style={{ 
                          marginLeft: '0.5em',
                          minHeight: '0.5em',
                          alignSelf: 'flex-end',
                          marginBottom: '0.15em',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Score Box at bottom - fixed size, always visible */}
              <div className="flex-shrink-0 pt-1">
                <div className="border-2 border-gray-800 rounded-lg p-1 flex justify-between items-center">
                  <span className="text-[9px] font-bold uppercase">Wynik:</span>
                  <span className="font-mono text-gray-300 text-[9px]">___ / {problems.length}</span>
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            {colIndex < columnsData.length - 1 && (
              <div className={`w-px relative border-l border-dashed ${isScreenPreview ? 'border-gray-300' : 'border-gray-400'} h-full mx-1 flex flex-col items-center justify-center flex-shrink-0`}>
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

const Worksheet: React.FC<WorksheetProps> = ({ pagesData }) => {
  if (pagesData.length === 0) return null;

  // Show only the first page in preview mode (screen), but all pages in print
  return (
    <>
      {/* Screen preview: only show first page */}
      <div className="print:hidden w-full h-full">
        <SinglePage 
          columnsData={pagesData[0]} 
          pageIndex={0} 
          totalPages={pagesData.length} 
          isScreenPreview={true}
        />
      </div>
      
      {/* Print: show all pages */}
      <div className="hidden print:block">
        {pagesData.map((columnsData, pageIndex) => (
          <SinglePage
            key={pageIndex}
            columnsData={columnsData}
            pageIndex={pageIndex}
            totalPages={pagesData.length}
            isScreenPreview={false}
          />
        ))}
      </div>
    </>
  );
};

export default Worksheet;