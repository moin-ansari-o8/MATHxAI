import React, { useState } from 'react';
import { ArrowRight, LayoutGrid, Plus, X as MultiplyIcon, ArrowRightLeft } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Matrices() {
  const [hoveredCell, setHoveredCell] = useState(null);
  const [operation, setOperation] = useState('add'); // 'add', 'multiply', 'transpose'
  const [scalar, setScalar] = useState(2);

  // Initial 3x3 matrix
  const matrixA = [
    [2, 4, 1],
    [7, 3, 8],
    [5, 9, 6]
  ];

  // Matrix B for addition
  const matrixB = [
    [1, 0, 3],
    [2, 5, 1],
    [4, 2, 2]
  ];

  const renderMatrix = (matrix, label, highlightCell = null) => (
    <div className="flex flex-col items-center">
      <div className="font-bold text-sm text-ink/50 uppercase tracking-widest mb-2">{label}</div>
      <div className="relative inline-block">
        {/* Large brackets */}
        <div className="absolute top-0 bottom-0 left-0 w-3 border-l-[4px] border-t-[4px] border-b-[4px] border-ink rounded-l-lg pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-3 border-r-[4px] border-t-[4px] border-b-[4px] border-ink rounded-r-lg pointer-events-none"></div>
        
        <div className="grid grid-cols-3 gap-2 p-4">
          {matrix.map((row, rIdx) => (
            row.map((val, cIdx) => {
              const isHighlighted = highlightCell && highlightCell.r === rIdx && highlightCell.c === cIdx;
              return (
                <div 
                  key={`${rIdx}-${cIdx}`}
                  className={`w-12 h-12 flex items-center justify-center font-mono font-bold text-xl rounded-md transition-all cursor-default ${
                    isHighlighted ? 'bg-sunshine border-2 border-ink shadow-[2px_2px_0_#17191f] scale-110 z-10' : 'bg-white border-2 border-ink/20 hover:border-ink/50'
                  }`}
                  onMouseEnter={() => setHoveredCell({ r: rIdx, c: cIdx, val, src: label })}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  {val}
                </div>
              );
            })
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      {/* 1. Core Idea */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">5</span>
            Organizing Numbers
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A <Highlight color="#d83f97">matrix</Highlight> is a rectangular arrangement of numbers organized into rows and columns.
          </p>
          <div className="bg-[#fbe1eb] rounded-xl p-6 border-2 border-ink shadow-[4px_4px_0_#17191f] flex justify-center text-center font-bold">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-lg">
              <span>Image</span> <ArrowRight className="hidden sm:block text-ink/40" /> 
              <span>Pixels</span> <ArrowRight className="hidden sm:block text-ink/40" /> 
              <span>Matrix</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Visualization - Matrix Playground */}
      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <LayoutGrid className="text-[#62a9ff]" />
          Matrix Playground
        </h2>
        
        <div className="p-4 sm:p-6 lg:p-8 rounded-[20px] border-[3px] border-ink bg-white shadow-[6px_8px_0_#17191f] mb-8 grid md:grid-cols-[1fr_250px] gap-8">
          
          <div className="flex justify-center items-center py-8">
            {renderMatrix(matrixA, "Matrix A")}
          </div>

          <div className="p-6 rounded-xl border-2 border-ink bg-[#dcecff] shadow-[4px_5px_0_#17191f] flex flex-col justify-center">
            <h3 className="font-bold text-lg mb-4 uppercase tracking-widest text-ink/50 text-xs">Cell Inspector</h3>
            {hoveredCell?.src === "Matrix A" ? (
              <div className="space-y-3 font-mono font-bold text-lg bg-white/80 p-4 rounded-lg border-2 border-ink/10 shadow-inner">
                <div className="flex justify-between"><span>row:</span> <span className="text-[#d83f97]">{hoveredCell.r + 1}</span></div>
                <div className="flex justify-between"><span>column:</span> <span className="text-[#237957]">{hoveredCell.c + 1}</span></div>
                <div className="h-px w-full bg-ink/20 my-2"></div>
                <div className="flex justify-between text-xl"><span>value:</span> <span className="text-ink">{hoveredCell.val}</span></div>
              </div>
            ) : (
              <div className="text-ink/60 font-medium italic p-4 text-center border-2 border-dashed border-ink/20 rounded-lg">
                Hover over a cell in Matrix A
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3. Hands-on Experiment */}
      <section>
        <div className="p-8 rounded-[20px] border-[3px] border-ink bg-[#fff4d9] shadow-[6px_8px_0_#17191f]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h3 className="font-display font-bold text-2xl">Matrix Operations</h3>
            <div className="flex gap-2 bg-white p-1.5 rounded-lg border-2 border-ink">
              <button onClick={() => setOperation('add')} className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1 ${operation === 'add' ? 'bg-[#ffda45] border-2 border-ink shadow-[2px_2px_0_#17191f]' : 'text-ink/60 border-2 border-transparent hover:text-ink'}`}><Plus size={16}/> A + B</button>
              <button onClick={() => setOperation('multiply')} className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1 ${operation === 'multiply' ? 'bg-[#ffda45] border-2 border-ink shadow-[2px_2px_0_#17191f]' : 'text-ink/60 border-2 border-transparent hover:text-ink'}`}><MultiplyIcon size={16}/> A × k</button>
              <button onClick={() => setOperation('transpose')} className={`px-3 py-1.5 rounded-md font-bold transition-all flex items-center gap-1 ${operation === 'transpose' ? 'bg-[#ffda45] border-2 border-ink shadow-[2px_2px_0_#17191f]' : 'text-ink/60 border-2 border-transparent hover:text-ink'}`}><ArrowRightLeft size={16}/> A^T</button>
            </div>
          </div>
          
          <div className="bg-white border-2 border-ink border-dashed rounded-xl p-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 overflow-x-auto min-h-[300px]">
            
            {operation === 'add' && (
              <>
                {renderMatrix(matrixA, "Matrix A", hoveredCell?.src === "Result" ? hoveredCell : null)}
                <Plus className="text-ink/50" size={32} />
                {renderMatrix(matrixB, "Matrix B", hoveredCell?.src === "Result" ? hoveredCell : null)}
                <ArrowRight className="text-ink/50" size={32} />
                {renderMatrix(
                  matrixA.map((r, i) => r.map((v, j) => v + matrixB[i][j])),
                  "Result",
                  hoveredCell?.src === "Result" ? hoveredCell : null
                )}
              </>
            )}

            {operation === 'multiply' && (
              <>
                {renderMatrix(matrixA, "Matrix A", hoveredCell?.src === "Result" ? hoveredCell : null)}
                <MultiplyIcon className="text-ink/50" size={32} />
                <div className="flex flex-col items-center gap-2">
                  <div className="font-bold text-sm text-ink/50 uppercase tracking-widest">Scalar (k)</div>
                  <input type="number" value={scalar} onChange={(e) => setScalar(Number(e.target.value) || 0)} className="w-16 h-16 text-center font-mono font-bold text-2xl border-2 border-ink rounded-lg bg-[#dff4e8] shadow-[2px_2px_0_#17191f]" />
                </div>
                <ArrowRight className="text-ink/50" size={32} />
                {renderMatrix(
                  matrixA.map((r) => r.map((v) => v * scalar)),
                  "Result",
                  hoveredCell?.src === "Result" ? hoveredCell : null
                )}
              </>
            )}

            {operation === 'transpose' && (
              <>
                {renderMatrix(matrixA, "Matrix A", hoveredCell?.src === "Result" ? {r: hoveredCell.c, c: hoveredCell.r} : null)}
                <div className="flex flex-col items-center">
                  <ArrowRight className="text-ink/50" size={32} />
                  <span className="text-xs font-bold text-ink/50 mt-2">Flip along diagonal</span>
                </div>
                {renderMatrix(
                  matrixA[0].map((_, colIndex) => matrixA.map(row => row[colIndex])),
                  "Result (Transposed)",
                  hoveredCell?.src === "Result (Transposed)" ? hoveredCell : null
                )}
              </>
            )}

          </div>
          <p className="text-center font-medium text-ink/60 mt-4 italic">Hover over the Result matrix to trace back the calculation!</p>
        </div>
      </section>

      {/* 4. Real AI Connection */}
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6">How this connects to real AI</h2>
          
          <div className="bg-white/80 border-2 border-ink p-6 rounded-xl shadow-[4px_4px_0_#17191f] mb-6 font-mono font-bold text-sm sm:text-base overflow-x-auto">
            <div className="flex flex-col sm:flex-row items-center gap-3 min-w-max justify-center">
              <span className="bg-[#dcecff] border-2 border-ink px-3 py-1 rounded">Input matrix</span> 
              <MultiplyIcon size={16} /> 
              <span className="bg-[#fff4d9] border-2 border-ink px-3 py-1 rounded">Weight matrix</span>
              <ArrowRight size={16} className="hidden sm:block" />
              <ArrowRight size={16} className="sm:hidden rotate-90" />
              <span className="bg-ink text-white px-3 py-1 rounded">Output</span>
            </div>
          </div>
          
          <div className="font-bold text-lg leading-relaxed">
            Neural networks repeatedly transform arrays of numbers through mathematical operations. Matrices give AI a structured way to <Highlight color="#fffdf8">organize and transform numbers</Highlight> simultaneously.
          </div>
        </div>
      </section>
    </div>
  );
}
