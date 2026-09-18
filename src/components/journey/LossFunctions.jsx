import React, { useState } from 'react';
import { FunctionSquare, Activity, ChevronRight } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function LossFunctions() {
  const [lossType, setLossType] = useState('absolute');
  const [prediction, setPrediction] = useState(80);
  
  const actual = 100;
  const error = prediction - actual;
  
  const lossAbsolute = Math.abs(error);
  const lossSquared = error * error;
  
  const currentLoss = lossType === 'absolute' ? lossAbsolute : lossSquared;

  // SVG drawing logic for the curve
  const svgWidth = 400;
  const svgHeight = 250;
  
  // X is Error: -50 to 50
  // Y is Loss: 
  // Absolute max = 50
  // Squared max = 2500
  const maxLossY = lossType === 'absolute' ? 50 : 2500;
  
  const mapX = (x) => ((x + 50) / 100) * svgWidth;
  const mapY = (y) => svgHeight - (y / maxLossY) * (svgHeight - 20) - 10;

  let pathD = "";
  for (let x = -50; x <= 50; x += 2) {
    const y = lossType === 'absolute' ? Math.abs(x) : (x * x);
    const px = mapX(x);
    const py = mapY(y);
    if (x === -50) pathD += `M ${px} ${py} `;
    else pathD += `L ${px} ${py} `;
  }
  
  const currentPx = mapX(error);
  const currentPy = mapY(currentLoss);

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">4</span>
            Loss Functions
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A <Highlight color="#6654f5">Loss Function</Highlight> is the specific mathematical rule that converts a prediction and a target into a loss value.
          </p>
          <div className="bg-white p-4 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] text-center font-bold flex items-center justify-center flex-wrap gap-2 text-sm sm:text-base">
            <span>Prediction + Reality</span>
            <ChevronRight className="text-ink/30" />
            <span className="bg-[#c9baff] px-3 py-1 rounded border-2 border-ink">LOSS FUNCTION</span>
            <ChevronRight className="text-ink/30" />
            <span className="text-[#ec5faa]">Loss Score</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <FunctionSquare className="text-[#ec5faa]" />
          Loss Function Playground
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Curve Visualization */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6">
            <div className="font-bold text-center mb-4 opacity-50 text-sm tracking-widest">ERROR VS LOSS</div>
            
            <div className="relative w-full h-[250px] overflow-hidden">
              <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
                {/* Axes */}
                <line x1="0" y1={mapY(0)} x2={svgWidth} y2={mapY(0)} stroke="#00000020" strokeWidth="2" />
                <line x1={mapX(0)} y1="0" x2={mapX(0)} y2={svgHeight} stroke="#00000020" strokeWidth="2" />
                
                {/* Center marker */}
                <text x={mapX(0)} y={mapY(0) + 15} textAnchor="middle" fontSize="10" fill="#17191f" opacity="0.5" fontWeight="bold">0 Error</text>

                {/* Curve */}
                <path d={pathD} fill="none" stroke="#c9baff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300" />
                
                {/* Current Dot */}
                <circle cx={currentPx} cy={currentPy} r="6" fill="#ec5faa" stroke="#17191f" strokeWidth="2" className="transition-all duration-75" />
                
                {/* Dashed lines to axes */}
                <line x1={currentPx} y1={currentPy} x2={currentPx} y2={mapY(0)} stroke="#ec5faa" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
                <line x1={currentPx} y1={currentPy} x2={mapX(0)} y2={currentPy} stroke="#ec5faa" strokeWidth="2" strokeDasharray="4 4" opacity="0.5" />
              </svg>
              
              <div className="absolute top-2 left-2 text-xs font-bold opacity-50 -rotate-90 origin-left translate-y-8 bg-white/80 px-1 rounded">Loss Score</div>
              <div className="absolute bottom-2 right-2 text-xs font-bold opacity-50 bg-white/80 px-1 rounded">Prediction Error →</div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            
            {/* Function Selector */}
            <div className="bg-[#fbe1eb] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <div className="font-bold text-sm mb-3">SELECT FUNCTION</div>
              <div className="flex bg-white rounded-lg border-2 border-ink overflow-hidden p-1 gap-1">
                <button 
                  onClick={() => setLossType('absolute')}
                  className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${lossType === 'absolute' ? 'bg-[#17191f] text-white' : 'hover:bg-ink/5'}`}
                >
                  Absolute
                </button>
                <button 
                  onClick={() => setLossType('squared')}
                  className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${lossType === 'squared' ? 'bg-[#17191f] text-white' : 'hover:bg-ink/5'}`}
                >
                  Squared
                </button>
              </div>
            </div>

            {/* Calculations */}
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <div className="font-bold text-sm mb-4 border-b-2 border-ink/10 pb-2">CALCULATION</div>
              
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60">Actual</span>
                  <span>{actual}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Prediction</span>
                  <span>{prediction}</span>
                </div>
                <div className="h-0.5 bg-ink/10 my-1" />
                <div className="flex justify-between font-bold">
                  <span className="opacity-80">Error</span>
                  <span>{error > 0 ? `+${error}` : error}</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between font-bold mb-2 text-sm">
                  <span>Prediction</span>
                  <span className="font-mono">{prediction}</span>
                </div>
                <input 
                  type="range" min="50" max="150" value={prediction} 
                  onChange={(e) => setPrediction(parseInt(e.target.value))} 
                  className="w-full"
                />
              </div>
              
              <div className="mt-6 bg-white p-4 rounded-lg border-2 border-[#ec5faa] text-center">
                <div className="text-[#ec5faa] font-bold text-sm mb-1">
                  {lossType === 'absolute' ? 'Absolute Error (|x|)' : 'Squared Error (x²)'}
                </div>
                <div className="text-[#ec5faa] font-display font-bold text-3xl">
                  {currentLoss}
                </div>
              </div>
              
            </div>

          </div>
        </div>
        
        <div className="text-center font-bold text-lg max-w-2xl mx-auto opacity-80 px-4">
          The exact same mistake can be scored differently depending on the loss function you choose. 
          {lossType === 'squared' && <span className="text-[#ec5faa] block mt-2 animate-[fadeIn_0.5s]">Notice how squared error gives disproportionately massive penalties to large mistakes!</span>}
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Activity className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              There is no single "universal" loss function for all AI. You must pick the one that matches what you want the AI to do.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-xl border-2 border-ink">
                <h3 className="font-bold text-[#ec5faa] mb-2">Predicting a Number</h3>
                <p className="text-sm font-medium opacity-80">Like house prices or temperatures. Models use <strong>Regression Losses</strong> like Mean Squared Error.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-ink">
                <h3 className="font-bold text-[#4185d9] mb-2">Choosing a Category</h3>
                <p className="text-sm font-medium opacity-80">Like identifying cats vs dogs. Models use <strong>Classification Losses</strong> like Cross-Entropy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
