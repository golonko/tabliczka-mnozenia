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

  // A4 Dimensions: Portrait 210mm x 297mm, Landscape 297mm x 210mm
  const containerClass = isLandscape
    ? "w-full max-w-[297mm] h-[210mm]"
    : "w-full max-w-[210mm] h-[297mm]";

  // Calculate font size as percentage of container height divided by problem count
  // Using cqh (container query height) units for automatic scaling
  // The 75 factor gives good visual balance - roughly 75% of available row height
  const fontSize = `calc(75cqh / ${problemCount})`;
  
  // Clamp the font size to reasonable bounds for readability
  const clampedFontSize = `clamp(9px, ${fontSize}, 28px)`;

  return (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-4 print:p-2 relative flex flex-col ${containerClass}`}>
      {/* Visual aid for screen only */}
      <div className="absolute top-0 right-0 p-2 bg-yellow-100 text-yellow-800 text-xs rounded-bl-lg print:hidden font-medium z-10">
        Podgląd A4 ({isLandscape ? 'Poziomo' : 'Pionowo'})
      </div>

      <div className="flex-1 flex w-full min-h-0 overflow-hidden">
        {columnsData.map((problems, colIndex) => (
          <React.Fragment key={colIndex}>
            {/* Column */}
            <div className="flex-1 flex flex-col min-h-0 relative px-2">
              
              {/* Problems container with CSS container query for auto-scaling */}
              <div 
                className="flex-1 min-h-0"
                style={{ containerType: 'size' }}
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
                      className="flex items-center min-h-0"
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
                        className="flex-1 border-b-2 border-dotted border-gray-300 print:border-gray-400"
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