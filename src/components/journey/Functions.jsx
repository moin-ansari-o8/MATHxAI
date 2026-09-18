import React, { useState } from 'react';
import { FunctionSquare, ArrowRight, Zap, Target } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Functions() {
  const [funcId, setFuncId] = useState('linear1');
  const [xVal, setXVal] = useState(4);
  
  const functions = {
    linear1: {
      name: "2x + 3",
      calc: (x) => 2 * x + 3,
      domain: [-5, 5],
      range: [-10, 15]
    },
    squared: {
      name: "x²",
      calc: (x) => x * x,
      domain: [-5, 5],
      range: [0, 25]
    },
    linear2: {
      name: "3x - 1",
      calc: (x) => 3 * x - 1,
      domain: [-5, 5],
      range: [-16, 14]
    }
  };
  
  const activeFunc = functions[funcId];
  const yVal = activeFunc.calc(xVal);

  // Graph SVG logic
  const svgWidth = 400;
  const svgHeight = 250;
  const padding = 20;

  const mapX = (x) => padding + ((x - activeFunc.domain[0]) / (activeFunc.domain[1] - activeFunc.domain[0])) * (svgWidth - 2 * padding);
  const mapY = (y) => svgHeight - padding - ((y - activeFunc.range[0]) / (activeFunc.range[1] - activeFunc.range[0])) * (svgHeight - 2 * padding);

  let pathD = "";
  for (let x = activeFunc.domain[0]; x <= activeFunc.domain[1]; x += 0.5) {
    const y = activeFunc.calc(x);
    const px = mapX(x);
    const py = mapY(y);
    if (x === activeFunc.domain[0]) pathD += `M ${px} ${py} `;
    else pathD += `L ${px} ${py} `;
  }

  const currentPx = mapX(xVal);
  const currentPy = mapY(yVal);

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">1</span>
            Functions
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            Before we can understand how an AI learns, we have to look at the mathematical engine driving it. At its core, every machine learning model is simply a <Highlight color="#6654f5">Function</Highlight>.
            <br/><br/>
            A function takes an input, applies a specific mathematical rule to it, and produces an output.
          </p>
          
          <div className="flex justify-center my-8">
            <div className="bg-[#fbe1eb] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] font-bold text-center text-lg flex items-center gap-4 flex-wrap justify-center">
              <span>INPUT</span> <ArrowRight className="text-ink/30" /> 
              <span className="text-[#6654f5] font-display px-4 py-2 bg-white rounded-lg border-2 border-ink">FUNCTION</span>
              <ArrowRight className="text-ink/30" /> 
              <span>OUTPUT</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <FunctionSquare className="text-[#ec5faa]" />
          The Function Machine
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-start">
          
          {/* Controls & Machine */}
          <div className="bg-white p-6 rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] space-y-8 flex flex-col items-center">
            
            <div className="w-full">
              <div className="flex justify-between font-bold mb-2 text-sm text-ink/70">
                <span>CHOOSE RULE</span>
              </div>
              <div className="flex bg-paper rounded-lg border-2 border-ink overflow-hidden p-1 gap-1 w-full">
                {Object.entries(functions).map(([id, func]) => (
                  <button 
                    key={id}
                    onClick={() => setFuncId(id)}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${funcId === id ? 'bg-[#17191f] text-white' : 'hover:bg-ink/5'}`}
                  >
                    {func.name}
                  </button>
                ))}
              </div>
            </div>

            {/* The Machine */}
            <div className="w-full max-w-[250px] relative">
              <div className="text-center font-bold font-mono text-[#ec5faa] mb-2">INPUT x = {xVal}</div>
              <div className="h-6 w-1 mx-auto bg-ink/20 relative">
                <ArrowRight className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 rotate-90 text-ink/40 w-4 h-4" />
              </div>
              
              <div className="bg-[#c9baff] border-[3px] border-ink rounded-2xl p-6 text-center shadow-[4px_4px_0_#17191f] relative z-10">
                <div className="font-bold text-xs opacity-60 tracking-widest mb-2">FUNCTION</div>
                <div className="font-display font-bold text-3xl bg-white border-2 border-ink py-3 px-4 rounded-xl">
                  {activeFunc.name.replace('x', `(${xVal})`)}
                </div>
              </div>
              
              <div className="h-6 w-1 mx-auto bg-ink/20 relative">
                <ArrowRight className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 rotate-90 text-ink/40 w-4 h-4" />
              </div>
              <div className="text-center font-bold font-mono text-[#237957] mt-2">OUTPUT = {yVal}</div>
            </div>

            <div className="w-full bg-paper p-4 rounded-xl border-2 border-ink">
              <div className="flex justify-between font-bold mb-2 text-sm">
                <span>Input x</span>
              </div>
              <input 
                type="range" min={activeFunc.domain[0]} max={activeFunc.domain[1]} step="1" 
                value={xVal} onChange={(e) => setXVal(parseInt(e.target.value))} 
                className="w-full accent-[#ec5faa]" 
              />
            </div>
            
          </div>

          {/* Graph Visualization */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 h-full flex flex-col justify-center">
            <div className="font-bold text-center mb-4 opacity-50 text-sm tracking-widest border-b-2 border-ink/10 pb-4">
              f(x) = {activeFunc.name}
            </div>
            
            <div className="relative w-full aspect-[4/3] max-w-[400px] mx-auto overflow-hidden">
              <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
                {/* Axes */}
                <line x1={mapX(0)} y1="0" x2={mapX(0)} y2={svgHeight} stroke="#00000020" strokeWidth="2" />
                <line x1="0" y1={mapY(0)} x2={svgWidth} y2={mapY(0)} stroke="#00000020" strokeWidth="2" />
                
                {/* Curve */}
                <path d={pathD} fill="none" stroke="#6654f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Dashed lines to axes */}
                <line x1={currentPx} y1={currentPy} x2={currentPx} y2={mapY(0)} stroke="#ec5faa" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                <line x1={currentPx} y1={currentPy} x2={mapX(0)} y2={currentPy} stroke="#237957" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                
                {/* Current Dot */}
                <circle cx={currentPx} cy={currentPy} r="6" fill="#17191f" stroke="#fff" strokeWidth="2" className="transition-all duration-75" />
                
                <text x={currentPx + 10} y={currentPy - 10} fontSize="14" fontWeight="bold" fill="#17191f">
                  ({xVal}, {yVal})
                </text>
              </svg>
            </div>
            
            <div className="mt-4 text-center font-bold text-lg opacity-80 bg-paper p-4 rounded-xl border-2 border-ink/10">
              f({xVal}) = {yVal}
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#dff4e8] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Target className="text-[#237957]" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              A prediction model is just a function! It takes inputs (features) and produces an output (a prediction).
            </p>
            <div className="my-6 flex flex-col md:flex-row items-center justify-center gap-4 text-center">
              <div className="bg-white px-4 py-3 rounded-lg border-2 border-ink">
                <span className="text-[#ec5faa] block text-sm opacity-80">Input x</span>
                House Features
              </div>
              <ArrowRight className="hidden md:block text-ink/30" />
              <div className="bg-[#17191f] text-white px-6 py-4 rounded-xl border-2 border-ink shadow-[4px_4px_0_#6654f5]">
                <span className="text-[#6654f5] block text-sm font-mono">f(x)</span>
                AI Model
              </div>
              <ArrowRight className="hidden md:block text-ink/30" />
              <div className="bg-white px-4 py-3 rounded-lg border-2 border-ink">
                <span className="text-[#237957] block text-sm opacity-80">Output y</span>
                Price Prediction
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
