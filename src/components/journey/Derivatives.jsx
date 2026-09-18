import React, { useState } from 'react';
import { Target, Eye, Maximize2 } from 'lucide-react';

const Highlight = ({ children, color = "#ec5faa" }) => (
  <strong className="font-bold relative inline-block">
    {children}
    <svg className="absolute -bottom-1 left-0 h-2 w-full" preserveAspectRatio="none" viewBox="0 0 100 10">
      <path d="M0 5 Q 50 0 100 5" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
    </svg>
  </strong>
);

export function Derivatives() {
  const [x, setX] = useState(2);
  const [showSecant, setShowSecant] = useState(false);
  const [secantDist, setSecantDist] = useState(3);
  
  // y = x^3 / 10 - x + 5 (a nice curvy function)
  const func = (val) => (Math.pow(val, 3) / 10) - val + 5;
  // Derivative: 3x^2 / 10 - 1
  const derivative = (val) => (3 * Math.pow(val, 2) / 10) - 1;

  const y = func(x);
  const slope = derivative(x);

  // SVG drawing logic
  const svgWidth = 500;
  const svgHeight = 350;
  const padding = 30;

  const domain = [-5, 5];
  const range = [0, 10];

  const mapX = (val) => padding + ((val - domain[0]) / (domain[1] - domain[0])) * (svgWidth - 2 * padding);
  const mapY = (val) => svgHeight - padding - ((val - range[0]) / (range[1] - range[0])) * (svgHeight - 2 * padding);

  let pathD = "";
  for (let vx = domain[0]; vx <= domain[1]; vx += 0.2) {
    const vy = func(vx);
    const px = mapX(vx);
    const py = mapY(vy);
    if (vx === domain[0]) pathD += `M ${px} ${py} `;
    else pathD += `L ${px} ${py} `;
  }

  const currentPx = mapX(x);
  const currentPy = mapY(y);
  
  // Tangent line logic
  // y - y1 = m(x - x1)
  // line from x-2 to x+2
  const tangX1 = x - 2;
  const tangY1 = y - slope * 2;
  const tangX2 = x + 2;
  const tangY2 = y + slope * 2;

  // Secant logic
  const secX2 = x + secantDist;
  const secY2 = func(secX2);
  const secSlope = (secY2 - y) / (secX2 - x);
  
  const secLineX1 = x - 2;
  const secLineY1 = y - secSlope * 2;
  const secLineX2 = x + 4;
  const secLineY2 = y + secSlope * 4;

  return (
    <div className="space-y-16 max-w-4xl mx-auto pb-8">
      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#fffdf8] shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ec5faa] border-2 border-ink flex items-center justify-center text-sm shadow-[2px_2px_0_#17191f] font-bold text-white">4</span>
            Derivatives
          </h2>
          <p className="text-lg text-ink/80 leading-relaxed font-medium mb-6">
            A straight line has the exact same slope everywhere. But what if the graph is curved? 
            <br/><br/>
            A <Highlight color="#6654f5">Derivative</Highlight> simply tells us the instantaneous rate of change at a <strong className="text-ink">specific point</strong> on a curve.
          </p>
          
          <div className="flex justify-center gap-8 text-center font-bold text-lg mt-8">
            <div className="bg-[#fbe1eb] border-2 border-[#ec5faa] rounded-xl p-4 shadow-[4px_4px_0_#17191f] flex-1">
              <div className="text-[#ec5faa] text-sm mb-2 uppercase tracking-widest">Slope</div>
              <div>Change over an interval</div>
            </div>
            <div className="bg-[#dff4e8] border-2 border-[#237957] rounded-xl p-4 shadow-[4px_4px_0_#17191f] flex-1">
              <div className="text-[#237957] text-sm mb-2 uppercase tracking-widest">Derivative</div>
              <div>Change exactly right here</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-display text-3xl font-bold mb-6 flex items-center gap-3">
          <Maximize2 className="text-[#ec5faa]" />
          Tangent Line Explorer
        </h2>
        
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* Graph Visualization */}
          <div className="bg-white rounded-[20px] border-[3px] border-ink shadow-[6px_8px_0_#17191f] p-6 relative overflow-hidden flex flex-col justify-center h-full">
            <div className="relative w-full aspect-[4/3] bg-paper rounded-xl border-2 border-ink overflow-hidden">
              <svg width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="xMidYMid meet">
                
                {/* Axes */}
                <line x1={mapX(0)} y1="0" x2={mapX(0)} y2={svgHeight} stroke="#00000020" strokeWidth="2" />
                <line x1="0" y1={mapY(0)} x2={svgWidth} y2={mapY(0)} stroke="#00000020" strokeWidth="2" />
                
                {/* Curve */}
                <path d={pathD} fill="none" stroke="#6654f5" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                
                {!showSecant ? (
                  <>
                    {/* Tangent line */}
                    <line 
                      x1={mapX(tangX1)} y1={mapY(tangY1)} 
                      x2={mapX(tangX2)} y2={mapY(tangY2)} 
                      stroke="#ec5faa" strokeWidth="3" strokeDasharray="6 6"
                      className="transition-all duration-75"
                    />
                    
                    {/* Point */}
                    <circle cx={currentPx} cy={currentPy} r="6" fill="#17191f" stroke="#fff" strokeWidth="2" className="transition-all duration-75" />
                  </>
                ) : (
                  <>
                    {/* Secant line */}
                    <line 
                      x1={mapX(secLineX1)} y1={mapY(secLineY1)} 
                      x2={mapX(secLineX2)} y2={mapY(secLineY2)} 
                      stroke="#237957" strokeWidth="3" strokeDasharray="6 6"
                      className="transition-all duration-75"
                    />
                    
                    {/* Points */}
                    <circle cx={currentPx} cy={currentPy} r="6" fill="#17191f" stroke="#fff" strokeWidth="2" className="transition-all duration-75" />
                    <circle cx={mapX(secX2)} cy={mapY(secY2)} r="6" fill="#237957" stroke="#fff" strokeWidth="2" className="transition-all duration-75" />
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {!showSecant ? (
              <div className="bg-paper p-6 rounded-xl border-2 border-ink shadow-[4px_4px_0_#17191f] space-y-6 animate-[fadeIn_0.3s]">
                <div>
                  <div className="flex justify-between font-bold mb-2 text-sm">
                    <span>Position (x)</span>
                    <span className="font-mono text-ink">{x.toFixed(1)}</span>
                  </div>
                  <input 
                    type="range" min="-4" max="4" step="0.1" value={x} 
                    onChange={(e) => setX(parseFloat(e.target.value))} 
                    className="w-full accent-ink" 
                  />
                </div>
                
                <div className="bg-white p-4 rounded-lg border-2 border-ink text-center">
                  <div className="text-xs font-bold opacity-60 mb-1 tracking-widest text-[#ec5faa]">DERIVATIVE (SLOPE HERE)</div>
                  <div className="font-bold font-mono text-3xl text-[#ec5faa]">
                    {slope > 0 ? '+' : ''}{slope.toFixed(2)}
                  </div>
                </div>

                <button 
                  onClick={() => setShowSecant(true)}
                  className="w-full py-3 bg-sunshine border-2 border-ink rounded-xl font-bold shadow-[4px_4px_0_#17191f] hover:-translate-y-1 transition-transform"
                >
                  How is this calculated?
                </button>
              </div>
            ) : (
              <div className="bg-[#dff4e8] p-6 rounded-xl border-2 border-[#237957] shadow-[4px_4px_0_#17191f] space-y-6 animate-[fadeIn_0.3s]">
                <div>
                  <div className="flex justify-between font-bold mb-2 text-sm">
                    <span className="text-[#237957]">Distance to 2nd point</span>
                    <span className="font-mono text-[#237957]">{secantDist.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="4" step="0.1" value={secantDist} 
                    onChange={(e) => setSecantDist(parseFloat(e.target.value))} 
                    className="w-full accent-[#237957]" 
                  />
                </div>
                
                <div className="bg-white p-4 rounded-lg border-2 border-[#237957] text-center">
                  <div className="text-xs font-bold opacity-60 mb-1 tracking-widest text-[#237957]">SECANT SLOPE</div>
                  <div className="font-bold font-mono text-3xl text-[#237957]">
                    {secSlope > 0 ? '+' : ''}{secSlope.toFixed(2)}
                  </div>
                </div>

                <div className="text-sm font-bold text-[#237957] opacity-80 text-center">
                  Drag the distance to zero. The local slope (derivative) emerges as the second point approaches the first!
                </div>

                <button 
                  onClick={() => setShowSecant(false)}
                  className="w-full py-3 bg-white border-2 border-[#237957] text-[#237957] rounded-xl font-bold hover:bg-paper transition-colors"
                >
                  Back to Tangent Line
                </button>
              </div>
            )}
          </div>

        </div>
      </section>

      <section>
        <div className="p-4 sm:p-8 lg:p-10 rounded-[20px] border-[3px] border-ink bg-[#c9baff] text-ink shadow-[6px_8px_0_#17191f]">
          <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2"><Target className="text-white fill-white" /> Real AI Connections</h2>
          <div className="bg-white/80 p-6 rounded-xl border-2 border-ink font-bold text-lg leading-relaxed shadow-[4px_4px_0_#17191f]">
            <p>
              In machine learning, the "curve" is the Loss function, and the "x-axis" is the model's Parameter.
            </p>
            <p className="mt-4 text-base font-medium opacity-80">
              The derivative tells the AI exactly how steeply the error is rising or falling <em>right at its current guess</em>. This instantaneous slope is the compass that points the model towards a better answer.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
