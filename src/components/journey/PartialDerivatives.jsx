import React, { useState } from 'react';
import { Layers, Target } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function PartialDerivatives() {
  const [x, setX] = useState(2);
  const [y, setY] = useState(3);
  
  // f(x, y) = x^2 + y^2
  const f_xy = (x * x) + (y * y);
  
  // Partial derivatives: 
  // df/dx = 2x
  // df/dy = 2y
  const df_dx = 2 * x;
  const df_dy = 2 * y;

  // SVG drawing logic for contour map
  const svgSize = 300;
  const mapCoord = (val) => (svgSize / 2) + (val * 25);
  
  const currentPx = mapCoord(x);
  const currentPy = mapCoord(-y); // Invert y for standard Cartesian display

  // Generate concentric circles for contour map
  const contours = [];
  for (let r = 1; r <= 10; r++) {
    contours.push(
      <circle 
        key={r} 
        cx={svgSize/2} 
        cy={svgSize/2} 
        r={r * 15} 
        fill="none" 
        stroke="#6654f5" 
        strokeWidth="1.5" 
        strokeOpacity={0.1 + (r * 0.05)}
      />
    );
  }

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">5</span>
            Partial Derivatives
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            Real AI models have more than one parameter. What happens when a function takes <em>many</em> inputs?
            <br/><br/>
            A <Highlight color="#6654f5">Partial Derivative</Highlight> asks a very specific question: How does the output change if I vary <strong>ONE</strong> input, while pretending all the other inputs are frozen in place?
          </p>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Layers className="text-[#ec5faa]" />
          Two-Parameter Landscape
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Contour Map Visualization */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 flex flex-col items-center">
            <div className="font-bold text-center mb-4 opacity-50 text-sm tracking-widest border-b-2 border-ink/10 pb-2 w-full">
              f(x, y) = x² + y²
            </div>
            
            <div className="relative w-full max-w-[300px] aspect-square bg-[#f4f5f8] rounded-xl border-2 border-ink overflow-hidden mx-auto">
              <svg width="100%" height="100%" viewBox={`0 0 ${svgSize} ${svgSize}`} preserveAspectRatio="xMidYMid meet">
                
                {/* Contours (representing a 3D bowl) */}
                {contours}
                
                {/* Axes */}
                <line x1={0} y1={svgSize/2} x2={svgSize} y2={svgSize/2} stroke="#00000030" strokeWidth="2" />
                <line x1={svgSize/2} y1={0} x2={svgSize/2} y2={svgSize} stroke="#00000030" strokeWidth="2" />
                
                {/* Axis Labels */}
                <text x={svgSize - 15} y={(svgSize/2) - 10} fontSize="12" fontWeight="bold" fill="#00000060">x</text>
                <text x={(svgSize/2) + 10} y={15} fontSize="12" fontWeight="bold" fill="#00000060">y</text>

                {/* Point */}
                <circle cx={currentPx} cy={currentPy} r="6" fill="#17191f" stroke="#fff" strokeWidth="2" className="transition-all duration-75" />
                
                {/* Visualizing df/dx (horizontal line) */}
                <line 
                  x1={currentPx} y1={currentPy} 
                  x2={currentPx + (df_dx * 2)} y2={currentPy} 
                  stroke="#ec5faa" strokeWidth="3" markerEnd="url(#arrowhead-x)"
                  className="transition-all duration-75"
                />
                
                {/* Visualizing df/dy (vertical line) */}
                <line 
                  x1={currentPx} y1={currentPy} 
                  x2={currentPx} y2={currentPy - (df_dy * 2)} 
                  stroke="#237957" strokeWidth="3" markerEnd="url(#arrowhead-y)"
                  className="transition-all duration-75"
                />

                <defs>
                  <marker id="arrowhead-x" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                    <polygon points="0 0, 5 2.5, 0 5" fill="#ec5faa" />
                  </marker>
                  <marker id="arrowhead-y" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
                    <polygon points="0 0, 5 2.5, 0 5" fill="#237957" />
                  </marker>
                </defs>
              </svg>
            </div>
            
            <div className="mt-4 text-center font-bold text-sm opacity-80 max-w-[250px]">
              The rings represent the height of the output (loss). The center is 0.
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6">
              
              <div className="bg-white p-3 rounded-lg border-2 border-ink text-center">
                <span className="font-bold text-xs opacity-60 block tracking-widest mb-1">TOTAL OUTPUT</span>
                <span className="font-mono font-bold text-2xl text-[#6654f5]">{f_xy}</span>
              </div>

              <div>
                <div className="flex justify-between font-bold mb-2 text-sm">
                  <span className="text-[#ec5faa]">Move x</span>
                  <span className="font-mono">{x.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="-5" max="5" step="0.5" value={x} 
                  onChange={(e) => setX(parseFloat(e.target.value))} 
                  className="w-full accent-[#ec5faa]" 
                />
                <div className="flex justify-between items-center bg-[#fbe1eb] border-2 border-[#ec5faa] rounded px-2 py-1 mt-2">
                  <span className="text-xs font-bold text-[#ec5faa]">∂f/∂x (Slope of x)</span>
                  <span className="font-mono font-bold text-[#ec5faa]">{df_dx > 0 ? '+' : ''}{df_dx.toFixed(1)}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between font-bold mb-2 text-sm">
                  <span className="text-[#237957]">Move y</span>
                  <span className="font-mono">{y.toFixed(1)}</span>
                </div>
                <input 
                  type="range" min="-5" max="5" step="0.5" value={y} 
                  onChange={(e) => setY(parseFloat(e.target.value))} 
                  className="w-full accent-[#237957]" 
                />
                <div className="flex justify-between items-center bg-[#dff4e8] border-2 border-[#237957] rounded px-2 py-1 mt-2">
                  <span className="text-xs font-bold text-[#237957]">∂f/∂y (Slope of y)</span>
                  <span className="font-mono font-bold text-[#237957]">{df_dy > 0 ? '+' : ''}{df_dy.toFixed(1)}</span>
                </div>
              </div>

            </div>
            
            <div className="bg-white p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f]">
              <h3 className="font-bold border-b-2 border-ink/10 pb-2 mb-4 text-sm text-ink/60 tracking-widest">THINK ABOUT IT</h3>
              <p className="font-bold text-sm leading-relaxed">
                When you move <span className="text-[#ec5faa]">x</span>, you completely ignore <span className="text-[#237957]">y</span>. 
                You are asking: <em>"If everything else stays exactly the same, how does changing this one thing affect the total?"</em>
              </p>
            </div>
          </div>

        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Target className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              An AI model has many weights (parameters). To improve the model, we need to know how each individual weight contributes to the total error (Loss).
            </p>
            
            <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
              <div className="bg-white p-4 rounded-xl border-2 border-ink flex-1 text-center">
                <span className="text-sm font-bold opacity-60 block tracking-widest">Weight 1</span>
                <span>∂Loss / ∂w₁</span>
              </div>
              <div className="bg-white p-4 rounded-xl border-2 border-ink flex-1 text-center">
                <span className="text-sm font-bold opacity-60 block tracking-widest">Weight 2</span>
                <span>∂Loss / ∂w₂</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
