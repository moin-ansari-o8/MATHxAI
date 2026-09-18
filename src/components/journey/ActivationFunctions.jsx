import React, { useState } from 'react';
import { Network, Zap } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function ActivationFunctions() {
  const [activation, setActivation] = useState('ReLU');
  const [inputValue, setInputValue] = useState(0);

  const funcs = {
    'ReLU': {
      desc: "Negative values become 0; positive values pass through unchanged.",
      calc: (x) => Math.max(0, x),
      color: "#ec5faa"
    },
    'Sigmoid': {
      desc: "Maps values smoothly toward the range 0 to 1.",
      calc: (x) => 1 / (1 + Math.exp(-x)),
      color: "#4185d9"
    },
    'Tanh': {
      desc: "Maps values toward the range -1 to 1.",
      calc: (x) => Math.tanh(x),
      color: "#237957"
    }
  };

  const currentFunc = funcs[activation];
  const outputValue = currentFunc.calc(inputValue);

  // SVG Mapping logic
  const svgWidth = 400;
  const svgHeight = 300;
  // Domain x: -5 to 5
  // Domain y: -2 to 2 (to fit ReLU up to 5, let's say y is -2 to 5)
  // To keep it simple, let's map X from -5 to 5.
  const mapX = (x) => ((x + 5) / 10) * svgWidth;
  
  // Y domain depends on the function, but to keep axes fixed:
  // Let's use Y domain -1.5 to 1.5 for Sigmoid/Tanh, and -1 to 5 for ReLU.
  // Actually, fixing Y domain to -2 to 5 covers everything nicely.
  const mapY = (y) => svgHeight - ((y + 2) / 7) * svgHeight;

  // Generate path points
  let pathD = "";
  for (let x = -5; x <= 5; x += 0.1) {
    const y = currentFunc.calc(x);
    const px = mapX(x);
    const py = mapY(y);
    if (x === -5) pathD += `M ${px} ${py} `;
    else pathD += `L ${px} ${py} `;
  }

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-sunshine border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-ink">7</span>
            Activation Functions
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            If a model only multiplied and added numbers, it could only ever draw straight lines. 
            <br/><br/>
            An <Highlight color={currentFunc.color}>activation function</Highlight> transforms a neuron's output to introduce <em>nonlinearity</em>, allowing neural networks to represent complex, curvy, and intricate relationships.
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Network className="text-[#ec5faa]" />
          Function Playground
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_300px] gap-6 items-start">
          {/* Plot */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 relative overflow-hidden flex justify-center">
            <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="max-w-[400px]">
              {/* Axes */}
              <line x1="0" y1={mapY(0)} x2={svgWidth} y2={mapY(0)} stroke="#00000030" strokeWidth="2" />
              <line x1={mapX(0)} y1="0" x2={mapX(0)} y2={svgHeight} stroke="#00000030" strokeWidth="2" />

              {/* Grid Lines for Y */}
              {[-1, 1, 2, 3, 4].map(y => (
                <line key={`g-y-${y}`} x1="0" y1={mapY(y)} x2={svgWidth} y2={mapY(y)} stroke="#00000010" strokeDasharray="4 4" />
              ))}

              {/* The Function Curve */}
              <path 
                d={pathD} 
                fill="none" 
                stroke={currentFunc.color} 
                strokeWidth="5" 
                className="transition-all duration-300"
              />

              {/* The Input/Output Dot */}
              <circle 
                cx={mapX(inputValue)}
                cy={mapY(outputValue)}
                r="8"
                fill="#17191f"
                stroke="#fff"
                strokeWidth="2"
                className="transition-all duration-75"
              />
              
              {/* Dashed lines to axes */}
              <line 
                x1={mapX(inputValue)} 
                y1={mapY(outputValue)} 
                x2={mapX(inputValue)} 
                y2={mapY(0)} 
                stroke="#17191f" 
                strokeWidth="2" 
                strokeDasharray="4 4"
                opacity="0.5"
              />
              <line 
                x1={mapX(inputValue)} 
                y1={mapY(outputValue)} 
                x2={mapX(0)} 
                y2={mapY(outputValue)} 
                stroke="#17191f" 
                strokeWidth="2" 
                strokeDasharray="4 4"
                opacity="0.5"
              />
            </svg>
            
            {/* Axis labels */}
            <div className="absolute bottom-2 right-4 font-bold text-sm text-ink/50 bg-white/80 px-2 rounded">Pre-activation (x) →</div>
            <div className="absolute top-4 left-2 font-bold text-sm text-ink/50 -rotate-90 origin-left bg-white/80 px-2 rounded">Output (y)</div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-[#fbe1eb] p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-4 text-sm">CHOOSE FUNCTION</h3>
              <select 
                value={activation} 
                onChange={(e) => setActivation(e.target.value)}
                className="w-full bg-white border-2 border-ink p-3 rounded-xl font-bold text-lg mb-4 cursor-pointer outline-none focus:ring-4 focus:ring-sunshine/50"
              >
                {Object.keys(funcs).map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <div className="text-sm font-medium leading-relaxed">
                {currentFunc.desc}
              </div>
            </div>

            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold border-b-2 border-ink/20 pb-2 mb-4 text-sm">TEST INPUT</h3>
              
              <div className="mb-6">
                <div className="flex justify-between font-bold mb-2 text-sm">
                  <label>Pre-activation (Input)</label>
                  <span className="font-mono">{inputValue.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="-5" max="5" step="0.1" value={inputValue} 
                  onChange={(e) => setInputValue(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="bg-white p-4 rounded-lg border-2 border-ink flex justify-between items-center">
                <span className="font-bold text-sm text-ink/60">Final Output</span>
                <span className="font-display font-bold text-2xl" style={{ color: currentFunc.color }}>
                  {outputValue.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Zap className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              Without activation functions, even a network with a million neurons would collapse mathematically into a single straight line.
              <br/><br/>
              By adding these simple "squishing" or "clipping" functions at the end of every neuron, deep neural networks can twist and bend to fit almost any complex pattern in the universe.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
